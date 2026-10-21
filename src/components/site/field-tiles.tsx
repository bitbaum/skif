import Link from "next/link";
import { HARM_FAMILIES } from "@/config/harm-families";
import { fieldHref, fieldNumber } from "@/site/fields";
import { FieldIcon } from "./field-icon";

/** The ten fields as tiles: icon, name, one line. Two across on a phone,
 * five across on a wide screen — every field named, at every width. */
export function FieldTiles() {
  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      {HARM_FAMILIES.map((f) => (
        <li key={f.key}>
          <Link
            href={fieldHref(f)}
            className="group flex h-full min-h-11 flex-col rounded-card border border-subtle bg-surface-raised p-4 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-5"
          >
            <span className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-lg bg-accent-soft text-accent">
                <FieldIcon field={f.key} />
              </span>
              <span className="font-mono text-xs tabular-nums text-fg-tertiary">{fieldNumber(f)}</span>
            </span>
            <span className="mt-4 font-heading font-semibold text-fg-primary group-hover:text-accent">{f.short}</span>
            <span className="mt-1 text-sm leading-snug text-fg-secondary">{f.description}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
