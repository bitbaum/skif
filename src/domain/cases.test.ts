import { describe, expect, it } from "vitest";
import { RECOVERY_STEPS, stepsForKind } from "@/config/cases";
import {
  caseInput,
  caseProgress,
  caseReportText,
  groupIndicators,
  showLocalMinute,
  sortTimeline,
  timelineInput,
} from "./cases";

describe("case file inputs", () => {
  it("need a name, and a date and time for a timeline entry", () => {
    expect(caseInput.safeParse({ kind: "OTHER", title: "  " }).success).toBe(
      false,
    );
    expect(
      caseInput.safeParse({
        kind: "OTHER",
        title: "x",
        happenedOn: "30.10.2026",
      }).success,
    ).toBe(false);
    expect(caseInput.parse({ kind: "OTHER", title: " x " })).toMatchObject({
      title: "x",
      summary: "",
      happenedOn: "",
    });
    expect(
      timelineInput.safeParse({ at: "2026-10-30", what: "x" }).success,
    ).toBe(false);
    expect(
      timelineInput.safeParse({ at: "2026-10-30T10:07", what: "x" }).success,
    ).toBe(true);
  });
});

describe("case file ordering and progress", () => {
  it("sorts the timeline by time, keeping typed order for equal times", () => {
    const t = sortTimeline([
      { id: "c", at: "2026-10-30T12:30", what: "c" },
      { id: "a", at: "2026-10-30T10:07", what: "a" },
      { id: "b", at: "2026-10-30T10:07", what: "b" },
    ]);
    expect(t.map((e) => e.id)).toEqual(["a", "b", "c"]);
    expect(showLocalMinute("2026-10-30T10:07")).toBe("30.10.2026, 10:07");
  });

  it("groups details in report order and leaves empty groups out", () => {
    const g = groupIndicators([
      { id: "1", kind: "ACCOUNT", value: "CH00", note: "" },
      { id: "2", kind: "PHONE", value: "+41", note: "" },
    ]);
    expect(g.map((x) => x.kind)).toEqual(["PHONE", "ACCOUNT"]);
  });

  it("counts only the steps for the kind, and names the most urgent open one", () => {
    expect(stepsForKind("PURCHASE").some((s) => s.key === "REMOVE_TOOLS")).toBe(
      false,
    );
    expect(stepsForKind("REMOTE_ACCESS")).toHaveLength(RECOVERY_STEPS.length);
    const p = caseProgress("PURCHASE", ["BANK", "REMOVE_TOOLS"]);
    expect(p.done).toBe(1);
    expect(p.next?.key).toBe("PASSWORDS");
  });
});

describe("case report text", () => {
  it("says what happened, in order, with every step and whether it is done", () => {
    const text = caseReportText(
      {
        kind: "REMOTE_ACCESS",
        title: "Fake PostFinance call",
        summary: "They said an account was opened in my name.",
        happenedOn: "2026-10-30",
        policeReference: "",
        timeline: [
          { id: "2", at: "2026-10-30T10:13", what: "Second connection" },
          { id: "1", at: "2026-10-30T10:07", what: "First connection" },
        ],
        indicators: [
          {
            id: "i",
            kind: "REMOTE_TOOL",
            value: "AnyDesk 1729645489",
            note: "connection_trace.txt",
          },
        ],
        stepsDone: ["BANK"],
      },
      "30.10.2026",
    );
    expect(text).toContain("Date: 30.10.2026");
    expect(text.indexOf("First connection")).toBeLessThan(
      text.indexOf("Second connection"),
    );
    expect(text).toContain(
      "- Remote-access program and its ID: AnyDesk 1729645489 (connection_trace.txt)",
    );
    expect(text).toContain("- [x] Call your bank on the number on your card");
    expect(text).toContain("- [ ] Report it to the police");
    expect(text).not.toContain("Police case number");
  });
});
