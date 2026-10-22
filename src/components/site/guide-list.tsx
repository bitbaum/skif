import { Link } from "@/i18n/navigation";
import type { Guide } from "@/config/guides";
import { fieldWords } from "@/config/text/fields";
import type { Locale } from "@/i18n/locales";
import { guideHref } from "@/site/guides";
import { LABEL } from "./shell";

/** Guides as a ruled list: what it covers, which fields, one line of why. */
export function GuideList({ guides, locale }: { guides: readonly Guide[]; locale: Locale }) {
  return (
    <ul className="grid border-t border-subtle md:grid-cols-2 md:gap-x-10">
      {guides.map((g) => (
        <li key={g.slug} className="border-b border-subtle">
          <Link
            href={guideHref(g)}
            className="group flex h-full min-h-11 flex-col gap-2 py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className={LABEL}>{g.fields.map((f) => fieldWords(f, locale).label).join(" · ")}</span>
            <span className="font-heading text-xl font-semibold tracking-display text-fg-primary group-hover:text-accent">
              {g.title}
              <span aria-hidden>{" "}→</span>
            </span>
            <span className="text-sm leading-relaxed text-fg-secondary">{g.summary}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
