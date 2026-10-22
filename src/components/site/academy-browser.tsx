"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { ACADEMY_AREAS, type AcademyArea, type Course, COURSES } from "@/config/academy";
import { areaText, capabilityText, courseText, deliveryText } from "@/config/text/academy";
import { wordsFor } from "@/config/text";
import type { Locale } from "@/i18n/locales";
import { signInTo } from "@/config/site";

/**
 * The Academy one area at a time: a row of areas (one line that scrolls on a
 * phone, never wrapping into uneven rows), then that area's courses. Showing
 * all nine areas at once made a twelve-screen page of identical cards.
 */
export function AcademyBrowser({ locale }: { locale: Locale }) {
  const w = wordsFor(locale).academyHero;
  const [area, setArea] = useState<AcademyArea>(ACADEMY_AREAS[0].key);
  const current = ACADEMY_AREAS.find((a) => a.key === area) ?? ACADEMY_AREAS[0];
  const courses = (COURSES as readonly Course[]).filter((c) => c.area === area);
  return (
    <div>
      <div role="tablist" aria-label={w.areasLabel} className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
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
              {areaText(a.key, locale).title}
            </button>
          );
        })}
      </div>

      <div id="academy-panel" role="tabpanel" aria-label={areaText(current.key, locale).title} className="mt-8">
        <p className="max-w-prose text-lg leading-relaxed text-fg-secondary">{areaText(current.key, locale).intro}</p>
        <ul className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <li key={c.key} className="flex flex-col rounded-card border border-subtle bg-surface-raised p-5">
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-subtle px-2.5 py-1 text-fg-secondary">{w.planned}</span>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">{deliveryText(c.delivery, locale)}</span>
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-fg-primary">{courseText(c, locale).title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-secondary">{courseText(c, locale).outcome}</p>
              {c.builds.length > 0 && (
                <p className="mt-4 border-t border-subtle pt-3 text-xs text-fg-tertiary">
                  {w.builds}: {c.builds.map((b) => capabilityText(b, locale)).join(", ").toLowerCase()}
                </p>
              )}
              {c.guide && (
                <Link href={`/guides/${c.guide}`} className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-fg-primary underline-offset-4 hover:underline">
                  {w.guide} →
                </Link>
              )}
              {/* A plain link: /training is outside the language routing. */}
              <a
                href={signInTo(`/training?course=${c.key}`)}
                className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-accent underline-offset-4 hover:underline"
              >
                {w.notify} →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
