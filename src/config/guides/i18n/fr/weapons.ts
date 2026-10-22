import type { Guide } from "../../types";

export const WEAPONS_FR: Guide = {
  slug: "weapons",
  title: "Les armes : ce qu'elles sont, et ce que permet la loi",
  fields: ["PHYSICAL", "INSTITUTIONAL"],
  summary: "Des armes à feu aux clés de voiture : ce qui fait d'un objet une arme, comment la loi les classe, et pourquoi la plupart servent de boucliers.",
  statement: "Presque tout peut servir d'arme. Cela vaut dans les deux sens.",
  lead: [
    "Une arme, c'est tout ce qui sert à blesser ou à menacer. Certains objets sont faits pour cela ; la plupart de ceux qui servent un jour à se défendre ne l'étaient pas. Une personne qui se défend avec un objet le saisit généralement sur le moment, sans l'avoir prévu, parce qu'il était là.",
    "Comprendre les armes, c'est donc moins les posséder que les voir : ce qui, autour de vous, pourrait vous protéger, ce qui pourrait être utilisé contre vous, et ce que la loi dit de chacun.",
  ],
  sections: [
    {
      kind: "table",
      heading: "Les types d'armes, et comment le droit suisse les traite",
      blurb: "Des catégories, pas un catalogue. La référence est la loi suisse sur les armes (LArm, RS 514.54) ; d'autres pays diffèrent, et les lois changent. Ceci est une description, pas un conseil juridique.",
      anchor: "kinds",
      columns: ["Type", "Exemples", "En Suisse"],
      rows: [
        ["Armes à feu", "Pistolets, fusils, fusils de chasse", "La plupart demandent un permis d'acquisition. En porter une en public demande un permis de port distinct, rarement accordé aux particuliers."],
        ["Lames", "Couteaux de cuisine et couteaux pliants ; couteaux papillon, couteaux à lancer, certains couteaux automatiques et poignards", "Les couteaux de tous les jours sont légaux. Les couteaux papillon, les couteaux à lancer et certains couteaux automatiques et poignards sont des armes au sens de la loi."],
        ["Contondantes", "Matraques, matraques télescopiques, coups-de-poing américains, nunchakus, étoiles de lancer", "La loi désigne comme armes les engins conçus pour blesser des personnes, dont les coups-de-poing américains, les matraques et les étoiles de lancer."],
        ["Chimiques", "Spray au poivre (OC), gaz CS", "Les sprays de type CS sont des armes. Le spray au poivre est largement vendu ; son usage reste jugé comme un recours à la force."],
        ["Électriques", "Pistolets à impulsion électrique et tasers", "Les appareils à électrochocs sont des armes, et sont soumis à restrictions."],
        ["Improvisées", "Clés, un sac, un parapluie, une chaise, un vélo, un extincteur", "Légales à posséder et à porter. Leur usage est jugé comme toute force : était-il proportionné à l'attaque ?"],
      ],
    },
    {
      kind: "prose",
      heading: "Pourquoi les objets du quotidien servent surtout de boucliers",
      anchor: "shields",
      paragraphs: [
        "Ce qu'un objet du quotidien fait de plus utile dans un mauvais moment, c'est maintenir la distance. Une chaise entre vous et quelqu'un d'autre, un sac levé pour bloquer, une veste enroulée autour d'un avant-bras, un vélo poussé en avant : chacun fait gagner de l'espace et du temps, et c'est ce dont la fuite a besoin.",
        "Voir ces options est une habitude, comme repérer les sorties. Dans un tram, c'est la barre et les portes ; dans un café, la table et les chaises ; dans la rue, une voiture garée à garder entre vous. Vous ne cherchez pas la bagarre ; vous cherchez de la marge.",
        "L'intention compte pour la loi. Un parapluie est un parapluie ; le même parapluie porté comme une arme, ou un couteau porté pour se battre, peut être jugé différemment. Quoi que vous utilisiez, la question après coup sera de savoir si c'était proportionné à l'attaque.",
      ],
    },
    {
      kind: "prose",
      heading: "Dans une bagarre, une arme vaut dans les deux sens",
      anchor: "both-ways",
      paragraphs: [
        "Toute arme que vous apportez peut vous être prise et retournée contre vous, et sa présence fait monter les enjeux pour tout le monde. Face à un couteau, la bonne réponse est la distance : les attaques au couteau ne se voient souvent qu'une fois qu'elles ont eu lieu, et les techniques qui promettent un désarmement fiable méritent la méfiance.",
        "S'entraîner avec des armes reste très précieux, parce qu'on y apprend comment elles bougent, à quelle vitesse, et le peu de temps dont dispose celui qui se défend. La plupart des personnes qui pratiquent des arts martiaux avec armes ne portent rien du tout ; elles portent la compréhension.",
      ],
    },
    {
      kind: "cards",
      heading: "Bien apprendre les armes",
      anchor: "learning",
      columns: 2,
      cards: [
        { title: "Les armes à feu, dans un stand de tir agréé", body: "Le maniement sûr, l'entreposage et le transport, et la loi, enseignés par des instructeurs agréés. La Suisse a une longue tradition de sociétés de tir où cela se fait bien." },
        { title: "Arts du bâton et de la lame", body: "Le kali, l'escrima et l'arnis entraînent la façon dont bougent bâtons et lames, et c'est pourquoi les personnes qui étudient la défense contre les armes commencent souvent par là." },
        { title: "Défense contre les armes", body: "Un entraînement par scénarios dans des écoles comme le Krav Maga, idéalement sous pression et face à de la résistance, et toujours avec la fuite pour but." },
        { title: "Connaissance des armes et du droit", body: "Ce qui compte comme une arme, ce que vous pouvez posséder et porter, et comment la force est jugée. Le fondement de tout ce qui précède." },
      ],
    },
    {
      kind: "faq",
      heading: "Questions fréquentes",
      anchor: "questions",
      items: [
        { question: "Devrais-je porter quelque chose pour me défendre ?", answer: "Regardez d'abord la loi là où vous êtes. Pour la plupart des gens, un téléphone chargé, une lampe, des chaussures pour courir et l'habitude de remarquer font plus que n'importe quel objet. L'entraînement change davantage qu'un outil." },
        { question: "Le spray au poivre, est-ce une bonne idée ?", answer: "Il peut créer l'instant dont vous avez besoin pour partir, et il peut vous revenir dessus avec le vent ou dans une pièce fermée. Si vous en portez un, entraînez-vous à le sortir, et considérez son usage comme un recours à la force." },
        { question: "Les Protectors Skif portent-ils des armes ?", answer: "La plupart des missions Skif ne font intervenir aucune arme. Un Protector n'en porte une que là où il détient le permis légal de la porter et où la mission l'exige." },
      ],
    },
  ],
};
