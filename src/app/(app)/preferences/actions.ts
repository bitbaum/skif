"use server";

import { redirect } from "next/navigation";
import type { ActionState } from "@/components/action-form";
import { getDb } from "@/db/client";
import { describeIssue, formFields, localPath, preferencesInput, profileInput } from "@/domain/inputs";
import { saveCustomerProfile } from "@/server/customers";
import { savePreferences } from "@/server/preferences";
import { requireViewer } from "@/server/viewer";

export async function savePreferencesAction(_: ActionState, form: FormData): Promise<ActionState> {
  const viewer = await requireViewer();
  const parsed = preferencesInput.safeParse(formFields(form, ["hardConstraints", "languages"]));
  if (!parsed.success) return { error: describeIssue(parsed.error) };
  await savePreferences(getDb(), viewer.sub, parsed.data);
  redirect(localPath(form.get("next"), "/preferences?saved=1"));
}

export async function saveProfileAction(_: ActionState, form: FormData): Promise<ActionState> {
  const viewer = await requireViewer();
  const parsed = profileInput.safeParse(formFields(form));
  if (!parsed.success) return { error: describeIssue(parsed.error) };
  await saveCustomerProfile(getDb(), viewer.sub, parsed.data);
  redirect("/preferences?saved=1");
}
