/** The Academy's one table: who asked to hear when a course starts. */
import { pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { createdAt } from "./shared";

/**
 * A person asking to be told when a course starts. The course key is from
 * src/config/academy.ts; nothing else is stored, so a person can say "this
 * one" without telling Skif anything about why.
 */
export const courseInterests = pgTable(
  "course_interests",
  {
    sub: text("sub").notNull(),
    courseKey: text("course_key").notNull(),
    createdAt: createdAt(),
  },
  (t) => [primaryKey({ columns: [t.sub, t.courseKey] })],
);
