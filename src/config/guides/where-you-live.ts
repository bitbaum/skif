import type { Guide } from "./types";

export const WHERE_YOU_LIVE: Guide = {
  slug: "where-you-live",
  title: "Where you live: reading crime numbers honestly",
  fields: ["ENVIRONMENTAL", "PHYSICAL"],
  summary: "What the Swiss crime statistics say about cities and cantons, why a city's rate looks worse than the risk to the people who live there, and what actually makes a home and a street safer.",
  photo: "eveningFlats",
  statement: "A number is a question, not a verdict.",
  lead: [
    "People choose where to live, work and go out partly on a feeling about safety, and that feeling is usually shaped by a headline. The official numbers are public, and they say something calmer and more useful.",
    "Switzerland recorded 61 criminal-code offences per 1,000 residents in 2025, down from about 72 in 2009 [1].",
  ],
  sections: [
    {
      kind: "table",
      heading: "Offences per 1,000 residents, 2025",
      blurb: "Offences under the Criminal Code, from the federal and Zürich cantonal police statistics [1] [2].",
      anchor: "numbers",
      columns: ["Where", "Per 1,000"],
      rows: [
        ["Switzerland", "61"],
        ["Canton of Zürich", "64.6 (68.7 in 2024)"],
        ["City of Zürich", "101.8 (111.3 in 2024)"],
      ],
    },
    {
      kind: "prose",
      heading: "Why the city looks worse than it is",
      anchor: "commuters",
      paragraphs: [
        "A rate per resident counts every offence in the city and divides by the people who sleep there. It leaves out the hundreds of thousands who come in each day to work, shop and go out, and the cantonal police say plainly that in big cities this has an effect that cannot be ignored [2]. The city of Zürich's rate is high partly because so much of the canton's life happens inside it.",
        "The same report breaks the numbers down by district and by Kreis [2]. That is the level worth reading if you are choosing a flat: a city-wide figure describes nobody's street.",
        "One trend deserves attention rather than reassurance: nationally, serious violent offences rose by 8.1% in 2025, while offences overall fell [1]. Both are true at once.",
      ],
    },
    {
      kind: "definitions",
      heading: "What actually makes a home safer",
      anchor: "home",
      items: [
        { term: "The door and the window you forget", detail: "Most break-ins use the easiest way in. A good lock on the main door matters less if the balcony door or a ground-floor window stays open." },
        { term: "Look lived in", detail: "Lights on a timer and post collected when you are away. A neighbour who knows is worth more than a camera." },
        { term: "Know your neighbours", detail: "People who recognise each other notice who does not belong. It is the oldest protection there is and it is free." },
        { term: "Light and sight lines", detail: "An entrance that can be seen from the street and is lit at night is one that is chosen less often." },
        { term: "Cameras last, not first", detail: "Useful for evidence, less certain as prevention, and they cost privacy: yours and your neighbours'. Skif's Safety Plan weighs that cost before it recommends one." },
      ],
    },
    {
      kind: "prose",
      heading: "Choosing a place",
      anchor: "choosing",
      paragraphs: [
        "Walk it at the hours you will live it: late evening, a weekend night, an early morning. Talk to the people already there. Look at the district figures, not the city's.",
        "And weigh everything else that makes a place safe or not: the traffic on the street outside, the walk to the tram, the building's fire exits, the flood map. Crime is one risk among several, and rarely the largest.",
      ],
    },
  ],
  sources: [
    { title: "Polizeiliche Kriminalstatistik 2025 (Medienmitteilung)", publisher: "Bundesamt für Statistik BFS", year: 2026, url: "https://dam-api.bfs.admin.ch/hub/api/dam/assets/36388117/master" },
    { title: "Polizeiliche Kriminalstatistik Kanton Zürich 2025, Jahresbericht", publisher: "Kantonspolizei Zürich", year: 2026, url: "https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/sicherheit-justiz/delikte-praevention/dokumente/pks/aktuell/jahresbericht_2025.pdf" },
  ],
  checked: "21 October 2026",
};
