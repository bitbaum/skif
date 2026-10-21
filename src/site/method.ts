/**
 * The Method page: how a Safety Plan and a Protector match are decided. The
 * scales, limits and trade-off axes render from the config the engine reads,
 * so the page and the engine cannot disagree; the prose states only what the
 * code does (src/domain/safety-plan.ts, src/server/matching.ts).
 */
import type { SitePage } from "@bitbaum/sitekit";
import { COST_TIERS } from "@/config/assessment";
import { HARD_CONSTRAINTS, PREFERENCE_AXES } from "@/config/constraints";
import { AUTONOMY_IMPACT, PRIVACY_IMPACT } from "@/config/interventions";
import { LOOP } from "@/config/site";

export function methodPage(): SitePage {
  return {
    path: "method",
    title: "Method",
    intro: "How Skif decides what to recommend.",
    sections: [
      {
        kind: "hero",
        eyebrow: "Method",
        statement: "How Skif decides.",
        lead: [
          "Every recommendation Skif makes can be traced to what you told it and to a rule written down here. No hidden score, no model guessing at danger, no upsell.",
          "The target is a good life with low involuntary risk, not maximum security. Surveillance, restriction and constant fear can make someone technically safer and their life worse, and Skif counts that cost.",
        ],
      },
      {
        kind: "index",
        heading: "On this page",
        entries: [
          { label: "The loop", anchor: "loop" },
          { label: "The most proportionate step", anchor: "proportionality" },
          { label: "What every step costs", anchor: "costs" },
          { label: "Where a rating comes from", anchor: "evidence" },
          { label: "Hard limits you can set", anchor: "limits" },
          { label: "How a Protector is chosen", anchor: "protectors" },
          { label: "What Skif keeps", anchor: "data" },
        ],
      },
      { kind: "cards", heading: "The loop", anchor: "loop", columns: 4, cards: LOOP.map((s) => ({ ...s })) },
      {
        kind: "prose",
        heading: "The most proportionate step",
        anchor: "proportionality",
        paragraphs: [
          "An assessment turns what you tell it into findings: what needs attention, how urgently, and because of what. It never estimates the probability of harm, because nobody can, honestly.",
          "For each finding the plan recommends one step. It never picks one that breaks a limit you set, and never one over your budget; those are listed separately so you can see they exist. For most findings it picks the least intrusive step that works: the least privacy given up, then the least money, then the least asked of your freedom.",
          "When you tell Skif about a known threat, the finding becomes a high priority and the order flips: the most effective step comes first. Proportionality cuts both ways.",
          `Where you already do enough, the plan says so and recommends nothing new. Your leanings between ${PREFERENCE_AXES.map((a) => `${a.left.toLowerCase()} and ${a.right.toLowerCase()}`).join(", ")} change the order of steps, never which steps are allowed.`,
        ],
      },
      {
        kind: "table",
        heading: "What every step costs",
        blurb: "Each step carries a privacy cost and a freedom cost on the same four-point scale, beside its price. You see all three before you choose.",
        anchor: "costs",
        columns: ["Level", "Privacy", "Freedom"],
        rows: PRIVACY_IMPACT.map((p, i) => [String(p.level), p.label, AUTONOMY_IMPACT[i].label]),
        monoColumns: [0],
      },
      {
        kind: "table",
        heading: "Money",
        columns: ["Tier", "Means"],
        rows: COST_TIERS.map((c) => [c.label, c.budget]),
      },
      {
        kind: "prose",
        heading: "Where a rating comes from",
        anchor: "evidence",
        paragraphs: [
          "Every benefit rating names its basis: published research, what Skif has observed in its own work, a named expert, or Skif's own judgment. A manufacturer's claim is never used.",
          "Today every rating is Skif's own judgment, and it says so. None is marked high confidence until research is attached. Building that evidence is part of the work.",
        ],
      },
      {
        kind: "definitions",
        heading: "Hard limits you can set",
        blurb: "A limit is never traded away. A step that would break one is excluded from your plan, and the plan tells you which limit excluded it.",
        anchor: "limits",
        items: HARD_CONSTRAINTS.map((c) => ({ term: c.label, detail: c.description })),
      },
      {
        kind: "prose",
        heading: "How a Protector is chosen",
        anchor: "protectors",
        paragraphs: [
          "Matching is deterministic and explained. A Protector must hold every capability the booking requires, verified by Operations and valid on the day, and be available. Among those, the ranking scores the capabilities each service needs most (de-escalation for almost every service, a physical skill for none), then shared languages, presence style and past ratings, and gives a reason for every point.",
          "A Protector sees where to meet only after accepting the job, and never who you are beyond that. After it, you rate respect, discretion and how safe you felt, each on its own scale, not with stars.",
        ],
      },
      {
        kind: "prose",
        heading: "What Skif keeps",
        anchor: "data",
        paragraphs: [
          "Your account is your OrangeCat identity; Skif keeps no separate one. Assessments, plans and bookings live in Skif's own database on a server it runs in Germany, never with a camera or alarm vendor.",
        ],
      },
    ],
  };
}
