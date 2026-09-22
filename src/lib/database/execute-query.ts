import type postgres from "postgres";

export async function executeQuery(client: postgres.Sql, sql: string) {
  const result = await client.unsafe(sql);

  return result;
}
