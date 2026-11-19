// Questions for /niveau2/quiz (see design "Révisions Niveau 2")

import { OPEN_CALC, QCM_CALC } from './quizNiveau2Calculs'

export type ThemeId = 'phy' | 'reg'

export const THEMES: { id: ThemeId; name: string }[] = [
  { id: 'phy', name: 'Physique' },
  { id: 'reg', name: 'Réglementation' },
]

// o = 4 options, c = indexes of the correct options (one or more), e = explanation
export interface QcmQuestion {
  t: ThemeId
  q: string
  o: string[]
  c: number[]
  e: string
}

// r = model answer, k = expected items [label, ...variants], n = expected numbers,
// tol = tolerance on numbers, min = number of k items that is enough (otherwise all)
export interface OpenQuestion {
  t: ThemeId
  q: string
  r: string
  k?: string[][]
  n?: number[]
  tol?: number
  min?: number
}

const STATIC_QCM: QcmQuestion[] = [
  /* ---- PHYSIQUE ---- */
  {
    t: 'phy',
    q: "Une pression, c'est :",
    o: [
      'Une force appliquée sur une surface (P = F/S)',
      'Un volume multiplié par une température',
      'Une masse divisée par un volume',
      'Une force multipliée par une distance',
    ],
    c: [0],
    e: 'P = F / S. Exemple : les raquettes à neige répartissent le poids sur une plus grande surface.',
  },
  {
    t: 'phy',
    q: 'Quelle est la pression atmosphérique au niveau de la mer ?',
    o: ['0,5 bar', '1 bar', '2 bars', '10 bars'],
    c: [1],
    e: "Elle vaut 1 bar au niveau de la mer et diminue avec l'altitude.",
  },
  {
    t: 'phy',
    q: 'La pression relative (hydrostatique) augmente de :',
    o: [
      '1 bar tous les 1 m',
      '1 bar tous les 5 m',
      '1 bar tous les 10 m',
      '2 bars tous les 10 m',
    ],
    c: [2],
    e: 'P relative = profondeur / 10.',
  },
  {
    t: 'phy',
    q: 'La pression absolue est égale à :',
    o: [
      'P atmosphérique − P relative',
      'P atmosphérique + P relative',
      'P relative × 10',
      'P atmosphérique × profondeur',
    ],
    c: [1],
    e: 'P abs = P atm + P relative.',
  },
  {
    t: 'phy',
    q: 'À quelle profondeur la pression a-t-elle doublé par rapport à la surface ?',
    o: ['5 m', '10 m', '20 m', '30 m'],
    c: [1],
    e: '1 bar en surface, 2 bars à 10 m. Elle double à nouveau à 30 m (4 bars).',
  },
  {
    t: 'phy',
    q: 'Dans quelle zone la variation de pression est-elle la plus forte en proportion ?',
    o: [
      'Entre 0 et 10 m',
      'Entre 10 et 20 m',
      'Entre 20 et 30 m',
      'Entre 30 et 40 m',
    ],
    c: [0],
    e: "La pression est multipliée par 2 entre 0 et 10 m. C'est la zone des paliers, à surveiller pour éviter les barotraumatismes.",
  },
  {
    t: 'phy',
    q: "La poussée d'Archimède est dirigée :",
    o: [
      'Verticalement, de haut en bas',
      'Verticalement, de bas en haut',
      'Horizontalement, dans le sens du courant',
      'Dans toutes les directions',
    ],
    c: [1],
    e: 'Poussée verticale, de bas en haut.',
  },
  {
    t: 'phy',
    q: "La poussée d'Archimède est égale :",
    o: [
      'Au poids réel du plongeur',
      'Au poids du volume de fluide déplacé',
      'À la pression absolue',
      'Au poids du lest',
    ],
    c: [1],
    e: 'Tout corps plongé dans un fluide reçoit une poussée égale au poids du volume de fluide déplacé.',
  },
  {
    t: 'phy',
    q: 'Le poids apparent est égal à :',
    o: [
      "Poids réel + poussée d'Archimède",
      "Poids réel − poussée d'Archimède",
      "Poussée d'Archimède − lest",
      'Poids réel × pression',
    ],
    c: [1],
    e: "Poids apparent = poids réel − poussée d'Archimède.",
  },
  {
    t: 'phy',
    q: 'Sur quoi agit la ceinture de plomb ?',
    o: [
      'Sur le poids réel',
      "Sur la poussée d'Archimède",
      'Sur la pression absolue',
      "Sur la consommation d'air",
    ],
    c: [0],
    e: "Le lest agit sur le poids réel. Le gilet agit sur la poussée d'Archimède (il change le volume).",
  },
  {
    t: 'phy',
    q: 'Sur quoi agit le gilet stabilisateur ?',
    o: [
      'Sur le poids réel',
      "Sur la poussée d'Archimède",
      'Sur la pression atmosphérique',
      'Sur la saturation en azote',
    ],
    c: [1],
    e: "En gonflant le gilet, on augmente le volume, donc la poussée d'Archimède.",
  },
  {
    t: 'phy',
    q: 'Un plongeur bien lesté doit pouvoir se stabiliser :',
    o: [
      'À 3 m, gilet totalement vide',
      'À 3 m, gilet à moitié gonflé',
      'En surface, gilet vide',
      'À 10 m, gilet vide',
    ],
    c: [0],
    e: 'Stabilisé à 3 m gilet vide. Attention au surlestage compensé par le gonflage du gilet.',
  },
  {
    t: 'phy',
    q: 'Quelles affirmations sur la loi de Boyle-Mariotte sont vraies ?',
    o: [
      "Elle s'applique à température constante",
      "Le volume d'un gaz est inversement proportionnel à la pression absolue",
      "Le volume d'un gaz augmente quand la pression augmente",
      'P × V = constante',
    ],
    c: [0, 1, 3],
    e: 'À température constante, P × V = constante : si la pression double, le volume est divisé par 2.',
  },
  {
    t: 'phy',
    q: 'On descend une bouteille en plastique vide et fermée. Que se passe-t-il ?',
    o: [
      'Elle gonfle',
      "Elle s'écrase de plus en plus",
      'Elle ne change pas',
      "Elle se remplit d'eau",
    ],
    c: [1],
    e: "L'air se comprime avec la pression. Elle reprend sa forme à la remontée.",
  },
  {
    t: 'phy',
    q: 'Pourquoi faut-il expirer pendant la remontée ?',
    o: [
      "Pour consommer moins d'air",
      "Parce que l'air des poumons se dilate quand la pression diminue",
      "Pour éliminer plus vite l'azote",
      'Pour descendre plus vite',
    ],
    c: [1],
    e: "Boyle-Mariotte : l'air se dilate à la remontée. Bloquer sa respiration expose à la surpression pulmonaire (barotraumatisme).",
  },
  {
    t: 'phy',
    q: "Pourquoi ne jamais donner de l'air à un apnéiste en profondeur ?",
    o: [
      "L'air qu'il inspire se dilate à la remontée : risque de surpression pulmonaire",
      'Il risque une narcose immédiate',
      'Cela vide trop vite la bouteille',
      'Son masque risque de se plaquer',
    ],
    c: [0],
    e: "L'air inspiré au fond se dilate en remontant. L'apnéiste ne pense pas à expirer.",
  },
  {
    t: 'phy',
    q: 'À quelle pression passe-t-on sur réserve ?',
    o: ['20 bars', '50 bars', '100 bars', '150 bars'],
    c: [1],
    e: "L'autonomie = temps d'immersion avant de passer sur réserve (50 bars).",
  },
  {
    t: 'phy',
    q: "De quoi dépend l'autonomie en air ?",
    o: [
      "De la quantité d'air dans la bouteille",
      'De la profondeur',
      'De la consommation du plongeur (froid, stress...)',
      'De la couleur de la bouteille',
    ],
    c: [0, 1, 2],
    e: "Elle dépend aussi de l'expérience et de l'entraînement du plongeur.",
  },
  {
    t: 'phy',
    q: "Quels facteurs peuvent augmenter la consommation d'air ?",
    o: [
      'Le froid',
      'Le stress',
      'Un mauvais lestage',
      'Une bonne forme physique',
    ],
    c: [0, 1, 2],
    e: 'Lestage, froid, stress et forme physique influencent la consommation.',
  },
  {
    t: 'phy',
    q: 'La loi de Henry dit que la quantité de gaz dissous dans un liquide est :',
    o: [
      'Inversement proportionnelle à la pression',
      'Proportionnelle à la pression du gaz sur le liquide',
      'Indépendante de la pression',
      'Proportionnelle au volume du liquide',
    ],
    c: [1],
    e: 'À température constante et à saturation, la quantité de gaz dissous est proportionnelle à la pression du gaz sur le liquide.',
  },
  {
    t: 'phy',
    q: "Pour se protéger d'une mauvaise désaturation, le plongeur doit :",
    o: [
      'Utiliser un moyen de décompression',
      'Respecter la vitesse de remontée',
      'Réaliser les paliers préconisés',
      'Remonter le plus vite possible',
    ],
    c: [0, 1, 2],
    e: 'Et planifier la plongée en palanquée : durée, profondeur maximum.',
  },
  {
    t: 'phy',
    q: 'Quelle est la PpO₂ limite absolue tolérée pour de courtes expositions ?',
    o: ['0,21 bar', '1 bar', '1,6 bar', '5,6 bars'],
    c: [2],
    e: '1,6 bar, par exemple aux paliers avec un mélange riche en oxygène.',
  },
  {
    t: 'phy',
    q: "La PpN₂ maximale tolérée à l'air est de 5,6 bars. À quelle profondeur cela correspond-il ?",
    o: ['40 m', '50 m', '60 m', '70 m'],
    c: [2],
    e: "5,6 bars de PpN₂ correspondent à 60 m, profondeur limite réglementaire à l'air.",
  },

  /* ---- RÉGLEMENTATION ---- */
  {
    t: 'reg',
    q: 'Que fixe le code du sport pour la plongée ?',
    o: [
      "L'organisation minimale pour la sécurité des plongées",
      'Les prérogatives des plongeurs et encadrants',
      "L'équipement et le matériel obligatoires",
      'Le prix des plongées',
    ],
    c: [0, 1, 2],
    e: 'Le code du sport fixe des règles obligatoires : organisation, prérogatives, équipement.',
  },
  {
    t: 'reg',
    q: 'Quels sont les objectifs du code du sport ?',
    o: [
      'Garantir la sécurité des plongeurs',
      "Protéger l'environnement",
      'Fixer les tarifs des clubs',
      'Choisir les sites de plongée',
    ],
    c: [0, 1],
    e: "Sécurité des plongeurs et protection de l'environnement.",
  },
  {
    t: 'reg',
    q: 'Le code du sport traite-t-il des plongées « hors club » ?',
    o: [
      'Oui, avec des règles spécifiques',
      'Non, mais les mêmes règles de sécurité restent pertinentes (jurisprudence)',
      "Non, et aucune règle ne s'applique",
      "Oui, uniquement à l'étranger",
    ],
    c: [1],
    e: "Il ne les traite pas, mais la jurisprudence s'appuie sur les mêmes règles de sécurité.",
  },
  {
    t: 'reg',
    q: 'Quels sont les deux types de « clubs » de plongée ?',
    o: [
      'Les associations et les structures commerciales agréées (SCA)',
      'Les clubs privés et les clubs municipaux',
      'Les clubs FFESSM et les clubs PADI',
      'Les écoles et les centres de loisirs',
    ],
    c: [0],
    e: "Associations (ex : L'Odyssée) et SCA, affiliées à une ou plusieurs fédérations.",
  },
  {
    t: 'reg',
    q: 'Que peut-on dire de la FFESSM ?',
    o: [
      "C'est une fédération agréée et délégataire",
      "C'est la plus représentée en France (environ 150 000 licenciés)",
      "Elle ne s'occupe que de plongée bouteille",
      'Elle remplace le code du sport',
    ],
    c: [0, 1],
    e: "Elle gère aussi l'apnée, la nage avec palmes, la biologie, le hockey, la pêche sous-marine...",
  },
  {
    t: 'reg',
    q: 'Les règles fédérales et associatives (règlement intérieur...) sont valables :',
    o: [
      'Partout en France',
      'Uniquement dans ce club ou cette fédération, en complément du code du sport',
      'À la place du code du sport',
      "Uniquement à l'étranger",
    ],
    c: [1],
    e: "Elles s'ajoutent au code du sport, sans le remplacer.",
  },
  {
    t: 'reg',
    q: "Que signifie l'aptitude PE 20 ?",
    o: [
      "Plongée en autonomie jusqu'à 20 m",
      "Plongée encadrée jusqu'à 20 m",
      "Plongée encadrée jusqu'à 40 m",
      "Plongée enfant jusqu'à 20 m",
    ],
    c: [1],
    e: "PE = palanquée encadrée. PE 20 = encadré jusqu'à 20 m.",
  },
  {
    t: 'reg',
    q: "Que signifie l'aptitude PA 12 ?",
    o: [
      "Plongée encadrée jusqu'à 12 m",
      "Plongée en autonomie jusqu'à 12 m",
      'Palanquée de 12 plongeurs',
      'Plongée en piscine de 12 m',
    ],
    c: [1],
    e: 'PA = palanquée autonome.',
  },
  {
    t: 'reg',
    q: 'Quelles aptitudes donne le brevet Niveau 1 ?',
    o: ['PE 20', 'PA 20', 'PE 40', 'PA 12'],
    c: [0],
    e: "Niveau 1 = PE 20, pas d'autonomie.",
  },
  {
    t: 'reg',
    q: 'Quelles aptitudes donne le brevet Niveau 2 ?',
    o: ['PE 40', 'PA 20', 'PA 40', 'PE 60'],
    c: [0, 1],
    e: 'Niveau 2 = PE 40 et PA 20.',
  },
  {
    t: 'reg',
    q: 'Quelles aptitudes donne le brevet Niveau 3 ?',
    o: [
      'PE 40 et PA 20',
      'PE 60 et PA 60',
      'PE 60 et PA 40',
      'PA 60 uniquement',
    ],
    c: [1],
    e: 'Niveau 3 = PE 60 et PA 60.',
  },
  {
    t: 'reg',
    q: "Quelles sont les profondeurs maximales possibles des espaces d'évolution ?",
    o: [
      '6, 12, 20, 40 ou 60 m',
      '5, 10, 20, 30 ou 50 m',
      '10, 20, 30, 40 ou 50 m',
      '12, 25, 40 ou 70 m',
    ],
    c: [0],
    e: '6 m (débutants, baptêmes), 12, 20, 40 et 60 m.',
  },
  {
    t: 'reg',
    q: 'Lequel de ces organismes ne délivre pas de brevets français reconnus directement par le code du sport ?',
    o: ['FFESSM', 'ANMP', 'UCPA', 'PADI'],
    c: [3],
    e: 'Brevets français : FFESSM, FSGT, ANMP, SNMP, UCPA. PADI est une agence internationale, reconnue en France par passerelles ou équivalences.',
  },
  {
    t: 'reg',
    q: "Une palanquée, c'est :",
    o: [
      'Un groupe de plongeurs qui font une plongée avec les mêmes durée, profondeur et trajet',
      'Le bateau de plongée',
      'Le groupe des encadrants du club',
      'Un binôme de plongeurs du même niveau',
    ],
    c: [0],
    e: 'On ne plonge jamais seul : toujours en palanquée.',
  },
  {
    t: 'reg',
    q: "Composition maximale d'une palanquée encadrée :",
    o: [
      '1 encadrant + 3 plongeurs',
      '1 encadrant + 4 plongeurs (+1 éventuel plongeur niveau 4)',
      '1 encadrant + 5 plongeurs',
      '2 encadrants + 6 plongeurs',
    ],
    c: [1],
    e: '1 encadrant + 4 plongeurs maxi, plus éventuellement 1 plongeur niveau 4.',
  },
  {
    t: 'reg',
    q: 'Combien de plongeurs au maximum dans une palanquée autonome ?',
    o: ['2', '3', '4', '5'],
    c: [1],
    e: '3 plongeurs maxi en palanquée autonome.',
  },
  {
    t: 'reg',
    q: 'Quelles conditions faut-il remplir pour plonger en palanquée autonome ?',
    o: [
      'Être majeur',
      'Avoir les aptitudes « autonomie » (PA)',
      'Être guide de palanquée',
      'Avoir au moins 50 plongées',
    ],
    c: [0, 1],
    e: 'Plongeurs majeurs avec les aptitudes autonomie.',
  },
  {
    t: 'reg',
    q: "Quelle qualification minimale pour encadrer une plongée d'exploration jusqu'à 40 m ?",
    o: ['Niveau 2', 'Niveau 3', 'Guide de palanquée (niveau 4)', 'Initiateur'],
    c: [2],
    e: "GP (niveau 4) pour l'exploration jusqu'à 40 m, ou un enseignant E1 à E4.",
  },
  {
    t: 'reg',
    q: 'Qui autorise la plongée, définit les palanquées et vérifie les conditions de sécurité ?',
    o: [
      'Le guide de palanquée',
      'Le directeur de plongée (DP)',
      'Le pilote du bateau',
      'Le président du club',
    ],
    c: [1],
    e: "Le DP, présent sur le lieu, est responsable de l'organisation.",
  },
  {
    t: 'reg',
    q: 'Qualification minimale du directeur de plongée en mer :',
    o: [
      'Niveau 4',
      'Enseignant E3 (ex : MF1) ou Niveau 5 si exploration uniquement',
      'Niveau 3',
      'Enseignant E1',
    ],
    c: [1],
    e: 'E1 suffit seulement en piscine de moins de 6 m.',
  },
  {
    t: 'reg',
    q: 'Quel équipement est obligatoire pour chaque plongeur ?',
    o: [
      'Bouteille',
      'Détendeur',
      'Gilet stabilisateur et manomètre',
      'Parachute de palier individuel',
    ],
    c: [0, 1, 2],
    e: 'Bouteille, détendeur, gilet et manomètre. Le parachute est obligatoire par palanquée.',
  },
  {
    t: 'reg',
    q: "Qu'est-ce qui est obligatoire en plus pour un plongeur autonome ou à plus de 20 m ?",
    o: [
      'Un moyen de décompression (ordinateur, ou tables + montre + profondimètre)',
      'Un détendeur de secours (2ème étage, octopus)',
      'Une lampe',
      'Une boussole',
    ],
    c: [0, 1],
    e: 'Moyen de décompression et détendeur de secours.',
  },
  {
    t: 'reg',
    q: 'Le parachute de palier est obligatoire :',
    o: [
      'Pour chaque plongeur',
      'Au moins un par palanquée',
      "Uniquement pour l'encadrant",
      'Uniquement au-delà de 40 m',
    ],
    c: [1],
    e: 'Au moins un parachute par palanquée.',
  },
  {
    t: 'reg',
    q: "Quel équipement spécifique est obligatoire pour l'encadrant ?",
    o: [
      "Un détendeur de secours complet (1er et 2ème étages) avec double sortie d'air",
      'Une deuxième bouteille',
      'Un ordinateur de secours',
      'Une trousse de secours',
    ],
    c: [0],
    e: "Double sortie d'air et détendeur de secours complet.",
  },
  {
    t: 'reg',
    q: 'Que trouve-t-on dans le matériel de secours obligatoire sur le lieu de plongée ?',
    o: [
      'Oxygénothérapie médicale (BAVU, masques)',
      'Couverture isothermique',
      'Eau potable',
      'Caisson hyperbare portable',
    ],
    c: [0, 1, 2],
    e: "Aussi : moyen de communication (VHF si bateau) et fiches d'évacuation, plus un plan de secours.",
  },
  {
    t: 'reg',
    q: 'Sur un bateau, quel moyen de communication est prévu pour prévenir les secours ?',
    o: ['Un sifflet', 'Une VHF', 'Une corne de brume', 'Un drapeau'],
    c: [1],
    e: 'VHF si la plongée se fait depuis un bateau.',
  },
  {
    t: 'reg',
    q: "Que contient le matériel d'assistance ?",
    o: [
      "Une bouteille d'air de secours",
      'Un moyen de rappeler les plongeurs en immersion',
      'Une tablette immergeable et des tables de décompression',
      'Un scooter sous-marin',
    ],
    c: [0, 1, 2],
    e: 'Les tables ne sont pas obligatoires en piscine ou fosse de moins de 6 m.',
  },
  {
    t: 'reg',
    q: 'Durée de validité de la licence FFESSM :',
    o: [
      "1 an à date d'achat",
      "Du 15/09 au 31/12 de l'année suivante",
      'Du 01/01 au 31/12',
      '2 ans',
    ],
    c: [1],
    e: "Valable dans le monde entier, du 15 septembre au 31 décembre de l'année suivante.",
  },
  {
    t: 'reg',
    q: 'Quelle assurance est incluse avec la licence FFESSM ?',
    o: [
      'Responsabilité civile',
      'Individuelle accident',
      'Assistance rapatriement',
      'Aucune',
    ],
    c: [0],
    e: "RC incluse. L'individuelle accident n'est pas incluse : assurance complémentaire proposée.",
  },
  {
    t: 'reg',
    q: 'Durée de validité du certificat médical à la FFESSM :',
    o: ['6 mois', '1 an', '2 ans', '3 ans'],
    c: [1],
    e: '1 an.',
  },
  {
    t: 'reg',
    q: "Conditions d'accès au Niveau 2 FFESSM :",
    o: [
      'Avoir 16 ans au moins à la date de délivrance',
      'Être titulaire du Niveau 1 (ou équivalent)',
      'Avoir une licence et un certificat médical valides',
      'Avoir 18 ans',
    ],
    c: [0, 1, 2],
    e: '16 ans minimum, N1, licence et certificat médical en cours de validité.',
  },
  {
    t: 'reg',
    q: 'Quels documents présenter pour plonger dans une structure FFESSM ?',
    o: [
      'Le carnet de plongée',
      'Le certificat médical en cours de validité',
      'La licence fédérale en cours de validité',
      'Le permis bateau',
    ],
    c: [0, 1, 2],
    e: 'Plus la carte de brevet de plongeur.',
  },
  {
    t: 'reg',
    q: "Un plongeur en formation peut-il dépasser son espace d'évolution ?",
    o: [
      'Non, jamais',
      'Oui, le code du sport prévoit une extension (ex : 40 m pour les prépa PA40 ou PE40)',
      'Oui, sans limite',
      'Uniquement en piscine',
    ],
    c: [1],
    e: "Le code du sport prévoit d'étendre les espaces d'évolution pour les plongeurs en formation.",
  },
  {
    t: 'reg',
    q: "Les brevets français permettent-ils de plonger à l'étranger ?",
    o: [
      'Non',
      'Oui (équivalences CMAS / étoiles)',
      'Uniquement en Europe',
      'Uniquement avec un brevet PADI en plus',
    ],
    c: [1],
    e: 'Équivalences CMAS (étoiles). Les brevets PADI, SSI... permettent de plonger en France par passerelles.',
  },
]

