import type { Metadata } from "next";
import Link from "next/link";
import { AcademyBrowser } from "@/components/site/academy-browser";
import { PageHero } from "@/components/site/page-hero";
import { ACTION, SHELL } from "@/components/site/shell";
import { COURSES } from "@/config/academy";
import { PHOTOS } from "@/config/photos";
import { partnerMailto } from "@/config/site";

export const metadata: Metadata = {
  title: "Academy",
  description: "First aid, de-escalation, parkour, combat sports, weapons and the law, driving and digital security. What Protectors learn, open to anyone.",
};

export default function AcademyPage() {
  return (
    <>
      <PageHero
        eyebrow={`Academy · ${COURSES.length} courses planned`}
        statement="Learn what Protectors learn."
        lead={[
          "From first aid and de-escalation to parkour, Muay Thai, Jiu-Jitsu, weapons and the law, and keeping your accounts and money safe. Open to anyone who wants to be more capable and freer for it.",
          "No course runs yet. This is the curriculum Skif is building: some courses with its own exams, others with partner schools.",
        ]}
        actions={[
          { href: partnerMailto("teaching with the Academy"), label: "Teach with Skif" },
          { href: "/join", label: "Become a Protector" },
        ]}
        photo={PHOTOS.grappling}
      />
      <div className={`${SHELL} space-y-20 pt-14`}>
        <AcademyBrowser />
        <section aria-labelledby="capability-title" className="grid gap-6 rounded-card border border-subtle p-6 sm:p-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="capability-title" className="font-heading text-2xl font-semibold tracking-display text-fg-primary">
              From course to capability
            </h2>
          </div>
          <div className="space-y-4 leading-relaxed text-fg-secondary lg:col-span-7">
            <p>
              Every Protector carries a capability graph rather than a star rating: each skill with a level, the evidence for it, and a certificate&apos;s expiry
              where there is one. A skill counts fully in matching only once it is verified, and an expired certificate stops counting.
            </p>
            <p>A Skif exam, or a partner&apos;s certificate Skif recognises, is how a declared skill becomes a verified one.</p>
            <Link href="/protectors" className={ACTION.secondary}>
              About Protectors
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
