import { LABEL } from "./shell";

/** Eyebrow, heading and standfirst for a home-page section, in the same
 * type as sitekit's section headings. */
export function SectionIntro({ id, eyebrow, title, lede }: { id: string; eyebrow: string; title: string; lede?: string }) {
  return (
    <header className="mb-10 max-w-3xl">
      <p className={LABEL}>{eyebrow}</p>
      <h2 id={id} className="mt-3 font-heading text-3xl font-semibold tracking-display text-fg-primary sm:text-4xl">
        {title}
      </h2>
      {lede && <p className="mt-4 max-w-prose text-lg leading-relaxed text-fg-secondary">{lede}</p>}
    </header>
  );
}
