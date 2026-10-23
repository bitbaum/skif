import { describe, expect, it } from "vitest";
import { nextForYou } from "./next-for-you";
import type { StepOutcome } from "./step-outcomes";

const steps = [
  { key: "A", concerns: [] },
  { key: "B", concerns: [] },
  { key: "C", concerns: [] },
];
const plan = { assessmentId: "as1", steps };
const none = new Map<string, StepOutcome>();
const soon = new Date(Date.now() + 86_400_000);

describe("what is next for a returning person", () => {
  it("is nothing for someone with no plan and no booking", () => {
    expect(
      nextForYou({ latestPlan: null, outcomes: none, bookings: [] }),
    ).toEqual([]);
  });

  it("points at the first step they have not acted on", () => {
    const outcomes = new Map<string, StepOutcome>([
      ["A", { status: "NOT_FOR_ME", helped: null }],
    ]);
    expect(nextForYou({ latestPlan: plan, outcomes, bookings: [] })).toEqual([
      { kind: "STEP", stepKey: "B", assessmentId: "as1" },
    ]);
  });

  it("asks about a step they did but never said whether it helped, before suggesting a new one", () => {
    const outcomes = new Map<string, StepOutcome>([
      ["A", { status: "DONE", helped: null }],
    ]);
    expect(
      nextForYou({ latestPlan: plan, outcomes, bookings: [] }).map(
        (i) => i.kind,
      ),
    ).toEqual(["HELPED", "STEP"]);
  });

  it("says nothing about a plan once every step has been dealt with", () => {
    const outcomes = new Map<string, StepOutcome>(
      steps.map((s) => [s.key, { status: "DONE", helped: "YES" }]),
    );
    expect(nextForYou({ latestPlan: plan, outcomes, bookings: [] })).toEqual(
      [],
    );
  });

  it("puts the nearest live booking first and ignores finished ones", () => {
    const later = new Date(soon.getTime() + 86_400_000);
    const items = nextForYou({
      latestPlan: null,
      outcomes: none,
      bookings: [
        {
          id: "old",
          service: "NIGHT_OUT",
          status: "COMPLETED",
          startsAt: new Date(Date.now() - 86_400_000),
        },
        { id: "b2", service: "GET_HOME", status: "REQUESTED", startsAt: later },
        { id: "b1", service: "NIGHT_OUT", status: "ASSIGNED", startsAt: soon },
      ],
    });
    expect(items).toEqual([
      {
        kind: "BOOKING",
        bookingId: "b1",
        service: "NIGHT_OUT",
        status: "ASSIGNED",
        startsAt: soon,
      },
    ]);
  });
});
