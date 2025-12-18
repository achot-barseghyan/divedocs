<script setup lang="ts">
interface QuizQuestion {
  id: number
  question: string
  options: {
    id: string
    text: string
    correct: boolean
  }[]
  explanation: string
  category: string
}

interface QuizData {
  title: string
  description: string
  icon: string
  quiz: QuizQuestion[]
}

const props = defineProps<{
  quizData: QuizData
}>()

const emit = defineEmits<{
  complete: [{ score: number; total: number; percentage: number }]
  exit: []
}>()

// État du quiz
const currentQuestionIndex = ref(0)
const selectedAnswer = ref<string | null>(null)
const isAnswered = ref(false)
const score = ref(0)
const answers = ref<
  { questionId: number; correct: boolean; selectedOption: string }[]
>([])
const showResults = ref(false)

// Question actuelle
const currentQuestion = computed(
  () => props.quizData.quiz[currentQuestionIndex.value]
)
const progress = computed(
  () => ((currentQuestionIndex.value + 1) / props.quizData.quiz.length) * 100
)
const isLastQuestion = computed(
  () => currentQuestionIndex.value === props.quizData.quiz.length - 1
)

// Sélectionner une réponse
const selectAnswer = (optionId: string) => {
  if (isAnswered.value || !currentQuestion.value) return

  selectedAnswer.value = optionId
  isAnswered.value = true

  const option = currentQuestion.value.options.find((o) => o.id === optionId)
  const isCorrect = option?.correct || false

  if (isCorrect) {
    score.value++
  }

  answers.value.push({
    questionId: currentQuestion.value.id,
    correct: isCorrect,
    selectedOption: optionId,
  })
}

// Question suivante
const nextQuestion = () => {
  if (isLastQuestion.value) {
    showResults.value = true

    const percentage = Math.round(
      (score.value / props.quizData.quiz.length) * 100
    )
    emit('complete', {
      score: score.value,
      total: props.quizData.quiz.length,
      percentage,
    })
  } else {
    currentQuestionIndex.value++
    selectedAnswer.value = null
    isAnswered.value = false
  }
}

// Recommencer le quiz
const restart = () => {
  currentQuestionIndex.value = 0
  selectedAnswer.value = null
  isAnswered.value = false
  score.value = 0
  answers.value = []
  showResults.value = false
}

// Calculer le message de performance
const performanceMessage = computed(() => {
  const percentage = Math.round(
    (score.value / props.quizData.quiz.length) * 100
  )

  if (percentage >= 90)
    return { text: 'Excellent !', icon: '🏆', color: 'text-green-500' }
  if (percentage >= 75)
    return { text: 'Très bien !', icon: '⭐', color: 'text-blue-500' }
  if (percentage >= 60)
    return { text: 'Bien joué !', icon: '👍', color: 'text-yellow-500' }
  if (percentage >= 50)
    return { text: 'Passable', icon: '📚', color: 'text-orange-500' }
  return { text: 'À revoir', icon: '💪', color: 'text-red-500' }
})

// Déterminer la classe CSS pour une option
const getOptionClass = (option: any) => {
  if (!isAnswered.value) {
    return selectedAnswer.value === option.id
      ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-500'
      : 'hover:bg-blue-600 border-gray-300 dark:border-gray-700'
  }

  if (option.correct) {
    return 'bg-green-500 dark:bg-green-900/30 border-green-500'
  }

  if (selectedAnswer.value === option.id && !option.correct) {
    return 'bg-red-500 dark:bg-red-900/30 border-red-500'
  }

  return 'border-gray-300 dark:border-gray-700 opacity-50'
}

// Icône pour l'option
const getOptionIcon = (option: any) => {
  if (!isAnswered.value) return ''
  if (option.correct) return '✓'
  if (selectedAnswer.value === option.id && !option.correct) return '✗'
  return ''
}
</script>

