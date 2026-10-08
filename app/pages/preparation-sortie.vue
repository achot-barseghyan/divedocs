<template>
  <div class="font-grotesk text-[#e8f1f4] antialiased">
    <UiPageBackground />

    <main class="mx-auto max-w-[1280px] px-8 pb-24">
      <UiPageHero
        eyebrow="Checklist"
        title="Préparation sortie"
        subtitle="Checklist complète pour ne rien oublier avant de partir plonger."
        size="md"
      />

      <div class="flex flex-wrap items-start gap-8">
        <!-- Sidebar: profile + progress -->
        <aside
          class="flex max-w-[260px] flex-[1_1_220px] flex-col gap-3 md:sticky md:top-24"
        >
          <div
            class="grid grid-cols-2 gap-0.5 rounded-[10px] border border-white/[0.08] bg-white/5 p-[3px]"
            role="tablist"
            aria-label="Profil de checklist"
          >
            <button
              v-for="profile in profiles"
              :key="profile.id"
              type="button"
              role="tab"
              :aria-selected="activeProfile === profile.id"
              class="rounded-[7px] px-3 py-2 text-sm transition-colors"
              :class="
                activeProfile === profile.id
                  ? 'bg-[#7fe3d6] font-semibold text-[#05111a]'
                  : 'font-medium text-[#b7c9d1] hover:bg-white/[0.06] hover:text-white'
              "
              @click="switchProfile(profile.id)"
            >
              {{ profile.label }}
            </button>
          </div>

          <section :class="[cardBase, 'flex flex-col gap-4 p-[18px]']">
            <span
              class="font-mono text-[11px] uppercase tracking-[0.12em] text-[#7f97a2]"
            >
              Progression
            </span>
            <div class="flex items-baseline gap-1.5">
              <span
                class="text-5xl font-bold leading-none tracking-[-0.03em]"
                :class="allDone ? 'text-[#7fe3d6]' : 'text-white'"
              >
                {{ checkedCount }}
              </span>
              <span class="text-lg font-semibold text-[#7f97a2]">
                / {{ totalCount }}
              </span>
            </div>
            <div
              class="h-1.5 overflow-hidden rounded-full bg-[rgba(232,241,244,0.12)]"
              role="progressbar"
              :aria-valuenow="progressPercent"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                class="h-full rounded-full bg-[#7fe3d6] transition-[width] duration-300"
                :style="{ width: progressPercent + '%' }"
              ></div>
            </div>

            <ul
              class="m-0 flex list-none flex-col gap-2.5 border-t border-[rgba(232,241,244,0.08)] p-0 pt-4"
            >
              <li
                v-for="group in bagGroups"
                :key="group.title"
                class="flex items-start justify-between gap-3 text-[13px] font-medium leading-snug"
                :class="groupDone(group) ? 'text-[#7fe3d6]' : 'text-[#d4e2e7]'"
              >
                <span>{{ group.title }}</span>
                <span
                  class="shrink-0 font-mono text-[11px]"
                  :class="
                    groupDone(group) ? 'text-[#7fe3d6]' : 'text-[#7f97a2]'
                  "
                >
                  {{ doneIn(group) }} / {{ group.items.length }}
                </span>
              </li>
            </ul>

            <div
              class="grid grid-cols-2 gap-2 border-t border-[rgba(232,241,244,0.08)] pt-4"
            >
              <button
                type="button"
                :class="[secondaryButton, 'h-8 px-2.5 text-xs']"
                @click="checkAll"
              >
                Tout cocher
              </button>
              <button
                type="button"
                :class="[secondaryButton, 'h-8 px-2.5 text-xs']"
                @click="uncheckAll"
              >
                Tout décocher
              </button>
              <button
                type="button"
                :class="[
                  secondaryButton,
                  'col-span-2 h-8 border-[rgba(255,143,128,0.35)] px-2.5 text-xs text-[#ff8f80] hover:border-[rgba(255,143,128,0.6)] hover:bg-[rgba(255,143,128,0.08)]',
                ]"
                @click="resetAll"
              >
                ↻ Réinitialiser
              </button>
            </div>
          </section>
        </aside>

        <!-- Groups -->
        <div class="flex min-w-0 flex-[999_1_480px] flex-col gap-3">
          <section
            v-if="allDone"
            class="flex items-center gap-4 rounded-[14px] border border-[rgba(127,227,214,0.4)] bg-[rgba(127,227,214,0.07)] px-6 py-5"
            role="status"
          >
            <span
              class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#7fe3d6] font-bold text-[#05111a]"
              aria-hidden="true"
            >
              ✓
            </span>
            <div>
              <h2 class="m-0 text-lg font-semibold text-white">
                Tout est prêt !
              </h2>
              <p class="m-0 text-[15px] text-[#d4e2e7]">
                Bonne plongée et pensez toujours à la sécurité.
              </p>
            </div>
          </section>

          <section
            v-for="(group, g) in bagGroups"
            :key="group.title"
            class="rounded-[14px] border bg-white/[0.035] px-5 py-[18px] transition-colors"
            :class="
              groupDone(group)
                ? 'border-[rgba(127,227,214,0.45)]'
                : 'border-[rgba(232,241,244,0.09)]'
            "
          >
            <div class="flex flex-wrap items-center gap-3">
              <span class="font-mono text-[13px] text-[#7fe3d6]">
                {{ pad2(g + 1) }}
              </span>
              <h2
                class="m-0 flex-1 text-lg font-semibold tracking-[-0.01em] text-white"
              >
                {{ group.title }}
              </h2>
              <span
                class="font-mono text-xs"
                :class="groupDone(group) ? 'text-[#7fe3d6]' : 'text-[#7f97a2]'"
              >
                {{ doneIn(group) }} / {{ group.items.length }}
              </span>
              <button
                type="button"
                :class="[secondaryButton, 'h-7 rounded-lg px-2.5 text-xs']"
                @click="
                  groupDone(group) ? uncheckGroup(group) : checkGroup(group)
                "
              >
                {{ groupDone(group) ? 'Tout décocher' : 'Tout cocher' }}
              </button>
            </div>

            <ul
              class="m-0 mt-3 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,200px),1fr))] gap-x-3 gap-y-1 p-0"
            >
              <li
                v-for="item in group.items"
                :key="item.id"
                class="group/item flex items-center rounded-lg transition-colors hover:bg-white/[0.04]"
              >
                <button
                  type="button"
                  role="checkbox"
                  :aria-checked="item.checked"
                  class="grid min-h-11 flex-1 grid-cols-[20px_1fr] items-center gap-3 rounded-lg px-2 py-1.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7fe3d6]"
                  @click="toggle(item)"
                >
                  <span
                    class="grid h-5 w-5 place-items-center rounded-md border-[1.5px] text-xs font-bold text-[#05111a] transition-colors"
                    :class="
                      item.checked
                        ? 'border-[#7fe3d6] bg-[#7fe3d6]'
                        : 'border-[rgba(232,241,244,0.3)]'
                    "
                    aria-hidden="true"
                  >
                    {{ item.checked ? '✓' : '' }}
                  </span>
                  <span
                    class="break-words text-sm leading-snug transition-colors"
                    :class="
                      item.checked
                        ? 'text-[#7f97a2] line-through'
                        : 'text-[#e8f1f4]'
                    "
                  >
                    {{ item.label }}
                  </span>
                </button>
                <button
                  type="button"
                  class="mr-1 grid h-7 w-7 shrink-0 place-items-center rounded-md text-xs text-[#7f97a2] transition hover:bg-[rgba(255,143,128,0.1)] hover:text-[#ff8f80] focus-visible:opacity-100 sm:opacity-0 sm:group-hover/item:opacity-100"
                  :aria-label="`Supprimer ${item.label}`"
                  title="Supprimer"
                  @click="deleteItem(group, item)"
                >
                  ✕
                </button>
              </li>
            </ul>

            <form
              class="mt-3 flex gap-2 border-t border-[rgba(232,241,244,0.08)] pt-3"
              @submit.prevent="addItem(group)"
            >
              <input
                v-model="newItemLabels[group.title]"
                type="text"
                placeholder="Ajouter un item..."
                :aria-label="`Ajouter un item à ${group.title}`"
                class="h-10 min-w-0 flex-1 rounded-[10px] border border-[rgba(232,241,244,0.12)] bg-[#05111a]/40 px-3 text-sm text-[#e8f1f4] placeholder-[#7f97a2] outline-none transition-colors focus:border-[rgba(127,227,214,0.6)]"
              />
              <button
                type="submit"
                class="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] border border-[rgba(127,227,214,0.35)] bg-[rgba(127,227,214,0.1)] text-lg text-[#7fe3d6] transition-colors hover:bg-[rgba(127,227,214,0.2)] disabled:opacity-40"
                :disabled="!newItemLabels[group.title]?.trim()"
                aria-label="Ajouter"
              >
                +
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'

