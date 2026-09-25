import { beforeEach, describe, expect, it } from "vitest";
import type { Db } from "@/db/types";
import { createTestDb } from "@/test/db";
import { approvedProtector, book, customerWithPreferences, OPS } from "@/test/fixtures";
import { applyBookingAction } from "./lifecycle";
import { findBookingFor, openThread, postMessage, seatActor } from "./booking-thread";
import type { ThreadSeat } from "@/config/thread";

const CUSTOMER = "oc-customer";

describe("booking thread, end to end against Postgres", () => {
  let db: Db;
  beforeEach(async () => {
    db = await createTestDb();
    await customerWithPreferences(db, CUSTOMER);
  });

  it("follows the lifecycle: offered sees nothing, accepted joins, unassigned keeps only the past, ended is read-only", async () => {
    const mira = await approvedProtector(db, "oc-mira");
    const jules = await approvedProtector(db, "oc-jules", { displayName: "Jules" });
    const booking = await book(db, CUSTOMER);

    const people = {
      customer: { sub: CUSTOMER, isOps: false, protector: null },
      ops: { sub: OPS.sub, isOps: true, protector: null },
      mira: { sub: "oc-mira", isOps: false, protector: mira },
      jules: { sub: "oc-jules", isOps: false, protector: jules },
    };
    type Who = keyof typeof people;
    const seats: Record<Who, ThreadSeat> = { customer: "CUSTOMER", ops: "OPS", mira: "PROTECTOR", jules: "PROTECTOR" };
    const send = (who: Who, body: string) =>
      postMessage(db, booking.id, (b) => seatActor(people[who], b, seats[who]), body);
    const open = async (who: Who) => {
      const b = (await findBookingFor(db, booking.id))!;
      const actor = seatActor(people[who], b, seats[who]);
      return actor ? openThread(db, b, actor) : null;
    };
    const bodies = async (who: Who) => (await open(who))?.messages.map((m) => `${m.speaker}: ${m.body}`);

    expect((await send("customer", "Is anyone coming?")).success).toBe(true);
    await applyBookingAction(db, booking.id, { action: "ASSIGN", protectorId: mira.id }, OPS);
    expect((await send("ops", "Mira is on it.")).success).toBe(true);

    // Offered, not accepted: not a participant, cannot read or write.
    expect(await open("mira")).toBeNull();
    expect(await send("mira", "hello")).toEqual({ success: false, error: "Booking not found" });

    const asMira = { role: "PROTECTOR", sub: "oc-mira", protectorId: mira.id } as const;
    await applyBookingAction(db, booking.id, { action: "ACCEPT" }, asMira);
    expect((await send("mira", "I'm at the entrance")).success).toBe(true);
    expect(await bodies("mira")).toEqual(["You: I'm at the entrance"]);
    expect(await bodies("customer")).toEqual([
      "You: Is anyone coming?",
      "Operations: Mira is on it.",
      "Your Protector: I'm at the entrance",
    ]);

    // Unread is per person: Operations' own post marked it read up to then,
    // so only Mira's message is new; opening the thread catches them up.
    expect((await open("ops"))?.unread).toBe(1);
    expect((await open("ops"))?.unread).toBe(0);

    // Operations takes Mira off the job and gives it to Jules.
    await applyBookingAction(db, booking.id, { action: "UNASSIGN" }, OPS);
    expect((await send("customer", "Where did Mira go?")).success).toBe(true);
    await applyBookingAction(db, booking.id, { action: "ASSIGN", protectorId: jules.id }, OPS);
    await applyBookingAction(db, booking.id, { action: "ACCEPT" }, { ...asMira, sub: "oc-jules", protectorId: jules.id });
    expect((await send("jules", "Jules here, on my way.")).success).toBe(true);

    const miraAfter = await open("mira");
    expect(miraAfter?.messages.map((m) => m.body)).toEqual(["I'm at the entrance"]);
    expect(miraAfter?.closed).toBe("LEFT");
    expect(await send("mira", "still here?")).toEqual({ success: false, error: "This conversation is closed" });
    expect(await bodies("jules")).toEqual(["You: Jules here, on my way."]);
    expect((await bodies("customer"))?.at(2)).toBe("Previous Protector: I'm at the entrance");

    // A stranger claiming a seat they do not hold gets nothing.
    const stranger = { sub: "oc-stranger", isOps: false, protector: null };
    expect(await postMessage(db, booking.id, (b) => seatActor(stranger, b, "CUSTOMER"), "hi")).toEqual({
      success: false,
      error: "Booking not found",
    });

    await applyBookingAction(db, booking.id, { action: "CANCEL" }, { role: "CUSTOMER", sub: CUSTOMER });
    expect(await send("customer", "too late")).toEqual({ success: false, error: "This conversation is closed" });
    const ended = await open("customer");
    expect(ended?.closed).toBe("ENDED");
    expect(ended?.messages).toHaveLength(5);
  });
});
