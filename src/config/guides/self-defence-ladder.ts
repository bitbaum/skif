import type { Guide } from "./types";

export const SELF_DEFENCE_LADDER: Guide = {
  slug: "self-defence-ladder",
  title: "Escape first: the self-defence ladder",
  fields: ["PHYSICAL", "RESILIENCE"],
  summary: "Avoid, escape, de-escalate, defend, recover — in that order, and why the order is the whole point.",
  photo: "parkour",
  statement: "The best fight is the one you were never in.",
  lead: [
    "Self-defence is a ladder, not a technique. Each rung costs more and risks more than the one below it, so you climb only as far as you must: avoid, escape, de-escalate, defend, recover.",
    "Knowing the ladder is also what lets you live freely. Someone who knows how they would leave a bad situation goes out at night, travels and takes the tram home without carrying fear with them.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "The five rungs",
      anchor: "rungs",
      items: [
        {
          term: "1 · Avoid",
          detail:
            "Most danger is visible before it arrives: a group that goes quiet as you approach, someone matching your pace, an argument building. Notice early, and change something small — the route, the time, the carriage, the side of the street. Avoiding costs almost nothing.",
        },
        {
          term: "2 · Escape",
          detail:
            "Distance is the most reliable defence there is. Leaving is not losing: a person who is not there cannot be hurt. Move towards light, people and open doors, and keep going until you are somewhere safe, not merely out of sight.",
        },
        {
          term: "3 · De-escalate",
          detail:
            "When you cannot leave, lower the temperature. Open hands raised between you and them, a calm low voice, short sentences, a way out offered for both of you. Give up property without argument: a phone or a wallet is replaceable, you are not.",
        },
        {
          term: "4 · Defend",
          detail:
            "Only when there is no exit and no talking. The aim is not to win but to create the moment you need to escape: short, decisive, then gone. The law expects the defence to fit the attack (see below).",
        },
        {
          term: "5 · Recover",
          detail:
            "Get somewhere safe, call 117 or 144, and write down what happened while it is fresh: time, place, faces, words. Seek care even if you feel fine; shock hides injuries. Afterwards, talk to someone.",
        },
      ],
    },
    {
      kind: "cards",
      heading: "See the world the way a traceur does",
      blurb:
        "Parkour trains you to see a street as routes rather than walls. That habit is the most underrated self-defence skill there is: in a bad moment, you already know three ways out.",
      anchor: "parkour",
      columns: 3,
      cards: [
        { title: "Exits first", body: "On entering a bar, a train or a square, note two ways out. It takes a second and becomes automatic within weeks." },
        { title: "Obstacles are shields", body: "A table, a parked car or a bollard between you and someone else is distance they have to go around, and time for you." },
        { title: "Gaps and heights", body: "A low wall, a fence, a flight of stairs: places you can go quickly that a pursuer has to think about." },
        { title: "Light and people", body: "Run towards a lit shop, a taxi rank or a crowd, not into an empty park or a dead-end street." },
        { title: "Your engine", body: "Can you sprint 200 metres and keep running? Escape is a physical skill. Interval running trains it better than any technique." },
        { title: "Shoes and hands", body: "Shoes you can run in, and hands not full of shopping when you walk somewhere you feel unsure." },
      ],
    },
    {
      kind: "prose",
      heading: "What the law asks of you in Switzerland",
      anchor: "law",
      paragraphs: [
        "Article 15 of the Swiss Criminal Code: anyone attacked without right, or threatened with an imminent attack, may repel it in a manner appropriate to the circumstances. The same right covers defending someone else.",
        "Article 16: if a defender goes beyond what was appropriate, the court reduces the sentence; and if the excess came from excusable excitement or shock at the attack, there is no guilt at all.",
        "Two things follow. Ending the danger is defence; continuing after it has ended is not. And what is appropriate depends on the attack: a slap does not justify a weapon. Other countries' rules differ, some sharply. This is a description of the law, not legal advice.",
      ],
    },
    {
      kind: "table",
      heading: "Training that builds each rung",
      anchor: "training",
      columns: ["Rung", "What builds it", "In the Academy"],
      rows: [
        ["Avoid", "Situational awareness, route habits", "Situational awareness"],
        ["Escape", "Parkour, interval running, general fitness", "Parkour and escape"],
        ["De-escalate", "Verbal de-escalation, the psychology of fear", "De-escalation"],
        ["Defend", "A combat sport with live sparring", "Striking and grappling arts"],
        ["Recover", "First aid, emergency response", "First aid"],
      ],
    },
    {
      kind: "faq",
      heading: "Questions people ask",
      anchor: "questions",
      items: [
        { question: "Is running away cowardly?", answer: "No. It is the outcome every serious self-defence instructor aims for. Nobody is hurt, nobody is in court, and you go home." },
        { question: "Should I hand over my phone if someone demands it?", answer: "Yes. Throw it a little away from you if you can and leave the other way. Property can be replaced or recovered; a fight over it can change your life." },
        { question: "What if I am protecting someone else?", answer: "The same ladder applies to both of you, and the law covers defending another person. Escaping together is still the first choice." },
        { question: "Will a self-defence course make me safe?", answer: "A course gives you skills; habits keep you safe. Awareness and escape are practised daily, without a gym." },
      ],
    },
  ],
};
