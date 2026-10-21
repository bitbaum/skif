/**
 * For businesses and venues: what Skif does for a place someone runs, built
 * from what exists — the place assessment (environments VENUE, WORKPLACE,
 * EVENT), venue de-escalation staff (service VENUE_STAFF), the unrest
 * checklist and staff training in the Academy.
 */
import type { SitePage } from "@bitbaum/sitekit";
import { partnerMailto, signInTo } from "@/config/site";

export function businessPage(): SitePage {
  return {
    path: "business",
    title: "For businesses and venues",
    intro: "Shops, bars, clubs, offices and events.",
    sections: [
      {
        kind: "hero",
        eyebrow: "For businesses and venues",
        statement: "A safe place is good business.",
        lead: [
          "Guests who feel safe stay longer and come back; staff who know what to do stay calmer. Skif looks at the place you run — the door, the floor, the street outside, the night a protest comes past — and helps you take the most proportionate step, not the most expensive one.",
        ],
        actions: [
          { label: "Assess your place", href: signInTo("/assessments") },
          { label: "Talk to Skif", href: partnerMailto("a business or venue") },
        ],
      },
      {
        kind: "cards",
        heading: "What Skif does for a place",
        anchor: "what",
        columns: 2,
        cards: [
          { title: "An assessment of the place", body: "Guests, staff, entrances, the street, what happens on a known date. A plan where each step shows what it achieves and costs, and where nothing is needed, says so." },
          { title: "Venue staff who defuse", body: "Skif staff for your busiest nights, chosen for de-escalation, first aid and calm, not for size. They keep guests safe and call 117 when it is needed." },
          { title: "Training your own team", body: "De-escalation, first aid and stopping a bleed, so the people already on your floor know the first minutes." },
          { title: "A protest on your street", body: "A checklist for the day a demonstration is announced nearby: close on time, clear the window, agree with neighbours, and people beside you while you leave." },
        ],
      },
      {
        kind: "definitions",
        heading: "How Skif works with a business",
        anchor: "how",
        items: [
          { term: "Proportion first", detail: "Free steps come first: house rules at the door, a briefing before each night, lighting, neighbours. People and products only where they are the proportionate answer." },
          { term: "Privacy for your guests", detail: "Every step shows what it costs in privacy. Cameras over guests are an option with a real cost, never a default." },
          { term: "Calm, not intimidating", detail: "No bulls at the door. A guest should feel looked after, not watched." },
        ],
      },
    ],
  };
}
