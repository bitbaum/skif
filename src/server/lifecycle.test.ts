import { beforeEach, describe, expect, it } from "vitest";
import type { Db } from "@/db/types";
import { windowFromClock } from "@/domain/availability";
import type { ProtectorApplication } from "@/domain/inputs";
import { createTestDb } from "@/test/db";
import { createAssessment } from "./assessments";
import {
  createBooking,
  getBookingForCustomer,
  getBookingForOps,
  getJobForProtector,
  listAllBookings,
} from "./bookings";
import { fileReport, rateBooking } from "./feedback";
import { applyBookingAction } from "./lifecycle";
import { matchForBooking } from "./matching";
import { saveAvailability } from "./availability";
import { savePreferences } from "./preferences";
import { applyAsProtector, setProtectorStatus } from "./protectors";

const CUSTOMER = "oc-customer";
const OPS = { role: "OPS", sub: "oc-ops" } as const;

const application: ProtectorApplication = {
  displayName: "Mira",
  bio: "Ten years of nightlife de-escalation.",
  languages: ["de", "en"],
  experienceYears: 10,
  capabilities: [
    { key: "DE_ESCALATION", level: "ADVANCED", certification: "", evidence: "Club work", expiresOn: null },
    { key: "FIRST_AID", level: "PROFICIENT", certification: "SRK", evidence: "", expiresOn: "2030-01-01" },
  ],
  services: ["NIGHT_OUT", "GET_HOME"],
  presenceStyles: ["DISCREET"],
};

const ALWAYS = [1, 2, 3, 4, 5, 6, 7].map((weekday) => windowFromClock(weekday, 0, 0));
const tomorrow = () => new Date(Date.now() + 24 * 60 * 60 * 1000);

async function approvedProtector(db: Db, sub: string, overrides: Partial<ProtectorApplication> = {}) {
  const p = await applyAsProtector(db, sub, { ...application, ...overrides });
  await setProtectorStatus(db, p.id, "APPROVED");
  await saveAvailability(db, p.id, ALWAYS);
  return p;
}

