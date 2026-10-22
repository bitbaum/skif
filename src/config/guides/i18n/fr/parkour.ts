import { PARKOUR } from "../../parkour";
import type { Guide } from "../../types";

export const PARKOUR_FR: Guide = {
  slug: "parkour",
  title: "Parkour : se déplacer pour s'échapper",
  fields: ["PHYSICAL", "HEALTH"],
  summary: "La compétence physique la plus utile pour la sécurité, c'est partir. Comment le parkour l'entraîne, comment commencer sans se blesser, et où s'entraîner à Zurich.",
  photo: "parkour",
  statement: "Le meilleur combat est celui où vous n'êtes déjà plus là.",
  lead: [
    "Les conseils de la police pour les pires moments dans l'espace public disent la même chose avec des mots différents : si vous pouvez vous éloigner sans danger, faites-le. La police antiterroriste britannique le dit clairement : « Courez vers un lieu sûr. C'est une bien meilleure option que de vous rendre ou de négocier » [1]. S'échapper dépend de voir un itinéraire, et d'avoir un corps capable de le prendre.",
    "Le parkour entraîne exactement cela : passer par-dessus, par-dessous et autour de ce qui se trouve sur le chemin, avec votre seul corps. Il apprend aussi à bien tomber, ce qui concerne bien plus de gens que n'importe quel agresseur.",
  ],
  sections: [
    {
      kind: "prose",
      heading: "Fort, pour être utile",
      anchor: "origins",
      paragraphs: [
        "Le parkour est né de la « méthode naturelle » de Georges Hébert, un système d'entraînement de la marine et de l'armée françaises fait de course, d'escalade, de sauts, de natation et de port de charges, mis à l'épreuve dès 1904 [2]. Sa devise est généralement citée ainsi : « être fort pour être utile » [3]. En 1902, il a aidé à coordonner l'évacuation d'environ 700 personnes lors de l'éruption de la montagne Pelée, en Martinique [3].",
        "La méthode est passée par Raymond Belle, sapeur-pompier militaire de Paris, à son fils David et à un groupe d'amis de Lisses, en banlieue parisienne, dans les années huitante et nonante. Ils l'ont appelée parkour, ou « l'art du déplacement » [2]. Il existe aujourd'hui des compétitions, mais la plupart des pratiquants s'entraînent, tout simplement.",
        "C'est pour cette origine que le parkour a sa place sur Skif. Il n'a jamais été un spectacle ; c'était une manière d'être capable de se sortir soi-même, et de sortir les autres, d'une mauvaise passe.",
      ],
    },
    {
      kind: "cards",
      heading: "Ce qu'il vous apporte",
      anchor: "why",
      columns: 3,
      cards: [
        { title: "Des itinéraires que d'autres ne voient pas", body: "Un mur, une rambarde, un espace entre deux voitures garées cessent d'être des impasses. Plus d'itinéraires, c'est plus de façons de quitter un mauvais endroit. C'est un raisonnement de Skif, pas un résultat mesuré : personne n'a étudié le parkour face à de vraies fuites." },
        { title: "Atterrir au lieu de s'écraser", body: "Une réception de parkour entraînée a réduit la force maximale sur le corps de 38 % et sa vitesse d'application de 54 % par rapport à une réception jambes raides ; une roulade, de 43 % et 63 % [4]." },
        { title: "Bien tomber, à tout âge", body: "Les chutes ont tué environ 842 000 personnes dans le monde en 2023, dont 71 % âgées de 60 ans ou plus, et l'OMS compte les exercices qui sollicitent l'équilibre parmi ce qui les prévient [5]. Des personnes âgées à qui l'on a appris à tomber gardaient une partie de la compétence 20 mois plus tard [6]." },
        { title: "Calme dans l'effort", body: "S'entraîner, c'est faire face à un saut dont on n'est pas sûr, l'évaluer et décider. La compétence, c'est la décision, pas le saut." },
        { title: "Une forme physique qui sert à quelque chose", body: "Sprinter, grimper et porter son propre poids, entraînés pour servir plutôt que pour le miroir." },
        { title: "Gratuit, et dehors", body: "La plupart des entraînements ne demandent qu'une ville et une paire de chaussures. Zurich a une installation de parkour publique et gratuite (ci-dessous)." },
      ],
    },
    {
      kind: "definitions",
      heading: "Commencer sans se blesser",
      anchor: "start",
      blurb: "Les blessures en parkour sont surtout légères : dans une enquête auprès de 180 pratiquants, 1,7 pour 1 000 heures d'entraînement, surtout des entorses de la cheville et des contusions au genou [7]. Ces habitudes sont celles que la recherche associe à moins de blessures.",
      items: [
        { term: "La condition physique d'abord", detail: "Un manque de condition physique était associé aux blessures, tout comme la charge d'entraînement : plus d'heures, plus de blessures [7]. Construisez votre force et augmentez le volume lentement." },
        { term: "La hauteur suit la force", detail: "Les athlètes plus lourds et ceux qui avaient moins de puissance dans les jambes passaient de la réception sur les deux pieds à la roulade à des hauteurs de chute plus basses [8]. Votre hauteur sûre est la vôtre, pas celle de la personne passée avant vous." },
        { term: "Apprendre la réception et la roulade", detail: "Avant toute chute : recevez-vous en douceur sur l'avant des pieds, amortissez avec les jambes, et roulez quand la chute est trop haute pour être tenue [4]." },
        { term: "Les sauts de précision, bas", detail: "Les sauts de précision étaient le mouvement le plus souvent en cause dans les blessures chez 161 pratiquants madrilènes [9]. Entraînez-les sur des lignes au sol, puis bas, longtemps." },
        { term: "S'entraîner avec un coach et avec d'autres", detail: "Un bon groupe corrige votre réception avant qu'elle devienne une habitude, et vous dit quand arrêter. À Zurich, des groupes encadrés proposent une séance d'essai (ci-dessous)." },
        { term: "Respecter les lieux", detail: "Entraînez-vous là où c'est permis, ne laissez rien derrière vous, et arrêtez quand quelqu'un vous le demande. Les fondateurs du mouvement insistaient sur la santé, l'humilité et l'encouragement mutuel [10]." },
      ],
    },
    {
      kind: "table",
      heading: "Ce que disent les données sur les blessures",
      anchor: "injuries",
      blurb: "La plupart des blessures touchent les jambes et la plupart ne demandent rien de plus que du repos. Les blessures graves viennent des réceptions et des chocs contre des objets.",
      columns: ["Étude", "Qui", "Ce qu'elle a trouvé"],
      rows: [
        ["Grosprêtre & El Khattabi, 2022 [7]", "180 pratiquants, France", "1,7 blessure pour 1 000 heures ; surtout des entorses de la cheville et des contusions au genou ; plus de charge d'entraînement et moins de condition physique, plus de blessures"],
        ["Giner-Gran, 2020 [9]", "161 pratiquants, Madrid, un an d'entraînement ou plus", "70 % s'étaient déjà blessés ; 69 % des blessures n'ont demandé ni examens ni chirurgie ; sauts de précision le plus souvent en cause"],
        ["Rossheim & Stephenson, 2017 [11]", "Services d'urgence aux États-Unis, 2009–2015", "La plupart des blessures dues à une réception ou à un choc contre un objet ; 58 % aux bras et aux jambes"],
        ["Puddle & Maulder, 2013 [4]", "10 hommes entraînés sur une plateforme de force", "Les réceptions et roulades de parkour réduisent la force maximale de 38 à 43 % par rapport à une réception jambes raides"],
      ],
    },
    {
      kind: "definitions",
      heading: "Où s'entraîner à Zurich",
      anchor: "zurich",
      blurb: "Vérifié sur les pages des prestataires eux-mêmes ; les prix changent, alors confirmez avant d'y aller.",
      items: [
        { term: "ParkourONE Zürich", detail: "Cours encadrés pour adultes (18 ans et plus), juniors (dès 12 ans), enfants (6–12 ans) et parents avec enfants dès 4 ans, dehors par tous les temps à Dynamo, Universität Zürich, Hardaupark, Kantonsschule Enge et Küsnacht. Une séance d'essai coûte CHF 25 ; les adultes paient CHF 98 par mois [12]. Ils enseignent aussi à Berne, Thoune, Bâle, Münsingen et Brigue [13]." },
        { term: "Sportzentrum Heerenschürli, Schwamendingen", detail: "La première installation de parkour en plein air de Zurich, ouverte depuis août 2022 et d'utilisation gratuite [14]." },
        { term: "Débutants plus âgés", detail: "Skif n'a trouvé aucun cours de parkour pour les plus de 50 ans en Suisse. Les cours pour adultes n'indiquent pas d'âge maximum : demandez une séance d'essai, et dites ce que vous en attendez : souvent l'équilibre et l'art de bien tomber, que des programmes inspirés du parkour enseignent déjà à l'étranger [15]." },
      ],
    },
    {
      kind: "prose",
      heading: "Ce que le parkour ne fait pas",
      anchor: "limits",
      paragraphs: [
        "Il ne sert à rien une fois que quelqu'un vous tient. C'est à cela que servent les arts de lutte (voir Sports de combat, jugés dans la rue). Et il ne justifie pas de prendre des risques que vous ne prendriez pas autrement : l'intérêt de pouvoir partir, c'est de partir tôt, calmement, avant d'avoir besoin de courir.",
        "Les données pour les personnes âgées sont encore préliminaires. Un programme de parkour de 10 semaines pour 20 adultes d'un âge moyen de 67 ans a amélioré la distance à laquelle ils pouvaient atteindre, mais son effet sur le fait de se lever et de marcher était faible et non significatif [15]. Apprendre à tomber repose sur des bases plus solides [6].",
      ],
    },
  ],
  sources: PARKOUR.sources,
  checked: "22 October 2026",
};
