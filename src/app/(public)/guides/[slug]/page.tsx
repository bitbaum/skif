import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePageView } from "@/components/site/site-page";
import { guideBySlug, GUIDES } from "@/config/guides";
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
  return <SitePageView page={guidePage(guide)} />;
}
