/**
 * Turns assessment answers into findings (SPEC §12, §21 AssessmentFinding):
 * what needs addressing at this place, how urgently, and because of what the
 * person told us. Pure and deterministic; no guess at danger "probability"
 * (§12: don't pretend to calculate it) — only a priority with its reasons.
 */
import {
  CONCERNS,
  concernApplies,
  exposureLabel,
  EXPOSURES,
  threatLabel,
  THREATS,
  type ConcernKey,
  type ExposureKey,
  type ThreatKey,
} from "@/config/assessment";
import type { EnvironmentType } from "@/config/environments";

export const PRIORITIES = ["HIGH", "MEDIUM", "LOW"] as const;
export type Priority = (typeof PRIORITIES)[number];

export type Finding = { concern: ConcernKey; priority: Priority; because: string[] };

export type FindingInput = {
  environment: EnvironmentType;
  concerns: readonly ConcernKey[];
  exposures: readonly ExposureKey[];
  threats: readonly ThreatKey[];
  /** An occasion coming up, in the person's words; empty for none. */
  upcoming: string;
};

/** "A specific person…" reads as "a specific person…" mid-sentence; "I…" stays. */
const midSentence = (label: string) => (/^I\b/.test(label) ? label : label.charAt(0).toLowerCase() + label.slice(1));

/** Two independent exposures pointing at the same concern make it as
 * pressing as one the person named themselves. */
const EXPOSURES_FOR_MEDIUM = 2;

export function deriveFindings(input: FindingInput): Finding[] {
  const byConcern = new Map<ConcernKey, { stated: boolean; exposures: string[]; threats: string[] }>();
  const entry = (c: ConcernKey) => {
    let e = byConcern.get(c);
    if (!e) byConcern.set(c, (e = { stated: false, exposures: [], threats: [] }));
    return e;
  };

  for (const c of input.concerns) {
    if (concernApplies(c, input.environment)) entry(c).stated = true;
  }
  for (const x of input.exposures) {
    const raises = EXPOSURES.find((e) => e.key === x)?.raises ?? [];
    for (const c of raises) if (concernApplies(c, input.environment)) entry(c).exposures.push(exposureLabel(x));
  }
  for (const t of input.threats) {
    const raises = THREATS.find((e) => e.key === t)?.raises ?? [];
    for (const c of raises) if (concernApplies(c, input.environment)) entry(c).threats.push(threatLabel(t));
  }
  if (input.upcoming.trim()) entry("UPCOMING_EVENT").stated = true;

  const findings: Finding[] = [];
  for (const [concern, e] of byConcern) {
    const because = [
      ...(concern === "UPCOMING_EVENT" ? [`You mentioned: “${input.upcoming.trim()}”`] : []),
      ...(e.stated && concern !== "UPCOMING_EVENT" ? ["You said this worries you"] : []),
      ...e.threats.map((t) => `Known threat: ${midSentence(t)}`),
      ...e.exposures.map((x) => `Exposure: ${midSentence(x)}`),
    ];
    const priority: Priority =
      e.threats.length > 0 ? "HIGH" : e.stated || e.exposures.length >= EXPOSURES_FOR_MEDIUM ? "MEDIUM" : "LOW";
    findings.push({ concern, priority, because });
  }

  const order = (c: ConcernKey) => CONCERNS.findIndex((x) => x.key === c);
  return findings.sort(
    (a, b) => PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority) || order(a.concern) - order(b.concern),
  );
}

export const PRIORITY_LABELS: Record<Priority, string> = {
  HIGH: "High priority",
  MEDIUM: "Worth addressing",
  LOW: "Worth knowing",
};
