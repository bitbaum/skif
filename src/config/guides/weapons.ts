import type { Guide } from "./types";

export const WEAPONS: Guide = {
  slug: "weapons",
  title: "Weapons: what they are, and what the law allows",
  fields: ["PHYSICAL", "INSTITUTIONAL"],
  summary: "From firearms to car keys: what makes something a weapon, how the law sorts them, and why most are shields.",
  statement: "Almost anything can be a weapon. That cuts both ways.",
  lead: [
    "A weapon is anything used to injure or to threaten. Some objects are made for it; most that are ever used in self-defence were not. A person who defends themselves with an object usually picks it up in the moment, without planning to, because it was there.",
    "Understanding weapons is therefore less about owning them than about seeing them: what around you could protect you, what could be used against you, and what the law says about each.",
  ],
  sections: [
    {
      kind: "table",
      heading: "Kinds of weapons, and how Swiss law treats them",
      blurb: "Categories, not a catalogue. The reference is the Swiss Weapons Act (WG, SR 514.54); other countries differ, and laws change. This is a description, not legal advice.",
      anchor: "kinds",
      columns: ["Kind", "Examples", "In Switzerland"],
      rows: [
        ["Firearms", "Pistols, rifles, shotguns", "Most need an acquisition permit. Carrying one in public needs a separate carry permit, rarely granted to private people."],
        ["Blades", "Kitchen and folding knives; butterfly knives, throwing knives, some automatic knives and daggers", "Everyday knives are legal. Butterfly knives, throwing knives and certain automatic knives and daggers are weapons under the Act."],
        ["Impact", "Batons, telescopic batons, brass knuckles, nunchaku, throwing stars", "The Act names devices made to injure people, including brass knuckles, batons and throwing stars, as weapons."],
        ["Chemical", "Pepper (OC) spray, CS gas", "CS-type sprays are weapons. Pepper spray is widely sold; using it is still judged as force."],
        ["Electrical", "Stun guns and tasers", "Electroshock devices are weapons, and restricted."],
        ["Improvised", "Keys, a bag, an umbrella, a chair, a bicycle, a fire extinguisher", "Legal to own and carry. Using one is judged like any force: was it appropriate to the attack?"],
      ],
    },
    {
      kind: "prose",
      heading: "Why everyday objects are mostly shields",
      anchor: "shields",
      paragraphs: [
        "The most useful thing an everyday object does in a bad moment is keep distance. A chair between you and someone else, a bag held up to block, a jacket wrapped around a forearm, a bicycle pushed forward: each buys space and time, which is what escape needs.",
        "Seeing these options is a habit, like noting exits. On a tram it is the pole and the doors; in a café it is the table and the chairs; on the street it is a parked car to keep between you. You are not looking for a fight; you are looking for room.",
        "Intent matters to the law. An umbrella is an umbrella; the same umbrella carried as a weapon, or a knife carried for fighting, can be judged differently. Whatever you use, the question afterwards is whether it was appropriate to the attack.",
      ],
    },
    {
      kind: "prose",
      heading: "A weapon in a fight cuts both ways",
      anchor: "both-ways",
      paragraphs: [
        "Any weapon you bring can be taken and used against you, and its presence raises the stakes for everyone. Against a knife, the right answer is distance: knife attacks are often not seen until they have happened, and techniques that promise a reliable disarm deserve suspicion.",
        "Training with weapons is still worth a great deal, because it teaches how they move, how fast they are, and how little time a defender has. Most people who train weapons arts carry nothing at all; they carry the understanding.",
      ],
    },
    {
      kind: "cards",
      heading: "Learning weapons properly",
      anchor: "learning",
      columns: 2,
      cards: [
        { title: "Firearms, at a licensed range", body: "Safe handling, storage and transport, and the law, taught by licensed instructors. Switzerland has a long tradition of shooting clubs where this is done well." },
        { title: "Stick and blade arts", body: "Kali, Escrima and Arnis train how sticks and blades move, which is why people who study defence against weapons often start there." },
        { title: "Defence against weapons", body: "Scenario training in schools such as Krav Maga, ideally with pressure and resistance, and always with escape as the goal." },
        { title: "Weapons literacy and the law", body: "What counts as a weapon, what you may own and carry, and how force is judged. The foundation for everything above." },
      ],
    },
    {
      kind: "faq",
      heading: "Questions people ask",
      anchor: "questions",
      items: [
        { question: "Should I carry something for self-defence?", answer: "Look at the law where you are first. For most people, a charged phone, a light, shoes you can run in and the habit of noticing do more than any object. Training changes more than a tool does." },
        { question: "Is pepper spray a good idea?", answer: "It can create the moment you need to leave, and it can blow back in wind or a closed room. If you carry it, practise drawing it, and treat using it as using force." },
        { question: "Do Skif Protectors carry weapons?", answer: "No. Skif bookings do not involve weapons: a Protector's tools are judgment, distance, de-escalation and first aid." },
      ],
    },
  ],
};
