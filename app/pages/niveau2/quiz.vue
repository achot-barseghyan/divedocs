<template>
  <div class="font-grotesk text-[#e8f1f4] antialiased">
    <UiPageBackground />

    <main class="mx-auto max-w-[1280px] px-8 pb-24">
      <UiPageHero
        eyebrow="Niveau 2 · Théorie"
        title="Quiz"
        subtitle="Choisis un ou plusieurs cours, puis le type de quiz. Les questions arrivent dans un ordre aléatoire à chaque partie."
      />

      <div ref="stageEl" class="flex max-w-[760px] scroll-mt-28 flex-col gap-4">
        <!-- ============ Accueil ============ -->
        <section
          v-if="!session"
          :class="[panelClass, 'flex flex-col p-6 sm:p-7']"
        >
          <div class="flex flex-col gap-3">
            <span :class="labelClass">1 · Cours à réviser</span>
            <div class="flex flex-wrap gap-2" role="group" aria-label="Cours">
              <button
                v-for="t in THEMES"
                :key="t.id"
                type="button"
                :class="chipClass(!allThemes && prefs.themes.includes(t.id))"
                :aria-pressed="prefs.themes.includes(t.id)"
                @click="toggleTheme(t.id)"
              >
                {{ t.name }}
                <span class="font-mono text-xs opacity-70">
                  {{ poolFor(prefs.mode, [t.id]).length }}
                </span>
              </button>
              <button
                type="button"
                :class="chipClass(allThemes)"
                :aria-pressed="allThemes"
                @click="setPref({ themes: THEMES.map((t) => t.id) })"
              >
                Tout mélanger
                <span class="font-mono text-xs opacity-70">
                  {{ poolFor(prefs.mode, allThemeIds).length }}
                </span>
              </button>
            </div>
          </div>

          <div :class="stepDivider">
            <span :class="labelClass">2 · Type de quiz</span>
            <div
              class="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
              role="group"
              aria-label="Type de quiz"
            >
              <button
                v-for="m in modes"
                :key="m.id"
                type="button"
                class="flex flex-col gap-1.5 rounded-xl border p-4 text-left transition-colors"
                :class="[
                  focusRing,
                  prefs.mode === m.id
                    ? 'border-[#7fe3d6] bg-[rgba(127,227,214,0.09)]'
                    : 'border-[rgba(232,241,244,0.12)] bg-white/[0.03] hover:border-[rgba(127,227,214,0.45)]',
                ]"
                :aria-pressed="prefs.mode === m.id"
                @click="setPref({ mode: m.id })"
              >
                <span
                  class="text-xl font-semibold tracking-[-0.01em]"
                  :class="prefs.mode === m.id ? 'text-[#7fe3d6]' : 'text-white'"
                >
                  {{ m.title }}
                </span>
                <span class="text-[15px] leading-normal text-[#9fb4bd]">
                  {{ m.desc }}
                </span>
              </button>
            </div>
          </div>

          <div :class="stepDivider">
            <span :class="labelClass">3 · Nombre de questions</span>
            <div
              class="flex flex-wrap gap-2"
              role="group"
              aria-label="Nombre de questions"
            >
              <button
                v-for="c in [10, 20, 0]"
                :key="c"
                type="button"
                :class="chipClass(prefs.count === c)"
                :aria-pressed="prefs.count === c"
                @click="setPref({ count: c })"
              >
                {{ c || 'Toutes' }}
                <span v-if="!c" class="font-mono text-xs opacity-70">
                  {{ pool.length }}
                </span>
              </button>
            </div>
            <div class="mt-2 flex flex-wrap items-center justify-between gap-3">
              <span class="text-[15px] text-[#9fb4bd]">
                {{
                  pool.length
                    ? `${Math.min(prefs.count || pool.length, pool.length)} questions tirées au hasard parmi ${pool.length}`
                    : 'Choisis au moins un cours.'
                }}
              </span>
              <button
                type="button"
                :class="[
                  primaryButton,
                  'h-12 rounded-xl px-[22px] text-base disabled:cursor-not-allowed disabled:opacity-45',
                ]"
                :disabled="!pool.length"
                @click="startFromPrefs"
              >
                Commencer →
              </button>
            </div>
          </div>
        </section>

        <!-- ============ Question ============ -->
        <section
          v-else-if="!showResults && current"
          :class="[panelClass, 'overflow-hidden']"
        >
          <div
            class="flex items-center gap-4 border-b border-[rgba(232,241,244,0.08)] px-6 py-4 font-mono text-[13px] sm:px-7"
          >
            <span class="text-[#7fe3d6]">
              {{ session.i + 1 }} / {{ session.qs.length }}
            </span>
            <div
              class="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[rgba(232,241,244,0.12)]"
              aria-hidden="true"
            >
              <i
                class="absolute inset-y-0 left-0 rounded-full bg-[#7fe3d6] transition-[width] duration-300 motion-reduce:transition-none"
                :style="{ width: `${progress}%` }"
              ></i>
            </div>
            <span class="text-[#f5d547]">
              {{ points }} pt{{ points > 1 ? 's' : '' }}
            </span>
          </div>

          <div class="flex flex-col gap-5 px-6 pb-7 pt-7 sm:px-7">
            <div class="flex flex-col gap-3">
              <span class="self-start" :class="tagClass('aqua')">
                {{ themeName(current.q.t) }}
              </span>
              <h2
                class="m-0 text-[clamp(22px,2.6vw,28px)] font-semibold leading-[1.25] tracking-[-0.015em] text-white [text-wrap:pretty]"
              >
                {{ current.q.q }}
              </h2>
            </div>

            <!-- QCM -->
            <template v-if="session.mode === 'qcm' && current.order">
              <p class="m-0 -mt-2 text-[15px] text-[#9fb4bd]">
                {{
                  isMulti ? 'Plusieurs réponses possibles' : 'Une seule réponse'
                }}
              </p>
              <div class="flex flex-col gap-2.5">
                <button
                  v-for="(oi, k) in current.order"
                  :key="oi"
                  type="button"
                  class="grid min-h-[60px] grid-cols-[36px_1fr_20px] items-center gap-4 rounded-xl border px-[18px] py-3 text-left transition-colors"
                  :class="[optionRowClass(oi), !answered && focusRing]"
                  :aria-pressed="selected.includes(oi)"
                  :disabled="answered"
                  @click="toggleOption(oi)"
                >
                  <span
                    class="grid h-9 w-9 place-items-center font-mono text-[15px]"
                    :class="[
                      isMulti ? 'rounded-[8px]' : 'rounded-full',
                      optionBoxClass(oi),
                    ]"
                  >
                    {{ 'ABCD'[k] }}
                  </span>
                  <span class="text-[17px] leading-[1.45]">
                    {{ qcm!.o[oi] }}
                  </span>
                  <span
                    class="text-base font-bold"
                    :class="
                      optionMark(oi) === '✓'
                        ? 'text-[#7fe3d6]'
                        : 'text-[#ff8f80]'
                    "
                    aria-hidden="true"
                  >
                    {{ optionMark(oi) }}
                  </span>
                </button>
              </div>
            </template>

            <!-- Question ouverte -->
            <template v-else>
              <label for="ans" class="-mt-1 text-[15px] text-[#9fb4bd]">
                Ta réponse (Entrée pour valider, Maj + Entrée pour aller à la
                ligne)
              </label>
              <textarea
                id="ans"
                ref="answerEl"
                v-model="typed"
                :readonly="answered"
                autocomplete="off"
                spellcheck="false"
                placeholder="Écris ta réponse ici..."
                class="-mt-2 min-h-[120px] w-full resize-y rounded-xl border border-[rgba(232,241,244,0.12)] bg-[#0b2130] p-4 text-[17px] leading-[1.5] text-[#e8f1f4] placeholder:text-[#5f7884] read-only:opacity-80 focus-visible:border-[rgba(127,227,214,0.55)] focus-visible:outline-none"
                @keydown.enter.exact.prevent="submit"
              ></textarea>
            </template>

            <!-- Correction -->
            <div
              v-if="answered && result"
              class="flex flex-col gap-2.5 rounded-xl border px-5 py-4"
              :class="tone[result.v].box"
              role="status"
            >
              <span
                class="font-mono text-xs uppercase tracking-[0.08em]"
                :class="tone[result.v].text"
              >
                {{ verdictLabel }}
              </span>

              <template v-if="session.mode === 'qcm'">
                <p
                  v-if="result.v !== 'ok'"
                  class="m-0 whitespace-pre-line text-base leading-[1.55] text-[#e8f1f4]"
                >
                  <b class="font-semibold">Réponse :</b>
                  {{ result.answer }}
                </p>
                <p class="m-0 text-base leading-[1.55] text-[#d4e2e7]">
                  {{ qcm!.e }}
                </p>
              </template>

              <template v-else-if="grade && open">
                <p v-if="grade.items.length" class="m-0 text-sm text-[#9fb4bd]">
                  {{
                    open.min
                      ? `Il fallait au moins ${open.min} élément${open.min > 1 ? 's' : ''} parmi :`
                      : 'Éléments attendus :'
                  }}
                </p>
                <div v-if="grade.items.length" class="flex flex-wrap gap-1.5">
                  <span
                    v-for="item in grade.items"
                    :key="item.label"
                    class="rounded-md border px-2 py-0.5 text-[13px]"
                    :class="
                      item.hit
                        ? 'border-[rgba(127,227,214,0.45)] text-[#7fe3d6]'
                        : 'border-[rgba(255,143,128,0.45)] text-[#ff8f80] line-through'
                    "
                  >
                    {{ item.label }}
                  </span>
                </div>
                <p class="m-0 text-base leading-[1.55] text-[#e8f1f4]">
                  <b class="font-semibold">Réponse du cours :</b>
                  {{ open.r }}
                </p>
                <div class="flex flex-wrap items-center gap-2 pt-1">
                  <span class="text-sm text-[#9fb4bd]">
                    La correction automatique se trompe ?
                  </span>
                  <button
                    type="button"
                    :class="[secondaryButton, 'h-9 px-3 text-sm']"
                    @click="override('ok')"
                  >
                    Compter juste
                  </button>
                  <button
                    type="button"
                    :class="[secondaryButton, 'h-9 px-3 text-sm']"
                    @click="override('ko')"
                  >
                    Compter faux
                  </button>
                </div>
              </template>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                :class="[secondaryButton, 'h-10 px-4 text-sm']"
                @click="quit"
              >
                Arrêter
              </button>
              <button
                ref="goEl"
                type="button"
                :class="[
                  primaryButton,
                  'h-12 rounded-xl px-[22px] text-base disabled:cursor-not-allowed disabled:opacity-45',
                ]"
                :disabled="
                  !answered && session.mode === 'qcm' && !selected.length
                "
                @click="answered ? next() : submit()"
              >
                {{
                  !answered
                    ? 'Valider'
                    : isLast
                      ? 'Voir le résultat →'
                      : 'Question suivante →'
                }}
              </button>
            </div>
          </div>
        </section>

        <!-- ============ Résultats ============ -->
        <template v-else-if="showResults">
          <section :class="[panelClass, 'flex flex-col gap-6 p-6 sm:p-10']">
            <div class="flex flex-col gap-3">
              <span :class="labelClass">
                Résultat ·
                {{ session.mode === 'qcm' ? 'QCM' : 'Questions ouvertes' }}
              </span>
              <div class="flex flex-wrap items-baseline gap-3">
                <span
                  class="text-[clamp(64px,10vw,112px)] font-bold leading-[0.9] tracking-[-0.04em]"
                  :class="
                    percentage >= 80 ? 'text-[#7fe3d6]' : 'text-[#f5d547]'
                  "
                >
                  {{ correctCount }}
                </span>
                <span class="font-mono text-lg text-[#7f97a2]">
                  / {{ session.qs.length }} · {{ percentage }} %
                </span>
              </div>
              <p class="m-0 text-[19px] leading-normal text-[#d4e2e7]">
                {{ resultMessage }}
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="row in byTheme"
                  :key="row.id"
                  :class="tagClass('aqua')"
                >
                  {{ themeName(row.id) }} {{ row.ok }}/{{ row.n }}
                </span>
              </div>
            </div>

            <div class="flex flex-wrap gap-3">
              <button
                v-if="wrong.length"
                type="button"
                :class="[primaryButton, 'h-12 rounded-xl px-5 text-base']"
                @click="
                  startSession(shuffle(wrong.map((w) => w.q)), session.mode)
                "
              >
                Refaire les {{ wrong.length }} erreur{{
                  wrong.length > 1 ? 's' : ''
                }}
              </button>
              <button
                type="button"
                :class="[
                  wrong.length ? secondaryButton : primaryButton,
                  'h-12 rounded-xl px-5 text-base',
                ]"
                @click="startFromPrefs"
              >
                ↻ Nouvelle partie
              </button>
              <button
                type="button"
                :class="[secondaryButton, 'h-12 rounded-xl px-5 text-base']"
                @click="backHome"
              >
                Changer de quiz
              </button>
            </div>
          </section>

          <section
            v-if="wrong.length"
            class="rounded-[14px] border border-[rgba(245,213,71,0.25)] bg-[rgba(245,213,71,0.05)] p-6"
          >
            <h3
              class="m-0 mb-4 font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-[#f5d547]"
            >
              À revoir
            </h3>
            <ul class="m-0 flex list-none flex-col gap-3 p-0">
              <li
                v-for="(w, i) in wrong"
                :key="i"
                class="flex flex-col gap-1 rounded-r-lg border-l-4 bg-[#0b2130] px-4 py-3"
                :class="
                  w.r.v === 'mid' ? 'border-[#f5d547]' : 'border-[#ff8f80]'
                "
              >
                <span class="text-base font-semibold text-white">
                  {{ w.q.q }}
                </span>
                <span
                  v-if="w.r.given !== undefined"
                  class="whitespace-pre-line text-[15px] leading-normal text-[#9fb4bd]"
                >
                  Ta réponse : {{ w.r.given || '(vide)' }}
                </span>
                <span
                  class="whitespace-pre-line text-[15px] leading-normal text-[#d4e2e7]"
                >
                  <span class="text-[#7fe3d6]">✓</span>
                  {{ w.r.answer }}
                </span>
              </li>
            </ul>
          </section>
        </template>

        <p class="m-0 mt-4 text-[13px] leading-normal text-[#7f97a2]">
          Questions tirées des supports : « Aspect théorique de l'activité,
          Physique N2 » (S. Dejuane, nov. 2026) et « Réglementation » (Gwenaelle
          Colas).
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import {
  THEMES,
  QCM,
  OPEN,
  gradeOpen,
  realize,
  type Entry,
  type ThemeId,
  type QcmQuestion,
  type OpenQuestion,
  type Verdict,
  type GradeItem,
} from '~/data/quizNiveau2'

