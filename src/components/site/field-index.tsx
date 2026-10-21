import Link from "next/link";
import { HARM_FAMILIES } from "@/config/harm-families";
import { fieldHref, fieldNumber } from "@/site/fields";

/** The ten fields as a numbered, ruled index; each row opens its page. */
export function FieldIndex() {
  return (
    <ol className="grid border-t border-subtle sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-5">
      {HARM_FAMILIES.map((f) => (
        <li key={f.key} className="border-b border-subtle">
          <Link
            href={fieldHref(f)}
            className="group flex h-full min-h-11 flex-col gap-2 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:pr-4"
          >
            <span className="font-mono text-xs tabular-nums text-fg-muted">{fieldNumber(f)}</span>
            <span className="font-heading font-semibold text-fg-primary group-hover:text-accent">
              {f.label}
              <span aria-hidden>{"\u00a0"}→</span>
            </span>
            <span className="text-sm leading-relaxed text-fg-secondary">{f.description}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
