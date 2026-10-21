import Link from "next/link";
import { EMERGENCY_NUMBERS, NOT_AN_EMERGENCY_SERVICE } from "@/config/emergency";
import { FOOTER, PLACE } from "@/config/site";
import { LABEL, SHELL } from "./shell";
import { SkifMark } from "./skif-mark";

/** Every public page ends with the emergency numbers: Skif is not an
 * emergency service, and the page says so before anything else. */
export function PublicFooter() {
  return (
    <footer className="mt-24 border-t border-subtle">
      <div className={`${SHELL} py-12`}>
        <section aria-labelledby="emergency-title" className="mb-12 grid gap-6 border-b border-subtle pb-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="emergency-title" className={LABEL}>
              In an emergency
            </h2>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-fg-secondary">{NOT_AN_EMERGENCY_SERVICE}</p>
          </div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:col-span-8">
            {EMERGENCY_NUMBERS.map((e) => (
              <li key={e.number}>
                <a
                  href={`tel:${e.number}`}
                  className="flex min-h-11 flex-col rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span className="font-heading text-3xl font-semibold tabular-nums tracking-display text-fg-primary">{e.number}</span>
                  <span className="text-sm text-fg-secondary">{e.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="flex items-center gap-2 font-heading text-lg font-semibold tracking-display text-fg-primary">
              <SkifMark className="size-8" />
              Skif
            </p>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-fg-secondary">{FOOTER.tagline}</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {FOOTER.columns.map((col) => (
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
        <p className={`${LABEL} mt-10 border-t border-subtle pt-6`}>
          {PLACE} · {FOOTER.stage}
        </p>
      </div>
    </footer>
  );
}
