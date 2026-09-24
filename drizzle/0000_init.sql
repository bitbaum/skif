CREATE TYPE "public"."booking_status" AS ENUM('REQUESTED', 'ASSIGNED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('PAYMENT_PENDING', 'PAID');--> statement-breakpoint
CREATE TYPE "public"."presence_style" AS ENUM('DISCREET', 'VISIBLE');--> statement-breakpoint
CREATE TYPE "public"."protector_status" AS ENUM('APPLIED', 'APPROVED', 'SUSPENDED');--> statement-breakpoint
CREATE TYPE "public"."report_kind" AS ENUM('REPORT', 'INCIDENT');--> statement-breakpoint
CREATE TYPE "public"."service" AS ENUM('NIGHT_OUT', 'GET_HOME', 'HIGH_EXPOSURE', 'FAMILY', 'VENUE_STAFF');--> statement-breakpoint
CREATE TABLE "assessments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_sub" text NOT NULL,
	"place_name" text NOT NULL,
	"concerns" text[] DEFAULT '{}'::text[] NOT NULL,
	"measures" text[] DEFAULT '{}'::text[] NOT NULL,
	"plan" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "booking_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"action" text NOT NULL,
	"from_status" "booking_status",
	"to_status" "booking_status" NOT NULL,
	"actor_role" text NOT NULL,
	"actor_sub" text NOT NULL,
	"protector_id" uuid,
	"at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_sub" text NOT NULL,
	"service" "service" NOT NULL,
	"status" "booking_status" DEFAULT 'REQUESTED' NOT NULL,
	"starts_at" timestamp with time zone NOT NULL,
	"hours" integer NOT NULL,
	"area" text NOT NULL,
	"meeting_point" text NOT NULL,
	"notes" text DEFAULT '' NOT NULL,
	"languages" text[] DEFAULT '{}'::text[] NOT NULL,
	"presence_style" "presence_style" NOT NULL,
	"hard_constraints" text[] DEFAULT '{}'::text[] NOT NULL,
	"protector_id" uuid,
	"payment_status" "payment_status" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "bookings_hours_positive" CHECK ("bookings"."hours" > 0)
);
--> statement-breakpoint
CREATE TABLE "preference_profiles" (
	"sub" text PRIMARY KEY NOT NULL,
	"hard_constraints" text[] DEFAULT '{}'::text[] NOT NULL,
	"presence_style" "presence_style" NOT NULL,
	"languages" text[] DEFAULT '{}'::text[] NOT NULL,
	"values_note" text DEFAULT '' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "protectors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sub" text NOT NULL,
	"display_name" text NOT NULL,
	"bio" text NOT NULL,
	"languages" text[] DEFAULT '{}'::text[] NOT NULL,
	"skills" text[] DEFAULT '{}'::text[] NOT NULL,
	"services" text[] DEFAULT '{}'::text[] NOT NULL,
	"presence_styles" text[] DEFAULT '{}'::text[] NOT NULL,
	"status" "protector_status" DEFAULT 'APPLIED' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"approved_at" timestamp with time zone,
	CONSTRAINT "protectors_sub_unique" UNIQUE("sub")
);
--> statement-breakpoint
CREATE TABLE "ratings" (
	"booking_id" uuid PRIMARY KEY NOT NULL,
	"respect" smallint NOT NULL,
	"discretion" smallint NOT NULL,
	"felt_safe" smallint NOT NULL,
	"comment" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ratings_respect_range" CHECK ("ratings"."respect" BETWEEN 1 AND 5),
	CONSTRAINT "ratings_discretion_range" CHECK ("ratings"."discretion" BETWEEN 1 AND 5),
	CONSTRAINT "ratings_felt_safe_range" CHECK ("ratings"."felt_safe" BETWEEN 1 AND 5)
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"protector_id" uuid NOT NULL,
	"kind" "report_kind" NOT NULL,
	"summary" text NOT NULL,
	"police_involved" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "booking_events" ADD CONSTRAINT "booking_events_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking_events" ADD CONSTRAINT "booking_events_protector_id_protectors_id_fk" FOREIGN KEY ("protector_id") REFERENCES "public"."protectors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_protector_id_protectors_id_fk" FOREIGN KEY ("protector_id") REFERENCES "public"."protectors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_protector_id_protectors_id_fk" FOREIGN KEY ("protector_id") REFERENCES "public"."protectors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "assessments_customer_idx" ON "assessments" USING btree ("customer_sub");--> statement-breakpoint
CREATE INDEX "booking_events_booking_idx" ON "booking_events" USING btree ("booking_id");--> statement-breakpoint
CREATE INDEX "bookings_customer_idx" ON "bookings" USING btree ("customer_sub");--> statement-breakpoint
CREATE INDEX "bookings_protector_idx" ON "bookings" USING btree ("protector_id");--> statement-breakpoint
CREATE INDEX "bookings_status_idx" ON "bookings" USING btree ("status");--> statement-breakpoint
CREATE INDEX "reports_booking_idx" ON "reports" USING btree ("booking_id");