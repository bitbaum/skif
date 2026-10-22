import type { SitePage } from "@bitbaum/sitekit";

export const PROTECTORS_DE: SitePage = {
  path: "protectors",
  title: "Protectors",
  intro: "Jemand Ruhiges an deiner Seite.",
  sections: [
    {
      kind: "hero",
      eyebrow: "Protectors",
      statement: "Jemand Ruhiges an deiner Seite.",
      lead: [
        "Ein Skif-Protector ist ein geprüfter Profi, den du neben dir haben willst: aufmerksam, gefasst, ausgebildet in Deeskalation und Erster Hilfe. Ausgewählt nach Urteilsvermögen statt nach Grösse, zugeteilt nach dem, worum du gebeten hast, und die Zuteilung wird begründet.",
      ],
      actions: [
        { label: "Protector buchen", href: "/signin?mode=create&from=%2Fbookings%2Fnew" },
        { label: "Protector werden", href: "/join" },
      ],
    },
    {
      kind: "cards",
      heading: "Wofür man einen Protector bucht",
      anchor: "services",
      columns: 2,
      cards: [
        { title: "Abend im Ausgang", body: "Eine ruhige, qualifizierte Person an deiner Seite für einen Abend in der Stadt." },
        { title: "Nach Hause kommen", body: "Begleitung nach Hause nach unerwünschter Aufmerksamkeit oder einer langen Nacht." },
        { title: "Exponierte Person", body: "Unauffälliger Schutz für jemanden mit einem öffentlichen oder finanziellen Profil." },
        { title: "Familie", body: "Eine verlässliche Präsenz für einen Familienausflug oder einen schwierigen Anlass." },
        { title: "Deeskalationspersonal für Lokale", body: "Für Clubs und Lokale: Personal, das entschärft statt konfrontiert." },
        { title: "Personenschutz", body: "Ein ausgebildeter Profi im Personenschutz an deiner Seite, für den Tag oder einen Anlass." },
        { title: "Protector + Fahrer", body: "Ein Protector, der dich auch fährt, von Tür zu Tür." },
        { title: "Fachliche Begleitung", body: "Jemand mit einer bestimmten Qualifikation — medizinisch, digitale Sicherheit, Begleitung verletzlicher Personen." },
      ],
    },
    {
      kind: "definitions",
      heading: "So läuft eine Buchung ab",
      anchor: "booking",
      items: [
        {
          term: "1 · Du fragst an",
          detail: "Sag, was du brauchst, wann, wie lange und ungefähr wo. Der genaue Treffpunkt wird nur dem Protector mitgeteilt, der annimmt.",
        },
        {
          term: "2 · Der Betrieb teilt zu",
          detail: "Nur Protectors, die jede Fähigkeit haben, die der Einsatz braucht, geprüft und am Tag gültig, und die verfügbar sind. Jeder wird gereiht, mit einer Begründung für jeden Punkt.",
        },
        {
          term: "3 · Ein Protector nimmt an",
          detail: "Er sieht, wo ihr euch trefft, aber nie mehr über dich, als der Einsatz braucht.",
        },
        {
          term: "4 · Am Tag selbst",
          detail: "Er meldet sich an, bleibt bei dir und schreibt danach einen Bericht. Im Notfall ruft er 117 oder 144 an; Skif ist kein Notfalldienst.",
        },
        {
          term: "5 · Du bewertest",
          detail: "Respekt, Diskretion und wie sicher du dich gefühlt hast, jedes auf einer eigenen Skala, keine Sterne. Eine Beschwerde wird vertraulich angehört und von einem Menschen entschieden.",
        },
      ],
    },
    {
      kind: "definitions",
      heading: "Was ein Protector nicht ist",
      blurb: "Klar gesagt, damit niemand das Falsche bucht.",
      anchor: "not",
      items: [
        {
          term: "Nicht die Polizei",
          detail: "Ein Protector hat keine polizeilichen Befugnisse. Wenn etwas die Polizei braucht, ruft er 117 an und bleibt bei dir, bis sie da ist.",
        },
        {
          term: "Kein Notfalldienst",
          detail: "Skif kann weder Polizei noch Ambulanz noch Feuerwehr aufbieten. Im Notfall ruf zuerst sie an.",
        },
        {
          term: "Nicht zum Kämpfen da",
          detail: "Die Aufgabe ist, die Lage ruhig zu halten und dich sicher: Abstand, Deeskalation, Weggehen. Gewalt ist das letzte Mittel, im Rahmen des Gesetzes, und nie der Plan.",
        },
        {
          term: "Keine Überwachung",
          detail: "Der Dienst ist jemand bei dir, nicht jemand, der andere beobachtet. Der Bericht eines Protectors nach einem Einsatz besteht aus geschriebenen Worten; Skif sammelt keine Fotos und kein Video.",
        },
        {
          term: "Keine Garantie",
          detail: "Niemand kann versprechen, dass nichts passiert. Ein Protector macht das Wahrscheinliche unwahrscheinlicher und die schlimmen Momente kürzer.",
        },
      ],
    },
    {
      kind: "prose",
      heading: "Waffen",
      anchor: "weapons",
      paragraphs: [
        "Bei den meisten Einsätzen von Skif ist überhaupt keine Waffe im Spiel: Die Werkzeuge eines Protectors sind Urteilsvermögen, Abstand, Deeskalation und Erste Hilfe. Ein Protector trägt nur dort eine Waffe, wo er die gesetzliche Bewilligung zum Tragen hat und der Einsatz es verlangt.",
      ],
    },
    {
      kind: "faq",
      heading: "Häufige Fragen",
      anchor: "questions",
      items: [
        {
          question: "Was kostet es?",
          answer: "Der Betrieb macht für jede Buchung eine Offerte; einen festen Preis gibt es noch nicht. Die Zahlung regelt der Betrieb direkt mit dir.",
        },
        {
          question: "Wie schnell kann jemand kommen?",
          answer: "Skif verspricht keine sofortige Verfügbarkeit. Buch so früh wie möglich; eine Anfrage, die niemandem zugeteilt wurde, läuft zur Startzeit ab, statt dich warten zu lassen.",
        },
        {
          question: "Kann ich die Person wählen?",
          answer: "Du legst fest, was dir wichtig ist, etwa Sprachen, Erste Hilfe oder ein Fahrer, und ob die Präsenz diskret oder sichtbar sein soll. Der Betrieb teilt innerhalb davon zu.",
        },
      ],
    },
  ],
};
