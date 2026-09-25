import "server-only";
import { asc, desc, eq, inArray } from "drizzle-orm";
import { bookings, ratings, reports } from "@/db/schema";
import type { Db } from "@/db/types";
import type { IncidentReviewInput, RatingInput, ReportInput } from "@/domain/inputs";
import type { IncidentSeverity } from "@/config/reports";
import { mayReview, type IncidentReviewStatus } from "@/domain/incidents";
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
): Promise<Result<{ id: string }>> {
  const [booking] = await db.select().from(bookings).where(eq(bookings.id, bookingId));
  if (!booking || booking.protectorId !== protectorId) return fail("Booking not found");
  if (!protectorHasAccepted(booking.status)) return fail("Accept the job before filing a report");
  const [row] = await db
    .insert(reports)
    .values({ bookingId, protectorId, ...input, review: input.kind === "INCIDENT" ? "OPEN" : null })
    .returning({ id: reports.id });
  return ok({ id: row!.id });
}

/** Operations moves an incident along, recording who and why. */
export async function reviewIncident(
  db: Db,
  reportId: string,
  reviewerSub: string,
  input: IncidentReviewInput,
): Promise<Result<{ bookingId: string }>> {
  const [report] = await db.select().from(reports).where(eq(reports.id, reportId));
  if (!report?.review) return fail("Incident not found");
  if (!mayReview(report.review, input.review)) return fail(`An incident that is ${report.review} cannot move to ${input.review}`);
  await db
    .update(reports)
    .set({ review: input.review, reviewNote: input.note || null, reviewedBy: reviewerSub, reviewedAt: new Date() })
    .where(eq(reports.id, reportId));
  return ok({ bookingId: report.bookingId });
}

export type OpenIncident = {
  id: string;
  bookingId: string;
  severity: IncidentSeverity | null;
  review: IncidentReviewStatus;
  createdAt: Date;
};

/** Incidents Operations still has to close, most severe first, then oldest. */
export async function listOpenIncidents(db: Db): Promise<OpenIncident[]> {
  const rows = await db
    .select({
      id: reports.id,
      bookingId: reports.bookingId,
      severity: reports.severity,
      review: reports.review,
      createdAt: reports.createdAt,
    })
    .from(reports)
    .where(inArray(reports.review, ["OPEN", "UNDER_REVIEW"]))
    .orderBy(desc(reports.severity), asc(reports.createdAt));
  return rows.map((r) => ({ ...r, review: r.review ?? "OPEN" }));
}
