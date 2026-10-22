import type { Metadata } from "next";
import { shareMetadata } from "@/site/share";
import { Link } from "@/i18n/navigation";
import { ChecklistCards } from "@/components/site/checklist-cards";
import { PageHero } from "@/components/site/page-hero";
import { QuickCheck } from "@/components/site/quick-check";
import { SectionIntro } from "@/components/site/section-intro";
import { ACTION, SHELL } from "@/components/site/shell";
import { CHECKLISTS } from "@/config/checklists";
import { PHOTOS } from "@/config/photos";
import { siteText } from "@/config/site";
import { pageLocale, type LocaleParams } from "@/i18n/page";

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  return shareMetadata("/act", await pageLocale(params));
}

export default async function ActPage({ params }: { params: LocaleParams }) {
  const locale = await pageLocale(params);
  const { ACT, QUICK_CHECK } = siteText(locale);
  return (
    <>
      <PageHero eyebrow={ACT.eyebrow} statement={ACT.statement} lead={ACT.lead} photo={PHOTOS.zurichTram} />
      <div className={`${SHELL} space-y-20 pt-14`}>
        <section aria-labelledby="help-title">
          <h2 id="help-title" className="mb-6 font-heading text-2xl font-semibold tracking-display text-fg-primary">
            {ACT.help.title}
          </h2>
          <ul className="grid gap-3 md:grid-cols-3">
            {ACT.help.items.map((h, i) => (
              <li key={h.key} className="flex flex-col rounded-card border border-subtle bg-surface-raised p-6">
                <h3 className="font-heading text-xl font-semibold text-fg-primary">{h.title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-fg-secondary">{h.body}</p>
                <Link href={h.href} className={`${i === 0 ? ACTION.primary : ACTION.secondary} mt-6 self-start`}>
                  {h.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="lists-title">
          <h2 id="lists-title" className="mb-6 font-heading text-2xl font-semibold tracking-display text-fg-primary">
            {ACT.checklistsTitle}
          </h2>
          <ChecklistCards checklists={CHECKLISTS} locale={locale} />
        </section>

        <section id="check" aria-labelledby="check-title" className="scroll-mt-20">
          <SectionIntro id="check-title" eyebrow={QUICK_CHECK.eyebrow} title={ACT.checkTitle} lede={QUICK_CHECK.lede} />
          <QuickCheck />
        </section>
      </div>
    </>
  );
}
