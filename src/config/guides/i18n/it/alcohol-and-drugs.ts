import { ALCOHOL_AND_DRUGS as EN } from "../../alcohol-and-drugs";
import type { Guide } from "../../types";

export const ALCOHOL_AND_DRUGS: Guide = {
  slug: "alcohol-and-drugs",
  title: "Alcol e droghe: ridurre i danni",
  fields: ["HEALTH", "PHYSICAL"],
  summary: "Cosa fare prima, durante e dopo una serata con alcol o altre droghe: il drug checking a Zurigo, le poche regole che evitano la maggior parte delle emergenze e come prenderti cura di chi ha esagerato.",
  photo: "festival",
  statement: "Nessuno dovrebbe morire per una serata fuori.",
  lead: [
    "Skif non dice agli adulti cosa mettere nel proprio corpo. Gli importa che il giorno dopo si sveglino. La politica svizzera in materia di droghe è costruita allo stesso modo: prevenzione, terapia e repressione, e accanto a esse la riduzione dei danni, un pilastro a sé [1].",
    "La maggior parte dei morti e dei feriti in una serata fuori viene da una breve lista: non sapere cosa c'è in una pastiglia o in una polvere, mescolare sostanze, riprenderne troppo presto, essere soli quando le cose vanno male, e chi è vicino non sapere cosa fare. Ognuna di queste ha una risposta semplice.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Prima: sapere cosa hai",
      anchor: "before",
      items: [
        {
          term: "Il drug checking a Zurigo",
          detail:
            "Il Drogeninformationszentrum della città, con il nome Saferparty, analizza chimicamente le sostanze e discute il risultato con te. È gratuito e anonimo, richiede un appuntamento e si trova alla Wasserwerkstrasse 17 e alla Langstrasse 14, oltre che ad alcune feste e festival [2]. Gli orari cambiano; controlla la pagina prima di andare.",
        },
        { term: "Decidi il tuo limite da sobrio", detail: "Quanto, e quando ti fermi. Una decisione presa alle 22:00 è migliore di una presa alle 02:00." },
        { term: "Mangia, e prevedi l'acqua", detail: "Un pasto prima, e acqua tra un bicchiere e l'altro. Rallenta la serata senza finirla." },
        { term: "Prima pianifica il ritorno a casa", detail: "Non guidare mai. In Svizzera il limite generale è 0,5‰ e i neopatentati e i conducenti professionali non possono guidare affatto sotto l'influsso dell'alcol; la guida sulla guida ha i dettagli [6]." },
      ],
    },
    {
      kind: "cards",
      heading: "Durante: quattro regole che evitano la maggior parte delle emergenze",
      anchor: "during",
      columns: 2,
      cards: [
        { title: "Non mescolare", body: "Il primo consiglio di Saferparty per quasi ogni sostanza: evita di mescolarla con altre sostanze psicoattive, o sappi cosa fa la combinazione [3]. Questo vale anche per l'alcol." },
        { title: "Poco, e aspetta", body: "Prendine una piccola quantità e non riprenderne troppo presto; una nuova dose aumenta il rischio di overdose [3]. Gli effetti possono arrivare più tardi di quanto ti aspetti." },
        { title: "Mai da solo", body: "Non consumare da solo, e di' a chi ti sta intorno cosa hai preso [3], così che, se succede qualcosa, possano dirlo all'ambulanza." },
        { title: "Chiama presto", body: "Se qualcuno sta male, resta con lui e chiama il 144 [3]. Chiamare troppo presto non costa nulla; chiamare troppo tardi è il modo in cui si muore." },
      ],
    },
    {
      kind: "table",
      heading: "Segni di intossicazione da alcol",
      blurb: "Anche uno solo di questi in qualcuno che ha bevuto è un motivo per chiamare il 144 [4].",
      anchor: "signs",
      columns: ["Segno", "Cosa vedi"],
      rows: [
        ["Confusione", "Non sa dove si trova, non riesce a seguire una domanda semplice"],
        ["Parola e movimenti", "Biascica le parole, non riesce a coordinare i movimenti"],
        ["Vomito", "Vomita, soprattutto se è assonnato"],
        ["Pelle", "Pallida o bluastra"],
        ["Respiro", "Lento o irregolare"],
        ["Convulsioni", "Una crisi di qualsiasi tipo"],
        ["Incoscienza", "Non si riesce a svegliarlo"],
      ],
    },
    {
      kind: "definitions",
      heading: "Dopo: prendersi cura di qualcuno",
      anchor: "after",
      items: [
        { term: "Resta con lui", detail: "Non lasciare mai solo a smaltire qualcuno che è molto ubriaco o fatto [4]." },
        { term: "Posizione laterale di sicurezza", detail: "Se ha perso conoscenza, mettilo su un fianco così che non possa soffocare con il vomito, e continua a controllare che respiri [4]." },
        { term: "Tienilo al caldo", detail: "Una giacca o una coperta. Il freddo peggiora le cose [4]." },
        { term: "Cosa non fare", detail: "Niente altro alcol, niente caffè, niente doccia fredda, e non cercare di farlo vomitare [4]. Nessuna di queste cose fa passare la sbornia; alcune peggiorano la situazione." },
        { term: "Chi chiamare", detail: "Il 144 per un'ambulanza. Il 145 è Tox Info Suisse, il servizio d'informazione sui veleni, che risponde giorno e notte [5]: chiamalo quando non sei sicuro che qualcosa di ingerito sia pericoloso e la persona non è in pericolo immediato." },
      ],
    },
    {
      kind: "faq",
      heading: "Domande frequenti",
      anchor: "questions",
      items: [
        { question: "Chiamare il 144 metterà nei guai il mio amico?", answer: "I soccorritori sono lì per curare. Qualunque sia la questione legale, una persona che non respira bene ha bisogno di un'ambulanza, e questo viene prima." },
        { question: "Skif incoraggia il consumo di droghe?", answer: "No. Skif prende la posizione che afferma la politica svizzera in materia di droghe: ridurre il consumo e ridurre i suoi danni per chi consuma e per tutti gli altri, entrambe le cose insieme [1]." },
        { question: "Dove posso parlare con qualcuno del mio consumo?", answer: "Saferparty offre consulenze personali con ogni drug checking, e parlarne fa parte del servizio, non è una predica [2]." },
      ],
    },
  ],
  sources: EN.sources,
  checked: EN.checked,
};
