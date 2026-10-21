"use client";

import { useState } from "react";
import { ACADEMY_AREAS, COURSE_STATUS, deliveryLabel, type AcademyArea, type Course, COURSES } from "@/config/academy";
import { capabilityLabel } from "@/config/capabilities";

/**
 * The Academy one area at a time: a row of areas (one line that scrolls on a
 * phone, never wrapping into uneven rows), then that area's courses. Showing
 * all nine areas at once made a twelve-screen page of identical cards.
 */
export function AcademyBrowser() {
  const [area, setArea] = useState<AcademyArea>(ACADEMY_AREAS[0].key);
  const current = ACADEMY_AREAS.find((a) => a.key === area) ?? ACADEMY_AREAS[0];
  const courses = (COURSES as readonly Course[]).filter((c) => c.area === area);
  return (
    <div>
      <div role="tablist" aria-label="Academy areas" className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        {ACADEMY_AREAS.map((a) => {
          const selected = a.key === area;
          return (
            <button
              key={a.key}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="academy-panel"
              onClick={() => setArea(a.key)}
              className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${selected ? "border-accent bg-accent text-accent-ink" : "border-subtle text-fg-secondary hover:border-strong hover:text-fg-primary"}`}
            >
              {a.title}
            </button>
          );
        })}
      </div>

      <div id="academy-panel" role="tabpanel" aria-label={current.title} className="mt-8">
        <p className="max-w-prose text-lg leading-relaxed text-fg-secondary">{current.intro}</p>
        <ul className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <li key={c.key} className="flex flex-col rounded-card border border-subtle bg-surface-raised p-5">
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-subtle px-2.5 py-1 text-fg-secondary">{COURSE_STATUS.label}</span>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">{deliveryLabel(c.delivery)}</span>
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-fg-primary">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-secondary">{c.outcome}</p>
              {c.builds.length > 0 && (
                <p className="mt-4 border-t border-subtle pt-3 text-xs text-fg-tertiary">
                  Builds: {c.builds.map(capabilityLabel).join(", ").toLowerCase()}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
