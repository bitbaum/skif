import "server-only";
import { and, asc, count, desc, eq, inArray, isNotNull } from "drizzle-orm";
import { bookings, complaints } from "@/db/schema";
import type { Db } from "@/db/types";
import {
  customerStatusLabel,
  isOpen,
  nextComplaintStatus,
  COMPLAINT_STATUSES,
  type ComplaintAction,
  type ComplaintStatus,
} from "@/domain/complaints";
import type { ComplaintActionInput, ComplaintInput } from "@/domain/inputs";
import { fail, ok, type Result } from "@/domain/result";

export type Complaint = typeof complaints.$inferSelect;

/** A customer complains about one of their own bookings. The Protector on it
 * is recorded, but learns nothing until Operations decides to ask them. */
export async function fileComplaint(
  db: Db,
  customerSub: string,
  bookingId: string,
  input: ComplaintInput,
): Promise<Result<Complaint>> {
  const [booking] = await db.select().from(bookings).where(eq(bookings.id, bookingId));
  if (!booking || booking.customerSub !== customerSub) return fail("Booking not found");
  const [row] = await db
    .insert(complaints)
    .values({ bookingId, customerSub, protectorId: booking.protectorId, ...input })
    .returning();
  return ok(row!);
}

export type CustomerComplaintView = Pick<Complaint, "id" | "category" | "createdAt"> & { status: string };

/** The customer sees their complaint and its outcome, not Operations' notes. */
export async function listCustomerComplaints(
  db: Db,
  customerSub: string,
  bookingId: string,
): Promise<CustomerComplaintView[]> {
  const rows = await db
    .select()
    .from(complaints)
    .where(and(eq(complaints.customerSub, customerSub), eq(complaints.bookingId, bookingId)))
    .orderBy(asc(complaints.createdAt));
  return rows.map((c) => ({ id: c.id, category: c.category, createdAt: c.createdAt, status: customerStatusLabel(c.status) }));
}

const OPEN_STATUSES = COMPLAINT_STATUSES.filter(isOpen);

export async function listOpenComplaints(db: Db): Promise<Complaint[]> {
  return db
    .select()
    .from(complaints)
    .where(inArray(complaints.status, OPEN_STATUSES))
    .orderBy(asc(complaints.createdAt));
}

export async function getComplaint(db: Db, id: string): Promise<Complaint | null> {
  const [row] = await db.select().from(complaints).where(eq(complaints.id, id));
  return row ?? null;
}

export async function listComplaintsForBooking(db: Db, bookingId: string): Promise<Complaint[]> {
  return db.select().from(complaints).where(eq(complaints.bookingId, bookingId)).orderBy(asc(complaints.createdAt));
}

/** What a Protector may see of a complaint: Operations' summary, never the
 * customer's words, and nothing until Operations has written that summary. */
export type ProtectorComplaintView = Pick<
  Complaint,
  "id" | "bookingId" | "category" | "status" | "summaryForProtector" | "protectorResponse" | "appeal" | "createdAt"
>;

export async function listComplaintsForProtector(db: Db, protectorId: string): Promise<ProtectorComplaintView[]> {
  return db
    .select({
      id: complaints.id,
      bookingId: complaints.bookingId,
      category: complaints.category,
      status: complaints.status,
      summaryForProtector: complaints.summaryForProtector,
      protectorResponse: complaints.protectorResponse,
      appeal: complaints.appeal,
      createdAt: complaints.createdAt,
    })
    .from(complaints)
    .where(and(eq(complaints.protectorId, protectorId), isNotNull(complaints.summaryForProtector)))
    .orderBy(desc(complaints.createdAt));
}

export async function countUpheld(db: Db, protectorId: string): Promise<number> {
  const [row] = await db
    .select({ n: count() })
    .from(complaints)
    .where(and(eq(complaints.protectorId, protectorId), eq(complaints.status, "UPHELD")));
  return row?.n ?? 0;
}

type ComplaintActor = { role: "OPS"; sub: string } | { role: "PROTECTOR"; sub: string; protectorId: string };

/** Everything that happens to a complaint after it is filed. */
export async function actOnComplaint(
  db: Db,
  id: string,
  actor: ComplaintActor,
  input: ComplaintActionInput,
): Promise<Result<Complaint>> {
  const complaint = await getComplaint(db, id);
  const visibleToProtector =
    actor.role === "PROTECTOR" &&
    complaint?.protectorId === actor.protectorId &&
    complaint.summaryForProtector !== null;
  if (!complaint || (actor.role === "PROTECTOR" && !visibleToProtector)) return fail("Complaint not found");

  const next = nextComplaintStatus(complaint.status, input.action, actor.role);
  if (!next.success) return next;

  const changes = changesFor(complaint, input.action, input.text, next.data, actor.sub);
  if (!changes.success) return changes;

  const [row] = await db.update(complaints).set(changes.data).where(eq(complaints.id, id)).returning();
  return ok(row!);
}

function changesFor(
  c: Complaint,
  action: ComplaintAction,
  text: string,
  status: ComplaintStatus,
  actorSub: string,
): Result<Partial<Complaint>> {
  switch (action) {
    case "ASK_PROTECTOR":
      if (!c.protectorId) return fail("No Protector was on this booking");
      if (!text) return fail("Write the summary the Protector will see — not the customer's own words");
      return ok({ status, summaryForProtector: text });
    case "RESPOND":
      if (!text) return fail("Write your response");
      return ok({ status, protectorResponse: text });
    case "APPEAL":
      if (!text) return fail("Say why the decision should change");
      return ok({ status, appeal: text });
    case "UPHOLD":
    case "DISMISS": {
      // An upheld complaint about someone is always shared with them, so they can appeal.
      const needsSummary = action === "UPHOLD" && c.protectorId && !c.summaryForProtector;
      if (needsSummary && !text) return fail("Write what the Protector will be told, so they can appeal");
      return ok({
        status,
        decisionNote: text || null,
        decidedBy: actorSub,
        decidedAt: new Date(),
        ...(needsSummary ? { summaryForProtector: text } : {}),
      });
    }
  }
}
