import { NextResponse } from "next/server";
import { z } from "zod";

import { createPostgresClient } from "@/lib/database/postgres";

const schema = z.object({
  host: z.string().min(1),
  port: z.string().min(1),
  databaseName: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  let client;

  try {
    const body = await request.json();

    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid database configuration: " + result.error.errors.map(e => e.message).join(", ") },
        { status: 400 },
      );
    }

    client = createPostgresClient(result.data);

    await client`SELECT 1`;

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Could not connect to the database",
      },
      { status: 400 },
    );
  } finally {
    if (client) {
      await client.end();
    }
  }
}
