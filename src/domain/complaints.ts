/**
 * Complaint handling (SPEC §10). A complaint never changes a Protector's
 * standing by itself: a person reviews it, the Protector can answer and
 * appeal, and only Operations' decision is recorded as an outcome.
 *
 * Confidentiality: the Protector never sees the customer's words or who
 * complained — only the summary Operations writes for them.
 */
import { fail, ok, type Result } from "./result";

export const COMPLAINT_STATUSES = [
  "RECEIVED",
  "AWAITING_RESPONSE",
  "UNDER_REVIEW",
  "UPHELD",
  "NOT_UPHELD",
  "APPEALED",
] as const;
export type ComplaintStatus = (typeof COMPLAINT_STATUSES)[number];

export const COMPLAINT_ACTIONS = ["ASK_PROTECTOR", "RESPOND", "UPHOLD", "DISMISS", "APPEAL"] as const;
export type ComplaintAction = (typeof COMPLAINT_ACTIONS)[number];

type Rule = { from: readonly ComplaintStatus[]; to: ComplaintStatus; by: "OPS" | "PROTECTOR" };

const OPEN: readonly ComplaintStatus[] = ["RECEIVED", "AWAITING_RESPONSE", "UNDER_REVIEW", "APPEALED"];

const RULES: Record<ComplaintAction, Rule> = {
  ASK_PROTECTOR: { from: ["RECEIVED"], to: "AWAITING_RESPONSE", by: "OPS" },
  RESPOND: { from: ["AWAITING_RESPONSE"], to: "UNDER_REVIEW", by: "PROTECTOR" },
  UPHOLD: { from: OPEN, to: "UPHELD", by: "OPS" },
  DISMISS: { from: OPEN, to: "NOT_UPHELD", by: "OPS" },
  APPEAL: { from: ["UPHELD"], to: "APPEALED", by: "PROTECTOR" },
};

export function nextComplaintStatus(
  current: ComplaintStatus,
  action: ComplaintAction,
  by: "OPS" | "PROTECTOR",
): Result<ComplaintStatus> {
  const rule = RULES[action];
  if (rule.by !== by) return fail("Not allowed");
  if (!rule.from.includes(current)) return fail(`A complaint that is ${STATUS_LABELS[current].toLowerCase()} cannot be changed that way`);
  return ok(rule.to);
}

export function complaintActions(current: ComplaintStatus, by: "OPS" | "PROTECTOR"): ComplaintAction[] {
  return COMPLAINT_ACTIONS.filter((a) => nextComplaintStatus(current, a, by).success);
}

export function isOpen(status: ComplaintStatus): boolean {
  return OPEN.includes(status);
}

export const STATUS_LABELS: Record<ComplaintStatus, string> = {
  RECEIVED: "Received",
  AWAITING_RESPONSE: "Waiting for the Protector's response",
  UNDER_REVIEW: "Under review",
  UPHELD: "Upheld",
  NOT_UPHELD: "Not upheld",
  APPEALED: "Appealed by the Protector",
};

/** What the customer sees: whether it's being handled, and the outcome. */
export function customerStatusLabel(status: ComplaintStatus): string {
  if (isOpen(status)) return status === "RECEIVED" ? "Received" : "Being reviewed";
  return STATUS_LABELS[status];
}
