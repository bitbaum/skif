import type { SitePage } from "@bitbaum/sitekit";

export const PROTECTORS_IT: SitePage = {
  path: "protectors",
  title: "Protector",
  intro: "Qualcuno di calmo al tuo fianco.",
  sections: [
    {
      kind: "hero",
      eyebrow: "Protector",
      statement: "Qualcuno di calmo al tuo fianco.",
      lead: [
        "Un Protector di Skif è un professionista verificato che vorresti accanto a te: attento, saldo, formato nella de-escalation e nel primo soccorso. Scelto per il giudizio più che per la stazza, abbinato a ciò che hai chiesto, e l'abbinamento è spiegato.",
      ],
      actions: [
        { label: "Prenota un Protector", href: "/signin?mode=create&from=%2Fbookings%2Fnew" },
        { label: "Diventa Protector", href: "/join" },
      ],
    },
    {
      kind: "cards",
      heading: "Per cosa si prenota un Protector",
      anchor: "services",
      columns: 2,
      cards: [
        { title: "Serata fuori", body: "Una persona calma e qualificata con te per una serata in città." },
        { title: "Tornare a casa", body: "Accompagnamento a casa dopo attenzioni indesiderate o a notte fonda." },
        {
          title: "Persona molto esposta",
          body: "Protezione discreta per chi ha un profilo pubblico o finanziario.",
        },
        { title: "Famiglia", body: "Una presenza salda per un'uscita in famiglia o un'occasione difficile." },
        {
          title: "Personale di de-escalation per locali",
          body: "Per discoteche e locali: personale che disinnesca invece di affrontare.",
        },
        {
          title: "Protezione personale",
          body: "Un professionista formato nella protezione ravvicinata con te per la giornata o per un'occasione.",
        },
        { title: "Protector + autista", body: "Un Protector che ti fa anche da autista, da porta a porta." },
        {
          title: "Supporto specialistico",
          body: "Qualcuno con una qualifica specifica: medica, di sicurezza digitale, di sostegno a persone vulnerabili.",
        },
      ],
    },
    {
      kind: "definitions",
      heading: "Come funziona una prenotazione",
      anchor: "booking",
      items: [
        {
          term: "1 · Chiedi",
          detail: "Di' cosa ti serve, quando, per quanto tempo e più o meno dove. Il punto d'incontro esatto viene condiviso solo con il Protector che accetta.",
        },
        {
          term: "2 · Le Operazioni abbinano",
          detail: "Solo Protector che possiedono ogni competenza richiesta dall'incarico, verificata e valida quel giorno, e che sono disponibili. Ognuno in classifica, con una motivazione per ogni punto.",
        },
        {
          term: "3 · Un Protector accetta",
          detail: "Vede dove incontrarti, mai chi sei oltre a ciò che serve all'incarico.",
        },
        {
          term: "4 · Il giorno stesso",
          detail: "Si presenta, resta con te e dopo redige un rapporto. In caso di emergenza chiama il 117 o il 144; Skif non è un servizio di emergenza.",
        },
        {
          term: "5 · Dai una valutazione",
          detail: "Rispetto, discrezione e quanto ti sei sentito al sicuro, ognuno sulla propria scala, non stelle. Un reclamo viene ascoltato in modo confidenziale e deciso da una persona.",
        },
      ],
    },
    {
      kind: "definitions",
      heading: "Cosa non è un Protector",
      blurb: "Detto chiaramente, perché nessuno prenoti la cosa sbagliata.",
      anchor: "not",
      items: [
        {
          term: "Non è la polizia",
          detail: "Un Protector non ha poteri di polizia. Quando serve la polizia, chiama il 117 e resta con te finché arriva.",
        },
        {
          term: "Non è un servizio di emergenza",
          detail: "Skif non può inviare polizia, ambulanza o pompieri. In caso di emergenza, chiama prima loro.",
        },
        {
          term: "Non è lì per combattere",
          detail: "Il compito è mantenere la calma e tenerti al sicuro: distanza, de-escalation, andarsene. La forza è l'ultima risorsa, nei limiti della legge, e mai il piano.",
        },
        {
          term: "Non è sorveglianza",
          detail: "Il servizio è qualcuno con te, non qualcuno che osserva gli altri. Il rapporto di un Protector dopo un incarico è fatto di parole scritte; Skif non raccoglie foto né video.",
        },
        {
          term: "Non è una garanzia",
          detail: "Nessuno può promettere che non succeda nulla. Un Protector rende meno probabili le cose probabili e più brevi i momenti brutti.",
        },
      ],
    },
    {
      kind: "prose",
      heading: "Armi",
      anchor: "weapons",
      paragraphs: [
        "La maggior parte del lavoro di Skif non comporta alcuna arma: gli strumenti di un Protector sono il giudizio, la distanza, la de-escalation e il primo soccorso. Un Protector porta un'arma solo dove ha il permesso legale di portarla e l'incarico lo richiede.",
      ],
    },
    {
      kind: "faq",
      heading: "Domande frequenti",
      anchor: "questions",
      items: [
        {
          question: "Quanto costa?",
          answer: "Le Operazioni fanno un preventivo per ogni prenotazione; non c'è ancora un prezzo fisso. Il pagamento viene regolato direttamente con te dalle Operazioni.",
        },
        {
          question: "Quanto in fretta può arrivare qualcuno?",
          answer: "Skif non promette una disponibilità immediata. Prenota il prima possibile; una richiesta non assegnata scade all'ora d'inizio invece di lasciarti in attesa.",
        },
        {
          question: "Posso scegliere la persona?",
          answer: "Fissi tu ciò che conta, come le lingue, il primo soccorso o un autista, e se la presenza deve essere discreta o visibile. Le Operazioni abbinano entro questi criteri.",
        },
      ],
    },
  ],
};
