/**
 * Case files: the pure part. Inputs are validated here, entries are kept in
 * order here, and the report — the account a person hands to the police — is
 * built here, so the page and the text copy can never say different things.
 */
import { z } from "zod";
import {
  CASE_KIND_KEYS,
  CASE_LIMITS,
  INDICATOR_KIND_KEYS,
  INDICATOR_KINDS,
  RECOVERY_STEP_KEYS,
  STEP_WHEN,
  caseKindLabel,
  indicatorKindLabel,
  stepsForKind,
  type CaseKind,
  type IndicatorKind,
  type RecoveryStep,
} from "@/config/cases";

const trimmed = (max: number) => z.string().trim().max(max);

/** A local date and time as typed into <input type="datetime-local">. */
const LOCAL_MINUTE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
const LOCAL_DATE = /^\d{4}-\d{2}-\d{2}$/;

export type TimelineEntry = { id: string; at: string; what: string };
export type Indicator = {
  id: string;
  kind: IndicatorKind;
  value: string;
  note: string;
};

export const caseInput = z.object({
  kind: z.enum(CASE_KIND_KEYS),
  title: trimmed(CASE_LIMITS.titleMax).min(1, "Give it a short name"),
  summary: trimmed(CASE_LIMITS.summaryMax).default(""),
  happenedOn: z
    .string()
    .trim()
    .refine((s) => s === "" || LOCAL_DATE.test(s), "Use a date like 2026-10-30")
    .default(""),
  policeReference: trimmed(CASE_LIMITS.referenceMax).default(""),
});
export type CaseInput = z.infer<typeof caseInput>;

export const timelineInput = z.object({
  at: z.string().trim().regex(LOCAL_MINUTE, "Give a date and a time"),
  what: trimmed(CASE_LIMITS.whatMax).min(1, "Say what happened"),
});
export type TimelineInput = z.infer<typeof timelineInput>;

export const indicatorInput = z.object({
  kind: z.enum(INDICATOR_KIND_KEYS),
  value: trimmed(CASE_LIMITS.valueMax).min(
    1,
    "Write it down exactly as you saw it",
  ),
  note: trimmed(CASE_LIMITS.noteMax).default(""),
});
export type IndicatorInput = z.infer<typeof indicatorInput>;

export const stepKey = z.enum(RECOVERY_STEP_KEYS);

/** Timeline in the order things happened; equal times keep the order typed. */
export function sortTimeline(
  entries: readonly TimelineEntry[],
): TimelineEntry[] {
  return entries
    .map((e, i) => ({ e, i }))
    .sort((a, b) => (a.e.at === b.e.at ? a.i - b.i : a.e.at < b.e.at ? -1 : 1))
    .map(({ e }) => e);
}

/** Indicators grouped in report order (INDICATOR_KINDS), empty groups left out. */
export function groupIndicators(
  items: readonly Indicator[],
): { kind: IndicatorKind; label: string; items: Indicator[] }[] {
  return INDICATOR_KINDS.map((k) => ({
    kind: k.key,
    label: k.label,
    items: items.filter((i) => i.kind === k.key),
  })).filter((g) => g.items.length > 0);
}

export type CaseProgress = {
  done: number;
  total: number;
  next: RecoveryStep | null;
};

/** How far recovery has got: the steps for this kind, and the most urgent
 * one still open. A key ticked for a step that no longer applies is ignored. */
export function caseProgress(
  kind: CaseKind,
  stepsDone: readonly string[],
): CaseProgress {
  const steps = stepsForKind(kind);
  const done = new Set(stepsDone);
  return {
    done: steps.filter((s) => done.has(s.key)).length,
    total: steps.length,
    next: steps.find((s) => !done.has(s.key)) ?? null,
  };
}

export type CaseFileView = {
  kind: CaseKind;
  title: string;
  summary: string;
  happenedOn: string;
  policeReference: string;
  timeline: readonly TimelineEntry[];
  indicators: readonly Indicator[];
  stepsDone: readonly string[];
};

/** "2026-10-30T10:07" → "30.10.2026, 10:07"; the Swiss way, as the police write it. */
export function showLocalMinute(at: string): string {
  const [date, time] = at.split("T");
  return `${showLocalDate(date ?? "")}${time ? `, ${time}` : ""}`;
}

export function showLocalDate(date: string): string {
  if (!LOCAL_DATE.test(date)) return date;
  const [y, m, d] = date.split("-");
  return `${d}.${m}.${y}`;
}

/**
 * The case as plain text: for pasting into the BACS or police form, an email
 * to the bank, or a message to someone helping. Same content and order as the
 * printed report.
 */
export function caseReportText(c: CaseFileView, printedOn: string): string {
  const lines: string[] = [];
  lines.push(c.title, "=".repeat(Math.min(c.title.length, 60)), "");
  lines.push(`What happened: ${caseKindLabel(c.kind)}`);
  if (c.happenedOn) lines.push(`Date: ${showLocalDate(c.happenedOn)}`);
  if (c.policeReference) lines.push(`Police case number: ${c.policeReference}`);
  lines.push(`Written down on: ${printedOn}`, "");
  if (c.summary) lines.push("Summary", c.summary, "");
  const timeline = sortTimeline(c.timeline);
  if (timeline.length) {
    lines.push("Timeline");
    for (const e of timeline)
      lines.push(`- ${showLocalMinute(e.at)}: ${e.what}`);
    lines.push("");
  }
  const groups = groupIndicators(c.indicators);
  if (groups.length) {
    lines.push("What the scammers left behind");
    for (const g of groups) {
      for (const i of g.items)
        lines.push(
          `- ${indicatorKindLabel(i.kind)}: ${i.value}${i.note ? ` (${i.note})` : ""}`,
        );
    }
    lines.push("");
  }
  const steps = stepsForKind(c.kind);
  const done = new Set(c.stepsDone);
  lines.push("Steps taken");
  for (const s of steps)
    lines.push(`- [${done.has(s.key) ? "x" : " "}] ${s.text}`);
  return lines.join("\n").trimEnd() + "\n";
}

export function stepWhenLabel(key: string): string {
  return STEP_WHEN.find((w) => w.key === key)?.label ?? key;
}