describe("booking lifecycle, end to end against Postgres", () => {
  let db: Db;
  beforeEach(async () => {
    db = await createTestDb();
    await savePreferences(db, CUSTOMER, {
      hardConstraints: ["NO_AUTO_POLICE_SHARING", "NO_FACIAL_RECOGNITION"],
      presenceStyle: "DISCREET",
      languages: ["de"],
      valuesNote: "Calm, not a bouncer.",
    });
  });

  it("runs request → rank → assign → accept → start → complete → rate → report", async () => {
    const mira = await approvedProtector(db, "oc-mira");
    const pending = await applyAsProtector(db, "oc-pending", { ...application, displayName: "Pat" });
    await approvedProtector(db, "oc-fr", { displayName: "Jules", languages: ["fr"] });

    const created = await createBooking(db, CUSTOMER, {
      service: "NIGHT_OUT",
      startsAt: tomorrow(),
      hours: 4,
      area: "Kreis 4",
      meetingPoint: "Langstrasse 100",
      notes: "Please meet me outside.",
      requiredCapabilities: [],
    });
    if (!created.success) throw new Error(created.error);
    const booking = created.data;
    expect(booking.paymentStatus).toBe("PAYMENT_PENDING");
    expect(booking.hardConstraints).toEqual(["NO_AUTO_POLICE_SHARING", "NO_FACIAL_RECOGNITION"]);

    // Ops sees approved Protectors ranked with reasons; unapproved never appear.
    const match = await matchForBooking(db, booking);
    expect(match.ranked.map((r) => r.displayName)).toEqual(["Mira"]);
    expect(match.ranked[0]!.reasons.length).toBeGreaterThan(0);
    expect(match.excluded).toEqual([
      expect.objectContaining({ displayName: "Jules", reason: "Shares no language with the customer" }),
    ]);
    const assignPending = await applyBookingAction(db, booking.id, { action: "ASSIGN", protectorId: pending.id }, OPS);
    expect(assignPending.success).toBe(false);

    expect(
      await applyBookingAction(db, booking.id, { action: "ASSIGN", protectorId: mira.id }, OPS),
    ).toEqual({ success: true, data: undefined });

    const asMira = { role: "PROTECTOR", sub: "oc-mira", protectorId: mira.id } as const;
    const beforeAccept = await getJobForProtector(db, mira.id, booking.id);
    expect(beforeAccept?.meetingPoint).toBeNull();
    expect(beforeAccept).not.toHaveProperty("customerSub");

    for (const action of ["ACCEPT", "START"] as const) {
      expect((await applyBookingAction(db, booking.id, { action }, asMira)).success).toBe(true);
    }
    const running = await getJobForProtector(db, mira.id, booking.id);
    expect(running?.meetingPoint).toBe("Langstrasse 100");

    // Only the assigned Protector may move the job; the customer can't complete it.
    const asCustomer = { role: "CUSTOMER", sub: CUSTOMER } as const;
    expect((await applyBookingAction(db, booking.id, { action: "COMPLETE" }, asCustomer)).success).toBe(false);

    const incident = await fileReport(db, mira.id, booking.id, {
      kind: "INCIDENT",
      summary: "A man followed us for two blocks; we crossed and he left.",
      policeInvolved: false,
    });
    expect(incident.success).toBe(true);
    expect((await rateBooking(db, CUSTOMER, booking.id, { respect: 5, discretion: 5, feltSafe: 5, comment: "" })).success).toBe(false);

    expect((await applyBookingAction(db, booking.id, { action: "COMPLETE" }, asMira)).success).toBe(true);
    expect(
      (await fileReport(db, mira.id, booking.id, { kind: "REPORT", summary: "Quiet night.", policeInvolved: false }))
        .success,
    ).toBe(true);

    const rating = { respect: 5, discretion: 4, feltSafe: 5, comment: "Felt calm the whole time." };
    expect(await rateBooking(db, CUSTOMER, booking.id, rating)).toEqual({ success: true, data: undefined });
    expect((await rateBooking(db, CUSTOMER, booking.id, rating)).success).toBe(false);
    expect((await rateBooking(db, "someone-else", booking.id, rating)).success).toBe(false);

    // Ops sees the whole lifecycle.
    const detail = await getBookingForOps(db, booking.id);
    expect(detail?.events.map((e) => e.toStatus)).toEqual([
      "REQUESTED",
      "ASSIGNED",
      "ACCEPTED",
      "IN_PROGRESS",
      "COMPLETED",
    ]);
    expect(detail?.reports.map((r) => r.kind)).toEqual(["INCIDENT", "REPORT"]);
    expect(detail?.rating?.feltSafe).toBe(5);
    expect((await listAllBookings(db))[0]?.protectorName).toBe("Mira");

    // Another customer cannot read it.
    expect(await getBookingForCustomer(db, "someone-else", booking.id)).toBeNull();
  });

  it("puts a declined job back in the queue and rejects double-booking", async () => {
    const mira = await approvedProtector(db, "oc-mira");
    const book = async () => {
      const r = await createBooking(db, CUSTOMER, {
        service: "NIGHT_OUT",
        startsAt: tomorrow(),
        hours: 3,
        area: "Kreis 1",
        meetingPoint: "Bellevue",
        notes: "",
        requiredCapabilities: [],
      });
      if (!r.success) throw new Error(r.error);
      return r.data;
    };
    const first = await book();
    const second = await book();

    await applyBookingAction(db, first.id, { action: "ASSIGN", protectorId: mira.id }, OPS);
    const clash = await applyBookingAction(db, second.id, { action: "ASSIGN", protectorId: mira.id }, OPS);
    expect(clash).toEqual({ success: false, error: "Mira: Already committed to an overlapping booking" });

    const asMira = { role: "PROTECTOR", sub: "oc-mira", protectorId: mira.id } as const;
    expect((await applyBookingAction(db, first.id, { action: "DECLINE" }, asMira)).success).toBe(true);
    const after = await getBookingForOps(db, first.id);
    expect(after?.booking.status).toBe("REQUESTED");
    expect(after?.booking.protectorId).toBeNull();
    expect((await applyBookingAction(db, second.id, { action: "ASSIGN", protectorId: mira.id }, OPS)).success).toBe(
      true,
    );
  });

  it("refuses to book before preferences exist", async () => {
    const r = await createBooking(db, "new-person", {
      service: "GET_HOME",
      startsAt: tomorrow(),
      hours: 1,
      area: "Kreis 5",
      meetingPoint: "Hardbrücke",
      notes: "",
      requiredCapabilities: [],
    });
    expect(r.success).toBe(false);
  });

  it("saves a Safety Plan that respects hard constraints", async () => {
    const r = await createAssessment(db, CUSTOMER, {
      placeName: "My flat",
      concerns: ["BURGLARY", "UNWANTED_VISITORS"],
      measures: ["NEIGHBOUR_CONTACT"],
    });
    if (!r.success) throw new Error(r.error);
    const plan = r.data.plan;
    expect(plan.constraints).toEqual(["NO_AUTO_POLICE_SHARING", "NO_FACIAL_RECOGNITION"]);
    expect(plan.nothingToBuy).toBe(true);
    const burglary = plan.concerns.find((c) => c.concern === "BURGLARY")!;
    expect(burglary.excluded.map((e) => e.key)).toContain("MONITORED_ALARM");
    expect(burglary.alternatives).not.toContain("MONITORED_ALARM");
  });
});
