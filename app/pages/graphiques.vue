<template>
  <div class="font-grotesk text-[#e8f1f4] antialiased">
    <UiPageBackground />

    <main class="mx-auto max-w-[1280px] px-8 pb-24">
      <UiPageHero
        eyebrow="Données & physique"
        title="Graphiques & Visualisations"
        subtitle="Physique de la plongée, décompression et données de sécurité"
        size="md"
      />

      <!-- ===== PHYSIQUE ===== -->
      <section>
        <UiSectionHeading>Physique de la plongée</UiSectionHeading>
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <article :class="chartCard">
            <h3 :class="chartTitle">Loi de Mariotte — P × V = constante</h3>
            <p :class="chartDesc">
              Volume d'un poumon / espace gazeux en fonction de la profondeur
            </p>
            <Chart
              type="line"
              :data="boyleData"
              :options="boyleOptions"
              class="h-64"
            />
            <div :class="statStrip" class="grid-cols-3">
              <div
                v-for="stat in boyleStats"
                :key="stat.label"
                :class="statCell"
              >
                <span class="text-2xl font-semibold text-[#7fe3d6]">
                  {{ stat.value }}
                </span>
                <span :class="statLabel">{{ stat.label }}</span>
              </div>
            </div>
          </article>

          <article :class="chartCard">
            <h3 :class="chartTitle">Pression absolue selon la profondeur</h3>
            <p :class="chartDesc">En bar — 1 bar tous les 10 m en eau de mer</p>
            <Chart
              type="bar"
              :data="pressureData"
              :options="pressureOptions"
              class="h-64"
            />
            <p :class="chartNote">P (bar) = profondeur (m) / 10 + 1</p>
          </article>

          <article :class="chartCard">
            <h3 :class="chartTitle">Consommation d'air selon la profondeur</h3>
            <p :class="chartDesc">
              Litres consommés par minute pour un effort donné (base 20 L/min
              surface)
            </p>
            <Chart
              type="line"
              :data="airConsumptionData"
              :options="airOptions"
              class="h-64"
            />
          </article>

          <article :class="chartCard">
            <h3 :class="chartTitle">Volume de la combinaison vs profondeur</h3>
            <p :class="chartDesc">
              Compression du néoprène — perte de flottabilité en fonction de la
              profondeur
            </p>
            <Chart
              type="line"
              :data="wetsuiteData"
              :options="lineOptions"
              class="h-64"
            />
          </article>
        </div>
      </section>

      <!-- ===== DÉCOMPRESSION ===== -->
      <section class="mt-20">
        <UiSectionHeading>Décompression &amp; azote</UiSectionHeading>
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <article :class="[chartCard, 'lg:col-span-2']">
            <h3 :class="chartTitle">
              Courbe de sécurité — Zone sans palier (MN90 / FFESSM)
            </h3>
            <p :class="chartDesc">
              Profondeur versus durée de fond — première plongée de la journée
            </p>
            <Chart
              type="scatter"
              :data="safeZoneCurveData"
              :options="safeZoneCurveOptions"
              class="h-80"
            />
            <div :class="legendRow">
              <span class="flex items-center gap-2">
                <span class="inline-block h-0.5 w-6 bg-[#f5d547]"></span>
                Courbe de sécurité (LSP)
              </span>
              <span class="flex items-center gap-2">
                <span
                  class="inline-block h-2.5 w-2.5 rounded-full bg-[#ff8f80]"
                ></span>
                Valeurs tabulées MN90
              </span>
              <span class="flex items-center gap-2">
                <span
                  class="inline-block h-3 w-6 rounded-sm bg-[rgba(127,227,214,0.18)]"
                ></span>
                Zone sans palier obligatoire
              </span>
              <span>* 10 m → 5h30 (hors échelle)</span>
            </div>
          </article>

          <article :class="chartCard">
            <h3 :class="chartTitle">Courbe de sécurité MN90</h3>
            <p :class="chartDesc">
              Limite sans palier (LSP) en minutes selon la profondeur
            </p>
            <Chart
              type="line"
              :data="noStopData"
              :options="noStopOptions"
              class="h-64"
            />
            <p :class="chartNote">
              Sous la courbe = sans palier · Au-dessus = paliers obligatoires
            </p>
          </article>

          <article :class="chartCard">
            <h3 :class="chartTitle">Palier à 3 m selon dépassement LSP</h3>
            <p :class="chartDesc">
              Durée du palier en fonction du temps passé au-delà de la LSP à 20
              m
            </p>
            <Chart
              type="bar"
              :data="stopTimeData"
              :options="stopTimeOptions"
              class="h-64"
            />
            <div :class="legendRow">
              <span class="flex items-center gap-2">
                <span
                  class="inline-block h-3 w-3 rounded-sm bg-[#7fe3d6]"
                ></span>
                Sans palier
              </span>
              <span class="flex items-center gap-2">
                <span
                  class="inline-block h-3 w-3 rounded-sm bg-[#ff8f80]"
                ></span>
                Palier obligatoire
              </span>
            </div>
          </article>

          <article :class="[chartCard, 'lg:col-span-2']">
            <h3 :class="chartTitle">Saturation / désaturation de l'azote</h3>
            <p :class="chartDesc">
              Évolution schématique de la charge en azote sur un profil typique
              (descente → fond → remontée avec palier)
            </p>
            <Chart
              type="line"
              :data="saturationData"
              :options="saturationOptions"
              class="h-72"
            />
            <div :class="legendRow">
              <span class="flex items-center gap-2">
                <span class="inline-block h-0.5 w-6 bg-[#7fe3d6]"></span>
                Charge N₂ (% limite)
              </span>
              <span class="flex items-center gap-2">
                <span
                  class="inline-block w-6 border-t-2 border-dashed border-[#ff8f80]"
                ></span>
                Seuil de supersaturation
              </span>
            </div>
          </article>
        </div>
      </section>

      <!-- ===== ACCIDENTOLOGIE ===== -->
      <section class="mt-20">
        <UiSectionHeading>Accidentologie</UiSectionHeading>
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <article :class="chartCard">
            <h3 :class="chartTitle">Répartition des accidents</h3>
            <p :class="chartDesc">Sources : rapports FFESSM / DAN France</p>
            <Chart
              type="doughnut"
              :data="accidentTypeData"
              :options="doughnutOptions"
              class="h-72"
            />
          </article>

          <article :class="chartCard">
            <h3 :class="chartTitle">Profondeur lors de l'accident</h3>
            <p :class="chartDesc">
              % des accidents selon la tranche de profondeur
            </p>
            <Chart
              type="bar"
              :data="accidentDepthData"
              :options="accidentDepthOptions"
              class="h-72"
            />
          </article>

          <article :class="chartCard">
            <h3 :class="chartTitle">Facteurs contributifs</h3>
            <p :class="chartDesc">
              Principaux facteurs identifiés dans les rapports d'accident
            </p>
            <Chart
              type="radar"
              :data="riskFactorData"
              :options="radarOptions"
              class="h-72"
            />
          </article>
        </div>

        <p
          class="mt-4 rounded-[14px] border border-[rgba(245,213,71,0.25)] bg-[rgba(245,213,71,0.05)] px-5 py-4 text-sm leading-relaxed text-[#d4e2e7]"
        >
          Données indicatives à visée pédagogique. Pour des statistiques
          officielles, consultez les rapports annuels FFESSM et DAN Europe.
        </p>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ChartJS from 'chart.js/auto'

