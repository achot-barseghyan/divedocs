<template>
  <button
    type="button"
    class="grid min-h-[60px] grid-cols-[36px_1fr_20px] items-center gap-4 rounded-xl border px-[18px] py-3 text-left transition-colors"
    :class="rowClass"
    :disabled="state !== 'idle'"
    @click="emit('pick')"
  >
    <span
      class="grid h-9 w-9 place-items-center rounded-[10px] font-mono text-[15px]"
      :class="letterClass"
    >
      {{ letter }}
    </span>
    <span class="text-[17px] leading-[1.45]">{{ text }}</span>
    <span
      class="text-base font-bold"
      :class="state === 'correct' ? 'text-[#7fe3d6]' : 'text-[#ff8f80]'"
      aria-hidden="true"
    >
      {{ state === 'correct' ? '✓' : state === 'wrong' ? '✕' : '' }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// idle: not answered yet; correct: the right answer; wrong: the user's wrong pick; dim: any other answer
const props = defineProps<{
  letter: string
  text: string
  state: 'idle' | 'correct' | 'wrong' | 'dim'
}>()

const emit = defineEmits<{ pick: [] }>()

const rowClass = computed(
  () =>
    ({
      idle: 'cursor-pointer border-[rgba(232,241,244,0.12)] bg-white/[0.03] text-[#e8f1f4] hover:border-[rgba(127,227,214,0.45)] hover:bg-[rgba(127,227,214,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7fe3d6]',
      correct:
        'cursor-default border-[rgba(127,227,214,0.55)] bg-[rgba(127,227,214,0.1)] text-[#e8f1f4]',
      wrong:
        'cursor-default border-[rgba(255,143,128,0.5)] bg-[rgba(255,143,128,0.08)] text-[#e8f1f4]',
      dim: 'cursor-default border-[rgba(232,241,244,0.12)] bg-white/[0.03] text-[#7f97a2] opacity-60',
    })[props.state]
)

const letterClass = computed(
  () =>
    ({
      idle: 'bg-white/[0.06] text-[#b7c9d1]',
      correct: 'bg-[#7fe3d6] text-[#05111a]',
      wrong: 'bg-[#ff8f80] text-[#05111a]',
      dim: 'bg-white/[0.06] text-[#b7c9d1]',
    })[props.state]
)
</script>
