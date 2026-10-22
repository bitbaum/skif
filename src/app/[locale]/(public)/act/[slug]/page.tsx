import type { Metadata } from "next";
import { shareMetadata } from "@/site/share";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { ChecklistView } from "@/components/site/checklist";
import { FieldIcon } from "@/components/site/field-icon";
import { PageHero } from "@/components/site/page-hero";
import { ACTION, LABEL, SHELL } from "@/components/site/shell";
import { checklistBySlug, CHECKLISTS } from "@/config/checklists";
import { guideBySlug } from "@/config/guides";
import { guideIn } from "@/config/guides/translations";
import { wordsFor } from "@/config/text";
import { checklistWords } from "@/config/text/checklists";
import { fieldWords } from "@/config/text/fields";
import { PHOTOS } from "@/config/photos";
import { signInTo } from "@/config/site";
import { guideHref } from "@/site/guides";
import { pageLocale } from "@/i18n/page";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return CHECKLISTS.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  return shareMetadata(`/act/${(await params).slug}`, await pageLocale(params));
}

export default async function ChecklistPage({ params }: { params: Params }) {
  const locale = await pageLocale(params);
  const c = checklistBySlug((await params).slug);
  if (!c) notFound();
  const t = wordsFor(locale).checklist;
  const w = checklistWords(c, locale);
  const linked = c.guide ? guideBySlug(c.guide) : undefined;
  const guide = linked ? guideIn(linked, locale) : undefined;
  return (
    <>
      <PageHero
        eyebrow={t.eyebrow(c.minutes, c.fields.map((f) => fieldWords(f, locale).label).join(" · "))}
        statement={w.title}
        lead={[w.when]}
        photo={c.photo ? PHOTOS[c.photo] : undefined}
        icon={<FieldIcon field={c.fields[0]} />}
      />
      <div className={`${SHELL} grid gap-12 pt-10 lg:grid-cols-12`}>
        <div className="lg:col-span-8">
          <ChecklistView slug={c.slug} steps={w.steps} words={{ stepsDone: t.stepsDone, done: t.done, again: t.again, privacy: t.privacy }} />
        </div>
        <aside className="space-y-6 lg:col-span-4">
          {guide && (
            <div className="rounded-card border border-subtle p-5">
              <p className={LABEL}>{t.why}</p>
              <Link href={guideHref(guide)} className="mt-2 flex min-h-11 items-center font-heading text-lg font-semibold text-fg-primary hover:text-accent">
                {guide.title} →
              </Link>
              <p className="mt-2 text-sm leading-relaxed text-fg-secondary">{guide.summary}</p>
            </div>
          )}
          <div className="rounded-card border border-subtle p-5">
            <p className={LABEL}>{t.properly}</p>
            <p className="mt-2 text-sm leading-relaxed text-fg-secondary">{t.properlyBody}</p>
            <Link href={signInTo("/assessments")} className={`${ACTION.secondary} mt-4`}>
              {t.start}
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
