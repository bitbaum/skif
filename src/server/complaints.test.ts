import { beforeEach, describe, expect, it } from "vitest";
import type { Db } from "@/db/types";
import { complaintActions, customerStatusLabel } from "@/domain/complaints";
import { createTestDb } from "@/test/db";
import { approvedProtector, book, customerWithPreferences, OPS } from "@/test/fixtures";
import {
  actOnComplaint,
  countUpheld,
  fileComplaint,
  listComplaintsForProtector,
  listCustomerComplaints,
  listOpenComplaints,
} from "./complaints";
import { applyBookingAction } from "./lifecycle";
import { matchForBooking } from "./matching";

const CUSTOMER = "oc-cust";
const LATER = () => ({ startsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) });
const WORDS = "He made comments about my appearance all evening.";

describe("complaints", () => {
  let db: Db;
  let protectorId: string;
  let bookingId: string;
  let asMira: { role: "PROTECTOR"; sub: string; protectorId: string };

  beforeEach(async () => {
    db = await createTestDb();
    await customerWithPreferences(db, CUSTOMER);
    const mira = await approvedProtector(db, "oc-mira");
    protectorId = mira.id;
    asMira = { role: "PROTECTOR", sub: "oc-mira", protectorId };
    const b = await book(db, CUSTOMER);
    bookingId = b.id;
    await applyBookingAction(db, b.id, { action: "ASSIGN", protectorId }, OPS);
  });

  it("keeps the customer's words from the Protector, even after they are asked", async () => {
    const filed = await fileComplaint(db, CUSTOMER, bookingId, { category: "DISRESPECT", body: WORDS });
    if (!filed.success) throw new Error(filed.error);
    expect(await listComplaintsForProtector(db, protectorId)).toEqual([]);

    const summary = "A customer felt comments about their appearance were inappropriate.";
    await actOnComplaint(db, filed.data.id, OPS, { action: "ASK_PROTECTOR", text: summary });
    const seen = await listComplaintsForProtector(db, protectorId);
    expect(seen).toHaveLength(1);
    expect(seen[0]!.summaryForProtector).toBe(summary);
    expect(JSON.stringify(seen)).not.toContain(WORDS);
    expect(JSON.stringify(seen)).not.toContain(CUSTOMER);
  });

  it("runs ask → respond → uphold → appeal → decide, and never touches the ranking", async () => {
    const filed = await fileComplaint(db, CUSTOMER, bookingId, { category: "UNPROFESSIONAL", body: WORDS });
    if (!filed.success) throw new Error(filed.error);
    const id = filed.data.id;
    const before = (await matchForBooking(db, await book(db, CUSTOMER, LATER()))).ranked[0]!.score;

    expect((await actOnComplaint(db, id, asMira, { action: "RESPOND", text: "Not me" })).success).toBe(false);
    await actOnComplaint(db, id, OPS, { action: "ASK_PROTECTOR", text: "Customer says conduct was unprofessional." });
    await actOnComplaint(db, id, asMira, { action: "RESPOND", text: "I was on my phone once to call a taxi." });
    const upheld = await actOnComplaint(db, id, OPS, { action: "UPHOLD", text: "Pattern matches another report." });
    expect(upheld).toMatchObject({ success: true, data: { status: "UPHELD", decidedBy: OPS.sub } });
    expect(await countUpheld(db, protectorId)).toBe(1);

    const after = (await matchForBooking(db, await book(db, CUSTOMER, LATER()))).ranked[0]!.score;
    expect(after).toBe(before);

    await actOnComplaint(db, id, asMira, { action: "APPEAL", text: "The taxi call was the customer's request." });
    expect((await listOpenComplaints(db)).map((c) => c.status)).toEqual(["APPEALED"]);
    await actOnComplaint(db, id, OPS, { action: "DISMISS", text: "Appeal accepted after speaking to the customer." });
    expect(await countUpheld(db, protectorId)).toBe(0);
    expect(await listOpenComplaints(db)).toEqual([]);
  });

  it("shares an upheld complaint with the Protector, so they can appeal", async () => {
    const filed = await fileComplaint(db, CUSTOMER, bookingId, { category: "PRIVACY", body: WORDS });
    if (!filed.success) throw new Error(filed.error);
    const bare = await actOnComplaint(db, filed.data.id, OPS, { action: "UPHOLD", text: "" });
    expect(bare.success).toBe(false);
    await actOnComplaint(db, filed.data.id, OPS, { action: "UPHOLD", text: "You shared the customer's location with a friend." });
    const [seen] = await listComplaintsForProtector(db, protectorId);
    expect(seen?.status).toBe("UPHELD");
    expect(complaintActions("UPHELD", "PROTECTOR")).toEqual(["APPEAL"]);
  });

  it("only takes complaints about the customer's own bookings, and shows them only the outcome", async () => {
    expect((await fileComplaint(db, "someone-else", bookingId, { category: "OTHER", body: "x" })).success).toBe(false);
    const filed = await fileComplaint(db, CUSTOMER, bookingId, { category: "SERVICE", body: "Late confirmation." });
    if (!filed.success) throw new Error(filed.error);
    await actOnComplaint(db, filed.data.id, OPS, { action: "DISMISS", text: "Internal: confirmed on time per logs." });
    const [view] = await listCustomerComplaints(db, CUSTOMER, bookingId);
    expect(view?.status).toBe(customerStatusLabel("NOT_UPHELD"));
    expect(JSON.stringify(view)).not.toContain("Internal");
  });

  it("does not let another Protector act on it", async () => {
    const other = await approvedProtector(db, "oc-tom", { displayName: "Tom" });
    const filed = await fileComplaint(db, CUSTOMER, bookingId, { category: "OTHER", body: WORDS });
    if (!filed.success) throw new Error(filed.error);
    await actOnComplaint(db, filed.data.id, OPS, { action: "ASK_PROTECTOR", text: "Summary" });
    const asTom = { role: "PROTECTOR", sub: "oc-tom", protectorId: other.id } as const;
    expect(await actOnComplaint(db, filed.data.id, asTom, { action: "RESPOND", text: "hi" })).toEqual({
      success: false,
      error: "Complaint not found",
    });
  });
});
