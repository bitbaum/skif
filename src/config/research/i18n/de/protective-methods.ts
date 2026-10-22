import { PROTECTIVE_METHODS } from "../../protective-methods";
import type { Research } from "../../types";

export const PROTECTIVE_METHODS_DE: Research = {
  slug: "protective-methods",
  title: "Was Schutzprofis über ihre Methoden veröffentlichen",
  fields: ["PHYSICAL", "RESILIENCE", "ENVIRONMENTAL"],
  summary:
    "Der US Secret Service, die britische Anti-Terror-Polizei, das Schweizer Bedrohungsmanagement und die Wissenschaft der Bedrohungseinschätzung: was öffentlich ist, was die Belege sagen und was sich auf eine Privatperson oder ein kleines Geschäft übertragen lässt.",
  photo: "doorway",
  statement: "Was die Profis tatsächlich veröffentlichen.",
  lead: [
    "Um Schutzdienste ranken sich Mythen. Manche von ihnen veröffentlichen aber auch: Forschung zu Angriffen, Empfehlungen für die Öffentlichkeit und Aussagen darüber, wie sie arbeiten. Dieser Artikel verwendet nur, was veröffentlicht und überprüfbar ist, sagt, wo es nichts gibt, und endet mit dem, was eine Privatperson oder ein kleines Geschäft übernehmen kann.",
  ],
  checked: PROTECTIVE_METHODS.checked,
  sections: [
    {
      kind: "prose",
      heading: "Schichten und Vorausarbeit",
      anchor: "layers",
      paragraphs: [
        "Der US Secret Service beschreibt seine Sicherheitspläne als «mehrschichtig, mit Schutz über 360 Grad», aufgebaut aus «drei konzentrischen Schutzringen – dem inneren, mittleren und äusseren Perimeter» und im Voraus zusammen mit dem Stab der geschützten Person und der lokalen Polizei geplant [1]. Ein pensionierter leitender Agent beschreibt die Schutzaufklärung (Bedrohungen vor einem Anlass finden und einschätzen) als das, was «einen Grossteil der Schutzmethodik des Secret Service bestimmt» [2].",
        "Das Modell funktioniert nur, wenn es umgesetzt wird: Die eigene Untersuchung der Behörde zum Anschlag vom Juli 2024 in Butler, Pennsylvania, nennt Versäumnisse bei der Vorausarbeit [3]. Schichten sind ein Plan, keine Garantie.",
        "Für eine Person oder einen Laden sind die Schichten kleiner, aber die Idee ist dieselbe: über einen Ort nachdenken, bevor du dort bist, die Ausgänge und Wege kennen und im Voraus entscheiden, wer was tut.",
      ],
    },
    {
      kind: "prose",
      heading: "Angriffe kommen selten plötzlich, und selten angekündigt",
      anchor: "behaviour",
      paragraphs: [
        "Die grundlegende Studie der Bedrohungseinschätzung untersuchte 83 Personen, die in den USA prominente Persönlichkeiten angriffen oder sich ihnen in Angriffsabsicht näherten. Ihr Schluss: «In jedem Fall war der Angriff oder Beinahe-Angriff das Ergebnis eines nachvollziehbaren und oft erkennbaren Prozesses des Denkens und Handelns» [4]. Keiner der 43 Attentäter und Angreifer richtete vorher eine direkte Drohung an sein Ziel, während zwei Drittel so sprachen oder schrieben, dass man annehmen konnte, sie erwögen einen Angriff [5].",
        "Spätere Forschung zu 180 Angreifern im öffentlichen Raum ergab, dass 76 % vor dem Angriff «Verhaltensweisen zeigten, die bei anderen Besorgnis auslösten», und dass 64 % ein so besorgniserregendes Verhalten zeigten, dass es «eine sofortige Reaktion hätte auslösen sollen». Die Hälfte war von persönlichen, häuslichen oder beruflichen Kränkungen getrieben, und bei 53 % der Angriffe hatte der Angreifer eine bekannte Verbindung zum Ort [6]. In einer Studie zu Angriffen an Schulen hatten alle Angreifer vorher besorgniserregendes Verhalten gezeigt, und in zwei Dritteln der Fälle sah jemand verbotenes Verhalten, das nicht gemeldet wurde [7].",
        "Dieselben Forschenden warnen davor, daraus Angst zu machen: Die meisten Menschen, die solches Verhalten zeigen, greifen nie an, und «es gibt kein Profil für die Art Mensch, die einen Angriff begehen wird» [6]. Die Lehre ist nicht Misstrauen gegenüber Fremden, sondern Aufmerksamkeit für Verhalten über die Zeit, und eine niedrige Schwelle, es jemandem zu sagen, der handeln kann.",
      ],
    },
    {
      kind: "prose",
      heading: "Fremde lesen funktioniert nicht",
      anchor: "faces",
      paragraphs: [
        "Eine verbreitete Vorstellung ist, dass geschulte Menschen Gefahr in einem Gesicht oder einer Haltung erkennen können. Der US-Rechnungshof GAO prüfte die Belege hinter der Verhaltensüberwachung an Flughäfen und fand, dass sie «nicht stützen, ob Verhaltensindikatoren» Bedrohungen erkennen können, und dass Menschen Täuschung «gleich gut wie oder etwas besser als der Zufall» erkennen [8].",
        "Die Flughafenkontrollen in Israel, oft als Vorbild genannt, setzen offen auf Profiling und Einzelbefragungen; die Berichterstattung, die sie beschreibt, hält auch die demütigende Behandlung arabischer Israelis fest [9]. Wir haben keine wissenschaftlich begutachtete Evaluation gefunden, die zeigt, dass sie besser wirken, und sie werfen eigene Fragen der Diskriminierung auf. Skif empfiehlt sie nicht.",
      ],
    },
    {
      kind: "definitions",
      heading: "Run, Hide, Tell — der offizielle Wortlaut",
      blurb: "Die Empfehlung der britischen Counter Terrorism Policing für einen Waffen- oder Terrorangriff, in ihren eigenen Worten [10][11]. Das US-Gegenstück, Run, Hide, Fight, stellt dieselbe Reihenfolge an den Anfang und das Kämpfen ans Ende, «nur wenn dein Leben unmittelbar in Gefahr ist» [12].",
      anchor: "run-hide-tell",
      items: [
        {
          term: "Run (Flüchten)",
          detail: "«Wenn es sicher ist, ist das die beste Option.» Bestehe darauf, dass andere mit dir gehen, aber lass dich von ihrem Zögern nicht aufhalten. Lass Sachen zurück. Bleib nicht stehen, um zu filmen.",
        },
        {
          term: "Hide (Verstecken)",
          detail: "«Wenn du nicht flüchten kannst, versteck dich.» Stell dein Handy lautlos und den Vibrationsalarm aus, schliess ab und verbarrikadiere, geh von der Tür weg. Sichtschutz heisst nicht, dass du sicher bist: Kugeln können Glas, Backstein, Holz und Metall durchschlagen.",
        },
        {
          term: "Tell (Melden)",
          detail: "Ruf die Polizei an, wenn es sicher ist (117 in der Schweiz, 999 in Grossbritannien): was passiert, wo, die Angreifer, in welche Richtung sie gegangen sind. Halte andere davon ab hineinzugehen, wenn das sicher möglich ist.",
        },
      ],
    },
    {
      kind: "prose",
      heading: "Feindliche Auskundschaftung, und die Kraft eines Grusses",
      anchor: "reconnaissance",
      paragraphs: [
        "Die britische Behörde für Schutzsicherheit definiert feindliche Auskundschaftung als «gezielte Beobachtung mit der Absicht, Informationen zu sammeln, um die Planung einer feindlichen Tat zu unterstützen». Ihre Gegenstrategie lautet verwehren, entdecken, abschrecken: Unvorhersehbare Zeiten und Standorte des Sicherheitspersonals machen Muster schwer erlernbar, und Menschen, die Schaden planen, sind nervöser als gewöhnliche Besucher, was es wahrscheinlicher macht, dass sie auffallen [13].",
        "Ein verwandtes britisches Schulungspaket für Unternehmen, See, Check and Notify, bringt dem Personal bei, das zu nutzen, was es schon hat, darunter das, was es «die Kraft eines Grusses» nennt [14]. Eine freundliche, aufmerksame Begrüssung ist guter Service und gute Sicherheit zugleich.",
      ],
    },
    {
      kind: "prose",
      heading: "Schweiz",
      anchor: "switzerland",
      paragraphs: [
        "Der Lagebericht des Nachrichtendienstes des Bundes beurteilt die Terrorbedrohung in der Schweiz als erhöht, geprägt vor allem von dschihadistisch inspirierten Einzelpersonen, die «mit einfachsten Mitteln» handeln, wobei die Online-Radikalisierung junger Menschen der zentrale Treiber ist [15][16].",
        "Der Kanton Zürich betreibt ein kantonales Bedrohungsmanagement mit dem Ziel, Gewalttaten zu verhindern; es hält fest, dass schwerer zielgerichteter Gewalt oft Warnsignale vorausgehen, und alle können eine Sorge direkt der Kantonspolizei melden. Im Notfall ruf 117 an [17].",
      ],
    },
    {
      kind: "prose",
      heading: "Eine Blutung stoppen",
      anchor: "bleeding",
      paragraphs: [
        "Stop the Bleed, geführt vom American College of Surgeons, lehrt drei Handgriffe: direkten Druck, die Wunde ausstopfen und ein Tourniquet [18]. In einer militärischen Studie mit 232 Verwundeten hing ein Tourniquet, das vor Eintritt des Schocks angelegt wurde, stark mit dem Überleben zusammen (90 % gegenüber 10 %), und keine Gliedmasse ging seinetwegen verloren [19]. Das waren Kriegsverletzungen, keine Stadtstrasse, aber die Fähigkeit ist dieselbe, und man lernt sie an einem Nachmittag.",
      ],
    },
    {
      kind: "prose",
      heading: "Wo die Belege dünn sind",
      anchor: "thin",
      paragraphs: [
        "Die französische GIGN sowie russische und chinesische Schutzdienste veröffentlichen wenig oder nichts Überprüfbares über ihre Methoden. Die Abstammung von Systema aus sowjetischen Spezialeinheiten beruht auf den Darstellungen seiner Gründer [20]; die Ursprünge von Krav Maga bei Imi Lichtenfeld werden von seinen Schulen gut erzählt [21], aber wir haben für keines der beiden Systeme eine kontrollierte Studie zu seiner Wirkung gefunden.",
        "Im Gegensatz dazu fand eine randomisierte Studie zu einem Widerstandsprogramm für Studentinnen (Risiko einschätzen, Gefahr anerkennen und sich verbal und körperlich wehren) ein Einjahresrisiko einer vollendeten Vergewaltigung von 5,2 % gegenüber 9,8 % in der Kontrollgruppe [22]. Methoden, die geprüft wurden, verdienen mehr Gewicht als Methoden mit berühmten Namen.",
      ],
    },
    {
      kind: "cards",
      heading: "Was sich auf dich übertragen lässt",
      anchor: "transfers",
      columns: 2,
      cards: [
        {
          title: "Achte auf Verhalten, nicht auf Aussehen",
          body: "Besorgniserregendes Verhalten über die Zeit ist das Signal [6][7]. Es gibt kein Profil, und Fremde zu lesen, ist kaum besser als Zufall [8].",
        },
        {
          title: "Warte nicht auf eine Drohung",
          body: "Menschen, die eine Bedrohung darstellen, sprechen selten eine aus [5]. Sorge genügt, um es jemandem zu sagen, der handeln kann, etwa dem Bedrohungsmanagement des Kantons Zürich [17].",
        },
        {
          title: "Nimm Kränkungen bei der Arbeit ernst",
          body: "Die Hälfte der Angreifer im öffentlichen Raum handelte aus einer Kränkung, und die meisten hatten eine Verbindung zum Ort [6].",
        },
        {
          title: "Plan im Voraus, im Kleinen",
          body: "Ausgänge, Wege und wer was tut, entschieden, bevor du es brauchst [1][12].",
        },
        {
          title: "Mach dich schwerer lesbar",
          body: "Wechselnde Gewohnheiten und weniger Details online geben einer Auskundschaftung weniger Material [13].",
        },
        {
          title: "Sag Grüezi",
          body: "Aufmerksames, freundliches Personal ist Service und Abschreckung zugleich [13][14].",
        },
        {
          title: "Flüchten, verstecken, dann anrufen",
          body: "Kämpfen ist in jedem offiziellen Programm das letzte Mittel [10][12].",
        },
        {
          title: "Lern, eine Blutung zu stoppen",
          body: "Druck, Ausstopfen, Tourniquet [18][19].",
        },
      ],
    },
  ],
  sources: PROTECTIVE_METHODS.sources,
};
