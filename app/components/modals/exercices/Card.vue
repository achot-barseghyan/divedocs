<template>
  <Card
    class="border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:transform"
  >
    <template #content>
      <div class="mb-4 flex items-start gap-4">
        <div
          class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-b from-[#0b6470] to-[#04363a]"
        >
          <img
            :src="imageSrc"
            :alt="title"
            class="h-full w-full object-cover opacity-95"
          />
        </div>
        <div class="flex-1">
          <h4 class="mb-2 text-xl font-semibold">{{ title }}</h4>
          <p class="mb-3 text-sm text-gray-400">
            {{ description }}
          </p>
        </div>
      </div>
      <ul class="mb-4 space-y-1 pl-4 text-sm text-gray-400">
        <li
          v-for="(feature, index) in features"
          :key="index"
          class="flex items-start gap-2"
        >
          <i class="pi pi-check mt-1 text-teal-400"></i>
          <span>{{ feature }}</span>
        </li>
      </ul>
    </template>
    <template #footer>
      <div class="flex flex-col gap-2">
        <slot />
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
interface Props {
  title: string
  description: string
  imageSrc: string
  features: string[]
}

defineProps<Props>()
</script>

<style></style>
