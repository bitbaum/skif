import "server-only";
import { and, count, eq } from "drizzle-orm";
import { COURSES } from "@/config/academy";
import { courseInterests } from "@/db/schema";
import type { Db } from "@/db/types";

const COURSE_KEYS = new Set<string>(COURSES.map((c) => c.key));

export function isCourseKey(key: unknown): key is string {
  return typeof key === "string" && COURSE_KEYS.has(key);
}

/** The courses this person asked to hear about. */
export async function interestsOf(db: Db, sub: string): Promise<Set<string>> {
  const rows = await db.select({ key: courseInterests.courseKey }).from(courseInterests).where(eq(courseInterests.sub, sub));
  return new Set(rows.map((r) => r.key));
}

/** Ask, or stop asking, to hear when a course starts. Idempotent both ways. */
export async function setInterest(db: Db, sub: string, courseKey: string, wanted: boolean): Promise<void> {
  if (!isCourseKey(courseKey)) throw new Error(`Unknown course: ${courseKey}`);
  if (wanted) await db.insert(courseInterests).values({ sub, courseKey }).onConflictDoNothing();
  else await db.delete(courseInterests).where(and(eq(courseInterests.sub, sub), eq(courseInterests.courseKey, courseKey)));
}

/** How many people wait for each course, most-wanted first: what Operations
 * schedules from. Counts only, never who. */
export async function interestCounts(db: Db): Promise<{ courseKey: string; people: number }[]> {
  const rows = await db
    .select({ courseKey: courseInterests.courseKey, people: count() })
    .from(courseInterests)
    .groupBy(courseInterests.courseKey);
  return rows.filter((r) => isCourseKey(r.courseKey)).sort((a, b) => b.people - a.people || a.courseKey.localeCompare(b.courseKey));
}
