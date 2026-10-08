<template>
  <UiSideDrawer
    v-model:open="visible"
    label="Checklist sécurité pré-immersion"
    :width="760"
  >
    <template #eyebrow>Buddy check · {{ mainDone }} / {{ mainTotal }}</template>
    <template #actions>
      <button type="button" :class="drawerButton" @click="reset">
        Réinitialiser
      </button>
    </template>
    <template #bar>
      <div class="grid grid-cols-5 gap-1.5" aria-hidden="true">
        <div
          v-for="group in groups"
          :key="group.title"
          class="flex flex-col gap-1.5"
        >
          <div
            class="h-1.5 rounded-[3px] transition-colors"
            :class="
              isComplete(group)
                ? 'bg-[#7fe3d6]'
                : doneIn(group) > 0
                  ? 'bg-[rgba(127,227,214,0.4)]'
                  : 'bg-[rgba(232,241,244,0.12)]'
            "
          ></div>
          <span
            class="font-mono text-xs"
            :class="isComplete(group) ? 'text-[#7fe3d6]' : 'text-[#7f97a2]'"
          >
            {{ group.letter }}
          </span>
        </div>
      </div>
    </template>

    <h2
      class="m-0 mb-2 text-[clamp(30px,4vw,42px)] font-bold leading-[1.05] tracking-[-0.025em] text-white [text-wrap:balance]"
    >
      Checklist sécurité pré-immersion
    </h2>
    <div class="mb-6 flex flex-col gap-2">
      <span class="text-[15px] font-semibold text-[#f5d547]">
        Pourquoi cette checklist ?
      </span>
      <p
        class="m-0 text-[17px] leading-[1.6] text-[#d4e2e7] [text-wrap:pretty]"
      >
        Comme un pilote avant le décollage, le
        <strong class="font-semibold text-white">
          contrôle pré-plongée (buddy check)
        </strong>
        assure que tout l'équipement est en place et fonctionne parfaitement.
        L'acronyme
        <strong class="font-semibold tracking-[0.08em] text-[#7fe3d6]">
          AGLLO
        </strong>
        aide à ne rien oublier.
      </p>
    </div>

    <section
      v-for="group in groups"
      :key="group.title"
      class="rounded-[14px] border bg-white/[0.035] px-6 py-[22px] transition-colors"
      :class="
        isComplete(group)
          ? 'border-[rgba(127,227,214,0.45)]'
          : 'border-[rgba(232,241,244,0.09)]'
      "
    >
      <div class="grid grid-cols-[48px_1fr_auto] items-center gap-4">
        <span
          class="grid h-12 w-12 place-items-center rounded-xl border border-[rgba(127,227,214,0.35)] font-mono text-xl font-medium transition-colors"
          :class="
            isComplete(group)
              ? 'bg-[#7fe3d6] text-[#05111a]'
              : 'bg-[rgba(127,227,214,0.08)] text-[#7fe3d6]'
          "
          aria-hidden="true"
        >
          {{ group.letter }}
        </span>
        <div class="flex flex-col gap-0.5">
          <h3 class="m-0 text-[19px] font-semibold text-white">
            {{ group.title }}
          </h3>
          <span class="text-sm text-[#7f97a2]">{{ group.subtitle }}</span>
        </div>
        <span
          class="font-mono text-[13px]"
          :class="isComplete(group) ? 'text-[#7fe3d6]' : 'text-[#7f97a2]'"
        >
          {{ countLabel(group) }}
        </span>
      </div>

      <div v-if="!isLocked(group)" class="mt-4 flex flex-col gap-1">
        <button
          v-for="item in group.items"
          :key="item"
          type="button"
          role="checkbox"
          :aria-checked="isChecked(item)"
          class="-mx-2.5 grid min-h-11 grid-cols-[24px_1fr] items-center gap-3.5 rounded-[10px] bg-transparent px-2.5 py-2 text-left transition-colors hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7fe3d6]"
          @click="toggle(item)"
        >
          <span
            class="grid h-6 w-6 place-items-center rounded-[7px] border-[1.5px] text-sm font-bold text-[#05111a] transition-colors"
            :class="
              isChecked(item)
                ? 'border-[#7fe3d6] bg-[#7fe3d6]'
                : 'border-[rgba(232,241,244,0.3)] bg-transparent'
            "
            aria-hidden="true"
          >
            {{ isChecked(item) ? '✓' : '' }}
          </span>
          <span
            class="text-base leading-[1.45]"
            :class="isChecked(item) ? 'text-[#7f97a2]' : 'text-[#d4e2e7]'"
          >
            <template v-for="(part, i) in parts(item)" :key="i">
              <strong
                v-if="i % 2"
                class="font-semibold"
                :class="isChecked(item) ? 'text-[#9fb4bd]' : 'text-white'"
              >
                {{ part }}
              </strong>
              <template v-else>{{ part }}</template>
            </template>
          </span>
        </button>
      </div>
    </section>

    <section
      class="mt-3 flex flex-col gap-2 rounded-[14px] border border-[rgba(245,213,71,0.25)] bg-[rgba(245,213,71,0.05)] px-6 py-[22px]"
    >
      <span class="text-base font-semibold text-[#f5d547]">
        Deviendra un automatisme !
      </span>
      <p
        class="m-0 text-[15px] leading-[1.6] text-[#d4e2e7] [text-wrap:pretty]"
      >
        Ces vérifications paraissent longues, mais après quelques plongées, vous
        les effectuerez
        <strong class="font-semibold text-white">
          instinctivement en quelques minutes
        </strong>
        . Mieux vaut multiplier les contrôles pour que la plongée reste toujours
        un plaisir en toute sécurité.
      </p>
    </section>
  </UiSideDrawer>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

