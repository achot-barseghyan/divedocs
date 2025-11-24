<template #MenuCard="{ title, desc, icon, link }">
  <NuxtLink
    :to="link || '#'"
    ref="cardRef"
    class="group cursor-pointer rounded-xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-sm transition duration-300 hover:bg-white/20"
  >
    <div class="flex flex-col items-center space-y-4 text-center">
      <div class="text-5xl opacity-80 transition group-hover:opacity-100">
        <i :class="`pi pi-${icon}`" style="color: white"></i>
      </div>
      <h2 class="text-2xl font-bold tracking-wide text-teal-600">
        {{ title }}
      </h2>
      <p class="text-gray-300">
        {{ desc }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue'
import { gsap } from 'gsap'

interface Props {
  title: string
  desc: string
  icon: string
  link?: string
}
defineProps<Props>()

const cardRef = ref(null)

onMounted(() => {
  const el = cardRef.value?.$el || cardRef.value

  gsap.from(el, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
  })

  gsap.to(el, {
    y: '+=5',
    repeat: -1,
    yoyo: true,
    duration: 4,
    ease: 'sine.inOut',
  })
})
</script>

<style scoped></style>
