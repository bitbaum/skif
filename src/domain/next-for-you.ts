/**
 * What a returning person should look at first, as plain items: the first step
 * of their latest plan they have not acted on, a step waiting for "Did it
 * help?", and the booking that is next. Pure, so it can be tested without a
 * page; the page only draws what this returns.
 */
import { comingAndPast, type BookingStatus } from "./lifecycle";
import type { PlanStep } from "./safety-plan";
import type { StepOutcome } from "./step-outcomes";

export type NextItem =
  | { kind: "STEP"; stepKey: string; assessmentId: string }
  | { kind: "HELPED"; stepKey: string; assessmentId: string }
  | {
      kind: "BOOKING";
      bookingId: string;
      service: string;
      status: BookingStatus;
      startsAt: Date;
    };

export function nextForYou({
  latestPlan,
  outcomes,
  bookings,
}: {
  latestPlan: { assessmentId: string; steps: PlanStep[] } | null;
  outcomes: ReadonlyMap<string, StepOutcome>;
  bookings: {
    id: string;
    service: string;
    status: BookingStatus;
    startsAt: Date;
  }[];
}): NextItem[] {
  const items: NextItem[] = [];
  const { coming } = comingAndPast(bookings);
  const booking = coming[0];
  if (booking) {
    items.push({
      kind: "BOOKING",
      bookingId: booking.id,
      service: booking.service,
      status: booking.status,
      startsAt: booking.startsAt,
    });
  }
  if (latestPlan) {
    const asked = latestPlan.steps.find(
      (s) =>
        outcomes.get(s.key)?.status === "DONE" && !outcomes.get(s.key)?.helped,
    );
    if (asked)
      items.push({
        kind: "HELPED",
        stepKey: asked.key,
        assessmentId: latestPlan.assessmentId,
      });
    const todo = latestPlan.steps.find((s) => !outcomes.has(s.key));
    if (todo)
      items.push({
        kind: "STEP",
        stepKey: todo.key,
        assessmentId: latestPlan.assessmentId,
      });
  }
  return items;
}
