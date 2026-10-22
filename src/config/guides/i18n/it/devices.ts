import type { Guide } from "../../types";

export const DEVICES: Guide = {
  slug: "devices-and-accounts",
  title: "Metti al sicuro i tuoi dispositivi e i tuoi account",
  fields: ["CYBER", "PRIVACY"],
  summary: "Cifra il disco, proteggi l'account e-mail che può reimpostare tutto e fai i backup: una lista in ordine di importanza.",
  photo: "phoneDark",
  statement: "Un'ora oggi chiude la maggior parte delle porte.",
  lead: [
    "La maggior parte delle intrusioni digitali non è ingegnosa. Sfrutta una password riutilizzata, un codice inviato per SMS, un telefono senza codice di sblocco o un portatile non cifrato. Chiudere queste porte richiede un pomeriggio e costa poco o niente.",
    "Fallo in quest'ordine: prima l'account che può reimpostare tutti gli altri, poi i dispositivi che contengono tutto, poi cosa succede quando qualcosa va perso.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "La lista, in ordine",
      anchor: "checklist",
      items: [
        { term: "1 · Un gestore di password", detail: "Una sola password principale lunga, e una password casuale diversa ovunque altro. Mette fine al riutilizzo, la via d'accesso più comune." },
        { term: "2 · Prima proteggi la tua e-mail", detail: "Chi ha la tua e-mail può reimpostare tutto il resto. Dalle una passkey o una chiave di sicurezza fisica, e rimuovi i vecchi numeri e indirizzi di recupero che non controlli più." },
        { term: "3 · Un secondo fattore ovunque altro", detail: "Preferisci passkey, chiavi di sicurezza o un'app di autenticazione agli SMS. Gli SMS sono molto meglio di niente, e i più deboli di questi." },
        { term: "4 · Blocca il tuo numero", detail: "Chiedi al tuo operatore mobile un PIN o un blocco sul trasferimento del numero su una nuova SIM, così nessuno può impossessarsi dei tuoi codici portando via il numero." },
        { term: "5 · Cifra ogni disco", detail: "Vedi la tabella qui sotto. Un portatile rubato ma cifrato è un portatile perso, non una vita persa." },
        { term: "6 · Aggiornamenti attivi, automatici", detail: "Su telefono, portatile, browser e router. La maggior parte degli attacchi sfrutta falle già corrette." },
        { term: "7 · Un vero codice di sblocco", detail: "Più lungo di sei cifre sul telefono, e un breve ritardo per il blocco schermo. Nascondi le anteprime dei messaggi sulla schermata di blocco." },
        { term: "8 · Backup: 3-2-1", detail: "Tre copie di ciò che conta, su due tipi di supporto, di cui una in un altro luogo. Prova un ripristino almeno una volta." },
        { term: "9 · Codici di recupero, offline", detail: "Stampali o scrivili a mano, e tienili dove tieni il passaporto." },
        { term: "10 · Una verifica a ogni stagione", detail: "Sessioni attive, app con accesso ai tuoi account, chi può vedere la tua posizione." },
      ],
    },
    {
      kind: "table",
      heading: "Cifra il disco",
      anchor: "encryption",
      columns: ["Dispositivo", "Come", "Nota"],
      rows: [
        ["Mac", "Impostazioni di Sistema → Privacy e sicurezza → FileVault", "Tieni la chiave di recupero in un posto diverso dal Mac."],
        ["Windows", "Impostazioni → Privacy e sicurezza → Crittografia dispositivo; BitLocker nelle edizioni Pro", "Controlla dov'è salvata la chiave di recupero, spesso nel tuo account Microsoft."],
        ["Linux", "Cifratura completa del disco (LUKS), scelta durante l'installazione", "Aggiungerla dopo di solito significa reinstallare."],
        ["iPhone e iPad", "Cifrati non appena imposti un codice", "Un codice alfanumerico più lungo è più robusto."],
        ["Android", "Cifrato di serie sui dispositivi attuali", "Imposta un blocco schermo robusto; la cifratura dipende da esso."],
      ],
    },
    {
      kind: "faq",
      heading: "Domande frequenti",
      anchor: "questions",
      items: [
        { question: "Una VPN mi rende sicuro?", answer: "Protegge il tuo traffico dalla rete su cui sei, come il Wi-Fi di un albergo. Non ti rende anonimo, e non fa nulla contro una password riutilizzata." },
        { question: "Serve ancora un antivirus?", answer: "La protezione integrata nei sistemi operativi attuali basta alla maggior parte delle persone. Contano di più gli aggiornamenti e il non installare cose che non stavi cercando." },
        { question: "E se sono un bersaglio, non una persona qualunque?", answer: "Allora un controllo da uno specialista è proporzionato: i dispositivi per verificare se sono compromessi, gli account per gli accessi, e cosa si trova su di te. Un Piano di sicurezza lo raccomanda quando ciò che gli racconti lo giustifica." },
      ],
    },
  ],
};
