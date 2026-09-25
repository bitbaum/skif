export function SectionHeading({ id, eyebrow, title, lede }: { id: string; eyebrow?: string; title: string; lede?: string }) {
  return (
    <header className="mb-10 max-w-copy space-y-3 sm:mb-12">
      {eyebrow && <p className="text-sm font-medium text-accent">{eyebrow}</p>}
      <h2 id={id} className="font-display text-section text-ink">
        {title}
      </h2>
      {lede && <p className="max-w-lede text-lg text-muted">{lede}</p>}
    </header>
  );
}
