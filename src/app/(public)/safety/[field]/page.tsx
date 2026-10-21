import type { Metadata } from "next";
import Link from "next/link";
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

type Params = Promise<{ field: string }>;

export function generateStaticParams() {
  return HARM_FAMILIES.map((f) => ({ field: f.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const field = familyBySlug((await params).field);
  return field ? { title: field.label, description: field.headline } : {};
}

function Heading({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="mb-6 font-heading text-2xl font-semibold tracking-display text-fg-primary sm:text-3xl">
      {children}
    </h2>
  );
}

export default async function FieldPage({ params }: { params: Params }) {
  const field = familyBySlug((await params).field);
  if (!field) notFound();
  const i = HARM_FAMILIES.indexOf(field);
  const neighbours = [
    { rel: "Previous field", f: HARM_FAMILIES[(i + HARM_FAMILIES.length - 1) % HARM_FAMILIES.length] },
    { rel: "Next field", f: HARM_FAMILIES[(i + 1) % HARM_FAMILIES.length] },
  ];
  const steps = fieldSteps(field);
  const lists = checklistsFor(field.key);
  const guides = guidesFor(field.key);
  return (
    <>
      <PageHero
        eyebrow={`Field ${fieldNumber(field)} of ${HARM_FAMILIES.length} · ${field.label}`}
        statement={field.headline}
        lead={field.explainer}
        actions={[{ href: "/act#check", label: "Check this for yourself" }]}
        photo={"photo" in field ? PHOTOS[field.photo] : undefined}
        icon={<FieldIcon field={field.key} className="size-6" />}
      />
      <div className={`${SHELL} space-y-20 pt-14`}>
        <section aria-labelledby="concerns">
          <Heading id="concerns">What can go wrong</Heading>
          <ul className="grid gap-x-8 border-t border-subtle sm:grid-cols-2">
            {fieldConcerns(field).map((c) => (
              <li key={c.key} className="border-b border-subtle py-4 text-lg text-fg-primary">
                {c.label}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="steps">
          <Heading id="steps">What helps, least intrusive first</Heading>
          <p className="-mt-3 mb-6 max-w-prose text-fg-secondary">
            Every step a Safety Plan can recommend here. Free steps come first; privacy and freedom costs use the four-point scale explained under{" "}
            <Link href="/method#costs" className="text-accent underline-offset-4 hover:underline">
              How Skif decides
            </Link>
            .
          </p>
          <StepList steps={steps} />
        </section>

        {lists.length > 0 && (
          <section aria-labelledby="act">
            <Heading id="act">Act on it</Heading>
            <ChecklistCards checklists={lists} />
          </section>
        )}

        {guides.length > 0 && (
          <section aria-labelledby="read">
            <Heading id="read">Read deeper</Heading>
            <GuideList guides={guides} />
          </section>
        )}

        <nav aria-label="Other fields" className="grid gap-3 sm:grid-cols-2">
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
                <span className="font-heading text-lg font-semibold text-fg-primary group-hover:text-accent">{f.label}</span>
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
