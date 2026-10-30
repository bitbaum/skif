import "server-only";
import { randomUUID } from "node:crypto";
import { and, desc, eq } from "drizzle-orm";
import { CASE_LIMITS, stepsForKind } from "@/config/cases";
import { caseFiles } from "@/db/schema";
import type { Db } from "@/db/types";
import type { CaseInput, IndicatorInput, TimelineInput } from "@/domain/cases";
import { fail, ok, type Result } from "@/domain/result";

export type CaseFile = typeof caseFiles.$inferSelect;

/** Every query is scoped to the owner: a case file id alone opens nothing. */
const owned = (ownerSub: string, id: string) =>
  and(eq(caseFiles.id, id), eq(caseFiles.ownerSub, ownerSub));

export async function listCaseFiles(
  db: Db,
  ownerSub: string,
): Promise<CaseFile[]> {
  return db
    .select()
    .from(caseFiles)
    .where(eq(caseFiles.ownerSub, ownerSub))
    .orderBy(desc(caseFiles.createdAt));
}

export async function getCaseFile(
  db: Db,
  ownerSub: string,
  id: string,
): Promise<CaseFile | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const [row] = await db.select().from(caseFiles).where(owned(ownerSub, id));
  return row ?? null;
}

export async function createCaseFile(
  db: Db,
  ownerSub: string,
  input: CaseInput,
): Promise<CaseFile> {
  const [row] = await db
    .insert(caseFiles)
    .values({ ownerSub, ...input })
    .returning();
  return row!;
}

export async function updateCaseFile(
  db: Db,
  ownerSub: string,
  id: string,
  input: CaseInput,
): Promise<Result> {
  const rows = await db
    .update(caseFiles)
    .set({ ...input, updatedAt: new Date() })
    .where(owned(ownerSub, id))
    .returning({ id: caseFiles.id });
  return rows.length ? ok(undefined) : fail("Case file not found");
}

/** Read, change and write one case file's lists. Last write wins: a case file
 * has one owner, editing it from one place at a time. */
async function change(
  db: Db,
  ownerSub: string,
  id: string,
  edit: (
    c: CaseFile,
  ) => Result<Partial<Pick<CaseFile, "timeline" | "indicators" | "stepsDone">>>,
): Promise<Result> {
  const current = await getCaseFile(db, ownerSub, id);
  if (!current) return fail("Case file not found");
  const next = edit(current);
  if (!next.success) return next;
  await db
    .update(caseFiles)
    .set({ ...next.data, updatedAt: new Date() })
    .where(owned(ownerSub, id));
  return ok(undefined);
}

export function addTimelineEntry(
  db: Db,
  ownerSub: string,
  id: string,
  input: TimelineInput,
): Promise<Result> {
  return change(db, ownerSub, id, (c) =>
    c.timeline.length >= CASE_LIMITS.entriesMax
      ? fail(
          `A case file holds up to ${CASE_LIMITS.entriesMax} timeline entries`,
        )
      : ok({ timeline: [...c.timeline, { id: randomUUID(), ...input }] }),
  );
}

export function removeTimelineEntry(
  db: Db,
  ownerSub: string,
  id: string,
  entryId: string,
): Promise<Result> {
  return change(db, ownerSub, id, (c) =>
    ok({ timeline: c.timeline.filter((e) => e.id !== entryId) }),
  );
}

export function addIndicator(
  db: Db,
  ownerSub: string,
  id: string,
  input: IndicatorInput,
): Promise<Result> {
  return change(db, ownerSub, id, (c) =>
    c.indicators.length >= CASE_LIMITS.entriesMax
      ? fail(`A case file holds up to ${CASE_LIMITS.entriesMax} details`)
      : ok({ indicators: [...c.indicators, { id: randomUUID(), ...input }] }),
  );
}

export function removeIndicator(
  db: Db,
  ownerSub: string,
  id: string,
  indicatorId: string,
): Promise<Result> {
  return change(db, ownerSub, id, (c) =>
    ok({ indicators: c.indicators.filter((i) => i.id !== indicatorId) }),
  );
}

/** Tick or untick a recovery step. Only steps that apply to this kind of case. */
export function setStepDone(
  db: Db,
  ownerSub: string,
  id: string,
  step: string,
  done: boolean,
): Promise<Result> {
  return change(db, ownerSub, id, (c) => {
    const step_ = stepsForKind(c.kind).find((s) => s.key === step);
    if (!step_) return fail("That step does not apply to this case");
    const rest = c.stepsDone.filter((k) => k !== step_.key);
    return ok({
      stepsDone: done
        ? [...rest, step_.key as (typeof c.stepsDone)[number]]
        : rest,
    });
  });
}

export async function deleteCaseFile(
  db: Db,
  ownerSub: string,
  id: string,
): Promise<Result> {
  const rows = await db
    .delete(caseFiles)
    .where(owned(ownerSub, id))
    .returning({ id: caseFiles.id });
  return rows.length ? ok(undefined) : fail("Case file not found");
}
