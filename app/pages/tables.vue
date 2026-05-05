<template>
  <div class="mb-8 min-h-screen text-white">
    <div class="relative overflow-hidden px-4 py-16">
      <div class="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <h1 class="mb-4 text-5xl font-bold">
          Tables
          <span class="text-yellow-500">MN90</span>
          &
          <span class="text-teal-400">FFESSM</span>
        </h1>
        <p class="mx-auto max-w-3xl text-xl text-gray-300">
          Calcul interactif des paliers de décompression
        </p>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-6 pb-4">
      <div class="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4">
        <div class="flex items-start gap-3">
          <Icon
            name="mdi:alert-circle"
            class="mt-0.5 shrink-0 text-yellow-400"
            size="1.4rem"
          />
          <p class="text-sm text-yellow-300">
            <strong>Usage éducatif uniquement.</strong>
            Vérifiez toujours vos plongées avec les tables officielles
            MN90/FFESSM et un ordinateur de plongée certifié. Cet outil ne
            remplace pas une formation FFESSM.
          </p>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-6 pb-12">
      <div class="my-8 flex justify-center">
        <div
          class="inline-flex flex-wrap justify-center gap-1 rounded-xl border border-teal-500/30 bg-slate-800/50 p-1"
        >
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            @click="activeTab = tab.id"
            :class="[
              'flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all',
              activeTab === tab.id
                ? 'bg-teal-500/20 text-teal-300'
                : 'text-gray-300 hover:text-white',
            ]"
          >
            <Icon :name="tab.icon" />
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- ===== CALCULATEUR ===== -->
      <div v-if="activeTab === 'calculator'" class="space-y-6">
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div
            class="rounded-2xl border border-teal-500/20 bg-slate-800/40 p-6"
          >
            <h2 class="mb-6 text-xl font-bold text-teal-300">Paramètres</h2>

            <div class="mb-6">
              <label class="mb-2 block text-sm font-medium text-gray-300">
                Profondeur maximale
              </label>
              <div class="flex items-center gap-4">
                <input
                  v-model.number="inputDepth"
                  type="range"
                  min="6"
                  max="40"
                  step="1"
                  class="flex-1 accent-teal-400"
                />
                <div class="flex items-center gap-2">
                  <input
                    v-model.number="inputDepth"
                    type="number"
                    min="6"
                    max="40"
                    class="w-20 rounded-lg border border-teal-500/30 bg-slate-700 px-3 py-2 text-center text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  <span class="text-gray-400">m</span>
                </div>
              </div>
              <div class="mt-1 text-xs text-gray-500">
                Table utilisée :
                <span class="text-teal-400">{{ effectiveDepth }}m</span>
                <span
                  v-if="effectiveDepth !== inputDepth"
                  class="ml-1 text-yellow-400"
                >
                  (arrondi au palier supérieur)
                </span>
              </div>
            </div>

            <div class="mb-6">
              <label class="mb-2 block text-sm font-medium text-gray-300">
                Durée de plongée (fond)
              </label>
              <div class="flex items-center gap-4">
                <input
                  v-model.number="inputTime"
                  type="range"
                  min="1"
                  :max="maxTimeForDepth"
                  step="1"
                  class="flex-1 accent-teal-400"
                />
                <div class="flex items-center gap-2">
                  <input
                    v-model.number="inputTime"
                    type="number"
                    min="1"
                    :max="maxTimeForDepth"
                    class="w-20 rounded-lg border border-teal-500/30 bg-slate-700 px-3 py-2 text-center text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  <span class="text-gray-400">min</span>
                </div>
              </div>
              <div class="mt-1 flex items-center gap-2 text-xs">
                <span class="text-gray-500">LSP :</span>
                <span
                  :class="
                    inputTime > noStopLimit
                      ? 'font-semibold text-red-400'
                      : 'text-green-400'
                  "
                >
                  {{ noStopLimit === Infinity ? '∞' : noStopLimit + ' min' }}
                </span>
                <span v-if="inputTime > noStopLimit" class="text-red-400">
                  ⚠ Paliers obligatoires
                </span>
              </div>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-gray-300">
                Profondeurs rapides
              </label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="d in quickDepths"
                  :key="d"
                  type="button"
                  @click="inputDepth = d"
                  :class="[
                    'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                    effectiveDepth === d
                      ? 'bg-teal-500/30 text-teal-300 ring-1 ring-teal-400'
                      : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700',
                  ]"
                >
                  {{ d }}m
                </button>
              </div>
            </div>
          </div>

          <div
            class="rounded-2xl border border-teal-500/20 bg-slate-800/40 p-6"
          >
            <h2 class="mb-6 text-xl font-bold text-teal-300">Résultats</h2>

            <div
              v-if="outOfTable"
              class="rounded-xl bg-red-500/10 p-5 ring-1 ring-red-500/30"
            >
              <div class="flex items-center gap-3">
                <Icon
                  name="mdi:alert-octagon"
                  class="shrink-0 text-red-400"
                  size="2rem"
                />
                <div>
                  <div class="font-semibold text-red-300">
                    Hors limites table MN90
                  </div>
                  <div class="mt-1 text-sm text-gray-400">
                    Ce profil dépasse les valeurs tabulées. Consultez les tables
                    officielles ou planifiez une plongée plus courte.
                  </div>
                </div>
              </div>
            </div>

            <div
              v-else-if="result && result.stops.length === 0"
              class="space-y-4"
            >
              <div
                class="flex items-center gap-3 rounded-xl bg-green-500/10 p-4 ring-1 ring-green-500/30"
              >
                <Icon
                  name="mdi:check-circle"
                  class="shrink-0 text-green-400"
                  size="2rem"
                />
                <div>
                  <div class="font-semibold text-green-300">
                    Plongée sans palier obligatoire
                  </div>
                  <div class="text-sm text-gray-400">
                    Palier de sécurité recommandé : 3 min à 3 m
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="rounded-xl bg-slate-700/50 p-4 text-center">
                  <div class="text-3xl font-bold text-teal-400">
                    {{ result.group }}
                  </div>
                  <div class="mt-1 text-xs text-gray-400">Groupe résiduel</div>
                </div>
                <div class="rounded-xl bg-slate-700/50 p-4 text-center">
                  <div class="text-3xl font-bold text-white">
                    ~{{ ascentTimeNoStop }} min
                  </div>
                  <div class="mt-1 text-xs text-gray-400">Remontée estimée</div>
                </div>
              </div>
            </div>

            <div
              v-else-if="result && result.stops.length > 0"
              class="space-y-4"
            >
              <div
                class="flex items-center gap-3 rounded-xl bg-orange-500/10 p-4 ring-1 ring-orange-500/30"
              >
                <Icon
                  name="mdi:timer-alert"
                  class="shrink-0 text-orange-400"
                  size="2rem"
                />
                <div>
                  <div class="font-semibold text-orange-300">
                    Paliers obligatoires requis
                  </div>
                  <div class="text-sm text-gray-400">
                    Effectuez les paliers dans l'ordre, du plus profond au plus
                    superficiel
                  </div>
                </div>
              </div>

              <div class="space-y-2">
                <div
                  v-for="stop in result.stops"
                  :key="stop.depth"
                  class="flex items-center justify-between rounded-xl bg-slate-700/50 px-4 py-3"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20 text-sm font-bold text-orange-300"
                    >
                      {{ stop.depth }}m
                    </div>
                    <span class="text-gray-300">Palier obligatoire</span>
                  </div>
                  <span class="text-xl font-bold text-white">
                    {{ stop.time }}&thinsp;min
                  </span>
                </div>

                <div
                  class="flex items-center justify-between rounded-xl bg-blue-500/10 px-4 py-3"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-sm font-bold text-blue-300"
                    >
                      3m
                    </div>
                    <span class="text-gray-400">
                      Palier de sécurité (recommandé)
                    </span>
                  </div>
                  <span class="text-xl font-bold text-blue-300">
                    3&thinsp;min
                  </span>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div class="rounded-xl bg-slate-700/50 p-3 text-center">
                  <div class="text-2xl font-bold text-teal-400">
                    {{ result.group }}
                  </div>
                  <div class="mt-1 text-xs text-gray-400">Groupe</div>
                </div>
                <div class="rounded-xl bg-slate-700/50 p-3 text-center">
                  <div class="text-2xl font-bold text-white">
                    {{ totalDecoTime }}&thinsp;min
                  </div>
                  <div class="mt-1 text-xs text-gray-400">Temps déco</div>
                </div>
                <div class="rounded-xl bg-slate-700/50 p-3 text-center">
                  <div class="text-2xl font-bold text-white">
                    ~{{ totalAscentTime }}&thinsp;min
                  </div>
                  <div class="mt-1 text-xs text-gray-400">Remontée totale</div>
                </div>
              </div>
            </div>

            <div
              v-else
              class="flex h-40 items-center justify-center text-gray-500"
            >
              Ajustez les paramètres pour calculer
            </div>
          </div>
        </div>

        <div
          v-if="result && !outOfTable"
          class="rounded-2xl border border-teal-500/20 bg-slate-800/40 p-6"
        >
          <h2 class="mb-4 text-xl font-bold text-teal-300">
            Profil de plongée
          </h2>
          <div class="overflow-x-auto">
            <svg
              viewBox="0 0 520 230"
              class="w-full max-w-2xl"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="profileGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#14b8a6" stop-opacity="0.3" />
                  <stop
                    offset="100%"
                    stop-color="#14b8a6"
                    stop-opacity="0.05"
                  />
                </linearGradient>
              </defs>
              <line
                x1="45"
                y1="15"
                x2="45"
                y2="195"
                stroke="#475569"
                stroke-width="1"
              />
              <line
                x1="45"
                y1="195"
                x2="505"
                y2="195"
                stroke="#475569"
                stroke-width="1"
              />
              <text
                x="38"
                y="19"
                fill="#94a3b8"
                font-size="10"
                text-anchor="end"
              >
                0 m
              </text>
              <text
                x="38"
                y="107"
                fill="#94a3b8"
                font-size="10"
                text-anchor="end"
              >
                {{ Math.round(effectiveDepth / 2) }} m
              </text>
              <text
                x="38"
                y="196"
                fill="#94a3b8"
                font-size="10"
                text-anchor="end"
              >
                {{ effectiveDepth }} m
              </text>
              <text x="45" y="215" fill="#94a3b8" font-size="10">0</text>
              <text
                x="505"
                y="215"
                fill="#94a3b8"
                font-size="10"
                text-anchor="end"
              >
                {{ svgTotalTime }} min
              </text>

              <polygon
                v-if="profilePoints.length > 1"
                :points="
                  profilePoints.map((p) => `${p[0]},${p[1]}`).join(' ') +
                  ` 505,195 45,195`
                "
                fill="url(#profileGrad)"
              />
              <polyline
                v-if="profilePoints.length > 1"
                :points="profilePoints.map((p) => `${p[0]},${p[1]}`).join(' ')"
                fill="none"
                stroke="#14b8a6"
                stroke-width="2.5"
                stroke-linejoin="round"
              />

              <g v-for="(stop, i) in result.stops" :key="i">
                <circle
                  :cx="stopSvgPositions[i]?.cx ?? 0"
                  :cy="stopSvgPositions[i]?.cy ?? 0"
                  r="4"
                  fill="#f97316"
                />
                <text
                  :x="(stopSvgPositions[i]?.cx ?? 0) + 6"
                  :y="(stopSvgPositions[i]?.cy ?? 0) - 4"
                  fill="#fdba74"
                  font-size="9"
                >
                  {{ stop.depth }}m / {{ stop.time }}'
                </text>
              </g>

              <line
                x1="45"
                y1="195"
                x2="505"
                y2="195"
                stroke="#22c55e"
                stroke-width="1"
                stroke-dasharray="4,4"
                opacity="0.5"
              />
              <text
                x="275"
                y="225"
                fill="#64748b"
                font-size="9"
                text-anchor="middle"
              >
                Temps (min)
              </text>
              <text
                x="12"
                y="107"
                fill="#64748b"
                font-size="9"
                text-anchor="middle"
                transform="rotate(-90 12 107)"
              >
                Profondeur (m)
              </text>
            </svg>
          </div>
          <div class="mt-3 flex flex-wrap gap-4 text-xs text-gray-400">
            <div class="flex items-center gap-1.5">
              <span class="inline-block h-0.5 w-6 bg-teal-400"></span>
              Profil de plongée
            </div>
            <div class="flex items-center gap-1.5">
              <span
                class="inline-block h-2.5 w-2.5 rounded-full bg-orange-400"
              ></span>
              Palier de décompression
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-slate-600/30 bg-slate-800/30 p-4">
          <h3 class="mb-3 text-sm font-semibold text-teal-400">
            Rappels sécurité
          </h3>
          <ul
            class="grid grid-cols-1 gap-1.5 text-xs text-gray-400 sm:grid-cols-2"
          >
            <li class="flex items-center gap-2">
              <Icon name="mdi:arrow-up-circle" class="shrink-0 text-teal-500" />
              Vitesse de remontée : 15 m/min maximum
            </li>
            <li class="flex items-center gap-2">
              <Icon name="mdi:clock-outline" class="shrink-0 text-teal-500" />
              Palier de sécurité : 3 min à 3 m systématique
            </li>
            <li class="flex items-center gap-2">
              <Icon name="mdi:thermometer" class="shrink-0 text-teal-500" />
              Froid, effort → majorez les paliers
            </li>
            <li class="flex items-center gap-2">
              <Icon name="mdi:repeat-variant" class="shrink-0 text-teal-500" />
              Plongées successives → consultez l'onglet dédié
            </li>
          </ul>
        </div>
      </div>

      <!-- ===== TABLE MN90 ===== -->
      <div v-if="activeTab === 'table'" class="space-y-4">
        <div
          class="flex flex-wrap items-center gap-4 rounded-xl border border-slate-600/30 bg-slate-800/30 p-3 text-xs text-gray-400"
        >
          <div class="flex items-center gap-2">
            <span
              class="h-3 w-3 rounded bg-green-500/40 ring-1 ring-green-500/40"
            ></span>
            Sans palier (dans la LSP)
          </div>
          <div class="flex items-center gap-2">
            <span
              class="h-3 w-3 rounded bg-yellow-500/30 ring-1 ring-yellow-500/30"
            ></span>
            Palier(s) requis
          </div>
          <div class="flex items-center gap-2">
            <span
              class="h-3 w-6 rounded border-t-2 border-teal-400/60 bg-teal-500/10"
            ></span>
            Limite N1 (20 m max)
          </div>
          <div class="flex items-center gap-2">
            <span
              class="h-3 w-3 rounded bg-teal-500/30 ring-2 ring-teal-400/60"
            ></span>
            Valeur sélectionnée
          </div>
        </div>

        <div
          class="overflow-x-auto rounded-2xl border border-teal-500/20 bg-slate-800/40"
        >
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-teal-500/20 bg-slate-800/60">
                <th
                  class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-teal-400"
                >
                  Prof.
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-teal-400"
                >
                  Durée fond
                </th>
                <th
                  class="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-orange-400"
                >
                  9 m
                </th>
                <th
                  class="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-orange-300"
                >
                  6 m
                </th>
                <th
                  class="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-yellow-300"
                >
                  3 m
                </th>
                <th
                  class="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-teal-400"
                >
                  Groupe
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="depthData in mn90Table" :key="depthData.depth">
                <tr
                  v-for="(entry, idx) in depthData.entries"
                  :key="entry.time"
                  :class="[
                    'border-b border-slate-700/30 transition-colors hover:bg-slate-700/30',
                    idx === 0 && depthData.depth === 20
                      ? 'border-t-2 border-t-teal-400/40'
                      : idx === 0
                        ? 'border-t border-t-slate-600/50'
                        : '',
                    entry.stops.length === 0
                      ? 'bg-green-500/5'
                      : 'bg-yellow-500/5',
                    isHighlighted(depthData.depth, entry.time)
                      ? '!bg-teal-500/20 ring-1 ring-inset ring-teal-400/50'
                      : '',
                  ]"
                >
                  <td
                    v-if="idx === 0"
                    :rowspan="depthData.entries.length"
                    class="border-r border-slate-700/30 px-4 py-2.5 text-center font-bold"
                    :class="
                      depthData.depth <= 20
                        ? 'text-teal-300'
                        : 'text-teal-400/70'
                    "
                  >
                    {{ depthData.depth }} m
                  </td>
                  <td class="px-4 py-2.5 text-gray-300">
                    {{ formatDuration(entry.time) }}
                    <span
                      v-if="entry.time === depthData.noStopLimit"
                      class="ml-1 text-xs text-green-500"
                    >
                      (LSP)
                    </span>
                  </td>
                  <td class="px-4 py-2.5 text-center">
                    <span
                      v-if="getStop(entry, 9) !== null"
                      class="font-medium text-orange-400"
                    >
                      {{ getStop(entry, 9) }}'
                    </span>
                    <span v-else class="text-slate-600">—</span>
                  </td>
                  <td class="px-4 py-2.5 text-center">
                    <span
                      v-if="getStop(entry, 6) !== null"
                      class="font-medium text-orange-300"
                    >
                      {{ getStop(entry, 6) }}'
                    </span>
                    <span v-else class="text-slate-600">—</span>
                  </td>
                  <td class="px-4 py-2.5 text-center">
                    <span
                      v-if="getStop(entry, 3) !== null"
                      class="font-medium text-yellow-300"
                    >
                      {{ getStop(entry, 3) }}'
                    </span>
                    <span v-else class="text-xs font-medium text-green-500">
                      ✓
                    </span>
                  </td>
                  <td class="px-4 py-2.5 text-center">
                    <span
                      class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-teal-500/20 text-xs font-bold text-teal-300"
                    >
                      {{ entry.group }}
                    </span>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <p class="text-center text-xs text-gray-500">
          Tables MN90 — Marine Nationale 1990. Vitesse de remontée : 15 m/min.
          Palier de sécurité 3 min à 3 m recommandé dans tous les cas. Durées en
          minutes.
        </p>
      </div>

      <!-- ===== PLONGÉES SUCCESSIVES ===== -->
      <div v-if="activeTab === 'successive'" class="space-y-6">
        <div class="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
          <div class="flex items-start gap-3">
            <Icon
              name="mdi:information"
              class="mt-0.5 shrink-0 text-blue-400"
              size="1.3rem"
            />
            <div class="text-sm">
              <p class="mb-1 font-semibold text-blue-300">
                Plongée successive FFESSM/MN90
              </p>
              <p class="text-gray-300">
                Deux plongées séparées par un intervalle de surface compris
                entre
                <strong class="text-white">15 min et 12 heures</strong>
                . Une majoration est ajoutée à la durée de fond de la 2ème
                plongée selon le groupe résiduel d'azote.
              </p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div
            class="rounded-2xl border border-teal-500/20 bg-slate-800/40 p-6"
          >
            <h3
              class="mb-5 flex items-center gap-2 text-lg font-bold text-teal-300"
            >
              <span
                class="flex h-7 w-7 items-center justify-center rounded-full bg-teal-500/30 text-sm font-bold"
              >
                1
              </span>
              1ère plongée
            </h3>
            <div class="space-y-4">
              <div>
                <label class="mb-1 block text-xs text-gray-400">
                  Profondeur
                </label>
                <div class="flex items-center gap-2">
                  <input
                    v-model.number="succDive1Depth"
                    type="number"
                    min="6"
                    max="40"
                    class="w-full rounded-lg border border-teal-500/30 bg-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  <span class="shrink-0 text-gray-400">m</span>
                </div>
              </div>
              <div>
                <label class="mb-1 block text-xs text-gray-400">
                  Durée fond
                </label>
                <div class="flex items-center gap-2">
                  <input
                    v-model.number="succDive1Time"
                    type="number"
                    min="1"
                    max="360"
                    class="w-full rounded-lg border border-teal-500/30 bg-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  <span class="shrink-0 text-gray-400">min</span>
                </div>
              </div>
              <div
                v-if="succDive1Result"
                class="rounded-xl bg-slate-700/40 p-3"
              >
                <div class="mb-2 text-xs text-gray-400">Résultat :</div>
                <div class="mb-1 flex items-center justify-between">
                  <span class="text-sm text-gray-300">Groupe résiduel</span>
                  <span class="text-2xl font-bold text-teal-400">
                    {{ succDive1Result.group }}
                  </span>
                </div>
                <div
                  v-if="succDive1Result.stops.length > 0"
                  class="mt-2 space-y-1"
                >
                  <div
                    v-for="stop in succDive1Result.stops"
                    :key="stop.depth"
                    class="flex justify-between text-xs"
                  >
                    <span class="text-gray-400">Palier {{ stop.depth }} m</span>
                    <span class="text-yellow-300">{{ stop.time }} min</span>
                  </div>
                </div>
                <div v-else class="mt-1 text-xs text-green-400">
                  Sans palier obligatoire
                </div>
              </div>
              <div
                v-else
                class="rounded-xl bg-red-500/10 p-3 text-xs text-red-300"
              >
                Hors table — réduire la durée
              </div>
            </div>
          </div>

          <div
            class="rounded-2xl border border-purple-500/20 bg-slate-800/40 p-6"
          >
            <h3
              class="mb-5 flex items-center gap-2 text-lg font-bold text-purple-300"
            >
              <Icon name="mdi:weather-sunny" class="text-yellow-400" />
              Intervalle surface
            </h3>
            <div class="space-y-4">
              <div>
                <label class="mb-1 block text-xs text-gray-400">
                  Durée en surface
                </label>
                <div class="flex items-center gap-2">
                  <input
                    v-model.number="surfaceInterval"
                    type="number"
                    min="15"
                    max="720"
                    class="w-full rounded-lg border border-purple-500/30 bg-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <span class="shrink-0 text-gray-400">min</span>
                </div>
                <div class="mt-1 text-xs text-gray-500">
                  {{ formatDuration(surfaceInterval) }} · 15 min → 12 h
                </div>
              </div>

              <div
                v-if="surfaceInterval >= 720"
                class="rounded-xl bg-green-500/10 p-3"
              >
                <div
                  class="flex items-center gap-2 text-sm font-semibold text-green-400"
                >
                  <Icon name="mdi:check-circle" />
                  Plongée indépendante
                </div>
                <div class="mt-1 text-xs text-gray-400">
                  Intervalle ≥ 12 h : aucune majoration
                </div>
              </div>

              <div
                v-else-if="succDive1Result"
                class="rounded-xl bg-purple-500/10 p-3"
              >
                <div class="mb-2 text-xs text-gray-400">
                  Groupe résiduel après {{ formatDuration(surfaceInterval) }} :
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-400">
                    {{ succDive1Result.group }}
                    <span v-if="residualGroup !== succDive1Result.group">
                      →
                    </span>
                  </span>
                  <span class="text-3xl font-bold text-purple-300">
                    {{ residualGroup }}
                  </span>
                </div>
              </div>

              <div class="rounded-xl bg-slate-700/40 p-3 text-xs text-gray-400">
                <p class="mb-1 font-medium text-gray-300">
                  Réduction du groupe par paliers :
                </p>
                <p>H→G : 15 min · G→F : 15 min · F→E : 20 min</p>
                <p>E→D : 25 min · D→C : 35 min · C→B : 45 min</p>
                <p>B→A : 1 h · A→libre : 12 h</p>
              </div>
            </div>
          </div>

          <div
            class="rounded-2xl border border-yellow-500/20 bg-slate-800/40 p-6"
          >
            <h3
              class="mb-5 flex items-center gap-2 text-lg font-bold text-yellow-300"
            >
              <span
                class="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-500/30 text-sm font-bold"
              >
                2
              </span>
              2ème plongée
            </h3>
            <div class="space-y-4">
              <div>
                <label class="mb-1 block text-xs text-gray-400">
                  Profondeur
                </label>
                <div class="flex items-center gap-2">
                  <input
                    v-model.number="succDive2Depth"
                    type="number"
                    min="6"
                    max="40"
                    class="w-full rounded-lg border border-yellow-500/30 bg-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <span class="shrink-0 text-gray-400">m</span>
                </div>
              </div>
              <div>
                <label class="mb-1 block text-xs text-gray-400">
                  Durée fond souhaitée
                </label>
                <div class="flex items-center gap-2">
                  <input
                    v-model.number="succDive2Time"
                    type="number"
                    min="1"
                    max="360"
                    class="w-full rounded-lg border border-yellow-500/30 bg-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <span class="shrink-0 text-gray-400">min</span>
                </div>
              </div>

              <div
                v-if="surfaceInterval < 720 && residualGroup && succDive2Result"
                class="space-y-2"
              >
                <div
                  class="rounded-xl bg-yellow-500/10 p-3 ring-1 ring-yellow-500/20"
                >
                  <div class="mb-2 text-xs text-gray-400">
                    Majoration azote résiduel :
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-300">
                      {{ succDive2Time }} + {{ majoration }} min
                    </span>
                    <span class="text-xl font-bold text-yellow-300">
                      = {{ succDive2Time + majoration }} min
                    </span>
                  </div>
                </div>
                <div class="space-y-1.5 rounded-xl bg-slate-700/40 p-3">
                  <div class="text-xs text-gray-400">
                    Paliers calculés sur {{ succDive2Time + majoration }} min :
                  </div>
                  <div v-if="succDive2Result.stops.length > 0">
                    <div
                      v-for="stop in succDive2Result.stops"
                      :key="stop.depth"
                      class="flex justify-between text-sm"
                    >
                      <span class="text-gray-300">
                        Palier {{ stop.depth }} m
                      </span>
                      <span class="font-semibold text-orange-300">
                        {{ stop.time }} min
                      </span>
                    </div>
                  </div>
                  <div v-else class="text-sm text-green-400">
                    Sans palier obligatoire
                  </div>
                  <div
                    class="flex justify-between border-t border-slate-600 pt-1.5 text-sm"
                  >
                    <span class="text-gray-400">Groupe résiduel</span>
                    <span class="font-bold text-teal-400">
                      {{ succDive2Result.group }}
                    </span>
                  </div>
                </div>
              </div>

              <div
                v-else-if="surfaceInterval >= 720 && succDive2ResultSimple"
                class="space-y-1.5 rounded-xl bg-slate-700/40 p-3"
              >
                <div class="text-xs text-gray-400">Plongée indépendante :</div>
                <div v-if="succDive2ResultSimple.stops.length > 0">
                  <div
                    v-for="stop in succDive2ResultSimple.stops"
                    :key="stop.depth"
                    class="flex justify-between text-sm"
                  >
                    <span class="text-gray-300">Palier {{ stop.depth }} m</span>
                    <span class="font-semibold text-orange-300">
                      {{ stop.time }} min
                    </span>
                  </div>
                </div>
                <div v-else class="text-sm text-green-400">
                  Sans palier obligatoire
                </div>
                <div
                  class="flex justify-between border-t border-slate-600 pt-1.5 text-sm"
                >
                  <span class="text-gray-400">Groupe résiduel</span>
                  <span class="font-bold text-teal-400">
                    {{ succDive2ResultSimple.group }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Stop {
  depth: number
  time: number
}

interface TableEntry {
  time: number
  stops: Stop[]
  group: string
}

interface DepthData {
  depth: number
  noStopLimit: number
  entries: TableEntry[]
}

interface DiveResult {
  stops: Stop[]
  group: string
  entry: TableEntry
}

const mn90Table: DepthData[] = [
  {
    depth: 12,
    noStopLimit: 135,
    entries: [
      { time: 135, stops: [], group: 'A' },
      { time: 165, stops: [{ depth: 3, time: 5 }], group: 'B' },
      { time: 210, stops: [{ depth: 3, time: 15 }], group: 'C' },
      { time: 255, stops: [{ depth: 3, time: 30 }], group: 'D' },
      { time: 300, stops: [{ depth: 3, time: 45 }], group: 'E' },
    ],
  },
  {
    depth: 15,
    noStopLimit: 75,
    entries: [
      { time: 75, stops: [], group: 'B' },
      { time: 90, stops: [{ depth: 3, time: 5 }], group: 'C' },
      { time: 120, stops: [{ depth: 3, time: 20 }], group: 'D' },
      { time: 150, stops: [{ depth: 3, time: 35 }], group: 'E' },
      { time: 180, stops: [{ depth: 3, time: 50 }], group: 'F' },
    ],
  },
  {
    depth: 18,
    noStopLimit: 50,
    entries: [
      { time: 50, stops: [], group: 'C' },
      { time: 60, stops: [{ depth: 3, time: 8 }], group: 'D' },
      { time: 75, stops: [{ depth: 3, time: 18 }], group: 'D' },
      { time: 90, stops: [{ depth: 3, time: 28 }], group: 'E' },
      { time: 110, stops: [{ depth: 3, time: 43 }], group: 'F' },
    ],
  },
  {
    depth: 20,
    noStopLimit: 40,
    entries: [
      { time: 40, stops: [], group: 'C' },
      { time: 50, stops: [{ depth: 3, time: 9 }], group: 'D' },
      { time: 60, stops: [{ depth: 3, time: 14 }], group: 'E' },
      { time: 75, stops: [{ depth: 3, time: 24 }], group: 'E' },
      { time: 90, stops: [{ depth: 3, time: 35 }], group: 'F' },
      { time: 120, stops: [{ depth: 3, time: 55 }], group: 'F' },
    ],
  },
  {
    depth: 22,
    noStopLimit: 30,
    entries: [
      { time: 30, stops: [], group: 'C' },
      { time: 40, stops: [{ depth: 3, time: 9 }], group: 'D' },
      { time: 50, stops: [{ depth: 3, time: 19 }], group: 'E' },
      { time: 60, stops: [{ depth: 3, time: 29 }], group: 'E' },
      { time: 75, stops: [{ depth: 3, time: 44 }], group: 'F' },
    ],
  },
  {
    depth: 25,
    noStopLimit: 20,
    entries: [
      { time: 20, stops: [], group: 'C' },
      { time: 25, stops: [{ depth: 3, time: 4 }], group: 'D' },
      { time: 30, stops: [{ depth: 3, time: 9 }], group: 'D' },
      { time: 40, stops: [{ depth: 3, time: 19 }], group: 'E' },
      { time: 50, stops: [{ depth: 3, time: 34 }], group: 'F' },
      { time: 60, stops: [{ depth: 3, time: 49 }], group: 'F' },
    ],
  },
  {
    depth: 28,
    noStopLimit: 15,
    entries: [
      { time: 15, stops: [], group: 'C' },
      { time: 20, stops: [{ depth: 3, time: 10 }], group: 'D' },
      { time: 25, stops: [{ depth: 3, time: 20 }], group: 'D' },
      { time: 30, stops: [{ depth: 3, time: 30 }], group: 'E' },
      { time: 40, stops: [{ depth: 3, time: 50 }], group: 'F' },
    ],
  },
  {
    depth: 30,
    noStopLimit: 12,
    entries: [
      { time: 12, stops: [], group: 'C' },
      { time: 15, stops: [{ depth: 3, time: 5 }], group: 'D' },
      { time: 20, stops: [{ depth: 3, time: 15 }], group: 'D' },
      { time: 25, stops: [{ depth: 3, time: 25 }], group: 'E' },
      { time: 30, stops: [{ depth: 3, time: 35 }], group: 'E' },
      {
        time: 40,
        stops: [
          { depth: 6, time: 5 },
          { depth: 3, time: 50 },
        ],
        group: 'F',
      },
    ],
  },
  {
    depth: 35,
    noStopLimit: 8,
    entries: [
      { time: 8, stops: [], group: 'C' },
      { time: 10, stops: [{ depth: 3, time: 5 }], group: 'D' },
      { time: 15, stops: [{ depth: 3, time: 15 }], group: 'D' },
      {
        time: 20,
        stops: [
          { depth: 6, time: 5 },
          { depth: 3, time: 25 },
        ],
        group: 'E',
      },
      {
        time: 25,
        stops: [
          { depth: 6, time: 10 },
          { depth: 3, time: 40 },
        ],
        group: 'E',
      },
      {
        time: 30,
        stops: [
          { depth: 9, time: 5 },
          { depth: 6, time: 15 },
          { depth: 3, time: 55 },
        ],
        group: 'F',
      },
    ],
  },
  {
    depth: 40,
    noStopLimit: 5,
    entries: [
      { time: 5, stops: [], group: 'C' },
      { time: 10, stops: [{ depth: 3, time: 10 }], group: 'D' },
      {
        time: 15,
        stops: [
          { depth: 6, time: 5 },
          { depth: 3, time: 20 },
        ],
        group: 'D',
      },
      {
        time: 20,
        stops: [
          { depth: 6, time: 10 },
          { depth: 3, time: 35 },
        ],
        group: 'E',
      },
      {
        time: 25,
        stops: [
          { depth: 9, time: 5 },
          { depth: 6, time: 15 },
          { depth: 3, time: 50 },
        ],
        group: 'E',
      },
    ],
  },
]

const majorationTable: Record<string, Record<number, number>> = {
  A: {
    12: 5,
    15: 8,
    18: 10,
    20: 10,
    22: 12,
    25: 15,
    28: 15,
    30: 18,
    35: 20,
    40: 22,
  },
  B: {
    12: 10,
    15: 15,
    18: 18,
    20: 20,
    22: 22,
    25: 25,
    28: 28,
    30: 30,
    35: 32,
    40: 35,
  },
  C: {
    12: 18,
    15: 22,
    18: 28,
    20: 30,
    22: 33,
    25: 37,
    28: 40,
    30: 43,
    35: 48,
    40: 52,
  },
  D: {
    12: 28,
    15: 33,
    18: 40,
    20: 44,
    22: 48,
    25: 53,
    28: 58,
    30: 62,
    35: 68,
    40: 74,
  },
  E: {
    12: 40,
    15: 48,
    18: 57,
    20: 63,
    22: 68,
    25: 75,
    28: 82,
    30: 87,
    35: 95,
    40: 103,
  },
  F: {
    12: 55,
    15: 65,
    18: 77,
    20: 84,
    22: 91,
    25: 100,
    28: 109,
    30: 115,
    35: 126,
    40: 136,
  },
}

const tableDepths = mn90Table.map((d) => d.depth)

const getEffectiveDepth = (depth: number): number => {
  for (const d of tableDepths) {
    if (depth <= d) return d
  }
  return tableDepths[tableDepths.length - 1]
}

const getDepthData = (depth: number): DepthData | undefined =>
  mn90Table.find((d) => d.depth === getEffectiveDepth(depth))

const calculateDive = (depth: number, time: number): DiveResult | null => {
  const depthData = getDepthData(depth)
  if (!depthData) return null
  const entry = depthData.entries.find((e) => time <= e.time)
  if (!entry) return null
  return { stops: entry.stops, group: entry.group, entry }
}

const getSurfaceIntervalGroup = (
  initialGroup: string,
  intervalMinutes: number
): string => {
  const groups = ['H', 'G', 'F', 'E', 'D', 'C', 'B', 'A']
  const reductionTimes = [15, 15, 20, 25, 35, 45, 60, 120]
  let idx = groups.indexOf(initialGroup)
  if (idx === -1) return initialGroup
  let remaining = intervalMinutes
  while (idx < groups.length - 1 && remaining >= reductionTimes[idx]) {
    remaining -= reductionTimes[idx]
    idx++
  }
  return groups[idx]
}

const tabs = [
  { id: 'table' as const, label: 'Table MN90', icon: 'mdi:table-large' },
  {
    id: 'calculator' as const,
    label: 'Calculateur',
    icon: 'mdi:calculator-variant',
  },
  {
    id: 'successive' as const,
    label: 'Plongées successives',
    icon: 'mdi:repeat-variant',
  },
]

const quickDepths = [12, 15, 18, 20, 25, 30, 35, 40]
const activeTab = ref<'calculator' | 'table' | 'successive'>('table')

const inputDepth = ref(20)
const inputTime = ref(30)

const effectiveDepth = computed(() => getEffectiveDepth(inputDepth.value))
const currentDepthData = computed(() =>
  mn90Table.find((d) => d.depth === effectiveDepth.value)
)
const noStopLimit = computed(
  () => currentDepthData.value?.noStopLimit ?? Infinity
)
const maxTimeForDepth = computed(
  () => currentDepthData.value?.entries.at(-1)?.time ?? 360
)

const outOfTable = computed(() => inputTime.value > maxTimeForDepth.value)

const result = computed<DiveResult | null>(() => {
  if (outOfTable.value) return null
  return calculateDive(inputDepth.value, inputTime.value)
})

const totalDecoTime = computed(
  () => result.value?.stops.reduce((s, stop) => s + stop.time, 0) ?? 0
)
const ascentTimeNoStop = computed(
  () => Math.ceil(effectiveDepth.value / 15) + 3
)

const totalAscentTime = computed(() => {
  const stops = result.value?.stops ?? []
  if (stops.length === 0) return ascentTimeNoStop.value
  const deepestStop = stops[0].depth
  const ascentToFirst = Math.ceil((effectiveDepth.value - deepestStop) / 15)
  const transitsBetweenStops = Math.max(0, stops.length - 1)
  const finalAscent = Math.ceil((stops.at(-1)?.depth ?? 0) / 15) + 3
  return (
    ascentToFirst + totalDecoTime.value + transitsBetweenStops + finalAscent
  )
})

const PAD_LEFT = 45
const PAD_TOP = 15
const CHART_W = 460
const CHART_H = 165

const profilePoints = computed<[number, number][]>(() => {
  if (!result.value) return []
  const depth = effectiveDepth.value
  const stops = result.value.stops
  const descentTime = Math.ceil(depth / 15)
  let totalTime = descentTime + inputTime.value
  stops.forEach((s) => {
    totalTime += s.time + 1
  })
  totalTime += Math.ceil(depth / 15) + 3

  const sx = (t: number) => PAD_LEFT + (t / totalTime) * CHART_W
  const sy = (d: number) => PAD_TOP + (d / depth) * CHART_H

  const pts: [number, number][] = []
  let t = 0
  pts.push([sx(0), sy(0)])
  t += descentTime
  pts.push([sx(t), sy(depth)])
  t += inputTime.value
  pts.push([sx(t), sy(depth)])

  if (stops.length === 0) {
    t += Math.ceil(depth / 15) + 3
    pts.push([sx(t), sy(0)])
  } else {
    for (let i = 0; i < stops.length; i++) {
      const stop = stops[i]
      const prevD = i === 0 ? depth : stops[i - 1].depth
      t += Math.ceil((prevD - stop.depth) / 15)
      pts.push([sx(t), sy(stop.depth)])
      t += stop.time
      pts.push([sx(t), sy(stop.depth)])
    }
    t += Math.ceil((stops.at(-1)?.depth ?? 0) / 15) + 3
    pts.push([sx(t), sy(0)])
  }
  return pts
})

const svgTotalTime = computed(() => {
  if (!result.value) return 0
  const depth = effectiveDepth.value
  const stops = result.value.stops
  const descentTime = Math.ceil(depth / 15)
  let t = descentTime + inputTime.value
  stops.forEach((s) => {
    t += s.time + 1
  })
  t += Math.ceil(depth / 15) + 3
  return t
})

const stopSvgPositions = computed(() => {
  if (!result.value) return []
  const stops = result.value.stops
  const depth = effectiveDepth.value
  const descentTime = Math.ceil(depth / 15)
  let totalTime = descentTime + inputTime.value
  stops.forEach((s) => {
    totalTime += s.time + 1
  })
  totalTime += Math.ceil(depth / 15) + 3

  const sx = (t: number) => PAD_LEFT + (t / totalTime) * CHART_W
  const sy = (d: number) => PAD_TOP + (d / depth) * CHART_H

  const positions: { cx: number; cy: number }[] = []
  let t = descentTime + inputTime.value

  for (let i = 0; i < stops.length; i++) {
    const stop = stops[i]
    const prevD = i === 0 ? depth : stops[i - 1].depth
    t += Math.ceil((prevD - stop.depth) / 15)
    const midT = t + stop.time / 2
    positions.push({ cx: sx(midT), cy: sy(stop.depth) })
    t += stop.time
  }
  return positions
})

const getStop = (entry: TableEntry, stopDepth: number): number | null =>
  entry.stops.find((s) => s.depth === stopDepth)?.time ?? null

const isHighlighted = (depth: number, time: number): boolean => {
  if (activeTab.value !== 'calculator') return false
  if (effectiveDepth.value !== depth) return false
  return result.value?.entry.time === time
}

const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h${m.toString().padStart(2, '0')}` : `${h}h00`
}

const succDive1Depth = ref(20)
const succDive1Time = ref(40)
const surfaceInterval = ref(60)
const succDive2Depth = ref(20)
const succDive2Time = ref(30)

const succDive1Result = computed<DiveResult | null>(() =>
  calculateDive(succDive1Depth.value, succDive1Time.value)
)

const residualGroup = computed<string | null>(() => {
  if (!succDive1Result.value || surfaceInterval.value >= 720) return null
  return getSurfaceIntervalGroup(
    succDive1Result.value.group,
    surfaceInterval.value
  )
})

const majoration = computed<number>(() => {
  if (!residualGroup.value) return 0
  const effectiveD = getEffectiveDepth(succDive2Depth.value)
  const row = majorationTable[residualGroup.value]
  if (!row) return 0
  const depths = Object.keys(row)
    .map(Number)
    .sort((a, b) => a - b)
  for (const d of depths) {
    if (effectiveD <= d) return row[d]
  }
  return row[depths.at(-1)!] ?? 0
})

const succDive2Result = computed<DiveResult | null>(() => {
  if (!succDive1Result.value || !residualGroup.value) return null
  return calculateDive(
    succDive2Depth.value,
    succDive2Time.value + majoration.value
  )
})

const succDive2ResultSimple = computed<DiveResult | null>(() =>
  calculateDive(succDive2Depth.value, succDive2Time.value)
)

useHead({
  title: 'Tables MN90 & FFESSM — Calcul de paliers',
  meta: [
    {
      name: 'description',
      content:
        'Calcul interactif des paliers de décompression selon les tables MN90 de la Marine Nationale et les recommandations FFESSM.',
    },
  ],
})
</script>
