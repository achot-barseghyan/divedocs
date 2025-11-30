<template>
  <Card
    @click="$emit('select', scenario)"
    :class="[
      'group cursor-pointer transition-all duration-300',
      'border-2',
      isSelected
        ? 'border-teal-400 bg-teal-500/10'
        : 'border-teal-500/20 hover:border-teal-400/50 hover:bg-slate-800/60',
    ]"
  >
    <template #content>
      <div class="space-y-4">
        <!-- En-tête avec icône et difficulté -->
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div
              :class="[
                'flex h-14 w-14 items-center justify-center rounded-xl transition-colors',
                isSelected
                  ? 'bg-teal-500/30'
                  : 'bg-teal-500/10 group-hover:bg-teal-500/20',
              ]"
            >
              <Icon :name="scenario.icon" size="2rem" class="text-teal-400" />
            </div>
            <div class="flex-1">
              <h3
                :class="[
                  'text-lg font-bold transition-colors',
                  isSelected
                    ? 'text-teal-300'
                    : 'text-teal-400 group-hover:text-teal-300',
                ]"
              >
                {{ scenario.title }}
              </h3>
              <Tag
                :value="scenario.difficulty"
                :severity="getDifficultySeverity(scenario.difficulty)"
                class="mt-1"
                size="small"
              />
            </div>
          </div>

          <!-- Checkmark si sélectionné -->
          <Icon
            v-if="isSelected"
            name="mdi:check-circle"
            size="1.5rem"
            class="text-teal-400"
          />
        </div>

        <!-- Description -->
        <p class="text-sm leading-relaxed text-gray-300">
          {{ scenario.description }}
        </p>

        <!-- Informations du scénario -->
        <div class="flex flex-wrap gap-2">
          <Tag
            :value="`${scenario.steps.length} étapes`"
            severity="info"
            size="small"
          >
            <template #icon>
              <Icon name="mdi:stairs" class="mr-1" />
            </template>
          </Tag>
          <Tag
            :value="`${scenario.maxPoints} pts max`"
            severity="warn"
            size="small"
          >
            <template #icon>
              <Icon name="mdi:trophy" class="mr-1" />
            </template>
          </Tag>
          <Tag
            v-if="scenario.timeLimit"
            :value="`${scenario.timeLimit}s`"
            severity="secondary"
            size="small"
          >
            <template #icon>
              <Icon name="mdi:timer" class="mr-1" />
            </template>
          </Tag>
        </div>

        <!-- Conditions de la situation (mode preview) -->
        <div
          v-if="showDetails"
          class="rounded-lg border border-slate-700 bg-slate-800/50 p-3"
        >
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="flex items-center gap-2">
              <Icon name="mdi:diving-scuba-tank" class="text-teal-400" />
              <span class="text-gray-400">Profondeur:</span>
              <span class="font-semibold text-white">
                {{ scenario.situation.depth }}m
              </span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="mdi:gauge" class="text-teal-400" />
              <span class="text-gray-400">Air:</span>
              <span class="font-semibold text-white">
                {{ scenario.situation.airPressure }} bars
              </span>
            </div>
          </div>
        </div>

        <!-- Stats si déjà joué -->
        <div
          v-if="stats"
          class="rounded-lg border border-teal-500/30 bg-teal-500/5 p-3"
        >
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-400">Meilleur score:</span>
            <span class="font-bold text-teal-400">{{ stats.bestScore }}</span>
          </div>
          <div class="mt-1 flex items-center justify-between text-sm">
            <span class="text-gray-400">Tentatives:</span>
            <span class="font-semibold text-white">{{ stats.attempts }}</span>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
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
  situation: {
    depth: number
    airPressure: number
    visibility: string
    current: string
  }
}

interface ScenarioStats {
  bestScore: number
  attempts: number
}

defineProps<{
  scenario: Scenario
  isSelected?: boolean
  showDetails?: boolean
  stats?: ScenarioStats | null
}>()

defineEmits<{
  select: [scenario: Scenario]
}>()

const getDifficultySeverity = (difficulty: string) => {
  const map: Record<string, any> = {
    facile: 'success',
    moyen: 'warn',
    difficile: 'danger',
  }
  return map[difficulty] || 'info'
}
</script>
