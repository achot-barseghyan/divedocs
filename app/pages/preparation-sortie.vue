<template>
  <div class="min-h-screen text-white">
    <div class="relative mt-[3rem] overflow-hidden px-4 py-20">
      <div class="relative z-10 mx-auto max-w-7xl px-6">
        <h1 class="mb-4 text-center text-5xl font-bold md:text-6xl">
          <span class="text-yellow-500">Préparation sortie</span>
        </h1>
        <p class="mx-auto max-w-3xl text-center text-xl text-gray-300">
          Checklist complète pour ne rien oublier avant de partir plonger.
        </p>
      </div>
    </div>

    <div class="mx-auto -mt-12 max-w-5xl px-6 pb-20">
      <!-- Progress bar -->
      <div
        class="mb-8 rounded-2xl border border-white/10 bg-navy-900/90 p-6 backdrop-blur-sm"
      >
        <div class="mb-3 flex items-center justify-between">
          <span class="text-lg font-semibold">Progression</span>
          <span class="text-2xl font-bold text-teal-400">
            {{ checkedCount }} / {{ totalCount }}
          </span>
        </div>
        <div class="h-3 w-full overflow-hidden rounded-full bg-white/10">
          <div
            class="h-full rounded-full bg-teal-400 transition-all duration-500"
            :style="{ width: progressPercent + '%' }"
          ></div>
        </div>
        <div class="mt-4 flex flex-wrap justify-end gap-2">
          <Button
            label="Tout cocher"
            icon="pi pi-check-square"
            size="small"
            severity="secondary"
            @click="checkAll"
          />
          <Button
            label="Tout décocher"
            icon="pi pi-stop"
            size="small"
            severity="secondary"
            @click="uncheckAll"
          />
          <Button
            label="Réinitialiser"
            icon="pi pi-refresh"
            size="small"
            severity="secondary"
            @click="resetAll"
          />
        </div>
      </div>

      <!-- Sections -->
      <div class="flex flex-col gap-6">
        <div
          v-for="group in bagGroups"
          :key="group.title"
          class="rounded-2xl border border-white/10 bg-navy-900/90 p-5 backdrop-blur-sm"
        >
          <div class="mb-4 flex items-center gap-2">
            <h2
              class="flex flex-1 items-center gap-2 text-xl font-bold text-teal-300"
            >
              <span class="text-2xl">{{ group.emoji }}</span>
              {{ group.title }}
            </h2>
            <button
              class="text-xs text-gray-400 transition hover:text-teal-300"
              @click="checkGroup(group)"
            >
              Tout cocher
            </button>
            <span class="text-gray-600">|</span>
            <button
              class="text-xs text-gray-400 transition hover:text-teal-300"
              @click="uncheckGroup(group)"
            >
              Tout décocher
            </button>
          </div>
          <ul class="grid gap-2 sm:grid-cols-2">
            <li
              v-for="item in group.items"
              :key="item.id"
              class="group/item flex items-center gap-3 rounded-lg p-2 transition hover:bg-white/5"
            >
              <div
                class="flex h-6 w-6 flex-shrink-0 cursor-pointer items-center justify-center rounded border-2 transition-all"
                :class="
                  item.checked
                    ? 'border-teal-400 bg-teal-400'
                    : 'border-white/30 bg-transparent'
                "
                @click="toggle(item)"
              >
                <i
                  v-if="item.checked"
                  class="pi pi-check text-xs font-bold text-navy-900"
                ></i>
              </div>
              <span
                class="min-w-0 flex-1 cursor-pointer break-words text-sm transition"
                :class="
                  item.checked ? 'text-gray-500 line-through' : 'text-gray-200'
                "
                @click="toggle(item)"
              >
                {{ item.label }}
              </span>
              <button
                class="ml-auto flex-shrink-0 p-1 text-gray-500 transition hover:text-red-400 sm:opacity-0 sm:group-hover/item:opacity-100"
                @click.stop="deleteItem(group, item)"
                title="Supprimer"
              >
                <i class="pi pi-times text-xs"></i>
              </button>
            </li>
          </ul>
          <div class="mt-3 flex gap-2">
            <InputText
              v-model="newItemLabels[group.title]"
              :placeholder="'Ajouter un item...'"
              size="small"
              class="flex-1 !bg-white/5 !text-white placeholder:text-gray-500"
              @keyup.enter="addItem(group)"
            />
            <Button
              icon="pi pi-plus"
              size="small"
              severity="secondary"
              :disabled="!newItemLabels[group.title]?.trim()"
              @click="addItem(group)"
            />
          </div>
        </div>
      </div>

      <!-- All done message -->
      <transition name="fade">
        <div
          v-if="allDone"
          class="rounded-2xl border-2 border-teal-400/50 bg-teal-900/30 p-6 text-center backdrop-blur-sm"
        >
          <i class="pi pi-check-circle mb-3 text-5xl text-teal-400"></i>
          <h3 class="mb-2 text-2xl font-bold text-teal-300">Tout est prêt !</h3>
          <p class="text-gray-300">
            Bonne plongée et pensez toujours à la sécurité.
          </p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import { useConfirm } from 'primevue/useconfirm'

const STORAGE_KEY = 'preparation-sortie-checked'
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

const bagGroups = reactive<BagGroup[]>([
  {
    title: 'Équipement de plongée',
    emoji: '🤿',
    items: [
      { id: 'eq-1', label: 'Masque et tuba', checked: false },
      { id: 'eq-2', label: 'Anti-buée respectueux des récifs', checked: false },
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
      { id: 'eq-10', label: 'Montre / ordinateur de plongée', checked: false },
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
      { id: 'surf-7', label: 'Piles / chargeurs de rechange', checked: false },
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
])

const newItemLabels = reactive<Record<string, string>>({})

const defaultItems: Record<string, CheckItem[]> = Object.fromEntries(
  bagGroups.map((g) => [g.title, g.items.map((i) => ({ ...i }))])
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
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    const savedGroups: Array<{ title: string; items: CheckItem[] }> =
      JSON.parse(saved)
    savedGroups.forEach((savedGroup) => {
      const group = bagGroups.find((g) => g.title === savedGroup.title)
      if (group) {
        group.items = savedGroup.items
      }
    })
  }
})

watch(
  bagGroups,
  (groups) => {
    const data = groups.map((g) => ({ title: g.title, items: g.items }))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  },
  { deep: true }
)

const totalCount = computed(() => allItems.value.length)
const checkedCount = computed(
  () => allItems.value.filter((i) => i.checked).length
)
const progressPercent = computed(() =>
  Math.round((checkedCount.value / totalCount.value) * 100)
)
const allDone = computed(() => checkedCount.value === totalCount.value)

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
    accept: () => {
      bagGroups.forEach((group) => {
        group.items = defaultItems[group.title].map((i) => ({
          ...i,
          checked: false,
        }))
      })
      localStorage.removeItem(STORAGE_KEY)
    },
  })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
