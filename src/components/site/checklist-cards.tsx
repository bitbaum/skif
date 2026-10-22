import { Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Checklist } from "@/config/checklists";
import { wordsFor } from "@/config/text";
import { checklistWords } from "@/config/text/checklists";
import type { Locale } from "@/i18n/locales";

export function checklistHref(c: Checklist): string {
  return `/act/${c.slug}`;
}

/** Checklists as cards: the situation, how long it takes, how many steps. */
export function ChecklistCards({ checklists, locale }: { checklists: readonly Checklist[]; locale: Locale }) {
  const t = wordsFor(locale).checklist;
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {checklists.map((c) => ({ c, w: checklistWords(c, locale) })).map(({ c, w }) => (
        <li key={c.slug}>
          <Link
            href={checklistHref(c)}
            className="group flex h-full min-h-11 flex-col rounded-card border border-subtle bg-surface-raised p-5 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className="flex items-center gap-2 text-xs text-fg-tertiary">
              <Clock aria-hidden className="size-3.5" />
              {t.meta(c.minutes, c.steps.length)}
            </span>
            <span className="mt-3 font-heading text-lg font-semibold text-fg-primary group-hover:text-accent">{w.title}</span>
            <span className="mt-2 text-sm leading-relaxed text-fg-secondary">{w.when}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