definePageMeta({ breadcrumb: 'Graphiques' })

// Site palette (dark only). Single series use aqua; the 2-series and 6-category
// charts use the validated dark categorical slots (blue, orange, aqua, yellow, magenta, green).
const aqua = '#7fe3d6'
const yellow = '#f5d547'
const coral = '#ff8f80'
const series = [
  '#3987e5',
  '#d95926',
  '#199e70',
  '#c98500',
  '#d55181',
  '#008300',
]
const aquaFill = 'rgba(127,227,214,0.12)'

const gridColor = 'rgba(232,241,244,0.08)'
const tickColor = '#7f97a2'
const tooltipBg = '#0b2130'

// Chart text in the site fonts (PrimeVue's <Chart> uses this same chart.js/auto instance)
ChartJS.defaults.font.family = "'Familjen Grotesk', system-ui, sans-serif"
ChartJS.defaults.font.size = 12
ChartJS.defaults.color = tickColor
ChartJS.defaults.borderColor = gridColor
Object.assign(ChartJS.defaults.plugins.tooltip, {
  backgroundColor: tooltipBg,
  borderColor: 'rgba(232,241,244,0.12)',
  borderWidth: 1,
  padding: 10,
  cornerRadius: 8,
  titleColor: '#e8f1f4',
  bodyColor: '#d4e2e7',
})

const chartCard = `${cardBase} flex flex-col p-6`
const chartTitle = 'm-0 text-lg font-semibold tracking-[-0.01em] text-white'
const chartDesc = 'mb-5 mt-1 text-sm leading-normal text-[#9fb4bd]'
const chartNote = 'mt-3 text-center font-mono text-xs text-[#7f97a2]'
const legendRow =
  'mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#b7c9d1]'
