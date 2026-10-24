// Content for /niveau2/materiel (see design "Materiel Niveau 2")

export type FicheKey = 'ordi' | 'gilet' | 'det' | 'para'

export interface Fiche {
  n: string
  title: string
  card: string
  intro: string
  // Hero illustration (ignored for "ordi", which shows the simulated screen)
  hero?: { img: string; placeholder: string }
  facts: { v: string; k: string }[]
  about: string[]
  types?: { t: string; tag: string; d: string; plus: string }[]
  anatomyTitle: string
  anatomyHint: string
  parts: { name: string; text: string; tip: string }[]
  choose: { t: string; d: string }[]
  care: { t: string; d: string }[]
  products: {
    brand: string
    name: string
    price: string
    why: string
    tag: string
    img?: string
  }[]
}

export const ficheOrder: FicheKey[] = ['ordi', 'gilet', 'det', 'para']

export const tips = [
  'Ordinateur : un écran lisible et des boutons utilisables avec des gants.',
  'Gilet : essaie-le avec ta combinaison et privilégie un volume élevé pour pouvoir secourir ton binôme.',
  "Détendeur : un premier étage compensé, un raccord adapté aux bouteilles de ton club, et un budget prévu pour l'octopus et le manomètre.",
  'Parachute : une couleur vive, et un modèle compact qui se range facilement sur ton gilet.',
]

// Card photos, also reused as the fiche hero. Product photos are looked up at
// /img/materiel/niveau2/<fiche>-produit-<n>.png (n = order in `products`)
export const gearImages: Record<FicheKey, { img: string; placeholder: string }> =
  {
    ordi: {
      img: '/img/materiel/niveau2/ordinateur.png',
      placeholder: 'Photo : ordinateur de plongée',
    },
    gilet: {
      img: '/img/materiel/niveau2/gilet.png',
      placeholder: 'Photo : gilet stabilisateur',
    },
    det: {
      img: '/img/materiel/niveau2/detendeur.png',
      placeholder: 'Photo : détendeur',
    },
    para: {
      img: '/img/materiel/niveau2/parachute.png',
      placeholder: 'Photo : parachute de palier',
    },
  }

