CREATE TYPE "public"."capability_level" AS ENUM('BASIC', 'PROFICIENT', 'ADVANCED');--> statement-breakpoint
CREATE TYPE "public"."verification_status" AS ENUM('SELF_DECLARED', 'VERIFIED', 'REJECTED');--> statement-breakpoint
ALTER TYPE "public"."protector_status" ADD VALUE 'REJECTED';--> statement-breakpoint
CREATE TABLE "protector_capabilities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"protector_id" uuid NOT NULL,
	"capability" text NOT NULL,
	"level" "capability_level" NOT NULL,
	"verification" "verification_status" DEFAULT 'SELF_DECLARED' NOT NULL,
	"certification" text DEFAULT '' NOT NULL,
	"evidence" text DEFAULT '' NOT NULL,
	"expires_on" date,
	"assessed_by" text,
	"assessed_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "protector_capabilities_unique" UNIQUE("protector_id","capability")
);
--> statement-breakpoint
ALTER TABLE "protectors" ADD COLUMN "experience_years" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "protector_capabilities" ADD CONSTRAINT "protector_capabilities_protector_id_protectors_id_fk" FOREIGN KEY ("protector_id") REFERENCES "public"."protectors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
-- Carry v1's flat skill tags across as self-declared capabilities.
INSERT INTO "protector_capabilities" ("protector_id", "capability", "level")
SELECT "id", unnest("skills"), 'PROFICIENT' FROM "protectors"
ON CONFLICT DO NOTHING;
