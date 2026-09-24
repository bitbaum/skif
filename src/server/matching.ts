import "server-only";
import { and, avg, count, eq, gt, inArray, lt, ne, sql } from "drizzle-orm";
import { WORKLOAD_WINDOW_DAYS } from "@/config/matching";
import { RATING_DIMENSIONS } from "@/config/ratings";
import { bookings, protectors, ratings } from "@/db/schema";
import type { Db } from "@/db/types";
import { ACTIVE_STATUSES } from "@/domain/lifecycle";
import { availabilityFor } from "./availability";
import { capabilitiesFor } from "./protectors";
import { normaliseRating, rankProtectors, type MatchCandidate, type MatchResult } from "@/domain/matching";

type BookingSlot = Pick<
  typeof bookings.$inferSelect,
  "id" | "service" | "startsAt" | "hours" | "languages" | "presenceStyle" | "requiredCapabilities"
>;

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

/** Gather the facts about every approved Protector, then hand them to the
 * pure ranking. All judgement lives in src/domain/matching.ts. */
export async function matchForBooking(db: Db, booking: BookingSlot): Promise<MatchResult> {
  const approved = await db.select().from(protectors).where(eq(protectors.status, "APPROVED"));
  if (approved.length === 0) return { ranked: [], excluded: [] };
  const ids = approved.map((p) => p.id);

  // Each rating's mean over the questions actually answered (older ratings
  // and a skipped optional question leave some null).
  const dims = RATING_DIMENSIONS.map((d) => ratings[d.key]);
  const answeredSum = sql.join(dims.map((c) => sql`coalesce(${c}, 0)`), sql` + `);
  const answeredCount = sql.join(dims.map((c) => sql`(${c} IS NOT NULL)::int`), sql` + `);
  const meanOfAnswered = sql<number>`(${answeredSum})::numeric / nullif(${answeredCount}, 0)`;
  const ratingRows = await db
    .select({ protectorId: bookings.protectorId, mean: avg(meanOfAnswered), n: count() })
    .from(ratings)
    .innerJoin(bookings, eq(ratings.bookingId, bookings.id))
    .where(inArray(bookings.protectorId, ids))
    .groupBy(bookings.protectorId);

  const windowStart = new Date(Date.now() - WORKLOAD_WINDOW_DAYS * DAY_MS);
  const workloadRows = await db
    .select({ protectorId: bookings.protectorId, n: count() })
    .from(bookings)
    .where(
      and(
        inArray(bookings.protectorId, ids),
        eq(bookings.status, "COMPLETED"),
        gt(bookings.startsAt, windowStart),
      ),
    )
    .groupBy(bookings.protectorId);

  const relevantRows = await db
    .select({ protectorId: bookings.protectorId, n: count() })
    .from(bookings)
    .where(
      and(
        inArray(bookings.protectorId, ids),
        eq(bookings.status, "COMPLETED"),
        eq(bookings.service, booking.service),
      ),
    )
    .groupBy(bookings.protectorId);

  const end = new Date(booking.startsAt.getTime() + booking.hours * HOUR_MS);
  const busyRows = await db
    .selectDistinct({ protectorId: bookings.protectorId })
    .from(bookings)
    .where(
      and(
        inArray(bookings.protectorId, ids),
        inArray(bookings.status, [...ACTIVE_STATUSES]),
        ne(bookings.id, booking.id),
        lt(bookings.startsAt, end),
        sql`${bookings.startsAt} + ${bookings.hours} * interval '1 hour' > ${booking.startsAt.toISOString()}::timestamptz`,
      ),
    );

  const capabilityRows = await capabilitiesFor(db, ids);
  const availabilityRows = await availabilityFor(db, ids);

  const rating = new Map(ratingRows.map((r) => [r.protectorId, r]));
  const workload = new Map(workloadRows.map((r) => [r.protectorId, r.n]));
  const relevant = new Map(relevantRows.map((r) => [r.protectorId, r.n]));
  const busy = new Set(busyRows.map((r) => r.protectorId));

  const candidates: MatchCandidate[] = approved.map((p) => {
    const r = rating.get(p.id);
    return {
      id: p.id,
      displayName: p.displayName,
      services: p.services,
      languages: p.languages,
      capabilities: capabilityRows
        .filter((c) => c.protectorId === p.id)
        .map((c) => ({ key: c.capability, level: c.level, verification: c.verification, expiresOn: c.expiresOn })),
      availability: availabilityRows.filter((a) => a.protectorId === p.id),
      presenceStyles: p.presenceStyles,
      ratingScore: r?.mean == null ? null : normaliseRating(Number(r.mean)),
      ratingCount: r?.n ?? 0,
      completedRecently: workload.get(p.id) ?? 0,
      relevantJobs: relevant.get(p.id) ?? 0,
      busy: busy.has(p.id),
    };
  });

  return rankProtectors(
    {
      service: booking.service,
      languages: booking.languages,
      presenceStyle: booking.presenceStyle,
      startsAt: booking.startsAt,
      hours: booking.hours,
      required: booking.requiredCapabilities,
    },
    candidates,
  );
}
