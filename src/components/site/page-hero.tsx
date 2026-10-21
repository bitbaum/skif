import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Photo } from "@/config/photos";
import { ACTION, LABEL, SHELL } from "./shell";

type Action = { href: string; label: string };

/**
 * How every public page opens. With a photograph it is a full-bleed band —
 * the picture carries the mood, a dark gradient keeps the words readable in
 * both themes. Without one it is a quiet text opening, optionally led by the
 * field's icon. sitekit's hero is deliberately image-free; Skif's opening is
 * where its pictures live, so it is drawn here from the same hero data.
 */
export function PageHero({
  eyebrow,
  statement,
  lead,
  actions = [],
  photo,
  icon,
  as = "h1",
}: {
  eyebrow?: string;
  statement: string;
  lead: readonly string[];
  actions?: readonly Action[];
  photo?: Photo;
  icon?: ReactNode;
  as?: "h1" | "h2";
}) {
  const Heading = as;
  const buttons = actions.length > 0 && (
    <div className="mt-8 flex flex-wrap gap-3">
      {actions.map((a, i) =>
        photo ? (
          <Link
            key={a.href}
            href={a.href}
            className={
              i === 0
                ? "inline-flex min-h-11 items-center rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                : "inline-flex min-h-11 items-center rounded-full border-2 border-white/60 px-6 text-sm font-medium text-white hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            }
          >
            {a.label}
          </Link>
        ) : (
          <Link key={a.href} href={a.href} className={i === 0 ? ACTION.primary : ACTION.secondary}>
            {a.label}
          </Link>
        ),
      )}
    </div>
  );

  if (photo) {
    return (
      <section className="relative isolate flex min-h-[34rem] items-end overflow-hidden bg-black sm:min-h-[38rem]">
        <Image src={photo.src} alt={photo.alt} fill priority sizes="100vw" className="-z-10 object-cover opacity-80" style={{ objectPosition: photo.focus ?? "center" }} />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/55 to-black/10" />
        <div className={`${SHELL} pt-32 pb-12 sm:pb-16`}>
          {eyebrow && <p className="font-mono text-xs uppercase tracking-caps text-white/75">{eyebrow}</p>}
          <Heading className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-[1.05] tracking-display text-white sm:text-6xl">
            {statement}
          </Heading>
          <div className="mt-6 max-w-2xl space-y-4">
            {lead.map((p) => (
              <p key={p} className="text-lg leading-relaxed text-white/85">
                {p}
              </p>
            ))}
          </div>
          {buttons}
        </div>
      </section>
    );
  }

  return (
    <section className={`${SHELL} pt-12 pb-10 sm:pt-16`}>
      <div className="flex items-center gap-3">
        {icon && <span className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent">{icon}</span>}
        {eyebrow && <p className={LABEL}>{eyebrow}</p>}
      </div>
      <Heading className="mt-5 max-w-4xl font-heading text-4xl font-semibold leading-[1.05] tracking-display text-fg-primary sm:text-6xl">
        {statement}
      </Heading>
      <div className="mt-6 max-w-2xl space-y-4">
        {lead.map((p) => (
          <p key={p} className="text-lg leading-relaxed text-fg-secondary">
            {p}
          </p>
        ))}
      </div>
      {buttons}
    </section>
  );
}
