import type { Metadata } from "next";
import Link from "next/link";
import { FieldTiles } from "@/components/site/field-tiles";
import { GuideList } from "@/components/site/guide-list";
import { PageHero } from "@/components/site/page-hero";
import { ACTION, LABEL, SHELL } from "@/components/site/shell";
import { GUIDES } from "@/config/guides";
import { PHOTOS } from "@/config/photos";
import { RESEARCH } from "@/config/research";
import { LIBRARY } from "@/config/site";
import { researchHref } from "@/site/research";

export const metadata: Metadata = {
  title: "Library",
  description: "Ten fields of safety, practical guides, sourced research, and how Skif decides.",
};

export default function LibraryPage() {
  return (
    <>
      <PageHero eyebrow={LIBRARY.eyebrow} statement={LIBRARY.statement} lead={LIBRARY.lead} photo={PHOTOS.books} />
      <div className={`${SHELL} space-y-20 pt-14`}>
        <section aria-labelledby="fields-title">
          <h2 id="fields-title" className="mb-6 font-heading text-2xl font-semibold tracking-display text-fg-primary">
            {LIBRARY.fieldsTitle}
          </h2>
          <FieldTiles />
        </section>

        <section aria-labelledby="research-title">
          <h2 id="research-title" className="font-heading text-2xl font-semibold tracking-display text-fg-primary">
            {LIBRARY.researchTitle}
          </h2>
          <p className="mt-2 mb-6 max-w-prose text-fg-secondary">{LIBRARY.researchLede}</p>
          <ul className="grid gap-3 md:grid-cols-2">
            {RESEARCH.map((r) => (
              <li key={r.slug}>
                <Link
                  href={researchHref(r)}
                  className="group flex h-full min-h-11 flex-col rounded-card border border-subtle bg-surface-raised p-6 hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span className={LABEL}>{r.sources.length} sources</span>
                  <span className="mt-3 font-heading text-xl font-semibold text-fg-primary group-hover:text-accent">{r.title}</span>
                  <span className="mt-2 text-sm leading-relaxed text-fg-secondary">{r.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="guides-title">
          <h2 id="guides-title" className="mb-6 font-heading text-2xl font-semibold tracking-display text-fg-primary">
            {LIBRARY.guidesTitle}
          </h2>
          <GuideList guides={GUIDES} />
        </section>

        <section aria-labelledby="method-title" className="rounded-card border border-subtle p-6 sm:p-8">
          <h2 id="method-title" className="font-heading text-2xl font-semibold tracking-display text-fg-primary">
            {LIBRARY.method.title}
          </h2>
          <p className="mt-2 max-w-prose leading-relaxed text-fg-secondary">{LIBRARY.method.body}</p>
          <Link href={LIBRARY.method.href} className={`${ACTION.secondary} mt-6`}>
            Read the method
          </Link>
        </section>
      </div>
    </>
  );
}
