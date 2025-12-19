<template>
  <div class="min-h-screen text-white">
    <!-- En-tête -->
    <div class="relative overflow-hidden px-4 py-20">
      <div class="relative z-10 mx-auto max-w-7xl px-6">
        <h1 class="mb-4 text-center text-6xl font-bold">
          <span class="text-yellow-500">Simulateur d'Urgences</span>
        </h1>
        <p class="mx-auto max-w-3xl text-center text-xl text-gray-300">
          Apprends à gérer les situations d'urgence en plongée avec des
          scénarios interactifs
        </p>
      </div>
    </div>

    <!-- Sélection du mode -->
    <div
      v-if="!selectedScenario && !isPlaying"
      class="mx-auto max-w-7xl px-6 pb-12"
    >
      <div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <!-- Mode Entraînement -->
        <Card
          @click="selectMode('training')"
          :class="[
            'group cursor-pointer border-2 transition-all duration-300',
            selectedMode === 'training'
              ? 'border-teal-400 bg-teal-500/10'
              : 'border-teal-500/20 hover:border-teal-400/50 hover:bg-slate-800/60',
          ]"
        >
          <template #content>
            <div class="space-y-4 text-center">
              <div
                class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-500/20"
              >
                <Icon name="mdi:school" size="3rem" class="text-teal-400" />
              </div>
              <div>
                <h3 class="text-2xl font-bold text-teal-400">
                  Mode Entraînement
                </h3>
                <p class="mt-2 text-gray-300">
                  Apprends à ton rythme, sans pression. Pas de limite de temps.
                </p>
              </div>
              <div
                class="flex items-center justify-center gap-2 text-sm text-gray-400"
              >
                <Icon name="mdi:infinity" />
                <span>Temps illimité</span>
              </div>
            </div>
          </template>
        </Card>

        <!-- Mode Évaluation -->
        <Card
          @click="selectMode('evaluation')"
          :class="[
            'group cursor-pointer border-2 transition-all duration-300',
            selectedMode === 'evaluation'
              ? 'border-yellow-400 bg-yellow-500/10'
              : 'border-yellow-500/20 hover:border-yellow-400/50 hover:bg-slate-800/60',
          ]"
        >
          <template #content>
            <div class="space-y-4 text-center">
              <div
                class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/20"
              >
                <Icon name="mdi:trophy" size="3rem" class="text-yellow-400" />
              </div>
              <div>
                <h3 class="text-2xl font-bold text-yellow-400">
                  Mode Évaluation
                </h3>
                <p class="mt-2 text-gray-300">
                  Teste tes connaissances avec un chronomètre et un score final.
                </p>
              </div>
              <div
                class="flex items-center justify-center gap-2 text-sm text-gray-400"
              >
                <Icon name="mdi:timer" />
                <span>Temps limité</span>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!-- Liste des scénarios -->
    <div
      v-if="selectedMode && !selectedScenario && !isPlaying"
      class="mx-auto max-w-7xl px-6 pb-20"
    >
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-2xl font-bold text-teal-400">Choisis un scénario</h2>
        <Button
          @click="selectedMode = null"
          label="Changer de mode"
          icon="pi pi-arrow-left"
          severity="secondary"
        />
      </div>

      <!-- Filtres -->
      <div class="mb-6 flex flex-wrap gap-3">
        <Button
          :label="`Tous (${scenarios.length})`"
          :severity="filterCategory === null ? 'info' : 'secondary'"
          @click="filterCategory = null"
          size="small"
          class="text-white"
        />
        <Button
          v-for="category in categories"
          :key="category.id"
          :label="`${category.label} (${getCategoryCount(category.id)})`"
          :severity="filterCategory === category.id ? 'info' : 'secondary'"
          @click="filterCategory = category.id"
          class="text-white"
          size="small"
        >
          <template #icon>
            <Icon :name="category.icon" class="mr-2" />
          </template>
        </Button>
      </div>

      <!-- Grille de scénarios -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SimulatorScenarioCard
          v-for="scenario in filteredScenarios"
          :key="scenario.id"
          :scenario="scenario as any"
          :is-selected="selectedScenario?.id === scenario.id"
          :stats="getScenarioStats(scenario.id)"
          @select="selectScenario"
        />
      </div>
    </div>

    <!-- Simulateur actif -->
    <div
      v-if="isPlaying && selectedScenario"
      class="mx-auto h-[calc(100vh-8rem)] max-w-7xl px-6 pb-12"
    >
      <Card class="h-full border border-teal-500/30 bg-slate-800/40">
        <template #content>
          <SimulatorEngine
            :scenario="selectedScenario as any"
            :mode="selectedMode!"
            @complete="handleComplete"
            @retry="retryScenario"
            @back-to-menu="backToMenu"
          />
        </template>
      </Card>
    </div>

    <!-- Toast pour les notifications -->
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'

