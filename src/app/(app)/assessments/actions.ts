"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ActionState } from "@/components/action-form";
import { findIntervention } from "@/config/interventions";
import { getDb } from "@/db/client";
import { assessmentInput, describeIssue, environmentInput, formFields } from "@/domain/inputs";
import { createEnvironment, ensureLifeEnvironment } from "@/server/environments";
import { createAssessment } from "@/server/assessments";
import { setStepOutcome, type StepAnswer } from "@/server/step-outcomes";
import { requireViewer } from "@/server/viewer";

export async function createAssessmentAction(_: ActionState, form: FormData): Promise<ActionState> {
  const viewer = await requireViewer();
  const parsed = assessmentInput.safeParse(
    formFields(form, ["protecting", "concerns", "exposures", "threats", "measures"]),
  );
  if (!parsed.success) return { error: describeIssue(parsed.error) };
  const result = await createAssessment(getDb(), viewer.sub, parsed.data);
  if (!result.success) return { error: result.error };
  redirect(`/assessments/${result.data.id}`);
}

export async function createEnvironmentAction(_: ActionState, form: FormData): Promise<ActionState> {
  const viewer = await requireViewer();
  const parsed = environmentInput.safeParse(formFields(form));
  if (!parsed.success) return { error: describeIssue(parsed.error) };
  const env = await createEnvironment(getDb(), viewer.sub, parsed.data);
  redirect(`/assessments/new?place=${env.id}`);
}

export async function assessLifeAction(): Promise<void> {
  const viewer = await requireViewer();
  const life = await ensureLifeEnvironment(getDb(), viewer.sub);
  redirect(`/assessments/new?place=${life.id}`);
}

const ANSWERS: Record<string, StepAnswer> = {
  DONE: { status: "DONE" },
  NOT_FOR_ME: { status: "NOT_FOR_ME" },
  YES: { status: "DONE", helped: "YES" },
  SOMEWHAT: { status: "DONE", helped: "SOMEWHAT" },
  NO: { status: "DONE", helped: "NO" },
  UNDO: null,
};

/** "I did this", "Not for me", "Did it help?" under a step of a Safety Plan. */
export async function stepOutcomeAction(form: FormData): Promise<void> {
  const viewer = await requireViewer();
  const step = form.get("step");
  const answer = String(form.get("answer") ?? "");
  if (typeof step !== "string" || !(answer in ANSWERS) || !findIntervention(step)) return;
  await setStepOutcome(getDb(), viewer.sub, step, ANSWERS[answer]!);
  revalidatePath("/assessments", "layout");
}
