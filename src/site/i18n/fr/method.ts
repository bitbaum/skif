import type { SitePage } from "@bitbaum/sitekit";

export const METHOD_FR: SitePage = {
  path: "method",
  title: "Méthode",
  intro: "Comment Skif décide de ce qu'il recommande.",
  sections: [
    {
      kind: "hero",
      eyebrow: "Méthode",
      statement: "Comment Skif décide.",
      lead: [
        "Chaque recommandation de Skif peut être ramenée à ce que vous lui avez dit et à une règle écrite ici. Pas de score caché, pas de modèle qui devine le danger, pas de vente forcée.",
        "Le but est une bonne vie avec peu de risques subis, pas un maximum de sécurité. La surveillance, les restrictions et la peur constante peuvent rendre quelqu'un techniquement plus sûr et sa vie plus pauvre, et Skif compte ce coût.",
      ],
    },
    {
      kind: "index",
      heading: "Sur cette page",
      entries: [
        { label: "La boucle", anchor: "loop" },
        { label: "Le pas le plus proportionné", anchor: "proportionality" },
        { label: "Ce que coûte chaque mesure", anchor: "costs" },
        { label: "D'où vient une note", anchor: "evidence" },
        { label: "Les limites que vous pouvez fixer", anchor: "limits" },
        { label: "Comment un Protector est choisi", anchor: "protectors" },
        { label: "Ce que Skif garde", anchor: "data" },
      ],
    },
    {
      kind: "cards",
      heading: "La boucle",
      anchor: "loop",
      columns: 4,
      cards: [
        { title: "Évaluer", body: "Ce qui compte, ce qui pourrait y nuire, à quel point c'est réellement exposé. Une carte que vous pouvez lire, pas un score." },
        { title: "Améliorer", body: "Des mesures classées selon ce qu'elles apportent et ce qu'elles coûtent en argent, en vie privée, en liberté et en commodité." },
        { title: "Protéger", body: "Une personne seulement là où une personne est la réponse proportionnée, choisie selon ses compétences." },
        { title: "Apprendre", body: "Ce qui a marché et comment vous l'avez vécu, pour que la prochaine recommandation soit meilleure que la précédente." },
      ],
    },
    {
      kind: "prose",
      heading: "Le pas le plus proportionné",
      anchor: "proportionality",
      paragraphs: [
        "Une évaluation transforme ce que vous lui dites en constats : ce qui demande de l'attention, avec quelle urgence, et pourquoi. Elle n'estime jamais la probabilité d'un préjudice, car personne ne peut le faire honnêtement.",
        "Pour chaque constat, le plan recommande une mesure. Il n'en choisit jamais une qui enfreint une limite que vous avez fixée, ni une qui dépasse votre budget ; celles-là sont listées à part, pour que vous voyiez qu'elles existent. Pour la plupart des constats, il choisit la mesure la moins intrusive qui fonctionne : le moins de vie privée cédée, puis le moins d'argent, puis le moins demandé à votre liberté.",
        "Quand vous signalez à Skif une menace connue, le constat devient hautement prioritaire et l'ordre s'inverse : la mesure la plus efficace passe en premier. La proportionnalité joue dans les deux sens.",
        "Là où vous en faites déjà assez, le plan le dit et ne recommande rien de nouveau. Vos préférences entre vie privée et observabilité, faire soi-même et automatisation, protection humaine et technologie, traitement local et confort du cloud, solutions individuelles et solutions collectives, confort et protection maximale changent l'ordre des mesures, jamais les mesures autorisées.",
      ],
    },
    {
      kind: "table",
      heading: "Ce que coûte chaque mesure",
      blurb: "Chaque mesure porte un coût pour la vie privée et un coût pour la liberté sur la même échelle en quatre points, à côté de son prix. Vous voyez les trois avant de choisir.",
      anchor: "costs",
      columns: ["Niveau", "Vie privée", "Liberté"],
      rows: [
        ["0", "Aucune donnée, aucun appareil qui observe", "Ne change rien à votre façon de vivre"],
        ["1", "Partage un peu avec des personnes que vous choisissez", "Vous demande une petite routine"],
        ["2", "Enregistre ou émet au-delà de votre logement", "Quelque chose d'autre décide ou agit pour vous"],
        ["3", "Observe des personnes ou échappe à votre contrôle", "Limite ce que vous pouvez faire"],
      ],
      monoColumns: [0],
    },
    {
      kind: "table",
      heading: "Argent",
      columns: ["Palier", "Signifie"],
      rows: [
        ["Gratuit", "Rien : uniquement des mesures gratuites"],
        ["Moins de CHF 100", "Jusqu'à CHF 100"],
        ["CHF 100–500", "Jusqu'à CHF 500"],
        ["Plus de CHF 500 ou un abonnement", "Davantage, si cela en vaut clairement la peine"],
      ],
    },
    {
      kind: "prose",
      heading: "D'où vient une note",
      anchor: "evidence",
      paragraphs: [
        "Chaque note de bénéfice indique sa base : une recherche publiée, ce que Skif a observé dans son propre travail, un expert nommé, ou le jugement propre de Skif. L'affirmation d'un fabricant n'est jamais utilisée.",
        "Aujourd'hui, chaque note est le jugement propre de Skif, et elle le dit. Aucune n'est marquée « confiance élevée » tant qu'aucune recherche n'y est jointe. Construire ces preuves fait partie du travail.",
      ],
    },
    {
      kind: "definitions",
      heading: "Les limites que vous pouvez fixer",
      blurb: "Une limite n'est jamais marchandée. Une mesure qui en enfreindrait une est exclue de votre plan, et le plan vous dit quelle limite l'a exclue.",
      anchor: "limits",
      items: [
        { term: "Pas de reconnaissance faciale", detail: "Rien qui identifie des visages, sur aucun appareil, nulle part." },
        { term: "Pas de caméra chez moi", detail: "Aucune caméra tournée vers un espace privé." },
        { term: "Pas de vidéo dans le cloud", detail: "La vidéo, s'il y en a, ne quitte jamais les lieux." },
        { term: "Pas de transmission automatique à la police", detail: "Rien n'est transmis à la police sans que je le décide, au cas par cas." },
        { term: "Traitement local uniquement", detail: "Aucune donnée sur mon logement ou sur moi n'en sort vers les serveurs d'un fournisseur ou une centrale de surveillance." },
        { term: "Pas d'enregistrement permanent", detail: "Rien n'enregistre en continu, pas même localement." },
        { term: "Pas de caméra à l'extérieur non plus", detail: "Aucune caméra à ma porte ou sur mon immeuble, quelle que soit son orientation." },
        { term: "Personne pour m'accompagner", detail: "Ne recommandez pas de Protector ; je veux d'autres options." },
      ],
    },
    {
      kind: "prose",
      heading: "Comment un Protector est choisi",
      anchor: "protectors",
      paragraphs: [
        "L'attribution est déterministe et expliquée. Un Protector doit avoir chaque compétence que la réservation exige, vérifiée par les opérations et valable le jour même, et être disponible. Parmi ces Protectors, le classement note les compétences dont chaque service a le plus besoin (la désescalade pour presque tous les services, une compétence physique pour aucun), puis les langues communes, le style de présence et les appréciations passées, et donne une raison pour chaque point.",
        "Un Protector ne voit le lieu de rendez-vous qu'après avoir accepté la mission, et jamais qui vous êtes au-delà de cela. Ensuite, vous évaluez le respect, la discrétion et votre sentiment de sécurité, chacun sur sa propre échelle, pas avec des étoiles.",
      ],
    },
    {
      kind: "prose",
      heading: "Ce que Skif garde",
      anchor: "data",
      paragraphs: [
        "Votre compte est votre identité OrangeCat ; Skif n'en garde pas de séparé. Les évaluations, les plans et les réservations se trouvent dans la propre base de données de Skif, sur un serveur qu'il exploite en Allemagne, jamais chez un fournisseur de caméras ou d'alarmes.",
      ],
    },
  ],
};
