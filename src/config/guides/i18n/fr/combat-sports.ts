import type { Guide } from "../../types";

export const COMBAT_SPORTS_FR: Guide = {
  slug: "combat-sports",
  title: "Sports de combat, jugés dans la rue",
  fields: ["PHYSICAL", "HEALTH"],
  summary: "Boxe, muay-thaï, lutte, judo, BJJ, Krav Maga, Systema et d'autres, comparés sur ce qui compte hors de la salle.",
  photo: "grappling",
  statement: "Ce contre quoi vous vous entraînez compte plus que le nom de la discipline.",
  lead: [
    "Chaque art martial prétend fonctionner. Le seul test qui prédit s'il fonctionnera, c'est la résistance réelle : un sparring régulier contre un partenaire qui essaie vraiment de vous arrêter. Les arts qui pratiquent le sparring construisent une compétence qui résiste à l'adrénaline ; ceux qui ne font que des exercices, souvent pas.",
    "Le deuxième test est la distance. Une confrontation peut se dérouler à distance de coup de pied, au corps à corps ou au sol, souvent dans cet ordre. Aucun art ne couvre les trois à lui seul, et c'est pourquoi la comparaison ci-dessous compte.",
  ],
  sections: [
    {
      kind: "table",
      heading: "La comparaison",
      blurb: "Le jugement de Skif, d'après la façon dont chaque art s'entraîne et ce qu'il laisse de côté. La qualité d'une école, et le fait qu'elle pratique le sparring, comptent plus que le nom de l'art.",
      anchor: "comparison",
      columns: ["Art", "Distance", "Sparring réel", "Fort hors de la salle", "Faible hors de la salle", "Risque de blessure à l'entraînement"],
      rows: [
        ["Boxe", "Coups de poing", "Oui", "Distance, mouvements de tête, vitesse des mains, condition physique", "Ni coups de pied ni lutte ; les mains nues se brisent sur les crânes", "Moyen — chocs à la tête"],
        ["Muay-thaï", "Poings, pieds, genoux, coudes, corps à corps", "Oui", "Contrôle au corps à corps, genoux, endurance", "Peu de travail au sol", "Moyen à élevé"],
        ["Kickboxing", "Poings et pieds", "Oui", "Les forces de la boxe, plus les coups de pied", "Corps à corps et sol", "Moyen"],
        ["Lutte", "Amenées au sol, contrôle", "Oui", "Rester debout, se relever, contrôler", "Pas de frappes ; une amenée au sol sur du béton peut causer de graves blessures", "Moyen"],
        ["Judo", "Projections, immobilisations", "Oui", "Projections, équilibre, et brise-chutes : tomber sans se blesser est une compétence en soi", "Pas de frappes ; les projections sur un sol dur sont dangereuses", "Moyen"],
        ["Jiu-jitsu brésilien", "Contrôle au sol, soumissions", "Oui", "Contrôle sans frapper ; calme sous pression ; la taille compte moins", "Le sol est un mauvais endroit face à plusieurs agresseurs ou sur du béton", "Faible à moyen — articulations"],
        ["MMA", "Toutes les distances", "Oui", "Le test réel le plus large de toutes les distances", "Règles sportives : pas d'armes, un seul adversaire", "Élevé"],
        ["Krav Maga", "Mixte, armes, plusieurs agresseurs", "Selon l'école", "Entraînement par scénarios, conscience des armes, agressivité sous stress", "La qualité varie énormément ; beaucoup d'écoles font rarement du sparring", "Faible à moyen"],
        ["Systema", "Mouvement, respiration, frappes", "Selon l'école", "Respiration et relâchement sous stress", "Peu de mises à l'épreuve ouvertes ; la qualité varie", "Faible"],
        ["Kali / Escrima", "Bâtons, lames, mains nues", "En partie", "Comment les armes bougent, et à quelle vitesse", "Sans sparring, les exercices peuvent s'éloigner de la réalité", "Faible à moyen"],
        ["Parkour", "Mouvement", "Pas un art de combat", "La fuite : vitesse, terrain, obstacles", "Ne sert à rien une fois que vous êtes attrapé", "Moyen — chutes"],
      ],
    },
    {
      kind: "prose",
      heading: "Une combinaison raisonnable",
      anchor: "combination",
      paragraphs: [
        "Pour la plupart des adultes : un art de frappe avec sparring (boxe, kickboxing ou muay-thaï), un art de lutte avec sparring (lutte, judo ou BJJ), et l'habitude de courir. Cela couvre les trois distances et la sortie.",
        "Pour une personne plus petite, les arts de lutte comptent davantage : le levier permet de contrôler une personne plus grande et non entraînée sans échanger de coups. Pour les enfants, le judo, la lutte et le BJJ enseignent la chute, l'équilibre et le contrôle sans coups de poing à la tête.",
        "Chacun de ces arts comporte un risque à l'entraînement, et cela fait partie du calcul, ce n'est pas une raison de les éviter. Le sparring à la tête a des coûts qui s'accumulent au fil des années ; les bonnes salles les gèrent, les mauvaises non.",
      ],
    },
    {
      kind: "definitions",
      heading: "Comment choisir une école",
      anchor: "choosing",
      items: [
        { term: "Regardez d'abord un cours", detail: "Toute bonne école vous le permet. Voyez si les gens font du sparring, et comment ils traitent les débutants." },
        { term: "Cherchez la résistance", detail: "Les exercices, c'est bien ; les exercices seuls, non. Demandez à quelle fréquence les élèves s'entraînent contre un partenaire qui résiste." },
        { term: "Observez la culture des blessures", detail: "Un entraînement dur est normal ; des élèves blessés et un sparring mené par l'ego ne le sont pas." },
        { term: "Méfiez-vous des promesses", detail: "« Désarmement garanti », « techniques mortelles » et méthodes secrètes relèvent du marketing. Les vrais instructeurs parlent de probabilités." },
        { term: "Renseignez-vous sur l'instructeur", detail: "Qui l'a formé, comment il fait combattre ou évaluer ses élèves, et s'il envoie les gens dans d'autres salles quand c'est utile." },
      ],
    },
  ],
};
