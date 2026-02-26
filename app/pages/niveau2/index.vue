<template>
  <div class="relative min-h-full w-full">
    <div
      class="relative z-10 flex h-screen w-full flex-col items-center px-6 py-20"
    >
      <h1
        class="mb-14 text-center text-4xl font-black tracking-wide text-yellow-500 md:text-6xl"
      >
        Niveau 2
      </h1>

      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <UiMenuCard
          title="Théorie"
          desc="Cours théoriques, recherche, ouverture des modules et export PDF"
          icon="streamline-plump:class-lesson-solid"
          link="/niveau2/theorie"
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

<style></style>
