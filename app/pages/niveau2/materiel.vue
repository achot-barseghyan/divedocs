<template>
  <div class="font-grotesk text-[#e8f1f4] antialiased">
    <UiPageBackground />

    <main class="mx-auto max-w-[1280px] px-8 pb-24">
      <UiPageHero
        eyebrow="Niveau 2"
        title="Matériel"
        subtitle="Au niveau 2, tu gères ta plongée en autonomie jusqu'à 20 m. Quatre équipements deviennent essentiels : l'ordinateur, le gilet stabilisateur, le détendeur et le parachute de palier."
      />

      <UiTipsCallout
        title="Conseils d'achat rapides"
        :tips="tips"
        accent="yellow"
      />

      <!-- Recommended gear: each card opens its fiche -->
      <section class="mt-20">
        <UiSectionHeading>Matériel recommandé pour Niveau 2</UiSectionHeading>
        <div
          class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,420px),1fr))] gap-4"
        >
          <article
            v-for="key in ficheOrder"
            :key="key"
            :class="[
              cardBase,
              cardHover,
              'flex flex-col overflow-hidden focus-within:border-[rgba(127,227,214,0.45)]',
            ]"
          >
            <div class="aspect-[16/10] bg-[#0e2737]">
              <UiImageSlot
                :src="gearImages[key].img"
                :alt="fiches[key].title"
                :placeholder="gearImages[key].placeholder"
              />
            </div>
            <button
              type="button"
              class="flex flex-1 cursor-pointer flex-col gap-[18px] border-0 bg-transparent p-6 text-left text-inherit focus-visible:outline-none"
              @click="openFiche = key"
            >
              <div class="flex flex-col gap-2">
                <span class="font-mono text-[13px] text-[#7fe3d6]">
                  {{ fiches[key].n }}
                </span>
                <h3
                  class="m-0 text-2xl font-semibold tracking-[-0.015em] text-white"
                >
                  {{ fiches[key].title }}
                </h3>
                <p
                  class="m-0 text-base leading-[1.55] text-[#9fb4bd] [text-wrap:pretty]"
                >
                  {{ fiches[key].card }}
                </p>
              </div>
              <span
                class="mt-auto flex items-center justify-between gap-3 rounded-[10px] bg-[#7fe3d6] px-4 py-3.5 text-[15px] font-semibold text-[#05111a]"
              >
                Ouvrir la fiche <span class="text-lg" aria-hidden="true">→</span>
              </span>
            </button>
          </article>
        </div>
      </section>
    </main>

    <ModalsMaterielFicheSheet v-model:fiche="openFiche" />
  </div>
</template>

<script setup lang="ts">
import {
  fiches,
  ficheOrder,
  gearImages,
  tips,
  type FicheKey,
} from '~/data/materielNiveau2'

definePageMeta({ breadcrumb: 'Matériel' })

const openFiche = ref<FicheKey | null>(null)
</script>
