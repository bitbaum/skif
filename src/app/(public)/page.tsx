import Link from "next/link";
import { ChecklistCards } from "@/components/site/checklist-cards";
import { FieldTiles } from "@/components/site/field-tiles";
import { PageHero } from "@/components/site/page-hero";
import { PhotoCard } from "@/components/site/photo-card";
import { QuickCheck } from "@/components/site/quick-check";
import { SectionIntro } from "@/components/site/section-intro";
import { ACTION, LABEL, SHELL } from "@/components/site/shell";
import { CHECKLISTS } from "@/config/checklists";
import { PHOTOS } from "@/config/photos";
import { FIELDS_SECTION, FREEDOM, HOME, PATHS, PEOPLE_TEASER, QUICK_CHECK } from "@/config/site";

// Words live in src/config/site.ts; fields, checklists and photos in their own config.
export default function Home() {
  return (
    <>
      <PageHero eyebrow={HOME.eyebrow} statement={HOME.statement} lead={HOME.lead} actions={HOME.actions} photo={PHOTOS.nightStreet} />

      <section id="check" aria-labelledby="check-title" className={`${SHELL} scroll-mt-20 py-20`}>
        <SectionIntro id="check-title" eyebrow={QUICK_CHECK.eyebrow} title={QUICK_CHECK.title} lede={QUICK_CHECK.lede} />
        <QuickCheck />
      </section>

      <section aria-label="Act or understand" className={`${SHELL} grid gap-4 pb-20 md:grid-cols-2`}>
        {PATHS.map((p) => (
          <PhotoCard key={p.key} photo={PHOTOS[p.photo]} eyebrow={p.eyebrow} title={p.title} body={p.body} href={p.href} label={p.label} />
        ))}
      </section>

      <section aria-labelledby="fields-title" className="border-y border-subtle bg-surface-raised">
        <div className={`${SHELL} py-20`}>
          <SectionIntro id="fields-title" eyebrow={FIELDS_SECTION.eyebrow} title={FIELDS_SECTION.title} lede={FIELDS_SECTION.lede} />
          <FieldTiles />
        </div>
      </section>

      <section aria-labelledby="freedom-title" className={`${SHELL} grid gap-8 py-24 lg:grid-cols-12`}>
        <div className="lg:col-span-6">
          <p className={LABEL}>{FREEDOM.eyebrow}</p>
          <h2 id="freedom-title" className="mt-3 font-heading text-4xl font-semibold leading-tight tracking-display text-fg-primary sm:text-5xl">
            {FREEDOM.title}
          </h2>
        </div>
        <p className="max-w-prose text-lg leading-relaxed text-fg-secondary lg:col-span-5 lg:col-start-8 lg:self-end">{FREEDOM.body}</p>
      </section>

      <section aria-labelledby="lists-title" className={`${SHELL} pb-20`}>
        <SectionIntro id="lists-title" eyebrow="Act" title="Checklists for real situations." />
        <ChecklistCards checklists={CHECKLISTS.slice(0, 3)} />
        <Link href="/act" className={`${ACTION.secondary} mt-8`}>
          All checklists
        </Link>
      </section>

      <section aria-labelledby="people-title" className={`${SHELL} pb-8`}>
        <SectionIntro id="people-title" eyebrow={PEOPLE_TEASER.eyebrow} title={PEOPLE_TEASER.title} lede={PEOPLE_TEASER.body} />
        <div className="grid gap-4 md:grid-cols-2">
          <PhotoCard photo={PHOTOS.doorway} eyebrow="Protectors" title="Someone calm beside you." body="Vetted, matched on judgment, and explained." href={PEOPLE_TEASER.actions[0].href} label={PEOPLE_TEASER.actions[0].label} />
          <PhotoCard photo={PHOTOS.grappling} eyebrow="Academy" title="Learn what Protectors learn." body="First aid to Jiu-Jitsu, weapons and the law to digital security." href={PEOPLE_TEASER.actions[1].href} label={PEOPLE_TEASER.actions[1].label} />
        </div>
      </section>
    </>
  );
}
