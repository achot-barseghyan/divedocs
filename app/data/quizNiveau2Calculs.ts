// Calculation questions for /niveau2/quiz: values are drawn at random
// each time a question is generated, the answer is computed.

import type { OpenQuestion, QcmQuestion } from './quizNiveau2'

interface Calc {
  q: string
  value: number
  unit: string
  r: string // detailed correction
  wrong: number[] // classic mistakes, used as QCM distractors
  dec?: number // decimals shown (default 1)
  tol?: number // tolerance for typed answers (default 2 %)
  label?: (n: number) => string // QCM option text
  k?: string[][] // expected keywords for typed answers
}

/* ---------- Tirage et formatage ---------- */

const pick = <T>(a: T[]): T => a[Math.floor(Math.random() * a.length)]!
const int = (min: number, max: number, step = 1) =>
  min + step * Math.floor(Math.random() * ((max - min) / step + 1))
const round = (n: number, dec = 1) => Math.round(n * 10 ** dec) / 10 ** dec

// 2400 -> "2 400", 2.5 -> "2,5"
const fmt = (n: number, dec = 1) => {
  const [int, frac] = String(Math.abs(round(n, dec))).split('.')
  const grouped = int!.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return (n < 0 ? '−' : '') + grouped + (frac ? `,${frac}` : '')
}
const eq = (n: number, dec = 1) => (round(n, dec) === n ? '=' : '≈')
const bars = (p: number) => `${fmt(p)} ${p >= 2 ? 'bars' : 'bar'}`
const pabs = (depth: number) => 1 + depth / 10

/* ---------- Générateurs ---------- */

