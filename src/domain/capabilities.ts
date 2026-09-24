/**
 * How much a declared capability can be relied on today. Pure: the same
 * declaration and date always give the same standing.
 */
import {
  capabilityLabel,
  levelLabel,
  type CapabilityKey,
  type CapabilityLevel,
  type VerificationStatus,
} from "@/config/capabilities";

export type HeldCapability = {
  key: CapabilityKey;
  level: CapabilityLevel;
  verification: VerificationStatus;
  /** ISO date (YYYY-MM-DD) the certificate stops being valid, if any. */
  expiresOn: string | null;
};

export type Standing =
  | { kind: "VERIFIED" }
  | { kind: "SELF_DECLARED" }
  | { kind: "UNUSABLE"; reason: "rejected" | "expired" };

export function standing(c: HeldCapability, today: string): Standing {
  if (c.verification === "REJECTED") return { kind: "UNUSABLE", reason: "rejected" };
  if (c.expiresOn !== null && c.expiresOn < today) return { kind: "UNUSABLE", reason: "expired" };
  return c.verification === "VERIFIED" ? { kind: "VERIFIED" } : { kind: "SELF_DECLARED" };
}

/** "First aid — advanced, verified" */
export function describeHeld(c: HeldCapability, s: Standing): string {
  const base = `${capabilityLabel(c.key)} — ${levelLabel(c.level).toLowerCase()}`;
  switch (s.kind) {
    case "VERIFIED":
      return `${base}, verified`;
    case "SELF_DECLARED":
      return `${base}, not yet verified`;
    case "UNUSABLE":
      return `${capabilityLabel(c.key)} — ${s.reason === "expired" ? "certificate expired" : "not accepted"}`;
  }
}