definePageMeta({ breadcrumb: 'Préparation sortie' })

const confirm = useConfirm()

interface CheckItem {
  id: string
  label: string
  checked: boolean
}

interface BagGroup {
  title: string
  emoji: string
  items: CheckItem[]
}

type ProfileId = 'essentiel' | 'complet'

const profiles = [
  { id: 'essentiel' as ProfileId, label: 'Essentiel', emoji: '⚡' },
  { id: 'complet' as ProfileId, label: 'Complet', emoji: '✅' },
]

const STORAGE_KEYS: Record<ProfileId, string> = {
  essentiel: 'preparation-sortie-essentiel',
  complet: 'preparation-sortie-complet',
}

const PROFILE_KEY = 'preparation-sortie-profile'

const profilesData: Record<ProfileId, BagGroup[]> = {
  essentiel: [
    {
      title: 'Équipement de plongée',
      emoji: '🤿',
      items: [
        { id: 'eq-1', label: 'Masque et tuba', checked: false },
        { id: 'eq-3', label: 'Palmes', checked: false },
        { id: 'eq-4', label: 'Gilet stabilisateur', checked: false },
        { id: 'eq-6', label: 'Combinaison', checked: false },
        {
          id: 'eq-7',
          label: 'Bottillons / chaussons de plongée',
          checked: false,
        },
        { id: 'eq-8', label: 'Ordinateur de plongée', checked: false },
      ],
    },
    {
      title: 'Kit de dépannage',
      emoji: '🔧',
      items: [{ id: 'kit-4', label: 'Masque de secours', checked: false }],
    },
    {
      title: 'Documents',
      emoji: '📋',
      items: [
        {
          id: 'doc-1',
          label: 'Carte(s) de certification / niveau',
          checked: false,
        },
        { id: 'doc-3', label: 'Assurance plongée', checked: false },
        { id: 'doc-2', label: 'Carnet de plongée', checked: false },
      ],
    },
    {
      title: 'Sac étanche (surface / bateau)',
      emoji: '☀️',
      items: [
        {
          id: 'surf-1',
          label: 'Crème solaire respectueuse des récifs',
          checked: false,
        },
        { id: 'surf-2', label: 'Casquette', checked: false },
        { id: 'surf-3', label: 'Gourde', checked: false },
        { id: 'surf-4', label: 'Serviette à séchage rapide', checked: false },
        { id: 'surf-5', label: 'Lunettes de soleil', checked: false },
        {
          id: 'surf-7',
          label: 'Piles / chargeurs de rechange',
          checked: false,
        },
      ],
    },
    {
      title: 'Trousse de premiers secours',
      emoji: '🩹',
      items: [
        {
          id: 'med-1',
          label: 'Médicaments contre le mal des transports',
          checked: false,
        },
        { id: 'med-2', label: 'Aspirine / antidouleur', checked: false },
        { id: 'med-4', label: 'Pansements', checked: false },
      ],
    },
  ],
  complet: [
    {
      title: 'Équipement de plongée',
      emoji: '🤿',
      items: [
        { id: 'eq-1', label: 'Masque et tuba', checked: false },
        {
          id: 'eq-2',
          label: 'Anti-buée respectueux des récifs',
          checked: false,
        },
        { id: 'eq-3', label: 'Palmes et chaussons', checked: false },
        { id: 'eq-4', label: 'Gilet stabilisateur', checked: false },
        { id: 'eq-5', label: 'Maillot de bain', checked: false },
        { id: 'eq-6', label: 'Combinaison', checked: false },
        { id: 'eq-7', label: 'Gants', checked: false },
        {
          id: 'eq-8',
          label: 'Bottillons / chaussons de plongée',
          checked: false,
        },
        { id: 'eq-9', label: 'Outil de coupe', checked: false },
        {
          id: 'eq-10',
          label: 'Montre / ordinateur de plongée',
          checked: false,
        },
        {
          id: 'eq-11',
          label: 'Lampes de plongée / lampes de signalisation',
          checked: false,
        },
        { id: 'eq-12', label: 'Sac étanche', checked: false },
      ],
    },
    {
      title: 'Kit de dépannage',
      emoji: '🔧',
      items: [
        { id: 'kit-1', label: 'Sangles de palmes de rechange', checked: false },
        { id: 'kit-2', label: 'Sangles de masque de rechange', checked: false },
        { id: 'kit-3', label: 'Mousquetons de rechange', checked: false },
        { id: 'kit-4', label: 'Masque de secours', checked: false },
      ],
    },
    {
      title: 'Documents',
      emoji: '📋',
      items: [
        {
          id: 'doc-1',
          label: 'Carte(s) de certification / niveau',
          checked: false,
        },
        { id: 'doc-3', label: 'Assurance plongée', checked: false },
        { id: 'doc-2', label: 'Carnet de plongée', checked: false },
      ],
    },
    {
      title: 'Sac étanche (surface / bateau)',
      emoji: '☀️',
      items: [
        {
          id: 'surf-1',
          label: 'Crème solaire respectueuse des récifs',
          checked: false,
        },
        { id: 'surf-2', label: 'Casquette', checked: false },
        { id: 'surf-3', label: 'Gourde', checked: false },
        { id: 'surf-4', label: 'Serviette à séchage rapide', checked: false },
        { id: 'surf-5', label: 'Lunettes de soleil', checked: false },
        { id: 'surf-6', label: 'Veste coupe-vent', checked: false },
        {
          id: 'surf-7',
          label: 'Piles / chargeurs de rechange',
          checked: false,
        },
        {
          id: 'surf-8',
          label: "Produit contre l'otite du nageur",
          checked: false,
        },
        { id: 'surf-9', label: 'En-cas', checked: false },
      ],
    },
    {
      title: 'Trousse de premiers secours',
      emoji: '🩹',
      items: [
        {
          id: 'med-1',
          label: 'Médicaments contre le mal des transports',
          checked: false,
        },
        { id: 'med-2', label: 'Aspirine / antidouleur', checked: false },
        { id: 'med-3', label: 'Antihistaminique', checked: false },
        { id: 'med-4', label: 'Pansements', checked: false },
        { id: 'med-5', label: 'Masque de poche (RCP)', checked: false },
        { id: 'med-6', label: 'Pince à épiler', checked: false },
        { id: 'med-7', label: 'Gants en nitrile', checked: false },
        { id: 'med-8', label: 'Antiacide', checked: false },
        {
          id: 'med-9',
          label: 'Bande élastique (type Ace Bandage)',
          checked: false,
        },
        { id: 'med-10', label: 'Guide de premiers secours', checked: false },
      ],
    },
  ],
}

