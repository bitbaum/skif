import "server-only";
import { eq } from "drizzle-orm";
import { bookingEvents, bookings } from "@/db/schema";
import type { Db } from "@/db/types";
import { nextStatus, type ActorRole, type BookingAction } from "@/domain/lifecycle";
import { fail, ok, type Result } from "@/domain/result";
import { matchForBooking } from "./matching";

export type Actor =
  | { role: "CUSTOMER"; sub: string }
  | { role: "PROTECTOR"; sub: string; protectorId: string }
  | { role: "OPS"; sub: string };

type ActionRequest =
  | { action: "ASSIGN"; protectorId: string }
  | { action: Exclude<BookingAction, "ASSIGN"> };

function mayAct(actor: Actor, booking: typeof bookings.$inferSelect): boolean {
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
 * state machine, write the new status and the lifecycle event together. */
export async function applyBookingAction(
  db: Db,
  bookingId: string,
  request: ActionRequest,
  actor: Actor,
): Promise<Result> {
  return db.transaction(async (tx) => {
    const [booking] = await tx.select().from(bookings).where(eq(bookings.id, bookingId)).for("update");
    // Not found and not yours look the same, so ids leak nothing.
    if (!booking || !mayAct(actor, booking)) return fail("Booking not found");

    const role: ActorRole = actor.role;
    const next = nextStatus(booking.status, request.action, role);
    if (!next.success) return next;

    let protectorId = booking.protectorId;
    if (request.action === "ASSIGN") {
      const match = await matchForBooking(tx, booking);
      const excluded = match.excluded.find((e) => e.id === request.protectorId);
      if (excluded) return fail(`${excluded.displayName}: ${excluded.reason}`);
      if (!match.ranked.some((r) => r.id === request.protectorId)) {
        return fail("Only an approved Protector can be assigned");
      }
      protectorId = request.protectorId;
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
    });
    return ok(undefined);
  });
}
