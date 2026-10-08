<template>
  <section
    class="rounded-2xl border p-7"
    :class="
      accent === 'yellow'
        ? 'border-[rgba(245,213,71,0.25)] bg-[rgba(245,213,71,0.05)]'
        : 'border-[rgba(127,227,214,0.3)] bg-[rgba(127,227,214,0.06)]'
    "
  >
    <h2
      class="mb-5 font-mono text-[13px] font-medium uppercase tracking-[0.12em]"
      :class="accentText"
    >
      {{ title }}
    </h2>
    <ol
      class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-6"
    >
      <li
        v-for="(tip, i) in tips"
        :key="i"
        class="grid grid-cols-[28px_1fr] gap-3"
      >
        <span class="pt-0.5 font-mono text-[13px]" :class="accentText">
          {{ String(i + 1).padStart(2, '0') }}
        </span>
        <p
          class="m-0 text-base leading-[1.55] text-[#d4e2e7] [text-wrap:pretty]"
        >
          {{ tip }}
        </p>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  tips: string[]
  accent: 'yellow' | 'aqua'
}>()

const accentText = computed(() =>
  props.accent === 'yellow' ? 'text-[#f5d547]' : 'text-[#7fe3d6]'
)
</script>
