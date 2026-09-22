import {
  streamText,
  type UIMessage,
  convertToModelMessages,
  createUIMessageStreamResponse,
  generateText,
  Output,
  createUIMessageStream,
  toUIMessageStream,
} from "ai";
import { sqlQuerySchema } from "@/lib/ai/sql-schema";

import { executeQuery } from "@/lib/database/execute-query";

import { eq } from "drizzle-orm";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { db } from "@/db";
import { dataSources } from "@/db/schema";

import { createPostgresClient } from "@/lib/database/postgres";
import { getDatabaseSchema } from "@/lib/database/introspect";
import { normalizeDatabaseSchema } from "@/lib/database/normalize-schema";
import { validateSQL } from "@/lib/database/sql-validator";
import { createClient } from "@/lib/supabase/server";
import { decrypt } from "@/lib/encryption";

export async function POST(req: Request) {
  let client;

  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const userQuestion = messages
      .filter((message) => message.role === "user")
      .map((message) =>
        message.parts
          .filter((part) => part.type === "text")
          .map((part) => part.text)
          .join(""),
      )
      .join("\n");

    const coreMessages = await convertToModelMessages(messages);

    const apiKey = req.headers.get("x-gemini-api-key");
    const google = createGoogleGenerativeAI({ apiKey: apiKey || process.env.GOOGLE_GENERATIVE_AI_API_KEY });
    const dynamicModel = google("gemini-3.5-flash-lite");

    // 1. Get the current user
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // 2. Get the saved data source for this user
    const [dataSource] = await db
      .select()
      .from(dataSources)
      .where(eq(dataSources.userId, authData.user.id))
      .limit(1);

    if (!dataSource) {
      return new Response("Data source not found. Please connect a database first.", {
        status: 404,
      });
    }

    // 3. Connect to the user's PostgreSQL database
    const decryptedPassword = decrypt(dataSource.password);
    client = createPostgresClient({
      host: dataSource.host,
      port: dataSource.port,
      databaseName: dataSource.databaseName,
      username: dataSource.username,
      password: decryptedPassword,
    });

    // 3. Get raw PostgreSQL schema
    const rawSchema = await getDatabaseSchema(client);

    // 4. Convert it into our clean schema
    const schema = normalizeDatabaseSchema(rawSchema);

    // 5. Send schema + conversation to Gemini
    const result = await generateText({
      model: dynamicModel,

      output: Output.object({
        schema: sqlQuerySchema,
      }),

      system: `
You are an AI data analyst that converts natural-language questions
into PostgreSQL SELECT queries.

DATABASE SCHEMA:

${JSON.stringify(schema, null, 2)}

Rules:

1. Only use tables and columns that exist in the database schema.

2. Generate valid PostgreSQL SQL.

3. Only generate read-only SELECT statements.

4. Never generate:
   - INSERT
   - UPDATE
   - DELETE
   - DROP
   - ALTER
   - TRUNCATE
   - CREATE
   - GRANT
   - REVOKE

5. Understand the user's intent carefully.

6. For questions asking "how many", "count", or "number of",
   use COUNT() instead of returning individual rows.

7. For questions asking for totals or sums, use SUM().

8. For questions asking for averages, use AVG().

9. For questions asking for minimum or maximum values,
   use MIN() or MAX() when appropriate.

10. For questions involving groups or categories,
    use GROUP BY.

11. For questions asking for "top", "highest", or "lowest",
    use ORDER BY with an appropriate LIMIT.

12. Do not return unnecessary columns.

13. Use table aliases when joins make the query easier to understand.

14. If the question cannot be answered using the schema,
    do not invent tables or columns.

15. Prefer the simplest correct SQL query that answers the question.

16. ALWAYS append LIMIT 100 to your queries to prevent massive data dumps unless the user specifically asks for more.
`,

      messages: coreMessages,
    });

    const generated = result.output;
    
    // If it's a conversational query (like "hi"), skip SQL execution
    if (generated.intent === "conversational" || !generated.sql) {
      const stream = createUIMessageStream({
        execute: async ({ writer }) => {
          writer.write({ type: "start" });
          
          const answerStream = streamText({
            model: dynamicModel,
            system: `You are an AI data analyst for GenQuery. The user has successfully connected their PostgreSQL database. The schema is: ${JSON.stringify(schema)}. The user asked a conversational question or greeting. Be helpful, concise, and friendly. If they ask if a database is connected, say YES and tell them they can ask you questions about their data.`,
            messages: coreMessages,
          });

          writer.merge(
            toUIMessageStream({ stream: answerStream.stream, sendStart: false }),
          );
        },
      });

      return createUIMessageStreamResponse({ stream });
    }

    const validation = validateSQL(generated.sql, schema);

    if (!validation.valid) {
      return Response.json(
        {
          error: "Generated SQL was rejected.",
          reason: validation.reason,
        },
        { status: 400 }
      );
    }

    let rows;
    try {
      rows = await executeQuery(client, validation.sql);
    } catch (dbError: any) {
      const stream = createUIMessageStream({
        execute: async ({ writer }) => {
          writer.write({ type: "start" });
          
          const answerStream = streamText({
            model: dynamicModel,
            system: `You are an AI data analyst. I tried to run a query for the user, but the database returned an error. Explain the error nicely, show them what you tried to run, and ask them to clarify or rephrase their question.`,
            prompt: `SQL Error: ${dbError.message}\nSQL Generated: ${validation.sql}\nUser question: ${userQuestion}`,
          });

          writer.merge(
            toUIMessageStream({ stream: answerStream.stream, sendStart: false }),
          );
        },
      });

      return createUIMessageStreamResponse({ stream });
    }

    const stream = createUIMessageStream({
      execute: ({ writer }) => {
        writer.write({ type: "start" });

        // Send SQL and Result metadata as a data part
        writer.write({
          type: "data-sql-result",
          data: {
            sql: validation.sql,
            rows,
          },
        });

        const answerStream = streamText({
          model: dynamicModel,

          system: `
You are an AI data analyst.

Answer the user's question using the database result.

Rules:
- Use only the provided result.
- Do not invent numbers or facts.
- Be concise and natural.
- If no rows were returned, say that no matching data was found.
- Do not expose internal implementation details.
- Do not repeat SQL unless the user asks for it.

SQL:
${validation.sql}

DATABASE RESULT:
${JSON.stringify(rows, null, 2)}
`,

          messages: coreMessages,
        });

        writer.merge(
          toUIMessageStream({ stream: answerStream.stream, sendStart: false }),
        );
      },
    });

    return createUIMessageStreamResponse({
      stream,
    });
  } catch (error: any) {
    console.error("CHAT ERROR:", error);
    
    const msg = error.message?.toLowerCase() || "";
    if (msg.includes("429") || msg.includes("quota") || msg.includes("limit") || msg.includes("too many requests")) {
      return new Response("Gemini API Limit Exceeded. Please check your billing or API key quota.", { status: 429 });
    }

    return new Response(
      error.message || "Something went wrong",
      { status: 500 }
    );
  } finally {
    // 7. Close PostgreSQL connection
    if (client) {
      await client.end();
    }
  }
}
