import { describe, expect, it } from "vitest";
import { availableActions, nextStatus, protectorHasAccepted } from "./lifecycle";

describe("nextStatus", () => {
  it("walks the happy path", () => {
    expect(nextStatus("REQUESTED", "ASSIGN", "OPS")).toEqual({ success: true, data: "ASSIGNED" });
    expect(nextStatus("ASSIGNED", "ACCEPT", "PROTECTOR")).toEqual({ success: true, data: "ACCEPTED" });
    expect(nextStatus("ACCEPTED", "START", "PROTECTOR")).toEqual({ success: true, data: "IN_PROGRESS" });
    expect(nextStatus("IN_PROGRESS", "COMPLETE", "PROTECTOR")).toEqual({ success: true, data: "COMPLETED" });
  });

  it("returns a declined job to Operations", () => {
    expect(nextStatus("ASSIGNED", "DECLINE", "PROTECTOR")).toEqual({ success: true, data: "REQUESTED" });
  });

  it("refuses the wrong role", () => {
    expect(nextStatus("REQUESTED", "ASSIGN", "CUSTOMER").success).toBe(false);
    expect(nextStatus("ASSIGNED", "ACCEPT", "OPS").success).toBe(false);
  });

  it("refuses skipping a step", () => {
    expect(nextStatus("ASSIGNED", "START", "PROTECTOR").success).toBe(false);
    expect(nextStatus("REQUESTED", "COMPLETE", "PROTECTOR").success).toBe(false);
  });

  it("does not cancel a job once it has started", () => {
    expect(nextStatus("IN_PROGRESS", "CANCEL", "CUSTOMER").success).toBe(false);
    expect(availableActions("IN_PROGRESS", "CUSTOMER")).toEqual([]);
  });
});

describe("protectorHasAccepted", () => {
  it("hides the meeting point until accepted", () => {
    expect(protectorHasAccepted("ASSIGNED")).toBe(false);
    expect(protectorHasAccepted("ACCEPTED")).toBe(true);
  });
});
