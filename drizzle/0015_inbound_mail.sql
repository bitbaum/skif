CREATE TYPE "public"."mail_kind" AS ENUM('question', 'request', 'complaint', 'booking', 'billing', 'partnership', 'press', 'spam', 'other');--> statement-breakpoint
CREATE TYPE "public"."mail_urgency" AS ENUM('urgent', 'normal', 'low');--> statement-breakpoint
ALTER TYPE "public"."audit_action" ADD VALUE 'VIEW_MAIL';--> statement-breakpoint
ALTER TYPE "public"."audit_action" ADD VALUE 'REPLY_MAIL';--> statement-breakpoint
ALTER TYPE "public"."audit_subject" ADD VALUE 'MAIL';--> statement-breakpoint
CREATE TABLE "inbound_mail" (
	"id" text PRIMARY KEY NOT NULL,
	"message_id" text,
	"from_address" text NOT NULL,
	"from_name" text,
	"subject" text NOT NULL,
	"body" text NOT NULL,
	"received_at" timestamp with time zone NOT NULL,
	"suspect" boolean DEFAULT false NOT NULL,
	"kind" "mail_kind" NOT NULL,
	"urgency" "mail_urgency" NOT NULL,
	"summary" text NOT NULL,
	"language" text NOT NULL,
	"needs_human" boolean NOT NULL,
	"triaged_by" text NOT NULL,
	"replied_at" timestamp with time zone,
	"handled_at" timestamp with time zone,
	"handled_by" text
);
--> statement-breakpoint
CREATE INDEX "inbound_mail_received_idx" ON "inbound_mail" USING btree ("received_at");