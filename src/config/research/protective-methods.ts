import type { Research } from "./types";

export const PROTECTIVE_METHODS: Research = {
  slug: "protective-methods",
  title: "What protective professionals publish about their methods",
  fields: ["PHYSICAL", "RESILIENCE", "ENVIRONMENTAL"],
  summary:
    "The US Secret Service, UK counter-terrorism policing, Swiss threat management and the science of threat assessment: what is public, what the evidence says, and what transfers to a private person or a small business.",
  photo: "doorway",
  statement: "What the professionals actually publish.",
  lead: [
    "Protective services are surrounded by myth. Some of them also publish: research on attacks, guidance for the public, and testimony about how they work. This article uses only what is published and checkable, says where nothing is, and ends with what a private person or a small business can borrow.",
  ],
  checked: "2026-10-21",
  sections: [
    {
      kind: "prose",
      heading: "Layers and advance work",
      anchor: "layers",
      paragraphs: [
        "The US Secret Service describes its security plans as “multi-layered, providing 360 degrees of protection”, built as “three concentric rings of protection – the inner, middle, and outer perimeter”, and planned in advance together with the protected person's staff and local police [1]. A retired senior agent describes protective intelligence (finding and assessing threats before an event) as what “drives much of the Secret Service's protective methodology” [2].",
        "The model only works when it is carried out: the agency's own review of the July 2024 attack in Butler, Pennsylvania names failures in its protective advance [3]. Layers are a plan, not a guarantee.",
        "For a person or a shop the layers are smaller but the idea is the same: think about a place before you are in it, know the exits and routes, and decide in advance who does what.",
      ],
    },
    {
      kind: "prose",
      heading: "Attacks are rarely sudden, and rarely announced",
      anchor: "behaviour",
      paragraphs: [
        "The founding study of threat assessment looked at 83 people who attacked or approached to attack prominent public figures in the United States. Its conclusion: “In every case, the attack or near-attack was the end result of an understandable, and often discernible, process of thinking and action” [4]. None of the 43 assassins and attackers communicated a direct threat to their target beforehand, while two-thirds spoke or wrote in a way that suggested they were considering an attack [5].",
        "Later research on 180 attackers in public spaces found that 76% “exhibited behaviors that elicited concern in others” before the attack, and that 64% showed behaviour so concerning it “should have been met with an immediate response”. Half were driven by personal, domestic or workplace grievances, and in 53% of attacks the attacker had a known link to the place [6]. In a study of attacks at schools, every attacker had shown concerning behaviour beforehand, and in two-thirds of cases someone saw prohibited behaviour that was not reported [7].",
        "The same researchers warn against turning this into fear: most people who show such behaviour never attack, and “there is no profile for the type of person who will commit an attack” [6]. The lesson is not suspicion of strangers but attention to behaviour over time, and a low threshold for telling someone who can act.",
      ],
    },
    {
      kind: "prose",
      heading: "Reading strangers does not work",
      anchor: "faces",
      paragraphs: [
        "A popular idea is that trained people can spot danger in a face or a posture. The US Government Accountability Office reviewed the evidence behind airport behaviour screening and found that it “does not support whether behavioral indicators” can identify threats, and that people detect deception at “the same as or slightly better than chance” [8].",
        "Airport screening in Israel, often cited as the model, openly uses profiling and individual questioning; the reporting that describes it also records humiliating treatment of Israeli Arabs [9]. No peer-reviewed evaluation we could find shows that it works better, and it raises discrimination concerns of its own. Skif does not recommend it.",
      ],
    },
    {
      kind: "definitions",
      heading: "Run, Hide, Tell — the official wording",
      blurb: "UK Counter Terrorism Policing's advice for a weapons or terror attack, in its own words [10][11]. The US equivalent, Run, Hide, Fight, puts the same order first and fighting last, “only when your life is in imminent danger” [12].",
      anchor: "run-hide-tell",
      items: [
        { term: "Run", detail: "“If it's safe, this is the best option.” Insist others leave with you, but don't let their indecision slow you down. Leave belongings behind. Do not stop to film." },
        { term: "Hide", detail: "“If you can't run, hide.” Silence your phone and turn off vibrate, lock and barricade, move away from the door. Cover from view does not mean you are safe: bullets can go through glass, brick, wood and metal." },
        { term: "Tell", detail: "Call the police when it is safe (117 in Switzerland, 999 in the UK): what is happening, where, the attackers, the direction they went. Stop others entering if it is safe to do so." },
      ],
    },
    {
      kind: "prose",
      heading: "Hostile reconnaissance, and the power of hello",
      anchor: "reconnaissance",
      paragraphs: [
        "Britain's protective-security authority defines hostile reconnaissance as “purposeful observation with the intention of collecting information to inform the planning of a hostile act”. Its counter-strategy is to deny, detect and deter: unpredictable timing and placement of security makes patterns hard to learn, and people planning harm are more anxious than ordinary visitors, which makes them more likely to be noticed [13].",
        "A related UK training package for businesses, See, Check and Notify, teaches staff to use what they already have, including what it calls “the power of hello” [14]. A friendly, attentive greeting is good service and good security at once.",
      ],
    },
    {
      kind: "prose",
      heading: "Switzerland",
      anchor: "switzerland",
      paragraphs: [
        "The Federal Intelligence Service's annual report assesses the terrorist threat in Switzerland as elevated, shaped mainly by jihadist-inspired individuals acting “with the simplest means”, with online radicalisation of young people as the central driver [15][16].",
        "Canton Zürich runs a cantonal threat-management service whose aim is to prevent acts of violence; it notes that warning signs often come before serious targeted violence, and anyone can bring a concern directly to the cantonal police. In an emergency, call 117 [17].",
      ],
    },
    {
      kind: "prose",
      heading: "Stopping a bleed",
      anchor: "bleeding",
      paragraphs: [
        "Stop the Bleed, run by the American College of Surgeons, teaches three actions: direct pressure, packing the wound, and a tourniquet [18]. In a military study of 232 casualties, tourniquets applied before shock set in were strongly associated with survival (90% against 10%), and no limbs were lost because of them [19]. That was war trauma, not a city street, but the skill is the same and it takes an afternoon to learn.",
      ],
    },
    {
      kind: "prose",
      heading: "Where the evidence is thin",
      anchor: "thin",
      paragraphs: [
        "France's GIGN, Russian and Chinese protective services publish little or nothing about their methods that can be checked. Systema's lineage from Soviet special forces rests on its founders' own accounts [20]; Krav Maga's origins with Imi Lichtenfeld are well told by its schools [21], but we found no controlled study of either system's effect.",
        "By contrast, a randomised trial of a resistance programme for university women (assessing risk, acknowledging danger, and resisting verbally and physically) found a one-year risk of completed rape of 5.2% against 9.8% in the control group [22]. Methods that have been tested deserve more weight than methods with famous names.",
      ],
    },
    {
      kind: "cards",
      heading: "What transfers to you",
      anchor: "transfers",
      columns: 2,
      cards: [
        { title: "Notice behaviour, not appearance", body: "Concerning behaviour over time is the signal [6][7]. There is no profile, and reading strangers is close to chance [8]." },
        { title: "Don't wait for a threat", body: "People who pose a threat rarely make one [5]. Concern is enough to tell someone who can act, such as Zürich's threat-management service [17]." },
        { title: "Take grievances seriously at work", body: "Half of attackers in public spaces acted on a grievance, and most had a link to the place [6]." },
        { title: "Plan in advance, on a small scale", body: "Exits, routes and who does what, decided before you need them [1][12]." },
        { title: "Be harder to read", body: "Varied routines and fewer details online give reconnaissance less to work with [13]." },
        { title: "Say hello", body: "Attentive, friendly staff are both service and deterrence [13][14]." },
        { title: "Escape, hide, then call", body: "Fighting is the last resort in every official programme [10][12]." },
        { title: "Learn to stop a bleed", body: "Pressure, packing, tourniquet [18][19]." },
      ],
    },
  ],
  sources: [
    { title: "Written testimony of Director Kimberly Cheatle to the House Oversight Committee", publisher: "US Secret Service", year: 2024, url: "https://secretservice.gov/newsroom/releases/2024/07/written-testimony-director-kimberly-cheatle-oversight-committee-attempted" },
    { title: "How the Secret Service investigates threats before they become attacks (Donald J. Mihalek)", publisher: "Police1", year: 2026, url: "https://www.police1.com/federal-law-enforcement/how-the-secret-service-investigates-threats-before-they-become-attacks" },
    { title: "July 13 Mission Assurance Report Summary", publisher: "US Secret Service", year: 2024, url: "https://www.secretservice.gov/sites/default/files/reports/2024-09/FOR-RELEASE-U.S-Secret-Service-July-13-Mission-Assurance-Report-Summary.pdf" },
    { title: "Assassination in the United States: An Operational Study of Recent Assassins, Attackers, and Near-Lethal Approachers (Fein & Vossekuil)", publisher: "Journal of Forensic Sciences", year: 1999, url: "https://www.ojp.gov/ncjrs/virtual-library/abstracts/assassination-united-states-operational-study-recent-assassins" },
    { title: "Protective Intelligence and Threat Assessment Investigations (Fein & Vossekuil)", publisher: "National Institute of Justice", year: 2000, url: "https://www.ojp.gov/txtfiles1/nij/179981.txt" },
    { title: "Mass Attacks in Public Spaces: 2016–2020", publisher: "US Secret Service National Threat Assessment Center", year: 2023, url: "https://www.secretservice.gov/sites/default/files/reports/2023-01/usss-ntac-maps-2016-2020.pdf" },
    { title: "Protecting America's Schools: A U.S. Secret Service Analysis of Targeted School Violence", publisher: "US Secret Service National Threat Assessment Center", year: 2019, url: "https://www.secretservice.gov/newsroom/releases/2019/11/secret-service-releases-new-research-school-violence" },
    { title: "Aviation Security: TSA Should Limit Future Funding for Behavior Detection Activities (GAO-14-159)", publisher: "US Government Accountability Office", year: 2013, url: "https://www.gao.gov/products/GAO-14-159" },
    { title: "Israeli airport security methods studied", publisher: "Associated Press via NBC News", year: 2007, url: "https://www.nbcnews.com/id/wbna18559837" },
    { title: "Run Hide Tell", publisher: "Counter Terrorism Policing (UK)", year: 2026, url: "https://www.counterterrorism.police.uk/runhidetell/" },
    { title: "Run Hide Tell — advice and guidance", publisher: "ProtectUK", year: 2026, url: "https://www.protectuk.police.uk/advice-and-guidance/response/run-hide-tell" },
    { title: "Active Shooter: How to Respond", publisher: "US Department of Homeland Security", year: 2008, url: "https://www.dhs.gov/xlibrary/assets/active_shooter_booklet.pdf" },
    { title: "Hostile Reconnaissance: Understanding and Countering the Threat", publisher: "CPNI (now NPSA)", year: 2016, url: "https://www.psni.police.uk/sites/default/files/2022-09/understanding-hostile-reconnaissance-understanding-and-countering-the-threat.pdf" },
    { title: "Security training package empowers staff to See, Check and Notify (SCaN)", publisher: "NaCTSO, GOV.UK", year: 2019, url: "https://www.gov.uk/government/news/security-training-package-empowers-staff-to-see-check-and-notify-scan" },
    { title: "Switzerland's Security 2025 (Federal Council press release)", publisher: "Swiss Federal Council / Federal Intelligence Service", year: 2025, url: "https://www.admin.ch/en/newnsb/XW_TSsOgTLf0-xDTA5RAp" },
    { title: "Sicherheit Schweiz 2026 (Medienmitteilung)", publisher: "Swiss Federal Council / Federal Intelligence Service", year: 2026, url: "https://www.admin.ch/de/newnsb/jyRmuld1hBVy" },
    { title: "Gewaltschutz & Bedrohungsmanagement", publisher: "Kanton Zürich / Kantonspolizei Zürich", year: 2026, url: "https://www.zh.ch/de/sicherheit-justiz/delikte-praevention/gewalt-extremismus/kantonales-bedrohungsmanagement.html" },
    { title: "Stop the Bleed training", publisher: "American College of Surgeons", year: 2026, url: "https://www.stopthebleed.org/training/" },
    { title: "Survival with emergency tourniquet use to stop bleeding in major limb trauma (Kragh et al.)", publisher: "Annals of Surgery 249(1)", year: 2009, url: "https://www.naemt.org/docs/default-source/education-documents/tccc/tccc-updates_092017/tccc-reference-materials/07-tccc-key-publications-(abstracts)/kragh-survival-with-emerg-tourniquets-ann-surg-2009.pdf" },
    { title: "Head Instructors", publisher: "Systema Headquarters", year: 2026, url: "https://russianmartialart.com/founders.php" },
    { title: "The History of Krav Maga", publisher: "Krav Maga Worldwide", year: 2026, url: "https://www.kravmaga.com/the-history-of-krav-maga/" },
    { title: "Efficacy of a Sexual Assault Resistance Program for University Women (Senn et al.)", publisher: "New England Journal of Medicine 372", year: 2015, url: "https://ojp.gov/ncjrs/virtual-library/abstracts/efficacy-sexual-assault-resistance-program-university-women" },
  ],
};
