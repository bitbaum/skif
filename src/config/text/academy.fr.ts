/** The Academy in FR: every area, course, capability and delivery label,
 * keyed exactly as in src/config/academy.ts and capabilities.ts. */
import type { AcademyWords } from "./academy";

export const ACADEMY_FR: AcademyWords = {
  areas: {
    PEOPLE: {
      title: "Jugement et relations humaines",
      intro:
        "Le cœur du métier. La plupart des situations se gagnent ou se perdent dans la façon dont on lit une pièce et dont on parle à la personne en face.",
    },
    MEDICAL: {
      title: "Premiers secours et urgences",
      intro:
        "Que faire dans les minutes qui précèdent l'arrivée des professionnels. Utile à tout le monde ; indispensable pour quiconque prend soin de quelqu'un d'autre.",
    },
    ESCAPE: {
      title: "Fuite et mouvement",
      intro:
        "La meilleure autodéfense, c'est de ne pas être là. Bien se déplacer, voir les itinéraires et être assez en forme pour les emprunter passe avant toute compétence de combat.",
    },
    STRIKING: {
      title: "Arts de frappe",
      intro: "La distance, le timing et le calme pendant que quelqu'un essaie de vous frapper, appris face à des partenaires qui essaient vraiment.",
    },
    GRAPPLING: {
      title: "Arts de lutte",
      intro:
        "Contrôler sans blesser : rester debout, se relever, et maintenir quelqu'un immobile. Là où la technique d'une personne plus petite l'emporte sur la force d'une plus grande.",
    },
    SELF_DEFENCE: {
      title: "Systèmes d'autodéfense",
      intro:
        "Un entraînement par scénarios pour la rue : plusieurs agresseurs, des armes, la surprise, et s'en sortir. La qualité varie davantage d'une école à l'autre que d'un système à l'autre.",
    },
    WEAPONS: {
      title: "Armes",
      intro:
        "Ce que sont les armes, comment elles se manient et ce que la loi permet : les armes à feu dans des stands de tir autorisés, les bâtons et les lames, la défense contre les armes, et les objets du quotidien qui peuvent vous protéger.",
    },
    MOBILITY: {
      title: "Conduite",
      intro: "Amener quelqu'un quelque part en sécurité, y compris quand la route ne l'est pas.",
    },
    DIGITAL: {
      title: "Numérique, vie privée et argent",
      intro:
        "La moitié de la sécurité qui se joue sur un écran : les comptes, les appareils, ce qu'on peut trouver sur vous, les arnaques, et les clés de ce que vous possédez.",
    },
  },
  courses: {
    DEESCALATION: {
      title: "Désescalade",
      outcome:
        "Calmer une personne en colère, effrayée ou ivre, par les mots, la distance et l'attitude, et savoir quand partir.",
    },
    CONFLICT_PSYCHOLOGY: {
      title: "La psychologie du conflit et de la peur",
      outcome:
        "Reconnaître ce que le stress, l'adrénaline et la peur font à vous et aux autres, et comment cela change ce que les gens entendent et font.",
    },
    SITUATIONAL_AWARENESS: {
      title: "Attention à l'environnement",
      outcome: "Remarquer tôt ce qui n'est pas à sa place, sans devenir la personne anxieuse qui surveille tout.",
    },
    TRAUMA_INFORMED: {
      title: "Accompagner des personnes après un traumatisme",
      outcome:
        "Être une présence stable pour quelqu'un qui a été harcelé, agressé ou menacé, sans aggraver les choses.",
    },
    FIRST_AID: {
      title: "Premiers secours",
      outcome: "Reconnaître une urgence, appeler à l'aide, réanimer, utiliser un défibrillateur et arrêter une hémorragie grave.",
    },
    STOP_THE_BLEED: {
      title: "Arrêter une hémorragie grave",
      outcome: "La compression directe, le méchage de la plaie et le garrot, pratiqués jusqu'à ce que vos mains les connaissent.",
    },
    EMERGENCY_RESPONSE: {
      title: "Réaction aux urgences",
      outcome:
        "Prendre en main les premières minutes d'un incident : les lieux, les blessés, les personnes autour d'eux et la transmission aux secours.",
    },
    PARKOUR: {
      title: "Parkour et fuite",
      outcome:
        "Voir une rue comme un ensemble d'itinéraires, franchir et contourner les obstacles en sécurité, et sprinter, grimper et sauter quand ça compte.",
    },
    RUNNING: {
      title: "Condition physique pour fuir",
      outcome: "Sprinter 200 mètres et continuer : de la course fractionnée conçue pour s'échapper, pas pour les compétitions.",
    },
    BOXING: {
      title: "Boxe",
      outcome: "La distance, les esquives et les poings, en sparring face à un partenaire qui résiste.",
    },
    KICKBOXING: {
      title: "Kickboxing",
      outcome: "Le jeu de jambes et les poings de la boxe, avec les coups de pied et la portée qu'ils ajoutent.",
    },
    MUAY_THAI: {
      title: "Muay-thaï",
      outcome: "Les coups de poing, de pied, de genou et de coude, et le clinch : une idée honnête de ce que l'on ressent dans un vrai échange.",
    },
    WRESTLING: {
      title: "Lutte",
      outcome: "Rester debout, bloquer une amenée au sol et se relever : les compétences qui gardent un combat hors du sol.",
    },
    JUDO: {
      title: "Judo",
      outcome: "Les projections, l'équilibre et les chutes. Savoir tomber sans se blesser est une compétence de vie à part entière.",
    },
    BJJ: {
      title: "Jiu-jitsu brésilien",
      outcome:
        "Contrôler une personne au sol sans la frapper. L'art de lutte le plus adapté à l'immobilisation sans blessure.",
    },
    RESTRAINT: {
      title: "Immobilisation et contrôle",
      outcome:
        "Maintenir quelqu'un en sécurité jusqu'à l'arrivée des secours, avec les positions qui lui permettent de respirer et la loi qui vous fixe des limites.",
    },
    SELF_DEFENCE: {
      title: "Les bases de l'autodéfense",
      outcome: "Toute l'échelle : éviter, fuir, désamorcer, se défendre, se remettre, dans ce que le droit suisse considère comme approprié.",
    },
    WOMENS_SELF_DEFENCE: {
      title: "Autodéfense pour les femmes",
      outcome: "La rue, les personnes que vous connaissez et votre téléphone : l'effet de levier plutôt que la force, des plans de départ et la traque numérique.",
    },
    CHILDRENS_SAFETY: {
      title: "La sécurité des enfants",
      outcome: "Des compétences adaptées à l'âge, de connaître un numéro de téléphone par cœur à savoir tomber et dire non.",
    },
    KRAV_MAGA: {
      title: "Krav-maga",
      outcome: "La défense contre les attaques et les armes courantes, entraînée sous stress, en mettant l'accent sur la fuite.",
    },
    SYSTEMA: {
      title: "Systema",
      outcome: "La respiration, la détente et le mouvement sous pression ; utile bien au-delà du combat.",
    },
    PROTECTING_OTHERS: {
      title: "Protéger quelqu'un d'autre",
      outcome:
        "Accompagner une personne : où se placer, comment traverser une foule, comment la mettre à l'abri, et comment rester discret en le faisant.",
    },
    WEAPONS_LITERACY: {
      title: "Connaître les armes et la loi",
      outcome:
        "Ce qui compte comme une arme, ce que vous pouvez posséder et porter, comment le recours à la force est jugé, et les objets du quotidien qui permettent de garder la distance.",
    },
    FIREARMS_SAFETY: {
      title: "Armes à feu : manipulation sûre et loi suisse sur les armes",
      outcome:
        "Manipuler, ranger et transporter une arme à feu en sécurité et tirer avec précision, enseigné par des instructeurs autorisés dans des stands de tir autorisés.",
    },
    STICK_AND_BLADE: {
      title: "Bâtons et lames : kali et escrima",
      outcome: "Comment se déplacent les bâtons et les lames, à quelle vitesse, et le peu de temps dont dispose celui qui se défend.",
    },
    DEFENCE_AGAINST_WEAPONS: {
      title: "Défense contre les armes",
      outcome: "Reconnaître tôt une arme, garder la distance et des obstacles, et fuir ; entraînement par scénarios avec résistance.",
    },
    DEFENSIVE_DRIVING: {
      title: "Conduite défensive",
      outcome: "Lire la circulation devant soi, garder des options ouvertes, et conduire un passager avec calme dans des situations qui ne le sont pas.",
    },
    CYBER_HYGIENE: {
      title: "Comptes et appareils",
      outcome: "Verrouiller l'e-mail et le téléphone, chiffrer chaque disque, et reconnaître l'hameçonnage avant de cliquer.",
    },
    PRIVACY_SELF_AUDIT: {
      title: "Ce qu'on peut trouver sur vous",
      outcome: "Vous chercher vous-même comme le ferait quelqu'un d'hostile, puis supprimer ou réduire ce que vous trouvez.",
    },
    SCAMS: {
      title: "Arnaques et contrainte",
      outcome: "Connaître les leviers qu'actionne chaque arnaque, et mettre en place les quelques règles qui les déjouent.",
    },
    DIGITAL_ASSETS: {
      title: "Conserver ses clés en sécurité",
      outcome: "Garder ses clés Bitcoin et autres là où vous pouvez les récupérer et où personne ne peut vous les arracher de force.",
    },
  },
  capabilities: {
    DE_ESCALATION: "Désescalade",
    TRAUMA_INFORMED: "Accompagnement tenant compte des traumatismes",
    COMMUNICATION: "Communication",
    SITUATIONAL_AWARENESS: "Attention à l'environnement",
    CONFLICT_MANAGEMENT: "Gestion des conflits",
    FIRST_AID: "Premiers secours",
    EMERGENCY_RESPONSE: "Réaction aux urgences",
    ADVANCED_MEDICAL: "Qualification médicale avancée",
    GRAPPLING: "Grappling (BJJ, judo, lutte)",
    RESTRAINT_CONTROL: "Immobilisation et contrôle",
    ENDURANCE: "Endurance et mobilité",
    CLOSE_PROTECTION: "Protection rapprochée",
    NIGHTLIFE: "Vie nocturne",
    EVENT_SECURITY: "Sécurité événementielle",
    EXECUTIVE_PROTECTION: "Protection de dirigeants",
    CHILDREN: "Familles et enfants",
    VULNERABLE_PERSON_SUPPORT: "Soutien aux personnes vulnérables",
    PROFESSIONAL_DRIVING: "Conduite professionnelle",
    DEFENSIVE_DRIVING: "Conduite défensive",
    CYBERSECURITY_LITERACY: "Connaissances en cybersécurité",
    DIGITAL_ASSET_LITERACY: "Connaissances en actifs numériques",
    PRIVACY_TECH: "Technologies de protection de la vie privée et de sécurité",
  },
  delivery: {
    SKIF: "Cours et examen Skif",
    PARTNER: "Avec une école partenaire",
  },
};