const statStrip =
  'mt-5 grid gap-px overflow-hidden rounded-xl border border-[rgba(232,241,244,0.1)] bg-[rgba(232,241,244,0.1)]'
const statCell = 'flex flex-col gap-1 bg-[#0b2130] px-4 py-3'
const statLabel =
  'font-mono text-[11px] uppercase tracking-[0.08em] text-[#7f97a2]'

const boyleStats = [
  { value: '× 2', label: 'Pression à 10 m' },
  { value: '÷ 2', label: 'Volume à 10 m' },
  { value: '÷ 4', label: 'Volume à 30 m' },
]

const baseLineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {},
  },
  scales: {
    x: {
      grid: { color: gridColor },
      ticks: { color: tickColor },
    },
    y: {
      grid: { color: gridColor },
      ticks: { color: tickColor },
    },
  },
}

const lineOptions = baseLineOptions

// ── Loi de Mariotte ─────────────────────────────────────────────────────────
const depths = [0, 5, 10, 15, 20, 25, 30, 35, 40]
const boyleData = computed(() => ({
  labels: depths.map((d) => `${d} m`),
  datasets: [
    {
      label: 'Volume relatif',
      data: depths.map((d) => +(1 / (d / 10 + 1)).toFixed(3)),
      borderColor: aqua,
      backgroundColor: aquaFill,
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: aqua,
    },
  ],
}))

const boyleOptions = {
  ...baseLineOptions,
  plugins: {
    ...baseLineOptions.plugins,
    legend: { display: false },
    tooltip: {
      ...baseLineOptions.plugins.tooltip,
      callbacks: {
        label: (ctx: any) =>
          ` Volume : ${(ctx.raw * 100).toFixed(1)} % du volume surface`,
      },
    },
  },
  scales: {
    x: { ...baseLineOptions.scales.x },
    y: {
      ...baseLineOptions.scales.y,
      min: 0,
      max: 1.05,
      ticks: {
        color: tickColor,
        callback: (v: any) => `${(v * 100).toFixed(0)} %`,
      },
    },
  },
}

// ── Pression absolue ─────────────────────────────────────────────────────────
const pressureDepths = [0, 10, 20, 30, 40, 50, 60]
const pressureData = computed(() => ({
  labels: pressureDepths.map((d) => `${d} m`),
  datasets: [
    {
      label: 'Pression (bar)',
      data: pressureDepths.map((d) => +(d / 10 + 1).toFixed(1)),
      backgroundColor: aqua,
      borderRadius: 4,
      borderSkipped: 'bottom',
      maxBarThickness: 36,
    },
  ],
}))

const pressureOptions = {
  ...baseLineOptions,
  scales: {
    x: { ...baseLineOptions.scales.x },
    y: {
      ...baseLineOptions.scales.y,
      title: { display: true, text: 'Pression (bar)', color: tickColor },
    },
  },
}

// ── Consommation d'air ───────────────────────────────────────────────────────
const airConsumptionData = computed(() => ({
  labels: depths.map((d) => `${d} m`),
  datasets: [
    {
      label: 'Repos (20 L/min surface)',
      data: depths.map((d) => +(20 * (d / 10 + 1)).toFixed(0)),
      borderColor: series[0],
      backgroundColor: series[0],
      borderWidth: 2,
      tension: 0.4,
      fill: false,
      pointBackgroundColor: series[0],
    },
    {
      label: 'Effort modéré (40 L/min surface)',
      data: depths.map((d) => +(40 * (d / 10 + 1)).toFixed(0)),
      borderColor: series[1],
      backgroundColor: series[1],
      borderWidth: 2,
      tension: 0.4,
      fill: false,
      pointBackgroundColor: series[1],
    },
  ],
}))

const airOptions = {
  ...baseLineOptions,
  plugins: {
    ...baseLineOptions.plugins,
    legend: {
      display: true,
      position: 'bottom' as const,
      labels: {
        boxWidth: 12,
        boxHeight: 12,
        useBorderRadius: true,
        borderRadius: 3,
      },
    },
  },
}

// ── Compression néoprène ─────────────────────────────────────────────────────
const wetsuiteData = computed(() => ({
  labels: depths.map((d) => `${d} m`),
  datasets: [
    {
      label: 'Volume combinaison 5mm (L)',
      data: depths.map((d) => +(8 / (d / 10 + 1)).toFixed(2)),
      borderColor: aqua,
      backgroundColor: aquaFill,
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: aqua,
    },
  ],
}))

