<template>
  <div class="min-h-screen">
    <div class="relative overflow-hidden px-4 py-20">
      <div class="relative z-10 mx-auto max-w-7xl px-6">
        <h1 class="mb-4 text-center text-6xl font-bold">
          <span class="text-yellow-500">Niveau 1</span>
        </h1>
        <p class="mx-auto max-w-3xl text-center text-xl text-gray-300">
          Retrouve ici tous les modules théoriques du niveau 1.
        </p>
      </div>
    </div>

    <div class="mx-auto mb-12 max-w-7xl px-6">
      <div class="relative mx-auto max-w-2xl">
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="searchTerm"
            placeholder="Search"
            class="w-full rounded-xl border border-teal-500/30 bg-slate-800/50 py-4 pl-12 pr-4 text-white placeholder-gray-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </IconField>
      </div>
    </div>

    <div
      v-if="filteredCourses.length === 0 && !loading"
      class="relative z-10 mx-auto max-w-7xl px-6 pb-20"
    >
      <h2 class="text-center text-xl text-gray-300">
        Aucun résultat ne correspond actuellement à cette recherche.
      </h2>
    </div>

    <div class="mx-auto max-w-7xl px-6 pb-20">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="course in filteredCourses"
          :key="course.id"
          @click="openModuleDialog(course.id)"
          class="group relative cursor-pointer rounded-2xl border border-teal-500/20 bg-slate-800/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-teal-400/50 hover:bg-slate-800/60"
        >
          <div class="mb-4">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 transition-colors group-hover:bg-teal-500/20"
            >
              <Icon
                v-if="course.icon"
                :name="course.icon"
                size="1.2rem"
                style="color: white"
              />
              <Icon
                v-else
                name="icon-park-outline:diving"
                size="1.2rem"
                style="color: white"
              />
            </div>
          </div>

          <h3
            class="mb-3 text-xl font-semibold text-teal-400 transition-colors group-hover:text-teal-300"
          >
            {{ course.title }}
          </h3>

          <p class="mb-4 line-clamp-3 text-sm text-gray-400">
            {{ course.description }}
          </p>

          <div class="flex items-center gap-2 text-sm text-white">
            <Icon
              name="material-symbols:nest-clock-farsight-analog-outline"
              size="1.2rem"
            />
            <span>{{ course.duration }}</span>
          </div>

          <div
            class="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/0 to-blue-500/0 transition-all duration-300 group-hover:from-teal-500/5 group-hover:to-blue-500/5"
          ></div>
        </div>
      </div>
    </div>
    <ModalsTheorieModuleDialog ref="ModuleDialog" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTheorieCourses } from '~/composables/useTheorieCourses'

const ModuleDialog = ref()

const { courses, loading, error, fetchCourses, searchCourses, totalCourses } =
  useTheorieCourses()

onMounted(async () => {
  await fetchCourses()
})

const searchTerm = ref('')
const filteredCourses = searchCourses(searchTerm)

const openModuleDialog = (idModule: number) => {
  ModuleDialog.value.open(idModule)
}
</script>
