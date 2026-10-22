import { WHERE_YOU_LIVE as EN } from "../../where-you-live";
import type { Guide } from "../../types";

export const WHERE_YOU_LIVE: Guide = {
  slug: "where-you-live",
  title: "Dove vivi: leggere onestamente le cifre sulla criminalità",
  fields: ["ENVIRONMENTAL", "PHYSICAL"],
  summary: "Cosa dicono le statistiche svizzere sulla criminalità di città e cantoni, perché il tasso di una città sembra peggiore del rischio per chi ci vive, e cosa rende davvero più sicuri una casa e una strada.",
  photo: "eveningFlats",
  statement: "Una cifra è una domanda, non un verdetto.",
  lead: [
    "Le persone scelgono dove vivere, lavorare e uscire in parte in base a una sensazione di sicurezza, e quella sensazione di solito nasce da un titolo di giornale. Le cifre ufficiali sono pubbliche, e dicono qualcosa di più calmo e più utile.",
    "Nel 2025 la Svizzera ha registrato 61 reati del Codice penale ogni 1'000 abitanti, in calo rispetto ai circa 72 del 2009 [1].",
  ],
  sections: [
    {
      kind: "table",
      heading: "Reati ogni 1'000 abitanti, 2025",
      blurb: "Reati secondo il Codice penale, dalle statistiche di polizia federali e del Canton Zurigo [1] [2].",
      anchor: "numbers",
      columns: ["Dove", "Ogni 1'000"],
      rows: [
        ["Svizzera", "61"],
        ["Canton Zurigo", "64,6 (68,7 nel 2024)"],
        ["Città di Zurigo", "101,8 (111,3 nel 2024)"],
      ],
    },
    {
      kind: "prose",
      heading: "Perché la città sembra peggio di quanto sia",
      anchor: "commuters",
      paragraphs: [
        "Un tasso per abitante conta tutti i reati commessi in città e li divide per le persone che ci dormono. Lascia fuori le centinaia di migliaia di persone che ogni giorno vi entrano per lavorare, fare acquisti e uscire, e la polizia cantonale dice chiaramente che nelle grandi città questo ha un effetto che non si può ignorare [2]. Il tasso della città di Zurigo è alto in parte perché così tanta della vita del cantone si svolge al suo interno.",
        "Lo stesso rapporto suddivide le cifre per distretto e per Kreis [2]. È questo il livello che vale la pena leggere se stai scegliendo un appartamento: una cifra per tutta la città non descrive la strada di nessuno.",
        "Una tendenza merita attenzione più che rassicurazioni: a livello nazionale, nel 2025 i reati violenti gravi sono aumentati dell'8,1%, mentre i reati nel complesso sono diminuiti [1]. Entrambe le cose sono vere contemporaneamente.",
      ],
    },
    {
      kind: "definitions",
      heading: "Cosa rende davvero più sicura una casa",
      anchor: "home",
      items: [
        { term: "La porta, e la finestra che dimentichi", detail: "La maggior parte dei furti con scasso sfrutta l'accesso più facile. Una buona serratura sulla porta d'ingresso conta meno se la porta del balcone o una finestra al pianterreno resta aperta." },
        { term: "Sembrare abitata", detail: "Luci con un timer e la posta ritirata quando sei via. Un vicino che lo sa vale più di una telecamera." },
        { term: "Conosci i tuoi vicini", detail: "Le persone che si riconoscono notano chi non è del posto. È la protezione più antica che ci sia, ed è gratis." },
        { term: "Luce e visibilità", detail: "Un ingresso che si vede dalla strada ed è illuminato di notte viene scelto meno spesso." },
        { term: "Le telecamere per ultime, non per prime", detail: "Utili come prova, meno sicure come prevenzione, e costano privacy: la tua e quella dei tuoi vicini. Il Piano di sicurezza di Skif pesa questo costo prima di raccomandarne una." },
      ],
    },
    {
      kind: "prose",
      heading: "Scegliere un posto",
      anchor: "choosing",
      paragraphs: [
        "Percorrilo nelle ore in cui ci vivrai: in tarda serata, una notte del fine settimana, di primo mattino. Parla con chi ci abita già. Guarda le cifre del quartiere, non quelle della città.",
        "E pesa tutto il resto che rende un posto sicuro o no: il traffico nella strada davanti, il tragitto fino al tram, le uscite di sicurezza dell'edificio, la carta dei pericoli di alluvione. La criminalità è un rischio tra tanti, e raramente il più grande.",
      ],
    },
  ],
  sources: EN.sources,
  checked: EN.checked,
};
