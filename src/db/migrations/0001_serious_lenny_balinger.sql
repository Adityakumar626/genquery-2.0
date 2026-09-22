ALTER TABLE "data_sources" ALTER COLUMN "type" SET DEFAULT 'postgresql';--> statement-breakpoint
ALTER TABLE "data_sources" ADD COLUMN "host" text NOT NULL;--> statement-breakpoint
ALTER TABLE "data_sources" ADD COLUMN "port" text DEFAULT '5432' NOT NULL;--> statement-breakpoint
ALTER TABLE "data_sources" ADD COLUMN "database_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "data_sources" ADD COLUMN "username" text NOT NULL;--> statement-breakpoint
ALTER TABLE "data_sources" ADD COLUMN "password" text NOT NULL;--> statement-breakpoint
ALTER TABLE "data_sources" DROP COLUMN "connection_string";