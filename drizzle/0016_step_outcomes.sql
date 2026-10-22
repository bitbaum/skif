CREATE TABLE "step_outcomes" (
	"sub" text NOT NULL,
	"intervention_key" text NOT NULL,
	"status" text NOT NULL,
	"helped" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "step_outcomes_sub_intervention_key_pk" PRIMARY KEY("sub","intervention_key")
);
