import type { Guide } from "../../types";

export const SELF_DEFENCE_LADDER_DE: Guide = {
  slug: "self-defence-ladder",
  title: "Zuerst weg: die Leiter der Selbstverteidigung",
  fields: ["PHYSICAL", "RESILIENCE"],
  summary: "Meiden, weggehen, deeskalieren, verteidigen, erholen: in dieser Reihenfolge, und warum genau die Reihenfolge das Entscheidende ist.",
  photo: "parkour",
  statement: "Der beste Kampf ist der, in den du nie geraten bist.",
  lead: [
    "Selbstverteidigung ist eine Leiter, keine Technik. Jede Sprosse kostet mehr und birgt mehr Risiko als die darunter, also steigst du nur so weit, wie du musst: meiden, weggehen, deeskalieren, verteidigen, erholen.",
    "Die Leiter zu kennen, ist auch das, was dich frei leben lässt. Wer weiss, wie er eine schlechte Lage verlassen würde, geht nachts aus, reist und nimmt das Tram nach Hause, ohne Angst mitzutragen.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Die fünf Sprossen",
      anchor: "rungs",
      items: [
        {
          term: "1 · Meiden",
          detail:
            "Die meisten Gefahren sind sichtbar, bevor sie ankommen: eine Gruppe, die verstummt, wenn du näher kommst, jemand, der sich deinem Tempo anpasst, ein Streit, der sich aufbaut. Bemerk es früh und ändere etwas Kleines: den Weg, die Zeit, den Wagen, die Strassenseite. Meiden kostet fast nichts.",
        },
        {
          term: "2 · Weggehen",
          detail:
            "Abstand ist die verlässlichste Verteidigung, die es gibt. Weggehen ist nicht verlieren: Wer nicht da ist, kann nicht verletzt werden. Geh Richtung Licht, Menschen und offene Türen, und geh weiter, bis du an einem sicheren Ort bist, nicht bloss ausser Sicht.",
        },
        {
          term: "3 · Deeskalieren",
          detail:
            "Wenn du nicht weggehen kannst, nimm die Hitze heraus. Offene Hände zwischen dir und dem anderen erhoben, eine ruhige, tiefe Stimme, kurze Sätze, ein Ausweg für euch beide. Gib Eigentum ohne Diskussion her: Ein Handy oder ein Portemonnaie ist ersetzbar, du nicht.",
        },
        {
          term: "4 · Verteidigen",
          detail:
            "Nur wenn es keinen Ausgang und kein Reden mehr gibt. Das Ziel ist nicht zu gewinnen, sondern den Moment zu schaffen, den du zum Weggehen brauchst: kurz, entschlossen, dann weg. Das Gesetz erwartet, dass die Abwehr zum Angriff passt (siehe unten).",
        },
        {
          term: "5 · Erholen",
          detail:
            "Geh an einen sicheren Ort, ruf 117 oder 144 an und schreib auf, was passiert ist, solange es frisch ist: Zeit, Ort, Gesichter, Worte. Lass dich untersuchen, auch wenn es dir gut geht; ein Schock verdeckt Verletzungen. Sprich danach mit jemandem.",
        },
      ],
    },
    {
      kind: "cards",
      heading: "Die Welt sehen wie ein Traceur",
      blurb:
        "Parkour lehrt dich, eine Strasse als Wege statt als Wände zu sehen. Diese Gewohnheit ist die am meisten unterschätzte Fähigkeit der Selbstverteidigung: In einem schlechten Moment kennst du schon drei Wege hinaus.",
      anchor: "parkour",
      columns: 3,
      cards: [
        { title: "Zuerst die Ausgänge", body: "Wenn du eine Bar, einen Zug oder einen Platz betrittst, merk dir zwei Wege hinaus. Das dauert eine Sekunde und wird in wenigen Wochen zur Gewohnheit." },
        { title: "Hindernisse sind Schilde", body: "Ein Tisch, ein parkiertes Auto oder ein Poller zwischen dir und jemand anderem ist Abstand, um den er herumgehen muss, und Zeit für dich." },
        { title: "Lücken und Höhen", body: "Eine niedrige Mauer, ein Zaun, eine Treppe: Orte, an die du schnell kommst und über die ein Verfolger nachdenken muss." },
        { title: "Licht und Menschen", body: "Renn zu einem beleuchteten Laden, einem Taxistand oder einer Menschenmenge, nicht in einen leeren Park oder eine Sackgasse." },
        { title: "Dein Motor", body: "Kannst du 200 Meter sprinten und weiterrennen? Weggehen ist eine körperliche Fähigkeit. Intervallläufe trainieren sie besser als jede Technik." },
        { title: "Schuhe und Hände", body: "Schuhe, in denen du rennen kannst, und Hände, die nicht voller Einkäufe sind, wenn du irgendwo gehst, wo du dich unsicher fühlst." },
      ],
    },
    {
      kind: "prose",
      heading: "Was das Gesetz in der Schweiz von dir verlangt",
      anchor: "law",
      paragraphs: [
        "Artikel 15 des Schweizerischen Strafgesetzbuchs: Wer ohne Recht angegriffen oder unmittelbar mit einem Angriff bedroht wird, darf den Angriff in einer den Umständen angemessenen Weise abwehren. Dasselbe Recht gilt für die Verteidigung einer anderen Person.",
        "Artikel 16: Überschreitet die abwehrende Person die Grenzen der Notwehr, so mildert das Gericht die Strafe; und beruht die Überschreitung auf entschuldbarer Aufregung oder Bestürzung über den Angriff, so handelt sie nicht schuldhaft.",
        "Daraus folgt zweierlei. Die Gefahr zu beenden, ist Abwehr; weiterzumachen, nachdem sie vorbei ist, nicht. Und was angemessen ist, hängt vom Angriff ab: Eine Ohrfeige rechtfertigt keine Waffe. Die Regeln anderer Länder sind anders, manche deutlich. Das ist eine Beschreibung des Gesetzes, keine Rechtsberatung.",
      ],
    },
    {
      kind: "table",
      heading: "Training, das jede Sprosse aufbaut",
      anchor: "training",
      columns: ["Sprosse", "Was sie aufbaut", "In der Akademie"],
      rows: [
        ["Meiden", "Situative Aufmerksamkeit, Gewohnheiten auf dem Weg", "Situative Aufmerksamkeit"],
        ["Weggehen", "Parkour, Intervallläufe, allgemeine Fitness", "Parkour und Flucht"],
        ["Deeskalieren", "Verbale Deeskalation, die Psychologie der Angst", "Deeskalation"],
        ["Verteidigen", "Ein Kampfsport mit echtem Sparring", "Schlag- und Griffkampfkünste"],
        ["Erholen", "Erste Hilfe, Verhalten im Notfall", "Erste Hilfe"],
      ],
    },
    {
      kind: "faq",
      heading: "Fragen, die Leute stellen",
      anchor: "questions",
      items: [
        { question: "Ist Wegrennen feige?", answer: "Nein. Es ist das Ergebnis, auf das jede ernsthafte Selbstverteidigungslehrerin und jeder ernsthafte Lehrer hinarbeitet. Niemand ist verletzt, niemand steht vor Gericht, und du gehst nach Hause." },
        { question: "Soll ich mein Handy hergeben, wenn jemand es verlangt?", answer: "Ja. Wirf es, wenn du kannst, ein Stück von dir weg und geh in die andere Richtung. Eigentum lässt sich ersetzen oder zurückholen; ein Kampf darum kann dein Leben verändern." },
        { question: "Was, wenn ich jemand anderen schütze?", answer: "Dieselbe Leiter gilt für euch beide, und das Gesetz deckt auch die Verteidigung einer anderen Person. Gemeinsam weggehen ist immer noch die erste Wahl." },
        { question: "Macht mich ein Selbstverteidigungskurs sicher?", answer: "Ein Kurs gibt dir Fähigkeiten; Gewohnheiten halten dich sicher. Aufmerksamkeit und Weggehen übst du täglich, ohne Gym." },
      ],
    },
  ],
};