const activeProfile = ref<ProfileId>('essentiel')

const bagGroups = reactive<BagGroup[]>([])

function loadProfile(profile: ProfileId) {
  activeProfile.value = profile
  localStorage.setItem(PROFILE_KEY, profile)
  const defaultData = profilesData[profile]
  const saved = localStorage.getItem(STORAGE_KEYS[profile])

  let newGroups: BagGroup[]
  if (saved) {
    try {
      const savedGroups: Array<{ title: string; items: CheckItem[] }> =
        JSON.parse(saved)
      newGroups = defaultData.map((defaultGroup) => {
        const savedGroup = savedGroups.find(
          (sg) => sg.title === defaultGroup.title
        )
        return {
          title: defaultGroup.title,
          emoji: defaultGroup.emoji,
          items: savedGroup
            ? savedGroup.items
            : defaultGroup.items.map((i) => ({ ...i })),
        }
      })
    } catch {
      newGroups = defaultData.map((g) => ({
        title: g.title,
        emoji: g.emoji,
        items: g.items.map((i) => ({ ...i })),
      }))
    }
  } else {
    newGroups = defaultData.map((g) => ({
      title: g.title,
      emoji: g.emoji,
      items: g.items.map((i) => ({ ...i })),
    }))
  }

  bagGroups.splice(0, bagGroups.length, ...newGroups)
}

