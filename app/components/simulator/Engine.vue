<template>
  <div class="relative h-full w-full">
    <!-- Contexte de la situation -->
    <div
      v-if="currentStep === 0"
      class="flex h-full flex-col items-center justify-center"
    >
      <div class="max-w-3xl space-y-6 text-center">
        <div
          class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-teal-500/20"
        >
          <Icon :name="scenario.icon" size="4rem" class="text-teal-400" />
        </div>

        <h2 class="text-3xl font-bold text-white">{{ scenario.title }}</h2>

        <div class="rounded-xl border border-teal-500/30 bg-slate-800/50 p-6">
          <p class="text-lg leading-relaxed text-gray-300">
            {{ scenario.context }}
          </p>
        </div>

        <!-- Conditions de plongée -->
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div class="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <Icon
              name="mdi:diving-scuba-tank"
              size="2rem"
              class="mx-auto mb-2 text-teal-400"
            />
            <div class="text-sm text-gray-400">Profondeur</div>
            <div class="text-xl font-bold text-white">
              {{ scenario.situation.depth }}m
            </div>
          </div>
          <div class="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <Icon
              name="mdi:gauge"
              size="2rem"
              class="mx-auto mb-2 text-teal-400"
            />
            <div class="text-sm text-gray-400">Pression</div>
            <div class="text-xl font-bold text-white">
              {{ scenario.situation.airPressure }} bars
            </div>
          </div>
          <div class="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <Icon
              name="mdi:eye"
              size="2rem"
              class="mx-auto mb-2 text-teal-400"
            />
            <div class="text-sm text-gray-400">Visibilité</div>
            <div class="text-xl font-bold text-white">
              {{ scenario.situation.visibility }}
            </div>
          </div>
          <div class="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <Icon
              name="mdi:waves"
              size="2rem"
              class="mx-auto mb-2 text-teal-400"
            />
            <div class="text-sm text-gray-400">Courant</div>
            <div class="text-xl font-bold text-white">
              {{ scenario.situation.current }}
            </div>
          </div>
        </div>

        <Button
          @click="startScenario"
          label="Commencer le scénario"
          icon="pi pi-play"
          size="large"
          class="mt-6"
        />
      </div>
    </div>

    <!-- Questions du scénario -->
    <div
      v-else-if="currentStep <= scenario.steps.length"
      class="flex h-full flex-col"
    >
      <!-- Header avec progression -->
      <div class="mb-6 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <Tag
            :value="`Étape ${currentStep}/${scenario.steps.length}`"
            severity="info"
          />
          <Tag :value="`${currentScore} pts`" severity="warn">
            <template #icon>
              <Icon name="mdi:trophy" class="mr-1" />
            </template>
          </Tag>
        </div>

        <!-- Timer si mode évaluation -->
        <div
          v-if="mode === 'evaluation' && timeRemaining !== null"
          class="flex items-center gap-2"
        >
          <Icon
            name="mdi:timer"
            :class="timeRemaining < 30 ? 'text-red-400' : 'text-teal-400'"
          />
          <span
            :class="[
              'text-lg font-bold',
              timeRemaining < 30 ? 'text-red-400' : 'text-white',
            ]"
          >
            {{ formatTime(timeRemaining) }}
          </span>
        </div>
      </div>

      <!-- Question actuelle -->
      <div class="flex-1 space-y-6">
        <p class="text-sm leading-relaxed text-white">
          {{ scenario.description }}
        </p>
        <h3 class="text-2xl font-bold text-teal-400">
          {{ currentQuestion.question }}
        </h3>

        <!-- Options de réponse -->
        <div class="grid gap-4">
          <div
            v-for="option in currentQuestion.options"
            :key="option.id"
            @click="!answerSelected && selectAnswer(option)"
            :class="[
              'cursor-pointer rounded-xl border-2 p-4 transition-all duration-300',
              answerSelected
                ? option.correct
                  ? 'border-green-500 bg-green-500/10'
                  : selectedOption?.id === option.id
                    ? 'border-red-500 bg-red-500/10'
                    : 'border-slate-700 opacity-50'
                : 'border-slate-700 hover:border-teal-500/50 hover:bg-slate-800/50',
            ]"
          >
            <div class="flex items-start gap-3">
              <div
                :class="[
                  'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold',
                  answerSelected
                    ? option.correct
                      ? 'bg-green-500 text-white'
                      : selectedOption?.id === option.id
                        ? 'bg-red-500 text-white'
                        : 'bg-slate-700 text-white'
                    : 'bg-slate-700 text-white',
                ]"
              >
                {{ option.id.toUpperCase() }}
              </div>
              <div class="flex-1">
                <p class="text-base text-white">{{ option.text }}</p>

                <!-- Feedback après sélection -->
                <Transition name="fade">
                  <div
                    v-if="answerSelected && selectedOption?.id === option.id"
                    class="mt-3 rounded-lg border p-3"
                    :class="
                      option.correct
                        ? 'border-green-500/50 bg-green-500/10'
                        : 'border-red-500/50 bg-red-500/10'
                    "
                  >
                    <p
                      class="text-sm"
                      :class="
                        option.correct ? 'text-green-300' : 'text-red-300'
                      "
                    >
                      {{ option.feedback }}
                    </p>
                  </div>
                </Transition>
              </div>

              <!-- Icône de résultat -->
              <Icon
                v-if="answerSelected && selectedOption?.id === option.id"
                :name="option.correct ? 'mdi:check-circle' : 'mdi:close-circle'"
                size="1.5rem"
                :class="option.correct ? 'text-green-400' : 'text-red-400'"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Bouton suivant -->
      <div v-if="answerSelected" class="mt-6 flex justify-end">
        <Button
          @click="nextStep"
          :label="
            currentStep < scenario.steps.length
              ? 'Question suivante'
              : 'Terminer'
          "
          icon="pi pi-arrow-right"
          iconPos="right"
          size="large"
        />
      </div>
    </div>

    <!-- Résultats finaux -->
    <div v-else class="flex h-full flex-col items-center justify-center p-8">
      <div class="max-w-2xl space-y-6 text-center">
        <!-- Icône de performance -->
        <div
          class="mx-auto flex h-32 w-32 items-center justify-center rounded-full"
          :class="getPerformanceClass()"
        >
          <Icon :name="getPerformanceIcon()" size="5rem" class="text-white" />
        </div>

        <h2 class="text-4xl font-bold text-white">Scénario terminé !</h2>

        <!-- Score -->
        <div class="rounded-xl border border-teal-500/30 bg-slate-800/50 p-8">
          <div class="mb-4 text-6xl font-bold text-teal-400">
            {{ currentScore }} / {{ scenario.maxPoints }}
          </div>
          <div class="text-xl text-gray-300">
            {{ getPerformanceMessage() }}
          </div>
        </div>

        <!-- Détails des réponses -->
        <div class="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
          <h3 class="mb-4 text-xl font-bold text-white">Détails</h3>
          <div class="grid grid-cols-3 gap-4 text-center">
            <div>
              <div class="text-3xl font-bold text-green-400">
                {{ correctAnswers }}
              </div>
              <div class="text-sm text-gray-400">Correctes</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-red-400">
                {{ wrongAnswers }}
              </div>
              <div class="text-sm text-gray-400">Incorrectes</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-teal-400">
                {{ percentageScore }}%
              </div>
              <div class="text-sm text-gray-400">Réussite</div>
            </div>
          </div>
        </div>

        <!-- Conseils de prévention -->
        <div
          class="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-6 text-left"
        >
          <h3
            class="mb-3 flex items-center gap-2 text-xl font-bold text-yellow-400"
          >
            <Icon name="mdi:shield-alert" />
            Points de prévention
          </h3>
          <ul class="space-y-2">
            <li
              v-for="(tip, index) in scenario.prevention"
              :key="index"
              class="flex items-start gap-2 text-sm text-gray-300"
            >
              <Icon
                name="mdi:check"
                class="mt-0.5 flex-shrink-0 text-yellow-400"
              />
              <span>{{ tip }}</span>
            </li>
          </ul>
        </div>

        <!-- Actions -->
        <div class="flex gap-4">
          <Button
            @click="$emit('retry')"
            label="Recommencer"
            icon="pi pi-refresh"
            severity="secondary"
            size="large"
            class="flex-1"
          />
          <Button
            @click="$emit('backToMenu')"
            label="Retour au menu"
            icon="pi pi-home"
            size="large"
            class="flex-1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Option {
  id: string
  text: string
  correct: boolean
  feedback: string
  points: number
}

