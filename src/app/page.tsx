import { FeedbackWidget } from "@/components/feedback-widget";
import { buttonClass } from "@/components/ui";
import Link from "next/link";

const PRINCIPLES = [
  {
    title: "Your limits first",
    body: "Say what you value and what you won't accept — no facial recognition, no cameras inside, no cloud video, no automatic police sharing. Those are hard limits, never traded away.",
  },
  {
    title: "The most proportionate answer",
    body: "Every recommendation is the least intrusive thing that works, with its trade-offs shown. Often the honest answer is: you don't need to buy anything.",
  },
  {
    title: "Calm people, not bouncers",
    body: "Protectors are chosen for judgment and calm, not size. When we match someone to you, we show why.",
  },
  {
    title: "Only what the job needs",
    body: "A Protector sees where to meet you once they've accepted, never who you are beyond that. Your data stays in our own database, on a server we run ourselves in Germany (rented from Hetzner, Falkenstein) — never with a camera or alarm vendor.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="mb-2 text-sm font-medium text-accent">Zürich</p>
      <h1 className="mb-4 text-4xl font-semibold tracking-tight">Skif</h1>
      <p className="mb-8 max-w-2xl text-lg text-muted">
        Holistic safety for people and the places they live — without trading away privacy or freedom.
        Book a calm, qualified person for a night out or the way home, or get an honest safety plan for your home.
      </p>
      <div className="mb-16 flex flex-wrap gap-3">
        <Link href="/signin" className={buttonClass.primary}>
          Sign in
        </Link>
        <Link href="/protector" className={buttonClass.secondary}>
          Become a Protector
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {PRINCIPLES.map((p) => (
          <section key={p.title} className="rounded-card border border-line bg-surface p-5">
            <h2 className="mb-2 font-semibold">{p.title}</h2>
            <p className="text-sm text-muted">{p.body}</p>
          </section>
        ))}
      </div>
      {/* The fleet's feedback widget runs on this public page only — never on
          pages that show preferences, bookings or incidents. */}
      <FeedbackWidget />
    </main>
  );
}
