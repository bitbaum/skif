CREATE TABLE "course_interests" (
	"sub" text NOT NULL,
	"course_key" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "course_interests_sub_course_key_pk" PRIMARY KEY("sub","course_key")
);
