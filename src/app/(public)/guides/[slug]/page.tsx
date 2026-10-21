import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteSectionsView } from "@/components/site/site-sections";
import { SourceList } from "@/components/site/source-list";
import { guideBySlug, GUIDES } from "@/config/guides";
import { PHOTOS } from "@/config/photos";
import { guidePage } from "@/site/guides";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const guide = guideBySlug((await params).slug);
  return guide ? { title: guide.title, description: guide.summary } : {};
}

export default async function GuidePage({ params }: { params: Params }) {
  const guide = guideBySlug((await params).slug);
  if (!guide) notFound();
  return (
    <SiteSectionsView sections={guidePage(guide).sections} photo={guide.photo ? PHOTOS[guide.photo] : undefined}>
      {guide.sources && guide.checked ? <SourceList sources={guide.sources} checked={guide.checked} /> : null}
    </SiteSectionsView>
  );
}
