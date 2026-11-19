// Receives anonymous events from app/utils/track.ts

const str = (v: unknown, max = 160) =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

const VISITOR = /^[a-z0-9-]{8,40}$/
const PATH = /^\/[a-z0-9\-/]{0,100}$/
const VERDICTS = new Set(['ok', 'mid', 'ko'])

export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown>>(event).catch(() => null)
  if (!body || typeof body !== 'object') return { ok: false }

  const vid = str(body.vid, 40)
  const quizKey = () =>
    [str(body.quiz, 20), str(body.mode, 20), str(body.themes, 80)]
      .filter(Boolean)
      .join(' · ')

  await updateToday((day) => {
    if (VISITOR.test(vid) && Object.keys(day.visitors).length < MAX_KEYS * 10)
      day.visitors[vid] = 1

    switch (body.e) {
      case 'view': {
        const path = str(body.path, 100)
        if (PATH.test(path)) bump(day.views, path)
        break
      }
      case 'module':
      case 'fiche': {
        const title = str(body.title, 120)
        if (!title) break
        const key = [str(body.level, 20), title].filter(Boolean).join(' · ')
        bump(body.e === 'module' ? day.modules : day.fiches, key)
        break
      }
      case 'quiz_start':
      case 'quiz_end': {
        const key = quizKey()
        if (!key) break
        if (!day.quizzes[key] && Object.keys(day.quizzes).length >= MAX_KEYS)
          break
        const q = (day.quizzes[key] ??= {
          starts: 0,
          ends: 0,
          answered: 0,
          correct: 0,
        })
        if (body.e === 'quiz_start') q.starts++
        else {
          const total = Math.max(0, Math.min(500, Number(body.total) || 0))
          const correct = Math.max(
            0,
            Math.min(total, Number(body.correct) || 0)
          )
          q.ends++
          q.answered += total
          q.correct += correct
        }
        break
      }
      case 'answer': {
        const key = str(body.key, 160)
        const verdict = str(body.verdict, 3)
        if (!key || !VERDICTS.has(verdict)) break
        if (
          !day.questions[key] &&
          Object.keys(day.questions).length >= MAX_KEYS
        )
          break
        const q = (day.questions[key] ??= {
          label: '',
          quiz: '',
          n: 0,
          ok: 0,
          mid: 0,
        })
        q.label = str(body.label, 220) || key
        q.quiz = str(body.quiz, 20)
        q.n++
        if (verdict === 'ok') q.ok++
        if (verdict === 'mid') q.mid++
        break
      }
    }
  })

  return { ok: true }
})
