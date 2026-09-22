import { NextResponse } from "next/server";

import { and, eq } from "drizzle-orm";
import { normalizeDatabaseSchema } from "@/lib/database/normalize-schema";

import { db } from "@/db";
import { dataSources } from "@/db/schema";
import { createClient } from "@/lib/supabase/server";
import { decrypt } from "@/lib/encryption";

import { createPostgresClient } from "@/lib/database/postgres";
import { getDatabaseSchema } from "@/lib/database/introspect";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  let client;

  try {
    const { id } = await params;

    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const [dataSource] = await db
      .select()
      .from(dataSources)
      .where(and(eq(dataSources.id, id), eq(dataSources.userId, authData.user.id)))
      .limit(1);

    if (!dataSource) {
      return NextResponse.json(
        { error: "Data source not found" },
        { status: 404 },
      );
    }

    const decryptedPassword = decrypt(dataSource.password);

    client = createPostgresClient({
      host: dataSource.host,
      port: dataSource.port,
      databaseName: dataSource.databaseName,
      username: dataSource.username,
      password: decryptedPassword,
    });

    const rawSchema = await getDatabaseSchema(client);
    const schema = normalizeDatabaseSchema(rawSchema);

    return NextResponse.json(schema);
  } catch (error) {
    console.error("SCHEMA INTROSPECTION ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to retrieve database schema",
      },
      { status: 500 },
    );
  } finally {
    if (client) {
      await client.end();
    }
  }
}
