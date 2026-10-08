<template>
  <div class="font-grotesk text-[#e8f1f4] antialiased">
    <UiPageBackground />

    <main class="mx-auto max-w-[1280px] px-8 pb-24">
      <UiPageHero
        title="Simulateur d'Urgences"
        subtitle="Apprends à gérer les situations d'urgence en plongée avec des scénarios interactifs"
        size="sm"
      />

      <div ref="stageEl" class="scroll-mt-28">
        <!-- Stage 1: menu -->
        <template v-if="view === 'menu'">
          <div
            class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] gap-4"
            role="radiogroup"
            aria-label="Mode de jeu"
          >
            <button
              v-for="m in modes"
              :key="m.id"
              type="button"
              role="radio"
              :aria-checked="mode === m.id"
              class="flex flex-col gap-2.5 rounded-[14px] border p-6 text-left text-[#e8f1f4] transition-colors"
              :class="
                mode === m.id
                  ? m.id === 'evaluation'
                    ? 'border-[rgba(245,213,71,0.5)] bg-[rgba(245,213,71,0.07)]'
                    : 'border-[rgba(127,227,214,0.5)] bg-[rgba(127,227,214,0.08)]'
                  : 'border-[rgba(232,241,244,0.09)] bg-white/[0.035] hover:border-[rgba(232,241,244,0.2)]'
              "
              @click="mode = m.id"
            >
              <span class="flex w-full items-center justify-between">
                <span
                  class="font-mono text-xs uppercase tracking-[0.08em]"
                  :class="m.accentText"
                >
                  {{ m.meta }}
                </span>
                <span
                  class="h-[18px] w-[18px] rounded-full border-2"
                  :class="
                    mode === m.id
                      ? `${m.accentBorder} ${m.accentBg} shadow-[inset_0_0_0_3px_#0b2130]`
                      : 'border-[rgba(232,241,244,0.3)]'
                  "
                  aria-hidden="true"
                ></span>
              </span>
              <span
                class="text-2xl font-semibold tracking-[-0.015em] text-white"
              >
                {{ m.title }}
              </span>
              <span class="text-base leading-normal text-[#b7c9d1]">
                {{ m.desc }}
              </span>
            </button>
          </div>

          <div class="mt-16">
            <UiSectionHeading>Choisis un scénario</UiSectionHeading>
          </div>
          <div class="-mt-1 mb-6 flex flex-wrap gap-1.5">
            <button
              v-for="c in filterChips"
              :key="c.id"
              type="button"
              :class="chipClass(category === c.id)"
              :aria-pressed="category === c.id"
              @click="category = c.id"
            >
              {{ c.label }}
              <span class="font-mono text-xs opacity-70">{{ c.count }}</span>
            </button>
          </div>

          <p v-if="loadError" class="text-[#ff8f80]">{{ loadError }}</p>
          <div
            class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-4"
          >
            <button
              v-for="s in filteredScenarios"
              :key="s.id"
              type="button"
              :class="[
                cardBase,
                cardHover,
                'flex min-h-[220px] flex-col gap-3.5 p-6 text-left text-[#e8f1f4]',
              ]"
              @click="openBrief(s)"
            >
              <span class="flex w-full items-center justify-between gap-3">
                <span :class="tagClass(diffTone(s.difficulty))">
                  {{ s.difficulty }}
                </span>
                <span class="font-mono text-xs text-[#7f97a2]">
                  {{ categoryLabel(s.category) }}
                </span>
              </span>
              <span
                class="text-[21px] font-semibold leading-[1.2] tracking-[-0.01em] text-white"
              >
                {{ s.title }}
              </span>
              <span
                class="text-[15px] leading-normal text-[#9fb4bd] [text-wrap:pretty]"
              >
                {{ s.description }}
              </span>
              <span
                class="mt-auto flex w-full flex-wrap gap-4 border-t border-[rgba(232,241,244,0.08)] pt-3.5 font-mono text-xs text-[#b7c9d1]"
              >
                <span>{{ s.steps.length }} étapes</span>
                <span>{{ s.maxPoints }} pts max</span>
                <span>{{ s.timeLimit }}s</span>
                <span v-if="stats[s.id]" class="ml-auto text-[#7fe3d6]">
                  Record {{ stats[s.id].bestScore }}
                </span>
              </span>
            </button>
          </div>
        </template>

        <!-- Stage 2: situation -->
        <section
          v-else-if="view === 'brief' && scenario"
          :class="[panelClass, 'flex flex-col gap-7 p-6 sm:p-10']"
        >
          <div class="flex flex-wrap items-center justify-between gap-3">
            <span :class="tagClass(diffTone(scenario.difficulty))">
              {{ scenario.difficulty }}
            </span>
            <button
              type="button"
              class="text-sm text-[#7f97a2] hover:text-white"
              @click="toMenu"
            >
              ← Retour aux scénarios
            </button>
          </div>
          <div class="flex flex-col gap-3.5">
            <h2
              class="m-0 text-[clamp(30px,4vw,44px)] font-bold leading-[1.05] tracking-[-0.025em] text-white"
            >
              {{ scenario.title }}
            </h2>
            <p
              class="m-0 text-[19px] leading-[1.6] text-[#d4e2e7] [text-wrap:pretty]"
            >
              {{ scenario.context || scenario.description }}
            </p>
          </div>
          <div
            v-if="conditions.length"
            class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-px overflow-hidden rounded-xl border border-[rgba(232,241,244,0.1)] bg-[rgba(232,241,244,0.1)]"
          >
            <div
              v-for="c in conditions"
              :key="c.k"
              class="flex flex-col gap-1.5 bg-[#0b2130] px-[18px] py-4"
            >
              <span
                class="font-mono text-xs uppercase tracking-[0.08em] text-[#7f97a2]"
              >
                {{ c.k }}
              </span>
              <span class="text-[22px] font-semibold text-[#7fe3d6]">
                {{ c.v }}
              </span>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-4">
            <button
              type="button"
              :class="[primaryButton, 'h-[52px] rounded-xl px-6 text-[17px]']"
              @click="start"
            >
              Commencer le scénario →
            </button>
            <span class="font-mono text-[13px] text-[#7f97a2]">
              {{
                mode === 'evaluation'
                  ? `Mode Évaluation · ${scenario.timeLimit}s`
                  : 'Mode Entraînement · temps illimité'
              }}
            </span>
          </div>
        </section>

        <!-- Stage 3: questions -->
        <section
          v-else-if="view === 'play' && scenario && step"
          :class="[panelClass, 'overflow-hidden']"
        >
          <div
            class="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-[rgba(232,241,244,0.08)] px-7 py-[18px] font-mono text-[13px]"
          >
            <span class="text-[#e8f1f4]">{{ scenario.title }}</span>
            <span class="flex-1"></span>
            <span class="text-[#7fe3d6]">
              Étape {{ stepIndex + 1 }}/{{ scenario.steps.length }}
            </span>
            <span class="text-[#f5d547]">{{ score }} pts</span>
            <span
              v-if="mode === 'evaluation'"
              :class="timeLeft <= 15 ? 'text-[#ff8f80]' : 'text-[#b7c9d1]'"
            >
              ⏱ {{ timeLeft }}s
            </span>
            <button
              type="button"
              class="text-[#7f97a2] hover:text-white"
              @click="toMenu"
            >
              Quitter ✕
            </button>
          </div>
          <div
            class="-mt-px grid gap-1 px-7"
            :style="{
              gridTemplateColumns: `repeat(${scenario.steps.length}, 1fr)`,
            }"
            aria-hidden="true"
          >
            <div
              v-for="(_, i) in scenario.steps"
              :key="i"
              class="h-1 rounded-sm"
              :class="
                i < stepIndex || (i === stepIndex && answered)
                  ? 'bg-[#7fe3d6]'
                  : i === stepIndex
                    ? 'bg-[rgba(127,227,214,0.4)]'
                    : 'bg-[rgba(232,241,244,0.12)]'
              "
            ></div>
          </div>

          <div class="flex flex-col gap-6 px-7 pb-7 pt-8">
            <p class="m-0 text-[15px] leading-[1.55] text-[#9fb4bd]">
              {{ scenario.description }}
            </p>
            <h2
              class="m-0 text-[clamp(24px,3vw,32px)] font-semibold leading-[1.2] tracking-[-0.02em] text-white [text-wrap:balance]"
            >
              {{ step.question }}
            </h2>

            <div class="flex flex-col gap-2.5">
              <UiAnswerOption
                v-for="(option, i) in step.options"
                :key="option.id"
                :letter="'ABCD'[i]!"
                :text="option.text"
                :state="answerState(i)"
                @pick="pick(i)"
              />
            </div>

            <template v-if="answered">
              <div
                class="flex flex-col gap-1.5 rounded-xl border px-5 py-4"
                :class="
                  pickedCorrect
                    ? 'border-[rgba(127,227,214,0.35)] bg-[rgba(127,227,214,0.07)]'
                    : 'border-[rgba(255,143,128,0.35)] bg-[rgba(255,143,128,0.07)]'
                "
                role="status"
              >
                <span
                  class="font-mono text-xs uppercase tracking-[0.08em]"
                  :class="pickedCorrect ? 'text-[#7fe3d6]' : 'text-[#ff8f80]'"
                >
                  {{ pickedCorrect ? 'Correct' : 'Incorrect' }}
                </span>
                <p class="m-0 text-base leading-[1.55] text-[#e8f1f4]">
                  {{ feedbackText }}
                </p>
              </div>
              <div class="flex justify-end">
                <button
                  type="button"
                  :class="[
                    primaryButton,
                    'h-12 rounded-xl px-[22px] text-base',
                  ]"
                  @click="next"
                >
                  {{
                    isLastStep ? 'Voir le résultat →' : 'Question suivante →'
                  }}
                </button>
              </div>
            </template>
          </div>
        </section>

        <!-- Stage 4: results -->
        <section
          v-else-if="view === 'result' && scenario"
          :class="[panelClass, 'flex flex-col gap-8 p-6 sm:p-10']"
        >
          <div class="flex flex-col gap-3">
            <span
              class="font-mono text-[13px] uppercase tracking-[0.12em] text-[#7f97a2]"
            >
              Scénario terminé ! · {{ scenario.title }}
            </span>
            <div class="flex flex-wrap items-baseline gap-3">
              <span
                class="text-[clamp(64px,10vw,112px)] font-bold leading-[0.9] tracking-[-0.04em]"
                :class="percent >= 80 ? 'text-[#7fe3d6]' : 'text-[#f5d547]'"
              >
                {{ score }}
              </span>
              <span class="text-[32px] font-semibold text-[#7f97a2]">
                / {{ scenario.maxPoints }}
              </span>
            </div>
            <p class="m-0 text-[19px] leading-normal text-[#d4e2e7]">
              {{ resultMessage }}
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
            v-if="scenario.prevention?.length"
            class="rounded-[14px] border border-[rgba(245,213,71,0.25)] bg-[rgba(245,213,71,0.05)] p-6"
          >
            <h3
              class="m-0 mb-4 font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-[#f5d547]"
            >
              Points de prévention
            </h3>
            <ul class="m-0 flex list-none flex-col gap-2.5 p-0">
              <li
                v-for="tip in scenario.prevention"
                :key="tip"
                class="grid grid-cols-[18px_1fr] gap-2.5 text-base leading-normal text-[#d4e2e7]"
              >
                <span class="text-[#f5d547]" aria-hidden="true">✓</span>
                <span>{{ tip }}</span>
              </li>
            </ul>
          </div>

          <div class="flex flex-wrap gap-3">
            <button
              type="button"
              :class="[secondaryButton, 'h-12 rounded-xl px-5 text-base']"
              @click="start"
            >
              ↻ Recommencer
            </button>
            <button
              type="button"
              :class="[primaryButton, 'h-12 rounded-xl px-5 text-base']"
              @click="toMenu"
            >
              Retour au menu
            </button>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'

