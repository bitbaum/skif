import type { Guide } from "../../types";

export const DEVICES_FR: Guide = {
  slug: "devices-and-accounts",
  title: "Verrouiller vos appareils et vos comptes",
  fields: ["CYBER", "PRIVACY"],
  summary: "Chiffrer le disque, protéger le compte e-mail qui réinitialise tout, et faire des sauvegardes — une liste dans l'ordre de ce qui compte.",
  photo: "phoneDark",
  statement: "Une heure aujourd'hui ferme la plupart des portes.",
  lead: [
    "La plupart des intrusions numériques n'ont rien de malin. Elles exploitent un mot de passe réutilisé, un code envoyé par SMS, un téléphone sans code d'accès ou un ordinateur portable non chiffré. Fermer ces portes prend un après-midi et coûte peu, voire rien.",
    "Faites-le dans cet ordre : d'abord le compte qui peut réinitialiser tous les autres, puis les appareils qui contiennent tout, puis ce qui se passe quand quelque chose est perdu.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "La liste, dans l'ordre",
      anchor: "checklist",
      items: [
        { term: "1 · Un gestionnaire de mots de passe", detail: "Un long mot de passe principal, et un mot de passe aléatoire différent partout ailleurs. Cela met fin à la réutilisation, la porte d'entrée la plus courante." },
        { term: "2 · Protégez d'abord votre e-mail", detail: "Qui détient votre e-mail peut réinitialiser tout le reste. Donnez-lui une clé d'accès (passkey) ou une clé de sécurité physique, et supprimez les anciens numéros et adresses de récupération que vous ne contrôlez plus." },
        { term: "3 · Un second facteur partout ailleurs", detail: "Préférez les clés d'accès, les clés de sécurité ou une application d'authentification au SMS. Le SMS vaut bien mieux que rien, et c'est le plus faible des trois." },
        { term: "4 · Verrouillez votre numéro", detail: "Demandez à votre opérateur mobile un code PIN ou un verrou sur le transfert de votre numéro vers une nouvelle carte SIM, pour que personne ne puisse s'emparer de vos codes en le transférant." },
        { term: "5 · Chiffrez chaque disque", detail: "Voir le tableau ci-dessous. Un ordinateur portable volé mais chiffré, c'est un ordinateur perdu, pas une vie perdue." },
        { term: "6 · Les mises à jour, automatiquement", detail: "Sur le téléphone, l'ordinateur, le navigateur et le routeur. La plupart des attaques exploitent des failles déjà corrigées." },
        { term: "7 · Un vrai code d'accès", detail: "Plus de six chiffres sur un téléphone, et un délai de verrouillage de l'écran court. Masquez l'aperçu des messages sur l'écran verrouillé." },
        { term: "8 · Sauvegardes : 3-2-1", detail: "Trois copies de ce qui compte, sur deux types de supports, dont une ailleurs. Testez une restauration une fois." },
        { term: "9 · Codes de récupération, hors ligne", detail: "Imprimez-les ou notez-les, et rangez-les là où vous rangez votre passeport." },
        { term: "10 · Une revue à chaque saison", detail: "Les sessions ouvertes, les applications qui ont accès à vos comptes, qui peut voir votre position." },
      ],
    },
    {
      kind: "table",
      heading: "Chiffrer le disque",
      anchor: "encryption",
      columns: ["Appareil", "Comment", "Remarque"],
      rows: [
        ["Mac", "Réglages Système → Confidentialité et sécurité → FileVault", "Gardez la clé de récupération ailleurs que sur le Mac."],
        ["Windows", "Paramètres → Confidentialité et sécurité → Chiffrement de l'appareil ; BitLocker sur les éditions Pro", "Vérifiez où la clé de récupération est enregistrée, souvent dans votre compte Microsoft."],
        ["Linux", "Chiffrement complet du disque (LUKS), choisi à l'installation", "L'ajouter plus tard implique généralement de réinstaller."],
        ["iPhone et iPad", "Chiffrés dès qu'un code d'accès est défini", "Un code alphanumérique plus long est plus solide."],
        ["Android", "Chiffrés par défaut sur les appareils récents", "Définissez un verrouillage d'écran solide ; le chiffrement en dépend."],
      ],
    },
    {
      kind: "faq",
      heading: "Questions fréquentes",
      anchor: "questions",
      items: [
        { question: "Un VPN me met-il en sécurité ?", answer: "Il protège votre trafic du réseau sur lequel vous êtes, comme le Wi-Fi d'un hôtel. Il ne vous rend pas anonyme, et il ne fait rien contre un mot de passe réutilisé." },
        { question: "Un antivirus est-il encore nécessaire ?", answer: "La protection intégrée aux systèmes d'exploitation actuels suffit pour la plupart des gens. Les mises à jour, et ne pas installer ce que vous ne cherchiez pas, comptent davantage." },
        { question: "Et si je suis une cible, pas n'importe qui ?", answer: "Alors un contrôle par un spécialiste est proportionné : les appareils pour une compromission, les comptes pour des accès, et ce qu'on peut trouver sur vous. Un plan de sécurité le recommande quand ce que vous lui dites le justifie." },
      ],
    },
  ],
};