definePageMeta({ breadcrumb: 'Quiz' })

type Mode = 'qcm' | 'open'
type Question = QcmQuestion | OpenQuestion

interface Prefs {
  themes: ThemeId[]
  mode: Mode
  count: number // 0 = toutes
}

interface Result {
  v: Verdict
  answer: string // bonne(s) réponse(s) ou réponse du cours
  given?: string // texte tapé (questions ouvertes)
}

interface Session {
  mode: Mode
  qs: { q: Question; order?: number[] }[]
  i: number
  res: Result[]
}

const PREFS_KEY = 'n2prefs'

const panelClass =
  'rounded-[18px] border border-[rgba(232,241,244,0.1)] bg-white/[0.035]'
const labelClass =
  'font-mono text-xs uppercase tracking-[0.12em] text-[#7f97a2]'
const stepDivider =
  'mt-6 flex flex-col gap-3 border-t border-dashed border-[rgba(232,241,244,0.12)] pt-6'
const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fe3d6]'

const tone: Record<Verdict, { box: string; text: string }> = {
  ok: {
    box: 'border-[rgba(127,227,214,0.35)] bg-[rgba(127,227,214,0.07)]',
    text: 'text-[#7fe3d6]',
  },
  mid: {
    box: 'border-[rgba(245,213,71,0.35)] bg-[rgba(245,213,71,0.07)]',
    text: 'text-[#f5d547]',
  },
  ko: {
    box: 'border-[rgba(255,143,128,0.35)] bg-[rgba(255,143,128,0.07)]',
    text: 'text-[#ff8f80]',
  },
}