definePageMeta({ breadcrumb: 'Simulateur' })

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

interface Option {
  id: string
  text: string
  correct: boolean
  feedback: string
  points: number
}

interface Scenario {
  id: string
  title: string
  difficulty: 'facile' | 'moyen' | 'difficile'
  description: string
  category: string
  context: string
  situation?: {
    depth?: number
    airPressure?: number
    visibility?: string
    current?: string
  }
  steps: { id: number; question: string; options: Option[] }[]
  maxPoints: number
  timeLimit: number
  prevention: string[]
}

type Mode = 'training' | 'evaluation'
type View = 'menu' | 'brief' | 'play' | 'result'

const STATS_KEY = 'simulator-stats'

const modes = [
  {
    id: 'training' as Mode,
    title: 'Mode Entraînement',
    desc: 'Apprends à ton rythme, sans pression. Pas de limite de temps.',
    meta: '∞ Temps illimité',
    accentText: 'text-[#7fe3d6]',
    accentBorder: 'border-[#7fe3d6]',
    accentBg: 'bg-[#7fe3d6]',
  },
  {
    id: 'evaluation' as Mode,
    title: 'Mode Évaluation',
    desc: 'Teste tes connaissances avec un chronomètre et un score final.',
    meta: '⏱ Temps limité',
    accentText: 'text-[#f5d547]',
    accentBorder: 'border-[#f5d547]',
    accentBg: 'bg-[#f5d547]',
  },
]

