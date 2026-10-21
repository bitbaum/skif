import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChecklistView } from "@/components/site/checklist";
import { FieldIcon } from "@/components/site/field-icon";
import { PageHero } from "@/components/site/page-hero";
import { ACTION, LABEL, SHELL } from "@/components/site/shell";
import { checklistBySlug, CHECKLISTS } from "@/config/checklists";
import { guideBySlug } from "@/config/guides";
import { familyLabel } from "@/config/harm-families";
import { PHOTOS } from "@/config/photos";
import { guideHref } from "@/site/guides";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return CHECKLISTS.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const c = checklistBySlug((await params).slug);
  return c ? { title: c.title, description: c.when } : {};
}

export default async function ChecklistPage({ params }: { params: Params }) {
  const c = checklistBySlug((await params).slug);
  if (!c) notFound();
  const guide = c.guide ? guideBySlug(c.guide) : undefined;
  return (
    <>
      <PageHero
        eyebrow={`Checklist · ${c.minutes} min · ${c.fields.map(familyLabel).join(" · ")}`}
        statement={c.title}
        lead={[c.when]}
        photo={c.photo ? PHOTOS[c.photo] : undefined}
        icon={<FieldIcon field={c.fields[0]} />}
      />
      <div className={`${SHELL} grid gap-12 pt-10 lg:grid-cols-12`}>
        <div className="lg:col-span-8">
          <ChecklistView slug={c.slug} steps={c.steps} />
        </div>
        <aside className="space-y-6 lg:col-span-4">
          {guide && (
            <div className="rounded-card border border-subtle p-5">
              <p className={LABEL}>The why</p>
              <Link href={guideHref(guide)} className="mt-2 flex min-h-11 items-center font-heading text-lg font-semibold text-fg-primary hover:text-accent">
                {guide.title} →
              </Link>
              <p className="mt-2 text-sm leading-relaxed text-fg-secondary">{guide.summary}</p>
            </div>
          )}
          <div className="rounded-card border border-subtle p-5">
            <p className={LABEL}>Want it done properly?</p>
            <p className="mt-2 text-sm leading-relaxed text-fg-secondary">A Safety Plan looks at your whole situation and weighs every step against your limits and budget.</p>
            <Link href="/assessments" className={`${ACTION.secondary} mt-4`}>
              Start an assessment
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
