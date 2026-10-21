import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SitePageView } from "@/components/site/site-page";
import { LABEL } from "@/components/site/shell";
import { familyBySlug, HARM_FAMILIES } from "@/config/harm-families";
import { fieldHref, fieldNumber, fieldPage } from "@/site/fields";

type Params = Promise<{ field: string }>;

export function generateStaticParams() {
  return HARM_FAMILIES.map((f) => ({ field: f.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const field = familyBySlug((await params).field);
  return field ? { title: field.label, description: field.headline } : {};
}

export default async function FieldPage({ params }: { params: Params }) {
  const field = familyBySlug((await params).field);
  if (!field) notFound();
  const i = HARM_FAMILIES.indexOf(field);
  const neighbours = [
    { rel: "Previous field", f: HARM_FAMILIES[(i + HARM_FAMILIES.length - 1) % HARM_FAMILIES.length] },
    { rel: "Next field", f: HARM_FAMILIES[(i + 1) % HARM_FAMILIES.length] },
  ];
  return (
    <SitePageView page={fieldPage(field)}>
      <nav aria-label="Other fields" className="mt-20 grid gap-px overflow-hidden rounded-card border border-subtle bg-subtle sm:grid-cols-2">
        {neighbours.map(({ rel, f }) => (
          <Link
            key={rel}
            href={fieldHref(f)}
            className="group flex min-h-11 flex-col gap-1 bg-surface-page p-6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
          >
            <span className={LABEL}>{rel}</span>
            <span className="font-heading text-lg font-semibold text-fg-primary group-hover:text-accent">
              {fieldNumber(f)} · {f.label}
            </span>
          </Link>
        ))}
      </nav>
    </SitePageView>
  );
}
