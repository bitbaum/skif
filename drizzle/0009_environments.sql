CREATE TYPE "public"."environment_type" AS ENUM('HOME', 'VENUE', 'WORKPLACE', 'VEHICLE', 'JOURNEY', 'EVENT');--> statement-breakpoint
CREATE TABLE "environments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_sub" text NOT NULL,
	"type" "environment_type" NOT NULL,
	"name" text NOT NULL,
	"area" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "assessments" ALTER COLUMN "place_name" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "assessments" ADD COLUMN "environment_id" uuid;--> statement-breakpoint
-- Every earlier assessment named its place in free text; each distinct
-- (person, name) becomes a Home environment the assessments point at.
INSERT INTO "environments" ("owner_sub", "type", "name", "created_at")
SELECT "customer_sub", 'HOME', "place_name", min("created_at") FROM "assessments" GROUP BY "customer_sub", "place_name";--> statement-breakpoint
UPDATE "assessments" a SET "environment_id" = e."id"
FROM "environments" e WHERE e."owner_sub" = a."customer_sub" AND e."name" = a."place_name";--> statement-breakpoint
ALTER TABLE "assessments" ALTER COLUMN "environment_id" SET NOT NULL;--> statement-breakpoint
CREATE INDEX "environments_owner_idx" ON "environments" USING btree ("owner_sub");--> statement-breakpoint
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_environment_id_environments_id_fk" FOREIGN KEY ("environment_id") REFERENCES "public"."environments"("id") ON DELETE no action ON UPDATE no action;