/* ================= QUESTIONS OUVERTES =================
   r = réponse modèle, k = éléments attendus [libellé, variantes...], n = nombres attendus,
   min = nombre d'éléments k suffisants (sinon tous) */

const STATIC_OPEN: OpenQuestion[] = [
  /* ---- PHYSIQUE ---- */
  {
    t: 'phy',
    q: 'Donne la formule de la pression absolue.',
    r: 'P absolue = P atmosphérique + P relative',
    k: [
      ['atmosphérique', 'atmospherique', 'atm'],
      ['relative', 'hydrostatique', 'rel'],
    ],
  },
  {
    t: 'phy',
    q: 'Quelle est la pression atmosphérique au niveau de la mer ?',
    r: '1 bar',
    n: [1],
    k: [['bar']],
  },
  {
    t: 'phy',
    q: 'De combien augmente la pression relative quand on descend ?',
    r: '1 bar tous les 10 mètres (P relative = profondeur / 10)',
    n: [1, 10],
  },
  {
    t: 'phy',
    q: 'À quelle profondeur la pression double-t-elle par rapport à la surface ? Et à quelle profondeur double-t-elle à nouveau ?',
    r: 'À 10 m (2 bars), puis à 30 m (4 bars)',
    n: [10, 30],
  },
  {
    t: 'phy',
    q: 'Pourquoi faut-il être particulièrement vigilant entre 10 m et la surface ?',
    r: "Parce que c'est là que la pression varie le plus en proportion (elle double entre 0 et 10 m). Risque de barotraumatismes. C'est aussi la zone des paliers.",
    k: [
      [
        'la pression double / varie le plus',
        'double',
        'varie',
        'variation',
        'x2',
        'x 2',
      ],
      ['barotraumatismes ou paliers', 'barotraum', 'palier'],
    ],
  },
  {
    t: 'phy',
    q: "Énonce le principe d'Archimède.",
    r: 'Tout corps plongé dans un fluide reçoit de la part de celui-ci une poussée verticale, dirigée de bas en haut, égale au poids du volume de fluide déplacé.',
    k: [
      ['fluide', 'fluide', 'liquide', 'eau'],
      ['de bas en haut', 'bas en haut', 'vers le haut', 'verticale'],
      ['poids', 'poids'],
      ['volume déplacé', 'deplace'],
    ],
  },
  {
    t: 'phy',
    q: 'Donne la formule du poids apparent.',
    r: "Poids apparent = poids réel − poussée d'Archimède",
    k: [
      ['poids réel', 'reel'],
      ["poussée d'Archimède", 'archimede', 'poussee'],
    ],
  },
  {
    t: 'phy',
    q: 'Sur quoi agit la ceinture de plomb ? Et le gilet stabilisateur ?',
    r: "Le plomb agit sur le poids réel. Le gilet agit sur la poussée d'Archimède (le volume).",
    k: [
      ['poids réel', 'poids reel', 'reel'],
      ["poussée d'Archimède", 'archimede', 'volume'],
    ],
  },
  {
    t: 'phy',
    q: 'À quelle profondeur et dans quel état de gilet un plongeur bien lesté doit-il être stabilisé ?',
    r: 'À 3 m, gilet totalement vide',
    n: [3],
    k: [['gilet vide', 'vide', 'purge', 'degonfle', 'sans air']],
  },
  {
    t: 'phy',
    q: 'Énonce la loi de Boyle-Mariotte.',
    r: "À température constante, le volume d'un gaz varie de manière inversement proportionnelle à la pression absolue à laquelle il est soumis. P × V = constante.",
    k: [
      ['température constante', 'temperature'],
      ['volume', 'volume'],
      ['pression', 'pression'],
      ['inversement proportionnel', 'invers', 'pv', 'p x v', 'p*v', 'pxv'],
    ],
  },
  {
    t: 'phy',
    q: "Pourquoi ne faut-il jamais donner de l'air à un apnéiste ?",
    r: "L'air inspiré au fond se dilate à la remontée (Boyle-Mariotte). L'apnéiste ne l'expire pas : risque de surpression pulmonaire (barotraumatisme).",
    k: [
      [
        "l'air se dilate",
        'dilat',
        'augmente de volume',
        'volume augmente',
        'gonfle',
      ],
      [
        'surpression pulmonaire / barotraumatisme',
        'surpression',
        'barotraum',
        'poumon',
        'pulmonaire',
      ],
    ],
    min: 1,
  },
  {
    t: 'phy',
    q: "Qu'est-ce que l'autonomie d'un plongeur ? À quelle pression commence la réserve ?",
    r: "Le temps d'immersion avant de passer sur réserve. Réserve = 50 bars.",
    n: [50],
    k: [['temps', 'temps', 'duree']],
  },
  {
    t: 'phy',
    q: "Cite les facteurs dont dépend l'autonomie en air.",
    r: "La quantité d'air dans la bouteille, la profondeur, la consommation du plongeur (froid, stress...), son expérience et son entraînement.",
    k: [
      ["quantité d'air", 'quantite', 'air', 'bouteille', 'volume'],
      ['profondeur', 'profondeur'],
      [
        'consommation',
        'consommation',
        'conso',
        'froid',
        'stress',
        'experience',
        'entrainement',
      ],
    ],
  },
  {
    t: 'phy',
    q: 'Énonce la loi de Henry.',
    r: "À température constante et à saturation, la quantité de gaz dissous dans un liquide est proportionnelle à la pression qu'exerce ce gaz sur le liquide.",
    k: [
      ['température constante', 'temperature'],
      ['gaz dissous', 'dissou', 'dissolution', 'dissout'],
      ['proportionnelle', 'proportionnel'],
      ['pression', 'pression'],
    ],
  },
  {
    t: 'phy',
    q: 'Que doit faire le plongeur pour éviter une mauvaise désaturation ?',
    r: 'Utiliser un moyen de décompression, respecter la vitesse de remontée, réaliser les paliers. Et planifier la plongée avant.',
    k: [
      [
        'moyen de décompression',
        'decompression',
        'ordinateur',
        'ordi',
        'table',
      ],
      ['vitesse de remontée', 'vitesse'],
      ['paliers', 'palier'],
    ],
  },
  {
    t: 'phy',
    q: 'Quelle est la PpO₂ limite maximale tolérée pour de courtes expositions ?',
    r: '1,6 bar',
    n: [1.6],
  },
  {
    t: 'phy',
    q: "Quelle est la PpN₂ maximale tolérée à l'air, et à quelle profondeur correspond-elle ?",
    r: '5,6 bars, soit 60 m',
    n: [5.6, 60],
  },

  /* ---- RÉGLEMENTATION ---- */
  {
    t: 'reg',
    q: 'Que fixe le code du sport pour la plongée ?',
    r: "L'organisation minimale pour la sécurité des plongées, les prérogatives des plongeurs et encadrants, l'équipement et le matériel obligatoires.",
    k: [
      ['organisation / sécurité', 'organisation', 'securite'],
      ['prérogatives', 'prerogative', 'aptitude'],
      ['équipement / matériel', 'equipement', 'materiel'],
    ],
  },
  {
    t: 'reg',
    q: 'Quels sont les deux objectifs du code du sport ?',
    r: "Garantir la sécurité des plongeurs et protéger l'environnement.",
    k: [
      ['sécurité', 'securite'],
      ['environnement', 'environnement'],
    ],
  },
  {
    t: 'reg',
    q: "Quels sont les deux types de structures où l'on pratique la plongée ?",
    r: 'Les associations et les structures commerciales agréées (SCA).',
    k: [
      ['associations', 'association'],
      ['structures commerciales (SCA)', 'commercial', 'sca'],
    ],
  },
  {
    t: 'reg',
    q: 'Que signifient PE et PA ?',
    r: 'PE = plongée en palanquée encadrée. PA = plongée en palanquée autonome.',
    k: [
      ['encadrée', 'encadr'],
      ['autonome', 'autonom'],
    ],
  },
  {
    t: 'reg',
    q: "Quelles sont les prérogatives d'un plongeur Niveau 2 ?",
    r: "PE 40 : encadré jusqu'à 40 m. PA 20 : en autonomie jusqu'à 20 m (palanquée de 3 max), sous la responsabilité d'un DP.",
    n: [40, 20],
    k: [
      ['encadré', 'encadr', 'pe'],
      ['autonome', 'autonom', 'pa'],
    ],
  },
  {
    t: 'reg',
    q: 'Quelles aptitudes donne le Niveau 1 ? Et le Niveau 3 ?',
    r: 'Niveau 1 : PE 20. Niveau 3 : PE 60 et PA 60.',
    n: [20, 60],
  },
  {
    t: 'reg',
    q: 'Définis une palanquée.',
    r: 'Un groupe de plongeurs qui effectuent une plongée avec les mêmes caractéristiques de durée, de profondeur et de trajet.',
    k: [
      ['groupe', 'groupe', 'plongeurs', 'ensemble'],
      ['durée', 'duree', 'temps'],
      ['profondeur', 'profondeur'],
      ['trajet', 'trajet', 'parcours', 'itineraire'],
    ],
  },
  {
    t: 'reg',
    q: "Quelle est la composition maximale d'une palanquée encadrée ?",
    r: '1 encadrant + 4 plongeurs maximum (+ 1 éventuel plongeur niveau 4).',
    n: [1, 4],
    k: [['encadrant', 'encadrant', 'guide', 'moniteur', 'enseignant', 'gp']],
  },
  {
    t: 'reg',
    q: 'Combien de plongeurs au maximum dans une palanquée autonome ? Quelles conditions pour en faire partie ?',
    r: '3 plongeurs maximum. Être majeur et avoir les aptitudes autonomie.',
    n: [3],
    k: [
      ['majeur', 'majeur', '18'],
      ['aptitude autonomie', 'autonom', 'aptitude', 'pa'],
    ],
  },
  {
    t: 'reg',
    q: "Quelle qualification minimale faut-il pour encadrer une plongée d'exploration jusqu'à 40 m ?",
    r: 'Guide de palanquée (plongeur niveau 4), ou un enseignant (E1 à E4).',
    k: [['guide de palanquée / niveau 4', 'guide', 'gp', 'niveau 4', 'n4']],
  },
  {
    t: 'reg',
    q: "Qui est responsable de l'organisation de la plongée sur le site ? Cite son rôle.",
    r: "Le directeur de plongée (DP). Il autorise la plongée, définit ses caractéristiques et les palanquées, s'assure du respect des règles et des conditions de sécurité.",
    k: [
      ['directeur de plongée', 'directeur', 'dp'],
      [
        'rôle : autorise / palanquées / sécurité',
        'autoris',
        'palanquee',
        'securite',
        'regle',
        'organis',
      ],
    ],
  },
  {
    t: 'reg',
    q: "Quelle est la qualification minimale d'un directeur de plongée en mer ?",
    r: 'Enseignant E3 (ex : MF1), ou Niveau 5 si exploration uniquement. (E1 seulement en piscine de moins de 6 m.)',
    k: [['E3 / MF1 ou Niveau 5', 'e3', 'mf1', 'niveau 5', 'n5']],
  },
  {
    t: 'reg',
    q: "Cite l'équipement obligatoire pour chaque plongeur.",
    r: 'Bouteille, détendeur, gilet stabilisateur, manomètre.',
    k: [
      ['bouteille', 'bouteille', 'bloc'],
      ['détendeur', 'detendeur'],
      ['gilet', 'gilet', 'stab'],
      ['manomètre', 'manometre', 'mano'],
    ],
  },
  {
    t: 'reg',
    q: 'Quel équipement est obligatoire en plus pour un plongeur autonome ou à plus de 20 m ?',
    r: 'Un moyen de décompression (ordinateur, ou tables + montre + profondimètre) et un détendeur de secours (2ème étage, octopus).',
    k: [
      [
        'moyen de décompression',
        'decompression',
        'ordinateur',
        'ordi',
        'table',
      ],
      [
        'détendeur de secours / octopus',
        'secours',
        'octopus',
        'octo',
        '2eme etage',
        'deuxieme etage',
        '2e etage',
      ],
    ],
  },
  {
    t: 'reg',
    q: 'Quel équipement est obligatoire pour chaque palanquée ? Et pour chaque encadrant ?',
    r: "Au moins un parachute de palier par palanquée. Pour l'encadrant : double sortie d'air et détendeur de secours complet (1er et 2ème étages).",
    k: [
      ['parachute', 'parachute'],
      [
        'détendeur de secours complet / double sortie',
        'complet',
        'double sortie',
        '1er',
        'premier etage',
      ],
    ],
  },
  {
    t: 'reg',
    q: 'Cite au moins 3 éléments du matériel de secours obligatoire sur le lieu de plongée.',
    r: "Moyen de communication (VHF si bateau), oxygénothérapie médicale (BAVU, masques, masque haute concentration), couverture isothermique, eau potable, fiches d'évacuation. Plus un plan de secours.",
    min: 3,
    k: [
      ['oxygène', 'oxyg', 'o2', 'bavu'],
      ['couverture', 'couverture'],
      ['eau potable', 'eau'],
      [
        'moyen de communication / VHF',
        'vhf',
        'telephone',
        'communication',
        'radio',
      ],
      ["fiches d'évacuation", 'evacuation', 'fiche'],
      ['plan de secours', 'plan de secours'],
    ],
  },
  {
    t: 'reg',
    q: "Cite au moins 2 éléments du matériel d'assistance.",
    r: "Bouteille d'air de secours, moyen de rappeler les plongeurs en immersion, tablette de notation immergeable, tables de décompression.",
    min: 2,
    k: [
      ['bouteille de secours', 'bouteille'],
      ['moyen de rappel', 'rappel', 'rappeler'],
      ['tablette', 'tablette', 'ardoise'],
      ['tables de décompression', 'table'],
    ],
  },
  {
    t: 'reg',
    q: 'Quels documents dois-tu présenter pour plonger dans une structure FFESSM ?',
    r: 'Carte de brevet, carnet de plongée, certificat médical en cours de validité, licence fédérale en cours de validité.',
    k: [
      ['carte de brevet', 'brevet', 'carte'],
      ['carnet de plongée', 'carnet'],
      ['certificat médical', 'certificat', 'medical'],
      ['licence', 'licence'],
    ],
  },
  {
    t: 'reg',
    q: 'Quelle est la période de validité de la licence FFESSM ?',
    r: "Du 15 septembre au 31 décembre de l'année suivante. Valable dans le monde entier.",
    n: [15, 31],
  },
  {
    t: 'reg',
    q: "Quelle assurance est incluse dans la licence ? Laquelle ne l'est pas ?",
    r: 'Incluse : responsabilité civile (dommages causés à autrui). Non incluse : individuelle accident (assurance complémentaire proposée).',
    k: [
      ['responsabilité civile', 'responsabilite civile', 'rc'],
      ['individuelle accident', 'individuelle'],
    ],
  },
  {
    t: 'reg',
    q: 'Quelle est la durée de validité du certificat médical ?',
    r: '1 an',
    n: [1],
    k: [['an', 'an', 'ans', 'annee']],
  },
  {
    t: 'reg',
    q: "Quelles sont les conditions d'accès au Niveau 2 FFESSM ?",
    r: 'Avoir 16 ans au moins à la date de délivrance, être titulaire du Niveau 1 (ou équivalent), avoir une licence et un certificat médical valides.',
    n: [16],
    k: [
      ['Niveau 1', 'niveau 1', 'n1'],
      ['licence', 'licence'],
      ['certificat médical', 'certificat'],
    ],
  },
  {
    t: 'reg',
    q: 'Le code du sport traite-t-il des plongées hors club ? Que faut-il en retenir ?',
    r: 'Non. Mais les mêmes règles de sécurité restent pertinentes en cas de problème (jurisprudence).',
    k: [
      ['non', 'non', 'ne traite pas', 'pas'],
      ['mêmes règles / jurisprudence', 'jurisprudence', 'meme', 'memes'],
    ],
  },
  {
    t: 'reg',
    q: 'Quels organismes français délivrent des brevets reconnus par le code du sport ?',
    r: 'FFESSM, FSGT, ANMP, SNMP, UCPA.',
    min: 3,
    k: [
      ['FFESSM', 'ffessm'],
      ['FSGT', 'fsgt'],
      ['ANMP', 'anmp'],
      ['SNMP', 'snmp'],
      ['UCPA', 'ucpa'],
    ],
  },
  {
    t: 'reg',
    q: "À part les aptitudes, qu'est-ce qui est pris en compte pour fixer les prérogatives d'un plongeur ?",
    r: 'Les règles fédérales (plongée enfant, handisub...), le carnet de plongée (expérience) et les conditions de plongée (visibilité, courant...).',
    min: 2,
    k: [
      ['règles fédérales', 'federal', 'enfant', 'handisub'],
      ['carnet / expérience', 'carnet', 'experience'],
      ['conditions de plongée', 'condition', 'visibilite', 'courant', 'meteo'],
    ],
  },
]

