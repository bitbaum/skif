import type { Guide } from "../../types";

export const WOMEN_FR: Guide = {
  slug: "womens-safety",
  title: "La sécurité des femmes, telle qu'elle est vraiment",
  fields: ["PHYSICAL", "PRIVACY", "FAMILY"],
  summary: "Le danger venu d'inconnus n'est que la moitié de l'histoire. Les proches, la surveillance numérique, et les compétences qui fonctionnent pour une personne plus petite.",
  photo: "tramStop",
  statement: "L'autodéfense des femmes commence plus près de chez soi.",
  lead: [
    "L'Organisation mondiale de la Santé indique que la forme de violence la plus répandue contre les femmes dans le monde est la violence d'un partenaire intime. Des conseils qui ne parlent que de rues sombres et d'inconnus laissent de côté l'essentiel du danger.",
    "Ce guide couvre donc trois choses : la rue, les personnes que vous connaissez, et le téléphone dans votre poche. Rien de tout cela ne vous demande de vivre plus petit. Il s'agit d'aller où vous voulez, avec un plan.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Dans la rue",
      anchor: "street",
      items: [
        { term: "Partagez le trajet", detail: "Envoyez votre itinéraire et votre heure d'arrivée à quelqu'un, ou partagez votre position en direct pour le trajet seulement, puis désactivez-la." },
        { term: "Choisissez le wagon", detail: "Dans les trams et les trains, asseyez-vous près du conducteur ou près d'autres personnes, à côté d'une porte." },
        { term: "Une attention non désirée", detail: "Nommez-la à voix haute et clairement — « Arrêtez de me suivre » — pour que les gens autour le remarquent. Puis allez vers les gens et la lumière." },
        { term: "Entraînez le levier, pas les muscles", detail: "Les arts de lutte comme le BJJ et le judo apprennent à une personne plus petite à en contrôler une plus grande. Voir le guide sur les sports de combat." },
      ],
    },
    {
      kind: "definitions",
      heading: "Avec les personnes que vous connaissez",
      anchor: "known",
      items: [
        { term: "Repérez le contrôle", detail: "Vérifier votre téléphone, contrôler l'argent, vous isoler de vos amis, surveiller où vous êtes : ce sont des signaux d'alarme, que quelqu'un ait déjà frappé ou non." },
        { term: "Un plan de départ discret", detail: "Des copies de vos documents, un peu d'argent, un téléphone de secours chargé et un endroit où aller, gardés là où vous seule le savez." },
        { term: "L'aide existe", detail: "En Suisse, les centres de consultation LAVI (aide aux victimes, Opferhilfe) donnent des conseils gratuits et confidentiels. En cas de danger, appelez le 117." },
      ],
    },
    {
      kind: "definitions",
      heading: "Dans votre téléphone",
      anchor: "phone",
      items: [
        { term: "Traceurs inconnus", detail: "Les iPhone et téléphones Android récents avertissent quand un traceur inconnu se déplace avec vous. Laissez ces alertes activées, et vérifiez vos sacs et votre voiture si l'une apparaît." },
        { term: "Logiciels espions", detail: "Une batterie qui se vide vite, des réglages modifiés sans que vous les ayez touchés, quelqu'un qui sait ce que vous avez dit dans des messages privés. Un contrôle par un spécialiste, ou une réinitialisation d'usine, les supprime." },
        { term: "Comptes partagés", detail: "Le partage familial, les photos partagées dans le cloud et les mots de passe enregistrés sur un appareil qu'une autre personne a utilisé peuvent tous révéler où vous êtes. Passez-les en revue." },
      ],
    },
  ],
};
