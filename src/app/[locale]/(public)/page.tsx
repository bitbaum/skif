import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ChecklistCards } from "@/components/site/checklist-cards";
import { FieldTiles } from "@/components/site/field-tiles";
import { PageHero } from "@/components/site/page-hero";
import { PhotoCard } from "@/components/site/photo-card";
import { QuickCheck } from "@/components/site/quick-check";
import { SectionIntro } from "@/components/site/section-intro";
import { ACTION, LABEL, SHELL } from "@/components/site/shell";
import { CHECKLISTS } from "@/config/checklists";
import { PHOTOS } from "@/config/photos";
import { shareMetadata } from "@/site/share";
import { siteText } from "@/config/site";
import { pageLocale, type LocaleParams } from "@/i18n/page";

// Words come from src/config/text in the page's language; fields, checklists
// and photos from their own config.
export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  return shareMetadata("/", await pageLocale(params));
}

export default async function Home({ params }: { params: LocaleParams }) {
  const locale = await pageLocale(params);
  const { FIELDS_SECTION, FREEDOM, HOME, MENU, PATHS, PEOPLE_TEASER, QUICK_CHECK } = siteText(locale);
  return (
    <>
      <PageHero eyebrow={HOME.eyebrow} statement={HOME.statement} lead={HOME.lead} actions={HOME.actions} photo={PHOTOS.nightStreet} />

      <section id="check" aria-labelledby="check-title" className={`${SHELL} scroll-mt-20 py-20`}>
        <SectionIntro id="check-title" eyebrow={QUICK_CHECK.eyebrow} title={QUICK_CHECK.title} lede={QUICK_CHECK.lede} />
        <QuickCheck />
      </section>

      <section aria-label={HOME.pathsLabel} className={`${SHELL} pb-20`}>
        <div className="grid gap-4 md:grid-cols-2">
          {PATHS.map((p) => (
            <PhotoCard key={p.key} photo={PHOTOS[p.photo]} eyebrow={p.eyebrow} title={p.title} body={p.body} href={p.href} label={p.label} />
          ))}
        </div>
        <Link
          href="/business"
          className="mt-4 flex min-h-11 items-center justify-between gap-4 rounded-card border border-subtle px-6 py-4 text-fg-primary hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span>
            <span className="font-medium">{HOME.business.lead}</span>{" "}
            <span className="text-fg-secondary">{HOME.business.rest}</span>
          </span>
          <span aria-hidden>→</span>
        </Link>
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
        <SectionIntro id="lists-title" eyebrow={MENU[0].label} title={HOME.checklistsTitle} />
        <ChecklistCards checklists={CHECKLISTS.slice(0, 3)} />
        <Link href="/act" className={`${ACTION.secondary} mt-8`}>
          {HOME.allChecklists}
        </Link>
      </section>

      <section aria-labelledby="people-title" className={`${SHELL} pb-8`}>
        <SectionIntro id="people-title" eyebrow={PEOPLE_TEASER.eyebrow} title={PEOPLE_TEASER.title} lede={PEOPLE_TEASER.body} />
        <div className="grid gap-4 md:grid-cols-2">
          <PhotoCard photo={PHOTOS.doorway} eyebrow={MENU[3].label} title={PEOPLE_TEASER.protectorsCard.title} body={PEOPLE_TEASER.protectorsCard.body} href={PEOPLE_TEASER.actions[0].href} label={PEOPLE_TEASER.actions[0].label} />
          <PhotoCard photo={PHOTOS.grappling} eyebrow={MENU[2].label} title={PEOPLE_TEASER.academyCard.title} body={PEOPLE_TEASER.academyCard.body} href={PEOPLE_TEASER.actions[1].href} label={PEOPLE_TEASER.actions[1].label} />
        </div>
      </section>
    </>
  );
}
