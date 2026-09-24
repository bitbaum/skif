CREATE TABLE "protector_availability" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"protector_id" uuid NOT NULL,
	"weekday" smallint NOT NULL,
	"start_minute" smallint NOT NULL,
	"duration_minutes" smallint NOT NULL,
	CONSTRAINT "protector_availability_day" UNIQUE("protector_id","weekday"),
	CONSTRAINT "availability_weekday" CHECK ("protector_availability"."weekday" BETWEEN 1 AND 7),
	CONSTRAINT "availability_start" CHECK ("protector_availability"."start_minute" BETWEEN 0 AND 1439),
	CONSTRAINT "availability_duration" CHECK ("protector_availability"."duration_minutes" BETWEEN 1 AND 1440)
);
--> statement-breakpoint
ALTER TABLE "protector_availability" ADD CONSTRAINT "protector_availability_protector_id_protectors_id_fk" FOREIGN KEY ("protector_id") REFERENCES "public"."protectors"("id") ON DELETE no action ON UPDATE no action;