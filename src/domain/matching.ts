/**
 * Deterministic, explainable Protector ranking. No model, no hidden score:
 * every point is a line item Operations can read, and every Protector left out
 * is listed with the reason. Same input, same output, always.
 */
import { languageLabel, PRESENCE_STYLES, type PresenceStyle } from "@/config/constraints";
import {
  LEVEL_FACTOR,
  MATCH_WEIGHTS,
  SERVICE_CAPABILITIES,
  VERIFICATION_FACTOR,
  WORKLOAD_WINDOW_DAYS,
} from "@/config/matching";
import { RATING_MAX, RATING_MIN } from "@/config/ratings";
import { serviceLabel, serviceRequires, type ServiceKey } from "@/config/services";
import { capabilityLabel, type CapabilityKey } from "@/config/capabilities";
import { isAvailable, type AvailabilityWindow } from "./availability";
import { describeHeld, standing, type HeldCapability } from "./capabilities";
import { zonedIsoDay } from "./time";

export type MatchRequest = {
  service: ServiceKey;
  languages: readonly string[];
  presenceStyle: PresenceStyle;
  startsAt: Date;
  hours: number;
  /** Capabilities the customer insisted on, on top of the service's own. */
  required: readonly CapabilityKey[];
};

/** Everything a Protector must hold, verified and valid, to be matched. */
export function requirementsFor(service: ServiceKey, extra: readonly CapabilityKey[]): CapabilityKey[] {
  return [...new Set([...serviceRequires(service), ...extra])];
}

const UNMET = { rejected: "not accepted", expired: "certificate expired" } as const;

function unmetRequirement(req: MatchRequest, c: MatchCandidate, onDay: string): string | null {
  for (const key of requirementsFor(req.service, req.required)) {
    const held = c.capabilities.find((h) => h.key === key);
    if (!held) return `${capabilityLabel(key)} required — not held`;
    const s = standing(held, onDay);
    if (s.kind === "SELF_DECLARED") return `${capabilityLabel(key)} required — not yet verified`;
    if (s.kind === "UNUSABLE") return `${capabilityLabel(key)} required — ${UNMET[s.reason]}`;
  }
  return null;
}

export type MatchCandidate = {
  id: string;
  displayName: string;
  services: readonly string[];
  languages: readonly string[];
  capabilities: readonly HeldCapability[];
  availability: readonly AvailabilityWindow[];
  presenceStyles: readonly string[];
  /** Mean of past ratings normalised to 0..1, or null with no ratings yet. */
  ratingScore: number | null;
  ratingCount: number;
  completedRecently: number;
  /** Already committed to another booking overlapping this one. */
  busy: boolean;
};

export type MatchReason = { label: string; points: number };
export type RankedProtector = { id: string; displayName: string; score: number; reasons: MatchReason[] };
export type ExcludedProtector = { id: string; displayName: string; reason: string };
export type MatchResult = { ranked: RankedProtector[]; excluded: ExcludedProtector[] };

function exclusionReason(req: MatchRequest, c: MatchCandidate, onDay: string): string | null {
  if (!c.services.includes(req.service)) return `Does not offer ${serviceLabel(req.service)}`;
  if (c.availability.length === 0) return "Has not set availability";
  if (!isAvailable(c.availability, req.startsAt, req.hours)) return "Not available at that time";
  const unmet = unmetRequirement(req, c, onDay);
  if (unmet) return unmet;
  if (c.busy) return "Already committed to an overlapping booking";
  if (req.languages.length > 0 && !req.languages.some((l) => c.languages.includes(l))) {
    return "Shares no language with the customer";
  }
  return null;
}

function reasonsFor(req: MatchRequest, c: MatchCandidate, today: string): MatchReason[] {
  const reasons: MatchReason[] = [];

  const shared = req.languages.filter((l) => c.languages.includes(l));
  if (shared.length > 0) {
    reasons.push({
      label: `Speaks ${shared.map(languageLabel).join(", ")}`,
      points: shared.length * MATCH_WEIGHTS.sharedLanguage,
    });
  }

  for (const key of SERVICE_CAPABILITIES[req.service]) {
    const held = c.capabilities.find((h) => h.key === key);
    if (!held) continue;
    const s = standing(held, today);
    const points =
      s.kind === "UNUSABLE"
        ? 0
        : Math.round(MATCH_WEIGHTS.relevantCapability * LEVEL_FACTOR[held.level] * VERIFICATION_FACTOR[s.kind]);
    reasons.push({ label: describeHeld(held, s), points });
  }

  if (c.presenceStyles.includes(req.presenceStyle)) {
    const style = PRESENCE_STYLES.find((p) => p.key === req.presenceStyle)?.label ?? req.presenceStyle;
    reasons.push({
      label: `Works in the ${style.toLowerCase()} style you asked for`,
      points: MATCH_WEIGHTS.presenceStyle,
    });
  }

  if (c.ratingScore === null) {
    reasons.push({ label: "No ratings yet", points: 0 });
  } else {
    reasons.push({
      label: `Past customers' ratings (${c.ratingCount})`,
      points: Math.round(c.ratingScore * MATCH_WEIGHTS.pastRatings),
    });
  }

  if (c.completedRecently > 0) {
    reasons.push({
      label: `${c.completedRecently} job(s) in the last ${WORKLOAD_WINDOW_DAYS} days — spreading work fairly`,
      points: -c.completedRecently * MATCH_WEIGHTS.recentWorkload,
    });
  }

  return reasons;
}

export function rankProtectors(req: MatchRequest, candidates: readonly MatchCandidate[]): MatchResult {
  // A certificate must still be valid on the day of the job.
  const onDay = zonedIsoDay(req.startsAt);
  const ranked: RankedProtector[] = [];
  const excluded: ExcludedProtector[] = [];

  for (const c of candidates) {
    const reason = exclusionReason(req, c, onDay);
    if (reason) {
      excluded.push({ id: c.id, displayName: c.displayName, reason });
      continue;
    }
    const reasons = reasonsFor(req, c, onDay);
    const score = reasons.reduce((sum, r) => sum + r.points, 0);
    ranked.push({ id: c.id, displayName: c.displayName, score, reasons });
  }

  const byName = (a: { displayName: string; id: string }, b: { displayName: string; id: string }) =>
    a.displayName.localeCompare(b.displayName) || a.id.localeCompare(b.id);
  ranked.sort((a, b) => b.score - a.score || byName(a, b));
  excluded.sort(byName);
  return { ranked, excluded };
}

/** Normalise a mean rating on the configured scale to 0..1 for the ranking. */
export function normaliseRating(mean: number): number {
  return (mean - RATING_MIN) / (RATING_MAX - RATING_MIN);
}
