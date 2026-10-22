import type { Metadata } from "next";
import { shareMetadata } from "@/site/share";
import { Link } from "@/i18n/navigation";
import { AcademyBrowser } from "@/components/site/academy-browser";
import { PageHero } from "@/components/site/page-hero";
import { ACTION, PANEL, SHELL } from "@/components/site/shell";
import { COURSES } from "@/config/academy";
import { PHOTOS } from "@/config/photos";
import { partnerMailto, siteText } from "@/config/site";
import { pageLocale, type LocaleParams } from "@/i18n/page";

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  return shareMetadata("/academy", await pageLocale(params));
}

export default async function AcademyPage({ params }: { params: LocaleParams }) {
  const locale = await pageLocale(params);
  const { ACADEMY_HERO } = siteText(locale);
  return (
    <>
      <PageHero
        eyebrow={ACADEMY_HERO.eyebrow(COURSES.length)}
        statement={ACADEMY_HERO.statement}
        lead={[
          ACADEMY_HERO.lead,
          ACADEMY_HERO.notYet,
        ]}
        actions={[
          { href: partnerMailto("teaching with the Academy"), label: ACADEMY_HERO.teach },
          { href: "/join", label: ACADEMY_HERO.become },
        ]}
        photo={PHOTOS.grappling}
      />
      <div className={`${SHELL} space-y-20 pt-14`}>
        <AcademyBrowser locale={locale} />
        <section aria-labelledby="capability-title" className={`grid gap-6 ${PANEL} p-6 sm:p-8 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <h2 id="capability-title" className="font-heading text-2xl font-semibold tracking-display text-fg-primary">
              {ACADEMY_HERO.capabilityTitle}
            </h2>
          </div>
          <div className="space-y-4 leading-relaxed text-fg-secondary lg:col-span-7">
            {ACADEMY_HERO.capabilityBody.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <Link href="/protectors" className={ACTION.secondary}>
              {ACADEMY_HERO.aboutProtectors}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