interface Scenario {
  id: string
  title: string
  difficulty: string
  description: string
  icon: string
  category: string
  steps: any[]
  maxPoints: number
  timeLimit?: number
  situation: any
  context: string
  prevention: string[]
}

interface ScenarioStats {
  bestScore: number
  attempts: number
  lastPlayed?: Date
}

const toast = useToast()

// États
const scenarios = ref<Scenario[]>([])
const selectedMode = ref<'training' | 'evaluation' | null>(null)
const selectedScenario = ref<Scenario | null>(null)
const isPlaying = ref(false)
const filterCategory = ref<string | null>(null)
const scenarioStats = ref<Record<string, ScenarioStats>>({})

// Catégories
const categories = [
  { id: 'respiration', label: 'Respiration', icon: 'mdi:lungs' },
  {
    id: 'barotraumatisme',
    label: 'Barotraumatismes',
    icon: 'mdi:alert-octagon',
  },
  { id: 'flottabilite', label: 'Flottabilité', icon: 'mdi:wave' },
  { id: 'physique', label: 'Physique', icon: 'mdi:run' },
  { id: 'thermorégulation', label: 'Température', icon: 'mdi:thermometer' },
]

// Scénarios filtrés
const filteredScenarios = computed(() => {
  if (!filterCategory.value) return scenarios.value
  return scenarios.value.filter((s) => s.category === filterCategory.value)
})

// Charger les données
onMounted(async () => {
  try {
    const response = await fetch('/data/emergency-scenarios.json')
    scenarios.value = await response.json()

    // Charger les stats depuis localStorage
    const savedStats = localStorage.getItem('simulator-stats')
    if (savedStats) {
      scenarioStats.value = JSON.parse(savedStats)
    }

    toast.add({
      severity: 'success',
      summary: 'Prêt !',
      detail: `${scenarios.value.length} scénarios disponibles`,
      life: 3000,
    })
  } catch (error) {
    console.error('Erreur lors du chargement des scénarios:', error)
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Impossible de charger les scénarios',
      life: 3000,
    })
  }
})

// Sélectionner un mode
const selectMode = (mode: 'training' | 'evaluation') => {
  console.log('Mode sélectionné:', mode)
  selectedMode.value = mode
  toast.add({
    severity: 'info',
    summary: mode === 'training' ? 'Mode Entraînement' : 'Mode Évaluation',
    detail:
      mode === 'training'
        ? 'Apprends à ton rythme sans limite de temps'
        : 'Teste tes connaissances avec un chronomètre',
    life: 2000,
  })
}

// Sélectionner un scénario
const selectScenario = (scenario: Scenario) => {
  console.log('Scénario sélectionné:', scenario)
  selectedScenario.value = scenario
  isPlaying.value = true
  console.log(
    'isPlaying:',
    isPlaying.value,
    'selectedScenario:',
    selectedScenario.value
  )
}

// Terminer un scénario
const handleComplete = (score: number, time: number) => {
  if (!selectedScenario.value) return

  // Sauvegarder les stats
  const scenarioId = selectedScenario.value.id
  const currentStats = scenarioStats.value[scenarioId] || {
    bestScore: 0,
    attempts: 0,
  }

  scenarioStats.value[scenarioId] = {
    bestScore: Math.max(currentStats.bestScore, score),
    attempts: currentStats.attempts + 1,
    lastPlayed: new Date(),
  }

  // Sauvegarder dans localStorage
  localStorage.setItem('simulator-stats', JSON.stringify(scenarioStats.value))

  // Notification
  const percentage = Math.round(
    (score / selectedScenario.value.maxPoints) * 100
  )
  toast.add({
    severity: percentage >= 70 ? 'success' : 'warn',
    summary: 'Scénario terminé !',
    detail: `Score: ${score} pts (${percentage}%) en ${time}s`,
    life: 5000,
  })
}

// Recommencer le scénario
const retryScenario = () => {
  isPlaying.value = false
  setTimeout(() => {
    isPlaying.value = true
  }, 100)
}

// Retour au menu
const backToMenu = () => {
  isPlaying.value = false
  selectedScenario.value = null
}

// Obtenir les stats d'un scénario
const getScenarioStats = (scenarioId: string): ScenarioStats | null => {
  return scenarioStats.value[scenarioId] || null
}

// Compter les scénarios par catégorie
const getCategoryCount = (categoryId: string): number => {
  return scenarios.value.filter((s) => s.category === categoryId).length
}

// Métadonnées SEO
useHead({
  title: "Simulateur d'Urgences - Niveau 1",
  meta: [
    {
      name: 'description',
      content:
        "Entraîne-toi à gérer les situations d'urgence en plongée avec des scénarios interactifs et gamifiés.",
    },
  ],
})
</script>
