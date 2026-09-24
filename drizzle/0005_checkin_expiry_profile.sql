ALTER TYPE "public"."booking_status" ADD VALUE 'CHECKED_IN' BEFORE 'IN_PROGRESS';--> statement-breakpoint
ALTER TYPE "public"."booking_status" ADD VALUE 'EXPIRED';--> statement-breakpoint
CREATE TABLE "customer_profiles" (
	"sub" text PRIMARY KEY NOT NULL,
	"preferred_name" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
