CREATE TABLE "data_sources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"connection_string" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
