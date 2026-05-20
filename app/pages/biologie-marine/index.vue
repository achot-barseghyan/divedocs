<template>
  <div class="relative min-h-full w-full">
    <div
      class="relative z-10 flex h-screen w-full flex-col items-center px-6 py-20"
    >
      <h1
        class="mb-4 text-center text-4xl font-black tracking-wide text-yellow-500 md:text-6xl"
      >
        Biologie Marine
      </h1>
      <p class="mb-14 text-center text-lg text-teal-300">
        Découvrez les espèces marines de nos sites de plongée
      </p>

      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <UiMenuCard
          title="Mer Méditerranée"
          desc="177 espèces répertoriées — poissons, céphalopodes et élasmobranches des eaux méditerranéennes"
          icon="mdi:fish"
          link="/biologie-marine/mer-mediterranee"
        />
        <UiMenuCard
          title="Océan Atlantique"
          desc="Espèces de l'Atlantique Nord-Est — à venir"
          icon="ph:waves-bold"
          link="#"
          :isDevBanner="true"
        />
        <UiMenuCard
          title="Mer Rouge"
          desc="Faune tropicale de la mer Rouge — à venir"
          icon="mdi:coral"
          link="#"
          :isDevBanner="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'

onMounted(() => {
  gsap.from('h1', {
    opacity: 0,
    y: -30,
    duration: 1,
    ease: 'power3.out',
  })
})
</script>
