import { DRIVING as EN } from "../../driving";
import type { Guide } from "../../types";

export const DRIVING: Guide = {
  slug: "driving",
  title: "Al volante, in sella e sulla strada",
  fields: ["PHYSICAL", "HEALTH"],
  summary: "La strada è dove la maggior parte delle persone corre il rischio quotidiano più grande. Cosa dicono le cifre svizzere sulle cause degli incidenti gravi, i limiti per l'alcol e le abitudini che cambiano le probabilità.",
  photo: "nightRoad",
  statement: "Il telefono può aspettare. La strada no.",
  lead: [
    "Nel 2025 sulle strade svizzere sono morte 214 persone e 3'935 sono rimaste gravemente ferite [1]. Per la maggior parte delle persone il tragitto in auto verso il lavoro è un rischio più grande di qualsiasi cosa incontreranno per strada di notte, e riceve una frazione dell'attenzione.",
    "Le cause non sono un mistero. L'ufficio federale delle strade le indica ogni anno, e quasi tutte sono scelte fatte nei secondi prima di un incidente.",
  ],
  sections: [
    {
      kind: "table",
      heading: "Cosa causa gli incidenti gravi",
      blurb: "Come le indica l'Ufficio federale delle strade per il 2025, secondo chi era coinvolto [1].",
      anchor: "causes",
      columns: ["Chi", "Cause principali"],
      rows: [
        ["Automobili", "Mancata concessione della precedenza, disattenzione, distrazione"],
        ["Motociclette", "Soprattutto velocità e disattenzione"],
        ["Pedoni", "Soprattutto il loro stesso comportamento"],
      ],
    },
    {
      kind: "cards",
      heading: "La distrazione, in cifre",
      anchor: "distraction",
      columns: 3,
      cards: [
        { title: "3,6×", body: "Usare il telefono mentre guidi moltiplica per 3,6 il rischio di incidente, secondo l'Ufficio prevenzione infortuni (UPI) [2]." },
        { title: "31%", body: "Degli incidenti stradali gravi in Svizzera ha come causa principale o concomitante la disattenzione o la distrazione: 1'201 persone gravemente ferite o uccise nel 2025 [3]." },
        { title: "+⅓", body: "La distrazione allunga il tuo tempo di reazione di circa un terzo [3]. A 50 km/h sono metri di strada che percorri prima che il tuo piede si muova." },
      ],
    },
    {
      kind: "table",
      heading: "I limiti per l'alcol in Svizzera",
      blurb: "Alcol nel sangue (‰) e l'equivalente nell'aria espirata che misura la polizia [4]. Un incidente grave su otto coinvolge l'alcol [5].",
      anchor: "alcohol",
      columns: ["Chi", "Limite", "Cosa significa"],
      rows: [
        ["La maggior parte dei conducenti", "0,5‰ (0,25 mg/l nell'aria espirata)", "Da qui sei legalmente inabile alla guida"],
        ["La maggior parte dei conducenti", "0,8‰ (0,4 mg/l nell'aria espirata)", "Guida in stato di ebrietà qualificata"],
        ["Allievi conducenti e titolari della licenza in prova", "0,1‰ (0,05 mg/l nell'aria espirata)", "In pratica zero, a ogni tragitto"],
        ["Conducenti di bus e camion, maestri conducenti", "0,1‰ (0,05 mg/l nell'aria espirata)", "In pratica zero, durante il lavoro"],
      ],
    },
    {
      kind: "definitions",
      heading: "Abitudini che cambiano le probabilità",
      anchor: "habits",
      items: [
        { term: "Il telefono fuori portata", detail: "Nel cassetto portaoggetti o sul sedile posteriore, oppure in modalità «non disturbare» mentre guidi. Imposta il percorso prima di partire." },
        { term: "Nel dubbio, dai la precedenza", detail: "La mancata concessione della precedenza è la prima causa che l'ufficio delle strade indica per gli incidenti in auto [1]. Nel dubbio, passa prima l'altra auto." },
        { term: "Pianifica il bicchiere, o chi guida", detail: "Se berrai, decidi prima di uscire come tornerai a casa. Un taxi costa meno di qualsiasi alternativa." },
        { term: "Stanco vuol dire inabile", detail: "In un lungo viaggio, fermati prima di averne bisogno. Una breve pausa ogni paio d'ore costa pochi minuti." },
        { term: "Su due ruote", detail: "Velocità e disattenzione sono le cause indicate per le motociclette [1]. Equipaggiamento protettivo completo, e guida come se nessuno ti avesse visto." },
        { term: "A piedi", detail: "Testa alta e telefono giù agli attraversamenti e quando scendi da un tram. Gli incidenti dei pedoni derivano soprattutto dal comportamento dei pedoni stessi [1]." },
      ],
    },
    {
      kind: "prose",
      heading: "Se sei il primo sul luogo di un incidente",
      anchor: "crash",
      paragraphs: [
        "Prima di tutto metti in sicurezza il luogo: luci di emergenza accese, un giubbotto ad alta visibilità addosso e il triangolo posato dietro l'incidente. Poi chiama il 144 per i feriti, o il 117 per la polizia, e di' dove ti trovi nel modo più preciso possibile.",
        "Non spostare una persona ferita a meno che non sia in pericolo immediato dove si trova. Parlale, tienila al caldo e aspetta con lei. Il primo soccorso che hai esercitato vale molto più di quello che hai solo letto; i corsi di primo soccorso dell'Accademia sono il punto da cui partire.",
      ],
    },
  ],
  sources: EN.sources,
  checked: EN.checked,
};
