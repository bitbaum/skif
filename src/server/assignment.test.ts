import { beforeEach, describe, expect, it } from "vitest";
import type { Db } from "@/db/types";
import { createTestDb } from "@/test/db";
import { approvedProtector, book, customerWithPreferences, OPS } from "@/test/fixtures";
import { getBookingForOps, getJobForProtector } from "./bookings";
import { applyBookingAction } from "./lifecycle";
import { matchForBooking } from "./matching";

const CUSTOMER = "oc-cust";

describe("assignment", () => {
  let db: Db;
  beforeEach(async () => {
    db = await createTestDb();
    await customerWithPreferences(db, CUSTOMER);
  });

  it("keeps the reasons Ops saw, and shows them to the assigned Protector", async () => {
    const mira = await approvedProtector(db, "oc-mira");
    const booking = await book(db, CUSTOMER);
    const [top] = (await matchForBooking(db, booking)).ranked;
    await applyBookingAction(db, booking.id, { action: "ASSIGN", protectorId: mira.id }, OPS);
    const job = await getJobForProtector(db, mira.id, booking.id);
    expect(job?.whyMatched).toEqual(top!.reasons);
  });

  it("lets Ops override an exclusion only with a reason, and keeps the note from the Protector", async () => {
    const jules = await approvedProtector(db, "oc-jules", { displayName: "Jules", languages: ["fr"] });
    const booking = await book(db, CUSTOMER);

    const bare = await applyBookingAction(db, booking.id, { action: "ASSIGN", protectorId: jules.id }, OPS);
    expect(bare).toEqual({
      success: false,
      error: "Jules: Shares no language with the customer — give a reason to assign anyway",
    });

    const reason = "Customer confirmed on the phone that English is fine.";
    const withReason = await applyBookingAction(
      db,
      booking.id,
      { action: "ASSIGN", protectorId: jules.id, overrideReason: reason },
      OPS,
    );
    expect(withReason.success).toBe(true);

    const ops = await getBookingForOps(db, booking.id);
    expect(ops?.events.at(-1)).toMatchObject({ action: "ASSIGN", note: reason });
    const job = await getJobForProtector(db, jules.id, booking.id);
    expect(job?.whyMatched).toEqual([
      { label: "Assigned by Operations despite: Shares no language with the customer", points: 0 },
    ]);
    expect(JSON.stringify(job)).not.toContain(reason);
  });

  it("never overrides a double booking", async () => {
    const mira = await approvedProtector(db, "oc-mira");
    const first = await book(db, CUSTOMER);
    const second = await book(db, CUSTOMER);
    await applyBookingAction(db, first.id, { action: "ASSIGN", protectorId: mira.id }, OPS);
    const r = await applyBookingAction(
      db,
      second.id,
      { action: "ASSIGN", protectorId: mira.id, overrideReason: "please" },
      OPS,
    );
    expect(r).toEqual({ success: false, error: "Mira: Already committed to an overlapping booking" });
  });
});
