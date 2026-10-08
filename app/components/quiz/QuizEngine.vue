<template>
  <!-- Questions -->
  <section
    v-if="!showResults && currentQuestion"
    :class="[panelClass, 'overflow-hidden']"
  >
    <div
      class="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-[rgba(232,241,244,0.08)] px-7 py-[18px] font-mono text-[13px]"
    >
      <span class="text-[#e8f1f4]">{{ quizData.title }}</span>
      <span class="flex-1"></span>
      <span class="text-[#7fe3d6]">
        Question {{ currentQuestionIndex + 1 }}/{{ questions.length }}
      </span>
      <span class="text-[#f5d547]">{{ score }} correctes</span>
      <button
        type="button"
        class="text-[#7f97a2] hover:text-white"
        @click="emit('exit')"
      >
        Quitter ✕
      </button>
    </div>
    <div
      class="-mt-px grid gap-1 px-7"
      :style="{ gridTemplateColumns: `repeat(${questions.length}, 1fr)` }"
      aria-hidden="true"
    >
      <div
        v-for="(_, i) in questions"
        :key="i"
        class="h-1 rounded-sm"
        :class="
          i < currentQuestionIndex || (i === currentQuestionIndex && isAnswered)
            ? answers[i]?.correct
              ? 'bg-[#7fe3d6]'
              : 'bg-[#ff8f80]'
            : i === currentQuestionIndex
              ? 'bg-[rgba(127,227,214,0.4)]'
              : 'bg-[rgba(232,241,244,0.12)]'
        "
      ></div>
    </div>

    <div class="flex flex-col gap-6 px-7 pb-7 pt-8">
      <span
        v-if="currentQuestion.category"
        class="font-mono text-xs uppercase tracking-[0.08em] text-[#7f97a2]"
      >
        {{ currentQuestion.category }}
      </span>
      <h2
        class="m-0 -mt-2 text-[clamp(24px,3vw,32px)] font-semibold leading-[1.2] tracking-[-0.02em] text-white [text-wrap:balance]"
      >
        {{ currentQuestion.question }}
      </h2>

      <div class="flex flex-col gap-2.5">
        <UiAnswerOption
          v-for="(option, i) in currentQuestion.options"
          :key="option.id"
          :letter="'ABCD'[i]!"
          :text="option.text"
          :state="optionState(option)"
          @pick="selectAnswer(option.id)"
        />
      </div>

      <template v-if="isAnswered">
        <div
          class="flex flex-col gap-1.5 rounded-xl border px-5 py-4"
          :class="
            lastCorrect
              ? 'border-[rgba(127,227,214,0.35)] bg-[rgba(127,227,214,0.07)]'
              : 'border-[rgba(255,143,128,0.35)] bg-[rgba(255,143,128,0.07)]'
          "
          role="status"
        >
          <span
            class="font-mono text-xs uppercase tracking-[0.08em]"
            :class="lastCorrect ? 'text-[#7fe3d6]' : 'text-[#ff8f80]'"
          >
            {{ lastCorrect ? 'Correct' : 'Incorrect' }}
          </span>
          <p class="m-0 text-base leading-[1.55] text-[#e8f1f4]">
            <template v-if="!lastCorrect">
              La bonne réponse : {{ correctOption?.text }}.
            </template>
            {{ currentQuestion.explanation }}
          </p>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            :class="[primaryButton, 'h-12 rounded-xl px-[22px] text-base']"
            @click="nextQuestion"
          >
            {{ isLastQuestion ? 'Voir le résultat →' : 'Question suivante →' }}
          </button>
        </div>
      </template>
    </div>
  </section>

  <!-- Results -->
  <section
    v-else-if="showResults"
    :class="[panelClass, 'flex flex-col gap-8 p-6 sm:p-10']"
  >
    <div class="flex flex-col gap-3">
      <span
        class="font-mono text-[13px] uppercase tracking-[0.12em] text-[#7f97a2]"
      >
        Quiz terminé ! · {{ quizData.title }}
      </span>
      <div class="flex flex-wrap items-baseline gap-3">
        <span
          class="text-[clamp(64px,10vw,112px)] font-bold leading-[0.9] tracking-[-0.04em]"
          :class="percentage >= 80 ? 'text-[#7fe3d6]' : 'text-[#f5d547]'"
        >
          {{ score }}
        </span>
        <span class="text-[32px] font-semibold text-[#7f97a2]">
          / {{ questions.length }}
        </span>
      </div>
      <p class="m-0 text-[19px] leading-normal text-[#d4e2e7]">
        {{ performanceMessage }}
      </p>
    </div>

    <div
      class="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-[rgba(232,241,244,0.1)] bg-[rgba(232,241,244,0.1)]"
    >
      <div
        v-for="cell in resultCells"
        :key="cell.label"
        class="flex flex-col gap-1 bg-[#0b2130] p-[18px]"
      >
        <span class="text-[30px] font-semibold" :class="cell.color">
          {{ cell.value }}
        </span>
        <span class="text-sm text-[#9fb4bd]">{{ cell.label }}</span>
      </div>
    </div>

    <div
      v-if="missed.length"
      class="rounded-[14px] border border-[rgba(245,213,71,0.25)] bg-[rgba(245,213,71,0.05)] p-6"
    >
      <h3
        class="m-0 mb-4 font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-[#f5d547]"
      >
        À revoir
      </h3>
      <ul class="m-0 flex list-none flex-col gap-4 p-0">
        <li v-for="q in missed" :key="q.id" class="flex flex-col gap-1">
          <span class="text-base font-semibold text-white">
            {{ q.question }}
          </span>
          <span class="text-[15px] leading-normal text-[#d4e2e7]">
            <span class="text-[#7fe3d6]">✓</span>
            {{ q.options.find((o) => o.correct)?.text }}
          </span>
        </li>
      </ul>
    </div>

    <div class="flex flex-wrap gap-3">
      <button
        type="button"
        :class="[secondaryButton, 'h-12 rounded-xl px-5 text-base']"
        @click="restart"
      >
        ↻ Recommencer
      </button>
      <button
        type="button"
        :class="[primaryButton, 'h-12 rounded-xl px-5 text-base']"
        @click="emit('exit')"
      >
        Retour au menu
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface QuizOption {
  id: string
  text: string
  correct: boolean
}

