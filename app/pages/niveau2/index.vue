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
            Plongeur autonome · FFESSM
          </div>
          <h1
            class="m-0 text-[clamp(56px,9vw,120px)] font-bold leading-[0.92] tracking-[-0.035em] text-white"
          >
            Niveau 2
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

      <section class="mt-10">
        <div class="mb-5 flex items-center gap-4">
          <h2
            class="m-0 font-mono text-sm font-medium uppercase tracking-[0.12em] text-[#b7c9d1]"
          >
            Apprendre
          </h2>
          <div class="h-px flex-1 bg-[rgba(232,241,244,0.1)]"></div>
        </div>
        <div
          class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-4"
        >
          <UiIndexCard
            v-for="(mod, i) in modules"
            :key="mod.link"
            :n="pad2(i + 1)"
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
definePageMeta({ breadcrumb: 'Niveau 2' })

const modules = [
  {
    title: 'Théorie',
    desc: 'Cours théoriques, recherche, ouverture des modules et export PDF',
    link: '/niveau2/theorie',
  },
]

// N2: autonomous to 20 m, supervised to 40 m (FFESSM PA20 / PE40)
const stats = [
  { label: 'Autonome', value: '20 m' },
  { label: 'Encadré', value: '40 m' },
  { label: 'Modules', value: String(modules.length) },
]
</script>
