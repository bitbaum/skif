import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { DISPLAY_LOCALE, TIME_ZONE } from "@/config/locale";

export function PageHeader({ title, lead, children }: { title: string; lead?: ReactNode; children?: ReactNode }) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {lead && <p className="max-w-2xl text-muted">{lead}</p>}
      </div>
      {children}
    </header>
  );
}

export function Card({
  title,
  children,
  className = "",
  id,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`rounded-card border border-line bg-surface p-5 ${className}`}>
      {title && <h2 className="mb-3 text-lg font-semibold">{title}</h2>}
      {children}
    </section>
  );
}

const TONES = {
  neutral: "bg-bg text-muted border-line",
  accent: "bg-accent-soft text-accent border-accent",
  warn: "bg-warn-soft text-warn border-warn",
  danger: "bg-danger-soft text-danger border-danger",
} as const;

export type Tone = keyof typeof TONES;

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={`inline-block rounded-full border px-2 py-0.5 text-sm font-medium ${TONES[tone]}`}>
      {children}
    </span>
  );
}

/** One option of a segmented choice: a 44px label around a visually hidden
 * radio, marked when checked and ringed when focused from the keyboard. */
export const segmentClass =
  "flex min-h-11 cursor-pointer items-center justify-center rounded-lg border border-line bg-surface px-2 py-2 text-center text-sm has-checked:border-accent has-checked:bg-accent-soft has-checked:font-medium has-checked:text-accent has-focus-visible:ring-2 has-focus-visible:ring-accent";

/** Every control is at least 44px tall (min-h-11), the smallest reliable tap target. */
export const buttonClass = {
  primary:
    "inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-ink hover:opacity-90 disabled:opacity-50",
  secondary:
    "inline-flex min-h-11 items-center justify-center rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium hover:bg-bg disabled:opacity-50",
  danger:
    "inline-flex min-h-11 items-center justify-center rounded-lg border border-danger px-4 py-2 text-sm font-medium text-danger hover:bg-danger-soft disabled:opacity-50",
  link: "inline-flex min-h-11 items-center text-sm font-medium text-accent underline-offset-4 hover:underline",
} as const;

export function ButtonLink({ variant = "primary", ...props }: ComponentProps<typeof Link> & { variant?: keyof typeof buttonClass }) {
  return <Link {...props} className={buttonClass[variant]} />;
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="rounded-card border border-dashed border-line p-6 text-center text-muted">{children}</p>;
}

export function DefinitionList({ items }: { items: [string, ReactNode][] }) {
  return (
    // On a phone the label column is capped, so a long label wraps rather
    // than squeezing every value into a narrow column.
    <dl className="grid grid-cols-[minmax(0,7.5rem)_1fr] gap-x-4 gap-y-2 text-sm sm:grid-cols-[max-content_1fr] sm:gap-x-6">
      {items.map(([term, value]) => (
        <div key={term} className="contents">
          <dt className="text-muted">{term}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function formatWhen(date: Date): string {
  return new Intl.DateTimeFormat(DISPLAY_LOCALE, { dateStyle: "medium", timeStyle: "short", timeZone: TIME_ZONE }).format(
    date,
  );
}
