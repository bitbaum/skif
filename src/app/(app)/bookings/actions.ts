"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { after } from "next/server";
import type { ActionState } from "@/components/action-form";
import { getDb } from "@/db/client";
import { bookingInput, complaintInput, describeIssue, formFields, idInput, ratingInput } from "@/domain/inputs";
import { bookingAlert } from "@/domain/ops-alerts";
import { fileComplaint } from "@/server/complaints";
import { createBooking } from "@/server/bookings";
import { rateBooking } from "@/server/feedback";
import { applyBookingAction } from "@/server/lifecycle";
import { alertOps } from "@/server/ops-alerts";
import { checkRateLimit } from "@/server/rate-limit";
import { requireViewer } from "@/server/viewer";

export async function createBookingAction(_: ActionState, form: FormData): Promise<ActionState> {
  const viewer = await requireViewer();
  const limited = await checkRateLimit("BOOKING", viewer.sub);
  if (!limited.success) return { error: limited.error };
  const parsed = bookingInput.safeParse(formFields(form, ["requiredCapabilities"]));
  if (!parsed.success) return { error: describeIssue(parsed.error) };
  const result = await createBooking(getDb(), viewer.sub, parsed.data);
  if (!result.success) return { error: result.error };
  // After the response: the customer never waits on, or sees, the Ops email.
  const booking = result.data;
  after(() => alertOps(bookingAlert(booking)));
  redirect(`/bookings/${booking.id}`);
}

export async function cancelBookingAction(_: ActionState, form: FormData): Promise<ActionState> {
  const viewer = await requireViewer();
  const id = idInput.safeParse(form.get("bookingId"));
  if (!id.success) return { error: "Booking not found" };
  const result = await applyBookingAction(getDb(), id.data, { action: "CANCEL" }, { role: "CUSTOMER", sub: viewer.sub });
  if (!result.success) return { error: result.error };
  revalidatePath(`/bookings/${id.data}`);
  return null;
}

export async function rateBookingAction(_: ActionState, form: FormData): Promise<ActionState> {
  const viewer = await requireViewer();
  const id = idInput.safeParse(form.get("bookingId"));
  if (!id.success) return { error: "Booking not found" };
  const parsed = ratingInput.safeParse(formFields(form));
  if (!parsed.success) return { error: describeIssue(parsed.error) };
  const result = await rateBooking(getDb(), viewer.sub, id.data, parsed.data);
  if (!result.success) return { error: result.error };
  revalidatePath(`/bookings/${id.data}`);
  return null;
}

export async function fileComplaintAction(_: ActionState, form: FormData): Promise<ActionState> {
  const viewer = await requireViewer();
  const id = idInput.safeParse(form.get("bookingId"));
  if (!id.success) return { error: "Booking not found" };
  const parsed = complaintInput.safeParse(formFields(form));
  if (!parsed.success) return { error: describeIssue(parsed.error) };
  const limited = await checkRateLimit("COMPLAINT", viewer.sub);
  if (!limited.success) return { error: limited.error };
  const result = await fileComplaint(getDb(), viewer.sub, id.data, parsed.data);
  if (!result.success) return { error: result.error };
  revalidatePath(`/bookings/${id.data}`);
  return null;
}
