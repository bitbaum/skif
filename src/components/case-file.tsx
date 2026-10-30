/** The parts of a case file the page and the printed report share, so the
 * report says exactly what the page shows (src/domain/cases.ts). */
import type { ReactNode } from "react";
import { stepsForKind, type CaseKind, type RecoveryStep } from "@/config/cases";
import {
  groupIndicators,
  showLocalMinute,
  sortTimeline,
  stepWhenLabel,
  type Indicator,
  type TimelineEntry,
} from "@/domain/cases";

/** One small form per removable row; without JavaScript it still posts. */
type RemoveForm = (props: { entryId: string; label: string }) => ReactNode;

export function TimelineList({
  entries,
  remove,
}: {
  entries: readonly TimelineEntry[];
  remove?: RemoveForm;
}) {
  const sorted = sortTimeline(entries);
  if (sorted.length === 0)
    return <p className="text-sm text-muted">Nothing yet.</p>;
  return (
    <ol className="divide-y divide-line">
      {sorted.map((e) => (
        <li key={e.id} className="flex items-start gap-3 py-2 text-sm">
          <span className="w-36 shrink-0 font-medium tabular-nums">
            {showLocalMinute(e.at)}
          </span>
          <span className="min-w-0 flex-1 whitespace-pre-line wrap-anywhere">
            {e.what}
          </span>
          {remove?.({
            entryId: e.id,
            label: `Remove the entry at ${showLocalMinute(e.at)}`,
          })}
        </li>
      ))}
    </ol>
  );
}

export function IndicatorList({
  items,
  remove,
}: {
  items: readonly Indicator[];
  remove?: RemoveForm;
}) {
  const groups = groupIndicators(items);
  if (groups.length === 0)
    return <p className="text-sm text-muted">Nothing yet.</p>;
  return (
    <dl className="space-y-3 text-sm">
      {groups.map((g) => (
        <div key={g.kind}>
          <dt className="text-muted">{g.label}</dt>
          {g.items.map((i) => (
            <dd key={i.id} className="flex items-start gap-3 py-1">
              <span className="min-w-0 flex-1 wrap-anywhere">
                <span className="font-medium">{i.value}</span>
                {i.note && (
                  <span className="text-fg-secondary"> — {i.note}</span>
                )}
              </span>
              {remove?.({ entryId: i.id, label: `Remove ${i.value}` })}
            </dd>
          ))}
        </div>
      ))}
    </dl>
  );
}

/** The recovery steps for this kind of case, grouped by when. `control`
 * draws the tick for one step; the report passes none and shows a mark. */
export function StepList({
  kind,
  done,
  control,
}: {
  kind: CaseKind;
  done: readonly string[];
  control?: (step: RecoveryStep, isDone: boolean) => ReactNode;
}) {
  const ticked = new Set(done);
  const steps = stepsForKind(kind);
  const whens = [...new Set(steps.map((s) => s.when))];
  return (
    <div className="space-y-5">
      {whens.map((when) => (
        <section key={when}>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-fg-tertiary">
            {stepWhenLabel(when)}
          </h3>
          <ul className="space-y-3">
            {steps
              .filter((s) => s.when === when)
              .map((s) => {
                const isDone = ticked.has(s.key);
                return (
                  <li key={s.key} className="flex items-start gap-3">
                    {control ? (
                      control(s, isDone)
                    ) : (
                      <span
                        aria-hidden
                        className="mt-0.5 w-5 shrink-0 font-semibold"
                      >
                        {isDone ? "✓" : "○"}
                      </span>
                    )}
                    <span className="min-w-0 flex-1 text-sm">
                      <span
                        className={`block font-medium ${isDone ? "text-fg-secondary line-through" : ""}`}
                      >
                        {s.text}
                        {!control && (
                          <span className="sr-only">
                            {isDone ? " (done)" : " (open)"}
                          </span>
                        )}
                      </span>
                      <span className="block text-fg-secondary">
                        {s.detail}
                      </span>
                      {s.link && (
                        <a
                          href={s.link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-accent underline print:no-underline"
                        >
                          {s.link.label}{" "}
                          <span className="hidden print:inline">
                            ({s.link.href})
                          </span>
                        </a>
                      )}
                    </span>
                  </li>
                );
              })}
          </ul>
        </section>
      ))}
    </div>
  );
}
