<template>
  <div class="font-grotesk text-[#e8f1f4] antialiased">
    <UiPageBackground />

    <main class="mx-auto max-w-[1280px] px-8 pb-24">
      <UiPageHero
        title="Matériel"
        subtitle="Découvre le matériel recommandé et les schémas pratiques pour le niveau 1."
      />

      <UiTipsCallout
        title="Conseils d'achat rapides"
        :tips="tips"
        accent="yellow"
      />

      <!-- Recommended gear -->
      <section class="mt-20">
        <UiSectionHeading>Matériel recommandé pour Niveau 1</UiSectionHeading>
        <div :class="cardGrid">
          <article
            v-for="item in gear"
            :key="item.title"
            :class="[cardBase, 'flex flex-col overflow-hidden']"
          >
            <div class="aspect-[16/10] bg-[#0e2737]">
              <img
                :src="item.img"
                :alt="item.title"
                class="h-full w-full object-cover"
              />
            </div>
            <div class="flex flex-1 flex-col gap-4 p-6">
              <div class="flex flex-col gap-2">
                <h3
                  class="m-0 text-[22px] font-semibold tracking-[-0.01em] text-white"
                >
                  {{ item.title }}
                </h3>
                <p
                  class="m-0 text-[15px] leading-[1.55] text-[#9fb4bd] [text-wrap:pretty]"
                >
                  {{ item.desc }}
                </p>
              </div>
              <ul
                class="m-0 flex list-none flex-col gap-2 border-t border-[rgba(232,241,244,0.08)] p-0 pt-4"
              >
                <li
                  v-for="point in item.points"
                  :key="point"
                  class="grid grid-cols-[18px_1fr] gap-2 text-[15px] leading-normal text-[#d4e2e7]"
                >
                  <span class="text-[13px] text-[#7fe3d6]" aria-hidden="true">
                    ✓
                  </span>
                  <span>{{ point }}</span>
                </li>
              </ul>
              <div
                v-if="item.videos.length"
                class="mt-auto flex flex-col gap-2"
              >
                <button
                  v-for="video in item.videos"
                  :key="video.url"
                  type="button"
                  :class="[
                    secondaryButton,
                    'justify-between gap-3 border-[rgba(232,241,244,0.12)] px-3.5 py-3 text-left text-[15px]',
                  ]"
                  @click="openVideoDialog(video.url, video.start)"
                >
                  {{ video.label }}
                  <span
                    class="whitespace-nowrap font-mono text-xs text-[#7fe3d6]"
                  >
                    Vidéo ▶
                  </span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Tutorials -->
      <section class="mt-20">
        <UiSectionHeading>Schémas &amp; Tutoriels pratiques</UiSectionHeading>
        <div :class="cardGrid">
          <article
            v-for="(tuto, i) in tutorials"
            :key="tuto.title"
            :class="[cardBase, 'flex flex-col overflow-hidden']"
          >
            <div class="aspect-video bg-[#0e2737]">
              <img
                :src="tuto.img"
                :alt="tuto.title"
                class="h-full w-full object-cover"
              />
            </div>
            <div class="flex flex-1 flex-col gap-5 p-6">
              <div class="flex flex-col gap-2">
                <span class="font-mono text-[13px] text-[#7fe3d6]">
                  {{ pad2(i + 1) }}
                </span>
                <h3
                  class="m-0 text-xl font-semibold tracking-[-0.01em] text-white"
                >
                  {{ tuto.title }}
                </h3>
                <p
                  class="m-0 text-[15px] leading-[1.55] text-[#9fb4bd] [text-wrap:pretty]"
                >
                  {{ tuto.desc }}
                </p>
              </div>
              <div class="mt-auto flex flex-wrap gap-2">
                <button
                  v-for="(action, j) in tuto.actions"
                  :key="action.label"
                  type="button"
                  :class="[
                    j === 0 ? primaryButton : secondaryButton,
                    'h-10 px-3.5 text-sm',
                  ]"
                  @click="action.run()"
                >
                  {{ action.label }}
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Misc -->
      <section class="mt-20">
        <UiSectionHeading>
          Comprendre les matériels de plongée &amp; Divers
        </UiSectionHeading>
        <button
          v-for="feature in features"
          :key="feature.title"
          type="button"
          :class="[
            cardBase,
            cardHover,
            'grid w-full grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] overflow-hidden text-left text-[#e8f1f4]',
          ]"
          @click="openVideoDialog(feature.url)"
        >
          <div class="relative min-h-[260px] bg-[#0e2737]">
            <img
              :src="feature.img"
              alt=""
              class="absolute inset-0 h-full w-full object-cover"
            />
            <span
              class="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#7fe3d6] text-[#05111a]"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" class="ml-1 h-5 w-5" fill="currentColor">
                <path d="M7 4.5v15l13-7.5z" />
              </svg>
            </span>
          </div>
          <div class="flex flex-col justify-center gap-3 p-8">
            <span
              class="font-mono text-xs uppercase tracking-[0.12em] text-[#7f97a2]"
            >
              Vidéo
            </span>
            <h3
              class="m-0 text-[clamp(24px,3vw,32px)] font-semibold leading-[1.15] tracking-[-0.02em] text-white [text-wrap:balance]"
            >
              {{ feature.title }}
            </h3>
            <p class="m-0 text-base leading-[1.6] text-[#9fb4bd]">
              {{ feature.desc }}
            </p>
            <span class="mt-2 text-[15px] font-semibold text-[#7fe3d6]">
              Regarder la vidéo ▶
            </span>
          </div>
        </button>
      </section>
    </main>

    <CommonVideoDialog ref="ModalsMaterielDialog" />
    <ModalsMaterielChecklistDialog ref="ModalsMaterielChecklistDialogRef" />
    <ModalsMaterielGreerBlocDialog ref="ModalsMaterielGreerBlocDialogRef" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ breadcrumb: 'Matériel' })

