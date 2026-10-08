<template>
  <div class="font-grotesk text-[#e8f1f4] antialiased">
    <UiPageBackground />

    <main class="mx-auto max-w-[1280px] px-8 pb-24">
      <UiPageHero
        eyebrow="Niveau 2"
        title="Théorie"
        subtitle="Retrouve ici tous les modules théoriques du niveau 2."
      />

      <!-- Toolbar -->
      <div
        class="flex flex-wrap items-center gap-4 border-b border-[rgba(232,241,244,0.1)] pb-6"
      >
        <label
          class="flex h-11 min-w-0 flex-[1_1_260px] items-center gap-2.5 rounded-[10px] border border-[rgba(232,241,244,0.12)] bg-white/[0.035] px-3.5 transition-colors focus-within:border-[rgba(127,227,214,0.6)]"
        >
          <span class="text-[15px] text-[#7f97a2]" aria-hidden="true">⌕</span>
          <span class="sr-only">Rechercher un module</span>
          <input
            v-model="searchTerm"
            type="search"
            placeholder="Rechercher un module"
            class="min-w-0 flex-1 border-0 bg-transparent text-[15px] text-[#e8f1f4] placeholder-[#7f97a2] outline-none"
          />
        </label>
        <span class="font-mono text-[13px] text-[#7f97a2]">
          {{ filteredCourses.length }} / {{ courses.length }} modules
        </span>
        <button
          type="button"
          :class="[
            secondaryButton,
            'h-11 gap-2 border-[rgba(232,241,244,0.12)] px-4 text-[15px]',
          ]"
          :disabled="isExporting"
          @click="handleExportPDF"
        >
          {{ isExporting ? 'Export en cours…' : 'Export PDF' }}
          <span class="font-mono text-xs text-[#7fe3d6]" aria-hidden="true">
            ↓
          </span>
        </button>
      </div>

      <div
        class="mt-8 grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-4"
      >
        <UiIndexCard
          v-for="course in filteredCourses"
          :key="course.id"
          :n="pad2(course.id)"
          :title="course.title"
          :desc="course.description"
          @click="openModuleDialog(course.id)"
        />
      </div>
      <p
        v-if="filteredCourses.length === 0 && !loading"
        class="mt-12 text-base text-[#7f97a2]"
      >
        Aucun module ne correspond à « {{ searchTerm }} ».
      </p>
    </main>

    <ModalsTheorieModuleDialog
      ref="ModuleDialog"
      :data-path="NIVEAU2_THEORIE_DATA_PATH"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTheorieCourses } from '~/composables/useTheorieCourses'
import { useExportPDF } from '~/composables/useExportPDF'

definePageMeta({ breadcrumb: 'Théorie' })

const ModuleDialog = ref()
const NIVEAU2_THEORIE_DATA_PATH = '/data/theorie-courses.json'

const { courses, loading, fetchCourses, searchCourses } = useTheorieCourses(
  NIVEAU2_THEORIE_DATA_PATH
)

const { exportAllModulesToPDF } = useExportPDF(NIVEAU2_THEORIE_DATA_PATH)

const isExporting = ref(false)

onMounted(async () => {
  await fetchCourses()
})

const searchTerm = ref('')
const filteredCourses = searchCourses(searchTerm)

const openModuleDialog = (idModule: number) => {
  ModuleDialog.value.open(idModule)
}

const handleExportPDF = async () => {
  try {
    isExporting.value = true
    await exportAllModulesToPDF()
  } catch (error) {
    console.error("Erreur lors de l'export PDF:", error)
  } finally {
    isExporting.value = false
  }
}
</script>
