import type { SitePage } from "@bitbaum/sitekit";

export const METHOD_IT: SitePage = {
  path: "method",
  title: "Metodo",
  intro: "Come Skif decide cosa consigliare.",
  sections: [
    {
      kind: "hero",
      eyebrow: "Metodo",
      statement: "Come decide Skif.",
      lead: [
        "Ogni raccomandazione di Skif si può ricondurre a ciò che gli hai detto e a una regola scritta qui. Nessun punteggio nascosto, nessun modello che tira a indovinare il pericolo, nessuna vendita in più.",
        "L'obiettivo è una buona vita con poco rischio subìto, non la massima sicurezza. Sorveglianza, restrizioni e paura costante possono rendere qualcuno tecnicamente più sicuro e la sua vita peggiore, e Skif conta questo costo.",
      ],
    },
    {
      kind: "index",
      heading: "In questa pagina",
      entries: [
        { label: "Il ciclo", anchor: "loop" },
        { label: "Il passo più proporzionato", anchor: "proportionality" },
        { label: "Cosa costa ogni passo", anchor: "costs" },
        { label: "Da dove viene una valutazione", anchor: "evidence" },
        { label: "Limiti invalicabili che puoi fissare", anchor: "limits" },
        { label: "Come viene scelto un Protector", anchor: "protectors" },
        { label: "Cosa conserva Skif", anchor: "data" },
      ],
    },
    {
      kind: "cards",
      heading: "Il ciclo",
      anchor: "loop",
      columns: 4,
      cards: [
        {
          title: "Valutare",
          body: "Cosa conta, cosa potrebbe nuocergli, quanto è davvero esposto. Una mappa che puoi leggere, non un punteggio.",
        },
        {
          title: "Migliorare",
          body: "Passi ordinati secondo ciò che ottengono e ciò che costano in denaro, privacy, libertà e comodità.",
        },
        {
          title: "Proteggere",
          body: "Una persona solo dove una persona è la risposta proporzionata, abbinata in base alle competenze.",
        },
        {
          title: "Imparare",
          body: "Cosa ha funzionato e come ci si è sentiti, perché la prossima raccomandazione sia migliore dell'ultima.",
        },
      ],
    },
    {
      kind: "prose",
      heading: "Il passo più proporzionato",
      anchor: "proportionality",
      paragraphs: [
        "Una valutazione trasforma ciò che le dici in constatazioni: cosa richiede attenzione, con quale urgenza e per quale motivo. Non stima mai la probabilità di un danno, perché onestamente nessuno può farlo.",
        "Per ogni constatazione il piano consiglia un passo. Non ne sceglie mai uno che violi un limite che hai fissato, né uno oltre il tuo budget; quelli sono elencati a parte, così vedi che esistono. Per la maggior parte delle constatazioni sceglie il passo meno invasivo che funziona: prima la minor rinuncia alla privacy, poi il minor costo, poi la minor richiesta alla tua libertà.",
        "Quando parli a Skif di una minaccia nota, la constatazione diventa prioritaria e l'ordine si inverte: viene prima il passo più efficace. La proporzionalità vale in entrambi i sensi.",
        "Dove fai già abbastanza, il piano lo dice e non consiglia nulla di nuovo. Le tue preferenze tra privacy e osservabilità, fare da sé e automazione, protezione umana e tecnologia, elaborazione locale e comodità del cloud, soluzioni individuali e soluzioni comunitarie, comodità e massima protezione cambiano l'ordine dei passi, mai quali passi sono ammessi.",
      ],
    },
    {
      kind: "table",
      heading: "Cosa costa ogni passo",
      blurb: "Ogni passo porta un costo per la privacy e un costo per la libertà sulla stessa scala a quattro punti, accanto al suo prezzo. Li vedi tutti e tre prima di scegliere.",
      anchor: "costs",
      columns: ["Livello", "Privacy", "Libertà"],
      rows: [
        ["0", "Nessun dato, nessun dispositivo che osserva", "Non cambia nulla nel tuo modo di vivere"],
        ["1", "Condivide poco con persone che scegli tu", "Ti chiede una piccola abitudine"],
        ["2", "Registra o trasmette oltre casa tua", "Qualcun altro decide o agisce per te"],
        ["3", "Osserva le persone o sfugge al tuo controllo", "Limita quello che puoi fare"],
      ],
      monoColumns: [0],
    },
    {
      kind: "table",
      heading: "Denaro",
      columns: ["Fascia", "Significa"],
      rows: [
        ["Gratis", "Niente, solo passi gratuiti"],
        ["Meno di CHF 100", "Fino a CHF 100"],
        ["CHF 100–500", "Fino a CHF 500"],
        ["Più di CHF 500 o un abbonamento", "Di più, se ne vale chiaramente la pena"],
      ],
    },
    {
      kind: "prose",
      heading: "Da dove viene una valutazione",
      anchor: "evidence",
      paragraphs: [
        "Ogni valutazione del beneficio indica la sua base: ricerca pubblicata, ciò che Skif ha osservato nel proprio lavoro, un esperto nominato o il giudizio proprio di Skif. La dichiarazione di un produttore non viene mai usata.",
        "Oggi ogni valutazione è giudizio proprio di Skif, e lo dice. Nessuna è indicata con un grado di affidabilità alto finché non vi è collegata una ricerca. Costruire queste prove fa parte del lavoro.",
      ],
    },
    {
      kind: "definitions",
      heading: "Limiti invalicabili che puoi fissare",
      blurb: "Un limite non si baratta mai. Un passo che ne violerebbe uno viene escluso dal tuo piano, e il piano ti dice quale limite lo ha escluso.",
      anchor: "limits",
      items: [
        { term: "Nessun riconoscimento facciale", detail: "Niente che identifichi i volti, su nessun dispositivo, da nessuna parte." },
        { term: "Nessuna telecamera dentro casa mia", detail: "Nessuna telecamera puntata su uno spazio privato." },
        { term: "Nessun video nel cloud", detail: "Il video, se c'è, non lascia mai i locali." },
        {
          term: "Nessuna condivisione automatica con la polizia",
          detail: "Niente viene trasmesso alla polizia se non lo decido io, caso per caso.",
        },
        {
          term: "Solo elaborazione locale",
          detail: "Nessun dato su casa mia o su di me esce verso i server di un fornitore o una centrale di sorveglianza.",
        },
        { term: "Nessuna registrazione continua", detail: "Niente registra di continuo, nemmeno in locale." },
        {
          term: "Nessuna telecamera nemmeno fuori",
          detail: "Nessuna telecamera alla mia porta o sul mio edificio, puntata in qualsiasi direzione.",
        },
        { term: "Nessuno che mi accompagni", detail: "Non consigliarmi un Protector; voglio altre opzioni." },
      ],
    },
    {
      kind: "prose",
      heading: "Come viene scelto un Protector",
      anchor: "protectors",
      paragraphs: [
        "L'abbinamento è deterministico e spiegato. Un Protector deve possedere ogni competenza richiesta dalla prenotazione, verificata dalle Operazioni e valida quel giorno, ed essere disponibile. Tra questi, la classifica dà punti alle competenze di cui ogni servizio ha più bisogno (la de-escalation per quasi ogni servizio, un'abilità fisica per nessuno), poi alle lingue in comune, allo stile di presenza e alle valutazioni passate, e motiva ogni punto.",
        "Un Protector vede dove incontrarti solo dopo aver accettato l'incarico, e mai chi sei oltre a questo. Dopo, valuti il rispetto, la discrezione e quanto ti sei sentito al sicuro, ognuno sulla propria scala, non con le stelle.",
      ],
    },
    {
      kind: "prose",
      heading: "Cosa conserva Skif",
      anchor: "data",
      paragraphs: [
        "Il tuo account è la tua identità OrangeCat; Skif non ne tiene uno separato. Valutazioni, piani e prenotazioni stanno nella banca dati di Skif, su un server che gestisce in Germania, mai presso un fornitore di telecamere o allarmi.",
      ],
    },
  ],
};
