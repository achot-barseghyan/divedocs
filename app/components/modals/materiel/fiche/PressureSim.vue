<template>
  <ModalsMaterielFicheTryIt title="Suis la pression">
    <p class="m-0 text-base leading-[1.6] text-[#9fb4bd] [text-wrap:pretty]">
      Choisis une profondeur et regarde comment la pression de l'air baisse à
      chaque étage, de la bouteille jusqu'à ta bouche.
    </p>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="v in [0, 10, 20]"
        :key="v"
        type="button"
        :class="[
          v === depth ? primaryButton : secondaryButton,
          'h-12 px-5 text-[15px] font-semibold',
        ]"
        :aria-pressed="v === depth"
        @click="depth = v"
      >
        {{ v === 0 ? 'Surface' : v + ' m' }}
      </button>
    </div>

    <template #visual>
      <div class="flex flex-col gap-2 font-mono">
        <div
          :class="stage"
          class="border-[rgba(255,122,107,0.35)] bg-[rgba(255,122,107,0.08)]"
        >
          <span class="text-[13px] text-[#d4e2e7]">BOUTEILLE · HP</span>
          <span class="text-2xl text-[#ff7a6b]">200 bar</span>
        </div>
        <span class="pl-[18px] text-xs text-[#7f97a2]">↓ 1er étage</span>
        <div
          :class="stage"
          class="border-[rgba(245,213,71,0.3)] bg-[rgba(245,213,71,0.07)]"
        >
          <span class="text-[13px] text-[#d4e2e7]">FLEXIBLES · MP</span>
          <span class="text-2xl text-[#f5d547]">≈ {{ amb + 9 }} bar</span>
        </div>
        <span class="pl-[18px] text-xs text-[#7f97a2]">↓ 2e étage</span>
        <div
          :class="stage"
          class="border-[rgba(127,227,214,0.35)] bg-[rgba(127,227,214,0.08)]"
        >
          <span class="text-[13px] text-[#d4e2e7]">TA BOUCHE · AMBIANTE</span>
          <span class="text-2xl text-[#7fe3d6]">{{ amb }} bar</span>
        </div>
        <p
          class="m-0 mt-2 font-grotesk text-[15px] leading-[1.55] text-[#d4e2e7]"
          aria-live="polite"
        >
          {{ note }}
        </p>
      </div>
    </template>
  </ModalsMaterielFicheTryIt>
</template>

<script setup lang="ts">
const stage =
  'flex items-center justify-between gap-3 rounded-[14px] border px-[18px] py-4'

const depth = ref(0)
const amb = computed(() => 1 + depth.value / 10)

const note = computed(() =>
  depth.value === 0
    ? "En surface, l'air arrive dans ta bouche à 1 bar."
    : `À ${depth.value} m, l'air arrive à ${amb.value} bar : chaque inspiration consomme ${amb.value} fois plus d'air qu'en surface.`
)
</script>
