import "server-only";
import { bookingEvents, bookings } from "@/db/schema";
import type { Db } from "@/db/types";
import { and, eq, inArray, lte } from "drizzle-orm";
import { EXPIRABLE_STATUSES, isOverdue, nextStatus, type ActorRole, type BookingAction } from "@/domain/lifecycle";
import type { MatchReason } from "@/domain/matching";
import { fail, ok, type Result } from "@/domain/result";
import { audit } from "./audit";
import type { Booking } from "./bookings";
import { matchForBooking } from "./matching";

export type Actor =
  | { role: "CUSTOMER"; sub: string }
  | { role: "PROTECTOR"; sub: string; protectorId: string }
  | { role: "OPS"; sub: string };

const SYSTEM = { role: "SYSTEM", sub: "system" } as const;

type ActionRequest =
  /** `overrideReason` lets Operations assign someone the matcher excluded. */
  | { action: "ASSIGN"; protectorId: string; overrideReason?: string }
  | { action: Exclude<BookingAction, "ASSIGN" | "EXPIRE"> };

type Assignment = { protectorId: string; matchReasons: MatchReason[]; note: string | null };

/** Assign the ranked Protector with the reasons Ops saw, or — only with a
 * stated reason — one the matcher excluded, unless that would double-book them. */
async function checkAssignment(
  db: Db,
  booking: Booking,
  request: { protectorId: string; overrideReason?: string },
): Promise<Result<Assignment>> {
  const match = await matchForBooking(db, booking);
  const ranked = match.ranked.find((r) => r.id === request.protectorId);
  if (ranked) return ok({ protectorId: ranked.id, matchReasons: ranked.reasons, note: null });

  const excluded = match.excluded.find((e) => e.id === request.protectorId);
  if (!excluded) return fail("Only an approved Protector can be assigned");
  if (!excluded.overridable) return fail(`${excluded.displayName}: ${excluded.reason}`);
  const reason = request.overrideReason?.trim();
  if (!reason) return fail(`${excluded.displayName}: ${excluded.reason} — give a reason to assign anyway`);
  return ok({
    protectorId: excluded.id,
    matchReasons: [{ label: `Assigned by Operations despite: ${excluded.reason}`, points: 0 }],
    note: reason,
  });
}

function mayAct(actor: Actor, booking: Booking): boolean {
  switch (actor.role) {
    case "OPS":
      return true;
    case "CUSTOMER":
      return booking.customerSub === actor.sub;
    case "PROTECTOR":
      return booking.protectorId === actor.protectorId;
  }
}

/** The single path for every booking status change: authorise, apply the
 * state machine, write the new status and the lifecycle event together.
 * A request touched after its start time with nobody having accepted it
 * expires first, and the action is refused. */
export async function applyBookingAction(
  db: Db,
  bookingId: string,
  request: ActionRequest,
  actor: Actor,
  now: Date = new Date(),
): Promise<Result> {
  return db.transaction(async (tx) => {
    const [booking] = await tx.select().from(bookings).where(eq(bookings.id, bookingId)).for("update");
    // Not found and not yours look the same, so ids leak nothing.
    if (!booking || !mayAct(actor, booking)) return fail("Booking not found");

    if (isOverdue(booking.status, booking.startsAt, now)) {
      await expire(tx, booking);
      return fail("This booking expired: its start time passed before anyone accepted it");
    }

    const role: ActorRole = actor.role;
    const next = nextStatus(booking.status, request.action, role);
    if (!next.success) return next;

    let protectorId = booking.protectorId;
    let assignment: Assignment | null = null;
    if (request.action === "ASSIGN") {
      const checked = await checkAssignment(tx, booking, request);
      if (!checked.success) return checked;
      assignment = checked.data;
      protectorId = assignment.protectorId;
      if (assignment.note) {
        await audit(tx, actor.sub, "OVERRIDE_MATCH", { type: "BOOKING", id: bookingId }, { protectorId });
      }
    }
    if (request.action === "DECLINE") protectorId = null;

    await tx.update(bookings).set({ status: next.data, protectorId }).where(eq(bookings.id, bookingId));
    await tx.insert(bookingEvents).values({
      bookingId,
      action: request.action,
      fromStatus: booking.status,
      toStatus: next.data,
      actorRole: role,
      actorSub: actor.sub,
      // Record whose job it was when a Protector declines, too.
      protectorId: protectorId ?? booking.protectorId,
      matchReasons: assignment?.matchReasons ?? null,
      note: assignment?.note ?? null,
    });
    return ok(undefined);
  });
}

/** Only SYSTEM expires, and only through the state machine's EXPIRE rule. */
async function expire(db: Db, booking: Booking) {
  const next = nextStatus(booking.status, "EXPIRE", SYSTEM.role);
  if (!next.success) return;
  await db.update(bookings).set({ status: next.data }).where(eq(bookings.id, booking.id));
  await db.insert(bookingEvents).values({
    bookingId: booking.id,
    action: "EXPIRE",
    fromStatus: booking.status,
    toStatus: next.data,
    actorRole: SYSTEM.role,
    actorSub: SYSTEM.sub,
    protectorId: booking.protectorId,
  });
}

/** Expire every request nobody accepted before its start time. Idempotent;
 * run before showing booking lists so none of them claims a stale state. */
export async function expireOverdue(db: Db, now: Date = new Date()): Promise<number> {
  const overdue = await db
    .select({ id: bookings.id })
    .from(bookings)
    .where(and(inArray(bookings.status, [...EXPIRABLE_STATUSES]), lte(bookings.startsAt, now)));
  for (const { id } of overdue) {
    await db.transaction(async (tx) => {
      const [booking] = await tx.select().from(bookings).where(eq(bookings.id, id)).for("update");
      if (booking && isOverdue(booking.status, booking.startsAt, now)) await expire(tx, booking);
    });
  }
  return overdue.length;
}
