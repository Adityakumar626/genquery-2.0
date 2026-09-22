import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const dataSources = pgTable("data_sources", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: text("name").notNull(),

  userId: uuid("user_id").notNull(),

  type: text("type").notNull().default("postgresql"),

  host: text("host").notNull(),

  port: text("port").notNull().default("5432"),

  databaseName: text("database_name").notNull(),

  username: text("username").notNull(),

  // Temporary for our initial implementation.
  // We'll replace this with encrypted credentials.
  password: text("password").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
