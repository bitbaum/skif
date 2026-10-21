import Link from "next/link";
import { buttonClass } from "@/components/ui";
import { DOORS, DOORS_SECTION, FREEDOM, LOOP, METHOD_TEASER, PEOPLE_TEASER } from "@/config/site";
import { SectionIntro } from "./section-intro";
import { ACTION, LABEL, SHELL } from "./shell";

export function Doors() {
  return (
    <section aria-labelledby="doors-title" className={`${SHELL} py-20`}>
      <SectionIntro id="doors-title" eyebrow={DOORS_SECTION.eyebrow} title={DOORS_SECTION.title} />
      <ul className="grid gap-px overflow-hidden rounded-card border border-subtle bg-subtle md:grid-cols-3">
        {DOORS.map((d) => (
          <li key={d.key} className="flex flex-col bg-surface-page p-6 sm:p-8">
            <span className={LABEL}>{d.index}</span>
            <h3 className="mt-4 font-heading text-2xl font-semibold tracking-display text-fg-primary">{d.title}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-fg-secondary">{d.body}</p>
            <Link href={d.cta.href} className={`${ACTION.secondary} mt-8 self-start`}>
              {d.cta.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function MethodTeaser() {
  return (
    <section aria-labelledby="method-title" className="border-y border-subtle bg-surface-raised">
      <div className={`${SHELL} py-20`}>
        <SectionIntro id="method-title" eyebrow={METHOD_TEASER.eyebrow} title={METHOD_TEASER.title} />
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {LOOP.map((s, i) => (
            <li key={s.title} className="border-t border-strong pt-4">
              <span className="font-mono text-xs tabular-nums text-fg-muted">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-heading text-lg font-semibold text-fg-primary">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-secondary">{s.body}</p>
            </li>
          ))}
        </ol>
        <figure className="mt-16 max-w-3xl">
          <blockquote className="font-heading text-3xl font-semibold tracking-display text-fg-primary sm:text-4xl">
            “{METHOD_TEASER.quote}”
          </blockquote>
          <figcaption className="mt-4 max-w-prose text-lg leading-relaxed text-fg-secondary">{METHOD_TEASER.quoteNote}</figcaption>
        </figure>
        <Link href={METHOD_TEASER.cta.href} className={`${buttonClass.link} mt-6`}>
          {METHOD_TEASER.cta.label} →
        </Link>
      </div>
    </section>
  );
}

export function PeopleTeaser() {
  return (
    <section aria-labelledby="people-title" className={`${SHELL} grid gap-8 py-20 lg:grid-cols-12`}>
      <div className="lg:col-span-7">
        <SectionIntro id="people-title" eyebrow={PEOPLE_TEASER.eyebrow} title={PEOPLE_TEASER.title} lede={PEOPLE_TEASER.body} />
      </div>
      <div className="flex flex-wrap items-end gap-3 lg:col-span-5 lg:justify-end">
        {PEOPLE_TEASER.actions.map((a, i) => (
          <Link key={a.href} href={a.href} className={i === 0 ? ACTION.primary : ACTION.secondary}>
            {a.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function FreedomBand() {
  return (
    <section aria-labelledby="freedom-title" className="border-y border-subtle bg-surface-raised">
      <div className={`${SHELL} grid gap-8 py-20 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <p className={LABEL}>{FREEDOM.eyebrow}</p>
          <h2 id="freedom-title" className="mt-3 font-heading text-4xl font-semibold leading-tight tracking-display text-fg-primary sm:text-5xl">
            {FREEDOM.title}
          </h2>
        </div>
        <p className="max-w-prose text-lg leading-relaxed text-fg-secondary lg:col-span-6 lg:col-start-7 lg:self-end">{FREEDOM.body}</p>
      </div>
    </section>
  );
}
