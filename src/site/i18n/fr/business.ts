import type { SitePage } from "@bitbaum/sitekit";

export const BUSINESS_FR: SitePage = {
  path: "business",
  title: "Pour les commerces et les lieux",
  intro: "Magasins, bars, clubs, bureaux et événements.",
  sections: [
    {
      kind: "hero",
      eyebrow: "Pour les commerces et les lieux",
      statement: "Un lieu sûr, c'est bon pour les affaires.",
      lead: [
        "Les clients qui se sentent en sécurité restent plus longtemps et reviennent ; le personnel qui sait quoi faire reste plus calme. Skif regarde le lieu que vous gérez — la porte, la salle, la rue devant, le soir où une manifestation passe — et vous aide à faire le pas le plus proportionné, pas le plus cher.",
      ],
      actions: [
        { label: "Évaluer votre lieu", href: "/signin?mode=create&from=%2Fassessments" },
        { label: "Parler à Skif", href: "mailto:cato@orangecat.ch?subject=Skif%20%E2%80%94%20a%20business%20or%20venue" },
      ],
    },
    {
      kind: "cards",
      heading: "Ce que Skif fait pour un lieu",
      anchor: "what",
      columns: 2,
      cards: [
        { title: "Une évaluation du lieu", body: "Les clients, le personnel, les entrées, la rue, ce qui se passe à une date connue. Un plan où chaque mesure montre ce qu'elle apporte et ce qu'elle coûte, et qui le dit quand rien n'est nécessaire." },
        { title: "Du personnel qui désamorce", body: "Du personnel Skif pour vos soirées les plus chargées, choisi pour la désescalade, les premiers secours et le calme, pas pour la carrure. Il garde les clients en sécurité et appelle le 117 quand c'est nécessaire." },
        { title: "Former votre propre équipe", body: "La désescalade, les premiers secours et l'arrêt d'une hémorragie, pour que les personnes déjà présentes dans votre salle sachent quoi faire dans les premières minutes." },
        { title: "Une manifestation dans votre rue", body: "Une liste pour le jour où une manifestation est annoncée à proximité : fermer à temps, vider la vitrine, s'entendre avec les voisins, et des personnes à vos côtés pendant que vous partez." },
      ],
    },
    {
      kind: "definitions",
      heading: "Comment Skif travaille avec un commerce",
      anchor: "how",
      items: [
        { term: "La proportion d'abord", detail: "Les mesures gratuites passent en premier : des règles de la maison à l'entrée, un briefing avant chaque soirée, l'éclairage, les voisins. Des personnes et des produits seulement là où ils sont la réponse proportionnée." },
        { term: "La vie privée de vos clients", detail: "Chaque mesure montre ce qu'elle coûte en vie privée. Des caméras sur les clients sont une option avec un coût réel, jamais un choix par défaut." },
        { term: "Calme, pas intimidant", detail: "Pas de colosses à la porte. Un client doit se sentir pris en charge, pas surveillé." },
      ],
    },
  ],
};