function switchProfile(profile: ProfileId) {
  if (profile === activeProfile.value) return
  loadProfile(profile)
}

const newItemLabels = reactive<Record<string, string>>({})

const defaultItems = computed(() =>
  Object.fromEntries(
    profilesData[activeProfile.value].map((g) => [
      g.title,
      g.items.map((i) => ({ ...i })),
    ])
  )
)

function addItem(group: BagGroup) {
  const label = newItemLabels[group.title]?.trim()
  if (!label) return
  const id = `custom-${Date.now()}`
  group.items.push({ id, label, checked: false })
  newItemLabels[group.title] = ''
}

function deleteItem(group: BagGroup, item: CheckItem) {
  confirm.require({
    message: `Supprimer "${item.label}" ?`,
    header: "Supprimer l'item",
    icon: 'pi pi-trash',
    acceptLabel: 'Supprimer',
    rejectLabel: 'Annuler',
    acceptClass: 'p-button-danger',
    rejectProps: { severity: 'secondary', outlined: true },
    accept: () => {
      const idx = group.items.indexOf(item)
      if (idx !== -1) group.items.splice(idx, 1)
    },
  })
}

const allItems = computed<CheckItem[]>(() => [
  ...bagGroups.flatMap((g) => g.items),
])

onMounted(() => {
  const savedProfile = localStorage.getItem(PROFILE_KEY) as ProfileId | null
  loadProfile(
    savedProfile && savedProfile in STORAGE_KEYS ? savedProfile : 'essentiel'
  )
})

