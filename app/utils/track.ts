// Anonymous usage tracking, read on the hidden page /admin/stats.
// Sends counters only: no name, no account. The visitor id is a random value
// kept in this browser, used to count unique visitors.

export type TrackEvent =
  | { e: 'view'; path: string }
  | { e: 'module' | 'fiche'; level: string; title: string }
  | { e: 'quiz_start'; quiz: string; mode: string; themes: string }
  | {
      e: 'quiz_end'
      quiz: string
      mode: string
      themes: string
      total: number
      correct: number
    }
  | {
      e: 'answer'
      quiz: string
      key: string
      label: string
      verdict: 'ok' | 'mid' | 'ko'
    }

const VID_KEY = 'dd-vid'

const visitorId = () => {
  try {
    let id = localStorage.getItem(VID_KEY)
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem(VID_KEY, id)
    }
    return id
  } catch {
    return ''
  }
}

export const track = (event: TrackEvent) => {
  if (import.meta.server) return
  // Don't count the stats page itself
  if (location.pathname.startsWith('/admin')) return
  fetch('/api/track', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...event, vid: visitorId() }),
    keepalive: true,
  }).catch(() => {
    // Stats are best effort: never bother the user
  })
}
