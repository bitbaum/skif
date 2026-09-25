import { HERO } from "@/config/landing";
import { Illustration } from "./illustration";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="section-y-tight">
      <div className="section-shell grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-6 lg:col-span-6">
          <p className="text-sm font-medium text-accent">{HERO.eyebrow}</p>
          <h1 id="hero-title" className="font-display text-hero text-ink">
            {HERO.title}
          </h1>
          <p className="max-w-lede text-lg text-muted">{HERO.lede}</p>
          <div className="rounded-card border border-line bg-accent-soft p-5 sm:p-6">
            <p className="font-display text-subsection text-ink">{HERO.question}</p>
            <p className="mt-3 text-sm text-muted">{HERO.questionNote}</p>
          </div>
        </div>
        <Illustration
          art={HERO.art}
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="rounded-card border border-line lg:col-span-6"
        />
      </div>
    </section>
  );
}
