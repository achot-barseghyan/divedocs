<template>
  <div class="mb-8 min-h-screen text-white">
    <div class="relative overflow-hidden px-4 py-16">
      <div class="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <h1 class="mb-4 text-5xl font-bold">
          <span class="text-teal-400">Graphiques</span>
          &
          <span class="text-yellow-500">Visualisations</span>
        </h1>
        <p class="mx-auto max-w-3xl text-xl text-gray-300">
          Physique de la plongée, décompression et données de sécurité
        </p>
      </div>
    </div>

    <div class="mx-auto max-w-7xl space-y-10 px-6 pb-16">
      <!-- ===== SECTION PHYSIQUE ===== -->
      <section>
        <h2
          class="mb-6 flex items-center gap-3 text-2xl font-bold text-teal-300"
        >
          <Icon name="mdi:atom" />
          Physique de la plongée
        </h2>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <!-- Loi de Mariotte — Pression/Volume -->
          <div
            class="rounded-2xl border border-teal-500/20 bg-slate-800/40 p-6"
          >
            <h3 class="mb-1 text-lg font-semibold text-white">
              Loi de Mariotte — P × V = constante
            </h3>
            <p class="mb-4 text-sm text-gray-400">
              Volume d'un poumon / espace gazeux en fonction de la profondeur
            </p>
            <Chart
              type="line"
              :data="boyleData"
              :options="boyleOptions"
              class="h-64"
            />
            <div class="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
              <div class="rounded-xl bg-slate-700/50 p-3">
                <div class="text-xl font-bold text-teal-400">× 2</div>
                <div class="text-gray-400">Pression à 10 m</div>
              </div>
              <div class="rounded-xl bg-slate-700/50 p-3">
                <div class="text-xl font-bold text-yellow-400">÷ 2</div>
                <div class="text-gray-400">Volume à 10 m</div>
              </div>
              <div class="rounded-xl bg-slate-700/50 p-3">
                <div class="text-xl font-bold text-orange-400">÷ 4</div>
                <div class="text-gray-400">Volume à 30 m</div>
              </div>
            </div>
          </div>

          <!-- Pression absolue selon profondeur -->
          <div
            class="rounded-2xl border border-teal-500/20 bg-slate-800/40 p-6"
          >
            <h3 class="mb-1 text-lg font-semibold text-white">
              Pression absolue selon la profondeur
            </h3>
            <p class="mb-4 text-sm text-gray-400">
              En bar — 1 bar tous les 10 m en eau de mer
            </p>
            <Chart
              type="bar"
              :data="pressureData"
              :options="pressureOptions"
              class="h-64"
            />
            <p class="mt-3 text-center text-xs text-gray-500">
              P (bar) = profondeur (m) / 10 + 1
            </p>
          </div>

          <!-- Densité de l'air respiré -->
          <div
            class="rounded-2xl border border-teal-500/20 bg-slate-800/40 p-6"
          >
            <h3 class="mb-1 text-lg font-semibold text-white">
              Consommation d'air selon la profondeur
            </h3>
            <p class="mb-4 text-sm text-gray-400">
              Litres consommés par minute pour un effort donné (base 20 L/min
              surface)
            </p>
            <Chart
              type="line"
              :data="airConsumptionData"
              :options="lineOptions"
              class="h-64"
            />
          </div>

          <!-- Flottabilité — poussée d'Archimède -->
          <div
            class="rounded-2xl border border-teal-500/20 bg-slate-800/40 p-6"
          >
            <h3 class="mb-1 text-lg font-semibold text-white">
              Volume de la combinaison vs profondeur
            </h3>
            <p class="mb-4 text-sm text-gray-400">
              Compression du néoprène — perte de flottabilité en fonction de la
              profondeur
            </p>
            <Chart
              type="line"
              :data="wetsuiteData"
              :options="lineOptions"
              class="h-64"
            />
          </div>
        </div>
      </section>

      <!-- ===== SECTION DÉCOMPRESSION ===== -->
      <section>
        <h2
          class="mb-6 flex items-center gap-3 text-2xl font-bold text-yellow-300"
        >
          <Icon name="mdi:lungs" />
          Décompression & azote
        </h2>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <!-- Courbe de sécurité MN90 — version visuelle fidèle à l'image -->
          <div
            class="rounded-2xl border border-yellow-500/20 bg-slate-800/40 p-6 lg:col-span-2"
          >
            <h3 class="mb-1 text-lg font-semibold text-white">
              Courbe de sécurité — Zone sans palier (MN90 / FFESSM)
            </h3>
            <p class="mb-4 text-sm text-gray-400">
              Profondeur versus durée de fond — première plongée de la journée
            </p>
            <Chart
              type="scatter"
              :data="safeZoneCurveData"
              :options="safeZoneCurveOptions"
              class="h-80"
            />
            <div
              class="mt-3 flex flex-wrap justify-center gap-6 text-xs text-gray-400"
            >
              <div class="flex items-center gap-2">
                <span class="inline-block h-0.5 w-6 bg-yellow-400"></span>
                Courbe de sécurité (LSP)
              </div>
              <div class="flex items-center gap-2">
                <span
                  class="inline-block h-2.5 w-2.5 rounded-full bg-red-500"
                ></span>
                Valeurs tabulées MN90
              </div>
              <div class="flex items-center gap-2">
                <span class="inline-block h-3 w-6 rounded bg-sky-400/30"></span>
                Zone sans palier obligatoire
              </div>
              <span class="text-gray-500">* 10 m → 5h30 (hors échelle)</span>
            </div>
          </div>

          <!-- LSP selon profondeur — courbe simple -->
          <div
            class="rounded-2xl border border-yellow-500/20 bg-slate-800/40 p-6"
          >
            <h3 class="mb-1 text-lg font-semibold text-white">
              Courbe de sécurité MN90
            </h3>
            <p class="mb-4 text-sm text-gray-400">
              Limite sans palier (LSP) en minutes selon la profondeur
            </p>
            <Chart
              type="line"
              :data="noStopData"
              :options="noStopOptions"
              class="h-64"
            />
            <p class="mt-3 text-center text-xs text-gray-500">
              Zone verte = sans palier · Zone orange = paliers obligatoires
            </p>
          </div>

          <!-- Temps de palier selon dépassement de LSP -->
          <div
            class="rounded-2xl border border-yellow-500/20 bg-slate-800/40 p-6"
          >
            <h3 class="mb-1 text-lg font-semibold text-white">
              Palier à 3 m selon dépassement LSP
            </h3>
            <p class="mb-4 text-sm text-gray-400">
              Durée du palier en fonction du temps passé au-delà de la LSP à 20
              m
            </p>
            <Chart
              type="bar"
              :data="stopTimeData"
              :options="stopTimeOptions"
              class="h-64"
            />
          </div>

          <!-- Saturation azote conceptuelle -->
          <div
            class="rounded-2xl border border-yellow-500/20 bg-slate-800/40 p-6 lg:col-span-2"
          >
            <h3 class="mb-1 text-lg font-semibold text-white">
              Saturation / désaturation de l'azote
            </h3>
            <p class="mb-4 text-sm text-gray-400">
              Évolution schématique de la charge en azote sur un profil typique
              (descente → fond → remontée avec palier)
            </p>
            <Chart
              type="line"
              :data="saturationData"
              :options="saturationOptions"
              class="h-72"
            />
            <div
              class="mt-3 flex flex-wrap justify-center gap-6 text-xs text-gray-400"
            >
              <div class="flex items-center gap-2">
                <span class="inline-block h-0.5 w-6 bg-teal-400"></span>
                Charge N₂ (% limite)
              </div>
              <div class="flex items-center gap-2">
                <span
                  class="inline-block h-0.5 w-6 border-t-2 border-dashed border-red-400"
                ></span>
                Seuil de supersaturation
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== SECTION ACCIDENTOLOGIE ===== -->
      <section>
        <h2
          class="mb-6 flex items-center gap-3 text-2xl font-bold text-orange-300"
        >
          <Icon name="mdi:alert-circle" />
          Accidentologie
        </h2>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <!-- Répartition par type d'accident -->
          <div
            class="rounded-2xl border border-orange-500/20 bg-slate-800/40 p-6"
          >
            <h3 class="mb-1 text-lg font-semibold text-white">
              Répartition des accidents
            </h3>
            <p class="mb-4 text-sm text-gray-400">
              Sources : rapports FFESSM / DAN France
            </p>
            <Chart
              type="doughnut"
              :data="accidentTypeData"
              :options="doughnutOptions"
              class="h-64"
            />
          </div>

          <!-- Accidents par niveau de profondeur -->
          <div
            class="rounded-2xl border border-orange-500/20 bg-slate-800/40 p-6"
          >
            <h3 class="mb-1 text-lg font-semibold text-white">
              Profondeur lors de l'accident
            </h3>
            <p class="mb-4 text-sm text-gray-400">
              % des accidents selon la tranche de profondeur
            </p>
            <Chart
              type="bar"
              :data="accidentDepthData"
              :options="accidentDepthOptions"
              class="h-64"
            />
          </div>

          <!-- Facteurs contributifs -->
          <div
            class="rounded-2xl border border-orange-500/20 bg-slate-800/40 p-6"
          >
            <h3 class="mb-1 text-lg font-semibold text-white">
              Facteurs contributifs
            </h3>
            <p class="mb-4 text-sm text-gray-400">
              Principaux facteurs identifiés dans les rapports d'accident
            </p>
            <Chart
              type="radar"
              :data="riskFactorData"
              :options="radarOptions"
              class="h-64"
            />
          </div>
        </div>

        <div
          class="mt-4 rounded-xl border border-slate-600/30 bg-slate-800/20 p-4 text-center text-xs text-gray-500"
        >
          Données indicatives à visée pédagogique. Pour des statistiques
          officielles, consultez les rapports annuels FFESSM et DAN Europe.
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const gridColor = 'rgba(100,116,139,0.2)'
const tickColor = '#94a3b8'
const tooltipBg = '#1e293b'

const baseLineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: tooltipBg,
      titleColor: '#e2e8f0',
      bodyColor: '#cbd5e1',
    },
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
      borderColor: '#14b8a6',
      backgroundColor: 'rgba(20,184,166,0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#14b8a6',
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
      backgroundColor: pressureDepths.map(
        (_, i) => `rgba(99,102,241,${0.3 + i * 0.1})`
      ),
      borderColor: '#818cf8',
      borderWidth: 1,
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
      borderColor: '#22c55e',
      backgroundColor: 'rgba(34,197,94,0.1)',
      tension: 0.4,
      fill: false,
      pointBackgroundColor: '#22c55e',
    },
    {
      label: 'Effort modéré (40 L/min surface)',
      data: depths.map((d) => +(40 * (d / 10 + 1)).toFixed(0)),
      borderColor: '#f59e0b',
      backgroundColor: 'rgba(245,158,11,0.1)',
      tension: 0.4,
      fill: false,
      pointBackgroundColor: '#f59e0b',
    },
  ],
}))

// ── Compression néoprène ─────────────────────────────────────────────────────
const wetsuiteData = computed(() => ({
  labels: depths.map((d) => `${d} m`),
  datasets: [
    {
      label: 'Volume combinaison 5mm (L)',
      data: depths.map((d) => +(8 / (d / 10 + 1)).toFixed(2)),
      borderColor: '#38bdf8',
      backgroundColor: 'rgba(56,189,248,0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#38bdf8',
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
      backgroundColor: 'rgba(56,189,248,0.18)',
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
      borderColor: '#eab308',
      backgroundColor: 'transparent',
      borderWidth: 3,
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
      backgroundColor: '#ef4444',
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
      backgroundColor: tooltipBg,
      titleColor: '#e2e8f0',
      bodyColor: '#cbd5e1',
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
      borderColor: '#22c55e',
      backgroundColor: 'rgba(34,197,94,0.15)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#22c55e',
      pointRadius: 5,
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
      backgroundColor: overshoot.map((v) =>
        v === 0 ? 'rgba(34,197,94,0.6)' : `rgba(249,115,22,${0.3 + v / 160})`
      ),
      borderColor: overshoot.map((v) => (v === 0 ? '#22c55e' : '#f97316')),
      borderWidth: 1,
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
      borderColor: '#14b8a6',
      backgroundColor: 'rgba(20,184,166,0.12)',
      tension: 0.4,
      fill: true,
      pointRadius: 0,
    },
    {
      label: 'Seuil supersaturation',
      data: satLabels.map(() => 85),
      borderColor: 'rgba(239,68,68,0.7)',
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
    legend: {
      display: true,
      labels: { color: tickColor, boxWidth: 24 },
    },
    annotation: {
      annotations: {
        line1: {
          type: 'line',
          xMin: '30 min',
          xMax: '30 min',
          borderColor: '#f59e0b',
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
      backgroundColor: [
        'rgba(239,68,68,0.7)',
        'rgba(249,115,22,0.7)',
        'rgba(234,179,8,0.7)',
        'rgba(34,197,94,0.7)',
        'rgba(99,102,241,0.7)',
        'rgba(100,116,139,0.7)',
      ],
      borderColor: [
        '#ef4444',
        '#f97316',
        '#eab308',
        '#22c55e',
        '#6366f1',
        '#64748b',
      ],
      borderWidth: 1,
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
      labels: { color: tickColor, boxWidth: 14, font: { size: 10 } },
    },
    tooltip: {
      backgroundColor: tooltipBg,
      bodyColor: '#cbd5e1',
      titleColor: '#e2e8f0',
    },
  },
}

// ── Accidents — profondeur ────────────────────────────────────────────────────
const accidentDepthData = computed(() => ({
  labels: ['< 10 m', '10–20 m', '20–30 m', '30–40 m', '> 40 m'],
  datasets: [
    {
      label: '% accidents',
      data: [15, 28, 32, 18, 7],
      backgroundColor: [
        'rgba(34,197,94,0.6)',
        'rgba(234,179,8,0.6)',
        'rgba(249,115,22,0.6)',
        'rgba(239,68,68,0.6)',
        'rgba(139,92,246,0.6)',
      ],
      borderColor: ['#22c55e', '#eab308', '#f97316', '#ef4444', '#8b5cf6'],
      borderWidth: 1,
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
      backgroundColor: 'rgba(249,115,22,0.2)',
      borderColor: '#f97316',
      pointBackgroundColor: '#f97316',
      borderWidth: 2,
    },
  ],
}))

const radarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: tooltipBg,
      bodyColor: '#cbd5e1',
      titleColor: '#e2e8f0',
    },
  },
  scales: {
    r: {
      min: 0,
      max: 100,
      grid: { color: gridColor },
      angleLines: { color: gridColor },
      pointLabels: { color: tickColor, font: { size: 10 } },
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
