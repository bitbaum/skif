import { TRAVEL as EN } from "../../travel";
import type { Guide } from "../../types";

export const TRAVEL: Guide = {
  slug: "travel",
  title: "In viaggio: altri Paesi, altre regole",
  fields: ["ENVIRONMENTAL", "HEALTH", "FINANCIAL"],
  summary: "Come andare quasi ovunque e tornare bene: prepararti prima di partire, cibo e acqua, denaro e documenti, e cosa fare quando un viaggio va storto.",
  photo: "platform",
  statement: "Vai più lontano. Preparati una volta.",
  lead: [
    "Viaggiare è una delle cose più libere che una persona possa fare, e i suoi rischi sono per lo più noiosi: un mal di pancia, un passaporto perso, una truffa, una strada. I rischi drammatici sono reali in pochi posti e ben documentati, quindi puoi conoscerli prima di prenotare.",
    "La preparazione richiede una sera. Dopo, il viaggio è tuo.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Prima di partire",
      anchor: "before",
      items: [
        {
          term: "Registra il viaggio su Travel Admin",
          detail: "L'app di viaggio del Dipartimento federale degli affari esteri. Il Dipartimento raccomanda di scaricarla prima di partire, registrarti e inserire i tuoi viaggi all'estero [1], così che, se scoppia una crisi dove ti trovi, sappia che sei lì.",
        },
        { term: "Leggi i consigli di viaggio", detail: "Il Dipartimento degli affari esteri pubblica consigli per ogni Paese. Leggi la versione attuale per il tuo, non quella dell'anno scorso." },
        { term: "Salute e vaccinazioni", detail: "Un centro di medicina dei viaggi o il tuo medico, qualche settimana prima, per qualsiasi luogo con malattie diverse." },
        { term: "Un'assicurazione che copra il viaggio", detail: "Verifica la copertura medica all'estero e il rimpatrio, e se gli sport che prevedi sono inclusi." },
        { term: "Copie dei documenti", detail: "Passaporto e carte fotografati e salvati offline, e una copia cartacea tenuta separata dagli originali." },
        { term: "Qualcuno a casa", detail: "Lascia i tuoi programmi a una persona, e accordatevi su quando ti farai sentire." },
      ],
    },
    {
      kind: "cards",
      heading: "Cibo e acqua",
      blurb: "Dove l'acqua del rubinetto può essere contaminata, i consigli dei CDC [2].",
      anchor: "food",
      columns: 2,
      cards: [
        { title: "Non bere dal rubinetto", body: "Dove l'acqua del rubinetto potrebbe essere contaminata, bevi bevande in bottiglia sigillata, e niente ghiaccio [2]." },
        { title: "Rendi l'acqua sicura", body: "L'acqua del rubinetto si può rendere sicura bollendola, filtrandola o trattandola chimicamente [2]." },
        { title: "Sbuccialo o lavalo", body: "Frutta e verdura sono più sicure quando le sbucci tu stesso o le lavi con acqua in bottiglia o disinfettata [2]." },
        { title: "Caldo e appena cotto", body: "Il cibo servito caldo e cucinato davanti a te è di solito una scelta più sicura di un buffet rimasto lì a lungo." },
      ],
    },
    {
      kind: "definitions",
      heading: "Denaro e documenti in viaggio",
      anchor: "money",
      items: [
        { term: "Dividili", detail: "Due carte in due posti diversi, e un po' di contanti in un terzo. Un portafoglio perso dovrebbe essere un fastidio, non la fine del viaggio." },
        { term: "Lo zaino del giorno porta solo il giorno", detail: "Il passaporto nella cassaforte dell'albergo, a meno che non ti serva; una copia con te." },
        { term: "Le truffe seguono un copione", detail: "Taxi senza tassametro, attrazioni «chiuse» con un amico pronto lì vicino, una macchia sulla tua giacca. La guida sulle truffe spiega le leve che hanno tutte in comune." },
        { term: "Bancomat dentro le banche", detail: "Di giorno, e copri la tastiera." },
      ],
    },
    {
      kind: "prose",
      heading: "Quando va storto",
      anchor: "wrong",
      paragraphs: [
        "Salva il numero d'emergenza locale prima di atterrare; non è sempre il 112. Per tutto ciò che un cittadino svizzero non può risolvere da solo all'estero, un passaporto perso, un arresto, un ospedale, le persone da chiamare sono l'ambasciata o il consolato svizzero più vicino e la helpline del Dipartimento degli affari esteri.",
        "In una crisi dove ti trovi, la regola è la stessa che a casa: prima allontanati, poi di' a qualcuno dove sei. Travel Admin è il modo in cui il Dipartimento ti trova [1].",
      ],
    },
  ],
  sources: EN.sources,
  checked: EN.checked,
};
