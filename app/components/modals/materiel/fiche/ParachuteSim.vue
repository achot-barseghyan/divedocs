<template>
  <ModalsMaterielFicheTryIt title="Lance ton parachute">
    <ol class="m-0 flex list-none flex-col gap-1.5 p-0">
      <li
        v-for="(text, i) in steps"
        :key="i"
        class="grid grid-cols-[28px_1fr] items-center gap-2.5 rounded-[10px] px-3 py-2 transition-all duration-300"
        :class="
          i === step
            ? 'bg-[#7fe3d6] text-[#05111a]'
            : i < step
              ? 'bg-[rgba(127,227,214,0.25)] text-[#05111a]'
              : 'bg-transparent text-[#d4e2e7]'
        "
      >
        <span
          class="font-mono text-[13px]"
          :class="i <= step ? 'text-[#05111a]' : 'text-[#7fe3d6]'"
        >
          {{ pad2(i + 1) }}
        </span>
        <span class="text-[15px] leading-normal">{{ text }}</span>
      </li>
    </ol>
    <div class="flex flex-wrap gap-2.5">
      <button
        type="button"
        :class="[primaryButton, 'h-12 px-5 text-[15px]']"
        @click="step = (step + 1) % steps.length"
      >
        {{ step === steps.length - 1 ? 'Recommencer' : 'Étape suivante →' }}
      </button>
    </div>

    <template #visual>
      <div
        class="relative h-[300px] overflow-hidden rounded-xl bg-[linear-gradient(180deg,#1b6f86_0%,#0d3a50_50%,#061620_100%)]"
      >
        <div
          class="absolute inset-x-0 top-[18%] h-0.5 bg-[#7fe3d6] opacity-70"
        ></div>
        <span
          class="absolute right-3 top-[calc(18%-22px)] font-mono text-[11px] text-[#bfeee8]"
        >
          SURFACE
        </span>
        <!-- line -->
        <div
          class="absolute left-[30%] w-0.5 bg-[rgba(245,213,71,0.7)] transition-all duration-[1400ms] ease-[cubic-bezier(.3,.7,.2,1)]"
          :style="{ top: launched ? '18%' : '79%', height: lineH }"
        ></div>
        <!-- tube -->
        <div
          class="absolute left-[30%] w-[22px] -translate-x-1/2 -translate-y-full rounded-[11px_11px_4px_4px] bg-[#ff7a6b] transition-all duration-[1400ms] ease-[cubic-bezier(.3,.7,.2,1)]"
          :style="{
            top: launched ? '18%' : '79%',
            height: step >= 2 ? '56px' : '10px',
          }"
        ></div>
        <!-- diver -->
        <div
          class="absolute left-[30%] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 transition-[top] duration-[1600ms] ease-[cubic-bezier(.3,.7,.2,1)]"
          :style="{ top: atStop ? '38%' : '82%' }"
        >
          <span
            class="h-[26px] w-[26px] rounded-full border-[3px] border-[#05111a] bg-[#f5d547] shadow-[0_0_0_2px_#f5d547]"
          ></span>
          <span class="whitespace-nowrap font-mono text-[11px] text-white">
            TOI · {{ atStop ? '5 m' : '20 m' }}
          </span>
        </div>
        <span
          class="absolute bottom-2.5 left-3 rounded-lg bg-[rgba(5,17,26,0.8)] px-2.5 py-1.5 text-sm font-semibold"
          :class="launched ? 'text-[#7fe3d6]' : 'text-[#ff7a6b]'"
        >
          {{ launched ? 'Bateau prévenu' : 'Invisible en surface' }}
        </span>
      </div>
    </template>
  </ModalsMaterielFicheTryIt>
</template>

<script setup lang="ts">
const steps = [
  'Préviens ton binôme et stabilise-toi.',
  "Déroule un peu de fil et vérifie qu'il est libre.",
  'Gonfle le tube avec ton octopus.',
  'Lâche-le : le fil se déroule, tiens le dévidoir.',
  'Remonte en rembobinant, puis tiens ton palier.',
]

const step = ref(0)
const launched = computed(() => step.value >= 3)
const atStop = computed(() => step.value === 4)
const lineH = computed(() =>
  launched.value ? (atStop.value ? '20%' : '64%') : '0%'
)
</script>
