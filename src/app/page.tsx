import { FeedbackWidget } from "@/components/feedback-widget";
import { Approach } from "@/components/landing/approach";
import { Doors } from "@/components/landing/doors";
import { Hero } from "@/components/landing/hero";
import { Principles } from "@/components/landing/principles";
import { ProtectorInvite } from "@/components/landing/protector-invite";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { WholeLife } from "@/components/landing/whole-life";

// Copy lives in src/config/landing.ts; the families of harm render from
// src/config/harm-families.ts.
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Doors />
        <WholeLife />
        <Approach />
        <Principles />
        <ProtectorInvite />
      </main>
      <SiteFooter />
      {/* The fleet's feedback widget runs on public pages only — never on
          pages that show preferences, bookings or incidents. */}
      <FeedbackWidget />
    </>
  );
}