const GENERATORS: (() => Calc)[] = [
  // Pression absolue à une profondeur
  () => {
    const d = int(5, 60, 5)
    const P = pabs(d)
    return {
      q: `Quelle est la pression absolue à ${d} m (eau douce, P atm = 1 bar) ?`,
      value: P,
      unit: 'bar',
      label: bars,
      wrong: [d / 10, P + 1, P * 2, 1 + d],
      r: `P abs = P atm + P relative = 1 + ${d} / 10 = ${bars(P)}.`,
    }
  },

  // Profondeur pour une pression absolue
  () => {
    const P = int(15, 70, 5) / 10
    const d = (P - 1) * 10
    return {
      q: `À quelle profondeur la pression absolue vaut-elle ${bars(P)} ?`,
      value: d,
      unit: 'm',
      dec: 0,
      wrong: [P * 10, (P + 1) * 10, d * 2],
      r: `P relative = ${fmt(P)} − 1 = ${bars(P - 1)}, soit ${d} m (1 bar tous les 10 m).`,
    }
  },

  // Volume d'air détendu d'une bouteille
  () => {
    const V = pick([6, 10, 12, 15, 18])
    const p = pick([180, 200, 230])
    return {
      q: `Volume d'air détendu (à 1 bar) d'une bouteille de ${V} L gonflée à ${p} bars ?`,
      value: V * p,
      unit: 'L',
      dec: 0,
      wrong: [V + p, (V * p) / 10, V * p * 2],
      r: `${V} × ${p} = ${fmt(V * p)} L.`,
    }
  },

  // Volume d'air disponible au fond
  () => {
    const V = pick([10, 12, 15])
    const p = pick([200, 230])
    const d = pick([10, 20, 30, 40])
    const P = pabs(d)
    const surface = V * p
    const value = surface / P
    return {
      q: `Volume d'air disponible à ${d} m avec une bouteille de ${V} L gonflée à ${p} bars ?`,
      value,
      unit: 'L',
      dec: 0,
      wrong: [surface / (d / 10), surface, surface * P],
      r: `${V} × ${p} = ${fmt(surface)} L en surface. À ${d} m (${bars(P)}) : ${fmt(surface)} / ${fmt(P)} ${eq(value, 0)} ${fmt(value, 0)} L.`,
    }
  },

  // Gilet non purgé à la remontée
  () => {
    const v = int(2, 20)
    const d = int(10, 40, 5)
    const P = pabs(d)
    return {
      q: `Un plongeur met ${v} L d'air dans son gilet à ${d} m. Quel volume en surface s'il ne purge pas ?`,
      value: v * P,
      unit: 'L',
      wrong: [(v * d) / 10, v / P, v * (P + 1)],
      r: `À ${d} m, P abs = ${bars(P)}. En surface : ${fmt(P)} × ${v} = ${fmt(v * P)} L.`,
    }
  },

  // Ballon descendu en profondeur
  () => {
    const v = pick([3, 4, 6, 8, 9, 10, 12, 15, 20])
    const d = pick([10, 20, 30, 40, 50])
    const P = pabs(d)
    const value = v / P
    return {
      q: `Un ballon contient ${v} L d'air en surface. Quel est son volume à ${d} m ?`,
      value,
      unit: 'L',
      wrong: [v * P, v / (d / 10), v],
      r: `À ${d} m, P abs = ${bars(P)}. ${v} / ${fmt(P)} ${eq(value)} ${fmt(value)} L.`,
    }
  },

  // Consommation au fond
  () => {
    const c = pick([12, 15, 18, 20, 22, 25])
    const d = int(10, 50, 5)
    const P = pabs(d)
    return {
      q: `Un plongeur consomme ${c} L/min en surface. Quelle est sa consommation à ${d} m ?`,
      value: c * P,
      unit: 'L/min',
      wrong: [(c * d) / 10, c, c * (P + 1)],
      r: `Conso au fond = P abs × conso en surface = ${fmt(P)} × ${c} = ${fmt(c * P)} L/min.`,
    }
  },

  // Autonomie au fond
  () => {
    const V = pick([10, 12, 15])
    const p = pick([200, 230])
    const c = pick([15, 20, 25])
    const d = pick([10, 20, 30, 40])
    const P = pabs(d)
    const usable = (p - 50) * V
    const value = usable / (c * P)
    return {
      q: `Bouteille ${V} L à ${p} bars, réserve à 50 bars, consommation ${c} L/min en surface. Autonomie à ${d} m ?`,
      value,
      unit: 'min',
      dec: 0,
      tol: 1,
      wrong: [(p * V) / (c * P), usable / c, usable / ((c * d) / 10)],
      r: `Air utilisable : (${p} − 50) × ${V} = ${fmt(usable)} L. À ${d} m : ${fmt(P)} × ${c} = ${fmt(c * P)} L/min. ${fmt(usable)} / ${fmt(c * P)} ${eq(value, 0)} ${fmt(value, 0)} min.`,
    }
  },

  // Gonflage de la stab en surface
  () => {
    const m = int(65, 100)
    const k = int(3, 15)
    const vol = m - k
    return {
      q: `Un plongeur de ${m} kg (volume ${vol} L avec son équipement) coule en surface. Quel volume d'air minimum doit-il mettre dans sa stab pour flotter ?`,
      value: k,
      unit: 'L',
      dec: 0,
      wrong: [vol, m, k * 2],
      r: `Poids apparent = ${m} − ${vol} = ${k} kg. Il faut plus de ${k} L d'air dans le gilet.`,
    }
  },

  // Lestage pour être neutre
  () => {
    const m = int(55, 95)
    const x = int(6, 14) // the diver alone floats by x kg
    const bloc = pick([
      { type: 'acier', V: 12, kg: 16 },
      { type: 'acier', V: 15, kg: 18 },
      { type: 'alu', V: 12, kg: 15 },
    ])
    const vol = m + x
    const lest = vol + bloc.V - (m + bloc.kg)
    return {
      q: `Eau douce. Plongeur de ${m} kg, volume ${vol} L avec combinaison, bloc ${bloc.type} ${bloc.V} L de ${bloc.kg} kg. Combien de lest pour être neutre ?`,
      value: lest,
      unit: 'kg',
      dec: 0,
      wrong: [x, x + bloc.kg - bloc.V, lest * 2],
      r: `Poids réel = ${m} + ${bloc.kg} = ${m + bloc.kg} kg. Poussée = ${vol} + ${bloc.V} = ${vol + bloc.V} kg. Il flotte : il faut ${lest} kg de lest.`,
    }
  },

  // Changement de bloc acier -> alu
  () => {
    const a = int(15, 17)
    const delta = int(2, 6)
    const b = a - delta
    return {
      q: `Un plongeur remplace son bloc acier 12 L de ${a} kg par un bloc alu 12 L de ${b} kg. Que doit-il faire ?`,
      value: delta,
      unit: 'kg',
      dec: 0,
      label: (n) =>
        n > 0
          ? `Ajouter ${n} kg de lest`
          : n < 0
            ? `Retirer ${-n} kg de lest`
            : 'Ne rien changer',
      wrong: [-delta, 0, delta * 2],
      k: [['ajouter', 'ajout', 'rajout', 'plus', 'augment']],
      r: `Même volume, mais ${delta} kg de moins : son poids réel baisse, il doit ajouter ${delta} kg de lest.`,
    }
  },

  // Temps de palier avant la réserve (plongée à plusieurs niveaux)
  () => {
    for (;;) {
      const V = pick([12, 15])
      const p = 200
      const c = pick([15, 20])
      const d1 = pick([30, 40])
      const t1 = int(5, 10)
      const d2 = pick([15, 20])
      const t2 = int(8, 15)
      const used1 = t1 * pabs(d1) * c
      const used2 = t2 * pabs(d2) * c
      const rem = (p - 50) * V - used1 - used2
      const cPalier = c * 1.3
      if (rem < cPalier * 5) continue // not enough air left: draw again
      const value = rem / cPalier
      return {
        q: `Bloc ${V} L à ${p} bars, consommation ${c} L/min en surface. ${t1} min à ${d1} m puis ${t2} min à ${d2} m. Combien de temps au palier de 3 m avant la réserve (50 bars) ?`,
        value,
        unit: 'min',
        dec: 0,
        tol: 1,
        wrong: [rem / c, (p * V - used1 - used2) / cPalier, rem / (c * 0.3)],
        r: `${d1} m : ${t1} × ${fmt(pabs(d1))} × ${c} = ${fmt(used1)} L. ${d2} m : ${t2} × ${fmt(pabs(d2))} × ${c} = ${fmt(used2)} L. Reste : 150 × ${V} − ${fmt(used1 + used2)} = ${fmt(rem)} L. À 3 m (1,3 bar) : ${fmt(rem)} / ${fmt(cPalier)} ${eq(value, 0)} ${fmt(value, 0)} min.`,
      }
    }
  },
]

