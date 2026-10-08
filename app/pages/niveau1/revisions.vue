<template>
  <div class="font-grotesk text-[#e8f1f4] antialiased">
    <UiPageBackground />

    <main class="mx-auto max-w-[1280px] px-8 pb-24">
      <UiPageHero
        title="Révisions & Quiz"
        subtitle="Révisez et testez vos connaissances sur la réglementation FFESSM"
        size="md"
      />

      <div v-if="loadError" class="text-[#ff8f80]">{{ loadError }}</div>
      <div v-else-if="!quizData" class="flex justify-center py-24">
        <ProgressSpinner />
      </div>

      <div v-else ref="stageEl" class="max-w-[912px] scroll-mt-28">
        <!-- Menu -->
        <template v-if="mode === null">
          <section
            :class="[
              cardBase,
              'flex flex-wrap items-center justify-between gap-6 px-6 py-[22px]',
            ]"
          >
            <div class="flex flex-col gap-1.5">
              <span
                class="font-mono text-xs uppercase tracking-[0.12em] text-[#7f97a2]"
              >
                Thème
              </span>
              <h2
                class="m-0 text-xl font-semibold tracking-[-0.01em] text-white"
              >
                {{ quizData.title }}
              </h2>
              <p class="m-0 text-[15px] text-[#9fb4bd]">
                {{ quizData.description }}
              </p>
            </div>
            <div class="flex gap-8">
              <div
                v-for="count in counts"
                :key="count.label"
                class="flex flex-col gap-1"
              >
                <span
                  class="text-[26px] font-semibold leading-none"
                  :class="count.color"
                >
                  {{ count.value }}
                </span>
                <span
                  class="font-mono text-[11px] uppercase tracking-[0.08em] text-[#7f97a2]"
                >
                  {{ count.label }}
                </span>
              </div>
            </div>
          </section>

          <div
            class="mt-3 grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-3"
          >
            <button
              v-for="m in modes"
              :key="m.id"
              type="button"
              class="flex flex-col gap-2.5 rounded-[14px] border p-6 text-left transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fe3d6]"
              :class="m.cardClass"
              @click="startMode(m.id)"
            >
              <span
                class="font-mono text-xs uppercase tracking-[0.08em]"
                :class="m.accentText"
              >
                {{ m.meta }}
              </span>
              <span
                class="text-2xl font-semibold tracking-[-0.015em] text-white"
              >
                {{ m.title }}
              </span>
              <span class="text-[15px] leading-normal text-[#b7c9d1]">
                {{ m.desc }}
              </span>
              <span
                class="mt-5 inline-flex h-10 items-center self-start rounded-[10px] px-4 text-sm font-semibold text-[#05111a]"
                :class="m.buttonClass"
              >
                Commencer →
              </span>
            </button>
          </div>

          <section class="mt-16">
            <UiSectionHeading>Vos statistiques</UiSectionHeading>
            <div
              class="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[rgba(232,241,244,0.1)] bg-[rgba(232,241,244,0.1)] sm:grid-cols-4"
            >
              <div
                v-for="cell in statCells"
                :key="cell.label"
                class="flex flex-col gap-1.5 bg-[#0b2130] px-[18px] py-4"
              >
                <span class="text-[26px] font-semibold" :class="cell.color">
                  {{ cell.value }}
                </span>
                <span
                  class="font-mono text-[11px] uppercase tracking-[0.08em] text-[#7f97a2]"
                >
                  {{ cell.label }}
                </span>
              </div>
            </div>
          </section>
        </template>

        <QuizEngine
          v-else-if="mode === 'quiz'"
          :quiz-data="quizData"
          @complete="handleQuizComplete"
          @exit="backToMenu"
        />

        <QuizFlashcardViewer
          v-else
          :flashcard-data="quizData"
          @exit="backToMenu"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'

definePageMeta({ breadcrumb: 'Révisions' })

interface QuizData {
  title: string
  description: string
  icon: string
  flashcards: any[]
  quiz: any[]
}

interface Stats {
  attempts: number
  totalScore: number
  bestScore: number
  lastScore: number
}

