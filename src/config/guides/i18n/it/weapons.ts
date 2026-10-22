import type { Guide } from "../../types";

export const WEAPONS: Guide = {
  slug: "weapons",
  title: "Armi: cosa sono e cosa permette la legge",
  fields: ["PHYSICAL", "INSTITUTIONAL"],
  summary: "Dalle armi da fuoco alle chiavi della macchina: cosa rende un oggetto un'arma, come le classifica la legge e perché la maggior parte sono scudi.",
  statement: "Quasi tutto può essere un'arma. Questo vale in entrambi i sensi.",
  lead: [
    "Un'arma è qualsiasi cosa usata per ferire o per minacciare. Alcuni oggetti sono fatti per questo; la maggior parte di quelli usati per difendersi non lo sono. Chi si difende con un oggetto di solito lo afferra sul momento, senza averlo previsto, perché era lì.",
    "Capire le armi, quindi, ha meno a che fare col possederle che col vederle: cosa intorno a te potrebbe proteggerti, cosa potrebbe essere usato contro di te, e cosa dice la legge di ciascuna.",
  ],
  sections: [
    {
      kind: "table",
      heading: "Tipi di armi, e come li tratta la legge svizzera",
      blurb: "Categorie, non un catalogo. Il riferimento è la Legge federale sulle armi (LArm, RS 514.54); altri Paesi hanno regole diverse, e le leggi cambiano. Questa è una descrizione, non una consulenza legale.",
      anchor: "kinds",
      columns: ["Tipo", "Esempi", "In Svizzera"],
      rows: [
        ["Armi da fuoco", "Pistole, fucili, fucili a pallini", "La maggior parte richiede un permesso d'acquisto. Portarne una in pubblico richiede un permesso di porto separato, concesso di rado ai privati."],
        ["Lame", "Coltelli da cucina e pieghevoli; coltelli a farfalla, coltelli da lancio, alcuni coltelli automatici e pugnali", "I coltelli d'uso quotidiano sono legali. I coltelli a farfalla, i coltelli da lancio e certi coltelli automatici e pugnali sono armi secondo la legge."],
        ["Da botta", "Manganelli, manganelli telescopici, tirapugni, nunchaku, stelle da lancio", "La legge considera armi gli apparecchi fatti per ferire le persone, tra cui tirapugni, manganelli e stelle da lancio."],
        ["Chimiche", "Spray al pepe (OC), gas CS", "Gli spray di tipo CS sono armi. Lo spray al pepe è venduto ovunque; usarlo resta comunque valutato come uso della forza."],
        ["Elettriche", "Storditori elettrici e taser", "Gli apparecchi a elettrochoc sono armi, e soggetti a restrizioni."],
        ["Improvvisate", "Chiavi, una borsa, un ombrello, una sedia, una bicicletta, un estintore", "Legali da possedere e portare. Usarne una è valutato come qualsiasi uso della forza: era adeguato all'aggressione?"],
      ],
    },
    {
      kind: "prose",
      heading: "Perché gli oggetti di tutti i giorni sono soprattutto scudi",
      anchor: "shields",
      paragraphs: [
        "La cosa più utile che un oggetto qualsiasi fa in un brutto momento è mantenere la distanza. Una sedia tra te e qualcun altro, una borsa alzata per parare, una giacca avvolta attorno all'avambraccio, una bicicletta spinta in avanti: ognuno fa guadagnare spazio e tempo, che è ciò di cui ha bisogno la fuga.",
        "Vedere queste possibilità è un'abitudine, come individuare le uscite. Sul tram sono il palo e le porte; in un caffè il tavolo e le sedie; per strada un'auto parcheggiata da tenere tra te e l'altro. Non cerchi uno scontro; cerchi spazio.",
        "Per la legge conta l'intenzione. Un ombrello è un ombrello; lo stesso ombrello portato come arma, o un coltello portato per combattere, può essere giudicato diversamente. Qualunque cosa usi, dopo la domanda è se fosse adeguata all'aggressione.",
      ],
    },
    {
      kind: "prose",
      heading: "In uno scontro un'arma taglia in entrambi i sensi",
      anchor: "both-ways",
      paragraphs: [
        "Qualsiasi arma porti può esserti tolta e usata contro di te, e la sua presenza alza la posta per tutti. Contro un coltello la risposta giusta è la distanza: gli attacchi col coltello spesso non si vedono finché non sono avvenuti, e le tecniche che promettono un disarmo sicuro meritano diffidenza.",
        "Allenarsi con le armi vale comunque molto, perché insegna come si muovono, quanto sono veloci e quanto poco tempo ha chi si difende. La maggior parte di chi pratica arti con armi non porta niente con sé; porta la comprensione.",
      ],
    },
    {
      kind: "cards",
      heading: "Imparare le armi come si deve",
      anchor: "learning",
      columns: 2,
      cards: [
        { title: "Armi da fuoco, in un poligono autorizzato", body: "Maneggio sicuro, custodia e trasporto, e la legge, insegnati da istruttori abilitati. La Svizzera ha una lunga tradizione di società di tiro dove questo si fa bene." },
        { title: "Arti del bastone e della lama", body: "Kali, Escrima e Arnis allenano a capire come si muovono bastoni e lame, ed è per questo che chi studia la difesa dalle armi spesso comincia da lì." },
        { title: "Difesa dalle armi", body: "Allenamento a scenari in scuole come il Krav Maga, idealmente con pressione e resistenza, e sempre con la fuga come obiettivo." },
        { title: "Conoscere le armi e la legge", body: "Cosa conta come arma, cosa puoi possedere e portare, e come viene giudicato l'uso della forza. La base di tutto il resto." },
      ],
    },
    {
      kind: "faq",
      heading: "Domande frequenti",
      anchor: "questions",
      items: [
        { question: "Dovrei portare qualcosa per difendermi?", answer: "Prima guarda la legge del posto in cui sei. Per la maggior parte delle persone, un telefono carico, una luce, scarpe con cui correre e l'abitudine di osservare fanno più di qualsiasi oggetto. L'allenamento cambia più di un attrezzo." },
        { question: "Lo spray al pepe è una buona idea?", answer: "Può creare il momento che ti serve per andartene, e col vento o in una stanza chiusa può tornarti addosso. Se lo porti, esercitati a estrarlo, e considera il suo uso come uso della forza." },
        { question: "I Protector di Skif portano armi?", answer: "La maggior parte del lavoro di Skif non comporta alcuna arma. Un Protector ne porta una solo dove ha il permesso legale di portarla e l'incarico lo richiede." },
      ],
    },
  ],
};
