"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionState } from "@/components/action-form";
import { getDb } from "@/db/client";
import { idInput } from "@/domain/inputs";
import { applyBookingAction } from "@/server/lifecycle";
import { PROTECTOR_STATUSES } from "@/domain/protector-status";
import { assessCapability, setProtectorStatus } from "@/server/protectors";
import { requireOps } from "@/server/viewer";

export async function assignAction(_: ActionState, form: FormData): Promise<ActionState> {
  const viewer = await requireOps();
  const bookingId = idInput.safeParse(form.get("bookingId"));
  const protectorId = idInput.safeParse(form.get("protectorId"));
  if (!bookingId.success || !protectorId.success) return { error: "Invalid request" };
  const result = await applyBookingAction(
    getDb(),
    bookingId.data,
    { action: "ASSIGN", protectorId: protectorId.data },
    { role: "OPS", sub: viewer.sub },
  );
  if (!result.success) return { error: result.error };
  revalidatePath(`/ops/bookings/${bookingId.data}`);
  return null;
}

export async function opsCancelAction(_: ActionState, form: FormData): Promise<ActionState> {
  const viewer = await requireOps();
  const bookingId = idInput.safeParse(form.get("bookingId"));
  if (!bookingId.success) return { error: "Invalid request" };
  const result = await applyBookingAction(getDb(), bookingId.data, { action: "CANCEL" }, { role: "OPS", sub: viewer.sub });
  if (!result.success) return { error: result.error };
  revalidatePath(`/ops/bookings/${bookingId.data}`);
  return null;
}

const PROTECTOR_STATUS = z.enum(PROTECTOR_STATUSES);

export async function protectorStatusAction(_: ActionState, form: FormData): Promise<ActionState> {
  await requireOps();
  const id = idInput.safeParse(form.get("protectorId"));
  const status = PROTECTOR_STATUS.safeParse(form.get("status"));
  if (!id.success || !status.success) return { error: "Invalid request" };
  const result = await setProtectorStatus(getDb(), id.data, status.data);
  if (!result.success) return { error: result.error };
  revalidatePath("/ops");
  revalidatePath(`/ops/protectors/${id.data}`);
  return null;
}

const ASSESSMENT = z.enum(["VERIFIED", "REJECTED"]);

export async function assessCapabilityAction(_: ActionState, form: FormData): Promise<ActionState> {
  const viewer = await requireOps();
  const id = idInput.safeParse(form.get("capabilityId"));
  const verdict = ASSESSMENT.safeParse(form.get("verification"));
  if (!id.success || !verdict.success) return { error: "Invalid request" };
  const result = await assessCapability(getDb(), id.data, verdict.data, viewer.sub);
  if (!result.success) return { error: result.error };
  revalidatePath(`/ops/protectors/${result.data.protectorId}`);
  return null;
}
