import "server-only";
import { asc, desc, eq } from "drizzle-orm";
import { bookingEvents, bookings, protectors, ratings, reports } from "@/db/schema";
import type { Db } from "@/db/types";
import type { BookingInput } from "@/domain/inputs";
import { protectorHasAccepted } from "@/domain/lifecycle";
import { manualPayments, type PaymentProvider } from "@/domain/payment";
import { fail, ok, type Result } from "@/domain/result";
import { getPreferences } from "./preferences";

export type Booking = typeof bookings.$inferSelect;
export type BookingEvent = typeof bookingEvents.$inferSelect;
export type Rating = typeof ratings.$inferSelect;
export type Report = typeof reports.$inferSelect;

/** Create a booking. The customer's languages, presence style and hard
 * constraints are snapshotted from their Safety Preference Profile, so a
 * later change to the profile never rewrites a job already in motion. */
export async function createBooking(
  db: Db,
  customerSub: string,
  input: BookingInput,
  payments: PaymentProvider = manualPayments,
): Promise<Result<Booking>> {
  const prefs = await getPreferences(db, customerSub);
  if (!prefs) return fail("Set your safety preferences before booking");

  const id = crypto.randomUUID();
  const paymentStatus = await payments.open(id);
  const booking = await db.transaction(async (tx) => {
    const [row] = await tx
      .insert(bookings)
      .values({
        id,
        customerSub,
        ...input,
        languages: prefs.languages,
        presenceStyle: prefs.presenceStyle,
        hardConstraints: prefs.hardConstraints,
        paymentStatus,
      })
      .returning();
    await tx.insert(bookingEvents).values({
      bookingId: id,
      action: "REQUEST",
      fromStatus: null,
      toStatus: "REQUESTED",
      actorRole: "CUSTOMER",
      actorSub: customerSub,
    });
    return row!;
  });
  return ok(booking);
}

export async function listCustomerBookings(db: Db, customerSub: string): Promise<Booking[]> {
  return db
    .select()
    .from(bookings)
    .where(eq(bookings.customerSub, customerSub))
    .orderBy(desc(bookings.startsAt));
}

export async function listProtectorJobs(db: Db, protectorId: string): Promise<Booking[]> {
  return db
    .select()
    .from(bookings)
    .where(eq(bookings.protectorId, protectorId))
    .orderBy(asc(bookings.startsAt));
}

export type OpsBookingRow = Booking & { protectorName: string | null };

export async function listAllBookings(db: Db): Promise<OpsBookingRow[]> {
  const rows = await db
    .select({ booking: bookings, protectorName: protectors.displayName })
    .from(bookings)
    .leftJoin(protectors, eq(bookings.protectorId, protectors.id))
    .orderBy(desc(bookings.createdAt));
  return rows.map((r) => ({ ...r.booking, protectorName: r.protectorName }));
}

export type BookingDetail = {
  booking: Booking;
  protector: Pick<typeof protectors.$inferSelect, "id" | "displayName" | "bio" | "languages"> | null;
  events: BookingEvent[];
  rating: Rating | null;
  reports: Report[];
};

async function loadDetail(db: Db, booking: Booking): Promise<BookingDetail> {
  const [protector] = booking.protectorId
    ? await db
        .select({
          id: protectors.id,
          displayName: protectors.displayName,
          bio: protectors.bio,
          languages: protectors.languages,
        })
        .from(protectors)
        .where(eq(protectors.id, booking.protectorId))
    : [];
  const events = await db
    .select()
    .from(bookingEvents)
    .where(eq(bookingEvents.bookingId, booking.id))
    .orderBy(asc(bookingEvents.at));
  const [rating] = await db.select().from(ratings).where(eq(ratings.bookingId, booking.id));
  const bookingReports = await db
    .select()
    .from(reports)
    .where(eq(reports.bookingId, booking.id))
    .orderBy(asc(reports.createdAt));
  return { booking, protector: protector ?? null, events, rating: rating ?? null, reports: bookingReports };
}

async function findBooking(db: Db, id: string): Promise<Booking | null> {
  const [row] = await db.select().from(bookings).where(eq(bookings.id, id));
  return row ?? null;
}

export async function getBookingForCustomer(db: Db, customerSub: string, id: string) {
  const booking = await findBooking(db, id);
  if (!booking || booking.customerSub !== customerSub) return null;
  return loadDetail(db, booking);
}

export async function getBookingForOps(db: Db, id: string) {
  const booking = await findBooking(db, id);
  return booking ? loadDetail(db, booking) : null;
}

/** What a Protector may see: never who the customer is, and the meeting
 * point and notes only once they have accepted the job. */
export type ProtectorJob = Omit<Booking, "customerSub" | "meetingPoint" | "notes"> & {
  meetingPoint: string | null;
  notes: string | null;
  reports: Report[];
};

export async function getJobForProtector(db: Db, protectorId: string, id: string): Promise<ProtectorJob | null> {
  const booking = await findBooking(db, id);
  if (!booking || booking.protectorId !== protectorId) return null;
  return redactForProtector(booking, await db.select().from(reports).where(eq(reports.bookingId, id)));
}

export function redactForProtector(booking: Booking, jobReports: Report[]): ProtectorJob {
  const { customerSub: _customer, meetingPoint, notes, ...rest } = booking;
  const visible = protectorHasAccepted(booking.status);
  return {
    ...rest,
    meetingPoint: visible ? meetingPoint : null,
    notes: visible ? notes : null,
    reports: jobReports,
  };
}