const categories = [
  { id: 'respiration', label: 'Respiration' },
  { id: 'barotraumatisme', label: 'Barotraumatismes' },
  { id: 'flottabilite', label: 'Flottabilité' },
  { id: 'physique', label: 'Physique' },
  { id: 'thermorégulation', label: 'Température' },
]

const panelClass =
  'max-w-[880px] rounded-[18px] border border-[rgba(232,241,244,0.1)] bg-white/[0.035]'

const scenarios = ref<Scenario[]>([])
const loadError = ref('')
const stats = ref<Record<string, { bestScore: number; attempts: number }>>({})

const view = ref<View>('menu')
const mode = ref<Mode>('training')
const category = ref('all')
const scenario = ref<Scenario | null>(null)
const stepIndex = ref(0)
const picked = ref<number | null>(null)
const score = ref(0)
const nCorrect = ref(0)
const nWrong = ref(0)
const timeLeft = ref(0)
const stageEl = ref<HTMLElement | null>(null)
let timer: ReturnType<typeof setInterval> | null = null

onMounted(async () => {
  try {
    const response = await fetch('/data/emergency-scenarios.json')
    if (!response.ok) throw new Error()
    scenarios.value = await response.json()
  } catch {
    loadError.value = 'Impossible de charger les scénarios.'
  }
  try {
    stats.value = JSON.parse(localStorage.getItem(STATS_KEY) || '{}')
  } catch {
    stats.value = {}
  }
})