watch(
  bagGroups,
  (groups) => {
    const data = groups.map((g) => ({ title: g.title, items: g.items }))
    localStorage.setItem(
      STORAGE_KEYS[activeProfile.value],
      JSON.stringify(data)
    )
  },
  { deep: true }
)

const totalCount = computed(() => allItems.value.length)
const checkedCount = computed(
  () => allItems.value.filter((i) => i.checked).length
)
const progressPercent = computed(() =>
  totalCount.value
    ? Math.round((checkedCount.value / totalCount.value) * 100)
    : 0
)
const allDone = computed(
  () => totalCount.value > 0 && checkedCount.value === totalCount.value
)

const doneIn = (group: BagGroup) => group.items.filter((i) => i.checked).length
const groupDone = (group: BagGroup) =>
  group.items.length > 0 && doneIn(group) === group.items.length

function toggle(item: CheckItem) {
  item.checked = !item.checked
}

function checkGroup(group: BagGroup) {
  group.items.forEach((item) => (item.checked = true))
}

function uncheckGroup(group: BagGroup) {
  group.items.forEach((item) => (item.checked = false))
}

function checkAll() {
  allItems.value.forEach((item) => (item.checked = true))
}

function uncheckAll() {
  allItems.value.forEach((item) => (item.checked = false))
}

function resetAll() {
  confirm.require({
    message:
      'Toutes les cases seront décochées et les items personnalisés supprimés. Continuer ?',
    header: 'Réinitialiser la checklist',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Réinitialiser',
    rejectLabel: 'Annuler',
    acceptClass: 'p-button-danger',
    rejectProps: { severity: 'secondary', outlined: true },
    accept: () => {
      bagGroups.forEach((group) => {
        group.items = (defaultItems.value[group.title] ?? []).map((i) => ({
          ...i,
          checked: false,
        }))
      })
      localStorage.removeItem(STORAGE_KEYS[activeProfile.value])
    },
  })
}
</script>
