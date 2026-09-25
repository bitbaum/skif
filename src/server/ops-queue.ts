import "server-only";
import { and, asc, count, desc, eq, ilike, inArray, or, sql, type SQL } from "drizzle-orm";
import { likeContains, pageOf, type ListQuery, type PageInfo } from "listkit";
import { SERVICE_KEYS, type ServiceKey } from "@/config/services";
import { bookings, protectors } from "@/db/schema";
import type { Db } from "@/db/types";
import { BOOKING_STATUSES, type BookingStatus } from "@/domain/lifecycle";
import {
  QUEUE_FACETS,
  queueSort,
  searchNeedle,
  servicesMatching,
  type QueueFacet,
  type QueueRow,
} from "@/domain/ops-queue";
import { expireOverdue } from "./lifecycle";

/**
 * The SQL engine for the Operations queue. The spec in `@/domain/ops-queue`
 * decides what the query means; this turns it into one WHERE clause, so the
 * queue pages in the database instead of loading every booking ever made.
 *
 * Callers must have passed `requireOps()` first: an empty selection here
 * means every booking, which only Operations may see.
 */

export type OpsQueue = {
  rows: QueueRow[];
  page: PageInfo;
  /** For each facet option, how many bookings it would show, counted with
   * that facet's own selection lifted (listkit's rule). */
  counts: Record<QueueFacet, Record<string, number>>;
  /** Requests waiting for a Protector, whatever the filters say. */
  waiting: number;
};

const isStatus = (v: string): v is BookingStatus => (BOOKING_STATUSES as readonly string[]).includes(v);
const isService = (v: string): v is ServiceKey => (SERVICE_KEYS as readonly string[]).includes(v);

function where(query: ListQuery, lift?: QueueFacet): SQL | undefined {
  const statuses = (query.facets[QUEUE_FACETS.status] ?? []).filter(isStatus);
  const services = (query.facets[QUEUE_FACETS.service] ?? []).filter(isService);
  const conditions: (SQL | undefined)[] = [
    lift !== "status" && statuses.length ? inArray(bookings.status, statuses) : undefined,
    lift !== "service" && services.length ? inArray(bookings.service, services) : undefined,
  ];
  const needle = searchNeedle(query);
  if (needle) {
    // Every LIKE goes through listkit's escaping: a lone "_" must not match
    // every row. Only what the queue already shows is searched.
    const pattern = likeContains(needle);
    const byLabel = servicesMatching(needle).filter(isService);
    conditions.push(
      or(
        ilike(sql`${bookings.id}::text`, pattern),
        ilike(bookings.area, pattern),
        ilike(protectors.displayName, pattern),
        byLabel.length ? inArray(bookings.service, byLabel) : undefined,
      ),
    );
  }
  return and(...conditions);
}

async function tally(db: Db, query: ListQuery, facet: QueueFacet): Promise<Record<string, number>> {
  const column = facet === "status" ? bookings.status : bookings.service;
  const options: readonly string[] = facet === "status" ? BOOKING_STATUSES : SERVICE_KEYS;
  const rows = await db
    .select({ key: column, n: count() })
    .from(bookings)
    .leftJoin(protectors, eq(bookings.protectorId, protectors.id))
    .where(where(query, facet))
    .groupBy(column);
  const found = new Map<string, number>(rows.map((r) => [r.key, r.n]));
  return Object.fromEntries(options.map((o) => [o, found.get(o) ?? 0]));
}

export async function listOpsQueue(db: Db, query: ListQuery): Promise<OpsQueue> {
  await expireOverdue(db);
  const filter = where(query);
  const [[matched], [waiting], statusCounts, serviceCounts] = await Promise.all([
    db
      .select({ n: count() })
      .from(bookings)
      .leftJoin(protectors, eq(bookings.protectorId, protectors.id))
      .where(filter),
    db.select({ n: count() }).from(bookings).where(eq(bookings.status, "REQUESTED")),
    tally(db, query, "status"),
    tally(db, query, "service"),
  ]);
  const page = pageOf(matched?.n ?? 0, query.page, query.pageSize);

  const column = queueSort(query) === "starts" ? bookings.startsAt : bookings.createdAt;
  const order = query.dir === "asc" ? asc : desc;
  const rows = await db
    .select({
      id: bookings.id,
      service: bookings.service,
      status: bookings.status,
      area: bookings.area,
      protectorName: protectors.displayName,
      startsAt: bookings.startsAt,
      createdAt: bookings.createdAt,
    })
    .from(bookings)
    .leftJoin(protectors, eq(bookings.protectorId, protectors.id))
    .where(filter)
    .orderBy(order(column), order(bookings.id))
    .limit(page.pageSize)
    .offset(page.from);

  return {
    rows,
    page,
    counts: { status: statusCounts, service: serviceCounts },
    waiting: waiting?.n ?? 0,
  };
}