onBeforeUnmount(() => stopTimer())

const categoryLabel = (id: string) =>
  categories.find((c) => c.id === id)?.label ?? id

const diffTone = (difficulty: string) =>
  difficulty === 'difficile'
    ? 'coral'
    : difficulty === 'moyen'
      ? 'yellow'
      : 'aqua'

const filterChips = computed(() => [
  { id: 'all', label: 'Tous', count: scenarios.value.length },
  ...categories.map((c) => ({
    ...c,
    count: scenarios.value.filter((s) => s.category === c.id).length,
  })),
])

const filteredScenarios = computed(() =>
  category.value === 'all'
    ? scenarios.value
    : scenarios.value.filter((s) => s.category === category.value)
)

const conditions = computed(() => {
  const s = scenario.value?.situation
  if (!s) return []
  return [
    { k: 'Profondeur', v: s.depth != null ? `${s.depth}m` : null },
    {
      k: 'Pression',
      v: s.airPressure != null ? `${s.airPressure} bars` : null,
    },
    { k: 'Visibilité', v: s.visibility },
    { k: 'Courant', v: s.current },
  ].filter((c) => c.v)
})

const step = computed(() => scenario.value?.steps[stepIndex.value] ?? null)
const answered = computed(() => picked.value !== null)
const isLastStep = computed(
  () => !!scenario.value && stepIndex.value >= scenario.value.steps.length - 1
)
const pickedOption = computed(() =>
  picked.value === null ? null : (step.value?.options[picked.value] ?? null)
)
const pickedCorrect = computed(() => !!pickedOption.value?.correct)

