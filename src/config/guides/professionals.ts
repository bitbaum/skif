import type { Guide } from "./types";

export const PROFESSIONALS: Guide = {
  slug: "what-professionals-teach",
  title: "What professionals teach the public",
  fields: ["RESILIENCE", "HEALTH", "PHYSICAL"],
  summary: "Run, hide, tell; stopping a bleed; noticing warning signs. Public programmes from police and medicine, not agency myths.",
  statement: "The best methods are published, tested and boring.",
  lead: [
    "Police forces, medical bodies and threat-assessment researchers publish guidance for the public, tested against real incidents. It is less exciting than stories about special forces and intelligence services, and far more useful.",
    "Skif builds on published, testable methods and names them. It does not borrow the mystique of agencies whose methods are not public and cannot be checked.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Programmes worth knowing",
      anchor: "programmes",
      items: [
        {
          term: "Run, Hide, Tell (UK counter-terrorism policing)",
          detail: "If there is an attack: run if there is a safe route; if not, hide out of sight, silence your phone and barricade; tell the police when it is safe. Simple enough to remember under stress, which is the point.",
        },
        {
          term: "Run, Hide, Fight (US Department of Homeland Security)",
          detail: "The same order for an active attacker, with fighting as the last resort when hiding fails. The ladder again: escape first.",
        },
        {
          term: "Stop the Bleed (American College of Surgeons)",
          detail: "Severe bleeding can kill before an ambulance arrives. The course teaches direct pressure, wound packing and tourniquets in a couple of hours. It is among the most valuable trainings anyone can take.",
        },
        {
          term: "Behavioural threat assessment (US Secret Service, National Threat Assessment Center)",
          detail: "Its research on targeted attacks found that attackers had usually shown behaviour that worried people around them beforehand. Reporting concerns early, to someone who can act, prevents harm.",
        },
      ],
    },
    {
      kind: "cards",
      heading: "Habits worth borrowing",
      blurb: "What every serious safety profession does, scaled to one person and one household.",
      anchor: "habits",
      columns: 2,
      cards: [
        { title: "Decide before it happens", body: "Under stress, people do what they decided earlier. Agree now: where the family meets, who calls whom, what you do if the car breaks down at night." },
        { title: "Rehearse the first minute", body: "Walk your exits once, find the fire extinguisher, say the emergency numbers out loud. A plan you have rehearsed is one you can follow." },
        { title: "Keep it simple", body: "Run, hide, tell fits in three words because complicated plans fail under adrenaline. If your plan needs a page, shorten it." },
        { title: "Review afterwards", body: "After a scare or a near miss, ask what happened, what worked, and what you would change. Without blame, and then change it." },
      ],
    },
    {
      kind: "prose",
      heading: "Why not special forces and spy agencies?",
      anchor: "agencies",
      paragraphs: [
        "Units such as France's GIGN or Britain's SAS, and services such as the CIA, MI6 or Mossad, solve problems a private person does not have, with training, legal powers and support nobody outside them has. Their real methods are mostly not public, and what is sold in their name usually cannot be checked.",
        "What does transfer is the habit underneath: plan ahead, rehearse, keep it simple, and review afterwards. That is free, and it is what this site is built on.",
      ],
    },
  ],
};