interface Question {
  id: number
  question: string
  options: Option[]
}

interface Scenario {
  id: string
  title: string
  icon: string
  context: string
  description: string
  situation: any
  steps: Question[]
  prevention: string[]
  maxPoints: number
  timeLimit?: number
}

const props = defineProps<{
  scenario: Scenario
  mode: 'training' | 'evaluation'
}>()

const emit = defineEmits<{
  complete: [score: number, time: number]
  retry: []
  backToMenu: []
}>()

// État du jeu
const currentStep = ref(0)
const currentScore = ref(0)
const answerSelected = ref(false)
const selectedOption = ref<Option | null>(null)
const answers = ref<
  Array<{ question: number; correct: boolean; points: number }>
>([])
const timeRemaining = ref<number | null>(null)
const startTime = ref<number>(0)
let timerInterval: NodeJS.Timeout | null = null

// Question actuelle
const currentQuestion = computed(() => {
  if (
    currentStep.value === 0 ||
    currentStep.value > props.scenario.steps.length
  ) {
    return null
  }
  return props.scenario.steps[currentStep.value - 1]
})

// Statistiques
const correctAnswers = computed(
  () => answers.value.filter((a) => a.correct).length
)
const wrongAnswers = computed(
  () => answers.value.filter((a) => !a.correct).length
)
const percentageScore = computed(() =>
  Math.round((currentScore.value / props.scenario.maxPoints) * 100)
)

