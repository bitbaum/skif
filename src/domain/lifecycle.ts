/**
 * The booking lifecycle as a pure state machine. Every status change in the
 * app goes through `nextStatus`, so who may do what, and when, is decided in
 * exactly one place.
 */
import { fail, ok, type Result } from "./result";

export const BOOKING_STATUSES = [
  "REQUESTED",
  "ASSIGNED",
  "ACCEPTED",
  "CHECKED_IN",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
  "EXPIRED",
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export const BOOKING_ACTIONS = [
  "ASSIGN",
  "ACCEPT",
  "DECLINE",
  "CHECK_IN",
  "START",
  "COMPLETE",
  "CANCEL",
  "EXPIRE",
] as const;

export type BookingAction = (typeof BOOKING_ACTIONS)[number];

/** SYSTEM acts on time alone: it only ever expires a booking. */
export type ActorRole = "CUSTOMER" | "PROTECTOR" | "OPS" | "SYSTEM";

type Rule = { from: readonly BookingStatus[]; to: BookingStatus; by: readonly ActorRole[] };

const RULES: Record<BookingAction, Rule> = {
  ASSIGN: { from: ["REQUESTED"], to: "ASSIGNED", by: ["OPS"] },
  ACCEPT: { from: ["ASSIGNED"], to: "ACCEPTED", by: ["PROTECTOR"] },
  // Declining hands the job back to Operations to assign someone else.
  DECLINE: { from: ["ASSIGNED"], to: "REQUESTED", by: ["PROTECTOR"] },
  // Arrived at the meeting point; the assignment itself starts separately.
  CHECK_IN: { from: ["ACCEPTED"], to: "CHECKED_IN", by: ["PROTECTOR"] },
  START: { from: ["CHECKED_IN"], to: "IN_PROGRESS", by: ["PROTECTOR"] },
  COMPLETE: { from: ["IN_PROGRESS"], to: "COMPLETED", by: ["PROTECTOR"] },
  CANCEL: {
    from: ["REQUESTED", "ASSIGNED", "ACCEPTED", "CHECKED_IN"],
    to: "CANCELLED",
    by: ["CUSTOMER", "OPS"],
  },
  // Nobody accepted before the start time: say so, don't pretend (SPEC §4).
  EXPIRE: { from: ["REQUESTED", "ASSIGNED"], to: "EXPIRED", by: ["SYSTEM"] },
};

/** A request nobody accepted before it was due to start. */
export function isOverdue(status: BookingStatus, startsAt: Date, now: Date): boolean {
  return RULES.EXPIRE.from.includes(status) && startsAt.getTime() <= now.getTime();
}

export const EXPIRABLE_STATUSES = RULES.EXPIRE.from;

export function nextStatus(
  current: BookingStatus,
  action: BookingAction,
  role: ActorRole,
): Result<BookingStatus> {
  const rule = RULES[action];
  if (!rule.by.includes(role)) {
    return fail(`${role.toLowerCase()} cannot ${action.toLowerCase()} a booking`);
  }
  if (!rule.from.includes(current)) {
    return fail(`cannot ${action.toLowerCase()} a booking that is ${STATUS_LABELS[current].toLowerCase()}`);
  }
  return ok(rule.to);
}

/** Actions the given role could take on a booking in this status. */
export function availableActions(current: BookingStatus, role: ActorRole): BookingAction[] {
  return BOOKING_ACTIONS.filter((a) => nextStatus(current, a, role).success);
}

/** Statuses in which a Protector is committed to the booking's time slot. */
export const ACTIVE_STATUSES: readonly BookingStatus[] = ["ASSIGNED", "ACCEPTED", "CHECKED_IN", "IN_PROGRESS"];

/** Statuses in which the assigned Protector has accepted the job: only then
 * do they see the meeting point and notes, and only then can they report. */
const ACCEPTED_STATUSES: readonly BookingStatus[] = ["ACCEPTED", "CHECKED_IN", "IN_PROGRESS", "COMPLETED"];

export function protectorHasAccepted(status: BookingStatus): boolean {
  return ACCEPTED_STATUSES.includes(status);
}

export const STATUS_LABELS: Record<BookingStatus, string> = {
  REQUESTED: "Requested",
  ASSIGNED: "Protector assigned",
  ACCEPTED: "Accepted",
  CHECKED_IN: "Protector has arrived",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  EXPIRED: "Expired — nobody accepted in time",
};
