<template>
  <section
    class="flex max-w-[860px] flex-col gap-5"
    :class="size === 'sm' ? 'pb-10 pt-14' : 'pb-12 pt-16'"
  >
    <div
      class="font-mono text-[13px] uppercase tracking-[0.12em] text-[#f5d547]"
    >
      {{ eyebrow }}
    </div>
    <h1
      class="m-0 font-bold tracking-[-0.035em] text-white [text-wrap:balance]"
      :class="titleClass"
    >
      {{ title }}
    </h1>
    <p
      v-if="subtitle"
      class="m-0 max-w-[760px] text-[19px] leading-[1.55] text-[#b7c9d1]"
    >
      {{ subtitle }}
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    subtitle?: string
    // lg: short one-word titles, md: longer titles, sm: Simulateur
    size?: 'lg' | 'md' | 'sm'
  }>(),
  { eyebrow: 'Niveau 1', subtitle: '', size: 'lg' }
)

const titleClass = computed(
  () =>
    ({
      lg: 'text-[clamp(52px,8vw,104px)] leading-[0.92]',
      md: 'text-[clamp(48px,7.5vw,96px)] leading-[0.95]',
      sm: 'text-[clamp(44px,7vw,88px)] leading-[0.95]',
    })[props.size]
)
</script>