const modes: { id: Mode; title: string; desc: string }[] = [
  {
    id: 'qcm',
    title: 'QCM',
    desc: '4 propositions. Une ou plusieurs bonnes réponses selon la question.',
  },
  {
    id: 'open',
    title: 'Question ouverte',
    desc: 'Tu tapes ta réponse. Correction automatique, que tu peux ajuster.',
  },
]

const allThemeIds = THEMES.map((t) => t.id)
const themeName = (id: ThemeId) => THEMES.find((t) => t.id === id)?.name ?? id

const shuffle = <T,>(arr: T[]): T[] => {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j]!, a[i]!]
  }
  return a
}

// Calculation entries are generators: their values are drawn when the session starts
const poolFor = (mode: Mode, themes: ThemeId[]): Entry<Question>[] =>
  (mode === 'qcm' ? QCM : OPEN).filter((q) => themes.includes(q.t))

/* ---------- Préférences ---------- */
const prefs = ref<Prefs>({ themes: [...allThemeIds], mode: 'qcm', count: 10 })

onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem(PREFS_KEY) || 'null')
    if (saved && Array.isArray(saved.themes))
      prefs.value = { ...prefs.value, ...saved }
  } catch {
    // Storage unavailable: keep defaults
  }
})

const setPref = (patch: Partial<Prefs>) => {
  prefs.value = { ...prefs.value, ...patch }
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs.value))
  } catch {
    // Storage unavailable (private mode): prefs just aren't kept
  }
}

