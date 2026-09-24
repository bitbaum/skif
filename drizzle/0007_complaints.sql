CREATE TYPE "public"."complaint_category" AS ENUM('DISRESPECT', 'UNPROFESSIONAL', 'FELT_UNSAFE', 'PRIVACY', 'SERVICE', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."complaint_status" AS ENUM('RECEIVED', 'AWAITING_RESPONSE', 'UNDER_REVIEW', 'UPHELD', 'NOT_UPHELD', 'APPEALED');--> statement-breakpoint
CREATE TABLE "complaints" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"customer_sub" text NOT NULL,
	"protector_id" uuid,
	"category" "complaint_category" NOT NULL,
	"body" text NOT NULL,
	"status" "complaint_status" DEFAULT 'RECEIVED' NOT NULL,
	"summary_for_protector" text,
	"protector_response" text,
	"appeal" text,
	"decision_note" text,
	"decided_by" text,
	"decided_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_protector_id_protectors_id_fk" FOREIGN KEY ("protector_id") REFERENCES "public"."protectors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "complaints_status_idx" ON "complaints" USING btree ("status");--> statement-breakpoint
CREATE INDEX "complaints_protector_idx" ON "complaints" USING btree ("protector_id");--> statement-breakpoint
CREATE INDEX "complaints_booking_idx" ON "complaints" USING btree ("booking_id");