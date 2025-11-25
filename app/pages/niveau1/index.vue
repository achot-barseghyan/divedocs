<template>
  <div class="relative min-h-full w-full">
    <img
      src="/img/bg.webp"
      class="fixed inset-0 h-full w-full object-cover object-center"
      alt="underwater background"
    />
    <div
      class="fixed inset-0 bg-gradient-to-b from-[#001a23]/60 to-[#001a23]/90"
    ></div>

    <div
      class="relative z-10 flex h-screen w-full flex-col items-center px-6 py-20 pt-[10rem]"
    >
      <div class="mb-10 mr-auto">
        <CommonGoBack useRouter />
      </div>
      <h1
        class="mb-14 text-center text-4xl font-black tracking-wide text-yellow-500 md:text-6xl"
      >
        Niveau 1
      </h1>

      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <UiMenuCard
          title="Manuel de Formation Technique Niveau 1"
          desc="Documents officiels, compétences, protocoles"
          icon="book"
          link="/niveau1/manuel"
        />
        <UiMenuCard
          title="Théorie"
          desc="Pression, flottabilité, accidents, prévention"
          icon="graduation-cap"
          link="/niveau1/theorie"
        />
        <UiMenuCard
          title="Matériel"
          desc="Équipement, entretien, choix du matériel"
          icon="inbox"
          link="/niveau1/materiel"
        />
        <UiMenuCard
          title="Exercices"
          desc="Entraînements, signes, préparation physique"
          icon="dumbbell"
          isDevBanner
        />
        <UiMenuCard
          title="Sécurité"
          desc="Procédures, signaux, planification"
          icon="shield"
          isDevBanner
        />
        <UiMenuCard
          title="Révisions & Quiz"
          desc="Test, vocabulaire, validation connaissances"
          icon="clipboard-check"
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

  // Cards stagger entrance
  gsap.from('.menu-card', {
    opacity: 0,
    y: 40,
    duration: 0.9,
    stagger: 0.15,
    ease: 'power3.out',
  })

  // Continuous underwater floating effect
  gsap.to('.menu-card', {
    y: '+=10',
    repeat: -1,
    yoyo: true,
    duration: 4,
    ease: 'sine.inOut',
  })
})
</script>
