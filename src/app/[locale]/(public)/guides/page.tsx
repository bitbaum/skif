import type { Metadata } from "next";
import { shareMetadata } from "@/site/share";
import { GuideBrowser } from "@/components/site/guide-browser";
import { PageHero } from "@/components/site/page-hero";
import { SHELL } from "@/components/site/shell";
import { GUIDES } from "@/config/guides";
import { guideIn } from "@/config/guides/translations";
import { wordsFor } from "@/config/text";
import { HARM_FAMILIES } from "@/config/harm-families";
import { fieldWords } from "@/config/text/fields";
import { pageLocale, type LocaleParams } from "@/i18n/page";

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  return shareMetadata("/guides", await pageLocale(params));
}

export default async function GuidesIndex({ params }: { params: LocaleParams }) {
  const locale = await pageLocale(params);
  const w = wordsFor(locale).guides;
  const cards = GUIDES.map((en) => guideIn(en, locale)).map((g) => ({ slug: g.slug, title: g.title, summary: g.summary, fields: g.fields, fieldLabels: g.fields.map((f) => fieldWords(f, locale).label).join(" · ") }));
  const filters = HARM_FAMILIES.filter((f) => GUIDES.some((g) => g.fields.includes(f.key))).map((f) => ({ key: f.key, label: fieldWords(f.key, locale).short }));
  return (
    <>
      <PageHero
        eyebrow={w.indexEyebrow}
        statement={w.indexStatement}
        lead={[w.indexLead]}
      />
      <div className={SHELL}>
        <GuideBrowser guides={cards} filters={filters} />
      </div>
    </>
  );
}
