<template>
  <div
    class="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-teal-900 pt-20"
  >
    <img
      src="/img/bg.jpg"
      class="fixed inset-0 h-full w-full object-cover object-center"
      alt="underwater background"
    />
    <div
      class="fixed inset-0 bg-gradient-to-b from-[#001a23]/60 to-[#001a23]/90"
    ></div>
    <!-- Hero Section -->
    <div class="relative overflow-hidden py-20">
      <div class="absolute inset-0"></div>
      <div class="relative z-10 mx-auto max-w-7xl px-6">
        <h1 class="mb-4 text-center text-6xl font-bold">
          <span class="text-yellow-400">Niveau 1</span>
        </h1>
        <p class="mx-auto max-w-3xl text-center text-xl text-gray-300">
          Retrouve ici tous les modules théoriques du niveau 1.
        </p>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="mx-auto mb-12 max-w-7xl px-6">
      <div class="relative mx-auto max-w-2xl">
        <svg
          class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Rechercher un module..."
          class="w-full rounded-xl border border-teal-500/30 bg-slate-800/50 py-4 pl-12 pr-4 text-white placeholder-gray-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
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

    <!-- Courses Grid -->
    <div class="mx-auto max-w-7xl px-6 pb-20">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="course in filteredCourses"
          :key="course.id"
          class="group relative cursor-pointer rounded-2xl border border-teal-500/20 bg-slate-800/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-teal-400/50 hover:bg-slate-800/60"
        >
          <!-- Icon -->
          <div class="mb-4">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 transition-colors group-hover:bg-teal-500/20"
            ></div>
          </div>

          <!-- Title -->
          <h3
            class="mb-3 text-xl font-semibold text-teal-400 transition-colors group-hover:text-teal-300"
          >
            {{ course.title }}
          </h3>

          <!-- Description -->
          <p class="mb-4 line-clamp-3 text-sm text-gray-400">
            {{ course.description }}
          </p>

          <!-- Duration -->
          <div class="flex items-center gap-2 text-sm text-white">
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ course.duration }}</span>
          </div>

          <!-- Hover effect -->
          <div
            class="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/0 to-blue-500/0 transition-all duration-300 group-hover:from-teal-500/5 group-hover:to-blue-500/5"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTheorieCourses } from '~/composables/useTheorieCourses'

const { courses, loading, error, fetchCourses, searchCourses, totalCourses } =
  useTheorieCourses()

// Charger les cours au montage du composant
onMounted(async () => {
  await fetchCourses()
})

const searchTerm = ref('')
// Passer searchTerm (la ref) directement, pas sa valeur
const filteredCourses = searchCourses(searchTerm)
</script>
