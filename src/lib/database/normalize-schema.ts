import type { DatabaseSchema } from "./schema-types";
import type { RawSchema } from "./introspect";

export function normalizeDatabaseSchema(raw: RawSchema): DatabaseSchema {
  const tables = raw.tables.map((table) => {
    const columns = raw.columns
      .filter(
        (column) =>
          column.table_schema === table.table_schema &&
          column.table_name === table.table_name,
      )
      .map((column) => {
        const primaryKey = raw.primaryKeys.some(
          (key) =>
            key.table_schema === column.table_schema &&
            key.table_name === column.table_name &&
            key.column_name === column.column_name,
        );

        const foreignKey = raw.foreignKeys.find(
          (key) =>
            key.table_schema === column.table_schema &&
            key.table_name === column.table_name &&
            key.column_name === column.column_name,
        );

        return {
          name: column.column_name,
          type: column.data_type,
          nullable: column.is_nullable === "YES",
          primaryKey,
          ...(foreignKey && {
            references: {
              table: foreignKey.foreign_table_name,
              column: foreignKey.foreign_column_name,
            },
          }),
        };
      });

    return {
      schema: table.table_schema,
      name: table.table_name,
      columns,
    };
  });

  return {
    tables,
  };
}
