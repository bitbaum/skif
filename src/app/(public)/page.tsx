import Link from "next/link";
import { FieldIndex } from "@/components/site/field-index";
import { GuideList } from "@/components/site/guide-list";
import { Doors, FreedomBand, MethodTeaser, PeopleTeaser } from "@/components/site/home-sections";
import { QuickCheck } from "@/components/site/quick-check";
import { SafetyMap } from "@/components/site/safety-map";
import { SectionIntro } from "@/components/site/section-intro";
import { ACTION, LABEL, SHELL } from "@/components/site/shell";
import { GUIDES } from "@/config/guides";
import { FIELDS_SECTION, GUIDES_SECTION, HOME, QUICK_CHECK } from "@/config/site";

// Words live in src/config/site.ts; the fields render from harm-families.ts.
export default function Home() {
  return (
    <>
      <section aria-labelledby="hero-title" className={`${SHELL} grid items-center gap-12 pt-14 pb-20 sm:pt-20 lg:grid-cols-12`}>
        <div className="lg:col-span-7">
          <p className={LABEL}>{HOME.eyebrow}</p>
          <h1
            id="hero-title"
            className="mt-5 font-heading text-5xl font-semibold leading-[1.02] tracking-display text-fg-primary sm:text-6xl lg:text-7xl"
          >
            {HOME.statement}
          </h1>
          <p className="mt-7 max-w-prose text-lg leading-relaxed text-fg-secondary">{HOME.lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            {HOME.actions.map((a, i) => (
              <Link key={a.href} href={a.href} className={i === 0 ? ACTION.primary : ACTION.secondary}>
                {a.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <SafetyMap caption={HOME.mapCaption} />
        </div>
      </section>

      <section id="check" aria-labelledby="check-title" className="scroll-mt-20 border-y border-subtle bg-surface-raised">
        <div className={`${SHELL} py-20`}>
          <SectionIntro id="check-title" eyebrow={QUICK_CHECK.eyebrow} title={QUICK_CHECK.title} lede={QUICK_CHECK.lede} />
          <QuickCheck />
        </div>
      </section>

      <section aria-labelledby="fields-title" className={`${SHELL} py-20`}>
        <SectionIntro id="fields-title" eyebrow={FIELDS_SECTION.eyebrow} title={FIELDS_SECTION.title} lede={FIELDS_SECTION.lede} />
        <FieldIndex />
      </section>

      <FreedomBand />

      <section aria-labelledby="guides-title" className={`${SHELL} py-20`}>
        <SectionIntro id="guides-title" eyebrow={GUIDES_SECTION.eyebrow} title={GUIDES_SECTION.title} lede={GUIDES_SECTION.lede} />
        <GuideList guides={GUIDES.slice(0, GUIDES_SECTION.onHome)} />
        <Link href={GUIDES_SECTION.all.href} className={`${ACTION.secondary} mt-8`}>
          {GUIDES_SECTION.all.label}
        </Link>
      </section>

      <MethodTeaser />
      <Doors />
      <div className="border-t border-subtle">
        <PeopleTeaser />
      </div>
    </>
  );
}
