import type { Guide } from "./types";

export const COMBAT_SPORTS: Guide = {
  slug: "combat-sports",
  title: "Combat sports, judged on the street",
  fields: ["PHYSICAL", "HEALTH"],
  summary: "Boxing, Muay Thai, wrestling, judo, BJJ, Krav Maga, Systema and more, compared on what matters outside the gym.",
  statement: "What you train against matters more than what it is called.",
  lead: [
    "Every martial art claims to work. The one test that predicts whether it will is live resistance: regular sparring against a partner who is really trying to stop you. Arts that spar build skill that survives adrenaline; arts that only drill often do not.",
    "The second test is range. A confrontation can happen at kicking distance, in a clinch or on the ground, often in that order. No single art covers all three, which is why the comparison below matters.",
  ],
  sections: [
    {
      kind: "table",
      heading: "The comparison",
      blurb: "Skif's judgment, from how each art trains and what it leaves out. The quality of a school, and whether it spars, matters more than the art's name.",
      anchor: "comparison",
      columns: ["Art", "Range", "Live sparring", "Strong outside the gym", "Weak outside the gym", "Training injury risk"],
      rows: [
        ["Boxing", "Punches", "Yes", "Distance, head movement, hand speed, fitness", "No kicks or grappling; bare hands break on skulls", "Medium — head impacts"],
        ["Muay Thai", "Punches, kicks, knees, elbows, clinch", "Yes", "Clinch control, knees, toughness", "Little ground work", "Medium to high"],
        ["Kickboxing", "Punches and kicks", "Yes", "Boxing's strengths, plus kicks", "Clinch and ground", "Medium"],
        ["Wrestling", "Takedowns, control", "Yes", "Staying on your feet, getting back up, control", "No strikes; a takedown onto concrete can do serious harm", "Medium"],
        ["Judo", "Throws, pins", "Yes", "Throws, balance, and breakfalls: falling safely is a skill in itself", "No strikes; throws onto hard ground are dangerous", "Medium"],
        ["Brazilian Jiu-Jitsu", "Ground control, submissions", "Yes", "Control without striking; calm under pressure; size matters less", "The ground is a bad place with several attackers or on concrete", "Low to medium — joints"],
        ["MMA", "All ranges", "Yes", "The broadest live test of all ranges", "Sport rules: no weapons, one opponent", "High"],
        ["Krav Maga", "Mixed, weapons, several attackers", "Varies by school", "Scenario training, weapons awareness, aggression under stress", "Quality varies widely; many schools rarely spar", "Low to medium"],
        ["Systema", "Movement, breathing, strikes", "Varies by school", "Breathing and relaxation under stress", "Little open testing; quality varies", "Low"],
        ["Kali / Escrima", "Sticks, blades, empty hand", "Partly", "How weapons move and how fast", "Drills can drift from reality without sparring", "Low to medium"],
        ["Parkour", "Movement", "Not a fighting art", "Escape: speed, terrain, obstacles", "Does nothing once you are caught", "Medium — falls"],
      ],
    },
    {
      kind: "prose",
      heading: "A sensible combination",
      anchor: "combination",
      paragraphs: [
        "For most adults: one striking art that spars (boxing, kickboxing or Muay Thai), one grappling art that spars (wrestling, judo or BJJ), and the habit of running. That covers the three ranges and the exit.",
        "For a smaller person, grappling arts matter more: leverage lets someone control a larger, untrained person without trading blows. For children, judo, wrestling and BJJ teach falling, balance and control without punches to the head.",
        "Every one of these carries a training risk, and that is part of the calculation, not a reason to avoid them. Sparring to the head has costs that build up over years; good gyms manage them, poor ones do not.",
      ],
    },
    {
      kind: "definitions",
      heading: "How to choose a school",
      anchor: "choosing",
      items: [
        { term: "Watch a class first", detail: "Any good school lets you. See whether people spar, and how they treat beginners." },
        { term: "Look for resistance", detail: "Drills are fine; drills alone are not. Ask how often students train against a partner who resists." },
        { term: "Watch the injury culture", detail: "Hard training is normal; injured students and ego-driven sparring are not." },
        { term: "Distrust promises", detail: "“Guaranteed disarm”, “deadly techniques” and secret methods are marketing. Real instructors talk about probabilities." },
        { term: "Check the instructor", detail: "Who taught them, how they compete or test their students, and whether they send people to other gyms when it helps." },
      ],
    },
  ],
};
