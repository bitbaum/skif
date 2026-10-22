import type { Guide } from "../../types";

export const BEYOND_PEOPLE_DE: Guide = {
  slug: "nature-travel-sport",
  title: "Risiken, die keine Menschen sind: Natur, Tiere, Reisen und Sport",
  fields: ["ENVIRONMENTAL", "HEALTH", "RESILIENCE"],
  summary: "Lawinen, Hochwasser, Zecken, Kühe, Städte im Ausland und der Sport, den du liebst: gemessen, nicht gefürchtet.",
  photo: "skiTouring",
  statement: "Die meisten Risiken haben kein Gesicht.",
  lead: [
    "Wetter, Gelände, Tiere, eine Stadt, die du nicht kennst, und der Sport, den du liebst, bergen alle Risiken, oft mehr als die Menschen um dich herum. Skif behandelt sie gleich: das Risiko verstehen, verringern, was sich günstig verringern lässt, und dann hinausgehen und leben.",
    "Ein Risiko zu messen heisst nicht, es zu verurteilen. Eine Basejumperin und ein Muay-Thai-Kämpfer nehmen beide ein echtes Risiko für etwas in Kauf, das ihnen wichtig ist. Die Aufgabe ist, seine Grösse zu kennen und zu steuern, was sich steuern lässt.",
  ],
  sections: [
    {
      kind: "table",
      heading: "Naturgefahren in der Schweiz und wo du sie beobachtest",
      anchor: "nature",
      columns: ["Gefahr", "Wo du nachschaust", "Was du tust"],
      rows: [
        ["Lawinen", "Lawinenbulletin des SLF; die App White Risk", "Lies das Bulletin vor jeder Tour abseits der Piste; trag LVS-Gerät, Sonde und Schaufel bei dir und üb damit."],
        ["Unwetter, Starkregen, Hitze", "Warnungen und App von MeteoSchweiz", "Schalt Warnungen für den Ort ein, an dem du wohnst, und für den, an den du gehst."],
        ["Hochwasser und Erdrutsche", "Naturgefahrenwarnungen von Bund und Kantonen", "Wisse, ob dein Zuhause in einer Gefahrenzone liegt; bewahr Wertsachen oberhalb des Kellers auf."],
        ["Erdbeben", "Schweizerischer Erdbebendienst", "Befestige hohe Möbel an den Wänden; wisse, wo du Gas und Wasser abstellen kannst."],
        ["Jede offizielle Warnung", "App Alertswiss", "Eine App für Warnungen von Bund und Kantonen, samt Sirenen und was sie bedeuten."],
      ],
    },
    {
      kind: "definitions",
      heading: "Tiere",
      anchor: "animals",
      items: [
        { term: "Zecken", detail: "Das Bundesamt für Gesundheit empfiehlt den meisten Menschen in den meisten Teilen der Schweiz die Impfung gegen die Zeckenenzephalitis (FSME). Such dich nach Spaziergängen in Gras und Wald ab." },
        { term: "Kühe mit Kälbern", detail: "Auf Alpweiden schützen Mutterkühe ihre Kälber. Halt Abstand, nimm Hunde an die Leine und geh um eine Herde herum statt mitten hindurch." },
        { term: "Hunde", detail: "Renn nicht vor einem Hund weg und starr ihn nicht an; steh seitlich, still, mit den Händen nah am Körper. Bring Kindern dasselbe bei." },
        { term: "Im Ausland", detail: "Tollwut, Schlangen und Insekten sind von Land zu Land verschieden. Lies die Gesundheitshinweise für dein Reiseziel, bevor du gehst, nicht danach." },
      ],
    },
    {
      kind: "prose",
      heading: "Städte und Länder",
      anchor: "travel",
      paragraphs: [
        "Das Risiko unterscheidet sich nach Land, nach Stadt, nach Quartier und nach Uhrzeit. Das Eidgenössische Departement für auswärtige Angelegenheiten veröffentlicht Reisehinweise für jedes Land, und mit seiner App Travel Admin kannst du eine Reise erfassen, damit dich die Botschaft in einer Krise erreichen kann.",
        "Innerhalb einer Stadt ist die beste Quelle eine lokale: Frag im Hotel, bei deiner Gastgeberin oder bei einem Kollegen, welche Gegenden sie meiden und wann. Lern die üblichen Betrügereien gegenüber Touristen an diesem Ort, bevor du ankommst, und kenn die lokale Notrufnummer.",
      ],
    },
    {
      kind: "prose",
      heading: "Der Sport, den du wählst",
      anchor: "sport",
      paragraphs: [
        "Risikoforschende nutzen das Micromort, eine Wahrscheinlichkeit von eins zu einer Million zu sterben, um Tätigkeiten auf einer Skala zu vergleichen. Ein Fallschirmsprung in den Vereinigten Staaten bringt etwa 4,6; ein BASE-Sprung vom Kjerag in Norwegen etwa 430; eine Vollnarkose etwa 10. Die Quellen stehen in der Forschung der Bibliothek zur Wissenschaft der Sicherheit.",
        "Der Tod ist nicht die einzigen Kosten. Kampfsport birgt das langsamere Risiko wiederholter Treffer am Kopf; Ausdauersport birgt Risiken durch Hitze und fürs Herz; Bergsport birgt Gelände und Wetter. Jedes davon verringerst du auf dieselbe Weise: Training, die richtige Ausrüstung, die Verhältnisse lesen und Partnerinnen und Partner, die Nein sagen.",
        "Skif sagt niemandem, welche Risiken es wert sind. Skif hilft dir, ihre Grösse zu sehen, damit die Wahl deine ist, und eine informierte.",
      ],
    },
  ],
};
