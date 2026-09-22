import type postgres from "postgres";

export type RawSchema = {
  tables: {
    table_schema: string;
    table_name: string;
  }[];

  columns: {
    table_schema: string;
    table_name: string;
    column_name: string;
    data_type: string;
    is_nullable: string;
    ordinal_position: number;
  }[];

  primaryKeys: {
    table_schema: string;
    table_name: string;
    column_name: string;
  }[];

  foreignKeys: {
    table_schema: string;
    table_name: string;
    column_name: string;
    foreign_table_schema: string;
    foreign_table_name: string;
    foreign_column_name: string;
  }[];
};

export async function getDatabaseSchema(
  client: postgres.Sql,
): Promise<RawSchema> {
  const tables = await client<
    {
      table_schema: string;
      table_name: string;
    }[]
  >`
    SELECT
      table_schema,
      table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
    ORDER BY table_schema, table_name;
  `;

  const columns = await client<
    {
      table_schema: string;
      table_name: string;
      column_name: string;
      data_type: string;
      is_nullable: string;
      ordinal_position: number;
    }[]
  >`
    SELECT
      table_schema,
      table_name,
      column_name,
      data_type,
      is_nullable,
      ordinal_position
    FROM information_schema.columns
   WHERE table_schema = 'public'
    ORDER BY
      table_schema,
      table_name,
      ordinal_position;
  `;

  const primaryKeys = await client<
    {
      table_schema: string;
      table_name: string;
      column_name: string;
    }[]
  >`
    SELECT
      tc.table_schema,
      tc.table_name,
      kcu.column_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
      AND tc.table_name = kcu.table_name
    WHERE tc.constraint_type = 'PRIMARY KEY'
    ORDER BY
      tc.table_schema,
      tc.table_name,
      kcu.ordinal_position;
  `;

  const foreignKeys = await client<
    {
      table_schema: string;
      table_name: string;
      column_name: string;
      foreign_table_schema: string;
      foreign_table_name: string;
      foreign_column_name: string;
    }[]
  >`
    SELECT
      tc.table_schema,
      tc.table_name,
      kcu.column_name,
      ccu.table_schema AS foreign_table_schema,
      ccu.table_name AS foreign_table_name,
      ccu.column_name AS foreign_column_name
    FROM information_schema.table_constraints AS tc
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
    WHERE tc.constraint_type = 'FOREIGN KEY';
  `;

  return {
    tables: [...tables],
    columns: [...columns],
    primaryKeys: [...primaryKeys],
    foreignKeys: [...foreignKeys],
  };
}