/* ---------- Conversion en QCM / question ouverte ---------- */

const toQcm = (c: Calc): QcmQuestion => {
  const dec = c.dec ?? 1
  const label = c.label ?? ((n: number) => `${fmt(n, dec)} ${c.unit}`)
  const answer = round(c.value, dec)
  const options = [label(answer)]
  // Classic mistakes first, then values around the answer if some collide
  const candidates = [
    ...c.wrong,
    ...[1.5, 0.5, 2, 0.75, 1.25, 3].map((f) => c.value * f),
  ]
  for (const w of candidates) {
    if (options.length === 4) break
    const n = round(w, dec)
    if (!Number.isFinite(n) || (!c.label && n <= 0)) continue
    const text = label(n)
    if (!options.includes(text)) options.push(text)
  }
  return { t: 'phy', q: c.q, o: options, c: [0], e: c.r }
}

const toOpen = (c: Calc): OpenQuestion => ({
  t: 'phy',
  q: c.q,
  r: c.r,
  n: [round(c.value, c.dec ?? 1)],
  tol: c.tol,
  k: c.k,
})

// Names shown on /admin/stats, in the same order as GENERATORS
const NAMES = [
  'Pression absolue à une profondeur',
  'Profondeur pour une pression absolue',
  "Volume d'air détendu d'une bouteille",
  "Volume d'air disponible au fond",
  'Gilet non purgé à la remontée',
  'Ballon descendu en profondeur',
  'Consommation au fond',
  'Autonomie au fond',
  'Volume à mettre dans la stab',
  'Lestage pour être neutre',
  'Changement de bloc acier → alu',
  'Temps de palier avant la réserve',
]

// Generated questions share a stable stats key per generator
const stamp = <Q extends object>(q: Q, i: number): Q => ({
  ...q,
  key: `calc-${i}`,
  keyLabel: `Calcul : ${NAMES[i] ?? i + 1} (chiffres variables)`,
})

export const QCM_CALC = GENERATORS.map((gen, i) => ({
  t: 'phy' as const,
  gen: () => stamp(toQcm(gen()), i),
}))

export const OPEN_CALC = GENERATORS.map((gen, i) => ({
  t: 'phy' as const,
  gen: () => stamp(toOpen(gen()), i),
}))
