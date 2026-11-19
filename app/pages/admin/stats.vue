<template>
  <div class="font-grotesk text-[#e8f1f4] antialiased">
    <UiPageBackground />

    <main class="mx-auto max-w-[1080px] px-4 pb-24 sm:px-8">
      <UiPageHero
        eyebrow="Accès réservé"
        title="Statistiques"
        subtitle="Fréquentation anonyme du site : pages vues, modules lus, quiz lancés et questions les plus ratées."
        size="sm"
      />

      <!-- Mot de passe -->
      <form
        v-if="!data"
        :class="[cardBase, 'flex max-w-[460px] flex-col gap-4 p-6']"
        @submit.prevent="load"
      >
        <label for="pw" :class="labelClass">Mot de passe</label>
        <input
          id="pw"
          v-model="password"
          type="password"
          autocomplete="current-password"
          class="h-12 rounded-xl border border-[rgba(232,241,244,0.12)] bg-[#0b2130] px-4 text-base text-[#e8f1f4] focus-visible:border-[rgba(127,227,214,0.55)] focus-visible:outline-none"
        />
        <p v-if="error" class="m-0 text-[15px] text-[#ff8f80]">{{ error }}</p>
        <button
          type="submit"
          :class="[primaryButton, 'h-12 rounded-xl px-5 text-base']"
          :disabled="loading"
        >
          {{ loading ? 'Chargement…' : 'Voir les statistiques' }}
        </button>
      </form>

      <template v-else>
        <!-- Période -->
        <div
          class="mb-6 flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Période"
        >
          <button
            v-for="p in periods"
            :key="p.days"
            type="button"
            :class="chipClass(days === p.days)"
            :aria-pressed="days === p.days"
            @click="setDays(p.days)"
          >
            {{ p.label }}
          </button>
          <span class="flex-1"></span>
          <button
            type="button"
            :class="[secondaryButton, 'h-[38px] px-3.5 text-sm']"
            @click="load"
          >
            ↻ Actualiser
          </button>
          <button
            type="button"
            :class="[secondaryButton, 'h-[38px] px-3.5 text-sm']"
            @click="logout"
          >
            Se déconnecter
          </button>
        </div>

        <!-- Chiffres clés -->
        <div
          class="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[rgba(232,241,244,0.1)] bg-[rgba(232,241,244,0.1)] sm:grid-cols-4"
        >
          <div
            v-for="cell in kpis"
            :key="cell.label"
            class="flex flex-col gap-1.5 bg-[#0b2130] px-[18px] py-4"
          >
            <span class="text-[30px] font-semibold leading-none text-white">
              {{ cell.value }}
            </span>
            <span
              class="font-mono text-[11px] uppercase tracking-[0.08em] text-[#7f97a2]"
            >
              {{ cell.label }}
            </span>
            <span v-if="cell.sub" class="text-[13px] text-[#9fb4bd]">
              {{ cell.sub }}
            </span>
          </div>
        </div>

        <!-- Visiteurs par jour -->
        <section :class="[cardBase, 'mt-4 p-5 sm:p-6']">
          <div class="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 class="m-0 text-xl font-semibold tracking-[-0.01em] text-white">
              Visiteurs par jour
            </h2>
            <span class="font-mono text-xs text-[#7f97a2]">
              max {{ maxVisitors }} · {{ series.length }} jours
            </span>
          </div>

          <p v-if="!series.length" class="m-0 text-[15px] text-[#9fb4bd]">
            Pas encore de données sur cette période.
          </p>
          <div v-else class="relative">
            <div
              class="flex h-[180px] items-end gap-[2px] border-b border-[rgba(232,241,244,0.18)]"
              role="img"
              :aria-label="`Visiteurs uniques par jour, de ${fmtDate(series[0]!.date)} à ${fmtDate(series.at(-1)!.date)}`"
              @mouseleave="hover = null"
            >
              <button
                v-for="(d, i) in series"
                :key="d.date"
                type="button"
                class="group flex h-full min-w-[2px] flex-1 cursor-default items-end focus-visible:outline-none"
                :aria-label="`${fmtDate(d.date)} : ${d.visitors} visiteurs, ${d.views} pages vues, ${d.quizzes} quiz`"
                @mouseenter="hover = i"
                @focus="hover = i"
                @blur="hover = null"
              >
                <span
                  class="block w-full rounded-t-[4px] transition-opacity"
                  :class="[
                    d.visitors ? 'bg-[#7fe3d6]' : '',
                    hover !== null && hover !== i ? 'opacity-50' : '',
                  ]"
                  :style="{ height: `${(d.visitors / maxVisitors) * 100}%` }"
                ></span>
              </button>
            </div>
            <div
              class="mt-1.5 flex justify-between font-mono text-[11px] text-[#7f97a2]"
            >
              <span>{{ fmtDate(series[0]!.date) }}</span>
              <span>{{ fmtDate(series.at(-1)!.date) }}</span>
            </div>

            <div
              v-if="hover !== null && series[hover]"
              class="pointer-events-none absolute top-0 z-10 flex min-w-[150px] -translate-x-1/2 flex-col gap-0.5 rounded-lg border border-[rgba(232,241,244,0.14)] bg-[#06151e] px-3 py-2 text-[13px] shadow-lg"
              :style="{
                left: `clamp(80px, ${((hover + 0.5) / series.length) * 100}%, calc(100% - 80px))`,
              }"
            >
              <span class="font-mono text-[11px] text-[#9fb4bd]">
                {{ fmtDate(series[hover]!.date, true) }}
              </span>
              <span class="font-semibold text-white">
                {{ series[hover]!.visitors }} visiteurs
              </span>
              <span class="text-[#d4e2e7]">
                {{ series[hover]!.views }} pages vues
              </span>
              <span class="text-[#d4e2e7]">
                {{ series[hover]!.quizzes }} quiz lancés
              </span>
            </div>
          </div>

          <details v-if="series.length" class="mt-4">
            <summary class="cursor-pointer text-sm text-[#9fb4bd]">
              Voir en tableau
            </summary>
            <table class="mt-3 w-full border-collapse text-left text-sm">
              <thead
                class="font-mono text-[11px] uppercase tracking-[0.08em] text-[#7f97a2]"
              >
                <tr>
                  <th class="py-1.5 font-normal">Jour</th>
                  <th class="py-1.5 text-right font-normal">Visiteurs</th>
                  <th class="py-1.5 text-right font-normal">Pages vues</th>
                  <th class="py-1.5 text-right font-normal">Quiz</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="d in [...series].reverse()"
                  :key="d.date"
                  class="border-t border-[rgba(232,241,244,0.06)]"
                >
                  <td class="py-1.5">{{ fmtDate(d.date, true) }}</td>
                  <td class="py-1.5 text-right tabular-nums">
                    {{ d.visitors }}
                  </td>
                  <td class="py-1.5 text-right tabular-nums">{{ d.views }}</td>
                  <td class="py-1.5 text-right tabular-nums">
                    {{ d.quizzes }}
                  </td>
                </tr>
              </tbody>
            </table>
          </details>
        </section>

        <!-- Quiz -->
        <section :class="[cardBase, 'mt-4 p-5 sm:p-6']">
          <h2
            class="m-0 mb-4 text-xl font-semibold tracking-[-0.01em] text-white"
          >
            Quiz
          </h2>
          <p v-if="!data.quizzes.length" class="m-0 text-[15px] text-[#9fb4bd]">
            Aucun quiz lancé sur cette période.
          </p>
          <div v-else class="overflow-x-auto">
            <table
              class="w-full min-w-[480px] border-collapse text-left text-[15px]"
            >
              <thead
                class="font-mono text-[11px] uppercase tracking-[0.08em] text-[#7f97a2]"
              >
                <tr>
                  <th class="pb-2 font-normal">Quiz</th>
                  <th class="pb-2 text-right font-normal">Lancés</th>
                  <th class="pb-2 text-right font-normal">Terminés</th>
                  <th class="pb-2 text-right font-normal">Score moyen</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="q in data.quizzes"
                  :key="q.key"
                  class="border-t border-[rgba(232,241,244,0.06)]"
                >
                  <td class="py-2 pr-3">{{ quizName(q.key) }}</td>
                  <td class="py-2 text-right tabular-nums">{{ q.starts }}</td>
                  <td class="py-2 text-right tabular-nums">{{ q.ends }}</td>
                  <td class="py-2 text-right tabular-nums">
                    {{ q.avg === null ? '–' : `${q.avg} %` }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Questions les plus ratées -->
        <section :class="[cardBase, 'mt-4 p-5 sm:p-6']">
          <h2 class="m-0 text-xl font-semibold tracking-[-0.01em] text-white">
            Questions les plus ratées
          </h2>
          <p class="m-0 mb-4 mt-1 text-sm text-[#9fb4bd]">
            Part de réponses fausses ou incomplètes, parmi les questions posées
            au moins 3 fois.
          </p>
          <p v-if="!data.missed.length" class="m-0 text-[15px] text-[#9fb4bd]">
            Pas encore assez de réponses.
          </p>
          <ul v-else class="m-0 flex list-none flex-col gap-3 p-0">
            <li
              v-for="q in data.missed"
              :key="q.key"
              class="flex flex-col gap-1.5"
            >
              <div class="flex items-baseline justify-between gap-4">
                <span class="text-[15px] leading-snug text-[#e8f1f4]">
                  {{ q.label }}
                </span>
                <span
                  class="shrink-0 font-mono text-sm tabular-nums text-white"
                >
                  {{ q.failRate }} %
                  <span class="text-[#7f97a2]">· {{ q.n }}×</span>
                </span>
              </div>
              <div
                class="h-1.5 overflow-hidden rounded-full bg-[rgba(232,241,244,0.08)]"
              >
                <div
                  class="h-full rounded-full bg-[#7fe3d6]"
                  :style="{ width: `${q.failRate}%` }"
                ></div>
              </div>
              <span
                class="font-mono text-[11px] uppercase tracking-[0.08em] text-[#7f97a2]"
              >
                {{ quizName(q.quiz) }}
              </span>
            </li>
          </ul>
        </section>

        <!-- Classements -->
        <div class="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <section
            v-for="list in rankings"
            :key="list.title"
            :class="[cardBase, 'p-5 sm:p-6', list.wide ? 'lg:col-span-2' : '']"
          >
            <h2
              class="m-0 mb-4 text-xl font-semibold tracking-[-0.01em] text-white"
            >
              {{ list.title }}
            </h2>
            <p v-if="!list.rows.length" class="m-0 text-[15px] text-[#9fb4bd]">
              Rien sur cette période.
            </p>
            <ul v-else class="m-0 flex list-none flex-col gap-2.5 p-0">
              <li
                v-for="row in list.rows"
                :key="row.key"
                class="flex flex-col gap-1"
              >
                <div class="flex items-baseline justify-between gap-4">
                  <span
                    class="min-w-0 break-words text-[15px] text-[#e8f1f4]"
                    :class="list.mono ? 'font-mono text-[13px]' : ''"
                  >
                    {{ row.key }}
                  </span>
                  <span
                    class="shrink-0 font-mono text-sm tabular-nums text-white"
                  >
                    {{ row.n }}
                  </span>
                </div>
                <div
                  class="h-1.5 overflow-hidden rounded-full bg-[rgba(232,241,244,0.08)]"
                >
                  <div
                    class="h-full rounded-full bg-[#7fe3d6]"
                    :style="{ width: `${(row.n / list.rows[0]!.n) * 100}%` }"
                  ></div>
                </div>
              </li>
            </ul>
          </section>
        </div>

        <p class="mt-8 text-[13px] leading-normal text-[#7f97a2]">
          Données anonymes : aucun nom, aucune adresse IP. Un visiteur = un
          navigateur (identifiant aléatoire), donc une même personne sur son
          téléphone et son ordinateur compte deux fois.
        </p>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({ breadcrumb: 'Statistiques' })
useHead({ meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

interface Row {
  key: string
  n: number
}

interface StatsResponse {
  from: string | null
  to: string | null
  totals: {
    visitors: number
    views: number
    quizStarts: number
    quizEnds: number
  }
  perDay: { date: string; visitors: number; views: number; quizzes: number }[]
  pages: Row[]
  modules: Row[]
  fiches: Row[]
  quizzes: {
    key: string
    starts: number
    ends: number
    answered: number
    correct: number
    avg: number | null
  }[]
  missed: {
    key: string
    label: string
    quiz: string
    n: number
    failRate: number
  }[]
}

const PW_KEY = 'dd-stats-pw'
const DAYS_KEY = 'dd-stats-days'
const labelClass =
  'font-mono text-xs uppercase tracking-[0.12em] text-[#7f97a2]'

const periods = [
  { days: 7, label: '7 jours' },
  { days: 30, label: '30 jours' },
  { days: 90, label: '3 mois' },
  { days: 0, label: 'Depuis le début' },
]

const password = ref('')
const days = ref(30)
const data = ref<StatsResponse | null>(null)
const error = ref('')
const loading = ref(false)
const hover = ref<number | null>(null)

const load = async () => {
  if (!password.value) return
  loading.value = true
  error.value = ''
  try {
    data.value = await $fetch<StatsResponse>('/api/stats', {
      query: { days: days.value },
      headers: { 'x-stats-password': password.value },
    })
    try {
      sessionStorage.setItem(PW_KEY, password.value)
    } catch {
      // Storage unavailable: the password will be asked again
    }
  } catch (e: any) {
    data.value = null
    error.value =
      e?.statusCode === 401
        ? 'Mot de passe incorrect.'
        : e?.statusCode === 503
          ? 'Le mot de passe n’est pas configuré sur le serveur (NUXT_STATS_PASSWORD).'
          : 'Impossible de charger les statistiques.'
  } finally {
    loading.value = false
  }
}

const setDays = (d: number) => {
  days.value = d
  try {
    localStorage.setItem(DAYS_KEY, String(d))
  } catch {
    // ignore
  }
  load()
}

const logout = () => {
  try {
    sessionStorage.removeItem(PW_KEY)
  } catch {
    // ignore
  }
  password.value = ''
  data.value = null
}

onMounted(() => {
  try {
    const d = Number(localStorage.getItem(DAYS_KEY))
    if (periods.some((p) => p.days === d)) days.value = d
    password.value = sessionStorage.getItem(PW_KEY) ?? ''
  } catch {
    // ignore
  }
  if (password.value) load()
})

/* ---------- Mise en forme ---------- */

const fmtDate = (iso: string, long = false) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: long ? 'long' : 'short',
    ...(long ? { weekday: 'short' as const } : {}),
  })

const QUIZ_NAMES: Record<string, string> = { n1: 'Niveau 1', n2: 'Niveau 2' }
const MODE_NAMES: Record<string, string> = {
  qcm: 'QCM',
  open: 'Questions ouvertes',
  flashcards: 'Flashcards',
}
const quizName = (key: string) =>
  key
    .split(' · ')
    .map((part) => QUIZ_NAMES[part] ?? MODE_NAMES[part] ?? part)
    .join(' · ')

// Every day of the period, including days without any visit
const series = computed(() => {
  const d = data.value
  if (!d) return []
  const byDate = new Map(d.perDay.map((p) => [p.date, p]))
  const today = new Date().toISOString().slice(0, 10)
  const start = days.value
    ? new Date(Date.now() - (days.value - 1) * 86_400_000)
        .toISOString()
        .slice(0, 10)
    : d.from
  if (!start) return []
  const out: StatsResponse['perDay'] = []
  for (
    let t = new Date(`${start}T00:00:00Z`);
    t.toISOString().slice(0, 10) <= today;
    t = new Date(t.getTime() + 86_400_000)
  ) {
    const date = t.toISOString().slice(0, 10)
    out.push(byDate.get(date) ?? { date, visitors: 0, views: 0, quizzes: 0 })
  }
  return out
})

const maxVisitors = computed(() =>
  Math.max(1, ...series.value.map((d) => d.visitors))
)

const kpis = computed(() => {
  const t = data.value?.totals
  if (!t) return []
  const rate = t.quizStarts ? Math.round((t.quizEnds / t.quizStarts) * 100) : 0
  return [
    { label: 'Visiteurs uniques', value: t.visitors, sub: '' },
    { label: 'Pages vues', value: t.views, sub: '' },
    { label: 'Quiz lancés', value: t.quizStarts, sub: '' },
    {
      label: 'Quiz terminés',
      value: t.quizEnds,
      sub: t.quizStarts ? `${rate} % des quiz lancés` : '',
    },
  ]
})

const rankings = computed(() => {
  const d = data.value
  if (!d) return []
  return [
    {
      title: 'Modules de théorie lus',
      rows: d.modules,
      mono: false,
      wide: false,
    },
    {
      title: 'Fiches matériel ouvertes',
      rows: d.fiches,
      mono: false,
      wide: false,
    },
    { title: 'Pages les plus vues', rows: d.pages, mono: true, wide: true },
  ]
})
</script>