const ModalsMaterielDialog = ref()
const ModalsMaterielChecklistDialogRef = ref()
const ModalsMaterielGreerBlocDialogRef = ref()

const openVideoDialog = (url: string, startTime?: number) => {
  ModalsMaterielDialog.value.open(url, startTime)
}

const openChecklistDialog = () => {
  ModalsMaterielChecklistDialogRef.value.open()
}

const openGreerBlocDialog = () => {
  ModalsMaterielGreerBlocDialogRef.value.open()
}

const cardGrid =
  'grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-4'

const tips = [
  "Privilégier l'essai avant achat (confort du masque, taille des palmes).",
  'Demander aux formateurs du club pour avoir des conseils.',
  'Garder les factures et garanties - entretien annuel recommandé (détendeurs, gilet etc...).',
]

const gear = [
  {
    title: 'Masque',
    img: '/img/materiel/masque.png',
    desc: "Jupe souple, bonne étanchéité, verre correctif si besoin. Teste l'aspiration sur le visage sans sangle.",
    points: [
      'Type low-volume conseillé',
      'Verres correctifs possibles',
      'Sangle confortable, neoprene si long usage',
    ],
    videos: [
      {
        label: 'Bien choisir son masque',
        url: 'https://www.youtube.com/embed/DcoorOWgQTM?si=_f3nyuE9Uh2-0szA',
        start: 402,
      },
      {
        label: 'Les différentes technologies de masques',
        url: 'https://www.youtube.com/embed/tWfsGohE5wY?si=OAjOFWcW-vOz-o8p',
      },
    ],
  },
  {
    title: 'Tuba',
    img: '/img/materiel/tuba.png',
    desc: 'Tuba simple ou pliable; embout confortable. Utile pendant les exercices en surface.',
    points: [
      'Position latérale sur sangles du masque',
      'Anti-retour pour eau éventuelle (optionnel)',
    ],
    videos: [],
  },
  {
    title: 'Palmes',
    img: '/img/materiel/palmes.png',
    desc: 'Palmes chaussantes ou réglables selon la pratique. Taille adaptée au chausson, confort du talon.',
    points: [
      'Palmes souples pour la piscine (entraînement)',
      "Palmes plus dures pour l'eau naturelle (courants)",
      'Chausson si eau froide',
    ],
    videos: [
      {
        label: 'Bien choisir ses palmes',
        url: 'https://www.youtube.com/embed/ikKRWVigOz8?si=_pA-JXsZ7s0k7vE5',
      },
    ],
  },
] as {
  title: string
  img: string
  desc: string
  points: string[]
  videos: { label: string; url: string; start?: number }[]
}[]

const tutorials = [
  {
    title: 'Gréer son bloc',
    img: 'https://i.ytimg.com/vi/C_1XvAmCV20/maxresdefault.jpg',
    desc: 'Positionnement du bloc, sangle, raccordement du détendeur, vérifications.',
    actions: [
      {
        label: 'Guide en vidéo ▶',
        run: () =>
          openVideoDialog(
            'https://www.youtube.com/embed/C_1XvAmCV20?si=sj9DpFTEG8pUMJq3',
            6
          ),
      },
      { label: 'Guide écrit', run: openGreerBlocDialog },
    ],
  },
  {
    title: 'Dégréer son bloc',
    img: 'https://i.ytimg.com/vi/bDXVO8kkgj4/maxresdefault.jpg',
    desc: "Ordre des opérations, vidange d'air, sécurisation, transport du bloc.",
    actions: [
      {
        label: 'Guide en vidéo ▶',
        run: () =>
          openVideoDialog(
            'https://www.youtube.com/embed/-ZTXdm8S5PQ?si=-wvsU-rdWu_pnLJ3',
            5
          ),
      },
    ],
  },
  {
    title: 'Checklist sécurité pré-immersion',
    img: 'https://sbc-content.s3.amazonaws.com/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/f/effective-safety-checklist.jpg',
    desc: 'Contrôles du détendeur, pression du bloc, purge du masque, boucles de la stab.',
    actions: [{ label: 'Voir la liste', run: openChecklistDialog }],
  },
]

const features = [
  {
    title: 'Détendeur de plongée : Comment ça marche ?',
    img: 'https://i.ytimg.com/vi/Cd5bagFseME/maxresdefault.jpg',
    desc: "Plonger, c’est respirer librement sous l’eau – et cela ne serait jamais possible sans un détendeur, pièce maîtresse de l'équipement du plongeur sous-marin.",
    url: 'https://www.youtube.com/embed/Cd5bagFseME?si=ufciVIwXL_d8bwIa',
  },
]
</script>
