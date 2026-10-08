<template>
  <div class="font-grotesk text-[#e8f1f4] antialiased">
    <UiPageBackground />

    <main class="mx-auto max-w-[1280px] px-8 pb-24">
      <UiPageHero
        title="Théorie"
        subtitle="Retrouve ici tous les modules théoriques du niveau 1."
      />

      <!-- Toolbar -->
      <div
        class="flex flex-wrap items-center gap-4 border-b border-[rgba(232,241,244,0.1)] pb-6"
      >
        <div
          class="flex gap-0.5 rounded-[10px] border border-white/[0.08] bg-white/5 p-[3px]"
          role="tablist"
        >
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            role="tab"
            :aria-selected="activeTab === tab.id"
            class="flex items-center gap-2 rounded-[7px] px-4 py-2 text-[15px] transition-colors"
            :class="
              activeTab === tab.id
                ? 'bg-[#7fe3d6] font-semibold text-[#05111a]'
                : 'font-medium text-[#b7c9d1] hover:bg-white/[0.06] hover:text-white'
            "
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
            <span class="font-mono text-xs opacity-70">{{ tab.count }}</span>
          </button>
        </div>

        <template v-if="activeTab === 'modules'">
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
        </template>
      </div>

      <!-- Videos -->
      <div
        v-if="activeTab === 'videos'"
        class="mt-8 grid grid-cols-[repeat(auto-fill,minmax(min(100%,420px),1fr))] gap-6"
      >
        <article
          v-for="(video, i) in videos"
          :key="video.id"
          class="flex flex-col gap-4"
        >
          <div
            class="relative aspect-video overflow-hidden rounded-[14px] border border-[rgba(232,241,244,0.09)] bg-[#0e2737]"
          >
            <iframe
              v-if="playing === video.id"
              class="absolute inset-0 h-full w-full"
              :src="`https://www.youtube.com/embed/${video.id}?autoplay=1`"
              :title="video.title"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            <UiPlayThumbnail
              v-else
              :src="`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`"
              :label="`Lire : ${video.title}`"
              @play="playing = video.id"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <span class="font-mono text-[13px] text-[#7fe3d6]">
              Cours n°{{ i + 1 }}
            </span>
            <h3 class="m-0 text-xl font-semibold leading-[1.25] text-white">
              {{ video.title }}
            </h3>
            <span class="text-sm text-[#7f97a2]">
              {{ video.channel }} · YouTube
            </span>
          </div>
        </article>
      </div>

      <!-- Written modules -->
      <template v-else>
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
      </template>
    </main>

    <ModalsTheorieModuleDialog
      ref="ModuleDialog"
      :data-path="NIVEAU1_THEORIE_DATA_PATH"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTheorieCourses } from '~/composables/useTheorieCourses'
import { useExportPDF } from '~/composables/useExportPDF'

definePageMeta({ breadcrumb: 'Théorie' })

const ModuleDialog = ref()
const NIVEAU1_THEORIE_DATA_PATH = '/data/theorie-courses-niveau1.json'

const { courses, loading, fetchCourses, searchCourses } = useTheorieCourses(
  NIVEAU1_THEORIE_DATA_PATH
)

const { exportAllModulesToPDF } = useExportPDF(NIVEAU1_THEORIE_DATA_PATH)

const videos = [
  {
    id: 'OU_q2xnfvCA',
    title: 'Cours n°1 : la réglementation N1 et le matériel',
    channel: 'nicoteacher26',
  },
  {
    id: 'y71zsFE3mww',
    title: 'Cours n°2 : la flottabilité',
    channel: 'nicoteacher26',
  },
]

const isExporting = ref(false)
const activeTab = ref<'videos' | 'modules'>('modules')
const playing = ref<string | null>(null)

const tabs = computed(() => [
  { id: 'videos' as const, label: 'Vidéos', count: videos.length },
  {
    id: 'modules' as const,
    label: 'Modules écrits',
    count: courses.value.length,
  },
])

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
