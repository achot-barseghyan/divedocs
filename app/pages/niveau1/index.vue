<template>
  <div class="relative min-h-full w-full">
    <div
      class="relative z-10 flex h-screen w-full flex-col items-center px-6 py-20"
    >
      <h1
        class="mb-14 text-center text-4xl font-black tracking-wide text-yellow-500 md:text-6xl"
      >
        Niveau 1
      </h1>

      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <UiMenuCard
          title="Manuel de Formation Technique Niveau 1"
          desc="Documents officiels, compétences, protocoles"
          icon="solar:book-bold"
          link="/niveau1/manuel"
        />
        <UiMenuCard
          title="Théorie"
          desc="Pression, flottabilité, accidents, prévention"
          icon="streamline-plump:class-lesson-solid"
          link="/niveau1/theorie"
        />
        <UiMenuCard
          title="Matériel"
          desc="Équipement, entretien, choix du matériel"
          icon="tabler:scuba-diving-tank-filled"
          link="/niveau1/materiel"
        />
        <UiMenuCard
          title="Les signes"
          desc="Voir les signes de plongée"
          icon="streamline-plump:ok-hand-solid"
          link="/niveau1/signes"
        />
        <UiMenuCard
          title="Exercices pratiques"
          desc="Vidage de masque, lâcher-reprise, remontées, palmage"
          icon="game-icons:scuba-mask"
          link="/niveau1/exercices"
        />
        <UiMenuCard
          title="Sécurité"
          desc="Procédures, signaux, planification"
          icon=""
          isDevBanner
        />
        <UiMenuCard
          title="Révisions & Quiz"
          desc="Test, vocabulaire, validation connaissances"
          icon=""
          isDevBanner
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'

onMounted(() => {
  // Title animation
  gsap.from('h1', {
    opacity: 0,
    y: -30,
    duration: 1,
    ease: 'power3.out',
  })
})
</script>
