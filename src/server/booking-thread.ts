import "server-only";
import { asc, eq } from "drizzle-orm";
import type { Message } from "threadkit";
import { canRead, canWrite } from "threadkit";
import type { ThreadSeat } from "@/config/thread";
import { bookingEvents, bookingMessages, bookingThreadReads, bookings } from "@/db/schema";
import type { Db } from "@/db/types";
import {
  bookingThread,
  CUSTOMER_ACTOR,
  OPS_ACTOR,
  protectorActor,
  viewThread,
  type ThreadView,
} from "@/domain/booking-thread";
import { fail, ok, type Result } from "@/domain/result";
import { expireOverdue } from "./lifecycle";

/** Who is speaking in a booking's thread: their participant id, and the
 * person behind it (kept for accountability, never shown). */
export type ThreadActor = { actorId: string; sub: string };

/** The participant id a signed-in person holds in the seat they claim, or
 * null when they do not hold it. This is identity only — whether that seat
 * may see or say anything is decided by the thread, from the lifecycle. */
export function seatActor(
  person: { sub: string; isOps: boolean; protector: { id: string } | null },
  booking: { customerSub: string },
  seat: ThreadSeat,
): ThreadActor | null {
  const actorId =
    seat === "CUSTOMER"
      ? booking.customerSub === person.sub
        ? CUSTOMER_ACTOR
        : null
      : seat === "OPS"
        ? person.isOps
          ? OPS_ACTOR
          : null
        : person.protector
          ? protectorActor(person.protector.id)
          : null;
  return actorId ? { actorId, sub: person.sub } : null;
}

type Booking = typeof bookings.$inferSelect;

async function loadThread(db: Db, booking: Booking) {
  const [events, reads, rows] = await Promise.all([
    db
      .select({ action: bookingEvents.action, protectorId: bookingEvents.protectorId, at: bookingEvents.at })
      .from(bookingEvents)
      .where(eq(bookingEvents.bookingId, booking.id)),
    db
      .select({ actorId: bookingThreadReads.actorId, lastReadAt: bookingThreadReads.lastReadAt })
      .from(bookingThreadReads)
      .where(eq(bookingThreadReads.bookingId, booking.id)),
    db
      .select()
      .from(bookingMessages)
      .where(eq(bookingMessages.bookingId, booking.id))
      .orderBy(asc(bookingMessages.createdAt), asc(bookingMessages.id)),
  ]);
  const messages: Message[] = rows.map((m) => ({
    id: m.id,
    threadId: m.bookingId,
    authorId: m.authorId,
    body: m.body,
    createdAt: m.createdAt,
  }));
  return { thread: bookingThread(booking, events, reads), messages };
}

async function markRead(db: Db, bookingId: string, actorId: string, at: Date) {
  await db
    .insert(bookingThreadReads)
    .values({ bookingId, actorId, lastReadAt: at })
    .onConflictDoUpdate({
      target: [bookingThreadReads.bookingId, bookingThreadReads.actorId],
      set: { lastReadAt: at },
    });
}

/** The thread as this participant may see it, then marked read for them —
 * so `unread` says what was new on this visit. Null for a non-participant
 * (a Protector merely offered the job, anyone else's booking). */
export async function openThread(
  db: Db,
  booking: Booking,
  actor: ThreadActor,
  now: Date = new Date(),
): Promise<ThreadView | null> {
  const { thread, messages } = await loadThread(db, booking);
  const view = viewThread(thread, actor.actorId, messages, now);
  if (!view) return null;
  await markRead(db, booking.id, actor.actorId, now);
  return view;
}

/** A booking by id, for a caller that then asks the thread whether the
 * viewer may see it — the thread, not this lookup, is the gate. */
export async function findBookingFor(db: Db, bookingId: string): Promise<Booking | null> {
  const [row] = await db.select().from(bookings).where(eq(bookings.id, bookingId));
  return row ?? null;
}

/** Post a message. The booking row is locked so a message cannot slip in
 * alongside a lifecycle change that takes someone off the job or ends it. */
export async function postMessage(
  db: Db,
  bookingId: string,
  resolve: (booking: Booking) => ThreadActor | null,
  body: string,
): Promise<Result<null>> {
  await expireOverdue(db);
  return db.transaction(async (tx) => {
    const [booking] = await tx.select().from(bookings).where(eq(bookings.id, bookingId)).for("update");
    const actor = booking ? resolve(booking) : null;
    if (!booking || !actor) return fail("Booking not found");
    const { thread } = await loadThread(tx, booking);
    // Not a participant and not found look the same, so ids leak nothing.
    if (!canRead(thread, actor.actorId)) return fail("Booking not found");
    if (!canWrite(thread, actor.actorId)) return fail("This conversation is closed");
    const [row] = await tx
      .insert(bookingMessages)
      .values({ bookingId, authorId: actor.actorId, authorSub: actor.sub, body })
      .returning({ createdAt: bookingMessages.createdAt });
    await markRead(tx, bookingId, actor.actorId, row!.createdAt);
    return ok(null);
  });
}

/** openThread for whoever holds `seat` on this booking; null if they don't,
 * or if that seat is not (or never was) a participant. */
export async function openThreadFor(
  db: Db,
  booking: Booking,
  person: Parameters<typeof seatActor>[0],
  seat: ThreadSeat,
  now: Date = new Date(),
): Promise<ThreadView | null> {
  const actor = seatActor(person, booking, seat);
  return actor ? openThread(db, booking, actor, now) : null;
}
