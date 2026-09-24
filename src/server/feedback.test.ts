import { beforeEach, describe, expect, it } from "vitest";
import { MATCH_WEIGHTS } from "@/config/matching";
import { ratings } from "@/db/schema";
import type { Db } from "@/db/types";
import { reportInput } from "@/domain/inputs";
import { createTestDb } from "@/test/db";
import { approvedProtector, book, customerWithPreferences, OPS, rating, report } from "@/test/fixtures";
import { getBookingForOps } from "./bookings";
import { fileReport, listOpenIncidents, rateBooking, reviewIncident } from "./feedback";
import { applyBookingAction } from "./lifecycle";
import { matchForBooking } from "./matching";

const CUSTOMER = "oc-cust";

async function completedJob(db: Db, protectorSub = "oc-mira") {
  const p = await approvedProtector(db, protectorSub);
  const b = await book(db, CUSTOMER);
  await applyBookingAction(db, b.id, { action: "ASSIGN", protectorId: p.id }, OPS);
  const actor = { role: "PROTECTOR", sub: protectorSub, protectorId: p.id } as const;
  for (const action of ["ACCEPT", "CHECK_IN", "START", "COMPLETE"] as const) {
    await applyBookingAction(db, b.id, { action }, actor);
  }
  return { protector: p, booking: b };
}

describe("reports and incidents", () => {
  let db: Db;
  beforeEach(async () => {
    db = await createTestDb();
    await customerWithPreferences(db, CUSTOMER);
  });

  it("opens an incident for review and lets Ops move it along, recording who", async () => {
    const { protector, booking } = await completedJob(db);
    await fileReport(db, protector.id, booking.id, report());
    await fileReport(
      db,
      protector.id,
      booking.id,
      report({ kind: "INCIDENT", severity: "HIGH", observations: ["MEDICAL_ASSISTANCE", "EMERGENCY_SERVICES"] }),
    );
    const [open] = await listOpenIncidents(db);
    expect(open).toMatchObject({ bookingId: booking.id, severity: "HIGH", review: "OPEN" });
    expect(await listOpenIncidents(db)).toHaveLength(1);

    expect((await reviewIncident(db, open!.id, "oc-ops", { review: "UNDER_REVIEW", note: "" })).success).toBe(true);
    const resolved = await reviewIncident(db, open!.id, "oc-ops", { review: "RESOLVED", note: "Called the customer." });
    expect(resolved).toEqual({ success: true, data: { bookingId: booking.id } });
    expect(await listOpenIncidents(db)).toEqual([]);
    const back = await reviewIncident(db, open!.id, "oc-ops", { review: "UNDER_REVIEW", note: "" });
    expect(back.success).toBe(false);

    const detail = await getBookingForOps(db, booking.id);
    const incident = detail!.reports.find((r) => r.kind === "INCIDENT")!;
    expect(incident).toMatchObject({ review: "RESOLVED", reviewedBy: "oc-ops", reviewNote: "Called the customer." });
    expect(detail!.reports.find((r) => r.kind === "REPORT")!.review).toBeNull();
  });

  it("refuses to review a plain report as an incident", async () => {
    const { protector, booking } = await completedJob(db);
    await fileReport(db, protector.id, booking.id, report());
    const [plain] = (await getBookingForOps(db, booking.id))!.reports;
    expect((await reviewIncident(db, plain!.id, "oc-ops", { review: "RESOLVED", note: "" })).success).toBe(false);
  });

  it("averages every answered question, skipping unanswered ones", async () => {
    const { booking } = await completedJob(db);
    await rateBooking(db, CUSTOMER, booking.id, rating({ judgment: null }));
    const next = await book(db, CUSTOMER);
    const [mira] = (await matchForBooking(db, next)).ranked;
    expect(mira!.reasons).toContainEqual({ label: "Past customers' ratings (1)", points: MATCH_WEIGHTS.pastRatings });
  });

  it("still reads a v1 rating that only answered three questions", async () => {
    const { booking } = await completedJob(db);
    await db.insert(ratings).values({ bookingId: booking.id, respect: 1, discretion: 1, feltSafe: 1 });
    const next = await book(db, CUSTOMER);
    const [mira] = (await matchForBooking(db, next)).ranked;
    expect(mira!.reasons).toContainEqual({ label: "Past customers' ratings (1)", points: 0 });
  });
});

describe("reportInput", () => {
  const base = { kind: "REPORT", summary: "Fine.", policeInvolved: false, observations: ["NOTHING_NOTABLE"] };
  it("requires a severity for an incident, and drops one on a report", () => {
    expect(reportInput.safeParse({ ...base, kind: "INCIDENT" }).success).toBe(false);
    expect(reportInput.parse({ ...base, kind: "INCIDENT", severity: "LOW" }).severity).toBe("LOW");
    expect(reportInput.parse({ ...base, severity: "HIGH" }).severity).toBeNull();
  });
  it("requires at least one observation", () => {
    expect(reportInput.safeParse({ ...base, observations: [] }).success).toBe(false);
  });
});
