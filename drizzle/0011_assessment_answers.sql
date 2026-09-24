ALTER TABLE "assessments" ADD COLUMN "protecting" text[] DEFAULT '{}'::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "assessments" ADD COLUMN "exposures" text[] DEFAULT '{}'::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "assessments" ADD COLUMN "threats" text[] DEFAULT '{}'::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "assessments" ADD COLUMN "budget" text;--> statement-breakpoint
ALTER TABLE "assessments" ADD COLUMN "upcoming" text DEFAULT '' NOT NULL;