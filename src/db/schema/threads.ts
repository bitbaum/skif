/** One thread per booking: its messages, and each participant's read mark.
 * Who may read or write is not stored here — it is derived from the
 * booking's lifecycle (src/domain/booking-thread.ts). */
import { index, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { bookings } from "./bookings";
import { createdAt } from "./shared";

export const bookingMessages = pgTable(
  "booking_messages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    bookingId: uuid("booking_id")
      .notNull()
      .references(() => bookings.id),
    /** The thread participant: "customer", "operations" or "protector:<id>". */
    authorId: text("author_id").notNull(),
    /** Who actually wrote it, for accountability. Never shown to anyone. */
    authorSub: text("author_sub").notNull(),
    body: text("body").notNull(),
    createdAt: createdAt(),
  },
  (t) => [index("booking_messages_booking_idx").on(t.bookingId, t.createdAt)],
);

/** A read high-water mark per participant, never a flag on the message:
 * Operations opening the thread must not clear the customer's badge. */
export const bookingThreadReads = pgTable(
  "booking_thread_reads",
  {
    bookingId: uuid("booking_id")
      .notNull()
      .references(() => bookings.id),
    actorId: text("actor_id").notNull(),
    lastReadAt: timestamp("last_read_at", { withTimezone: true }).notNull(),
  },
  (t) => [primaryKey({ columns: [t.bookingId, t.actorId] })],
);
