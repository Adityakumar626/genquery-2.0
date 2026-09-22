import { z } from "zod";

export const sqlQuerySchema = z.object({
  intent: z.enum([
    "lookup",
    "count",
    "sum",
    "average",
    "min_max",
    "group",
    "ranking",
    "comparison",
    "conversational",
  ]),

  sql: z.string().optional().describe("The SQL query. Leave empty if conversational."),

  explanation: z.string(),
});

export type SQLQuery = z.infer<typeof sqlQuerySchema>;
