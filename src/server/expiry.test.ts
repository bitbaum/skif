import { beforeEach, describe, expect, it } from "vitest";
import type { Db } from "@/db/types";
import { createTestDb } from "@/test/db";
import { approvedProtector, book, customerWithPreferences, OPS } from "@/test/fixtures";
import { getBookingForOps, getJobForProtector } from "./bookings";
import { saveCustomerProfile } from "./customers";
import { applyBookingAction, expireOverdue } from "./lifecycle";

const CUSTOMER = "oc-cust";
const HOUR = 60 * 60 * 1000;

describe("expiry and check-in", () => {
  let db: Db;
  beforeEach(async () => {
    db = await createTestDb();
    await customerWithPreferences(db, CUSTOMER);
  });

  it("expires a request touched after its start time, and refuses the action", async () => {
    const mira = await approvedProtector(db, "oc-mira");
    const booking = await book(db, CUSTOMER);
    const later = new Date(booking.startsAt.getTime() + HOUR);
    const r = await applyBookingAction(db, booking.id, { action: "ASSIGN", protectorId: mira.id }, OPS, later);
    expect(r).toEqual({ success: false, error: "This booking expired: its start time passed before anyone accepted it" });
    const detail = await getBookingForOps(db, booking.id);
    expect(detail?.booking.status).toBe("EXPIRED");
    expect(detail?.events.at(-1)).toMatchObject({ action: "EXPIRE", actorRole: "SYSTEM", toStatus: "EXPIRED" });
  });

  it("sweeps overdue requests but leaves accepted jobs alone", async () => {
    const mira = await approvedProtector(db, "oc-mira");
    const open = await book(db, CUSTOMER);
    const accepted = await book(db, CUSTOMER, { startsAt: new Date(open.startsAt.getTime() + 5 * HOUR) });
    await applyBookingAction(db, accepted.id, { action: "ASSIGN", protectorId: mira.id }, OPS);
    await applyBookingAction(db, accepted.id, { action: "ACCEPT" }, { role: "PROTECTOR", sub: "oc-mira", protectorId: mira.id });

    expect(await expireOverdue(db, new Date(open.startsAt.getTime() - HOUR))).toBe(0);
    expect(await expireOverdue(db, new Date(accepted.startsAt.getTime() + HOUR))).toBe(1);
    expect((await getBookingForOps(db, open.id))?.booking.status).toBe("EXPIRED");
    expect((await getBookingForOps(db, accepted.id))?.booking.status).toBe("ACCEPTED");
  });

  it("requires a check-in before start, and shows the customer's chosen name only after acceptance", async () => {
    await saveCustomerProfile(db, CUSTOMER, { preferredName: "Sam" });
    const mira = await approvedProtector(db, "oc-mira");
    const booking = await book(db, CUSTOMER);
    const asMira = { role: "PROTECTOR", sub: "oc-mira", protectorId: mira.id } as const;
    await applyBookingAction(db, booking.id, { action: "ASSIGN", protectorId: mira.id }, OPS);
    expect((await getJobForProtector(db, mira.id, booking.id))?.customerName).toBeNull();

    await applyBookingAction(db, booking.id, { action: "ACCEPT" }, asMira);
    expect((await getJobForProtector(db, mira.id, booking.id))?.customerName).toBe("Sam");
    expect((await applyBookingAction(db, booking.id, { action: "START" }, asMira)).success).toBe(false);
    expect((await applyBookingAction(db, booking.id, { action: "CHECK_IN" }, asMira)).success).toBe(true);
    expect((await applyBookingAction(db, booking.id, { action: "START" }, asMira)).success).toBe(true);
  });
});
