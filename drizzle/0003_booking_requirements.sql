ALTER TYPE "public"."service" ADD VALUE 'PERSONAL_PROTECTION';--> statement-breakpoint
ALTER TYPE "public"."service" ADD VALUE 'PROTECTOR_DRIVER';--> statement-breakpoint
ALTER TYPE "public"."service" ADD VALUE 'SPECIALIST_SUPPORT';--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "required_capabilities" text[] DEFAULT '{}'::text[] NOT NULL;