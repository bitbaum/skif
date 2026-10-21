import type { SiteSection } from "@bitbaum/sitekit";
import {
  CardsSection,
  DefinitionsSection,
  FaqSection,
  FeatureSection,
  IndexSection,
  MeterSection,
  ProseSection,
  StatsSection,
} from "@bitbaum/sitekit/react";
import type { ReactNode } from "react";
import type { Photo } from "@/config/photos";
import { PageHero } from "./page-hero";
import { ResponsiveTable } from "./responsive-table";
import { SHELL } from "./shell";

/** sitekit numbers a section only when it shows a heading (and tables never). */
function isNumbered(s: SiteSection): boolean {
  return s.kind !== "hero" && s.kind !== "table" && s.kind !== "contact" && Boolean(s.heading);
}

/**
 * A public content page: sitekit section data, drawn with sitekit's own
 * renderers — except the opening (PageHero, which can carry a photograph) and
 * tables (ResponsiveTable, which survives a phone). Contact sections are not
 * used on Skif's site.
 */
export function SiteSectionsView({
  sections,
  photo,
  icon,
  children,
}: {
  sections: readonly SiteSection[];
  photo?: Photo;
  icon?: ReactNode;
  children?: ReactNode;
}) {
  let n = 0;
  const [first, ...body] = sections;
  const hero = first?.kind === "hero" ? first : null;
  return (
    <>
      {hero && (
        <PageHero eyebrow={hero.eyebrow} statement={hero.statement} lead={hero.lead} actions={hero.actions} photo={photo} icon={icon} />
      )}
      <div className={`${SHELL} space-y-16 ${hero ? (photo ? "pt-14" : "pt-4") : "pt-14"}`}>
        {(hero ? body : sections).map((s, key) => {
          const index = isNumbered(s) ? ++n : undefined;
          switch (s.kind) {
            case "prose":
              return <ProseSection key={key} section={s} index={index} />;
            case "cards":
              return <CardsSection key={key} section={s} index={index} />;
            case "definitions":
              return <DefinitionsSection key={key} section={s} index={index} />;
            case "faq":
              return <FaqSection key={key} section={s} index={index} />;
            case "feature":
              return <FeatureSection key={key} section={s} index={index} />;
            case "index":
              return <IndexSection key={key} section={s} index={index} />;
            case "stats":
              return <StatsSection key={key} section={s} index={index} />;
            case "meter":
              return <MeterSection key={key} section={s} index={index} />;
            case "table":
              return <ResponsiveTable key={key} section={s} />;
            default:
              return null;
          }
        })}
        {children}
      </div>
    </>
  );
}
