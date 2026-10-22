import type { SitePage } from "@bitbaum/sitekit";

export const JOIN_DE: SitePage = {
  path: "join",
  title: "Mitmachen",
  intro: "Protectors, Schulen und Fachleute.",
  sections: [
    {
      kind: "hero",
      eyebrow: "Mitmachen",
      statement: "Arbeite mit Skif.",
      lead: [
        "Skif ist ein neues Sicherheitsunternehmen, gebaut auf Urteilsvermögen statt Einschüchterung. Es braucht drei Arten von Menschen: Protectors, die bei denen sind, die darum bitten, Schulen, die lehren, was Protectors lernen, und Fachleute für die Schritte, die ein Sicherheitsplan empfiehlt.",
      ],
      actions: [
        { label: "Als Protector bewerben", href: "/signin?mode=create&from=%2Fprotector" },
        { label: "Partner von Skif werden", href: "mailto:cato@orangecat.ch?subject=Skif%20%E2%80%94%20partnership" },
      ],
    },
    {
      kind: "definitions",
      heading: "Was einen guten Protector ausmacht",
      blurb: "Jemand, den Menschen an ihrer Seite wollen. Körperliches Können zählt, und es zählt am wenigsten.",
      anchor: "protector",
      items: [
        { term: "Urteilsvermögen", detail: "Eine Situation früh lesen und das Leiseste wählen, das wirkt." },
        { term: "Ruhe unter Druck", detail: "Gefasst bleiben, wenn jemand anderes es nicht ist, und ihn gefasster machen." },
        { term: "Deeskalation", detail: "Konflikte mit Worten, Abstand und Haltung beenden statt mit Gewalt." },
        { term: "Erste Hilfe", detail: "Die nützliche Person sein in den Minuten, bevor Hilfe kommt." },
        { term: "Sorgfalt", detail: "Diskretion, Respekt und ein Gespür für Menschen, die etwas durchgemacht haben." },
        {
          term: "Sprachen",
          detail: "Englisch, Deutsch, Schweizerdeutsch, Französisch, Italienisch, Rätoromanisch, Spanisch, Portugiesisch, Arabisch, Chinesisch, Japanisch, Koreanisch, Russisch: Jede erweitert, wem du helfen kannst.",
        },
      ],
    },
    {
      kind: "prose",
      heading: "So läuft die Bewerbung",
      anchor: "apply",
      paragraphs: [
        "Melde dich mit OrangeCat an und beschreib deine Erfahrung; Skif kann dir helfen, sie aus ein paar Sätzen auszufüllen. Der Betrieb prüft jede Bewerbung und jede Fähigkeit anhand ihres Nachweises.",
        "Sobald du angenommen bist, siehst du Einsätze, die dir zugeteilt wurden, mit dem Grund für die Zuteilung. Wo ihr euch trefft, siehst du erst, nachdem du angenommen hast, und darüber hinaus nie, wer die Person ist.",
      ],
    },
    {
      kind: "cards",
      heading: "Schulen und Trainer",
      blurb: "Die Akademie wird manche Kurse selbst unterrichten und für die anderen an Partnerschulen verweisen. Wenn du Erste Hilfe, Parkour, einen Kampfsport, Waffen auf einem bewilligten Schiessstand, Fahren oder digitale Sicherheit unterrichtest, würden wir gern mit dir reden.",
      anchor: "schools",
      columns: 3,
      cards: [
        { title: "Medizin", body: "Erste Hilfe, Notfalleinsatz und weiterführende Kurse." },
        { title: "Kampfkunst und Selbstverteidigung", body: "Jiu-Jitsu, Muay Thai, Krav Maga, Festhalten und Kontrolle." },
        { title: "Waffen", body: "Bewilligte Schiessstände und Instruktoren für Schusswaffen; Stock- und Klingenkünste; Abwehr gegen Waffen." },
        { title: "Fahren", body: "Defensives und professionelles Fahren." },
        { title: "Digital", body: "Kontosicherheit, Privatsphäre und die sichere Aufbewahrung von Schlüsseln." },
        { title: "Menschen", body: "Traumasensible Betreuung, Konflikt- und Krisenpsychologie." },
      ],
    },
    {
      kind: "cards",
      heading: "Fachleute",
      blurb: "Die Arten von Hilfe, die ein Sicherheitsplan schon heute empfiehlt. Wenn Menschen diese Schritte gehen, wird Skif sie an Fachleute verweisen, denen es vertraut.",
      anchor: "specialists",
      columns: 3,
      cards: [
        { title: "Ein Schlosser oder Installateur", body: "Genannt in 6 Schritten, die ein Sicherheitsplan empfehlen kann." },
        { title: "Eine Alarmzentrale", body: "Genannt in 1 Schritt, den ein Sicherheitsplan empfehlen kann." },
        { title: "Eine Trainerin oder ein Trainer für Deeskalation", body: "Genannt in 1 Schritt, den ein Sicherheitsplan empfehlen kann." },
        { title: "Eine Fachperson für Cybersicherheit", body: "Genannt in 3 Schritten, die ein Sicherheitsplan empfehlen kann." },
        { title: "Eine Fachperson für Privatsphäre und Datenlöschung", body: "Genannt in 2 Schritten, die ein Sicherheitsplan empfehlen kann." },
        { title: "Eine Fachperson für Ruf- und Krisenkommunikation", body: "Genannt in 1 Schritt, den ein Sicherheitsplan empfehlen kann." },
        { title: "Eine Trainerin oder ein Trainer für Erste Hilfe und Vorsorge", body: "Genannt in 3 Schritten, die ein Sicherheitsplan empfehlen kann." },
        {
          title: "Eine unabhängige Anwältin oder ein Anwalt — Skif vermittelt, berät aber nie rechtlich",
          body: "Genannt in 1 Schritt, den ein Sicherheitsplan empfehlen kann.",
        },
      ],
    },
  ],
};
