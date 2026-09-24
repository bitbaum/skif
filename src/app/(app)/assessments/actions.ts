"use server";

import { redirect } from "next/navigation";
import type { ActionState } from "@/components/action-form";
import { getDb } from "@/db/client";
import { assessmentInput, describeIssue, formFields } from "@/domain/inputs";
import { createAssessment } from "@/server/assessments";
import { requireViewer } from "@/server/viewer";

export async function createAssessmentAction(_: ActionState, form: FormData): Promise<ActionState> {
  const viewer = await requireViewer();
  const parsed = assessmentInput.safeParse(formFields(form, ["concerns", "measures"]));
  if (!parsed.success) return { error: describeIssue(parsed.error) };
  const result = await createAssessment(getDb(), viewer.sub, parsed.data);
  if (!result.success) return { error: result.error };
  redirect(`/assessments/${result.data.id}`);
}
