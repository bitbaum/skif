import { SCIENCE_OF_SAFETY } from "../../science-of-safety";
import type { Research } from "../../types";

export const SCIENCE_OF_SAFETY_DE: Research = {
  slug: "science-of-safety",
  title: "Die Wissenschaft der Sicherheit: was die Belege sagen",
  fields: ["PHYSICAL", "CYBER", "HEALTH", "ENVIRONMENTAL"],
  summary:
    "Warum Kriminalität dort passiert, wo sie passiert, was Beleuchtung und Kameras wirklich bewirken, ob Gegenwehr hilft, Deeskalation, Kontosicherheit, die Schweiz in Zahlen, die ersten Minuten eines Notfalls und wie man Risiken vergleicht.",
  photo: "books",
  statement: "Was wirkt, gemessen.",
  lead: [
    "Viele Sicherheitsratschläge sind Volksweisheit. Dieser Artikel sammelt, was tatsächlich gemessen wurde — systematische Übersichtsarbeiten, randomisierte Studien, nationale Statistiken — mit der Grösse jedes Effekts und seinen Grenzen. Jede Zahl stammt aus der Quelle, die daneben genannt ist.",
  ],
  checked: SCIENCE_OF_SAFETY.checked,
  sections: [
    {
      kind: "prose",
      heading: "Warum Kriminalität dort passiert, wo sie passiert",
      anchor: "where",
      paragraphs: [
        "Die Routine-Aktivitäts-Theorie, 1979 von Cohen und Felson formuliert, erklärt Kriminalität als das Zusammentreffen von drei Dingen: jemandem, der eine Tat begehen will, einem geeigneten Ziel und dem Fehlen einer fähigen Aufsicht [1]. Die situative Kriminalprävention, von Clarke entwickelt, setzt bei den letzten beiden an: Ziele schwerer erreichbar machen und Aufsicht wahrscheinlicher [2].",
        "Der übliche Einwand lautet, Kriminalität verlagere sich einfach anderswohin. Eine Übersicht über 102 Evaluationen fand Verlagerung in 26 % der Beobachtungen und das Gegenteil — Nutzen, der auf benachbarte Orte ausstrahlt — in 27 %; wo es eine Verlagerung gab, war sie meist kleiner als die Wirkung der Massnahme selbst [3].",
      ],
    },
    {
      kind: "prose",
      heading: "Beleuchtung und Kameras",
      anchor: "lighting-cameras",
      paragraphs: [
        "Bessere Strassenbeleuchtung senkte die Kriminalität über 13 Studien hinweg um 20 %, in Grossbritannien stärker als in den USA. Die Kriminalität in der Nacht sank nicht stärker als am Tag, deshalb schreiben die Autoren die Wirkung dem Stolz der Gemeinschaft und informeller sozialer Kontrolle zu, nicht dem Gesehenwerden [4].",
        "Kameras bewirken weniger, als viele denken. Eine Campbell-Übersicht kam zum Schluss, dass Videoüberwachung «eine bescheidene Wirkung auf die Kriminalität hat», am besten auf Parkplätzen wirkt und «keine Wirkung auf das Ausmass von Gewaltkriminalität hat» [5]. Eine Aktualisierung über 40 Jahre fand die grössten und beständigsten Effekte auf Parkplätzen, grössere Effekte, wenn Kameras aktiv überwacht werden, und rät davon ab, Kameras als «alleinstehende» Massnahme einzusetzen [6].",
        "Für eine Wohnung oder einen Laden ist das ein nützlicher Befund: Eine Kamera hilft vor allem nachträglich bei Eigentums- und Fahrzeugdelikten, mit einem echten Preis für die Privatsphäre aller, die sie filmt. Licht, Menschen und Aufmerksamkeit tun mehr für die persönliche Sicherheit.",
      ],
    },
    {
      kind: "prose",
      heading: "Orte gestalten",
      anchor: "design",
      paragraphs: [
        "Kriminalprävention durch Umweltgestaltung (Sichtachsen, natürliche Beobachtung, klare Zuständigkeit für einen Raum) ist weit verbreitet und plausibel. Ihre eigenen Gutachter schreiben, die Beleglage sei «nicht schlüssig und viel kritisiert» [7]. Skif behandelt sie als vernünftige Praxis, nicht als bewiesene Wissenschaft.",
      ],
    },
    {
      kind: "prose",
      heading: "Hilft Gegenwehr?",
      anchor: "resisting",
      paragraphs: [
        "In 27’595 Vorfällen aus der US-Opferbefragung verringerten Selbstschutzhandlungen, mit und ohne Gewalt, im Vergleich zu keiner Gegenwehr die Wahrscheinlichkeit von Eigentumsverlust und Verletzung; wo beides vorkam, folgte die Verletzung nur in 10 % der Fälle auf den Selbstschutz [8]. Speziell bei Vergewaltigung verringerten die meisten Selbstschutzhandlungen das Risiko einer vollendeten Tat, ohne das Risiko weiterer Verletzungen deutlich zu erhöhen [9]. Das sind Beobachtungsdaten aus den USA, keine Experimente.",
        "Die stärksten Belege liefert eine randomisierte Studie zu einem Widerstandsprogramm für 893 Studentinnen: Risiko einschätzen, Gefahr anerkennen und mit verbaler und körperlicher Gegenwehr handeln. Das Einjahresrisiko einer vollendeten Vergewaltigung lag bei 5,2 % gegenüber 9,8 % in der Kontrollgruppe, eine relative Senkung um 46 % [10]. Im späteren regulären Einsatz an fünf Universitäten sanken vollendete Vergewaltigungen nach sechs Monaten um 57 %, allerdings ohne Randomisierung [11].",
      ],
    },
    {
      kind: "prose",
      heading: "Deeskalation",
      anchor: "de-escalation",
      paragraphs: [
        "Bei einer randomisierten Einführung von Deeskalationstraining in der Polizei von Louisville sanken Vorfälle mit Gewaltanwendung um 28 %, Verletzungen von Bürgerinnen und Bürgern um 26 % und Verletzungen von Polizisten um 36 % [12]. Eine Übersicht über 64 Evaluationen aus verschiedenen Berufen fand leichte bis mässige Verbesserungen, warnte aber, dass fast alle Studien von fragwürdiger Qualität waren [13]; in der psychiatrischen Versorgung verbessert Training zuverlässig Wissen und Selbstvertrauen, zu Übergriffen gibt es noch keine belastbaren Schlüsse [14].",
        "Die ehrliche Zusammenfassung: Deeskalation ist der richtige Standard, und die Belege zeigen in die richtige Richtung, aber sie sind jünger als ihre Beliebtheit.",
      ],
    },
    {
      kind: "prose",
      heading: "Konten und Geräte",
      anchor: "accounts",
      paragraphs: [
        "Die Forschung von Google mit der New York University und der UC San Diego ergab, dass ein SMS-Code an eine Wiederherstellungsnummer 100 % der automatisierten Bots, 96 % des massenhaften Phishings und 76 % der gezielten Angriffe abwehrte; eine Bestätigung auf dem Gerät wehrte 99 % des massenhaften Phishings und 90 % der gezielten Angriffe ab; und niemand, der sich nur auf Sicherheitsschlüssel verliess, fiel während der Studie gezieltem Phishing zum Opfer [15]. Microsoft gibt an, ein Konto sei mit Multi-Faktor-Authentifizierung «zu mehr als 99,9 % weniger wahrscheinlich kompromittiert» [16] — eine Zahl des Herstellers ohne veröffentlichte Methode.",
        "Die US-Behörde für Cybersicherheit CISA sagt es klar: Jede Multi-Faktor-Authentifizierung ist besser als keine, und phishingresistente Authentifizierung (FIDO/WebAuthn: Sicherheitsschlüssel und Passkeys) ist «der Goldstandard» [17].",
      ],
    },
    {
      kind: "table",
      heading: "Die Schweiz in Zahlen",
      blurb: "Die neuesten amtlichen Zahlen, die wir vollständig lesen konnten. Meldungen an das Bundesamt für Cybersicherheit sind freiwillig, die tatsächlichen Zahlen sind also höher.",
      anchor: "switzerland",
      columns: ["Mass", "Zahl", "Quelle"],
      rows: [
        ["Digital begangene Straftaten, 2025", "57’761 (−2 %); davon 54’247 Cyber-Wirtschaftskriminalität", "Bundesamt für Statistik [18]"],
        ["Opfer von Cyber-Wirtschaftskriminalität, die online betrogen wurden", "81,2 % von 36’572", "Bundesamt für Statistik [18]"],
        ["Meldungen an das Bundesamt für Cybersicherheit, 2025", "Knapp 65’000 (fünf Jahre zuvor 21’000)", "BACS via Netzwoche [19]"],
        ["Am häufigsten gemeldetes Phänomen, 2025", "Fake-Anrufe im Namen von Behörden, 26 % der Meldungen", "BACS via Netzwoche [19]"],
        ["Gewaltstraftaten, 2025", "49’915 (+2 %)", "Bundesamt für Statistik [18]"],
        ["Vollendete Tötungsdelikte, 2025", "55, davon 61,8 % in einer Partnerschaft oder der Familie", "Bundesamt für Statistik [18]"],
        ["Verletzte bei Unfällen pro Jahr", "Mehr als eine Million; rund 2’400 sterben", "BFU [20][21]"],
        ["Lawinentote", "Im Schnitt 21 pro Jahr über 20 Jahre", "SLF via SRF [22]"],
      ],
      monoColumns: [1],
    },
    {
      kind: "prose",
      heading: "Die ersten Minuten",
      anchor: "first-minutes",
      paragraphs: [
        "Ertrinken ist weltweit die vierthäufigste Todesursache bei Kindern von 1 bis 4 Jahren und die dritthäufigste bei Kindern von 5 bis 14 Jahren [23]. Bei 30’381 beobachteten Herzstillständen in Schweden lag das Überleben nach 30 Tagen bei 10,5 %, wenn jemand vor Ort vor dem Eintreffen der Ambulanz mit der Herz-Lungen-Wiederbelebung begann, und bei 4,0 %, wenn niemand es tat [24].",
        "Bei starken Blutungen hing ein Tourniquet, das vor dem Schock angelegt wurde, bei verwundeten Soldaten stark mit dem Überleben zusammen (90 % gegenüber 10 %) [25], und bei 1’026 zivilen Unfallverletzten war der Einsatz eines Tourniquets unabhängig mit dem Überleben verbunden [26].",
      ],
    },
    {
      kind: "table",
      heading: "Risiken vergleichen: Mikromorts",
      blurb: "Ein Mikromort ist eine Sterbewahrscheinlichkeit von eins zu einer Million. Verschiedene Aktivitäten auf eine Skala zu bringen, macht eine Entscheidung informiert, nicht verboten. Mit ≈ markierte Zahlen haben wir aus den Zahlen der Quelle berechnet.",
      anchor: "micromorts",
      columns: ["Aktivität", "Sterberisiko", "Quelle"],
      rows: [
        ["Vollnarkose (die Narkose, nicht die Operation)", "10 Mikromorts", "Spiegelhalter [27]"],
        ["Fallschirmspringen, pro Sprung (USA, 2025)", "0,46 pro 100’000 Sprünge ≈ 4,6 Mikromorts", "USPA [28]"],
        ["BASE-Jumping, pro Sprung (Kjerag, Norwegen)", "1 auf 2’317 Sprünge ≈ 430 Mikromorts", "Søreide et al. [29]"],
        ["Marathon oder Halbmarathon, Herztod pro Person im Ziel", "0,20 pro 100’000 ≈ 2 Mikromorts", "Kim et al. [30]"],
      ],
      monoColumns: [1],
    },
    {
      kind: "cards",
      heading: "Was das für dich heisst",
      anchor: "means",
      columns: 2,
      cards: [
        {
          title: "Lieber Licht und Aufmerksamkeit als Kameras",
          body: "Beleuchtung und Aufsicht schützen Menschen; Kameras schützen vor allem parkierte Autos, mit einem Preis für die Privatsphäre [4][5][6].",
        },
        {
          title: "Gegenwehr ist meist richtig",
          body: "Selbstschutz verringert in den meisten untersuchten Delikten vollendete Taten und Verletzungen, und trainierte Gegenwehr halbiert das Risiko in der einzigen randomisierten Studie ungefähr [8][10].",
        },
        {
          title: "Phishingresistente Anmeldung",
          body: "Passkeys oder Sicherheitsschlüssel zuerst für deine E-Mail; jeder zweite Faktor ist besser als keiner [15][17].",
        },
        {
          title: "In der Schweiz ist Betrug das Massendelikt",
          body: "Online-Betrug und Fake-Anrufe von «Behörden» dominieren die Meldungen [18][19].",
        },
        {
          title: "Lern Herz-Lungen-Wiederbelebung und Blutstillung",
          body: "Menschen vor Ort verdoppeln die Überlebenschance bei einem Herzstillstand mehr als [24].",
        },
        {
          title: "Miss ein Risiko, bevor du es beurteilst",
          body: "BASE-Jumping ist pro Sprung etwa hundertmal riskanter als Fallschirmspringen; beides sind Entscheidungen, jetzt informierte [28][29].",
        },
      ],
    },
  ],
  sources: SCIENCE_OF_SAFETY.sources,
};