// ── Courbe de sécurité — graphique interactif Chart.js ─────────────────────────
const safeZoneCurveData = computed(() => ({
  datasets: [
    {
      type: 'line',
      showLine: false,
      data: [
        { x: 0, y: 0 },
        { x: 80, y: 0 },
      ],
      borderColor: 'transparent',
      backgroundColor: 'rgba(127,227,214,0.18)',
      borderWidth: 0,
      pointRadius: 0,
      fill: '+1',
      tension: 0.1,
      label: '',
    },
    {
      type: 'line',
      showLine: true,
      data: [
        { x: 0, y: 40 },
        { x: 5, y: 40 },
        { x: 10, y: 35 },
        { x: 10, y: 30 },
        { x: 20, y: 25 },
        { x: 40, y: 20 },
        { x: 75, y: 15 },
        { x: 80, y: 15 },
      ],
      borderColor: yellow,
      backgroundColor: 'transparent',
      borderWidth: 2.5,
      fill: false,
      tension: 0,
      pointRadius: 0,
      label: 'Limite Sans Palier (MN90)',
    },
    {
      type: 'scatter',
      data: [
        { x: 5, y: 40 },
        { x: 10, y: 35 },
        { x: 10, y: 30 },
        { x: 20, y: 25 },
        { x: 40, y: 20 },
        { x: 75, y: 15 },
      ],
      backgroundColor: coral,
      borderColor: tooltipBg,
      borderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 9,
      label: 'Valeurs tabulées',
    },
  ],
}))

const safeZoneCurveOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      filter: (item: any) => item.datasetIndex === 2,
      callbacks: {
        title: (items: any[]) => `Profondeur : ${items[0].raw.y} m`,
        label: (item: any) => ` LSP : ${item.raw.x} min`,
      },
    },
  },
  scales: {
    x: {
      type: 'linear',
      min: 0,
      max: 80,
      grid: { color: gridColor },
      title: {
        display: true,
        text: 'Durée de plongée (min)',
        color: tickColor,
      },
      ticks: {
        color: tickColor,
        callback: (v: any) => {
          const labels: Record<number, string> = {
            0: '0',
            10: '10',
            20: '20',
            30: '30',
            40: '40',
            60: '60 min',
            75: '1h15',
          }
          return labels[v] ?? ''
        },
        maxTicksLimit: 10,
      },
    },
    y: {
      type: 'linear',
      reverse: true,
      min: 0,
      max: 42,
      grid: { color: gridColor },
      title: { display: true, text: 'Profondeur (m)', color: tickColor },
      ticks: {
        color: tickColor,
        stepSize: 5,
        callback: (v: any) => (v === 0 ? 'Surface' : `${v} m`),
      },
    },
  },
}

// ── Courbe de sécurité MN90 ───────────────────────────────────────────────────
const lspDepths = [12, 15, 18, 20, 22, 25, 28, 30, 35, 40]
const lspValues = [135, 75, 50, 40, 30, 20, 15, 12, 8, 5]

const noStopData = computed(() => ({
  labels: lspDepths.map((d) => `${d} m`),
  datasets: [
    {
      label: 'LSP (min)',
      data: lspValues,
      borderColor: aqua,
      backgroundColor: aquaFill,
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: aqua,
      pointRadius: 4,
    },
  ],
}))

const noStopOptions = {
  ...baseLineOptions,
  plugins: {
    ...baseLineOptions.plugins,
    legend: { display: false },
    tooltip: {
      ...baseLineOptions.plugins.tooltip,
      callbacks: {
        label: (ctx: any) => ` LSP : ${ctx.raw} min`,
      },
    },
  },
  scales: {
    x: { ...baseLineOptions.scales.x },
    y: {
      ...baseLineOptions.scales.y,
      title: { display: true, text: 'Durée (min)', color: tickColor },
    },
  },
}

// ── Palier à 3 m selon dépassement LSP à 20 m ────────────────────────────────
const overshoot = [0, 10, 20, 35, 50, 80]
const stopDurations = [0, 9, 14, 24, 35, 55]

const stopTimeData = computed(() => ({
  labels: overshoot.map((v) => (v === 0 ? 'LSP (40 min)' : `+${v} min`)),
  datasets: [
    {
      label: 'Palier 3 m (min)',
      data: stopDurations,
      backgroundColor: overshoot.map((v) => (v === 0 ? aqua : coral)),
      borderRadius: 4,
      borderSkipped: 'bottom',
      maxBarThickness: 36,
    },
  ],
}))