const STATS_KEY = 'quiz-stats'
const TOPIC = 'reglementation'

const quizData = ref<QuizData | null>(null)
const loadError = ref('')
const mode = ref<'quiz' | 'flashcard' | null>(null)
const stats = ref<Stats | null>(null)
const stageEl = ref<HTMLElement | null>(null)

onMounted(async () => {
  try {
    const response = await fetch('/data/quiz-reglementation.json')
    if (!response.ok) throw new Error()
    quizData.value = await response.json()
  } catch {
    loadError.value = 'Impossible de charger les questions.'
  }
  try {
    stats.value =
      JSON.parse(localStorage.getItem(STATS_KEY) || '{}')[TOPIC] ?? null
  } catch {
    stats.value = null
  }
})

const nQuestions = computed(() => quizData.value?.quiz.length ?? 0)
const nCards = computed(() => quizData.value?.flashcards.length ?? 0)

const counts = computed(() => [
  { label: 'Questions', value: nQuestions.value, color: 'text-[#7fe3d6]' },
  { label: 'Flashcards', value: nCards.value, color: 'text-[#f5d547]' },
])

const modes = computed(() => [
  {
    id: 'quiz' as const,
    title: 'Mode Quiz',
    desc: `Testez vos connaissances avec ${nQuestions.value} questions`,
    meta: `Mode quiz · ${nQuestions.value} questions`,
    accentText: 'text-[#7fe3d6]',
    cardClass:
      'border-[rgba(127,227,214,0.35)] bg-[rgba(127,227,214,0.05)] hover:border-[rgba(127,227,214,0.6)] hover:bg-[rgba(127,227,214,0.09)]',
    buttonClass: 'bg-[#7fe3d6]',
  },
  {
    id: 'flashcard' as const,
    title: 'Mode Révision',
    desc: 'Parcourez les flashcards pour mémoriser',
    meta: `Mode révision · ${nCards.value} cartes`,
    accentText: 'text-[#f5d547]',
    cardClass:
      'border-[rgba(245,213,71,0.3)] bg-[rgba(245,213,71,0.04)] hover:border-[rgba(245,213,71,0.55)] hover:bg-[rgba(245,213,71,0.08)]',
    buttonClass: 'bg-[#f5d547]',
  },
])

// Scores are stored as a number of correct answers: show them as percentages
const asPercent = (score: number) =>
  nQuestions.value ? `${Math.round((score / nQuestions.value) * 100)}%` : '0%'

const statCells = computed(() => {
  const s = stats.value
  return [
    { label: 'Tentatives', value: s?.attempts ?? 0, color: 'text-white' },
    {
      label: 'Meilleur score',
      value: asPercent(s?.bestScore ?? 0),
      color: 'text-[#7fe3d6]',
    },
    {
      label: 'Dernier score',
      value: asPercent(s?.lastScore ?? 0),
      color: 'text-[#f5d547]',
    },
    {
      label: 'Moyenne',
      value: asPercent(s?.attempts ? s.totalScore / s.attempts : 0),
      color: 'text-[#d4e2e7]',
    },
  ]
})

const scrollToStage = async () => {
  await nextTick()
  stageEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const startMode = (id: 'quiz' | 'flashcard') => {
  mode.value = id
  scrollToStage()
}

const backToMenu = () => {
  mode.value = null
  scrollToStage()
}

const handleQuizComplete = (results: { score: number }) => {
  const previous = stats.value ?? {
    attempts: 0,
    totalScore: 0,
    bestScore: 0,
    lastScore: 0,
  }
  stats.value = {
    attempts: previous.attempts + 1,
    totalScore: previous.totalScore + results.score,
    lastScore: results.score,
    bestScore: Math.max(previous.bestScore, results.score),
  }
  try {
    const all = JSON.parse(localStorage.getItem(STATS_KEY) || '{}')
    all[TOPIC] = stats.value
    localStorage.setItem(STATS_KEY, JSON.stringify(all))
  } catch {
    // Storage unavailable (private mode): stats just aren't kept
  }
}
</script>
