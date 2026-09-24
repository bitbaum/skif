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

export function Card({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-card border border-line bg-surface p-5 ${className}`}>
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
    <span className={`inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${TONES[tone]}`}>
      {children}
    </span>
  );
}

export const buttonClass = {
  primary:
    "inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-ink hover:opacity-90 disabled:opacity-50",
  secondary:
    "inline-flex items-center justify-center rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium hover:bg-bg disabled:opacity-50",
  danger:
    "inline-flex items-center justify-center rounded-lg border border-danger px-4 py-2 text-sm font-medium text-danger hover:bg-danger-soft disabled:opacity-50",
} as const;

export function ButtonLink({ variant = "primary", ...props }: ComponentProps<typeof Link> & { variant?: keyof typeof buttonClass }) {
  return <Link {...props} className={buttonClass[variant]} />;
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="rounded-card border border-dashed border-line p-6 text-center text-muted">{children}</p>;
}

export function DefinitionList({ items }: { items: [string, ReactNode][] }) {
  return (
    <dl className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-sm">
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
