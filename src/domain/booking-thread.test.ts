import { describe, expect, it } from "vitest";
import type { Message } from "threadkit";
import {
  bookingThread,
  CUSTOMER_ACTOR,
  OPS_ACTOR,
  protectorActor,
  viewThread,
  type ThreadEvent,
} from "./booking-thread";
import type { BookingStatus } from "./lifecycle";

const t = (minute: number) => new Date(Date.UTC(2026, 9, 1, 18, minute));
const MIRA = protectorActor("mira");
const JULES = protectorActor("jules");

const booking = (status: BookingStatus) => ({ id: "b1", status, createdAt: t(0) });
const say = (id: string, authorId: string, minute: number): Message => ({
  id,
  threadId: "b1",
  authorId,
  body: id,
  createdAt: t(minute),
});
const event = (action: string, minute: number, protectorId: string | null = "mira"): ThreadEvent => ({
  action,
  protectorId,
  at: t(minute),
});
const ids = (view: ReturnType<typeof viewThread>) => view?.messages.map((m) => m.id);

const REQUESTED = [event("REQUEST", 0, null)];
const OFFERED = [...REQUESTED, event("ASSIGN", 5)];
const ACCEPTED = [...OFFERED, event("ACCEPT", 10)];

const messages = [
  say("before-assign", CUSTOMER_ACTOR, 1),
  say("while-offered", OPS_ACTOR, 7),
  say("after-accept", MIRA, 12),
  say("at-entrance", CUSTOMER_ACTOR, 20),
];

describe("booking thread visibility", () => {
  it("lets the customer and Operations see everything from the start", () => {
    const thread = bookingThread(booking("ACCEPTED"), ACCEPTED);
    const all = ["before-assign", "while-offered", "after-accept", "at-entrance"];
    expect(ids(viewThread(thread, CUSTOMER_ACTOR, messages, t(30)))).toEqual(all);
    expect(ids(viewThread(thread, OPS_ACTOR, messages, t(30)))).toEqual(all);
  });

  it("shows a Protector who is only offered the job nothing at all", () => {
    const thread = bookingThread(booking("ASSIGNED"), OFFERED);
    expect(viewThread(thread, MIRA, messages, t(8))).toBeNull();
  });

  it("shows an accepted Protector what was said from the moment they accepted", () => {
    const thread = bookingThread(booking("ACCEPTED"), ACCEPTED);
    const view = viewThread(thread, MIRA, messages, t(30));
    expect(ids(view)).toEqual(["after-accept", "at-entrance"]);
    expect(view?.canWrite).toBe(true);
  });

  it("names speakers by role, never by who they are", () => {
    const thread = bookingThread(booking("ACCEPTED"), ACCEPTED);
    const speakers = (viewer: string) => viewThread(thread, viewer, messages, t(30))?.messages.map((m) => m.speaker);
    expect(speakers(MIRA)).toEqual(["You", "Customer"]);
    expect(speakers(CUSTOMER_ACTOR)).toEqual(["You", "Operations", "Your Protector", "You"]);
    expect(speakers(OPS_ACTOR)).toEqual(["Customer", "You", "Protector", "Customer"]);
    expect(JSON.stringify(viewThread(thread, MIRA, messages, t(30)))).not.toContain("authorId");
  });

  it("lets a Protector taken off the job keep what they saw and nothing after", () => {
    const events = [...ACCEPTED, event("UNASSIGN", 25), event("ASSIGN", 26, "jules"), event("ACCEPT", 28, "jules")];
    const later = [...messages, say("to-jules", CUSTOMER_ACTOR, 30), say("from-jules", JULES, 31)];
    const thread = bookingThread(booking("ACCEPTED"), events);

    const mira = viewThread(thread, MIRA, later, t(40));
    expect(ids(mira)).toEqual(["after-accept", "at-entrance"]);
    expect(mira?.canWrite).toBe(false);
    expect(mira?.closed).toBe("LEFT");

    // The replacement starts from their own acceptance, not the old stint.
    expect(ids(viewThread(thread, JULES, later, t(40)))).toEqual(["to-jules", "from-jules"]);
    const customer = viewThread(thread, CUSTOMER_ACTOR, later, t(40));
    expect(customer?.messages.find((m) => m.id === "after-accept")?.speaker).toBe("Previous Protector");
    expect(customer?.messages.find((m) => m.id === "from-jules")?.speaker).toBe("Your Protector");
  });

  it("gives a Protector who declined before accepting no seat at all", () => {
    const thread = bookingThread(booking("REQUESTED"), [...OFFERED, event("DECLINE", 8)]);
    expect(viewThread(thread, MIRA, messages, t(30))).toBeNull();
  });

  it("closes writing for everyone once the booking has ended, keeping the history", () => {
    for (const status of ["COMPLETED", "CANCELLED", "EXPIRED"] as const) {
      const thread = bookingThread(booking(status), ACCEPTED);
      for (const who of [CUSTOMER_ACTOR, OPS_ACTOR, MIRA]) {
        const view = viewThread(thread, who, messages, t(30));
        expect(view?.canWrite).toBe(false);
        expect(view?.closed).toBe("ENDED");
        expect(view?.messages.length).toBeGreaterThan(0);
      }
    }
  });

  it("refuses anyone who is not a participant", () => {
    const thread = bookingThread(booking("ACCEPTED"), ACCEPTED);
    expect(viewThread(thread, JULES, messages, t(30))).toBeNull();
    expect(viewThread(thread, "oc-someone", messages, t(30))).toBeNull();
  });
});

describe("booking thread unread", () => {
  it("counts per person: one reader catching up clears nobody else's badge", () => {
    const reads = [{ actorId: OPS_ACTOR, lastReadAt: t(30) }];
    const thread = bookingThread(booking("ACCEPTED"), ACCEPTED, reads);
    expect(viewThread(thread, OPS_ACTOR, messages, t(30))?.unread).toBe(0);
    // The customer never opened it: everything someone else wrote is new.
    expect(viewThread(thread, CUSTOMER_ACTOR, messages, t(30))?.unread).toBe(2);
    // The Protector's unread starts at their acceptance, not before.
    expect(viewThread(thread, MIRA, messages, t(30))?.unread).toBe(1);
  });
});
