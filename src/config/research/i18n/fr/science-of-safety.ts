import { SCIENCE_OF_SAFETY } from "../../science-of-safety";
import type { Research } from "../../types";

export const SCIENCE_OF_SAFETY_FR: Research = {
  slug: "science-of-safety",
  title: "La science de la sécurité : ce que disent les preuves",
  fields: ["PHYSICAL", "CYBER", "HEALTH", "ENVIRONMENTAL"],
  summary:
    "Pourquoi la criminalité se produit là où elle se produit, ce que font vraiment l'éclairage et les caméras, si résister est utile, la désescalade, la sécurité des comptes, la Suisse en chiffres, les premières minutes d'une urgence, et comment comparer les risques.",
  photo: "books",
  statement: "Ce qui marche, mesuré.",
  lead: [
    "Une grande partie des conseils de sécurité relève du folklore. Cet article rassemble ce qui a réellement été mesuré — revues systématiques, essais randomisés, statistiques nationales — avec la taille de chaque effet et ses limites. Chaque chiffre provient de la source citée à côté.",
  ],
  checked: SCIENCE_OF_SAFETY.checked,
  sections: [
    {
      kind: "prose",
      heading: "Pourquoi la criminalité se produit là où elle se produit",
      anchor: "where",
      paragraphs: [
        "La théorie des activités routinières, formulée par Cohen et Felson en 1979, explique la criminalité comme la rencontre de trois éléments : une personne motivée à commettre une infraction, une cible appropriée, et l'absence d'un gardien capable [1]. La prévention situationnelle de la criminalité, développée par Clarke, agit sur les deux derniers : rendre les cibles plus difficiles à atteindre et la surveillance plus probable [2].",
        "L'objection habituelle est que la criminalité se déplace simplement ailleurs. Une revue de 102 évaluations a constaté un déplacement dans 26 % des observations et l'inverse — des bénéfices qui s'étendent aux lieux voisins — dans 27 % ; là où un déplacement s'est produit, il tendait à être plus faible que l'effet de la mesure elle-même [3].",
      ],
    },
    {
      kind: "prose",
      heading: "Éclairage et caméras",
      anchor: "lighting-cameras",
      paragraphs: [
        "Un meilleur éclairage public a réduit la criminalité de 20 % sur 13 études, davantage au Royaume-Uni qu'aux États-Unis. La criminalité nocturne n'a pas baissé davantage que la criminalité diurne ; les auteurs attribuent donc l'effet à la fierté collective et au contrôle social informel plutôt qu'au fait d'être vu [4].",
        "Les caméras font moins qu'on ne le croit. Une revue Campbell a constaté que la vidéosurveillance « a un impact modeste sur la criminalité », fonctionne le mieux dans les parkings et « n'a pas d'effet sur le niveau de criminalité violente » [5]. Une mise à jour couvrant 40 ans a trouvé les effets les plus importants et les plus constants dans les parkings, des effets plus importants quand les caméras sont surveillées activement, et déconseille les caméras comme mesure « isolée » [6].",
        "Pour un logement ou un magasin, c'est une constatation utile : une caméra aide surtout contre les atteintes aux biens et aux véhicules, après coup, avec un coût réel pour la vie privée de toutes les personnes qu'elle filme. La lumière, la présence humaine et l'attention font davantage pour la sécurité des personnes.",
      ],
    },
    {
      kind: "prose",
      heading: "Concevoir les lieux",
      anchor: "design",
      paragraphs: [
        "La prévention de la criminalité par l'aménagement du milieu (lignes de vue dégagées, surveillance naturelle, appropriation claire de l'espace) est largement utilisée et plausible. Ses propres auteurs de synthèse écrivent que les preuves sont « peu concluantes et très critiquées » [7]. Skif la traite comme une pratique raisonnable, pas comme une science prouvée.",
      ],
    },
    {
      kind: "prose",
      heading: "Résister, est-ce utile ?",
      anchor: "resisting",
      paragraphs: [
        "Sur 27 595 incidents tirés de l'enquête de victimisation américaine, les actions d'autoprotection, avec ou sans usage de la force, ont réduit la probabilité de perte de biens et de blessure par rapport à l'absence de résistance ; quand les deux sont survenues, la blessure n'a suivi l'autoprotection que dans 10 % des cas [8]. Pour le viol en particulier, la plupart des actions d'autoprotection ont réduit le risque que le viol soit consommé sans augmenter significativement le risque d'autres blessures [9]. Ce sont des données d'observation américaines, pas des expériences.",
        "La preuve la plus solide est un essai randomisé d'un programme de résistance auprès de 893 étudiantes universitaires : évaluer le risque, reconnaître le danger, et agir par une résistance verbale et physique. Le risque de viol consommé sur un an était de 5,2 % contre 9,8 % dans le groupe témoin, soit une réduction relative de 46 % [10]. Lors d'une utilisation ultérieure courante dans cinq universités, les viols consommés ont baissé de 57 % à six mois, mais sans randomisation [11].",
      ],
    },
    {
      kind: "prose",
      heading: "Désescalade",
      anchor: "de-escalation",
      paragraphs: [
        "Lors d'un déploiement randomisé d'une formation à la désescalade dans la police de Louisville, les incidents avec usage de la force ont baissé de 28 %, les blessures de citoyens de 26 % et celles des agents de 36 % [12]. Une revue de 64 évaluations dans différentes professions a trouvé des améliorations légères à modérées, tout en avertissant que presque toutes les études étaient de qualité discutable [13] ; dans les soins psychiatriques, la formation améliore de façon fiable les connaissances et l'assurance, sans conclusion solide pour l'instant sur les agressions [14].",
        "Le résumé honnête : la désescalade est le bon réflexe par défaut et les preuves vont dans le bon sens, mais elles sont plus jeunes que sa popularité.",
      ],
    },
    {
      kind: "prose",
      heading: "Comptes et appareils",
      anchor: "accounts",
      paragraphs: [
        "Les recherches de Google avec l'Université de New York et l'UC San Diego ont montré qu'un code par SMS envoyé à un téléphone de récupération bloquait 100 % des robots automatisés, 96 % de l'hameçonnage de masse et 76 % des attaques ciblées ; qu'une invite sur l'appareil bloquait 99 % de l'hameçonnage de masse et 90 % des attaques ciblées ; et qu'aucun utilisateur qui s'appuyait uniquement sur des clés de sécurité n'a été victime d'hameçonnage ciblé pendant l'étude [15]. Microsoft affirme qu'un compte a « plus de 99,9 % de risques en moins d'être compromis » avec l'authentification multifacteur [16] — un chiffre de fournisseur, sans méthode publiée.",
        "L'agence américaine de cybersécurité CISA le dit clairement : toute authentification multifacteur vaut mieux qu'aucune, et l'authentification résistante à l'hameçonnage (FIDO/WebAuthn : clés de sécurité et passkeys) est « la référence absolue » [17].",
      ],
    },
    {
      kind: "table",
      heading: "La Suisse en chiffres",
      blurb: "Les chiffres officiels les plus récents que nous avons pu lire en entier. Les signalements à l'office de la cybersécurité sont volontaires ; les chiffres réels sont donc plus élevés.",
      anchor: "switzerland",
      columns: ["Mesure", "Chiffre", "Source"],
      rows: [
        ["Infractions commises par voie numérique, 2025", "57 761 (−2 %) ; dont 54 247 relevant de la cybercriminalité économique", "Office fédéral de la statistique [18]"],
        ["Victimes de cybercriminalité économique escroquées en ligne", "81,2 % de 36 572", "Office fédéral de la statistique [18]"],
        ["Signalements à l'Office fédéral de la cybersécurité, 2025", "Un peu moins de 65 000 (21 000 cinq ans plus tôt)", "OFCS via Netzwoche [19]"],
        ["Phénomène le plus signalé, 2025", "Faux appels au nom des autorités, 26 % des signalements", "OFCS via Netzwoche [19]"],
        ["Infractions de violence, 2025", "49 915 (+2 %)", "Office fédéral de la statistique [18]"],
        ["Homicides consommés, 2025", "55, dont 61,8 % dans le couple ou la famille", "Office fédéral de la statistique [18]"],
        ["Personnes blessées dans des accidents chaque année", "Plus d'un million ; environ 2 400 décès", "BPA [20][21]"],
        ["Décès par avalanche", "21 par an en moyenne sur 20 ans", "SLF via SRF [22]"],
      ],
      monoColumns: [1],
    },
    {
      kind: "prose",
      heading: "Les premières minutes",
      anchor: "first-minutes",
      paragraphs: [
        "La noyade est la quatrième cause de décès des enfants de 1 à 4 ans et la troisième chez les enfants de 5 à 14 ans, dans le monde [23]. Sur 30 381 arrêts cardiaques survenus devant témoins en Suède, la survie à 30 jours était de 10,5 % quand un témoin commençait la réanimation avant l'arrivée de l'ambulance, et de 4,0 % quand personne ne le faisait [24].",
        "En cas d'hémorragie grave, les garrots posés avant l'état de choc étaient fortement associés à la survie chez les blessés militaires (90 % contre 10 %) [25], et chez 1 026 patients civils traumatisés, l'usage du garrot était associé de façon indépendante à la survie [26].",
      ],
    },
    {
      kind: "table",
      heading: "Comparer les risques : les micromorts",
      blurb: "Un micromort est une chance sur un million de mourir. Mettre différentes activités sur une même échelle rend un choix éclairé, pas interdit. Les chiffres marqués ≈ sont nos calculs à partir des chiffres de la source.",
      anchor: "micromorts",
      columns: ["Activité", "Risque de décès", "Source"],
      rows: [
        ["Anesthésie générale (l'anesthésie, pas l'opération)", "10 micromorts", "Spiegelhalter [27]"],
        ["Parachutisme, par saut (États-Unis, 2025)", "0,46 pour 100 000 sauts ≈ 4,6 micromorts", "USPA [28]"],
        ["BASE jump, par saut (Kjerag, Norvège)", "1 sur 2 317 sauts ≈ 430 micromorts", "Søreide et al. [29]"],
        ["Marathon ou semi-marathon, décès cardiaque par coureur à l'arrivée", "0,20 pour 100 000 ≈ 2 micromorts", "Kim et al. [30]"],
      ],
      monoColumns: [1],
    },
    {
      kind: "cards",
      heading: "Ce que cela signifie pour vous",
      anchor: "means",
      columns: 2,
      cards: [
        { title: "Préférez la lumière et l'attention aux caméras", body: "L'éclairage et la présence de gardiens protègent les personnes ; les caméras protègent surtout les voitures garées, au prix de la vie privée [4][5][6]." },
        { title: "Résister est généralement la bonne chose", body: "L'autoprotection réduit les infractions consommées et les blessures dans la plupart des crimes étudiés, et une résistance entraînée réduit le risque environ de moitié dans le seul essai randomisé [8][10]." },
        { title: "Une connexion résistante à l'hameçonnage", body: "Des passkeys ou des clés de sécurité sur votre e-mail d'abord ; n'importe quel second facteur vaut mieux qu'aucun [15][17]." },
        { title: "En Suisse, l'escroquerie est le crime de masse", body: "L'escroquerie en ligne et les faux appels d'« autorités » dominent les signalements [18][19]." },
        { title: "Apprenez la réanimation et l'arrêt des hémorragies", body: "Les témoins font plus que doubler la survie après un arrêt cardiaque [24]." },
        { title: "Mesurez avant de juger un risque", body: "Le BASE jump est environ cent fois plus risqué par saut que le parachutisme ; les deux sont des choix, désormais éclairés [28][29]." },
      ],
    },
  ],
  sources: SCIENCE_OF_SAFETY.sources,
};
