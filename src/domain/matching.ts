/**
 * Deterministic, explainable Protector ranking. No model, no hidden score:
 * every point is a line item Operations can read, and every Protector left out
 * is listed with the reason. Same input, same output, always.
 */
import { languageLabel, PRESENCE_STYLES, type PresenceStyle } from "@/config/constraints";
import { MATCH_WEIGHTS, SERVICE_SKILLS, WORKLOAD_WINDOW_DAYS } from "@/config/matching";
import { skillLabel } from "@/config/protectors";
import { RATING_MAX, RATING_MIN } from "@/config/ratings";
import { serviceLabel, type ServiceKey } from "@/config/services";

export type MatchRequest = {
  service: ServiceKey;
  languages: readonly string[];
  presenceStyle: PresenceStyle;
};

export type MatchCandidate = {
  id: string;
  displayName: string;
  services: readonly string[];
  languages: readonly string[];
  skills: readonly string[];
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

function exclusionReason(req: MatchRequest, c: MatchCandidate): string | null {
  if (!c.services.includes(req.service)) return `Does not offer ${serviceLabel(req.service)}`;
  if (c.busy) return "Already committed to an overlapping booking";
  if (req.languages.length > 0 && !req.languages.some((l) => c.languages.includes(l))) {
    return "Shares no language with the customer";
  }
  return null;
}

function reasonsFor(req: MatchRequest, c: MatchCandidate): MatchReason[] {
  const reasons: MatchReason[] = [];

  const shared = req.languages.filter((l) => c.languages.includes(l));
  if (shared.length > 0) {
    reasons.push({
      label: `Speaks ${shared.map(languageLabel).join(", ")}`,
      points: shared.length * MATCH_WEIGHTS.sharedLanguage,
    });
  }

  for (const skill of SERVICE_SKILLS[req.service]) {
    if (c.skills.includes(skill)) {
      reasons.push({ label: skillLabel(skill), points: MATCH_WEIGHTS.relevantSkill });
    }
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
  const ranked: RankedProtector[] = [];
  const excluded: ExcludedProtector[] = [];

  for (const c of candidates) {
    const reason = exclusionReason(req, c);
    if (reason) {
      excluded.push({ id: c.id, displayName: c.displayName, reason });
      continue;
    }
    const reasons = reasonsFor(req, c);
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
