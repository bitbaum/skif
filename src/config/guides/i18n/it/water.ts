import { WATER as EN } from "../../water";
import type { Guide } from "../../types";

export const WATER: Guide = {
  slug: "lakes-and-rivers",
  title: "Laghi e fiumi",
  fields: ["ENVIRONMENTAL", "HEALTH"],
  summary: "Nuotare nella Limmat, lasciarsi portare dall'Aare, un lago in una giornata calda: le dodici regole che insegna la Società Svizzera di Salvataggio, e perché l'acqua fredda è il rischio che si sottovaluta.",
  photo: "cityRiver",
  statement: "L'acqua è gratis. Rispettala.",
  lead: [
    "I laghi e i fiumi svizzeri sono una delle cose più belle del vivere qui, e Skif ti vuole dentro. Sono anche il posto dove ogni estate muore qualcuno: nel 2025 in Svizzera sono annegate 43 persone, contro una media di lungo periodo di circa 50 all'anno [1].",
    "La Società Svizzera di Salvataggio (SLRG) riassume ciò che sa in due serie di sei regole, una per il bagno e una per i fiumi [2] [3]. Sono brevi perché sono quelle che contano.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Le sei regole per il bagno",
      blurb: "Le Baderegeln della SLRG, in italiano [2].",
      anchor: "bathing",
      items: [
        { term: "I bambini solo con un adulto", detail: "I bambini piccoli a portata di braccio. Annegare è rapido e silenzioso; non somiglia ai film." },
        { term: "Mai da ubriaco o sotto l'effetto di droghe", detail: "E mai a stomaco pieno o completamente vuoto." },
        { term: "Mai tuffarsi accaldati", detail: "Il corpo ha bisogno di tempo per adattarsi. Dopo ore al sole, bagnati la pelle ed entra piano." },
        { term: "Non tuffarti in acque torbide o sconosciute", detail: "Ciò che non vedi può farti male: rocce, rami, fondali bassi." },
        { term: "Materassini e ausili al galleggiamento non sono per l'acqua profonda", detail: "Lì non danno alcuna sicurezza. Vanno alla deriva, si sgonfiano e si ribaltano." },
        { term: "Mai nuotare da solo su lunghe distanze", detail: "Anche il corpo più allenato può avere un momento di debolezza." },
      ],
    },
    {
      kind: "definitions",
      heading: "Le sei regole per i fiumi",
      blurb: "Le Flussregeln della SLRG, in italiano [3]. Valgono sull'Aare, sul Reno, sulla Reuss e sulla Limmat.",
      anchor: "rivers",
      items: [
        { term: "Giubbotto di salvataggio sul canotto", detail: "Su un'imbarcazione gonfiabile lo indossano tutti." },
        { term: "Rispetta il carico indicato", detail: "Non caricare mai su un'imbarcazione più di quanto permetta la sua etichetta." },
        { term: "Non legare mai le imbarcazioni tra loro", detail: "Le imbarcazioni legate non si possono più manovrare." },
        { term: "Prima esplora i tratti sconosciuti", detail: "Sbarramenti, piloni dei ponti e alberi caduti sono i punti in cui le persone restano bloccate. Prima di entrare, sappi dove sono e dove uscirai." },
        { term: "Le acque libere sono per nuotatori forti", detail: "Fiumi, stagni e laghi: solo per nuotatori bravi ed esperti." },
        { term: "Più l'acqua è fredda, più la nuotata è breve", detail: "Il freddo provoca crampi. A inizio estate l'acqua dei fiumi è molto più fredda dell'aria sopra di essa." },
      ],
    },
    {
      kind: "cards",
      heading: "Prima di entrare",
      anchor: "before",
      columns: 3,
      cards: [
        { title: "Sappi dove esci", body: "Su un fiume, prima di entrare scegli i gradini o la scaletta da cui uscirai, e quella dopo nel caso la mancassi." },
        { title: "Vai con qualcuno", body: "Qualcuno sulla riva che sa dove sei entrato e quando dovresti tornare." },
        { title: "Sacca stagna, galleggiante colorato", body: "Una boa da nuoto ti rende visibile alle barche e ti dà qualcosa a cui aggrapparti. Non è un giubbotto di salvataggio." },
      ],
    },
    {
      kind: "prose",
      heading: "Se qualcuno è in difficoltà",
      anchor: "rescue",
      paragraphs: [
        "Chiama subito il 144, o fai chiamare qualcun altro mentre agisci. Prima di entrare in acqua, porgi o lancia qualcosa: un ramo, una corda, un salvagente, qualsiasi cosa galleggi. I soccorritori non formati annegano insieme alla persona che vanno a prendere a nuoto.",
        "La SLRG organizza corsi di nuoto e di salvataggio in tutta la Svizzera, e i corsi di primo soccorso dell'Accademia trattano la rianimazione. Entrambi durano poche ore, ed entrambi sono il genere di cosa che speri di non dover mai usare e sei contento di avere.",
      ],
    },
  ],
  sources: EN.sources,
  checked: EN.checked,
};
