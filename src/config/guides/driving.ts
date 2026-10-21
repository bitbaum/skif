import type { Guide } from "./types";

export const DRIVING: Guide = {
  slug: "driving",
  title: "Driving, riding and the road",
  fields: ["PHYSICAL", "HEALTH"],
  summary: "The road is where most people take their largest everyday risk. What the Swiss figures say causes serious crashes, the alcohol limits, and the habits that change the odds.",
  photo: "nightRoad",
  statement: "The phone can wait. The road can't.",
  lead: [
    "In 2025, 214 people died on Swiss roads and 3,935 were seriously injured [1]. For most people the drive to work is a larger risk than anything they will meet on a street at night, and it gets a fraction of the attention.",
    "The causes are not mysterious. The federal roads office names them every year, and nearly all of them are choices made in the seconds before a crash.",
  ],
  sections: [
    {
      kind: "table",
      heading: "What causes serious crashes",
      blurb: "As the Federal Roads Office states them for 2025, by who was involved [1].",
      anchor: "causes",
      columns: ["Who", "Main causes"],
      rows: [
        ["Cars", "Failing to give way, inattention, distraction"],
        ["Motorcycles", "Mainly speed and inattention"],
        ["Pedestrians", "Mainly their own behaviour"],
      ],
    },
    {
      kind: "cards",
      heading: "Distraction, in numbers",
      anchor: "distraction",
      columns: 3,
      cards: [
        { title: "3.6×", body: "Using a phone while driving raises the risk of a crash 3.6-fold, according to the Swiss Council for Accident Prevention [2]." },
        { title: "31%", body: "Of serious road crashes in Switzerland have inattention or distraction as a main or contributing cause: 1,201 people seriously hurt or killed in 2025 [3]." },
        { title: "+⅓", body: "Distraction lengthens your reaction time by about a third [3]. At 50 km/h that is metres of road you travel before your foot moves." },
      ],
    },
    {
      kind: "table",
      heading: "Alcohol limits in Switzerland",
      blurb: "Blood alcohol (‰) and the breath equivalent the police measure [4]. One serious crash in eight involves alcohol [5].",
      anchor: "alcohol",
      columns: ["Who", "Limit", "What it means"],
      rows: [
        ["Most drivers", "0.5‰ (0.25 mg/l breath)", "From here you are legally impaired"],
        ["Most drivers", "0.8‰ (0.4 mg/l breath)", "Aggravated drink-driving"],
        ["Learner and probationary drivers", "0.1‰ (0.05 mg/l breath)", "Effectively none, on every trip"],
        ["Bus and truck drivers, driving instructors", "0.1‰ (0.05 mg/l breath)", "Effectively none, while working"],
      ],
    },
    {
      kind: "definitions",
      heading: "Habits that change the odds",
      anchor: "habits",
      items: [
        { term: "Phone out of reach", detail: "In the glovebox or the back seat, or on do-not-disturb while driving. Set the route before you move." },
        { term: "Give way when unsure", detail: "Failing to give way is the first cause the roads office names for car crashes [1]. When in doubt, the other car goes first." },
        { term: "Plan the drink, or the driver", detail: "If you will drink, decide before you go how you are getting home. A taxi costs less than any of the alternatives." },
        { term: "Tired is impaired", detail: "On a long drive, stop before you need to. A short break every couple of hours costs minutes." },
        { term: "On two wheels", detail: "Speed and inattention are the named causes for motorcycles [1]. Full protective gear, and ride as though nobody has seen you." },
        { term: "On foot", detail: "Head up and phone down at crossings and when stepping off a tram. Pedestrian crashes come mainly from pedestrians' own behaviour [1]." },
      ],
    },
    {
      kind: "prose",
      heading: "If you are first at a crash",
      anchor: "crash",
      paragraphs: [
        "Protect the scene before anything else: hazard lights on, a high-visibility vest on, and the warning triangle out behind the crash. Then call 144 for injuries, or 117 for the police, and say where you are as precisely as you can.",
        "Do not move an injured person unless they are in immediate danger where they are. Talk to them, keep them warm, and wait with them. First aid you have practised is worth far more than first aid you have read about; the Academy's first-aid courses are where to start.",
      ],
    },
  ],
  sources: [
    { title: "Strassenverkehrsunfälle 2025: weniger Todesfälle, mehr Schwerverletzte", publisher: "Bundesamt für Strassen ASTRA", year: 2026, url: "https://www.admin.ch/de/newnsb/1YsXu8Ku_fjsEph3gSrMp" },
    { title: "Ablenkung im Strassenverkehr", publisher: "BFU, Beratungsstelle für Unfallverhütung", year: 2026, url: "https://www.bfu.ch/de/ratgeber/ablenkung-im-strassenverkehr" },
    { title: "Fahren heisst fahren. Ohne Handy.", publisher: "BFU, Beratungsstelle für Unfallverhütung", year: 2026, url: "https://www.bfu.ch/de/die-bfu/kampagnen/ablenkung" },
    { title: "Fahren unter Alkoholeinfluss: rechtliche Konsequenzen", publisher: "BFU, Beratungsstelle für Unfallverhütung", year: 2026, url: "https://www.bfu.ch/de/services/rechtsfragen/alkoholgrenzwerte-schweizer-verkehr" },
    { title: "Alkohol am Steuer", publisher: "BFU, Beratungsstelle für Unfallverhütung", year: 2026, url: "https://www.bfu.ch/de/ratgeber/alkohol-am-steuer" },
  ],
  checked: "21 October 2026",
};
