import type { Guide } from "../../types";

export const PROFESSIONALS: Guide = {
  slug: "what-professionals-teach",
  title: "Cosa insegnano i professionisti al pubblico",
  fields: ["RESILIENCE", "HEALTH", "PHYSICAL"],
  summary: "Scappa, nasconditi, avvisa; fermare un'emorragia; riconoscere i segnali d'allarme. Programmi pubblici della polizia e della medicina, non miti sui servizi segreti.",
  photo: "cprTraining",
  statement: "I metodi migliori sono pubblicati, verificati e noiosi.",
  lead: [
    "Corpi di polizia, organismi medici e ricercatori della valutazione della minaccia pubblicano indicazioni per il pubblico, verificate su casi reali. Sono meno emozionanti delle storie sulle forze speciali e sui servizi d'intelligence, e molto più utili.",
    "Skif si basa su metodi pubblicati e verificabili, e li nomina. Non prende in prestito l'aura di agenzie i cui metodi non sono pubblici e non si possono controllare.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Programmi che vale la pena conoscere",
      anchor: "programmes",
      items: [
        {
          term: "Run, Hide, Tell (polizia antiterrorismo britannica)",
          detail: "In caso di attacco: scappa se c'è una via sicura; se no, nasconditi fuori vista, metti il telefono in silenzioso e barricati; avvisa la polizia quando è sicuro farlo. Abbastanza semplice da ricordare sotto stress, ed è proprio questo il punto.",
        },
        {
          term: "Run, Hide, Fight (Department of Homeland Security degli Stati Uniti)",
          detail: "Lo stesso ordine di fronte a un aggressore in azione, con il combattimento come ultima risorsa quando nascondersi non basta. Di nuovo la scala: prima la fuga.",
        },
        {
          term: "Stop the Bleed (American College of Surgeons)",
          detail: "Un'emorragia grave può uccidere prima che arrivi un'ambulanza. Il corso insegna in un paio d'ore la compressione diretta, il tamponamento della ferita e il laccio emostatico. È tra le formazioni più preziose che chiunque possa seguire.",
        },
        {
          term: "Valutazione comportamentale della minaccia (US Secret Service, National Threat Assessment Center)",
          detail: "La sua ricerca sugli attacchi mirati ha rilevato che gli aggressori avevano di solito mostrato in precedenza comportamenti che preoccupavano chi stava loro intorno. Segnalare presto le preoccupazioni, a qualcuno che può agire, previene danni.",
        },
      ],
    },
    {
      kind: "cards",
      heading: "Abitudini da prendere in prestito",
      blurb: "Ciò che fa ogni professione seria della sicurezza, ridotto alla misura di una persona e di un'economia domestica.",
      anchor: "habits",
      columns: 2,
      cards: [
        { title: "Decidi prima che succeda", body: "Sotto stress, le persone fanno ciò che hanno deciso prima. Mettetevi d'accordo adesso: dove si ritrova la famiglia, chi chiama chi, cosa fai se l'auto si guasta di notte." },
        { title: "Prova il primo minuto", body: "Percorri le tue uscite una volta, trova l'estintore, di' ad alta voce i numeri d'emergenza. Un piano che hai provato è un piano che riesci a seguire." },
        { title: "Tienilo semplice", body: "Run, hide, tell sta in tre parole perché i piani complicati falliscono sotto adrenalina. Se il tuo piano ha bisogno di una pagina, accorcialo." },
        { title: "Rivedi dopo", body: "Dopo uno spavento o un incidente sfiorato, chiediti cosa è successo, cosa ha funzionato e cosa cambieresti. Senza colpe, e poi cambialo." },
      ],
    },
    {
      kind: "prose",
      heading: "Perché non le forze speciali e i servizi segreti?",
      anchor: "agencies",
      paragraphs: [
        "Unità come il GIGN francese o lo SAS britannico, e servizi come la CIA, l'MI6 o il Mossad, risolvono problemi che un privato non ha, con un addestramento, poteri legali e un sostegno che nessuno al di fuori di loro possiede. I loro veri metodi per lo più non sono pubblici, e ciò che viene venduto a loro nome di solito non si può verificare.",
        "Ciò che si trasferisce è l'abitudine che sta sotto: pianificare in anticipo, provare, tenere le cose semplici e rivedere dopo. È gratis, ed è ciò su cui è costruito questo sito.",
      ],
    },
  ],
};
