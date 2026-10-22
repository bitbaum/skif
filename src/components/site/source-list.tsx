import type { Source } from "@/config/research";
import { wordsFor } from "@/config/text";
import { LOCALE_TAGS, type Locale } from "@/i18n/locales";
import { LABEL } from "./shell";

/** "22 October 2026" in the reader's language; anything unparseable as is. */
function checkedOn(date: string, locale: Locale): string {
  const d = new Date(`${date} 12:00 UTC`);
  return Number.isNaN(d.getTime()) ? date : d.toLocaleDateString(LOCALE_TAGS[locale], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/** The numbered sources behind a research article; [n] in the text is the
 * n-th entry. Each links to what was read, and says when it was checked. */
export function SourceList({ sources, checked, locale }: { sources: readonly Source[]; checked: string; locale: Locale }) {
  const t = wordsFor(locale).sourceList;
  return (
    <section id="sources" aria-labelledby="sources-title" className="scroll-mt-24 border-t border-subtle pt-10">
      <h2 id="sources-title" className="font-heading text-2xl font-semibold tracking-display text-fg-primary">
        {t.title}
      </h2>
      <p className="mt-2 text-sm text-fg-tertiary">{t.checked(checkedOn(checked, locale))}</p>
      <ol className="mt-6 space-y-3">
        {sources.map((s, i) => (
          <li key={s.url} id={`source-${i + 1}`} className="grid grid-cols-[2.5rem_1fr] gap-2 text-sm">
            <span className={`${LABEL} pt-0.5`}>[{i + 1}]</span>
            <span>
              <a href={s.url} rel="noopener noreferrer" className="text-fg-primary underline decoration-subtle underline-offset-4 hover:decoration-accent">
                {s.title}
              </a>
              <span className="text-fg-tertiary">
                {" "}
                — {s.publisher}, {s.year}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
