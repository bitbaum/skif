import "server-only";
import { and, desc, eq } from "drizzle-orm";
import { assessments } from "@/db/schema";
import type { Db } from "@/db/types";
import type { AssessmentInput } from "@/domain/inputs";
import { fail, ok, type Result } from "@/domain/result";
import { buildSafetyPlan } from "@/domain/safety-plan";
import { getPreferences } from "./preferences";

export type Assessment = typeof assessments.$inferSelect;

/** Run an assessment against the person's current hard constraints and save
 * the resulting Safety Plan, constraints included, as it was decided. */
export async function createAssessment(
  db: Db,
  customerSub: string,
  input: AssessmentInput,
): Promise<Result<Assessment>> {
  const prefs = await getPreferences(db, customerSub);
  if (!prefs) return fail("Set your safety preferences before an assessment");
  const plan = buildSafetyPlan({
    concerns: input.concerns,
    measures: input.measures,
    constraints: prefs.hardConstraints,
  });
  const [row] = await db
    .insert(assessments)
    .values({ customerSub, ...input, plan })
    .returning();
  return ok(row!);
}

export async function listAssessments(db: Db, customerSub: string): Promise<Assessment[]> {
  return db
    .select()
    .from(assessments)
    .where(eq(assessments.customerSub, customerSub))
    .orderBy(desc(assessments.createdAt));
}

export async function getAssessment(db: Db, customerSub: string, id: string): Promise<Assessment | null> {
  const [row] = await db
    .select()
    .from(assessments)
    .where(and(eq(assessments.id, id), eq(assessments.customerSub, customerSub)));
  return row ?? null;
}
