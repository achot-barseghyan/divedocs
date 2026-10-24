<template>
  <div
    class="ml-auto max-w-[380px] rounded-[34px] border border-[rgba(232,241,244,0.14)] bg-[linear-gradient(160deg,#1a2f3c,#0b1720)] p-[22px] shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
  >
    <div
      class="grid grid-cols-2 gap-3.5 rounded-[20px] border border-[rgba(127,227,214,0.2)] bg-[#050c11] p-5 font-mono"
    >
      <div :class="box(0)">
        <span :class="label">1 · PROFONDEUR</span>
        <span class="text-[52px] leading-none text-white">
          {{ screen.depth }}<span class="text-lg text-[#7f97a2]"> m</span>
        </span>
      </div>
      <div :class="box(1)">
        <span :class="label">2 · DURÉE</span>
        <span class="text-[28px] text-[#e8f1f4]">{{ screen.time }}'</span>
      </div>
      <div :class="box(2)">
        <span :class="label">3 · SANS PALIER</span>
        <span class="text-[28px] text-[#7fe3d6]">{{ screen.ndl }}'</span>
      </div>
      <div :class="box(3)">
        <span :class="label">4 · PROF. MAX</span>
        <span class="text-xl text-[#e8f1f4]">{{ screen.max }} m</span>
      </div>
      <div :class="box(4)">
        <span :class="label">5 · REMONTÉE</span>
        <div class="flex gap-1">
          <span
            v-for="i in 4"
            :key="i"
            class="h-2.5 w-[34px] rounded-[3px]"
            :class="barClass(i - 1)"
          ></span>
        </div>
      </div>
    </div>
    <div
      class="flex justify-between px-[18px] pt-3.5 font-mono text-[11px] text-[#7f97a2]"
    >
      <span>SIMULATION</span><span>{{ screen.phase }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// Simulated dive computer screen; `selected` highlights one of the 5 readouts
const props = defineProps<{ selected: number }>()

const label = 'text-[11px] tracking-[0.1em] text-[#7f97a2]'

const t = ref(0)
let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => (timer = setInterval(() => t.value++, 1000)))
onBeforeUnmount(() => clearInterval(timer))

// 40 s loop: descent, bottom, ascent with safety stop
const screen = computed(() => {
  const ph = t.value % 40
  let depth: number
  let phase: string
  if (ph < 8) {
    depth = ph * 2.25
    phase = 'DESCENTE'
  } else if (ph < 28) {
    depth = 18 - (ph - 8) * 0.2 + Math.sin(ph) * 0.3
    phase = 'AU FOND'
  } else {
    depth = Math.max(0, 14 - (ph - 28) * (14 / 12))
    phase = depth < 5 && depth > 2.5 ? 'PALIER' : 'REMONTÉE'
  }
  return {
    depth: depth.toFixed(1),
    time: 10 + Math.floor(ph * 0.8),
    ndl: Math.max(6, 48 - Math.floor(ph * 0.9)),
    max: (ph < 8 ? depth : 18).toFixed(1),
    phase,
    asc: ph >= 28 ? (ph % 6 < 3 ? 2 : 3) : 0,
  }
})

const box = (i: number) => [
  'flex flex-col gap-1.5 rounded-xl border-[1.5px] p-2.5 transition-[border-color,background-color] duration-300',
  i === 0 || i === 4 ? 'col-span-2' : '',
  props.selected === i
    ? 'fiche-glow border-[#f5d547] bg-[rgba(245,213,71,0.06)]'
    : 'border-transparent',
]

const barClass = (i: number) => {
  if (i >= screen.value.asc) return 'bg-[rgba(232,241,244,0.12)]'
  return i >= 2 ? 'fiche-blink bg-[#ff7a6b]' : 'bg-[#7fe3d6]'
}
</script>
