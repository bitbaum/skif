CREATE TYPE "public"."audit_action" AS ENUM('VIEW_BOOKING', 'VIEW_COMPLAINT', 'VIEW_PROTECTOR', 'CHANGE_PROTECTOR_STATUS', 'ASSESS_CAPABILITY', 'OVERRIDE_MATCH');--> statement-breakpoint
CREATE TYPE "public"."audit_subject" AS ENUM('BOOKING', 'COMPLAINT', 'PROTECTOR', 'CAPABILITY');--> statement-breakpoint
CREATE TABLE "audit_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_sub" text NOT NULL,
	"action" "audit_action" NOT NULL,
	"subject_type" "audit_subject" NOT NULL,
	"subject_id" uuid NOT NULL,
	"detail" jsonb,
	"at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "audit_events_at_idx" ON "audit_events" USING btree ("at");--> statement-breakpoint
CREATE INDEX "audit_events_subject_idx" ON "audit_events" USING btree ("subject_type","subject_id");