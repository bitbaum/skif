import type { Guide } from "./types";

export const WATER: Guide = {
  slug: "lakes-and-rivers",
  title: "Lakes and rivers",
  fields: ["ENVIRONMENTAL", "HEALTH"],
  summary: "Swimming in the Limmat, floating the Aare, a lake on a hot day: the twelve rules the Swiss Lifesaving Society teaches, and why cold water is the risk people underrate.",
  photo: "cityRiver",
  statement: "The water is free. Respect it.",
  lead: [
    "Swiss lakes and rivers are one of the best things about living here, and Skif wants you in them. They are also where people die every summer: 43 drowned in Switzerland in 2025, against a long-term average of about 50 a year [1].",
    "The Swiss Lifesaving Society (SLRG) reduces what it knows to two sets of six rules, one for bathing and one for rivers [2] [3]. They are short because they are the ones that matter.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "The six bathing rules",
      blurb: "SLRG's Baderegeln, in English [2].",
      anchor: "bathing",
      items: [
        { term: "Children only with an adult", detail: "Small children within arm's reach. Drowning is quick and quiet; it does not look like the films." },
        { term: "Never drunk or high", detail: "And never on a full or completely empty stomach." },
        { term: "Never jump in overheated", detail: "The body needs time to adjust. Wet your skin and go in slowly after hours in the sun." },
        { term: "Don't jump into murky or unknown water", detail: "What you cannot see can hurt you: rocks, branches, shallow ground." },
        { term: "Air mattresses and swim aids are not for deep water", detail: "They give no safety there. They drift, deflate and tip." },
        { term: "Never swim long distances alone", detail: "Even the fittest body can have a weak moment." },
      ],
    },
    {
      kind: "definitions",
      heading: "The six river rules",
      blurb: "SLRG's Flussregeln, in English [3]. They matter on the Aare, the Rhine, the Reuss and the Limmat.",
      anchor: "rivers",
      items: [
        { term: "Life jacket in a dinghy", detail: "Everyone in an inflatable boat wears one." },
        { term: "Respect the stated load", detail: "Never put more on a boat than its label allows." },
        { term: "Never tie boats together", detail: "Tied boats can no longer be steered." },
        { term: "Scout unknown stretches first", detail: "Weirs, bridge piers and fallen trees are where people get pinned. Know where they are and where you will get out before you get in." },
        { term: "Open water is for strong swimmers", detail: "Rivers, ponds and lakes: only good, practised swimmers." },
        { term: "The colder the water, the shorter the swim", detail: "Cold leads to cramp. Early-summer river water is far colder than the air above it." },
      ],
    },
    {
      kind: "cards",
      heading: "Before you get in",
      anchor: "before",
      columns: 3,
      cards: [
        { title: "Know your exit", body: "On a river, pick the steps or ladder where you will get out before you get in, and the one after it in case you miss it." },
        { title: "Go with someone", body: "Somebody on the bank who knows where you went in and when you should be back." },
        { title: "Dry bag, bright float", body: "A swim buoy makes you visible to boats and gives you something to hold. It is not a life jacket." },
      ],
    },
    {
      kind: "prose",
      heading: "If someone is in trouble",
      anchor: "rescue",
      paragraphs: [
        "Call 144 straight away, or have someone else call while you act. Reach or throw before you go: a branch, a rope, a ring buoy, anything that floats. Untrained rescuers drown alongside the person they swim out to.",
        "SLRG runs swimming and lifesaving courses across Switzerland, and the Academy's first-aid courses cover resuscitation. Both are a few hours, and both are the kind of thing you hope never to need and are glad to have.",
      ],
    },
  ],
  sources: [
    { title: "43 Menschen sind im Jahr 2025 in der Schweiz ertrunken", publisher: "blue News / Keystone-SDA, reporting the SLRG", year: 2026, url: "https://www.bluewin.ch/de/news/international/43-menschen-sind-im-jahr-2025-in-der-schweiz-ertrunken-li.3252505" },
    { title: "Baderegeln", publisher: "Schweizerische Lebensrettungs-Gesellschaft SLRG", year: 2026, url: "https://www.slrg.ch/de/praevention/slrg-regeln/baderegeln" },
    { title: "Flussregeln", publisher: "Schweizerische Lebensrettungs-Gesellschaft SLRG", year: 2026, url: "https://www.slrg.ch/de/praevention/slrg-regeln/flussregeln" },
  ],
  checked: "21 October 2026",
};
