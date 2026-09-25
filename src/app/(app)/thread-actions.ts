"use server";

import { refresh } from "next/cache";
import type { ActionState } from "@/components/action-form";
import { getDb } from "@/db/client";
import { describeIssue, threadMessageInput } from "@/domain/inputs";
import { postMessage, seatActor } from "@/server/booking-thread";
import { checkRateLimit } from "@/server/rate-limit";
import { requireViewer } from "@/server/viewer";

/** Send a message in a booking's thread from the seat the page shows. The
 * seat is only a claim: seatActor checks the viewer holds it, and the thread
 * (derived from the lifecycle) decides whether that seat may write now. */
export async function sendThreadMessageAction(input: unknown): Promise<ActionState> {
  const viewer = await requireViewer();
  const parsed = threadMessageInput.safeParse(input);
  if (!parsed.success) return { error: describeIssue(parsed.error) };
  const limited = await checkRateLimit("MESSAGE", viewer.sub);
  if (!limited.success) return { error: limited.error };
  const { bookingId, seat, body } = parsed.data;
  const result = await postMessage(getDb(), bookingId, (booking) => seatActor(viewer, booking, seat), body);
  if (!result.success) return { error: result.error };
  refresh();
  return null;
}
