import type { SitePage } from "@bitbaum/sitekit";

export const PRIVACY_IT: SitePage = {
  path: "privacy",
  title: "Cosa conserva Skif",
  intro: "Ogni dato che Skif conserva su di te, e ciò che non raccoglie mai.",
  sections: [
    {
      kind: "hero",
      eyebrow: "Privacy",
      statement: "Cosa conserva Skif, e cosa non raccoglie mai.",
      lead: [
        "Una sicurezza che costa la tua privacy è uno scambio, quindi ecco il nostro per intero: ogni tipo di dato che Skif conserva, perché, e chi può vederlo. È scritto a partire dalla banca dati stessa, non da un modello di informativa.",
      ],
    },
    {
      kind: "table",
      heading: "Cosa viene conservato quando usi Skif",
      anchor: "stored",
      columns: ["Dato", "Cosa contiene", "Chi lo vede"],
      rows: [
        ["Il tuo account", "Un identificativo anonimo del tuo account. Nessun indirizzo e-mail, nessuna password.", "I sistemi di Skif"],
        ["Il tuo profilo", "Il nome con cui un Protector deve chiamarti, se ne indichi uno.", "Il Protector della tua prenotazione, una volta che accetta"],
        [
          "Le tue preferenze",
          "I tuoi limiti invalicabili, le tue preferenze tra i compromessi, lo stile di presenza e le lingue.",
          "Tu; servono per ordinare i passi e abbinare i Protector",
        ],
        [
          "Valutazioni",
          "I luoghi che descrivi (un nome che scegli tu e un quartiere), ciò che ti preoccupa, un'occasione con parole tue, il tuo budget e il piano.",
          "Tu",
        ],
        [
          "Prenotazioni",
          "Il servizio, l'ora, il quartiere e il punto d'incontro, le tue note, i messaggi della prenotazione, il rapporto e la tua valutazione.",
          "Tu, le Operazioni e il Protector; il punto d'incontro solo dopo che ha accettato",
        ],
        ["Reclami", "Ciò che segnali, la risposta e la decisione.", "Tu, le Operazioni e il Protector interessato"],
        [
          "Registro degli accessi",
          "Quale persona delle Operazioni ha aperto un dato sensibile, e quando.",
          "Le Operazioni",
        ],
      ],
    },
    {
      kind: "definitions",
      heading: "Cosa Skif non raccoglie",
      anchor: "not",
      items: [
        {
          term: "La tua posizione",
          detail: "Nessun tracciamento, mai. Una prenotazione contiene il punto d'incontro che scrivi tu.",
        },
        { term: "Fotocamera e microfono", detail: "Mai richiesti." },
        {
          term: "Il tuo controllo rapido e le tue liste",
          detail: "Elaborati e memorizzati solo nel tuo browser. Nulla di ciò che spunti lì arriva a Skif.",
        },
        {
          term: "Statistiche e pubblicità",
          detail: "Nessuna. Le pagine pubbliche caricano un pulsante per il feedback, così puoi segnalare un problema se lo desideri; le pagine dopo l'accesso non caricano alcuno script di terzi.",
        },
      ],
    },
    {
      kind: "prose",
      heading: "Dove si trovano, e come cancellarli",
      anchor: "where",
      paragraphs: [
        "Tutto si trova nella banca dati di Skif, su un server che gestisce in Germania, mai presso un'azienda di telecamere, di allarmi o di pubblicità.",
        "Cancellare i tuoi dati da solo non è ancora possibile. Finché non lo sarà, scrivi a cato@orangecat.ch e una persona li cancella.",
      ],
    },
  ],
};
