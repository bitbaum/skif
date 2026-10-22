import { PROTECTIVE_METHODS } from "../../protective-methods";
import type { Research } from "../../types";

export const PROTECTIVE_METHODS_IT: Research = {
  slug: PROTECTIVE_METHODS.slug,
  title: "Cosa pubblicano i professionisti della protezione sui loro metodi",
  fields: PROTECTIVE_METHODS.fields,
  summary:
    "Il Secret Service statunitense, la polizia antiterrorismo britannica, la gestione delle minacce in Svizzera e la scienza della valutazione della minaccia: cosa è pubblico, cosa dicono le prove e cosa può servire a una persona privata o a una piccola impresa.",
  photo: PROTECTIVE_METHODS.photo,
  statement: "Cosa pubblicano davvero i professionisti.",
  lead: [
    "I servizi di protezione sono circondati da miti. Alcuni di essi però pubblicano anche: ricerche sugli attacchi, indicazioni per il pubblico e testimonianze su come lavorano. Questo articolo usa solo ciò che è pubblicato e verificabile, dice dove non c'è nulla e si chiude con ciò che una persona privata o una piccola impresa può prendere in prestito.",
  ],
  checked: PROTECTIVE_METHODS.checked,
  sections: [
    {
      kind: "prose",
      heading: "Livelli e preparazione sul posto",
      anchor: "layers",
      paragraphs: [
        "Il Secret Service statunitense descrive i suoi piani di sicurezza come «a più livelli, con una protezione a 360 gradi», costruiti come «tre anelli concentrici di protezione: il perimetro interno, intermedio ed esterno», e pianificati in anticipo insieme allo staff della persona protetta e alla polizia locale [1]. Un ex agente di alto grado descrive l'intelligence protettiva (individuare e valutare le minacce prima di un evento) come ciò che «guida gran parte della metodologia di protezione del Secret Service» [2].",
        "Il modello funziona solo se viene messo in pratica: la revisione dell'agenzia stessa sull'attacco del luglio 2024 a Butler, in Pennsylvania, indica carenze nella sua preparazione sul posto [3]. I livelli sono un piano, non una garanzia.",
        "Per una persona o un negozio i livelli sono più piccoli, ma l'idea è la stessa: pensa a un luogo prima di trovartici, conosci le uscite e i percorsi, e decidi in anticipo chi fa cosa.",
      ],
    },
    {
      kind: "prose",
      heading: "Gli attacchi sono raramente improvvisi, e raramente annunciati",
      anchor: "behaviour",
      paragraphs: [
        "Lo studio fondativo della valutazione della minaccia ha esaminato 83 persone che negli Stati Uniti hanno attaccato, o si sono avvicinate per attaccare, figure pubbliche di spicco. La sua conclusione: «In ogni caso, l'attacco o il quasi-attacco è stato il risultato finale di un processo di pensiero e di azione comprensibile, e spesso riconoscibile» [4]. Nessuno dei 43 assassini e aggressori aveva comunicato in anticipo una minaccia diretta al proprio bersaglio, mentre due terzi avevano parlato o scritto in un modo che lasciava intendere che stessero considerando un attacco [5].",
        "Ricerche successive su 180 aggressori in spazi pubblici hanno constatato che il 76% «aveva mostrato comportamenti che destavano preoccupazione negli altri» prima dell'attacco, e che il 64% aveva mostrato comportamenti così preoccupanti che «avrebbero dovuto ricevere una risposta immediata». La metà era spinta da rancori personali, familiari o legati al lavoro, e nel 53% degli attacchi l'aggressore aveva un legame noto con il luogo [6]. In uno studio sugli attacchi nelle scuole, ogni aggressore aveva mostrato in precedenza comportamenti preoccupanti, e in due terzi dei casi qualcuno aveva visto comportamenti vietati che non erano stati segnalati [7].",
        "Gli stessi ricercatori mettono in guardia dal trasformare tutto questo in paura: la maggior parte delle persone che mostrano tali comportamenti non attacca mai, e «non esiste un profilo del tipo di persona che commetterà un attacco» [6]. La lezione non è il sospetto verso gli sconosciuti, ma l'attenzione ai comportamenti nel tempo, e una soglia bassa per avvisare qualcuno che può intervenire.",
      ],
    },
    {
      kind: "prose",
      heading: "Leggere gli sconosciuti non funziona",
      anchor: "faces",
      paragraphs: [
        "Un'idea diffusa è che persone formate sappiano riconoscere il pericolo da un viso o da una postura. L'ufficio di controllo del governo statunitense (GAO) ha esaminato le prove alla base dello screening comportamentale negli aeroporti e ha constatato che esse «non dimostrano se gli indicatori comportamentali» possano identificare le minacce, e che le persone riconoscono l'inganno «allo stesso livello del caso o di poco meglio» [8].",
        "I controlli aeroportuali in Israele, spesso citati come modello, usano apertamente la profilazione e l'interrogatorio individuale; i resoconti che li descrivono riportano anche trattamenti umilianti nei confronti degli arabi israeliani [9]. Non abbiamo trovato alcuna valutazione sottoposta a revisione paritaria che dimostri che funzionino meglio, e sollevano a loro volta problemi di discriminazione. Skif non li consiglia.",
      ],
    },
    {
      kind: "definitions",
      heading: "Run, Hide, Tell: la formulazione ufficiale",
      blurb: "Il consiglio della polizia antiterrorismo britannica (Counter Terrorism Policing) per un attacco con armi o terroristico, con le sue parole [10][11]. L'equivalente statunitense, Run, Hide, Fight, mette lo stesso ordine al primo posto e il combattimento per ultimo, «solo quando la tua vita è in pericolo imminente» [12].",
      anchor: "run-hide-tell",
      items: [
        {
          term: "Fuggi (Run)",
          detail: "«Se è sicuro, è l'opzione migliore.» Insisti perché gli altri vengano via con te, ma non lasciare che la loro indecisione ti rallenti. Lascia indietro le tue cose. Non fermarti a filmare.",
        },
        {
          term: "Nasconditi (Hide)",
          detail: "«Se non puoi fuggire, nasconditi.» Silenzia il telefono e spegni la vibrazione, chiudi a chiave e barrica, allontanati dalla porta. Essere al riparo dalla vista non significa essere al sicuro: i proiettili possono attraversare vetro, mattoni, legno e metallo.",
        },
        {
          term: "Avvisa (Tell)",
          detail: "Chiama la polizia quando è sicuro farlo (il 117 in Svizzera, il 999 nel Regno Unito): cosa sta succedendo, dove, gli aggressori, la direzione che hanno preso. Impedisci ad altri di entrare, se è sicuro farlo.",
        },
      ],
    },
    {
      kind: "prose",
      heading: "La ricognizione ostile, e il potere del saluto",
      anchor: "reconnaissance",
      paragraphs: [
        "L'autorità britannica per la sicurezza protettiva definisce la ricognizione ostile come «osservazione mirata con l'intento di raccogliere informazioni per pianificare un atto ostile». La sua contromisura è negare, individuare e dissuadere: orari e posizioni imprevedibili della sicurezza rendono difficile imparare gli schemi, e chi pianifica un danno è più ansioso dei normali visitatori, il che lo rende più facile da notare [13].",
        "Un pacchetto di formazione britannico affine per le imprese, See, Check and Notify, insegna al personale a usare ciò che ha già, compreso quello che chiama «il potere del saluto» [14]. Un saluto cordiale e attento è insieme buon servizio e buona sicurezza.",
      ],
    },
    {
      kind: "prose",
      heading: "Svizzera",
      anchor: "switzerland",
      paragraphs: [
        "Il rapporto annuale del Servizio delle attività informative della Confederazione valuta la minaccia terroristica in Svizzera come elevata, determinata soprattutto da individui di ispirazione jihadista che agiscono «con i mezzi più semplici», con la radicalizzazione online dei giovani come fattore principale [15][16].",
        "Il Canton Zurigo gestisce un servizio cantonale di gestione delle minacce il cui scopo è prevenire atti di violenza; osserva che spesso i segnali d'allarme precedono una violenza mirata grave, e chiunque può rivolgere una preoccupazione direttamente alla polizia cantonale. In caso di emergenza, chiama il 117 [17].",
      ],
    },
    {
      kind: "prose",
      heading: "Fermare un'emorragia",
      anchor: "bleeding",
      paragraphs: [
        "Stop the Bleed, gestito dall'American College of Surgeons, insegna tre azioni: compressione diretta, tamponamento della ferita e laccio emostatico [18]. In uno studio militare su 232 feriti, i lacci emostatici applicati prima dell'insorgere dello shock erano fortemente associati alla sopravvivenza (90% contro 10%), e nessun arto è andato perso a causa loro [19]. Si trattava di traumi di guerra, non di una strada cittadina, ma la tecnica è la stessa e si impara in un pomeriggio.",
      ],
    },
    {
      kind: "prose",
      heading: "Dove le prove sono scarse",
      anchor: "thin",
      paragraphs: [
        "Il GIGN francese e i servizi di protezione russi e cinesi pubblicano poco o nulla di verificabile sui loro metodi. La discendenza del Systema dalle forze speciali sovietiche si basa sui racconti dei suoi stessi fondatori [20]; le origini del Krav Maga con Imi Lichtenfeld sono ben raccontate dalle sue scuole [21], ma non abbiamo trovato alcuno studio controllato sull'effetto di nessuno dei due sistemi.",
        "Al contrario, uno studio randomizzato su un programma di resistenza per studentesse universitarie (valutare il rischio, riconoscere il pericolo e opporre resistenza verbale e fisica) ha trovato un rischio di stupro consumato in un anno del 5,2% contro il 9,8% nel gruppo di controllo [22]. I metodi che sono stati messi alla prova meritano più peso di quelli con nomi famosi.",
      ],
    },
    {
      kind: "cards",
      heading: "Cosa puoi riprendere tu",
      anchor: "transfers",
      columns: 2,
      cards: [
        {
          title: "Nota i comportamenti, non l'aspetto",
          body: "Il segnale è un comportamento preoccupante nel tempo [6][7]. Non esiste un profilo, e leggere gli sconosciuti è vicino al caso [8].",
        },
        {
          title: "Non aspettare una minaccia",
          body: "Chi rappresenta una minaccia raramente ne pronuncia una [5]. La preoccupazione basta per avvisare qualcuno che può intervenire, come il servizio di gestione delle minacce di Zurigo [17].",
        },
        {
          title: "Prendi sul serio i rancori sul lavoro",
          body: "La metà degli aggressori in spazi pubblici ha agito per un rancore, e la maggior parte aveva un legame con il luogo [6].",
        },
        {
          title: "Pianifica in anticipo, in piccolo",
          body: "Uscite, percorsi e chi fa cosa, decisi prima che servano [1][12].",
        },
        {
          title: "Renditi più difficile da leggere",
          body: "Abitudini variate e meno dettagli online danno meno appigli alla ricognizione [13].",
        },
        {
          title: "Saluta",
          body: "Un personale attento e cordiale è insieme servizio e deterrenza [13][14].",
        },
        {
          title: "Fuggi, nasconditi, poi chiama",
          body: "In ogni programma ufficiale il combattimento è l'ultima risorsa [10][12].",
        },
        {
          title: "Impara a fermare un'emorragia",
          body: "Compressione, tamponamento, laccio emostatico [18][19].",
        },
      ],
    },
  ],
  sources: PROTECTIVE_METHODS.sources,
};
