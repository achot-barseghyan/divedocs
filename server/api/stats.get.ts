// Aggregated stats for the hidden page /admin/stats.
// Protected by the NUXT_STATS_PASSWORD environment variable.

import type { QuestionCounter, QuizCounter } from '../utils/stats'

// Constant-time comparison (no node:crypto, so it also runs on edge hosts)
const sameSecret = (a: string, b: string) => {
  let diff = a.length ^ b.length
  for (let i = 0; i < Math.max(a.length, b.length); i++)
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0)
  return diff === 0
}

const top = (map: Record<string, number>, limit = 30) =>
  Object.entries(map)
    .map(([key, n]) => ({ key, n }))
    .sort((a, b) => b.n - a.n)
    .slice(0, limit)

export default defineEventHandler(async (event) => {
  const { statsPassword } = useRuntimeConfig(event)
  const given = getHeader(event, 'x-stats-password') ?? ''
  if (!statsPassword) {
    throw createError({
      statusCode: 503,
      statusMessage: 'NUXT_STATS_PASSWORD non configuré',
    })
  }
  if (!sameSecret(given, statsPassword)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Mot de passe incorrect',
    })
  }

  // days=0 means since the beginning
  const days = Math.max(0, Math.min(3650, Number(getQuery(event).days) || 0))
  const from = days
    ? dayKey(new Date(Date.now() - (days - 1) * 86_400_000))
    : '0000-00-00'
  const keys = (await listDays()).filter((k) => k >= from)

  const visitors = new Set<string>()
  const views: Record<string, number> = {}
  const modules: Record<string, number> = {}
  const fiches: Record<string, number> = {}
  const quizzes: Record<string, QuizCounter> = {}
  const questions: Record<string, QuestionCounter> = {}
  const perDay: {
    date: string
    visitors: number
    views: number
    quizzes: number
  }[] = []

  for (const key of keys) {
    const day = await readDay(key)
    Object.keys(day.visitors).forEach((v) => visitors.add(v))
    let dayViews = 0
    let dayQuizzes = 0
    for (const [k, n] of Object.entries(day.views)) {
      views[k] = (views[k] ?? 0) + n
      dayViews += n
    }
    for (const [k, n] of Object.entries(day.modules))
      modules[k] = (modules[k] ?? 0) + n
    for (const [k, n] of Object.entries(day.fiches))
      fiches[k] = (fiches[k] ?? 0) + n
    for (const [k, q] of Object.entries(day.quizzes)) {
      const acc = (quizzes[k] ??= {
        starts: 0,
        ends: 0,
        answered: 0,
        correct: 0,
      })
      acc.starts += q.starts
      acc.ends += q.ends
      acc.answered += q.answered
      acc.correct += q.correct
      dayQuizzes += q.starts
    }
    for (const [k, q] of Object.entries(day.questions)) {
      const acc = (questions[k] ??= { ...q, n: 0, ok: 0, mid: 0 })
      acc.label = q.label
      acc.n += q.n
      acc.ok += q.ok
      acc.mid += q.mid
    }
    perDay.push({
      date: key,
      visitors: Object.keys(day.visitors).length,
      views: dayViews,
      quizzes: dayQuizzes,
    })
  }

  const quizList = Object.entries(quizzes)
    .map(([key, q]) => ({
      key,
      ...q,
      avg: q.answered ? Math.round((q.correct / q.answered) * 100) : null,
    }))
    .sort((a, b) => b.starts - a.starts)

  // Most missed questions, among those answered at least 3 times
  const missed = Object.entries(questions)
    .map(([key, q]) => ({
      key,
      label: q.label,
      quiz: q.quiz,
      n: q.n,
      failRate: Math.round(((q.n - q.ok) / q.n) * 100),
    }))
    .filter((q) => q.n >= 3)
    .sort((a, b) => b.failRate - a.failRate || b.n - a.n)
    .slice(0, 20)

  return {
    from: keys[0] ?? null,
    to: keys.at(-1) ?? null,
    totals: {
      visitors: visitors.size,
      views: Object.values(views).reduce((a, b) => a + b, 0),
      quizStarts: quizList.reduce((a, q) => a + q.starts, 0),
      quizEnds: quizList.reduce((a, q) => a + q.ends, 0),
    },
    perDay,
    pages: top(views),
    modules: top(modules),
    fiches: top(fiches),
    quizzes: quizList,
    missed,
  }
})
