import type { SitePage } from "@bitbaum/sitekit";

export const BUSINESS_IT: SitePage = {
  path: "business",
  title: "Per negozi e locali",
  intro: "Negozi, bar, club, uffici ed eventi.",
  sections: [
    {
      kind: "hero",
      eyebrow: "Per negozi e locali",
      statement: "Un luogo sicuro è un buon affare.",
      lead: [
        "Gli ospiti che si sentono al sicuro restano più a lungo e tornano; il personale che sa cosa fare resta più calmo. Skif guarda il luogo che gestisci (la porta, la sala, la strada davanti, la sera in cui passa una manifestazione) e ti aiuta a fare il passo più proporzionato, non il più caro.",
      ],
      actions: [
        { label: "Valuta il tuo luogo", href: "/signin?mode=create&from=%2Fassessments" },
        {
          label: "Parla con Skif",
          href: "mailto:cato@orangecat.ch?subject=Skif%20%E2%80%94%20a%20business%20or%20venue",
        },
      ],
    },
    {
      kind: "cards",
      heading: "Cosa fa Skif per un luogo",
      anchor: "what",
      columns: 2,
      cards: [
        {
          title: "Una valutazione del luogo",
          body: "Ospiti, personale, ingressi, la strada, cosa succede in una data nota. Un piano in cui ogni passo mostra cosa ottiene e cosa costa, e che lo dice quando non serve nulla.",
        },
        {
          title: "Personale che disinnesca",
          body: "Personale Skif per le tue serate più affollate, scelto per la de-escalation, il primo soccorso e la calma, non per la stazza. Tiene al sicuro gli ospiti e chiama il 117 quando serve.",
        },
        {
          title: "Formare la tua squadra",
          body: "De-escalation, primo soccorso e come fermare un'emorragia, perché le persone già in sala sappiano cosa fare nei primi minuti.",
        },
        {
          title: "Una manifestazione nella tua via",
          body: "Una lista per il giorno in cui è annunciata una manifestazione nelle vicinanze: chiudere in tempo, svuotare la vetrina, accordarsi con i vicini, e qualcuno al tuo fianco mentre te ne vai.",
        },
      ],
    },
    {
      kind: "definitions",
      heading: "Come lavora Skif con un'attività",
      anchor: "how",
      items: [
        {
          term: "Prima la proporzionalità",
          detail: "Prima vengono i passi gratuiti: regole della casa all'ingresso, un briefing prima di ogni serata, l'illuminazione, i vicini. Persone e prodotti solo dove sono la risposta proporzionata.",
        },
        {
          term: "La privacy dei tuoi ospiti",
          detail: "Ogni passo mostra cosa costa in privacy. Le telecamere puntate sugli ospiti sono un'opzione con un costo reale, mai una scelta predefinita.",
        },
        {
          term: "Calma, non intimidazione",
          detail: "Niente buttafuori minacciosi alla porta. Un ospite deve sentirsi accudito, non sorvegliato.",
        },
      ],
    },
  ],
};
