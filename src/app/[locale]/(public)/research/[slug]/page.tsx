import type { Metadata } from "next";
import { shareMetadata } from "@/site/share";
import { notFound } from "next/navigation";
import { SiteSectionsView } from "@/components/site/site-sections";
import { SourceList } from "@/components/site/source-list";
import { PHOTOS } from "@/config/photos";
import { RESEARCH, researchBySlug } from "@/config/research";
import { researchIn } from "@/config/research/translations";
import { researchPage } from "@/site/research";
import { pageLocale } from "@/i18n/page";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return RESEARCH.map((r) => ({ slug: r.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  return shareMetadata(`/research/${(await params).slug}`, await pageLocale(params));
}

export default async function ResearchPage({ params }: { params: Params }) {
  const locale = await pageLocale(params);
  const found = researchBySlug((await params).slug);
  if (!found) notFound();
  const r = researchIn(found, locale);
  return (
    <SiteSectionsView sections={researchPage(r, locale).sections} photo={r.photo ? PHOTOS[r.photo] : undefined}>
      <SourceList sources={r.sources} checked={r.checked} locale={locale} />
    </SiteSectionsView>
  );
}
