import { describe, expect, it } from "vitest";
import { availableActions, comingAndPast, isOverdue, nextStatus, protectorHasAccepted, releasesProtector } from "./lifecycle";

describe("nextStatus", () => {
  it("walks the happy path", () => {
    expect(nextStatus("REQUESTED", "ASSIGN", "OPS")).toEqual({ success: true, data: "ASSIGNED" });
    expect(nextStatus("ASSIGNED", "ACCEPT", "PROTECTOR")).toEqual({ success: true, data: "ACCEPTED" });
    expect(nextStatus("ACCEPTED", "CHECK_IN", "PROTECTOR")).toEqual({ success: true, data: "CHECKED_IN" });
    expect(nextStatus("CHECKED_IN", "START", "PROTECTOR")).toEqual({ success: true, data: "IN_PROGRESS" });
    expect(nextStatus("IN_PROGRESS", "COMPLETE", "PROTECTOR")).toEqual({ success: true, data: "COMPLETED" });
  });

  it("returns a declined job to Operations", () => {
    expect(nextStatus("ASSIGNED", "DECLINE", "PROTECTOR")).toEqual({ success: true, data: "REQUESTED" });
  });

  it("lets only Operations take a job off a Protector, and only before it starts", () => {
    expect(nextStatus("ACCEPTED", "UNASSIGN", "OPS")).toEqual({ success: true, data: "REQUESTED" });
    expect(nextStatus("CHECKED_IN", "UNASSIGN", "OPS")).toEqual({ success: true, data: "REQUESTED" });
    expect(nextStatus("ACCEPTED", "UNASSIGN", "CUSTOMER").success).toBe(false);
    expect(nextStatus("IN_PROGRESS", "UNASSIGN", "OPS").success).toBe(false);
    expect(releasesProtector("UNASSIGN")).toBe(true);
    expect(releasesProtector("DECLINE")).toBe(true);
    expect(releasesProtector("CANCEL")).toBe(false);
  });

  it("refuses the wrong role", () => {
    expect(nextStatus("REQUESTED", "ASSIGN", "CUSTOMER").success).toBe(false);
    expect(nextStatus("ASSIGNED", "ACCEPT", "OPS").success).toBe(false);
  });

  it("refuses skipping a step", () => {
    expect(nextStatus("ASSIGNED", "START", "PROTECTOR").success).toBe(false);
    expect(nextStatus("ACCEPTED", "START", "PROTECTOR").success).toBe(false);
    expect(nextStatus("REQUESTED", "COMPLETE", "PROTECTOR").success).toBe(false);
  });

  it("does not cancel a job once it has started", () => {
    expect(nextStatus("IN_PROGRESS", "CANCEL", "CUSTOMER").success).toBe(false);
    expect(availableActions("IN_PROGRESS", "CUSTOMER")).toEqual([]);
  });
});

describe("expiry", () => {
  const start = new Date("2026-10-01T18:00:00Z");
  it("expires only unaccepted requests whose start has come", () => {
    expect(isOverdue("REQUESTED", start, new Date("2026-10-01T18:00:00Z"))).toBe(true);
    expect(isOverdue("ASSIGNED", start, new Date("2026-10-01T19:00:00Z"))).toBe(true);
    expect(isOverdue("REQUESTED", start, new Date("2026-10-01T17:59:00Z"))).toBe(false);
    expect(isOverdue("ACCEPTED", start, new Date("2026-10-02T00:00:00Z"))).toBe(false);
  });
  it("lets only the system expire", () => {
    expect(nextStatus("REQUESTED", "EXPIRE", "SYSTEM")).toEqual({ success: true, data: "EXPIRED" });
    expect(nextStatus("REQUESTED", "EXPIRE", "OPS").success).toBe(false);
  });
});

describe("protectorHasAccepted", () => {
  it("hides the meeting point until accepted", () => {
    expect(protectorHasAccepted("ASSIGNED")).toBe(false);
    expect(protectorHasAccepted("ACCEPTED")).toBe(true);
  });
});

describe("comingAndPast", () => {
  const at = (day: number) => new Date(Date.UTC(2026, 9, day, 19));
  it("puts what is still coming first, soonest first, and what is over after, latest first", () => {
    const { coming, past } = comingAndPast([
      { id: "cancelled", status: "CANCELLED" as const, startsAt: at(12) },
      { id: "done", status: "COMPLETED" as const, startsAt: at(10) },
      { id: "now", status: "IN_PROGRESS" as const, startsAt: at(9) },
      { id: "later", status: "REQUESTED" as const, startsAt: at(14) },
      { id: "expired", status: "EXPIRED" as const, startsAt: at(11) },
    ]);
    expect(coming.map((b) => b.id)).toEqual(["now", "later"]);
    expect(past.map((b) => b.id)).toEqual(["cancelled", "expired", "done"]);
  });
});
