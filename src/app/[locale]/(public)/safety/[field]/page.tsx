import type { Metadata } from "next";
import { shareMetadata } from "@/site/share";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { ChecklistCards } from "@/components/site/checklist-cards";
import { FieldIcon } from "@/components/site/field-icon";
import { GuideList } from "@/components/site/guide-list";
import { PageHero } from "@/components/site/page-hero";
import { LABEL, SHELL } from "@/components/site/shell";
import { StepList } from "@/components/site/step-list";
import { checklistsFor } from "@/config/checklists";
import { guidesFor } from "@/config/guides";
import { familyBySlug, HARM_FAMILIES } from "@/config/harm-families";
import { PHOTOS } from "@/config/photos";
import { fieldConcerns, fieldHref, fieldNumber, fieldSteps } from "@/site/fields";
import { pageLocale } from "@/i18n/page";
import { fieldWords } from "@/config/text/fields";
import { concernText } from "@/config/text/assessment";
import { wordsFor } from "@/config/text";

type Params = Promise<{ locale: string; field: string }>;

export function generateStaticParams() {
  return HARM_FAMILIES.map((f) => ({ field: f.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  return shareMetadata(`/safety/${(await params).field}`, await pageLocale(params));
}

function Heading({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="mb-6 font-heading text-2xl font-semibold tracking-display text-fg-primary sm:text-3xl">
      {children}
    </h2>
  );
}

export default async function FieldPage({ params }: { params: Params }) {
  const locale = await pageLocale(params);
  const field = familyBySlug((await params).field);
  if (!field) notFound();
  const t = wordsFor(locale).fieldPage;
  const words = fieldWords(field.key, locale);
  const i = HARM_FAMILIES.indexOf(field);
  const neighbours = [
    { rel: t.previous, f: HARM_FAMILIES[(i + HARM_FAMILIES.length - 1) % HARM_FAMILIES.length] },
    { rel: t.next, f: HARM_FAMILIES[(i + 1) % HARM_FAMILIES.length] },
  ];
  const steps = fieldSteps(field);
  const lists = checklistsFor(field.key);
  const guides = guidesFor(field.key);
  return (
    <>
      <PageHero
        eyebrow={t.eyebrow(fieldNumber(field), HARM_FAMILIES.length, words.label)}
        statement={words.headline}
        lead={words.explainer}
        actions={[{ href: "/act#check", label: t.check }]}
        photo={"photo" in field ? PHOTOS[field.photo] : undefined}
        icon={<FieldIcon field={field.key} className="size-6" />}
      />
      <div className={`${SHELL} space-y-20 pt-14`}>
        <section aria-labelledby="concerns">
          <Heading id="concerns">{t.concerns}</Heading>
          <ul className="grid gap-x-8 border-t border-subtle sm:grid-cols-2">
            {fieldConcerns(field).map((c) => (
              <li key={c.key} className="border-b border-subtle py-4 text-lg text-fg-primary">
                {concernText(c.key, locale)}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="steps">
          <Heading id="steps">{t.steps}</Heading>
          <p className="-mt-3 mb-6 max-w-prose text-fg-secondary">
            {t.stepsLead}{" "}
            <Link href="/method#costs" className="text-accent underline-offset-4 hover:underline">
              {t.method}
            </Link>
            .
          </p>
          <StepList steps={steps} locale={locale} />
        </section>

        {lists.length > 0 && (
          <section aria-labelledby="act">
            <Heading id="act">{t.act}</Heading>
            <ChecklistCards checklists={lists} locale={locale} />
          </section>
        )}

        {guides.length > 0 && (
          <section aria-labelledby="read">
            <Heading id="read">{t.read}</Heading>
            <GuideList guides={guides} locale={locale} />
          </section>
        )}

        <nav aria-label={t.others} className="grid gap-3 sm:grid-cols-2">
          {neighbours.map(({ rel, f }) => (
            <Link
              key={rel}
              href={fieldHref(f)}
              className="group flex min-h-11 items-center gap-4 rounded-card border border-subtle p-5 hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <FieldIcon field={f.key} />
              </span>
              <span>
                <span className={`${LABEL} block`}>{rel}</span>
                <span className="font-heading text-lg font-semibold text-fg-primary group-hover:text-accent">{fieldWords(f.key, locale).label}</span>
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
