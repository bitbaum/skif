/** What Operations can do with a Protector's application in each status. */
export const PROTECTOR_STATUSES = ["APPLIED", "APPROVED", "SUSPENDED", "REJECTED"] as const;
export type ProtectorStatus = (typeof PROTECTOR_STATUSES)[number];

export type StatusMove = { to: ProtectorStatus; label: string; tone: "primary" | "danger" };

export const PROTECTOR_MOVES: Record<ProtectorStatus, readonly StatusMove[]> = {
  APPLIED: [
    { to: "APPROVED", label: "Approve", tone: "primary" },
    { to: "REJECTED", label: "Reject", tone: "danger" },
  ],
  APPROVED: [{ to: "SUSPENDED", label: "Suspend", tone: "danger" }],
  SUSPENDED: [{ to: "APPROVED", label: "Reinstate", tone: "primary" }],
  REJECTED: [{ to: "APPROVED", label: "Approve", tone: "primary" }],
};

export function mayMove(from: ProtectorStatus, to: ProtectorStatus): boolean {
  return PROTECTOR_MOVES[from].some((m) => m.to === to);
}

export const PROTECTOR_STATUS_LABELS: Record<ProtectorStatus, string> = {
  APPLIED: "Applied",
  APPROVED: "Approved",
  SUSPENDED: "Suspended",
  REJECTED: "Not accepted",
};
