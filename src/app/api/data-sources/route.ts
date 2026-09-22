import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/db";
import { dataSources } from "@/db/schema";
import { encrypt } from "@/lib/encryption";
import { createClient } from "@/lib/supabase/server";

const dataSourceSchema = z.object({
  name: z.string().min(1),
  host: z.string().min(1),
  port: z.string().min(1),
  databaseName: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const parsed = dataSourceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid database configuration: " + parsed.error.issues.map((e: z.ZodIssue) => e.message).join(", "),
        },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const encryptedPassword = encrypt(data.password);

    const [dataSource] = await db
      .insert(dataSources)
      .values({
        name: data.name,
        type: "postgresql",
        host: data.host,
        port: data.port,
        databaseName: data.databaseName,
        username: data.username,
        password: encryptedPassword,
        userId: authData.user.id,
      })
      .returning({
        id: dataSources.id,
        name: dataSources.name,
        type: dataSources.type,
      });

    return NextResponse.json({
      dataSource,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to create data source",
      },
      { status: 500 },
    );
  }
}
