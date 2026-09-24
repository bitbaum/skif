CREATE TYPE "public"."incident_review" AS ENUM('OPEN', 'UNDER_REVIEW', 'RESOLVED');--> statement-breakpoint
CREATE TYPE "public"."incident_severity" AS ENUM('LOW', 'MEDIUM', 'HIGH');--> statement-breakpoint
ALTER TABLE "ratings" ADD COLUMN "professionalism" smallint;--> statement-breakpoint
ALTER TABLE "ratings" ADD COLUMN "communication" smallint;--> statement-breakpoint
ALTER TABLE "ratings" ADD COLUMN "punctuality" smallint;--> statement-breakpoint
ALTER TABLE "ratings" ADD COLUMN "judgment" smallint;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "observations" text[] DEFAULT '{}'::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "severity" "incident_severity";--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "review" "incident_review";--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "review_note" text;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "reviewed_by" text;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "reviewed_at" timestamp with time zone;--> statement-breakpoint
CREATE INDEX "reports_review_idx" ON "reports" USING btree ("review");--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_professionalism_range" CHECK ("ratings"."professionalism" BETWEEN 1 AND 5);--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_communication_range" CHECK ("ratings"."communication" BETWEEN 1 AND 5);--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_punctuality_range" CHECK ("ratings"."punctuality" BETWEEN 1 AND 5);--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_judgment_range" CHECK ("ratings"."judgment" BETWEEN 1 AND 5);--> statement-breakpoint
-- Incidents filed before this migration were never reviewed: they are open.
UPDATE "reports" SET "review" = 'OPEN' WHERE "kind" = 'INCIDENT';--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_incident_review" CHECK (("reports"."kind" = 'INCIDENT') = ("reports"."review" IS NOT NULL));--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_incident_severity" CHECK ("reports"."severity" IS NULL OR "reports"."kind" = 'INCIDENT');