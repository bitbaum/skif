/**
 * The Join page: Protectors, schools that teach, and specialists. The
 * specialist list is the provider types the Safety Plan already recommends,
 * each with how many steps name it, so the page asks only for people the
 * product actually sends work to.
 */
import type { SitePage } from "@bitbaum/sitekit";
import { INTERVENTIONS, type Intervention } from "@/config/interventions";
import { LANGUAGES } from "@/config/constraints";
import { PROVIDER_TYPES } from "@/config/providers";
import { partnerMailto } from "@/config/site";

function stepsNaming(provider: string): number {
  return (INTERVENTIONS as readonly Intervention[]).filter((i) => i.provider === provider).length;
}

export const SPECIALISTS = PROVIDER_TYPES.filter((p) => p.key !== "PROTECTOR" && p.key !== "RETAILER");

export function joinPage(): SitePage {
  return {
    path: "join",
    title: "Join",
    intro: "Protectors, schools and specialists.",
    sections: [
      {
        kind: "hero",
        eyebrow: "Join",
        statement: "Work with Skif.",
        lead: [
          "Skif is a new safety company, built on judgment rather than intimidation. It needs three kinds of people: Protectors to be with those who ask, schools to teach what Protectors learn, and specialists for the steps a Safety Plan recommends.",
        ],
        actions: [
          { label: "Apply as a Protector", href: "/protector" },
          { label: "Partner with Skif", href: partnerMailto("partnership") },
        ],
      },
      {
        kind: "definitions",
        heading: "What makes a good Protector",
        blurb: "Someone people want beside them. Physical skill counts, and it counts least.",
        anchor: "protector",
        items: [
          { term: "Judgment", detail: "Reading a situation early and choosing the quietest thing that works." },
          { term: "Calm under pressure", detail: "Staying steady when someone else is not, and making them steadier." },
          { term: "De-escalation", detail: "Ending conflict with words, distance and posture rather than force." },
          { term: "First aid", detail: "Being the useful person in the minutes before help arrives." },
          { term: "Care", detail: "Discretion, respect and a feel for people who have been through something." },
          { term: "Languages", detail: `${LANGUAGES.map((l) => l.label).join(", ")}: each one widens who you can help.` },
        ],
      },
      {
        kind: "prose",
        heading: "How applying works",
        anchor: "apply",
        paragraphs: [
          "Sign in with OrangeCat and describe your experience; Skif can help you fill it in from a few sentences. Operations reviews every application and verifies each capability against its evidence.",
          "Once approved, you see jobs matched to you with the reason you were matched. You see where to meet only after you accept, and never who the person is beyond that.",
        ],
      },
      {
        kind: "cards",
        heading: "Schools and trainers",
        blurb:
          "The Academy will teach some courses itself and send people to partner schools for the rest. If you teach first aid, a martial art, driving, firearms safety at a licensed range, or digital security, we would like to talk.",
        anchor: "schools",
        columns: 3,
        cards: [
          { title: "Medical", body: "First aid, emergency response and advanced courses." },
          { title: "Martial arts and self-defence", body: "Jiu-Jitsu, Muay Thai, Krav Maga, restraint and control." },
          { title: "Firearms", body: "Licensed instructors and ranges: safe handling and Swiss weapons law." },
          { title: "Driving", body: "Defensive and professional driving." },
          { title: "Digital", body: "Account security, privacy and the safe holding of keys." },
          { title: "People", body: "Trauma-informed care, conflict and crisis psychology." },
        ],
      },
      {
        kind: "cards",
        heading: "Specialists",
        blurb: "The kinds of help a Safety Plan already recommends. As people take those steps, Skif will send them to specialists it trusts.",
        anchor: "specialists",
        columns: 3,
        cards: SPECIALISTS.map((p) => {
          const n = stepsNaming(p.key);
          return { title: p.label, body: `Named in ${n} ${n === 1 ? "step" : "steps"} a Safety Plan can recommend.` };
        }),
      },
    ],
  };
}
