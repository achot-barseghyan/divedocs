<template #MenuCard="{ title, desc, icon, link, isDevBanner }">
  <NuxtLink
    :to="link || '#'"
    ref="cardRef"
    class="group cursor-pointer rounded-xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-sm transition duration-300 hover:bg-white/20"
  >
    <div
      v-if="isDevBanner"
      class="mb-4 w-full rounded-md bg-red-600/80 py-1 text-center text-sm font-semibold text-white"
    >
      En développement
    </div>

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

interface Props {
  title: string
  desc: string
  icon: string
  link?: string
  isDevBanner?: boolean
}
defineProps<Props>()
</script>
