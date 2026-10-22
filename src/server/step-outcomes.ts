import "server-only";
import { and, eq } from "drizzle-orm";
import { findIntervention } from "@/config/interventions";
import { stepOutcomes } from "@/db/schema";
import type { Db } from "@/db/types";
import { STEP_HELPED, STEP_STATUSES, type StepHelped, type StepOutcome, type StepStatus } from "@/domain/step-outcomes";

/** Everything this person has said about their steps, by intervention key. */
export async function outcomesOf(db: Db, sub: string): Promise<Map<string, StepOutcome>> {
  const rows = await db.select().from(stepOutcomes).where(eq(stepOutcomes.sub, sub));
  return new Map(rows.map((r) => [r.interventionKey, { status: r.status, helped: r.helped }]));
}

export type StepAnswer = { status: StepStatus; helped?: StepHelped | null } | null;

/**
 * Record what the person said about a step, or forget it (`null`). Saying a
 * step was done keeps an earlier "did it help?" answer unless a new one is
 * given; "not for me" clears it.
 */
export async function setStepOutcome(db: Db, sub: string, interventionKey: string, answer: StepAnswer): Promise<void> {
  if (!findIntervention(interventionKey)) throw new Error(`Unknown step: ${interventionKey}`);
  const where = and(eq(stepOutcomes.sub, sub), eq(stepOutcomes.interventionKey, interventionKey));
  if (!answer) {
    await db.delete(stepOutcomes).where(where);
    return;
  }
  if (!STEP_STATUSES.includes(answer.status)) throw new Error(`Unknown status: ${answer.status}`);
  if (answer.helped && !STEP_HELPED.includes(answer.helped)) throw new Error(`Unknown answer: ${answer.helped}`);
  const helped = answer.status === "NOT_FOR_ME" ? null : answer.helped;
  await db
    .insert(stepOutcomes)
    .values({ sub, interventionKey, status: answer.status, helped: helped ?? null })
    .onConflictDoUpdate({
      target: [stepOutcomes.sub, stepOutcomes.interventionKey],
      set: { status: answer.status, ...(helped !== undefined ? { helped } : {}), updatedAt: new Date() },
    });
}
