"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { ActionState } from "@/components/action-form";
import { getDb } from "@/db/client";
import {
  capabilityFields,
  describeIssue,
  formFields,
  idInput,
  parseAvailability,
  protectorApplication,
  reportInput,
} from "@/domain/inputs";
import { fileReport } from "@/server/feedback";
import { applyBookingAction } from "@/server/lifecycle";
import { saveAvailability } from "@/server/availability";
import { applyAsProtector } from "@/server/protectors";
import { requireApprovedProtector, requireViewer } from "@/server/viewer";

export async function applyAction(_: ActionState, form: FormData): Promise<ActionState> {
  const viewer = await requireViewer();
  const parsed = protectorApplication.safeParse({
    ...formFields(form, ["languages", "services", "presenceStyles"]),
    capabilities: capabilityFields(form),
  });
  if (!parsed.success) return { error: describeIssue(parsed.error) };
  await applyAsProtector(getDb(), viewer.sub, parsed.data);
  redirect("/protector?saved=1");
}

const JOB_ACTIONS = z.enum(["ACCEPT", "DECLINE", "START", "COMPLETE"]);

export async function protectorJobAction(_: ActionState, form: FormData): Promise<ActionState> {
  const viewer = await requireApprovedProtector();
  const id = idInput.safeParse(form.get("bookingId"));
  const action = JOB_ACTIONS.safeParse(form.get("action"));
  if (!id.success || !action.success) return { error: "Invalid request" };
  const result = await applyBookingAction(
    getDb(),
    id.data,
    { action: action.data },
    { role: "PROTECTOR", sub: viewer.sub, protectorId: viewer.protector.id },
  );
  if (!result.success) return { error: result.error };
  if (action.data === "DECLINE") redirect("/protector");
  revalidatePath(`/protector/jobs/${id.data}`);
  return null;
}

export async function reportAction(_: ActionState, form: FormData): Promise<ActionState> {
  const viewer = await requireApprovedProtector();
  const id = idInput.safeParse(form.get("bookingId"));
  if (!id.success) return { error: "Booking not found" };
  const parsed = reportInput.safeParse(formFields(form, [], ["policeInvolved"]));
  if (!parsed.success) return { error: describeIssue(parsed.error) };
  const result = await fileReport(getDb(), viewer.protector.id, id.data, parsed.data);
  if (!result.success) return { error: result.error };
  revalidatePath(`/protector/jobs/${id.data}`);
  return null;
}

export async function availabilityAction(_: ActionState, form: FormData): Promise<ActionState> {
  const viewer = await requireViewer();
  if (!viewer.protector) return { error: "Apply as a Protector first" };
  const windows = parseAvailability(form);
  if (!windows.success) return { error: windows.error };
  await saveAvailability(getDb(), viewer.protector.id, windows.data);
  redirect("/protector?saved=1");
}
