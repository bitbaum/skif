"use client";

import Link from "next/link";
import { useState } from "react";
import type { HarmFamily } from "@/config/harm-families";
import { LABEL } from "./shell";

export type GuideCard = { slug: string; title: string; summary: string; fields: readonly HarmFamily[]; fieldLabels: string };
type Filter = { key: HarmFamily; label: string };

/**
 * Guides filtered by field of safety: "All" plus every field that has a
 * guide, in one row that scrolls on a phone (never wrapping pills). The
 * fields are the site's one taxonomy; guides add no second one.
 */
export function GuideBrowser({ guides, filters }: { guides: readonly GuideCard[]; filters: readonly Filter[] }) {
  const [field, setField] = useState<HarmFamily | null>(null);
  const shown = field ? guides.filter((g) => g.fields.includes(field)) : guides;
  const chip = (selected: boolean) =>
    `min-h-11 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
      selected ? "border-accent bg-accent text-accent-ink" : "border-subtle text-fg-secondary hover:border-strong hover:text-fg-primary"
    }`;
  return (
    <div>
      <div role="group" aria-label="Filter guides by field" className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        <button type="button" aria-pressed={field === null} onClick={() => setField(null)} className={chip(field === null)}>
          All {guides.length}
        </button>
        {filters.map((f) => (
          <button key={f.key} type="button" aria-pressed={field === f.key} onClick={() => setField(f.key)} className={chip(field === f.key)}>
            {f.label}
          </button>
        ))}
      </div>
      <ul className="mt-6 grid border-t border-subtle md:grid-cols-2 md:gap-x-10">
        {shown.map((g) => (
          <li key={g.slug} className="border-b border-subtle">
            <Link
              href={`/guides/${g.slug}`}
              className="group flex h-full min-h-11 flex-col gap-2 py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span className={LABEL}>{g.fieldLabels}</span>
              <span className="font-heading text-xl font-semibold tracking-display text-fg-primary group-hover:text-accent">
                {g.title}
                <span aria-hidden>{" "}→</span>
              </span>
              <span className="text-sm leading-relaxed text-fg-secondary">{g.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
