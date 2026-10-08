<template>
  <!-- Plain v-if/v-else: <component :is="'button'"> would resolve to PrimeVue's global Button -->
  <NuxtLink v-if="to" :to="to" :class="cardClass">
    <div class="flex w-full items-center justify-between">
      <span class="font-mono text-[13px] text-[#7fe3d6]">{{ n }}</span>
      <span class="text-lg text-[#7f97a2]" aria-hidden="true">→</span>
    </div>
    <div class="mt-auto flex flex-col gap-2">
      <h3 :class="titleClass">{{ title }}</h3>
      <p :class="descClass">{{ desc }}</p>
    </div>
  </NuxtLink>
  <button v-else type="button" :class="cardClass">
    <div class="flex w-full items-center justify-between">
      <span class="font-mono text-[13px] text-[#7fe3d6]">{{ n }}</span>
      <span class="text-lg text-[#7f97a2]" aria-hidden="true">→</span>
    </div>
    <div class="mt-auto flex flex-col gap-2">
      <h3 :class="titleClass">{{ title }}</h3>
      <p :class="descClass">{{ desc }}</p>
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  n: string
  title: string
  desc: string
  to?: string
}>()

const cardClass =
  'flex min-h-[200px] w-full flex-col gap-3 rounded-[14px] border border-[rgba(232,241,244,0.09)] bg-white/[0.035] p-6 text-left text-[#e8f1f4] transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[rgba(127,227,214,0.45)] hover:bg-[rgba(127,227,214,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fe3d6]'
const titleClass =
  'm-0 text-[22px] font-semibold leading-[1.2] tracking-[-0.01em] text-white [text-wrap:pretty]'
const descClass =
  'm-0 text-[15px] leading-normal text-[#9fb4bd] [text-wrap:pretty]'
</script>
