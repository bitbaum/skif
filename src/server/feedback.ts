import "server-only";
import { eq } from "drizzle-orm";
import { bookings, ratings, reports } from "@/db/schema";
import type { Db } from "@/db/types";
import type { RatingInput, ReportInput } from "@/domain/inputs";
import { protectorHasAccepted } from "@/domain/lifecycle";
import { fail, ok, type Result } from "@/domain/result";

export async function rateBooking(
  db: Db,
  customerSub: string,
  bookingId: string,
  input: RatingInput,
): Promise<Result> {
  const [booking] = await db.select().from(bookings).where(eq(bookings.id, bookingId));
  if (!booking || booking.customerSub !== customerSub) return fail("Booking not found");
  if (booking.status !== "COMPLETED") return fail("You can rate a booking once it is completed");
  const inserted = await db
    .insert(ratings)
    .values({ bookingId, ...input })
    .onConflictDoNothing()
    .returning({ bookingId: ratings.bookingId });
  return inserted.length > 0 ? ok(undefined) : fail("You have already rated this booking");
}

export async function fileReport(
  db: Db,
  protectorId: string,
  bookingId: string,
  input: ReportInput,
): Promise<Result> {
  const [booking] = await db.select().from(bookings).where(eq(bookings.id, bookingId));
  if (!booking || booking.protectorId !== protectorId) return fail("Booking not found");
  if (!protectorHasAccepted(booking.status)) return fail("Accept the job before filing a report");
  await db.insert(reports).values({ bookingId, protectorId, ...input });
  return ok(undefined);
}
