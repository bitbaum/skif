import type { Guide } from "./types";

export const SITUATIONAL_AWARENESS: Guide = {
  slug: "situational-awareness",
  title: "Situational awareness without paranoia",
  fields: ["PHYSICAL", "ENVIRONMENTAL"],
  summary: "Notice early, calmly: what normal looks like in a place, what breaks it, and the few habits that buy you time.",
  photo: "tramStop",
  statement: "Awareness is knowing what normal looks like.",
  lead: [
    "Situational awareness is not scanning every face for danger. That is exhausting, and the research on reading strangers says it barely works. It is something quieter: a sense of what is normal in a place, so that what does not fit stands out early, while there is still time to do something small.",
    "Done well, it makes you freer, not more anxious. You notice less of the noise and more of what matters.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Baseline and anomaly",
      anchor: "baseline",
      items: [
        { term: "The baseline", detail: "What is usual here, now: how loud it is, how people move, where they look, what they carry. A busy station at rush hour and a quiet street at 2 a.m. have different baselines." },
        { term: "The anomaly", detail: "Something that does not fit the baseline: someone not doing what everyone else is, an absence of what should be there (a busy street suddenly empty), a change in sound or movement." },
        { term: "The response", detail: "One anomaly is usually nothing. It is a cue to pay attention and to know your next small move, not to react." },
      ],
    },
    {
      kind: "cards",
      heading: "Habits that buy time",
      anchor: "habits",
      columns: 3,
      cards: [
        { title: "Exits on arrival", body: "Two ways out of every room, train carriage and bar. Takes a second; becomes automatic in weeks." },
        { title: "Head up at transitions", body: "Doorways, stairwells, car parks, crossings, the moment you reach your front door. Put the phone away there: in the US, emergency rooms treated more than an estimated 1,500 pedestrians for phone-related injuries in 2010, more than double the 2005 figure [1]." },
        { title: "One ear free", body: "Headphones in quiet places at night take away the sense that warns you earliest." },
        { title: "Sit with a view", body: "Facing the room and near an exit, without making a show of it." },
        { title: "Trust the unease", body: "If something feels wrong, act on it in a small way: cross the street, wait for the next tram, go back inside. You do not need a reason." },
        { title: "Rehearse one move", body: "On a regular route, decide once where you would go if something happened. Under stress, people do what they decided earlier." },
      ],
    },
    {
      kind: "prose",
      heading: "What awareness is not",
      anchor: "not",
      paragraphs: [
        "It is not profiling. Appearance tells you very little; behaviour in context tells you more. Treating people as threats because of how they look is both wrong and ineffective.",
        "It is not constant vigilance. Most of life is safe. Save attention for transitions and for the moments something changes; the rest of the time, look at the lake.",
      ],
    },
  ],
  sources: [
    { title: "Distracted walking: Injuries soar for pedestrians on phones", publisher: "The Ohio State University, on Nasar and Troyer, Accident Analysis & Prevention", year: 2013, url: "https://news.osu.edu/distracted-walking-injuries-soar-for-pedestrians-on-phones/" },
  ],
  checked: "21 October 2026",
};
