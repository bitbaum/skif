import type { SitePage } from "@bitbaum/sitekit";

export const PRIVACY_FR: SitePage = {
  path: "privacy",
  title: "Ce que Skif garde",
  intro: "Chaque donnée que Skif conserve sur vous, et ce qu'il ne collecte jamais.",
  sections: [
    {
      kind: "hero",
      eyebrow: "Vie privée",
      statement: "Ce que Skif garde, et ce qu'il ne collecte jamais.",
      lead: [
        "Une sécurité qui coûte votre vie privée est un échange ; voici donc le nôtre, en entier : chaque type de données que Skif conserve, pourquoi, et qui peut les voir. Ce texte est écrit à partir de la base de données elle-même, pas d'un modèle de politique de confidentialité.",
      ],
    },
    {
      kind: "table",
      heading: "Ce qui est conservé quand vous utilisez Skif",
      anchor: "stored",
      columns: ["Donnée", "Ce qu'elle contient", "Qui la voit"],
      rows: [
        ["Votre compte", "Un identifiant anonyme issu de votre compte. Pas d'adresse e-mail, pas de mot de passe.", "Les systèmes de Skif"],
        ["Votre profil", "Le nom par lequel un Protector doit vous appeler, si vous en donnez un.", "Le Protector de votre réservation, une fois qu'il a accepté"],
        ["Vos préférences", "Vos limites strictes, vos préférences entre les compromis, votre style de présence et vos langues.", "Vous ; elles servent à classer les mesures et à attribuer les Protectors"],
        ["Évaluations", "Les lieux que vous décrivez (un nom que vous choisissez et un quartier), ce qui vous inquiète, une occasion dans vos propres mots, votre budget, et le plan.", "Vous"],
        ["Réservations", "Le service, l'heure, le quartier et le lieu de rendez-vous, vos remarques, les messages de la réservation, le rapport et votre évaluation.", "Vous, les opérations et le Protector — le lieu de rendez-vous seulement après qu'il a accepté"],
        ["Plaintes", "Ce que vous soulevez, la réponse et la décision.", "Vous, les opérations et le Protector concerné"],
        ["Journal des accès", "Quelle personne des opérations a ouvert une donnée sensible, et quand.", "Les opérations"],
      ],
    },
    {
      kind: "definitions",
      heading: "Ce que Skif ne collecte pas",
      anchor: "not",
      items: [
        { term: "Votre position", detail: "Aucun suivi, jamais. Une réservation contient le lieu de rendez-vous que vous saisissez." },
        { term: "Caméra et microphone", detail: "Jamais demandés." },
        { term: "Votre contrôle rapide et vos listes", detail: "Calculés et mémorisés uniquement dans votre navigateur. Rien de ce que vous y cochez ne parvient à Skif." },
        { term: "Statistiques d'audience et publicité", detail: "Aucune. Les pages publiques chargent un seul bouton de retour d'expérience, pour que vous puissiez signaler un problème si vous le souhaitez ; les pages accessibles après connexion ne chargent aucun script tiers." },
      ],
    },
    {
      kind: "prose",
      heading: "Où se trouvent ces données, et leur suppression",
      anchor: "where",
      paragraphs: [
        "Tout se trouve dans la propre base de données de Skif, sur un serveur qu'il exploite en Allemagne, jamais chez une entreprise de caméras, d'alarmes ou de publicité.",
        "La suppression de vos données par vous-même n'est pas encore disponible. D'ici là, écrivez à cato@orangecat.ch et une personne les supprime.",
      ],
    },
  ],
};
