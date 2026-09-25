import { HERO } from "@/config/landing";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="section-y-tight">
      <div className="section-shell grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-6 lg:col-span-7">
          <p className="text-sm font-medium text-accent">{HERO.eyebrow}</p>
          <h1 id="hero-title" className="font-display text-hero text-ink">
            {HERO.title}
          </h1>
          <p className="max-w-lede text-lg text-muted">{HERO.lede}</p>
        </div>
        <div className="rounded-card border border-line bg-accent-soft p-6 sm:p-8 lg:col-span-5">
          <p className="font-display text-subsection text-ink">{HERO.question}</p>
          <p className="mt-4 text-sm text-muted">{HERO.questionNote}</p>
        </div>
      </div>
    </section>
  );
}
