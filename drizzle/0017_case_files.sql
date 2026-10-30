CREATE TABLE "case_files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_sub" text NOT NULL,
	"kind" text NOT NULL,
	"title" text NOT NULL,
	"summary" text DEFAULT '' NOT NULL,
	"happened_on" text DEFAULT '' NOT NULL,
	"police_reference" text DEFAULT '' NOT NULL,
	"timeline" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"indicators" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"steps_done" text[] DEFAULT '{}'::text[] NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "case_files_owner_idx" ON "case_files" USING btree ("owner_sub");