<template>
  <ModalsMaterielFicheTryIt title="Trouver l'équilibre">
    <p class="m-0 text-base leading-[1.6] text-[#9fb4bd] [text-wrap:pretty]">
      Ajoute ou retire de l'air jusqu'à rester stable entre deux eaux. Sous
      l'eau, procède toujours par petites touches et attends quelques secondes
      avant de corriger.
    </p>
    <div class="flex flex-wrap gap-2.5">
      <button
        type="button"
        :class="[primaryButton, 'h-12 px-5 text-[15px]']"
        @click="air = Math.min(6, air + 1)"
      >
        + Gonfler
      </button>
      <button
        type="button"
        :class="[secondaryButton, 'h-12 px-5 text-[15px] font-semibold']"
        @click="air = Math.max(0, air - 1)"
      >
        − Purger
      </button>
    </div>

    <template #visual>
      <div class="grid grid-cols-[44px_1fr] items-stretch gap-4">
        <div
          class="relative h-[260px] overflow-hidden rounded-xl bg-[rgba(232,241,244,0.06)]"
        >
          <div
            class="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,#7fe3d6,rgba(127,227,214,0.4))] transition-[height] duration-500 ease-[cubic-bezier(.2,.8,.2,1)]"
            :style="{ height: (air / 6) * 100 + '%' }"
          ></div>
          <span
            class="absolute inset-x-0 top-2 text-center font-mono text-[11px] text-[#e8f1f4]"
          >
            AIR
          </span>
        </div>
        <div
          class="relative h-[260px] overflow-hidden rounded-xl bg-[linear-gradient(180deg,#1b6f86_0%,#0d3a50_50%,#061620_100%)]"
        >
          <div
            class="absolute inset-x-0 top-0 h-0.5 bg-[#7fe3d6] opacity-70"
          ></div>
          <div
            class="fiche-sway absolute left-1/2 flex flex-col items-center gap-1.5 transition-[top] duration-[1100ms] ease-[cubic-bezier(.3,.7,.2,1)]"
            :style="{ top: 82 - air * 12.5 + '%' }"
          >
            <span :class="diverDot"></span>
            <span
              class="whitespace-nowrap font-mono text-[11px] text-white"
            >
              TOI
            </span>
          </div>
          <span
            class="absolute bottom-2.5 left-3 rounded-lg bg-[rgba(5,17,26,0.8)] px-2.5 py-1.5 text-sm font-semibold"
            :class="status.color"
          >
            {{ status.label }}
          </span>
        </div>
      </div>
    </template>
  </ModalsMaterielFicheTryIt>
</template>

<script setup lang="ts">
const diverDot =
  'h-[30px] w-[30px] rounded-full border-[3px] border-[#05111a] bg-[#f5d547] shadow-[0_0_0_2px_#f5d547]'

// 0-6 units of air, 3 = neutral buoyancy
const air = ref(1)

const status = computed(() => {
  if (air.value < 3) return { label: 'Tu coules', color: 'text-[#ff7a6b]' }
  if (air.value === 3) return { label: 'Équilibré', color: 'text-[#7fe3d6]' }
  return { label: 'Tu remontes', color: 'text-[#f5d547]' }
})
</script>
