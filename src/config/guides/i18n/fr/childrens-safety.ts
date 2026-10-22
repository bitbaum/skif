import type { Guide } from "../../types";

export const CHILDREN_FR: Guide = {
  slug: "childrens-safety",
  title: "La sécurité des enfants, selon l'âge",
  fields: ["FAMILY", "HEALTH", "CYBER"],
  summary: "Ce qu'un enfant peut apprendre à chaque âge, de son propre numéro de téléphone à la manipulation en ligne (grooming), sans l'élever dans la peur.",
  photo: "familyPath",
  statement: "Un enfant capable est un enfant plus en sécurité.",
  lead: [
    "Ce n'est pas la peur du monde qui protège les enfants, mais le fait de savoir quoi y faire. Chaque compétence ci-dessous correspond à un âge et grandit avec l'enfant.",
    "Le but est la liberté : un enfant qui connaît les règles peut aller à l'école à pied, aller chez un ami et utiliser un téléphone avec plus d'autonomie, plus tôt.",
  ],
  sections: [
    {
      kind: "table",
      heading: "Quoi enseigner, et quand",
      anchor: "by-age",
      columns: ["Âge", "Compétences"],
      rows: [
        ["3 à 5 ans", "Son nom complet et le nom d'un parent ; quoi faire s'il est perdu (rester sur place, aller vers un parent avec des enfants ou un vendeur de magasin) ; les noms des parties du corps ; aucun adulte ne lui demande de garder un secret envers ses parents."],
        ["6 à 9 ans", "Le numéro de téléphone d'un parent par cœur ; les numéros d'urgence ; traverser la route ; les adultes de confiance et un point de rendez-vous familial ; la natation."],
        ["10 à 12 ans", "Faire des trajets seul avec des points de contact ; dire non et partir ; premiers pas en ligne : profils privés, pas de partage de position avec des inconnus."],
        ["13 ans et plus", "Les signes de manipulation en ligne ; le partage d'images et sa permanence ; les fêtes et le retour à la maison ; les premiers secours de base."],
      ],
    },
    {
      kind: "definitions",
      heading: "Des règles valables à tout âge",
      anchor: "rules",
      items: [
        { term: "Des surprises, pas des secrets", detail: "Une surprise est amusante et prend fin ; un secret envers les parents est un signal d'alarme. Les enfants comprennent la différence tôt." },
        { term: "Son corps lui appartient", detail: "Il peut refuser un câlin, y compris de la famille. Cela lui apprend que son non compte." },
        { term: "On peut toujours appeler à la maison", detail: "Il peut appeler pour qu'on vienne le chercher de n'importe où, à n'importe quelle heure, et il n'y aura pas de sermon ce soir-là." },
        { term: "L'eau", detail: "L'Organisation mondiale de la Santé compte la noyade parmi les principales causes de décès des jeunes enfants. Les cours de natation et la surveillance près de l'eau font partie des mesures de sécurité les plus efficaces qu'une famille puisse prendre." },
      ],
    },
    {
      kind: "prose",
      heading: "La manipulation en ligne (grooming)",
      anchor: "grooming",
      paragraphs: [
        "La manipulation suit un schéma : de l'attention et des flatteries, le passage à un canal privé, des cadeaux ou des crédits de jeu, le secret, puis la pression. Enseignez le schéma, pas une liste d'applications : les applications changent ; le schéma, non.",
        "Si cela arrive, gardez les messages, ne confrontez pas la personne, et signalez-le à la police. Assurez-vous que l'enfant sait qu'il n'a rien fait de mal en vous en parlant.",
      ],
    },
  ],
};
