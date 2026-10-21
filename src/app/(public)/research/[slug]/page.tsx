import type { Metadata } from "next";
import { shareMetadata } from "@/site/share";
import { notFound } from "next/navigation";
import { SiteSectionsView } from "@/components/site/site-sections";
import { SourceList } from "@/components/site/source-list";
import { PHOTOS } from "@/config/photos";
import { RESEARCH, researchBySlug } from "@/config/research";
import { researchPage } from "@/site/research";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return RESEARCH.map((r) => ({ slug: r.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  return shareMetadata(`/research/${(await params).slug}`);
}

export default async function ResearchPage({ params }: { params: Params }) {
  const r = researchBySlug((await params).slug);
  if (!r) notFound();
  return (
    <SiteSectionsView sections={researchPage(r).sections} photo={r.photo ? PHOTOS[r.photo] : undefined}>
      <SourceList sources={r.sources} checked={r.checked} />
    </SiteSectionsView>
  );
}
