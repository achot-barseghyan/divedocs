<template>
  <div class="font-grotesk text-[#e8f1f4] antialiased">
    <UiPageBackground />

    <main class="mx-auto max-w-[1280px] px-8 pb-24">
      <!-- Hero -->
      <section
        class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-12 pb-16 pt-[72px]"
      >
        <div>
          <div
            class="mb-5 font-mono text-[13px] uppercase tracking-[0.12em] text-[#f5d547]"
          >
            Plongeur encadré · FFESSM
          </div>
          <h1
            class="m-0 text-[clamp(56px,9vw,120px)] font-bold leading-[0.92] tracking-[-0.035em] text-white"
          >
            Niveau 1
          </h1>
        </div>
        <dl class="m-0 flex flex-wrap gap-10 pb-3">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="flex flex-col gap-1.5"
          >
            <dt
              class="font-mono text-xs uppercase tracking-[0.08em] text-[#7f97a2]"
            >
              {{ stat.label }}
            </dt>
            <dd
              class="m-0 text-4xl font-semibold tracking-[-0.02em] text-[#7fe3d6]"
            >
              {{ stat.value }}
            </dd>
          </div>
        </dl>
      </section>

      <!-- Module groups -->
      <section v-for="group in groups" :key="group.label" class="mt-10">
        <div v-if="group.label" class="mb-5 flex items-center gap-4">
          <h2
            class="m-0 font-mono text-sm font-medium uppercase tracking-[0.12em] text-[#b7c9d1]"
          >
            {{ group.label }}
          </h2>
          <div class="h-px flex-1 bg-[rgba(232,241,244,0.1)]"></div>
        </div>

        <div
          class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-4"
        >
          <UiIndexCard
            v-for="mod in group.items"
            :key="mod.link"
            :n="mod.n"
            :title="mod.title"
            :desc="mod.desc"
            :to="mod.link"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ breadcrumb: 'Niveau 1' })

// Set to false to show all modules in a single grid without group headings
const grouped = true

const stats = [
  { label: 'Profondeur max.', value: '20 m' },
  { label: 'Modules', value: '7' },
]

const modules = [
  {
    title: 'Manuel de Formation Technique Niveau 1',
    desc: 'Documents officiels, compétences, protocoles',
    link: '/niveau1/manuel',
  },
  {
    title: 'Théorie',
    desc: 'Pression, flottabilité, accidents, prévention',
    link: '/niveau1/theorie',
  },
  {
    title: 'Matériel',
    desc: 'Équipement, entretien, choix du matériel',
    link: '/niveau1/materiel',
  },
  {
    title: 'Les signes',
    desc: 'Voir les signes de plongée',
    link: '/niveau1/signes',
  },
  {
    title: 'Exercices pratiques',
    desc: 'Vidage de masque, lâcher-reprise, remontées, palmage',
    link: '/niveau1/exercices',
  },
  {
    title: "Simulateur d'Urgences",
    desc: "Scénarios interactifs, gestion des situations d'urgence",
    link: '/niveau1/simulateur',
  },
  {
    title: 'Révisions & Quiz',
    desc: 'Réglementation FFESSM, flashcards, QCM interactifs',
    link: '/niveau1/revisions',
  },
].map((mod, i) => ({ ...mod, n: String(i + 1).padStart(2, '0') }))

const groups = grouped
  ? [
      { label: 'Apprendre', items: modules.slice(0, 4) },
      { label: 'Pratiquer & réviser', items: modules.slice(4) },
    ]
  : [{ label: '', items: modules }]
</script>