interface QuizQuestion {
  id: number
  question: string
  options: QuizOption[]
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

const panelClass =
  'rounded-[18px] border border-[rgba(232,241,244,0.1)] bg-white/[0.035]'

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5)

const questions = ref(shuffle(props.quizData.quiz))
const currentQuestionIndex = ref(0)
const selectedAnswer = ref<string | null>(null)
const isAnswered = ref(false)
const score = ref(0)
const answers = ref<{ questionId: number; correct: boolean }[]>([])
const showResults = ref(false)

const currentQuestion = computed(
  () => questions.value[currentQuestionIndex.value]
)
const correctOption = computed(() =>
  currentQuestion.value?.options.find((o) => o.correct)
)
const isLastQuestion = computed(
  () => currentQuestionIndex.value === questions.value.length - 1
)
const lastCorrect = computed(
  () => answers.value[currentQuestionIndex.value]?.correct ?? false
)
const percentage = computed(() =>
  Math.round((score.value / questions.value.length) * 100)
)

const optionState = (option: QuizOption) => {
  if (!isAnswered.value) return 'idle' as const
  if (option.correct) return 'correct' as const
  return selectedAnswer.value === option.id
    ? ('wrong' as const)
    : ('dim' as const)
}

const selectAnswer = (optionId: string) => {
  if (isAnswered.value || !currentQuestion.value) return
  selectedAnswer.value = optionId
  isAnswered.value = true
  const correct =
    currentQuestion.value.options.find((o) => o.id === optionId)?.correct ??
    false
  if (correct) score.value++
  answers.value.push({ questionId: currentQuestion.value.id, correct })
}

const nextQuestion = () => {
  if (isLastQuestion.value) {
    showResults.value = true
    emit('complete', {
      score: score.value,
      total: questions.value.length,
      percentage: percentage.value,
    })
  } else {
    currentQuestionIndex.value++
    selectedAnswer.value = null
    isAnswered.value = false
  }
}

const restart = () => {
  questions.value = shuffle(props.quizData.quiz)
  currentQuestionIndex.value = 0
  selectedAnswer.value = null
  isAnswered.value = false
  score.value = 0
  answers.value = []
  showResults.value = false
}

const missed = computed(() =>
  questions.value.filter(
    (_, i) => answers.value[i] && !answers.value[i]!.correct
  )
)

const resultCells = computed(() => [
  { label: 'Correctes', value: score.value, color: 'text-[#7fe3d6]' },
  {
    label: 'Incorrectes',
    value: questions.value.length - score.value,
    color: 'text-[#ff8f80]',
  },
  { label: 'Réussite', value: `${percentage.value}%`, color: 'text-white' },
])

const performanceMessage = computed(() => {
  if (percentage.value >= 90)
    return 'Excellent ! Tu maîtrises la réglementation.'
  if (percentage.value >= 75)
    return 'Très bien ! Encore quelques points à revoir.'
  if (percentage.value >= 60)
    return 'Bien joué ! Revois les questions manquées.'
  if (percentage.value >= 50)
    return 'Passable. Un passage par les flashcards aidera.'
  return 'À revoir. Commence par le mode Révision avant de retenter le quiz.'
})
</script>
