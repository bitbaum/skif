import type { Metadata } from "next";
import { EmergencyPanel } from "@/components/site/emergency-panel";
import { LABEL, SHELL } from "@/components/site/shell";
import { siteText } from "@/config/site";
import { shareMetadata } from "@/site/share";
import { pageLocale, type LocaleParams } from "@/i18n/page";

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  return shareMetadata("/emergency", await pageLocale(params));
}

export default async function EmergencyPage({ params }: { params: LocaleParams }) {
  const locale = await pageLocale(params);
  const { EMERGENCY_PAGE } = siteText(locale);
  return (
    <div className={`${SHELL} max-w-4xl space-y-8 py-10 sm:py-14`}>
      <header className="space-y-3">
        <p className={LABEL}>{EMERGENCY_PAGE.eyebrow}</p>
        <h1 className="font-heading text-4xl font-semibold tracking-display text-fg-primary sm:text-5xl">{EMERGENCY_PAGE.statement}</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-fg-secondary">{EMERGENCY_PAGE.lead}</p>
      </header>
      <EmergencyPanel locale={locale} />
    </div>
  );
}
