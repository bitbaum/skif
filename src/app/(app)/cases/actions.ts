"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ActionState } from "@/components/action-form";
import { getDb } from "@/db/client";
import {
  caseInput,
  indicatorInput,
  stepKey,
  timelineInput,
} from "@/domain/cases";
import { describeIssue, formFields, idInput } from "@/domain/inputs";
import type { Result } from "@/domain/result";
import {
  addIndicator,
  addTimelineEntry,
  createCaseFile,
  deleteCaseFile,
  removeIndicator,
  removeTimelineEntry,
  setStepDone,
  updateCaseFile,
} from "@/server/cases";
import { requireViewer } from "@/server/viewer";

const LABELS = {
  title: "Name",
  happenedOn: "Date",
  at: "When",
  what: "What happened",
  value: "Detail",
};

function caseId(form: FormData): string | null {
  const id = idInput.safeParse(form.get("caseId"));
  return id.success ? id.data : null;
}

function settle(id: string, result: Result): ActionState {
  if (!result.success) return { error: result.error };
  revalidatePath(`/cases/${id}`);
  return null;
}

export async function createCaseAction(
  _: ActionState,
  form: FormData,
): Promise<ActionState> {
  const viewer = await requireViewer();
  const parsed = caseInput.safeParse(formFields(form));
  if (!parsed.success) return { error: describeIssue(parsed.error, LABELS) };
  const c = await createCaseFile(getDb(), viewer.sub, parsed.data);
  redirect(`/cases/${c.id}`);
}

export async function updateCaseAction(
  _: ActionState,
  form: FormData,
): Promise<ActionState> {
  const viewer = await requireViewer();
  const id = caseId(form);
  if (!id) return { error: "Case file not found" };
  const parsed = caseInput.safeParse(formFields(form));
  if (!parsed.success) return { error: describeIssue(parsed.error, LABELS) };
  return settle(id, await updateCaseFile(getDb(), viewer.sub, id, parsed.data));
}

export async function addTimelineAction(
  _: ActionState,
  form: FormData,
): Promise<ActionState> {
  const viewer = await requireViewer();
  const id = caseId(form);
  if (!id) return { error: "Case file not found" };
  const parsed = timelineInput.safeParse(formFields(form));
  if (!parsed.success) return { error: describeIssue(parsed.error, LABELS) };
  return settle(
    id,
    await addTimelineEntry(getDb(), viewer.sub, id, parsed.data),
  );
}

export async function addIndicatorAction(
  _: ActionState,
  form: FormData,
): Promise<ActionState> {
  const viewer = await requireViewer();
  const id = caseId(form);
  if (!id) return { error: "Case file not found" };
  const parsed = indicatorInput.safeParse(formFields(form));
  if (!parsed.success) return { error: describeIssue(parsed.error, LABELS) };
  return settle(id, await addIndicator(getDb(), viewer.sub, id, parsed.data));
}

/** Remove one timeline entry or one detail: plain forms, one button each. */
export async function removeEntryAction(form: FormData): Promise<void> {
  const viewer = await requireViewer();
  const id = caseId(form);
  const entry = String(form.get("entryId") ?? "");
  if (!id || !entry) return;
  const remove =
    form.get("list") === "indicators" ? removeIndicator : removeTimelineEntry;
  await remove(getDb(), viewer.sub, id, entry);
  revalidatePath(`/cases/${id}`);
}

export async function stepAction(form: FormData): Promise<void> {
  const viewer = await requireViewer();
  const id = caseId(form);
  const step = stepKey.safeParse(form.get("step"));
  if (!id || !step.success) return;
  await setStepDone(
    getDb(),
    viewer.sub,
    id,
    step.data,
    form.get("done") === "1",
  );
  revalidatePath(`/cases/${id}`);
}

export async function deleteCaseAction(form: FormData): Promise<void> {
  const viewer = await requireViewer();
  const id = caseId(form);
  if (!id || form.get("confirm") !== "DELETE") return;
  await deleteCaseFile(getDb(), viewer.sub, id);
  revalidatePath("/cases");
  redirect("/cases");
}
