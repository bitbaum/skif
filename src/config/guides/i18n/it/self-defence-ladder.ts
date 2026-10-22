import type { Guide } from "../../types";

export const SELF_DEFENCE_LADDER: Guide = {
  slug: "self-defence-ladder",
  title: "Prima andarsene: la scala dell'autodifesa",
  fields: ["PHYSICAL", "RESILIENCE"],
  summary: "Evitare, fuggire, calmare, difendersi, riprendersi: in quest'ordine, e perché l'ordine è tutto.",
  photo: "parkour",
  statement: "Il miglior combattimento è quello in cui non sei mai entrato.",
  lead: [
    "L'autodifesa è una scala, non una tecnica. Ogni gradino costa e rischia più di quello sotto, quindi sali solo fin dove devi: evitare, fuggire, calmare, difenderti, riprenderti.",
    "Conoscere la scala è anche ciò che ti permette di vivere liberamente. Chi sa come lascerebbe una brutta situazione esce la sera, viaggia e torna a casa in tram senza portarsi dietro la paura.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "I cinque gradini",
      anchor: "rungs",
      items: [
        {
          term: "1 · Evitare",
          detail:
            "La maggior parte dei pericoli si vede prima che arrivi: un gruppo che tace mentre ti avvicini, qualcuno che tiene il tuo passo, una lite che monta. Accorgitene presto e cambia qualcosa di piccolo: il percorso, l'ora, il vagone, il lato della strada. Evitare non costa quasi nulla.",
        },
        {
          term: "2 · Fuggire",
          detail:
            "La distanza è la difesa più affidabile che esista. Andarsene non è perdere: chi non c'è non può essere ferito. Muoviti verso la luce, la gente e le porte aperte, e continua finché sei in un posto sicuro, non solo fuori vista.",
        },
        {
          term: "3 · Calmare",
          detail:
            "Quando non puoi andartene, abbassa la tensione. Mani aperte alzate tra te e l'altro, voce calma e bassa, frasi brevi, una via d'uscita offerta a entrambi. Cedi le tue cose senza discutere: un telefono o un portafoglio si sostituiscono, tu no.",
        },
        {
          term: "4 · Difendersi",
          detail:
            "Solo quando non c'è uscita e non si può parlare. Lo scopo non è vincere ma creare il momento che ti serve per fuggire: breve, deciso, poi via. La legge si aspetta che la difesa sia adeguata all'attacco (vedi sotto).",
        },
        {
          term: "5 · Riprendersi",
          detail:
            "Mettiti al sicuro, chiama il 117 o il 144 e scrivi cosa è successo finché è fresco: ora, luogo, volti, parole. Fatti visitare anche se ti senti bene; lo shock nasconde le ferite. Dopo, parlane con qualcuno.",
        },
      ],
    },
    {
      kind: "cards",
      heading: "Vedere il mondo come un traceur",
      blurb:
        "Il parkour ti allena a vedere una strada come percorsi invece che come muri. Quest'abitudine è la capacità di autodifesa più sottovalutata che ci sia: in un brutto momento, conosci già tre vie d'uscita.",
      anchor: "parkour",
      columns: 3,
      cards: [
        { title: "Prima le uscite", body: "Entrando in un bar, in un treno o in una piazza, individua due vie d'uscita. Ci vuole un secondo e diventa automatico in poche settimane." },
        { title: "Gli ostacoli sono scudi", body: "Un tavolo, un'auto parcheggiata o un paracarro tra te e qualcun altro sono una distanza che deve aggirare, e tempo per te." },
        { title: "Varchi e dislivelli", body: "Un muretto, una recinzione, una rampa di scale: posti dove puoi andare in fretta e su cui un inseguitore deve riflettere." },
        { title: "Luce e gente", body: "Corri verso un negozio illuminato, un posteggio di taxi o una folla, non in un parco vuoto o in un vicolo cieco." },
        { title: "Il tuo motore", body: "Riesci a fare uno sprint di 200 metri e continuare a correre? Fuggire è una capacità fisica. La corsa a intervalli la allena meglio di qualsiasi tecnica." },
        { title: "Scarpe e mani", body: "Scarpe con cui puoi correre, e mani non piene di borse della spesa quando cammini dove non ti senti sicuro." },
      ],
    },
    {
      kind: "prose",
      heading: "Cosa ti chiede la legge in Svizzera",
      anchor: "law",
      paragraphs: [
        "Articolo 15 del Codice penale svizzero: chiunque è aggredito senza diritto, o minacciato di un'aggressione imminente, può respingerla in modo adeguato alle circostanze. Lo stesso diritto vale per la difesa di un'altra persona.",
        "Articolo 16: se chi si difende va oltre ciò che era adeguato, il giudice attenua la pena; e se l'eccesso è dovuto a scusabile eccitazione o sbigottimento per l'aggressione, non c'è alcuna colpa.",
        "Ne seguono due cose. Porre fine al pericolo è difesa; continuare dopo che è finito non lo è. E ciò che è adeguato dipende dall'aggressione: uno schiaffo non giustifica un'arma. Le regole di altri Paesi sono diverse, alcune molto. Questa è una descrizione della legge, non una consulenza legale.",
      ],
    },
    {
      kind: "table",
      heading: "L'allenamento che costruisce ogni gradino",
      anchor: "training",
      columns: ["Gradino", "Cosa lo costruisce", "Nell'Accademia"],
      rows: [
        ["Evitare", "Consapevolezza della situazione, abitudini sui percorsi", "Consapevolezza della situazione"],
        ["Fuggire", "Parkour, corsa a intervalli, forma fisica generale", "Parkour e fuga"],
        ["Calmare", "De-escalation verbale, la psicologia della paura", "De-escalation"],
        ["Difendersi", "Uno sport da combattimento con sparring vero", "Arti di percussione e di lotta"],
        ["Riprendersi", "Primo soccorso, intervento d'emergenza", "Primo soccorso"],
      ],
    },
    {
      kind: "faq",
      heading: "Domande frequenti",
      anchor: "questions",
      items: [
        { question: "Scappare è da vigliacchi?", answer: "No. È il risultato a cui mira ogni istruttore serio di autodifesa. Nessuno si fa male, nessuno finisce in tribunale, e tu torni a casa." },
        { question: "Devo consegnare il telefono se qualcuno me lo chiede?", answer: "Sì. Se puoi, lancialo un po' lontano da te e vattene dall'altra parte. Le cose si sostituiscono o si recuperano; una lotta per esse può cambiarti la vita." },
        { question: "E se sto proteggendo qualcun altro?", answer: "La stessa scala vale per entrambi, e la legge copre la difesa di un'altra persona. Fuggire insieme resta la prima scelta." },
        { question: "Un corso di autodifesa mi renderà sicuro?", answer: "Un corso ti dà delle capacità; sono le abitudini a tenerti al sicuro. Consapevolezza e fuga si praticano ogni giorno, senza palestra." },
      ],
    },
  ],
};
