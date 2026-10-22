import type { Metadata } from "next";
import { shareMetadata } from "@/site/share";
import { notFound } from "next/navigation";
import { SiteSectionsView } from "@/components/site/site-sections";
import { SourceList } from "@/components/site/source-list";
import { guideBySlug, GUIDES } from "@/config/guides";
import { guideIn } from "@/config/guides/translations";
import { PHOTOS } from "@/config/photos";
import { guidePage } from "@/site/guides";
import { pageLocale } from "@/i18n/page";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  return shareMetadata(`/guides/${(await params).slug}`, await pageLocale(params));
}

export default async function GuidePage({ params }: { params: Params }) {
  const locale = await pageLocale(params);
  const found = guideBySlug((await params).slug);
  if (!found) notFound();
  const guide = guideIn(found, locale);
  return (
    <SiteSectionsView sections={guidePage(guide, locale).sections} photo={guide.photo ? PHOTOS[guide.photo] : undefined}>
      {guide.sources && guide.checked ? <SourceList sources={guide.sources} checked={guide.checked} locale={locale} /> : null}
    </SiteSectionsView>
  );
}