const allThemes = computed(() => prefs.value.themes.length === THEMES.length)
const pool = computed(() => poolFor(prefs.value.mode, prefs.value.themes))

// From "all", clicking a course selects only that course; otherwise it toggles
const toggleTheme = (id: ThemeId) => {
  const themes = prefs.value.themes
  if (allThemes.value) setPref({ themes: [id] })
  else if (themes.includes(id))
    setPref({ themes: themes.filter((x) => x !== id) })
  else setPref({ themes: [...themes, id] })
}

/* ---------- Session ---------- */
const session = ref<Session | null>(null)
const showResults = ref(false)
const selected = ref<number[]>([])
const typed = ref('')
const grade = ref<{ verdict: Verdict; items: GradeItem[] } | null>(null)
const stageEl = ref<HTMLElement | null>(null)
const answerEl = ref<HTMLTextAreaElement | null>(null)
const goEl = ref<HTMLButtonElement | null>(null)

const current = computed(() => session.value?.qs[session.value.i])
const qcm = computed(() =>
  session.value?.mode === 'qcm' ? (current.value?.q as QcmQuestion) : null
)
const open = computed(() =>
  session.value?.mode === 'open' ? (current.value?.q as OpenQuestion) : null
)
const result = computed(() => session.value?.res[session.value.i])
const answered = computed(() => !!result.value)
const isMulti = computed(() => (qcm.value?.c.length ?? 0) > 1)
const isLast = computed(
  () => !!session.value && session.value.i === session.value.qs.length - 1
)
const points = computed(
  () => session.value?.res.filter((r) => r?.v === 'ok').length ?? 0
)
const progress = computed(() =>
  session.value ? (session.value.i / session.value.qs.length) * 100 : 0
)