/* ================= POOLS ================= */

// A pool entry is either a fixed question or a generator (calculations whose
// values change every time); realize() turns it into a question.
export type Entry<Q> = Q | { t: ThemeId; gen: () => Q }

export const realize = <Q>(e: Entry<Q>): Q =>
  typeof e === 'object' && e !== null && 'gen' in e ? e.gen() : e

export const QCM: Entry<QcmQuestion>[] = [...STATIC_QCM, ...QCM_CALC]
export const OPEN: Entry<OpenQuestion>[] = [...STATIC_OPEN, ...OPEN_CALC]

/* ================= CORRECTION DES QUESTIONS OUVERTES ================= */

export type Verdict = 'ok' | 'mid' | 'ko'

export interface GradeItem {
  label: string
  hit: boolean
  num?: boolean
}

// Lowercase, strip accents and apostrophes so "Poussée d'Archimède" matches "poussee d archimede"
const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’'`]/g, ' ')
    .replace(/×/g, ' x ')
    .replace(/\s+/g, ' ')
    .trim()

// Short keywords (rc, pa, n1...) must match a whole word, longer ones can be substrings
const hasAlt = (text: string, alt: string) => {
  const a = norm(alt)
  if (a.length <= 3) {
    const escaped = a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`).test(text)
  }
  return text.includes(a)
}

// "3 000" -> 3000, "2,5" -> 2.5
const numbersIn = (raw: string) =>
  (raw.replace(/(\d)\s(?=\d{3}\b)/g, '$1').match(/\d+(?:[.,]\d+)?/g) || []).map(
    (x) => parseFloat(x.replace(',', '.'))
  )

export const gradeOpen = (
  q: OpenQuestion,
  answer: string
): { verdict: Verdict; items: GradeItem[] } => {
  const text = norm(answer)
  const nums = numbersIn(answer)
  const numItems: GradeItem[] = (q.n || []).map((v) => {
    const tol = q.tol ?? Math.max(0.01, Math.abs(v) * 0.02)
    return {
      label: String(v).replace('.', ','),
      hit: nums.some((x) => Math.abs(x - v) <= tol),
      num: true,
    }
  })
  const keyItems: GradeItem[] = (q.k || []).map((g) => ({
    label: g[0]!,
    hit: g.some((a) => hasAlt(text, a)),
  }))
  const items = [...numItems, ...keyItems]
  const numOk = numItems.every((i) => i.hit)
  const keyHits = keyItems.filter((i) => i.hit).length
  const keyOk = q.min ? keyHits >= q.min : keyHits === keyItems.length
  let verdict: Verdict =
    numOk && keyOk ? 'ok' : items.some((i) => i.hit) ? 'mid' : 'ko'
  if (!answer.trim()) verdict = 'ko'
  return { verdict, items }
}