export const fiches: Record<FicheKey, Fiche> = {
  ordi: {
    n: '01',
    title: 'Ordinateur de plongée',
    card: "Ton copilote sous l'eau : il suit ta profondeur et ton temps, et te dit combien de temps tu peux encore rester sans palier.",
    intro:
      "Il mesure en continu ta profondeur et la durée de ta plongée, calcule l'azote absorbé par ton corps et t'indique en temps réel la marge qu'il te reste.",
    facts: [
      { v: '20 m', k: 'Profondeur maximale en autonomie au niveau 2' },
      {
        v: '≤ 10 m/min',
        k: 'Vitesse de remontée surveillée par la plupart des ordinateurs',
      },
      { v: '3 min à 3-5 m', k: 'Palier de sécurité conseillé en fin de plongée' },
    ],
    about: [
      "Pendant la plongée, ton corps absorbe de l'azote. Plus tu descends profond et plus tu restes longtemps, plus il en absorbe. Si tu remontes trop vite ou trop tard, cet azote peut former des bulles : c'est l'accident de décompression.",
      "Les tables MN90 donnent une réponse pour une plongée « carrée », à une seule profondeur. L'ordinateur, lui, recalcule toutes les quelques secondes selon ton profil réel. Il te laisse généralement plus de temps quand tu remontes progressivement le long d'un tombant.",
      'Au niveau 2, tu plonges en autonomie avec ton binôme. Chacun doit savoir lire son ordinateur, anticiper la fin de la plongée et respecter la vitesse de remontée sans attendre un guide.',
    ],
    anatomyTitle: "Lire l'écran",
    anatomyHint:
      "L'écran ci-dessus simule une plongée. Choisis une information pour voir où elle se trouve et ce qu'elle signifie.",
    parts: [
      {
        name: 'Profondeur actuelle',
        text: 'La donnée la plus visible. Elle s\'affiche en mètres, souvent au dixième près. Garde un œil dessus pour ne pas dépasser la limite prévue avec ton binôme.',
        tip: 'Au niveau 2 en autonomie : 20 m maximum.',
      },
      {
        name: 'Durée de plongée',
        text: "Le temps écoulé depuis le début de l'immersion, en minutes. Le chrono démarre seul dès que l'ordinateur détecte environ 1 à 1,5 m de profondeur.",
        tip: '',
      },
      {
        name: 'Temps sans palier',
        text: "Souvent noté NDL ou NO DECO. C'est le temps qu'il te reste à la profondeur actuelle avant de devoir faire un palier obligatoire. Il diminue au fond et remonte quand tu remontes.",
        tip: "Règle simple : commence à remonter avant qu'il descende sous 5 minutes.",
      },
      {
        name: 'Profondeur maximale',
        text: 'La profondeur la plus importante atteinte depuis le début de la plongée. Utile pour remplir ton carnet et vérifier que la plongée prévue a été respectée.',
        tip: '',
      },
      {
        name: 'Indicateur de remontée',
        text: "Une barre ou des flèches qui se remplissent selon ta vitesse de remontée. Si elle passe au rouge ou que l'alarme sonne, ralentis immédiatement.",
        tip: 'Remonte au rythme de tes plus petites bulles.',
      },
    ],
    choose: [
      {
        t: 'Un écran lisible',
        d: "Chiffres grands et contrastés, rétroéclairage efficace. Sous l'eau, avec un peu de particules, la lisibilité compte plus que le nombre de fonctions.",
      },
      {
        t: 'Des boutons simples',
        d: 'Tu dois pouvoir naviguer avec des gants épais. Évite les menus trop profonds pour les réglages courants.',
      },
      {
        t: 'Montre ou console',
        d: 'La montre se porte au poignet et sert aussi en surface. La console se fixe sur le flexible du détendeur : moins chère, mais moins pratique à consulter.',
      },
      {
        t: 'Mode Nitrox',
        d: 'Presque tous les modèles actuels le proposent. Il te servira dès que tu passeras la qualification Nitrox, souvent juste après le niveau 2.',
      },
      {
        t: 'Pile ou batterie',
        d: 'La pile se change tous les 1 à 2 ans, parfois chez le revendeur. La batterie rechargeable demande de penser à la charger avant chaque sortie.',
      },
    ],
    care: [
      {
        t: "Rince à l'eau douce",
        d: "après chaque journée de plongée, boutons compris, puis laisse sécher à l'ombre.",
      },
      {
        t: 'Vérifie la pile',
        d: "avant chaque voyage. Un ordinateur qui s'éteint en plongée oblige à terminer la plongée avec les tables.",
      },
      {
        t: 'Ne le prête pas entre deux plongées',
        d: "il garde en mémoire l'azote de ta plongée précédente. Un autre plongeur aurait des calculs faux.",
      },
      {
        t: 'Suis le plus prudent',
        d: "dans un binôme, la palanquée respecte toujours l'ordinateur qui donne la marge la plus faible.",
      },
      {
        t: 'Règle-le avant de partir',
        d: 'unités, date, heure, et niveau de prudence (conservatisme). En cas de doute, choisis un réglage prudent.',
      },
    ],
    products: [
      {
        brand: 'Mares',
        name: 'Puck Pro+',
        price: '≈ 200 €',
        why: 'Un seul bouton, écran large. Le classique pour débuter.',
        tag: 'Notre choix débutant',
      },
      {
        brand: 'Cressi',
        name: 'Leonardo',
        price: '≈ 180 €',
        why: 'Très simple à utiliser, gros chiffres, Nitrox inclus.',
        tag: 'Petit budget',
      },
      {
        brand: 'Suunto',
        name: 'EON Core',
        price: '≈ 350 €',
        why: 'Robuste et fiable, menus clairs, algorithme prudent.',
        tag: 'Fiabilité',
      },
      {
        brand: 'Shearwater',
        name: 'Peregrine',
        price: '≈ 500 €',
        why: 'Écran couleur très lisible, batterie rechargeable.',
        tag: 'Évolutif',
      },
      {
        brand: 'Garmin',
        name: 'Descent G1',
        price: '≈ 650 €',
        why: "Montre de sport au quotidien, ordinateur complet sous l'eau.",
        tag: 'Polyvalent',
      },
    ],
  },
  gilet: {
    n: '02',
    title: 'Gilet stabilisateur',
    card: 'Il te stabilise entre deux eaux, te maintient en surface et porte ta bouteille. Un élément de sécurité indispensable.',
    intro:
      "Gilet, stab ou stabilizing jacket : il te permet de rester stable entre deux eaux, comme un poisson, et de flotter en surface à la mise à l'eau ou en fin de plongée.",
    hero: {
      img: '/img/materiel/niveau2/gilet.png',
      placeholder: 'Photo : gilet stabilisateur',
    },
    facts: [
      { v: '3 familles', k: 'Réglable, dorsal ou enveloppant' },
      { v: '10 à 25+ L', k: "Volume d'air selon le modèle et la taille" },
      {
        v: '420 à 1200',
        k: 'Résistance du tissu en décitex : plus c\'est haut, plus c\'est solide (et lourd)',
      },
    ],
    about: [
      'Le gilet fait partie de ton scaphandre autonome. Il a trois rôles : te stabiliser pendant la plongée, te maintenir à la surface, et porter la bouteille sur ton dos. Ses poches et ses anneaux servent aussi à ranger et accrocher tes accessoires.',
      "Quand tu descends, la pression écrase ta combinaison et tu deviens plus lourd. Quand tu remontes, l'air se dilate et tu deviens plus léger. Tu compenses ces variations en ajoutant de l'air avec l'inflator, ou en en retirant avec les purges.",
      "Au niveau 2, tu dois savoir t'équilibrer seul, maîtriser une remontée lente en purgeant régulièrement, et gonfler ton gilet en surface pour te reposer ou attendre le bateau.",
    ],
    types: [
      {
        t: 'Réglable',
        tag: 'Le plus répandu',
        d: "Ses sangles d'épaules réglables épousent la forme du corps. L'air se loge sur les côtés et dans le dos. Modulable et pratique, il s'adapte à toutes les morphologies, du débutant au plongeur confirmé.",
        plus: 'Conseillé au niveau 2',
      },
      {
        t: 'Dorsal',
        tag: 'Liberté de mouvement',
        d: "La partie gonflable est fixée sur un harnais dans le dos. Pas d'air sur le thorax, donc moins de sensation d'écrasement. Il maintient bien à l'horizontale sous l'eau, mais il est moins confortable en surface s'il est trop gonflé.",
        plus: 'Variantes : wing, donut, sidemount',
      },
      {
        t: 'Enveloppant',
        tag: 'Intégral',
        d: "L'air est réparti sur les épaules, le dos et le torse. Apprécié des professionnels et des plongeurs confirmés, il est en revanche moins facile à ajuster, sauf s'il possède des sangles réglables.",
        plus: 'Pour plongeurs confirmés',
      },
    ],
    anatomyTitle: 'Les éléments du gilet',
    anatomyHint: "Choisis un élément pour comprendre son rôle et comment l'utiliser.",
    parts: [
      {
        name: 'Inflator',
        text: "Le système qui gonfle ou dégonfle ton gilet, au bout du tuyau annelé sur l'épaule gauche. Un bouton fait entrer l'air de la bouteille, l'autre ouvre une purge lente. Il permet aussi de gonfler à la bouche.",
        tip: "Choisis un modèle dont le débit de gonflage et de dégonflage te convient. Sous l'eau, appuie par petites touches.",
      },
      {
        name: 'Direct system',
        text: "Le tuyau qui relie le détendeur à l'inflator et apporte l'air de la bouteille. Il se branche et se débranche avec une bague à ressort.",
        tip: "Vérifie qu'il est bien clipsé pendant ton contrôle avant la mise à l'eau.",
      },
      {
        name: 'Purges',
        text: "Elles vident l'air du gilet pour descendre en début de plongée ou ralentir ta remontée. On en trouve à l'épaule, en bas du gilet, une purge rapide (Fen-stop) et une purge lente sur l'inflator.",
        tip: "Vérifie à l'achat que tu peux les actionner facilement sous l'eau.",
      },
      {
        name: 'Poches à lest largables',
        text: "Elles contiennent les plombs qui règlent ta flottabilité. En cas d'urgence, elles se retirent pour te rendre immédiatement plus léger. Les systèmes de largage diffèrent selon les marques.",
        tip: 'Manipule-les en magasin : le largage doit être facile à actionner.',
      },
      {
        name: 'Backpack et sangle de bloc',
        text: 'Le dosseret rigide et la sangle qui tiennent la bouteille contre ton dos. Le backpack apporte maintien et rigidité, ou au contraire de la légèreté pour les modèles de voyage.',
        tip: "Mouille la sangle avant de la serrer : elle se détend un peu dans l'eau.",
      },
      {
        name: 'Poches et anneaux',
        text: "Pour ranger et accrocher tes accessoires : lampe, compas, couteau, parachute de palier, appareil photo, miroir de sécurité ou fiches d'identification des poissons.",
        tip: 'Leur nombre varie selon la marque et le modèle.',
      },
    ],
    choose: [
      {
        t: 'Le confort',
        d: "Inspecte les sangles ventrale, pectorale et d'épaules. Elles doivent maintenir le gilet et la bouteille près du corps, adaptés à ta morphologie.",
      },
      {
        t: 'La taille',
        d: "C'est le point le plus important. Une fois porté, le gilet doit bouger le moins possible. Essaie-le avec ta combinaison.",
      },
      {
        t: 'Le backpack',
        d: 'Il assure le maintien du bloc. Selon les modèles, il privilégie la rigidité ou un gain de poids important pour les voyages.',
      },
      {
        t: "Le volume d'air",
        d: 'De 10 à plus de 25 litres. Un petit volume est plus maniable et moins encombrant, mais compense moins bien la flottabilité en profondeur. Au niveau 2, privilégie un volume élevé : si tu dois secourir ton binôme, ton gilet doit pouvoir vous remonter tous les deux.',
      },
      {
        t: "Les purges et l'inflator",
        d: 'Leur position doit être ergonomique pour les trouver sans regarder. Vérifie que le débit de gonflage et de dégonflage te convient.',
      },
      {
        t: 'Les poches à lest',
        d: 'Assure-toi en le manipulant que le système de largage est facile à actionner, même avec des gants.',
      },
      {
        t: 'La résistance du tissu',
        d: 'Indiquée en décitex (420, 840, 1000, 1200). Une valeur élevée signifie un tissu plus solide mais plus lourd. La qualité du fil (nylon, cordura) compte aussi.',
      },
    ],
    care: [
      {
        t: "Vide l'eau",
        d: 'emprisonnée dans le gilet par la purge basse, après chaque plongée.',
      },
      { t: "Rince à l'eau douce", d: 'puis accroche le gilet sur un cintre.' },
      { t: 'Fais-le sécher', d: "dans un endroit aéré et à l'ombre." },
      {
        t: 'Ne le surcharge pas',
        d: 'en plombs, et porte toujours la bouteille par sa poignée, jamais par le gilet.',
      },
      {
        t: 'Protège-le',
        d: 'évite de te frotter aux coraux et ne pose pas le bloc par-dessus le gilet sur le quai.',
      },
      {
        t: 'Teste avant chaque plongée',
        d: "gonflage, gonflage à la bouche et chaque purge. C'est le G de ton contrôle AGLLO.",
      },
      {
        t: 'Fais-le réviser rapidement',
        d: 'au moindre dysfonctionnement ou à la moindre fuite.',
      },
    ],
    products: [
      {
        brand: 'Cressi',
        name: 'Start Pro',
        price: '≈ 300 €',
        why: 'Simple, robuste, abordable.',
        tag: 'Petit budget',
      },
      {
        brand: 'Scubapro',
        name: 'Level',
        price: '≈ 450 €',
        why: "Confortable et très fiable pour l'apprentissage et le loisir.",
        tag: 'Confort',
      },
      {
        brand: 'Aqualung',
        name: 'Pro HD (ou Pro HD Femme)',
        price: '≈ 370 €',
        why: 'Excellente intégration du lest et bon maintien.',
        tag: 'Lest intégré',
      },
    ],
  },
  det: {
    n: '03',
    title: 'Détendeur',
    card: "Il transforme l'air très comprimé de ta bouteille en air respirable, à la pression où tu te trouves. Ton lien vital avec la bouteille.",
    intro:
      "Le détendeur abaisse la pression de l'air de la bouteille en deux étapes et te le délivre à chaque inspiration, à la même pression que l'eau qui t'entoure.",
    hero: {
      img: '/img/materiel/niveau2/detendeur.png',
      placeholder: 'Photo : détendeur',
    },
    facts: [
      { v: '200 bar', k: "Pression d'une bouteille pleine, réduite en deux étages" },
      {
        v: '≈ 10 bar',
        k: 'Moyenne pression en sortie du 1er étage, au-dessus de la pression ambiante',
      },
      { v: '50 bar', k: "Réserve conseillée en sortie d'eau" },
    ],
    about: [
      "L'air de ta bouteille est stocké à environ 200 bar : impossible de le respirer tel quel. Le premier étage, vissé sur la robinetterie, réduit cette pression à une moyenne pression d'environ 10 bar au-dessus de la pression ambiante. Le deuxième étage, en bouche, la ramène à la pression ambiante.",
      "Il ne délivre de l'air que lorsque tu inspires : c'est un détendeur « à la demande ». Plus tu descends, plus l'air que tu respires est dense. À 20 m, chaque inspiration consomme trois fois plus d'air qu'en surface.",
      "Au niveau 2, tu plonges sans guide. Tu surveilles toi-même ton manomètre, tu préviens ton binôme à mi-pression et à la réserve, et tu sais lui donner ton octopus en cas de panne d'air.",
    ],
    anatomyTitle: 'Les éléments du détendeur',
    anatomyHint: "Choisis un élément pour comprendre son rôle et comment l'utiliser.",
    parts: [
      {
        name: 'Premier étage',
        text: "Fixé sur la robinetterie de la bouteille, il fait passer l'air de la haute pression à une moyenne pression stable. Il porte plusieurs sorties : moyenne pression pour les flexibles, haute pression pour le manomètre.",
        tip: "Raccord DIN (vissé) ou étrier (INT) : vérifie qu'il correspond aux bouteilles de ton club.",
      },
      {
        name: 'Deuxième étage',
        text: "L'embout que tu tiens en bouche. Il ramène l'air à la pression ambiante et ne s'ouvre que lorsque tu inspires. Ton expiration sort par la soupape, sous forme de bulles.",
        tip: "Le bouton de surpression chasse l'eau de l'embout si tu l'as lâché.",
      },
      {
        name: 'Octopus',
        text: "Un second deuxième étage, souvent jaune, sur un flexible plus long. C'est la source d'air de secours que tu donnes à ton binôme s'il tombe en panne d'air.",
        tip: 'Fixe-le sur la poitrine, bien visible et facile à attraper.',
      },
      {
        name: 'Manomètre',
        text: "Relié au premier étage par un flexible haute pression, il indique la pression restant dans ta bouteille, en bar. C'est ta jauge de carburant.",
        tip: 'Consulte-le régulièrement et annonce-le à ton binôme : mi-pression, puis 50 bar.',
      },
      {
        name: 'Direct system',
        text: "Le flexible moyenne pression qui alimente l'inflator de ton gilet. Il part du premier étage du détendeur mais sert au gilet.",
        tip: '',
      },
      {
        name: 'Flexibles',
        text: "Les tuyaux qui relient le premier étage au reste. Leur longueur et leur passage doivent te permettre de tourner la tête sans tirer sur l'embout.",
        tip: "Remplace-les dès qu'ils sont craquelés ou gonflés près des embouts.",
      },
    ],
    choose: [
      {
        t: 'Compensé ou non',
        d: 'Un premier étage compensé garde le même confort de respiration, que la bouteille soit pleine ou presque vide et quelle que soit la profondeur. C\'est le choix conseillé pour plonger en autonomie.',
      },
      {
        t: 'Membrane ou piston',
        d: "Le piston est simple, robuste et offre un gros débit. La membrane isole le mécanisme de l'eau : elle convient mieux à l'eau froide ou chargée en particules.",
      },
      {
        t: "L'eau froide",
        d: "Dans une eau sous 10 °C environ, un détendeur peut givrer et se mettre en débit continu. Si tu plonges en lac, en carrière ou en Manche, choisis un modèle conçu pour l'eau froide.",
      },
      {
        t: 'Le raccord',
        d: "DIN ou étrier (INT). Vérifie quel raccord utilisent les bouteilles de ton club ou de ta destination. Un adaptateur permet de passer de l'un à l'autre.",
      },
      {
        t: 'Le confort en bouche',
        d: "Un embout souple et un deuxième étage léger évitent la fatigue de la mâchoire. Essaie-le en bouche si possible.",
      },
      {
        t: 'Ce qui est inclus',
        d: "Le prix comprend souvent le premier étage et un seul deuxième étage. Prévois l'octopus et le manomètre dans ton budget.",
      },
    ],
    care: [
      {
        t: 'Remets le capuchon',
        d: "bien sec sur l'entrée d'air du premier étage dès que tu démontes le détendeur.",
      },
      {
        t: "Rince à l'eau douce",
        d: "capuchon en place, sans appuyer sur le bouton de surpression : tu ferais entrer l'eau dans le mécanisme.",
      },
      {
        t: 'Ouvre le robinet lentement',
        d: 'manomètre tourné loin de ton visage et de celui des autres.',
      },
      {
        t: 'Teste avant chaque plongée',
        d: "quelques inspirations sur le détendeur principal et sur l'octopus, et lecture du manomètre.",
      },
      {
        t: 'Range-le à plat',
        d: "sans plier les flexibles, à l'abri du soleil et de la chaleur.",
      },
      {
        t: 'Fais-le réviser',
        d: 'chaque année ou selon le fabricant, et immédiatement en cas de débit continu ou de respiration dure.',
      },
    ],
    products: [],
  },
  para: {
    n: '04',
    title: 'Parachute de palier',
    card: 'Une bouée gonflable que tu envoies en surface pour signaler ta position aux bateaux pendant ta remontée et ton palier.',
    intro:
      "Le parachute de palier est un long tube gonflable relié à un fil. Lancé depuis le fond ou le palier, il monte en surface et indique à tous où tu vas sortir de l'eau.",
    hero: {
      img: '/img/materiel/niveau2/parachute.png',
      placeholder: 'Photo : parachute de palier',
    },
    facts: [
      {
        v: '3 à 5 m',
        k: 'Profondeur habituelle du palier de sécurité, pendant lequel le parachute est en surface',
      },
      { v: '1 à 1,8 m', k: 'Hauteur du tube une fois gonflé en surface' },
      { v: 'Orange ou jaune', k: 'Couleurs vives, visibles de loin par les bateaux' },
    ],
    about: [
      "En surface, la tête d'un plongeur est presque invisible pour un bateau, surtout avec du clapot. Le parachute dépasse de l'eau sur plus d'un mètre : le bateau de sécurité te repère et les autres embarcations s'écartent.",
      "Il sert aussi pendant la remontée. En tenant le fil tendu, tu as un repère vertical qui t'aide à contrôler ta vitesse et à tenir ton palier à la bonne profondeur, même en pleine eau sans fond visible.",
      "Au niveau 2, tu plonges sans guide. Personne ne lancera le parachute à ta place : chaque palanquée autonome doit en avoir un et savoir le déployer.",
    ],
    anatomyTitle: 'Les éléments du parachute',
    anatomyHint: "Choisis un élément pour comprendre son rôle et comment l'utiliser.",
    parts: [
      {
        name: 'Le tube',
        text: "La partie gonflable, longue et étroite. Fermé, il ne se vide pas s'il se couche sur l'eau. Ouvert en bas, il est plus simple mais peut se vider s'il bascule.",
        tip: 'Un tube fermé est plus sûr pour débuter.',
      },
      {
        name: "L'ouverture de gonflage",
        text: "Par où entre l'air : une ouverture basse dans laquelle tu souffles ou purges ton octopus, ou une valve compatible avec l'inflator.",
        tip: "Gonfle avec l'octopus ou à la bouche, jamais en débranchant ton direct system.",
      },
      {
        name: 'La soupape de surpression',
        text: "Elle laisse s'échapper l'air en trop pendant la montée, quand l'air se dilate. Sans elle, le tube pourrait éclater.",
        tip: '',
      },
      {
        name: 'Le dévidoir ou la bobine',
        text: "Il porte le fil qui relie le parachute à toi. Le dévidoir à manivelle se rembobine facilement. La bobine (spool), plus simple et compacte, demande un peu d'entraînement.",
        tip: 'Prévois au moins 20 à 30 m de fil pour lancer depuis la profondeur.',
      },
      {
        name: 'Le mousqueton',
        text: "Il accroche le dévidoir ou la bobine à ton gilet quand tu ne t'en sers pas, et permet de le passer facilement d'une main à l'autre.",
        tip: "Ne t'accroche jamais au fil : si le parachute monte vite, il t'emmène avec lui.",
      },
      {
        name: 'Le lest de pied',
        text: "Un petit poids en bas du tube qui l'aide à se redresser à la verticale en surface.",
        tip: '',
      },
    ],
    choose: [
      {
        t: 'Fermé ou ouvert',
        d: "Le tube fermé, avec soupape, reste gonflé même couché sur l'eau. C'est le plus sûr. Le modèle ouvert en bas coûte moins cher mais peut se vider s'il bascule.",
      },
      {
        t: 'La taille',
        d: "Plus il est haut, plus il est visible. Un tube de 1 à 1,5 m convient à la plupart des plongées. Plus grand, il demande plus d'air pour se redresser.",
      },
      {
        t: 'La couleur',
        d: 'Orange pour être vu en surface, jaune souvent réservé à signaler un problème selon les clubs. Certains modèles ont une bande réfléchissante.',
      },
      {
        t: 'Le dévidoir',
        d: "Un dévidoir à manivelle avec 30 m de fil se manipule facilement avec des gants. Vérifie qu'il se bloque bien et ne s'emmêle pas.",
      },
      {
        t: 'Le rangement',
        d: 'Il doit se rouler dans une petite pochette ou une sangle élastique, accrochée au gilet ou glissée dans une poche.',
      },
    ],
    care: [
      {
        t: 'Préviens ton binôme',
        d: "avant de le lancer, et vérifie qu'il n'y a personne au-dessus de toi.",
      },
      {
        t: "Stabilise-toi d'abord",
        d: 'le gilet légèrement gonflé, sans bouger de profondeur. Le lancement peut te faire remonter brusquement.',
      },
      {
        t: 'Laisse le fil filer librement',
        d: 'dévidoir tenu loin du corps, jamais enroulé autour de la main ni accroché au gilet.',
      },
      {
        t: 'Rince et sèche',
        d: "à l'eau douce après chaque journée, tube ouvert, avant de le rouler.",
      },
      {
        t: 'Entraîne-toi',
        d: "à le lancer en pleine eau avec ton moniteur, avant d'en avoir vraiment besoin.",
      },
    ],
    products: [],
  },
}