const stopTimeOptions = {
  ...baseLineOptions,
  scales: {
    x: { ...baseLineOptions.scales.x },
    y: {
      ...baseLineOptions.scales.y,
      title: { display: true, text: 'Palier 3 m (min)', color: tickColor },
    },
  },
}

// ── Saturation azote ──────────────────────────────────────────────────────────
const satLabels = [
  '0',
  '2',
  '5',
  '10',
  '15',
  '20',
  '25',
  '30',
  '33',
  '36',
  '39',
  '42',
  '45',
  '48',
  '51',
  '54',
  '57',
]
const satValues = [
  10, 15, 30, 55, 70, 80, 86, 90, 88, 85, 70, 55, 42, 30, 20, 14, 10,
]

const saturationData = computed(() => ({
  labels: satLabels.map((t) => `${t} min`),
  datasets: [
    {
      label: 'Charge N₂',
      data: satValues,
      borderColor: aqua,
      backgroundColor: aquaFill,
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointRadius: 0,
    },
    {
      label: 'Seuil supersaturation',
      data: satLabels.map(() => 85),
      borderColor: coral,
      borderDash: [6, 4],
      borderWidth: 1.5,
      pointRadius: 0,
      fill: false,
    },
  ],
}))

const saturationOptions = {
  ...baseLineOptions,
  plugins: {
    ...baseLineOptions.plugins,
    legend: { display: false },
    annotation: {
      annotations: {
        line1: {
          type: 'line',
          xMin: '30 min',
          xMax: '30 min',
          borderColor: yellow,
          borderWidth: 1.5,
          label: { content: 'Remontée', enabled: true },
        },
      },
    },
  },
  scales: {
    x: { ...baseLineOptions.scales.x },
    y: {
      ...baseLineOptions.scales.y,
      min: 0,
      max: 110,
      ticks: { color: tickColor, callback: (v: any) => `${v} %` },
    },
  },
}

// ── Accidents — type ──────────────────────────────────────────────────────────
const accidentTypeData = computed(() => ({
  labels: [
    'ADD (désaturation)',
    'Barotraumatismes',
    'Noyade',
    'Essoufflement',
    'Malaise cardiaque',
    'Autres',
  ],
  datasets: [
    {
      data: [32, 22, 18, 12, 10, 6],
      backgroundColor: series,
      // 2px surface gap between segments
      borderColor: '#0f2331',
      borderWidth: 2,
    },
  ],
}))

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom' as const,
      labels: {
        boxWidth: 10,
        boxHeight: 10,
        useBorderRadius: true,
        borderRadius: 3,
        padding: 10,
        font: { size: 11 },
      },
    },
    tooltip: {},
  },
}

// ── Accidents — profondeur ────────────────────────────────────────────────────
const accidentDepthData = computed(() => ({
  labels: ['< 10 m', '10–20 m', '20–30 m', '30–40 m', '> 40 m'],
  datasets: [
    {
      label: '% accidents',
      data: [15, 28, 32, 18, 7],
      backgroundColor: aqua,
      borderRadius: 4,
      borderSkipped: 'bottom',
      maxBarThickness: 36,
    },
  ],
}))

const accidentDepthOptions = {
  ...baseLineOptions,
  scales: {
    x: { ...baseLineOptions.scales.x },
    y: {
      ...baseLineOptions.scales.y,
      ticks: { color: tickColor, callback: (v: any) => `${v} %` },
    },
  },
}

// ── Facteurs de risque ────────────────────────────────────────────────────────
const riskFactorData = computed(() => ({
  labels: [
    'Fatigue',
    'Mauvaise planification',
    'Manque formation',
    'Conditions météo',
    'Matériel défectueux',
    'Erreur binôme',
  ],
  datasets: [
    {
      label: 'Fréquence relative (%)',
      data: [65, 70, 55, 45, 30, 40],
      backgroundColor: aquaFill,
      borderColor: aqua,
      pointBackgroundColor: aqua,
      borderWidth: 2,
    },
  ],
}))

const radarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {},
  },
  scales: {
    r: {
      min: 0,
      max: 100,
      grid: { color: gridColor },
      angleLines: { color: gridColor },
      pointLabels: { color: '#b7c9d1', font: { size: 11 } },
      ticks: { color: tickColor, backdropColor: 'transparent', stepSize: 25 },
    },
  },
}

useHead({
  title: 'Graphiques — Physique & Sécurité plongée',
  meta: [
    {
      name: 'description',
      content:
        "Visualisations interactives : physique de la plongée, décompression, courbe de sécurité MN90 et données d'accidentologie.",
    },
  ],
})
</script>
