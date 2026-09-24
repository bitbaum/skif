import "server-only";
import { and, desc, eq } from "drizzle-orm";
import { assessments, environments } from "@/db/schema";
import type { Db } from "@/db/types";
import type { AssessmentInput } from "@/domain/inputs";
import { fail, ok, type Result } from "@/domain/result";
import { leansOf } from "@/domain/preference-fit";
import { buildSafetyPlan } from "@/domain/safety-plan";
import { getEnvironment, type Environment } from "./environments";
import { getPreferences } from "./preferences";

export type Assessment = typeof assessments.$inferSelect;

/** Run an assessment against the person's current hard constraints and save
 * the answers and the resulting Safety Plan, constraints included, as decided. */
export async function createAssessment(
  db: Db,
  customerSub: string,
  input: AssessmentInput,
): Promise<Result<Assessment>> {
  const prefs = await getPreferences(db, customerSub);
  if (!prefs) return fail("Set your safety preferences before an assessment");
  const environment = await getEnvironment(db, customerSub, input.environmentId);
  if (!environment) return fail("Choose one of your places");
  const { environmentId: _, protecting: __, ...answers } = input;
  const plan = buildSafetyPlan({
    ...answers,
    environment: environment.type,
    constraints: prefs.hardConstraints,
    leans: leansOf(prefs.axes, prefs.presenceStyle),
  });
  const [row] = await db
    .insert(assessments)
    .values({ customerSub, ...input, plan })
    .returning();
  return ok(row!);
}

export type AssessmentWithPlace = Assessment & { environment: Environment };

export async function listAssessments(db: Db, customerSub: string): Promise<AssessmentWithPlace[]> {
  const rows = await db
    .select({ assessment: assessments, environment: environments })
    .from(assessments)
    .innerJoin(environments, eq(assessments.environmentId, environments.id))
    .where(eq(assessments.customerSub, customerSub))
    .orderBy(desc(assessments.createdAt));
  return rows.map((r) => ({ ...r.assessment, environment: r.environment }));
}

export async function getAssessment(db: Db, customerSub: string, id: string): Promise<AssessmentWithPlace | null> {
  const [row] = await db
    .select({ assessment: assessments, environment: environments })
    .from(assessments)
    .innerJoin(environments, eq(assessments.environmentId, environments.id))
    .where(and(eq(assessments.id, id), eq(assessments.customerSub, customerSub)));
  return row ? { ...row.assessment, environment: row.environment } : null;
}