// Démarrer le scénario
const startScenario = () => {
  currentStep.value = 1
  startTime.value = Date.now()

  if (props.mode === 'evaluation' && props.scenario.timeLimit) {
    timeRemaining.value = props.scenario.timeLimit
    startTimer()
  }
}

// Timer
const startTimer = () => {
  timerInterval = setInterval(() => {
    if (timeRemaining.value !== null && timeRemaining.value > 0) {
      timeRemaining.value--
    } else if (timeRemaining.value === 0) {
      // Temps écoulé
      stopTimer()
      finishScenario()
    }
  }, 1000)
}

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Sélectionner une réponse
const selectAnswer = (option: Option) => {
  answerSelected.value = true
  selectedOption.value = option

  if (option.correct) {
    currentScore.value += option.points
  }

  answers.value.push({
    question: currentStep.value,
    correct: option.correct,
    points: option.points,
  })
}

// Étape suivante
const nextStep = () => {
  if (currentStep.value < props.scenario.steps.length) {
    currentStep.value++
    answerSelected.value = false
    selectedOption.value = null
  } else {
    finishScenario()
  }
}

// Terminer le scénario
const finishScenario = () => {
  stopTimer()
  currentStep.value = props.scenario.steps.length + 1
  const elapsedTime = Math.floor((Date.now() - startTime.value) / 1000)
  emit('complete', currentScore.value, elapsedTime)
}

// Classe CSS pour les options
const getOptionClass = (option: Option) => {
  if (!answerSelected.value) {
    return 'border-slate-700 hover:border-teal-500/50 hover:bg-slate-800/50'
  }

  if (selectedOption.value?.id === option.id) {
    return option.correct
      ? 'border-green-500 bg-green-500/10'
      : 'border-red-500 bg-red-500/10'
  }

  return 'border-slate-700 opacity-50'
}

const getOptionIconClass = (option: Option) => {
  if (!answerSelected.value) {
    return 'bg-slate-700 text-white'
  }

  if (selectedOption.value?.id === option.id) {
    return option.correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
  }

  return 'bg-slate-700 text-white'
}

// Performance finale
const getPerformanceClass = () => {
  const percentage = percentageScore.value
  if (percentage >= 90) return 'bg-green-500'
  if (percentage >= 70) return 'bg-yellow-500'
  return 'bg-red-500'
}

const getPerformanceIcon = () => {
  const percentage = percentageScore.value
  if (percentage >= 90) return 'mdi:trophy'
  if (percentage >= 70) return 'mdi:medal'
  return 'mdi:alert-circle'
}

const getPerformanceMessage = () => {
  const percentage = percentageScore.value
  if (percentage >= 90)
    return 'Excellent ! Tu maîtrises parfaitement les procédures de sécurité ! 🏆'
  if (percentage >= 70)
    return "Bien joué ! Continue à t'entraîner pour progresser. 👍"
  return "Il faut revoir les procédures. N'hésite pas à recommencer ! 📚"
}

// Cleanup
onUnmounted(() => {
  stopTimer()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
