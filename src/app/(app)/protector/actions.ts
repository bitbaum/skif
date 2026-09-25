"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { z } from "zod";
import type { ActionState } from "@/components/action-form";
import { getDb } from "@/db/client";
import {
  capabilityFields,
  complaintActionInput,
  describeIssue,
  formFields,
  idInput,
  parseAvailability,
  protectorApplication,
  reportInput,
} from "@/domain/inputs";
import { reportAlert } from "@/domain/ops-alerts";
import { fileReport } from "@/server/feedback";
import { applyBookingAction } from "@/server/lifecycle";
import { alertOps } from "@/server/ops-alerts";
import { saveAvailability } from "@/server/availability";
import { actOnComplaint } from "@/server/complaints";
import { applyAsProtector } from "@/server/protectors";
import { checkRateLimit } from "@/server/rate-limit";
import { requireApprovedProtector, requireViewer } from "@/server/viewer";

export async function applyAction(_: ActionState, form: FormData): Promise<ActionState> {
  const viewer = await requireViewer();
  const parsed = protectorApplication.safeParse({
    ...formFields(form, ["languages", "services", "presenceStyles"]),
    capabilities: capabilityFields(form),
  });
  if (!parsed.success) return { error: describeIssue(parsed.error) };
  const limited = await checkRateLimit("APPLY", viewer.sub);
  if (!limited.success) return { error: limited.error };
  await applyAsProtector(getDb(), viewer.sub, parsed.data);
  redirect("/protector?saved=1");
}

const JOB_ACTIONS = z.enum(["ACCEPT", "DECLINE", "CHECK_IN", "START", "COMPLETE"]);

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
  const parsed = reportInput.safeParse(formFields(form, ["observations"], ["policeInvolved"]));
  if (!parsed.success) return { error: describeIssue(parsed.error) };
  const result = await fileReport(getDb(), viewer.protector.id, id.data, parsed.data);
  if (!result.success) return { error: result.error };
  // After the response: filing the report never waits on, or fails with, the Ops email.
  const report = { id: result.data.id, bookingId: id.data, kind: parsed.data.kind };
  after(() => alertOps(reportAlert(report)));
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

export async function protectorComplaintAction(_: ActionState, form: FormData): Promise<ActionState> {
  const viewer = await requireApprovedProtector();
  const id = idInput.safeParse(form.get("complaintId"));
  if (!id.success) return { error: "Complaint not found" };
  const parsed = complaintActionInput.safeParse(formFields(form));
  if (!parsed.success) return { error: describeIssue(parsed.error) };
  const actor = { role: "PROTECTOR", sub: viewer.sub, protectorId: viewer.protector.id } as const;
  const result = await actOnComplaint(getDb(), id.data, actor, parsed.data);
  if (!result.success) return { error: result.error };
  revalidatePath("/protector");
  return null;
}
