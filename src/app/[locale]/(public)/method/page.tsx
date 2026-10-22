import type { Metadata } from "next";
import { shareMetadata } from "@/site/share";
import { Scale } from "lucide-react";
import { SiteSectionsView } from "@/components/site/site-sections";
import { pageIn } from "@/site/pages";
import { pageLocale, type LocaleParams } from "@/i18n/page";

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  return shareMetadata("/method", await pageLocale(params));
}

export default async function MethodPage({ params }: { params: LocaleParams }) {
  const locale = await pageLocale(params);
  return <SiteSectionsView sections={pageIn("method", locale).sections} icon={<Scale aria-hidden className="size-6" strokeWidth={1.75} />} />;
}