interface Group {
  letter: string
  title: string
  subtitle: string
  items: string[]
  final?: boolean
}

// **text** marks the emphasised part of an item
const groups: Group[] = [
  {
    letter: 'A',
    title: 'Air',
    subtitle: 'Vérification de la bouteille et des détendeurs',
    items: [
      'Bouteille **correctement ouverte**',
      'Sangle de sécurité du gilet **bien placée**',
      'Tester les **détendeurs** (principal + secours)',
      'Vérifier la pression: **180-220 bars**',
    ],
  },
  {
    letter: 'G',
    title: 'Gilet stabilisateur (BCD)',
    subtitle: 'Contrôle de la flottabilité',
    items: [
      "Gonfler avec **l'inflator**",
      'Gonfler **à la bouche**',
      'Tester **toutes les purges**',
      'Vérifier le système de contrôle',
    ],
  },
  {
    letter: 'L',
    title: 'Lestage',
    subtitle: 'Poids et équilibre',
    items: [
      'Vérifier la **présence du lestage**',
      'Quantité **adaptée au plongeur**',
      'Ceinture ou **poches à plombs**',
      "Ajusté selon l'eau et la combinaison",
    ],
  },
  {
    letter: 'L',
    title: 'Largage / Liens',
    subtitle: 'Sécurité et sangles',
    items: [
      'Ceinture: **ouverture main droite**',
      'Poches à plombs **bien accrochées**',
      'Toutes les **boucles serrées**',
      'Sangles du gilet **ajustées**',
    ],
  },
  {
    letter: 'O',
    title: 'OK Final',
    subtitle: 'Dernier contrôle avant la plongée',
    final: true,
    items: [
      '**Masque et palmes** en place',
      '**Ordinateur de plongée** fonctionnel',
      'Accessoires attachés (**lampe, compas**)',
      '**Marqueur de surface** présent',
    ],
  },
]

const visible = ref(false)
const checked = ref<string[]>([])

const mainGroups = groups.filter((g) => !g.final)
const mainTotal = mainGroups.reduce((n, g) => n + g.items.length, 0)

const isChecked = (item: string) => checked.value.includes(item)
const toggle = (item: string) => {
  checked.value = isChecked(item)
    ? checked.value.filter((i) => i !== item)
    : [...checked.value, item]
}

const doneIn = (group: Group) => group.items.filter(isChecked).length
const isComplete = (group: Group) => doneIn(group) === group.items.length

const mainDone = computed(() => mainGroups.reduce((n, g) => n + doneIn(g), 0))
// The final check unlocks once every A-G-L-L item is ticked
const isLocked = (group: Group) => !!group.final && mainDone.value < mainTotal

const countLabel = (group: Group) => {
  if (isLocked(group)) return `${mainTotal - mainDone.value} restants`
  if (group.final && isComplete(group)) return 'Prêt ✓'
  return `${doneIn(group)} / ${group.items.length}`
}

const parts = (item: string) => item.split(/\*\*(.+?)\*\*/)

const reset = () => {
  checked.value = []
}

const open = () => {
  visible.value = true
}

defineExpose({
  visible,
  open,
})
</script>