<template>
  <div class="quiz-engine">
    <!-- Vue normale : Questions -->
    <div v-if="!showResults && currentQuestion" class="space-y-6">
      <!-- Barre de progression -->
      <div class="space-y-2">
        <div class="flex items-center justify-between text-sm">
          <span class="font-medium">
            Question {{ currentQuestionIndex + 1 }} / {{ quizData.quiz.length }}
          </span>
          <span class="text-white">
            Score: {{ score }} /
            {{ currentQuestionIndex + (isAnswered ? 1 : 0) }}
          </span>
        </div>
        <div class="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            class="h-2 rounded-full bg-blue-500 transition-all duration-300"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>

      <!-- Question -->
      <Card class="border-2 border-blue-500/30">
        <template #header>
          <div class="flex items-start gap-3 p-6">
            <div class="text-3xl">❓</div>
            <div class="flex-1">
              <Tag
                :value="currentQuestion.category"
                severity="secondary"
                class="mb-3"
              />
              <h3 class="text-xl font-bold text-white">
                {{ currentQuestion.question }}
              </h3>
            </div>
          </div>
        </template>

        <template #content>
          <div class="space-y-3">
            <button
              v-for="option in currentQuestion.options"
              :key="option.id"
              @click="selectAnswer(option.id)"
              :disabled="isAnswered"
              :class="[
                'w-full rounded-lg border-2 p-4 text-left transition-all duration-200',
                'flex items-center gap-3',
                getOptionClass(option),
              ]"
            >
              <span
                class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2"
                :class="{
                  'border-blue-500':
                    selectedAnswer === option.id && !isAnswered,
                  'border-green-500': isAnswered && option.correct,
                  'border-red-500':
                    isAnswered &&
                    selectedAnswer === option.id &&
                    !option.correct,
                  'border-gray-300 dark:border-gray-600':
                    !isAnswered && selectedAnswer !== option.id,
                }"
              >
                <span v-if="isAnswered" class="text-lg">
                  {{ getOptionIcon(option) }}
                </span>
                <span v-else class="font-bold text-white">
                  {{ option.id.toUpperCase() }}
                </span>
              </span>
              <span class="flex-1 font-medium">{{ option.text }}</span>
            </button>
          </div>

          <!-- Explication (visible après réponse) -->
          <div
            v-if="isAnswered"
            class="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20"
          >
            <div class="flex items-start gap-3">
              <span class="text-2xl">💡</span>
              <div>
                <h4 class="mb-2 font-bold text-blue-900 dark:text-blue-100">
                  Explication
                </h4>
                <p class="text-gray-700 dark:text-gray-300">
                  {{ currentQuestion.explanation }}
                </p>
              </div>
            </div>
          </div>
        </template>

        <template #footer>
          <div class="flex items-center justify-between">
            <Button
              label="Quitter"
              severity="secondary"
              text
              @click="emit('exit')"
            />
            <Button
              v-if="isAnswered"
              :label="
                isLastQuestion ? 'Voir les résultats' : 'Question suivante'
              "
              @click="nextQuestion"
              icon="pi pi-arrow-right"
              iconPos="right"
            />
          </div>
        </template>
      </Card>
    </div>

    <!-- Vue Résultats -->
    <div v-else class="space-y-6">
      <Card class="text-center">
        <template #header>
          <div class="p-8">
            <div class="mb-4 text-8xl">{{ performanceMessage.icon }}</div>
            <h2
              class="mb-2 text-3xl font-bold"
              :class="performanceMessage.color"
            >
              {{ performanceMessage.text }}
            </h2>
          </div>
        </template>

        <template #content>
          <div class="space-y-6">
            <!-- Score -->
            <div class="grid grid-cols-3 gap-4">
              <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div class="text-3xl font-bold text-blue-500">{{ score }}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Bonnes réponses
                </div>
              </div>
              <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div class="text-3xl font-bold text-gray-900 dark:text-white">
                  {{ quizData.quiz.length }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Questions
                </div>
              </div>
              <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div
                  class="text-3xl font-bold"
                  :class="performanceMessage.color"
                >
                  {{ Math.round((score / quizData.quiz.length) * 100) }}%
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Score
                </div>
              </div>
            </div>

            <!-- Détail des réponses -->
            <div class="border-t pt-6">
              <h3 class="mb-4 text-left text-lg font-bold">
                Détail de vos réponses
              </h3>
              <div class="space-y-2">
                <div
                  v-for="(answer, index) in answers"
                  :key="answer.questionId"
                  class="flex items-center justify-between rounded-lg p-3"
                  :class="
                    answer.correct
                      ? 'bg-green-50 dark:bg-green-900/20'
                      : 'bg-red-50 dark:bg-red-900/20'
                  "
                >
                  <span class="font-medium">Question {{ index + 1 }}</span>
                  <span class="text-2xl">{{ answer.correct ? '✓' : '✗' }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template #footer>
          <div class="flex gap-3">
            <Button
              label="Recommencer"
              severity="secondary"
              icon="pi pi-refresh"
              @click="restart"
              class="flex-1"
            />
            <Button
              label="Terminer"
              @click="emit('exit')"
              icon="pi pi-check"
              class="flex-1"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
button:disabled {
  cursor: not-allowed;
}
</style>
