/**
 * SSOT for the families of harm (docs/DOCTRINE.md "Families of harm"). Every
 * concern an assessment can raise belongs to exactly one family, and the
 * catalogue must answer every family — a threat model with only the physical
 * row is the conventional security company the doctrine rejects.
 */
type HarmFamilyDef = {
  key: string;
  label: string;
  /** One word: the safety map and narrow places. */
  short: string;
  /** Path segment of the field's public page, /safety/<slug>. */
  slug: string;
  description: string;
  /** The field's public page opens with this. */
  headline: string;
  /** What the field covers and how Skif thinks about it. No statistics:
   * nothing here is a claim we cannot show (docs/DOCTRINE.md). */
  explainer: readonly string[];
};

export const HARM_FAMILIES = [
  {
    key: "PHYSICAL",
    label: "Physical",
    short: "Physical",
    slug: "physical",
    description: "Violence, stalking, break-ins, being followed.",
    headline: "Your body, your home, the way between them.",
    explainer: [
      "Physical safety is what most people mean by security: not being hurt, not being followed, not coming home to a broken door. It is also where the security industry sells hardest, and where fear is easiest to manufacture.",
      "Skif starts from what actually changes the odds: how predictable you are, who knows where you will be, how a place is lit and overlooked, and what you would do in the first minute if something went wrong. Locks and people come after that, sized to what you told us.",
    ],
  },
  {
    key: "CYBER",
    label: "Cyber and digital",
    short: "Digital",
    slug: "digital",
    description: "Accounts, devices, phishing, crypto keys.",
    headline: "Most break-ins now start with a password.",
    explainer: [
      "Your email account is the key to every other account: whoever holds it can reset the rest. Your phone carries your bank, your messages, your location and your keys. A threat model that stops at the front door misses all of it.",
      "The steps that matter most here are free and unglamorous: a password manager, a second factor that cannot be phished, updates turned on, keys held where you can recover them and nobody else can. Specialists are for when something has already happened, or when what you hold makes you a target.",
    ],
  },
  {
    key: "PRIVACY",
    label: "Privacy",
    short: "Privacy",
    slug: "privacy",
    description: "Being found, tracked or profiled; leaked addresses.",
    headline: "Being hard to find is a form of safety.",
    explainer: [
      "Many physical threats begin as an address someone could look up. Data brokers, public registers, old posts, a photo with a street sign in it, an app sharing location by default: each one is small, and together they are a map.",
      "Privacy is also a cost Skif counts on every other step. A camera, a tracker or a monitoring service can make you safer from one harm while exposing you to another. Every recommendation shows what it costs your privacy next to what it achieves.",
    ],
  },
  {
    key: "REPUTATIONAL",
    label: "Reputation",
    short: "Reputation",
    slug: "reputation",
    description: "Impersonation, coordinated attacks, fabricated material.",
    headline: "Your name can be attacked without anyone touching you.",
    explainer: [
      "A fake profile in your name, a coordinated pile-on, a fabricated screenshot or video: reputational harm moves fast, crosses borders, and lands on your work, your family and your sense of safety at once.",
      "Preparation is mostly quiet: knowing what is findable about you, claiming your name where it matters, keeping evidence the moment something starts, and knowing who to call. Response is specialist work, and Skif points to people who do it rather than pretending to.",
    ],
  },
  {
    key: "FAMILY",
    label: "Family and loved ones",
    short: "Family",
    slug: "family",
    description: "Children, partners, vulnerable relatives.",
    headline: "The people you love are part of your threat model.",
    explainer: [
      "Children, partners, ageing parents: often the most exposed part of someone's life is someone else's. A child's public profile, a relative who answers every phone call, a household where nobody knows the plan.",
      "Skif treats family safety as shared work: what everyone in the household agrees on, what each person can do at their own age and ability, and what to do for someone who cannot protect themselves.",
    ],
  },
  {
    key: "HEALTH",
    label: "Health and emergencies",
    short: "Health",
    slug: "health",
    description: "First aid and preparedness — never instead of medical care.",
    headline: "The first minutes are yours.",
    explainer: [
      "In a collapse, a bad fall or a fire, the minutes before professionals arrive decide a great deal, and the person there is usually you. First aid, a kit you can find, and a household that knows the emergency numbers are among the most effective safety steps there are.",
      "Skif covers preparedness, never treatment. It complements medical care and never replaces it, and it is not an emergency service: the numbers to call are below.",
    ],
  },
  {
    key: "FINANCIAL",
    label: "Money and assets",
    short: "Money",
    slug: "money",
    description: "Fraud, scams, coercion, access to valuables.",
    headline: "Fraud is a safety problem, not only a money problem.",
    explainer: [
      "Scams are built to hurry you and to isolate you from anyone who would say \u201cwait\u201d. Coercion uses the same levers with a threat behind them. People holding significant assets, including Bitcoin, are targeted for both.",
      "Defences here are procedural: a pause rule for any urgent payment, a second person for large transfers, keys and valuables arranged so that no single moment of pressure can move them.",
    ],
  },
  {
    key: "ENVIRONMENTAL",
    label: "Places and surroundings",
    short: "Places",
    slug: "places",
    description: "Hazards at home or work, the area around you, occasions.",
    headline: "Every place has its own risks.",
    explainer: [
      "A flat, a shop, a club, a route home, an event: each has hazards of its own, from a blocked exit to a protest moving down the street. Places change with the hour, the season and what is happening nearby.",
      "Skif assesses a place as a place: who comes and goes, how it is overlooked, what happens on a known date, and what the people responsible for it can do before, during and after.",
    ],
  },
  {
    key: "INSTITUTIONAL",
    label: "Institutions and rights",
    short: "Rights",
    slug: "rights",
    description: "Dealing with authorities, employers or companies — we point to professionals, never pretend to be one.",
    headline: "Knowing your rights is protective.",
    explainer: [
      "Authorities, employers, landlords and companies hold data about you and power over you. Knowing what they may ask, what you must answer and what you can request back is a form of safety in its own right.",
      "Skif helps you understand where you stand and refers you to independent professionals. It never gives legal advice and never pretends to be a lawyer.",
    ],
  },
  {
    key: "RESILIENCE",
    label: "When things go wrong",
    short: "Resilience",
    slug: "resilience",
    description: "Backup access, trusted contacts, what to do next.",
    headline: "Prevention fails sometimes. Plan for that.",
    explainer: [
      "Resilience is what happens after: a lost phone, a locked account, an incident, an emergency away from home. Whether it is a bad day or a disaster depends on what you arranged before.",
      "That means backup access to what matters, people who know what to do, a written plan somebody else can follow, and a way to reach each other when the usual channels are down.",
    ],
  },
] as const satisfies readonly HarmFamilyDef[];

export type HarmFamily = (typeof HARM_FAMILIES)[number]["key"];
export const HARM_FAMILY_KEYS = HARM_FAMILIES.map((f) => f.key) as [HarmFamily, ...HarmFamily[]];

export function familyLabel(key: HarmFamily): string {
  return HARM_FAMILIES.find((f) => f.key === key)?.label ?? key;
}

export type HarmFamilyEntry = (typeof HARM_FAMILIES)[number];

export function familyBySlug(slug: string): HarmFamilyEntry | undefined {
  return HARM_FAMILIES.find((f) => f.slug === slug);
}
