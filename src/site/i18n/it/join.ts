import type { SitePage } from "@bitbaum/sitekit";

export const JOIN_IT: SitePage = {
  path: "join",
  title: "Unisciti",
  intro: "Protector, scuole e specialisti.",
  sections: [
    {
      kind: "hero",
      eyebrow: "Unisciti",
      statement: "Lavora con Skif.",
      lead: [
        "Skif è una nuova azienda di sicurezza, fondata sul giudizio invece che sull'intimidazione. Ha bisogno di tre tipi di persone: Protector che stiano accanto a chi lo chiede, scuole che insegnino ciò che imparano i Protector, e specialisti per i passi che un Piano di sicurezza consiglia.",
      ],
      actions: [
        { label: "Candidati come Protector", href: "/signin?mode=create&from=%2Fprotector" },
        { label: "Collabora con Skif", href: "mailto:cato@orangecat.ch?subject=Skif%20%E2%80%94%20partnership" },
      ],
    },
    {
      kind: "definitions",
      heading: "Cosa fa un buon Protector",
      blurb: "Qualcuno che la gente vuole al proprio fianco. L'abilità fisica conta, e conta meno di tutto il resto.",
      anchor: "protector",
      items: [
        { term: "Giudizio", detail: "Leggere presto una situazione e scegliere la cosa più discreta che funziona." },
        { term: "Calma sotto pressione", detail: "Restare saldi quando l'altro non lo è, e renderlo più saldo." },
        { term: "De-escalation", detail: "Chiudere un conflitto con le parole, la distanza e la postura invece che con la forza." },
        { term: "Primo soccorso", detail: "Essere la persona utile nei minuti prima che arrivino i soccorsi." },
        { term: "Cura", detail: "Discrezione, rispetto e sensibilità verso chi ha vissuto qualcosa di difficile." },
        {
          term: "Lingue",
          detail: "Inglese, tedesco, svizzero tedesco, francese, italiano, romancio, spagnolo, portoghese, arabo, cinese, giapponese, coreano, russo: ognuna allarga la cerchia di chi puoi aiutare.",
        },
      ],
    },
    {
      kind: "prose",
      heading: "Come funziona la candidatura",
      anchor: "apply",
      paragraphs: [
        "Accedi con OrangeCat e descrivi la tua esperienza; Skif può aiutarti a compilarla partendo da poche frasi. Le Operazioni esaminano ogni candidatura e verificano ogni competenza sulla base delle prove.",
        "Una volta approvato, vedi gli incarichi abbinati a te con il motivo dell'abbinamento. Vedi dove incontrarti solo dopo aver accettato, e mai chi è la persona oltre a questo.",
      ],
    },
    {
      kind: "cards",
      heading: "Scuole e istruttori",
      blurb: "L'Accademia insegnerà alcuni corsi direttamente e manderà le persone a scuole partner per gli altri. Se insegni primo soccorso, parkour, uno sport da combattimento, l'uso delle armi in un poligono autorizzato, la guida o la sicurezza digitale, ci piacerebbe parlarne.",
      anchor: "schools",
      columns: 3,
      cards: [
        { title: "Medicina", body: "Primo soccorso, intervento d'urgenza e corsi avanzati." },
        { title: "Arti marziali e autodifesa", body: "Jiu-jitsu, muay thai, krav maga, immobilizzazione e controllo." },
        {
          title: "Armi",
          body: "Poligoni e istruttori autorizzati per le armi da fuoco; arti del bastone e della lama; difesa dalle armi.",
        },
        { title: "Guida", body: "Guida difensiva e professionale." },
        { title: "Digitale", body: "Sicurezza degli account, privacy e custodia sicura delle chiavi." },
        { title: "Persone", body: "Assistenza attenta ai traumi, psicologia del conflitto e della crisi." },
      ],
    },
    {
      kind: "cards",
      heading: "Specialisti",
      blurb: "I tipi di aiuto che un Piano di sicurezza già consiglia. Man mano che le persone fanno quei passi, Skif le indirizzerà a specialisti di cui si fida.",
      anchor: "specialists",
      columns: 3,
      cards: [
        { title: "Un fabbro o un installatore", body: "Citato in 6 passi che un Piano di sicurezza può consigliare." },
        { title: "Una centrale d'allarme", body: "Citata in 1 passo che un Piano di sicurezza può consigliare." },
        {
          title: "Un istruttore o un'istruttrice di de-escalation",
          body: "Citato in 1 passo che un Piano di sicurezza può consigliare.",
        },
        {
          title: "Uno specialista di sicurezza informatica",
          body: "Citato in 3 passi che un Piano di sicurezza può consigliare.",
        },
        {
          title: "Uno specialista di privacy e cancellazione dei dati",
          body: "Citato in 2 passi che un Piano di sicurezza può consigliare.",
        },
        {
          title: "Uno specialista di reputazione e gestione delle crisi",
          body: "Citato in 1 passo che un Piano di sicurezza può consigliare.",
        },
        {
          title: "Un istruttore o un'istruttrice di primo soccorso e preparazione",
          body: "Citato in 3 passi che un Piano di sicurezza può consigliare.",
        },
        {
          title: "Un avvocato indipendente: Skif indirizza, non dà mai consulenza legale",
          body: "Citato in 1 passo che un Piano di sicurezza può consigliare.",
        },
      ],
    },
  ],
};