// Feedback strings in the data start with ✅/❌: the box label already says it
const cleanFeedback = (text = '') => text.replace(/^[✅❌]\s*/u, '').trim()

const feedbackText = computed(() => {
  const option = pickedOption.value
  if (!option) return ''
  const own = cleanFeedback(option.feedback)
  if (option.correct) return own || 'Bonne réponse.'
  const right = step.value?.options.find((o) => o.correct)
  return [
    own || "Ce n'est pas la bonne réponse.",
    right ? `La bonne réponse : ${right.text}.` : '',
    right ? cleanFeedback(right.feedback) : '',
  ]
    .filter(Boolean)
    .join(' ')
})

const answerState = (i: number) => {
  if (!answered.value) return 'idle' as const
  if (step.value!.options[i]!.correct) return 'correct' as const
  return i === picked.value ? ('wrong' as const) : ('dim' as const)
}

const percent = computed(() =>
  scenario.value?.maxPoints
    ? Math.round((score.value / scenario.value.maxPoints) * 100)
    : 0
)

const resultMessage = computed(() => {
  if (percent.value === 100) return 'Excellent ! Tu maîtrises cette procédure.'
  if (percent.value >= 80)
    return 'Très bien ! Encore quelques détails à revoir.'
  return "Il faut revoir les procédures. N'hésite pas à recommencer !"
})

const resultCells = computed(() => [
  { label: 'Correctes', value: nCorrect.value, color: 'text-[#7fe3d6]' },
  { label: 'Incorrectes', value: nWrong.value, color: 'text-[#ff8f80]' },
  { label: 'Réussite', value: `${percent.value}%`, color: 'text-white' },
])

const scrollToStage = async () => {
  await nextTick()
  stageEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const stopTimer = () => {
  if (timer) clearInterval(timer)
  timer = null
}

const openBrief = (s: Scenario) => {
  scenario.value = s
  view.value = 'brief'
  scrollToStage()
}

const toMenu = () => {
  stopTimer()
  view.value = 'menu'
  scrollToStage()
}

const start = () => {
  if (!scenario.value) return
  stopTimer()
  stepIndex.value = 0
  picked.value = null
  score.value = 0
  nCorrect.value = 0
  nWrong.value = 0
  timeLeft.value = scenario.value.timeLimit
  view.value = 'play'
  if (mode.value === 'evaluation') {
    timer = setInterval(() => {
      if (timeLeft.value <= 1) {
        timeLeft.value = 0
        finish()
      } else {
        timeLeft.value--
      }
    }, 1000)
  }
  scrollToStage()
}

const pick = (i: number) => {
  if (answered.value || !step.value) return
  const option = step.value.options[i]!
  picked.value = i
  score.value += option.points
  if (option.correct) nCorrect.value++
  else nWrong.value++
}

const finish = () => {
  stopTimer()
  view.value = 'result'
  const s = scenario.value
  if (s) {
    const previous = stats.value[s.id] ?? { bestScore: 0, attempts: 0 }
    stats.value[s.id] = {
      bestScore: Math.max(previous.bestScore, score.value),
      attempts: previous.attempts + 1,
    }
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(stats.value))
    } catch {
      // Storage unavailable (private mode): the record just isn't kept
    }
  }
  scrollToStage()
}

const next = () => {
  if (isLastStep.value) {
    finish()
  } else {
    stepIndex.value++
    picked.value = null
  }
}
</script>
