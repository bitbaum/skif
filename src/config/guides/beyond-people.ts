import type { Guide } from "./types";

export const BEYOND_PEOPLE: Guide = {
  slug: "nature-travel-sport",
  title: "Risks that are not people: nature, animals, travel and sport",
  fields: ["ENVIRONMENTAL", "HEALTH", "RESILIENCE"],
  summary: "Avalanches, floods, ticks, cows, cities abroad and the sports you love: measured, not feared.",
  statement: "Most risk does not have a face.",
  lead: [
    "Weather, terrain, animals, a city you do not know and the sport you love all carry risk, often more than the people around you. Skif treats them the same way: understand the risk, reduce what is cheap to reduce, and then go and live.",
    "Measuring a risk is not judging it. A base jumper and a Muay Thai fighter both accept real risk for something they value. The job is to know its size and to manage what can be managed.",
  ],
  sections: [
    {
      kind: "table",
      heading: "Natural hazards in Switzerland, and where to watch them",
      anchor: "nature",
      columns: ["Hazard", "Where to look", "What to do"],
      rows: [
        ["Avalanches", "SLF avalanche bulletin; the White Risk app", "Read the bulletin before every tour off piste; carry transceiver, probe and shovel, and train with them."],
        ["Storms, heavy rain, heat", "MeteoSwiss warnings and app", "Turn on warnings for where you live and where you are going."],
        ["Floods and landslides", "Federal and cantonal natural-hazard warnings", "Know whether your home is in a hazard zone; keep valuables above the basement."],
        ["Earthquakes", "Swiss Seismological Service", "Fix tall furniture to walls; know where the gas and water shut-offs are."],
        ["Any official alert", "Alertswiss app", "One app for federal and cantonal alerts, including sirens and what they mean."],
      ],
    },
    {
      kind: "definitions",
      heading: "Animals",
      anchor: "animals",
      items: [
        { term: "Ticks", detail: "The Federal Office of Public Health recommends vaccination against tick-borne encephalitis for most people in most of Switzerland. Check yourself after walks in grass and woods." },
        { term: "Cows with calves", detail: "On alpine pastures, mother cows protect their calves. Keep your distance, keep dogs on a lead, and go around a herd rather than through it." },
        { term: "Dogs", detail: "Do not run from a dog or stare at it; stand side-on, still, with hands close. Teach children the same." },
        { term: "Abroad", detail: "Rabies, snakes and insects differ by country. Read the health advice for your destination before you go, not after." },
      ],
    },
    {
      kind: "prose",
      heading: "Cities and countries",
      anchor: "travel",
      paragraphs: [
        "Risk varies by country, by city, by neighbourhood and by hour. The Swiss Federal Department of Foreign Affairs publishes travel advice for every country, and its Travel Admin app lets you register a trip so the embassy can reach you in a crisis.",
        "Within a city, the best source is local: ask a hotel, a host or a colleague which areas they avoid and when. Learn the common scams for tourists in that place before you arrive, and know the local emergency number.",
      ],
    },
    {
      kind: "prose",
      heading: "The sports you choose",
      anchor: "sport",
      paragraphs: [
        "Risk researchers use the micromort, a one-in-a-million chance of death, to compare activities on one scale. On it, BASE jumping sits among the most dangerous things people do for fun, high-altitude mountaineering and motorcycling are high, and most team sports are low.",
        "Death is not the only cost. Combat sports carry the slower risk of repeated head impacts; endurance sports carry heat and heart risks; mountain sports carry terrain and weather. Each one is reduced the same way: training, the right equipment, reading conditions, and partners who will say no.",
        "Skif does not tell anyone which risks are worth taking. It helps you see their size, so that the choice is yours and informed.",
      ],
    },
  ],
};
