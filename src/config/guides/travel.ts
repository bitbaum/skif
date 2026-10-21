import type { Guide } from "./types";

export const TRAVEL: Guide = {
  slug: "travel",
  title: "Travel: other countries, other rules",
  fields: ["ENVIRONMENTAL", "HEALTH", "FINANCIAL"],
  summary: "How to go almost anywhere and come back well: preparing before you leave, food and water, money and documents, and what to do when a trip goes wrong.",
  photo: "platform",
  statement: "Go further. Prepare once.",
  lead: [
    "Travel is one of the freest things a person can do, and the risks of it are mostly boring ones: an upset stomach, a lost passport, a scam, a road. The dramatic risks are real in a few places and well documented, so you can know about them before you book.",
    "The preparation takes an evening. After that the trip is yours.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Before you leave",
      anchor: "before",
      items: [
        {
          term: "Register the trip in Travel Admin",
          detail: "The Swiss foreign ministry's travel app. The ministry recommends downloading it before you leave, registering, and entering your trips abroad [1], so that if a crisis hits where you are, they know you are there.",
        },
        { term: "Read the travel advice", detail: "The foreign ministry publishes advice for every country. Read the current version for yours, not last year's." },
        { term: "Health and vaccinations", detail: "A travel clinic or your doctor, a few weeks ahead for anywhere with different diseases." },
        { term: "Insurance that covers the trip", detail: "Check medical cover abroad and repatriation, and whether the sports you plan are included." },
        { term: "Copies of documents", detail: "Passport and cards photographed and kept offline, and a paper copy apart from the originals." },
        { term: "Someone at home", detail: "Leave your plans with one person, and agree when you will check in." },
      ],
    },
    {
      kind: "cards",
      heading: "Food and water",
      blurb: "Where tap water may be contaminated, the CDC's advice [2].",
      anchor: "food",
      columns: 2,
      cards: [
        { title: "Don't drink the tap", body: "Where tap water might be contaminated, drink sealed bottled drinks, and skip the ice [2]." },
        { title: "Make water safe", body: "Tap water can be made safe by boiling, filtering or chemically treating it [2]." },
        { title: "Peel it or wash it", body: "Fruit and vegetables are safer when you peel them yourself or wash them in bottled or disinfected water [2]." },
        { title: "Hot and freshly cooked", body: "Food served hot and cooked in front of you is usually a safer choice than a buffet that has been standing." },
      ],
    },
    {
      kind: "definitions",
      heading: "Money and documents on the road",
      anchor: "money",
      items: [
        { term: "Split it", detail: "Two cards in two places, and a little cash in a third. A lost wallet should be an inconvenience, not the end of the trip." },
        { term: "The day bag carries the day", detail: "Passport in the hotel safe unless you need it; a copy with you." },
        { term: "Scams follow scripts", detail: "Taxis without meters, 'closed' attractions with a friend nearby, a spill on your jacket. The scams guide explains the levers they all share." },
        { term: "ATMs inside banks", detail: "In daylight, and cover the keypad." },
      ],
    },
    {
      kind: "prose",
      heading: "When it goes wrong",
      anchor: "wrong",
      paragraphs: [
        "Save the local emergency number before you land; it is not always 112. For anything a Swiss citizen cannot solve alone abroad — a lost passport, an arrest, a hospital — the nearest Swiss embassy or consulate and the foreign ministry's helpline are the people to call.",
        "In a crisis where you are, the rule is the same as at home: move away from it first, then tell someone where you are. Travel Admin is how the ministry finds you [1].",
      ],
    },
  ],
  sources: [
    { title: "Sorgenfreies Reisen aus der Hosentasche", publisher: "Eidgenössisches Departement für auswärtige Angelegenheiten EDA", year: 2021, url: "https://www.eda.admin.ch/de/sorgenfreies-reisen-aus-der-hosentasche" },
    { title: "Food and Water Safety", publisher: "U.S. Centers for Disease Control and Prevention, Travelers' Health", year: 2026, url: "https://wwwnc.cdc.gov/travel/page/food-water-safety" },
  ],
  checked: "21 October 2026",
};