const verdictLabel = computed(() => {
  const v = result.value?.v
  if (session.value?.mode === 'qcm')
    return v === 'ok' ? 'Bonne réponse' : 'Raté'
  return { ok: 'Juste', mid: 'Incomplet', ko: 'Faux' }[v ?? 'ko']
})

const scrollToStage = async () => {
  await nextTick()
  stageEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const resetQuestion = async () => {
  selected.value = []
  typed.value = ''
  grade.value = null
  await scrollToStage()
  if (session.value?.mode === 'open') answerEl.value?.focus()
}

const startSession = (questions: Question[], mode: Mode) => {
  session.value = {
    mode,
    qs: questions.map((q) =>
      mode === 'qcm'
        ? { q, order: shuffle((q as QcmQuestion).o.map((_, i) => i)) }
        : { q }
    ),
    i: 0,
    res: [],
  }
  showResults.value = false
  resetQuestion()
  track({ e: 'quiz_start', quiz: 'n2', mode, themes: themesLabel() })
}

/* ---------- Stats anonymes (voir /admin/stats) ---------- */
const themesLabel = () => {
  const ids = new Set(session.value?.qs.map((it) => it.q.t))
  return THEMES.filter((t) => ids.has(t.id))
    .map((t) => t.name)
    .join(' + ')
}

// Sent when leaving a question, so a manual "Compter juste / faux" is taken into account
const trackAnswer = () => {
  const s = session.value
  const r = s?.res[s.i]
  if (!s || !r) return
  const q = s.qs[s.i]!.q
  track({
    e: 'answer',
    quiz: `n2 · ${s.mode}`,
    key: `${s.mode}:${q.key ?? q.q}`,
    label: q.keyLabel ?? q.q,
    verdict: r.v,
  })
}

const trackEnd = () => {
  const s = session.value
  if (!s) return
  track({
    e: 'quiz_end',
    quiz: 'n2',
    mode: s.mode,
    themes: themesLabel(),
    total: s.qs.length,
    correct: s.res.filter((r) => r?.v === 'ok').length,
  })
}

const startFromPrefs = () => {
  const p = pool.value
  startSession(
    shuffle(p)
      .slice(0, prefs.value.count || p.length)
      .map((e) => realize(e)),
    prefs.value.mode
  )
}

const backHome = () => {
  session.value = null
  showResults.value = false
  scrollToStage()
}

const toggleOption = (oi: number) => {
  if (answered.value) return
  if (!isMulti.value) selected.value = [oi]
  else
    selected.value = selected.value.includes(oi)
      ? selected.value.filter((x) => x !== oi)
      : [...selected.value, oi]
}

const focusNext = async () => {
  await nextTick()
  goEl.value?.focus()
}

const submit = () => {
  const s = session.value
  if (!s || answered.value) return
  if (s.mode === 'qcm' && qcm.value) {
    if (!selected.value.length) return
    const q = qcm.value
    const ok =
      selected.value.length === q.c.length &&
      selected.value.every((x) => q.c.includes(x))
    s.res[s.i] = {
      v: ok ? 'ok' : 'ko',
      answer: q.c.map((c) => q.o[c]).join('\n'),
    }
  } else if (open.value) {
    grade.value = gradeOpen(open.value, typed.value)
    s.res[s.i] = {
      v: grade.value.verdict,
      answer: open.value.r,
      given: typed.value,
    }
  }
  focusNext()
}

const override = (v: Verdict) => {
  const r = result.value
  if (r) r.v = v
}

const next = () => {
  const s = session.value
  if (!s) return
  trackAnswer()
  if (s.i < s.qs.length - 1) {
    s.i++
    resetQuestion()
  } else {
    showResults.value = true
    trackEnd()
    scrollToStage()
  }
}

// Stop: keep only the questions already answered
const quit = () => {
  const s = session.value
  if (!s) return
  trackAnswer()
  const done = s.res.filter(Boolean).length
  if (!done) return backHome()
  s.qs = s.qs.slice(0, done)
  showResults.value = true
  trackEnd()
  scrollToStage()
}

/* ---------- Options QCM ---------- */
const optionState = (oi: number) => {
  const sel = selected.value.includes(oi)
  if (!answered.value) return sel ? 'selected' : 'idle'
  const good = qcm.value?.c.includes(oi)
  if (sel && good) return 'good'
  if (sel) return 'bad'
  return good ? 'missed' : 'dim'
}

const optionRowClass = (oi: number) =>
  ({
    idle: 'cursor-pointer border-[rgba(232,241,244,0.12)] bg-white/[0.03] text-[#e8f1f4] hover:border-[rgba(127,227,214,0.45)] hover:bg-[rgba(127,227,214,0.06)]',
    selected:
      'cursor-pointer border-[#7fe3d6] bg-[rgba(127,227,214,0.1)] text-white',
    good: 'cursor-default border-[rgba(127,227,214,0.55)] bg-[rgba(127,227,214,0.1)] text-[#e8f1f4]',
    bad: 'cursor-default border-[rgba(255,143,128,0.5)] bg-[rgba(255,143,128,0.08)] text-[#e8f1f4]',
    missed:
      'cursor-default border-dashed border-[rgba(127,227,214,0.55)] bg-transparent text-[#e8f1f4]',
    dim: 'cursor-default border-[rgba(232,241,244,0.12)] bg-white/[0.03] text-[#7f97a2] opacity-60',
  })[optionState(oi)]

const optionBoxClass = (oi: number) =>
  ({
    idle: 'bg-white/[0.06] text-[#b7c9d1]',
    selected: 'bg-[#7fe3d6] text-[#05111a]',
    good: 'bg-[#7fe3d6] text-[#05111a]',
    bad: 'bg-[#ff8f80] text-[#05111a]',
    missed: 'border border-dashed border-[#7fe3d6] text-[#7fe3d6]',
    dim: 'bg-white/[0.06] text-[#b7c9d1]',
  })[optionState(oi)]

const optionMark = (oi: number) => {
  const state = optionState(oi)
  if (state === 'good' || state === 'missed') return '✓'
  return state === 'bad' ? '✕' : ''
}

/* ---------- Résultats ---------- */
const correctCount = computed(
  () => session.value?.res.filter((r) => r?.v === 'ok').length ?? 0
)
const percentage = computed(() =>
  session.value?.qs.length
    ? Math.round((correctCount.value / session.value.qs.length) * 100)
    : 0
)
const resultMessage = computed(() =>
  percentage.value >= 80
    ? 'Solide. Tu peux passer à un autre cours ou au mode question ouverte.'
    : percentage.value >= 50
      ? 'Bonne base. Refais les erreurs pour fixer les points manquants.'
      : 'Relis le cours sur les points ci-dessous, puis refais les erreurs.'
)
const byTheme = computed(() => {
  const s = session.value
  if (!s) return []
  return THEMES.map((t) => {
    const idx = s.qs.flatMap((it, i) => (it.q.t === t.id ? [i] : []))
    return {
      id: t.id,
      n: idx.length,
      ok: idx.filter((i) => s.res[i]?.v === 'ok').length,
    }
  }).filter((row) => row.n)
})
const wrong = computed(() => {
  const s = session.value
  if (!s) return []
  return s.qs.flatMap((it, i) => {
    const r = s.res[i]
    return r && r.v !== 'ok' ? [{ q: it.q, r }] : []
  })
})
</script>
