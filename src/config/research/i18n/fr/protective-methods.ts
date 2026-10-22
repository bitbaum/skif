import { PROTECTIVE_METHODS } from "../../protective-methods";
import type { Research } from "../../types";

export const PROTECTIVE_METHODS_FR: Research = {
  slug: "protective-methods",
  title: "Ce que les professionnels de la protection publient sur leurs méthodes",
  fields: ["PHYSICAL", "RESILIENCE", "ENVIRONMENTAL"],
  summary:
    "Le Secret Service américain, la police antiterroriste britannique, la gestion suisse des menaces et la science de l'évaluation de la menace : ce qui est public, ce que disent les preuves, et ce qu'une personne privée ou une petite entreprise peut en retenir.",
  photo: "doorway",
  statement: "Ce que les professionnels publient vraiment.",
  lead: [
    "Les services de protection sont entourés de mythes. Certains publient aussi : des recherches sur les attaques, des conseils au public, des témoignages sur leur façon de travailler. Cet article n'utilise que ce qui est publié et vérifiable, dit où il n'y a rien, et se termine par ce qu'une personne privée ou une petite entreprise peut emprunter.",
  ],
  checked: PROTECTIVE_METHODS.checked,
  sections: [
    {
      kind: "prose",
      heading: "Couches de protection et préparation en amont",
      anchor: "layers",
      paragraphs: [
        "Le Secret Service américain décrit ses plans de sécurité comme « à plusieurs couches, assurant une protection à 360 degrés », construits comme « trois anneaux de protection concentriques – le périmètre intérieur, le périmètre intermédiaire et le périmètre extérieur », et planifiés à l'avance avec l'entourage de la personne protégée et la police locale [1]. Un ancien agent de haut rang décrit le renseignement de protection (repérer et évaluer les menaces avant un événement) comme ce qui « oriente une grande partie de la méthodologie de protection du Secret Service » [2].",
        "Le modèle ne fonctionne que s'il est appliqué : l'examen par l'agence elle-même de l'attentat de juillet 2024 à Butler, en Pennsylvanie, relève des défaillances dans sa préparation en amont [3]. Les couches sont un plan, pas une garantie.",
        "Pour une personne ou un magasin, les couches sont plus petites mais l'idée est la même : réfléchir à un lieu avant d'y être, connaître les sorties et les itinéraires, et décider à l'avance qui fait quoi.",
      ],
    },
    {
      kind: "prose",
      heading: "Les attaques sont rarement soudaines, et rarement annoncées",
      anchor: "behaviour",
      paragraphs: [
        "L'étude fondatrice de l'évaluation de la menace a porté sur 83 personnes qui ont attaqué, ou se sont approchées pour attaquer, des personnalités publiques aux États-Unis. Sa conclusion : « Dans chaque cas, l'attaque ou la quasi-attaque était l'aboutissement d'un processus de pensée et d'action compréhensible, et souvent discernable » [4]. Aucun des 43 assassins et agresseurs n'avait adressé de menace directe à sa cible au préalable, tandis que deux tiers avaient parlé ou écrit d'une manière laissant penser qu'ils envisageaient une attaque [5].",
        "Des recherches ultérieures sur 180 auteurs d'attaques dans des espaces publics ont montré que 76 % « avaient eu des comportements qui inquiétaient d'autres personnes » avant l'attaque, et que 64 % avaient montré un comportement si inquiétant qu'il « aurait dû susciter une réaction immédiate ». La moitié étaient poussés par des griefs personnels, familiaux ou professionnels, et dans 53 % des attaques, l'auteur avait un lien connu avec le lieu [6]. Dans une étude sur les attaques dans les écoles, chaque auteur avait montré un comportement inquiétant au préalable, et dans deux tiers des cas, quelqu'un avait vu un comportement interdit qui n'a pas été signalé [7].",
        "Les mêmes chercheurs mettent en garde contre la tentation d'en faire une source de peur : la plupart des personnes qui montrent de tels comportements n'attaquent jamais, et « il n'existe pas de profil du type de personne qui commettra une attaque » [6]. La leçon n'est pas la méfiance envers les inconnus, mais l'attention aux comportements dans la durée, et un seuil bas pour en parler à quelqu'un qui peut agir.",
      ],
    },
    {
      kind: "prose",
      heading: "Lire les inconnus ne fonctionne pas",
      anchor: "faces",
      paragraphs: [
        "Une idée répandue veut que des personnes formées puissent repérer le danger sur un visage ou dans une attitude. La Cour des comptes fédérale américaine (Government Accountability Office) a examiné les preuves derrière le contrôle comportemental dans les aéroports et a constaté qu'elles « ne permettent pas d'établir si des indicateurs comportementaux » peuvent identifier des menaces, et que les gens détectent le mensonge « au niveau du hasard ou légèrement mieux » [8].",
        "Le contrôle dans les aéroports israéliens, souvent cité comme modèle, recourt ouvertement au profilage et à des interrogatoires individuels ; les reportages qui le décrivent font aussi état d'un traitement humiliant des Arabes israéliens [9]. Aucune évaluation évaluée par des pairs que nous ayons pu trouver ne montre qu'il fonctionne mieux, et il soulève ses propres problèmes de discrimination. Skif ne le recommande pas.",
      ],
    },
    {
      kind: "definitions",
      heading: "Run, Hide, Tell — la formulation officielle",
      blurb: "Les conseils de la police antiterroriste britannique en cas d'attaque à l'arme ou d'attentat, dans ses propres termes [10][11]. L'équivalent américain, Run, Hide, Fight, place le même ordre en premier et le combat en dernier, « uniquement quand votre vie est en danger imminent » [12].",
      anchor: "run-hide-tell",
      items: [
        { term: "Fuyez", detail: "« Si c'est sans danger, c'est la meilleure option. » Insistez pour que d'autres partent avec vous, mais ne laissez pas leur indécision vous ralentir. Laissez vos affaires derrière vous. Ne vous arrêtez pas pour filmer." },
        { term: "Cachez-vous", detail: "« Si vous ne pouvez pas fuir, cachez-vous. » Mettez votre téléphone en silencieux et coupez le vibreur, verrouillez et barricadez, éloignez-vous de la porte. Être hors de vue ne veut pas dire être en sécurité : les balles peuvent traverser le verre, la brique, le bois et le métal." },
        { term: "Alertez", detail: "Appelez la police quand c'est sans danger (le 117 en Suisse, le 999 au Royaume-Uni) : ce qui se passe, où, les agresseurs, la direction qu'ils ont prise. Empêchez d'autres personnes d'entrer si vous pouvez le faire sans danger." },
      ],
    },
    {
      kind: "prose",
      heading: "La reconnaissance hostile, et la force d'un bonjour",
      anchor: "reconnaissance",
      paragraphs: [
        "L'autorité britannique de la sécurité protective définit la reconnaissance hostile comme « une observation délibérée dans l'intention de recueillir des informations pour préparer un acte hostile ». Sa contre-stratégie consiste à empêcher, détecter et dissuader : des horaires et des emplacements imprévisibles du dispositif de sécurité rendent les habitudes difficiles à apprendre, et les personnes qui préparent un mauvais coup sont plus nerveuses que les visiteurs ordinaires, ce qui les rend plus susceptibles d'être remarquées [13].",
        "Une formation britannique apparentée destinée aux entreprises, See, Check and Notify, apprend au personnel à utiliser ce qu'il a déjà, y compris ce qu'elle appelle « la force d'un bonjour » (« the power of hello ») [14]. Un accueil aimable et attentif, c'est à la fois du bon service et de la bonne sécurité.",
      ],
    },
    {
      kind: "prose",
      heading: "La Suisse",
      anchor: "switzerland",
      paragraphs: [
        "Le rapport annuel du Service de renseignement de la Confédération évalue la menace terroriste en Suisse comme élevée, marquée surtout par des individus d'inspiration djihadiste agissant « avec les moyens les plus simples », la radicalisation des jeunes en ligne en étant le moteur principal [15][16].",
        "Le canton de Zurich dispose d'une gestion cantonale des menaces dont le but est de prévenir les actes de violence ; il relève que des signes avant-coureurs précèdent souvent les violences ciblées graves, et chacun peut s'adresser directement à la police cantonale en cas d'inquiétude. En cas d'urgence, appelez le 117 [17].",
      ],
    },
    {
      kind: "prose",
      heading: "Arrêter une hémorragie",
      anchor: "bleeding",
      paragraphs: [
        "Stop the Bleed, programme de l'American College of Surgeons, enseigne trois gestes : la compression directe, le méchage de la plaie et le garrot [18]. Dans une étude militaire portant sur 232 blessés, les garrots posés avant l'installation de l'état de choc étaient fortement associés à la survie (90 % contre 10 %), et aucun membre n'a été perdu à cause d'eux [19]. Il s'agissait de traumatismes de guerre, pas d'une rue en ville, mais le geste est le même et il s'apprend en un après-midi.",
      ],
    },
    {
      kind: "prose",
      heading: "Là où les preuves sont minces",
      anchor: "thin",
      paragraphs: [
        "Le GIGN français et les services de protection russes et chinois ne publient que peu ou rien de vérifiable sur leurs méthodes. La filiation du Systema avec les forces spéciales soviétiques repose sur les récits de ses propres fondateurs [20] ; les origines du krav-maga avec Imi Lichtenfeld sont bien racontées par ses écoles [21], mais nous n'avons trouvé aucune étude contrôlée sur l'effet de l'un ou l'autre système.",
        "À l'inverse, un essai randomisé d'un programme de résistance pour étudiantes universitaires (évaluer le risque, reconnaître le danger, et résister verbalement et physiquement) a trouvé un risque de viol consommé sur un an de 5,2 % contre 9,8 % dans le groupe témoin [22]. Les méthodes qui ont été testées méritent plus de poids que les méthodes aux noms célèbres.",
      ],
    },
    {
      kind: "cards",
      heading: "Ce que vous pouvez en retenir",
      anchor: "transfers",
      columns: 2,
      cards: [
        { title: "Observez les comportements, pas l'apparence", body: "Un comportement inquiétant dans la durée est le signal [6][7]. Il n'y a pas de profil, et lire les inconnus revient presque au hasard [8]." },
        { title: "N'attendez pas une menace", body: "Les personnes qui représentent une menace en formulent rarement une [5]. Une inquiétude suffit pour en parler à quelqu'un qui peut agir, comme la gestion des menaces du canton de Zurich [17]." },
        { title: "Prenez les griefs au sérieux au travail", body: "La moitié des auteurs d'attaques dans des espaces publics ont agi à cause d'un grief, et la plupart avaient un lien avec le lieu [6]." },
        { title: "Planifiez à l'avance, à petite échelle", body: "Les sorties, les itinéraires et qui fait quoi, décidés avant d'en avoir besoin [1][12]." },
        { title: "Soyez plus difficile à cerner", body: "Des routines variées et moins de détails en ligne donnent moins de prise à la reconnaissance [13]." },
        { title: "Dites bonjour", body: "Un personnel attentif et aimable, c'est à la fois du service et de la dissuasion [13][14]." },
        { title: "Fuir, se cacher, puis appeler", body: "Le combat est le dernier recours dans tous les programmes officiels [10][12]." },
        { title: "Apprenez à arrêter une hémorragie", body: "Compression, méchage, garrot [18][19]." },
      ],
    },
  ],
  sources: PROTECTIVE_METHODS.sources,
};
