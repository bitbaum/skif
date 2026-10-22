import { Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Checklist } from "@/config/checklists";

export function checklistHref(c: Checklist): string {
  return `/act/${c.slug}`;
}

/** Checklists as cards: the situation, how long it takes, how many steps. */
export function ChecklistCards({ checklists }: { checklists: readonly Checklist[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {checklists.map((c) => (
        <li key={c.slug}>
          <Link
            href={checklistHref(c)}
            className="group flex h-full min-h-11 flex-col rounded-card border border-subtle bg-surface-raised p-5 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className="flex items-center gap-2 text-xs text-fg-tertiary">
              <Clock aria-hidden className="size-3.5" />
              {c.minutes} min · {c.steps.length} steps
            </span>
            <span className="mt-3 font-heading text-lg font-semibold text-fg-primary group-hover:text-accent">{c.title}</span>
            <span className="mt-2 text-sm leading-relaxed text-fg-secondary">{c.when}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
