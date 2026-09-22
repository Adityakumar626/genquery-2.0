import { parse } from "pgsql-ast-parser";
import type { DatabaseSchema } from "./schema-types";

export type SQLValidationResult =
  | {
      valid: true;
      sql: string;
    }
  | {
      valid: false;
      reason: string;
    };

export function validateSQL(
  sql: string,
  schema: DatabaseSchema,
): SQLValidationResult {
  try {
    const statements = parse(sql);

    if (statements.length !== 1) {
      return {
        valid: false,
        reason: "Only one SQL statement is allowed.",
      };
    }

    // Secondary defense: simple regex to block destructive commands
    const destructivePattern = /\b(INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE|GRANT|REVOKE|CREATE)\b/i;
    if (destructivePattern.test(sql)) {
      return {
        valid: false,
        reason: "Query contains forbidden destructive commands.",
      };
    }

    const statement = statements[0];

    if (statement.type !== "select") {
      return {
        valid: false,
        reason: "Only SELECT queries are allowed.",
      };
    }

    return {
      valid: true,
      sql: sql.trim(),
    };
  } catch {
    return {
      valid: false,
      reason: "Invalid PostgreSQL syntax.",
    };
  }
}
