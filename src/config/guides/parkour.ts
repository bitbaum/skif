import type { Guide } from "./types";

/**
 * Parkour as Skif sees it: the skill that makes "get away" a real option, and
 * the one that teaches falling well. Every figure below is cited; where the
 * evidence stops (nobody has measured parkour against real escapes), the text
 * says it is Skif's reasoning.
 */
export const PARKOUR: Guide = {
  slug: "parkour",
  title: "Parkour: moving to get away",
  fields: ["PHYSICAL", "HEALTH"],
  summary: "The most useful physical skill for safety is leaving. How parkour trains it, how to start without getting hurt, and where to train in Zürich.",
  photo: "parkour",
  statement: "The best fight is the one you are no longer there for.",
  lead: [
    "Police advice for the worst moments in public says the same thing in different words: if you can get away safely, do. UK counter-terrorism police put it plainly: “Run to a place of safety. This is a far better option than to surrender or negotiate” [1]. Getting away depends on seeing a route, and on having a body that can take it.",
    "Parkour trains exactly that: moving over, under and around whatever is in the way, with your own body and nothing else. It also teaches you to fall well, which matters to far more people than any attacker does.",
  ],
  sections: [
    {
      kind: "prose",
      heading: "Strong, to be useful",
      anchor: "origins",
      paragraphs: [
        "Parkour grew from Georges Hébert's “méthode naturelle”, a French naval and military training system of running, climbing, jumping, swimming and lifting, tested from 1904 [2]. His motto is usually given as “être fort pour être utile”: be strong to be useful [3]. In 1902 he helped coordinate the escape of about 700 people from the eruption of Mount Pelée on Martinique [3].",
        "The method passed through Raymond Belle, a Paris military firefighter, to his son David and a group of friends in the Paris suburb of Lisses in the 1980s and 90s. They called it parkour, or “l'art du déplacement”: the art of moving [2]. Today it has competitions, but most people who practise it simply train.",
        "That origin is the reason it belongs on Skif. Parkour was never a performance; it was a way to be capable of getting yourself, and others, out of trouble.",
      ],
    },
    {
      kind: "cards",
      heading: "What it gives you",
      anchor: "why",
      columns: 3,
      cards: [
        { title: "Routes others do not see", body: "A wall, a railing, a gap between parked cars stop being dead ends. More routes means more ways out of a bad place. This is Skif's reasoning, not a measured result: nobody has studied parkour against real escapes." },
        { title: "Landing instead of crashing", body: "A trained parkour landing cut the peak force on the body by 38% and its rate by 54% compared with a stiff landing; a roll, by 43% and 63% [4]." },
        { title: "Falling well, at any age", body: "Falls killed about 842,000 people worldwide in 2023, 71% of them aged 60 or over, and the WHO lists balance-challenging exercise among what prevents them [5]. Older adults taught to fall kept part of the skill 20 months later [6]." },
        { title: "Calm under effort", body: "Training means meeting a jump you are not sure of, assessing it and deciding. The decision, not the jump, is the skill." },
        { title: "Fitness that is for something", body: "Sprinting, climbing and carrying your own weight, trained for use rather than for a mirror." },
        { title: "Free, and outdoors", body: "Most training needs a city and a pair of shoes. Zürich has a free public parkour facility (below)." },
      ],
    },
    {
      kind: "definitions",
      heading: "Starting without getting hurt",
      anchor: "start",
      blurb: "Parkour injuries are mostly minor: in one survey of 180 practitioners, 1.7 per 1,000 hours of training, mostly sprained ankles and bruised knees [7]. These habits are what the research links to fewer of them.",
      items: [
        { term: "Condition first", detail: "A lack of physical conditioning was linked to injury, and so was training load: more hours, more injuries [7]. Build strength and add volume slowly." },
        { term: "Let height follow strength", detail: "Heavier athletes and those with less leg power switched from landing on two feet to rolling at lower drops [8]. Your safe height is yours, not the person before you's." },
        { term: "Learn the landing and the roll", detail: "Before any drop: land softly on the balls of the feet, absorb with the legs, and roll when the drop is too big to stick [4]." },
        { term: "Precision jumps low", detail: "Precision jumps were the movement most often involved in injuries among 161 Madrid practitioners [9]. Practise them on lines on the ground, then low, for a long time." },
        { term: "Train with a coach and with others", detail: "A good group corrects your landing before it becomes a habit, and tells you when to stop. In Zürich, coached groups offer a trial session (below)." },
        { term: "Respect the places", detail: "Train where you are allowed, leave nothing behind, and stop when someone asks. The movement's founders stressed health, humility and encouraging each other [10]." },
      ],
    },
    {
      kind: "table",
      heading: "What the evidence says about injuries",
      anchor: "injuries",
      blurb: "Most injuries are to the legs and most need no treatment beyond rest. Serious ones come from landings and from hitting objects.",
      columns: ["Study", "Who", "What it found"],
      rows: [
        ["Grosprêtre & El Khattabi, 2022 [7]", "180 practitioners, France", "1.7 injuries per 1,000 hours; mostly ankle sprains and knee bruises; more training load and less conditioning, more injuries"],
        ["Giner-Gran, 2020 [9]", "161 practitioners, Madrid, a year or more of training", "70% had ever been injured; 69% of injuries needed no tests or surgery; precision jumps most often involved"],
        ["Rossheim & Stephenson, 2017 [11]", "US emergency departments, 2009–2015", "Most injuries from landing or striking objects; 58% to arms and legs"],
        ["Puddle & Maulder, 2013 [4]", "10 trained men on a force plate", "Parkour landings and rolls cut peak force by 38–43% against a stiff landing"],
      ],
    },
    {
      kind: "definitions",
      heading: "Where to train in Zürich",
      anchor: "zurich",
      blurb: "Checked on the providers' own pages; prices change, so confirm before you go.",
      items: [
        { term: "ParkourONE Zürich", detail: "Coached classes for adults (18+), juniors (from 12), children (6–12) and parents with children from 4, outdoors in all weather at Dynamo, Universität Zürich, Hardaupark, Kantonsschule Enge and Küsnacht. A trial session costs CHF 25; adults pay CHF 98 a month [12]. They also teach in Bern, Thun, Basel, Münsingen and Brig [13]." },
        { term: "Sportzentrum Heerenschürli, Schwamendingen", detail: "Zürich's first outdoor parkour facility, open since August 2022 and free to use [14]." },
        { term: "Older beginners", detail: "Skif found no parkour class for over-50s in Switzerland. Adult classes list no upper age, so ask for a trial session, and say what you want from it: often that is balance and falling well, which parkour-based programmes abroad already teach [15]." },
      ],
    },
    {
      kind: "prose",
      heading: "What parkour does not do",
      anchor: "limits",
      paragraphs: [
        "It does nothing once someone has hold of you. That is what grappling arts are for (see Combat sports, judged on the street). And it is no reason to take risks you would not otherwise take: the point of being able to leave is that you leave early, calmly, before running is needed.",
        "The evidence for older adults is early. A 10-week parkour programme for 20 adults with an average age of 67 improved how far they could reach, but its effect on getting up and walking was small and not significant [15]. Learning to fall has firmer support [6].",
      ],
    },
  ],
  sources: [
    { title: "Run Hide Tell", publisher: "Counter Terrorism Policing (UK)", year: 2026, url: "https://www.counterterrorism.police.uk/runhidetell/" },
    { title: "A Brief History of Parkour", publisher: "Parkour UK (Tom Taylor)", year: 2026, url: "https://parkour.uk/hub/a-brief-history-of-parkour" },
    { title: "Georges Hébert", publisher: "Wikipedia, citing Trothen (2019) and Atkinson (2008)", year: 2026, url: "https://en.wikipedia.org/wiki/Georges_H%C3%A9bert" },
    { title: "Ground Reaction Forces and Loading Rates Associated with Parkour and Traditional Drop Landing Techniques", publisher: "Puddle & Maulder, Journal of Sports Science and Medicine 12", year: 2013, url: "https://jssm.org/jssm-12-122.xml-abst" },
    { title: "Falls (fact sheet)", publisher: "World Health Organization", year: 2026, url: "https://www.who.int/news-room/fact-sheets/detail/falls" },
    { title: "High Challenge Exercise and Learning Safe Landing Strategies among Community-Dwelling Older Adults: A Randomized Controlled Trial", publisher: "Arkkukangas et al., IJERPH 19(12)", year: 2022, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9223480/" },
    { title: "Training habits and lower limb injury prevention in parkour practitioners", publisher: "Grosprêtre & El Khattabi, Movement & Sport Sciences 115", year: 2022, url: "https://www.mov-sport-sciences.org/articles/sm/abs/2022/01/sm210045/sm210045.html" },
    { title: "Affordance Boundaries Are Defined by Dynamic Capabilities of Parkour Athletes in Dropping from Various Heights", publisher: "Croft & Bertram, Frontiers in Psychology 8", year: 2017, url: "https://doi.org/10.3389/fpsyg.2017.01571" },
    { title: "Epidemiology of injuries in parkour and review literature", publisher: "Giner-Gran, SPORT TK 9(1)", year: 2020, url: "https://revistas.um.es/sportk/article/view/412551" },
    { title: "Parkour", publisher: "Wikipedia, citing Belle & Perrière", year: 2026, url: "https://en.wikipedia.org/wiki/Parkour" },
    { title: "Parkour injuries presenting to United States emergency departments, 2009–2015", publisher: "Rossheim & Stephenson, American Journal of Emergency Medicine 35(10)", year: 2017, url: "https://doi.org/10.1016/j.ajem.2017.04.040" },
    { title: "Parkour in Zürich", publisher: "ParkourONE Schweiz", year: 2026, url: "https://schweiz.parkourone.com/zuerich/" },
    { title: "ParkourONE Schweiz", publisher: "ParkourONE", year: 2026, url: "https://schweiz.parkourone.com/" },
    { title: "Neu im Sportzentrum Heerenschürli: Beachvolleyball, Beachsoccer, Parkour und Zürifit", publisher: "Stadt Zürich", year: 2022, url: "https://www.stadt-zuerich.ch/de/aktuell/medienmitteilungen/2022/08/220818a1.html" },
    { title: "The Effect of Parkour Concept on Functional Mobility in Older Adults", publisher: "Svobodova, Tomas & Sebera, Studia Sportiva 19(1)", year: 2025, url: "https://journals.muni.cz/studiasportiva/article/download/35653/33980/71474" },
  ],
  checked: "22 October 2026",
};
