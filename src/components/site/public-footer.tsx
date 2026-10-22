import { Link } from "@/i18n/navigation";
import { EMERGENCY_NUMBERS } from "@/config/emergency";
import { PLACE, siteText } from "@/config/site";
import type { Locale } from "@/i18n/locales";
import { LanguageSwitch } from "./language-switch";
import { LABEL, SHELL } from "./shell";
import { SkifMark } from "./skif-mark";

/** Every public page ends with the emergency numbers: Skif is not an
 * emergency service, and the page says so before anything else. */
export function PublicFooter({ locale }: { locale: Locale }) {
  const { EMERGENCY_PAGE, FOOTER, MENU, HEADER } = siteText(locale);
  const numberLabel = { "117": FOOTER.police, "144": FOOTER.ambulance, "118": FOOTER.fire, "112": FOOTER.european } as Record<string, string>;
  return (
    <footer className="mt-24 border-t border-subtle">
      <div className={`${SHELL} py-12`}>
        <section aria-labelledby="emergency-title" className="mb-12 grid gap-6 border-b border-subtle pb-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="emergency-title" className={LABEL}>
              {FOOTER.emergencyTitle}
            </h2>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-fg-secondary">{FOOTER.notAnEmergencyService}</p>
            <Link
              href={EMERGENCY_PAGE.href}
              className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-danger underline underline-offset-4"
            >
              {FOOTER.abroad}
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:col-span-8">
            {EMERGENCY_NUMBERS.map((e) => (
              <li key={e.number}>
                <a
                  href={`tel:${e.number}`}
                  className="flex min-h-11 flex-col rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span className="font-heading text-3xl font-semibold tabular-nums tracking-display text-fg-primary">{e.number}</span>
                  <span className="text-sm text-fg-secondary">{numberLabel[e.number] ?? e.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="flex items-center gap-2 font-heading text-lg font-semibold tracking-display text-fg-primary">
              <SkifMark className="size-8 text-gold" />
              Skif
            </p>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-fg-secondary">{FOOTER.tagline}</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
            {[...MENU.map((m) => ({ title: m.label, links: m.links })), FOOTER.more].map((col) => (
              <div key={col.title}>
                <h2 className={LABEL}>{col.title}</h2>
                <ul className="mt-2">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} className="inline-flex min-h-11 items-center text-sm text-fg-secondary hover:text-fg-primary">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className={LABEL}>
            {PLACE} · {FOOTER.stage}
          </p>
          <LanguageSwitch label={HEADER.language} />
        </div>
      </div>
    </footer>
  );
}
