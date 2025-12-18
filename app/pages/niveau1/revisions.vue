<script setup lang="ts">
import { gsap } from 'gsap'

interface QuizData {
  title: string
  description: string
  icon: string
  flashcards: any[]
  quiz: any[]
}

// Données
const quizData = ref<QuizData | null>(null)
const selectedMode = ref<'quiz' | 'flashcard' | null>(null)
const isPlaying = ref(false)

// Stats (seulement côté client)
const quizStats = ref<any>({})

// Charger les données
onMounted(async () => {
  try {
    const response = await fetch('/data/quiz-reglementation.json')
    quizData.value = await response.json()

    // Charger les stats depuis localStorage
    if (typeof window !== 'undefined') {
      quizStats.value = JSON.parse(localStorage.getItem('quiz-stats') || '{}')
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
  }
})

// Animation du titre
onMounted(() => {
  gsap.from('.page-title', {
    opacity: 0,
    y: -30,
    duration: 0.8,
    ease: 'power3.out',
  })
})

// Sélectionner un mode
const selectMode = (mode: 'quiz' | 'flashcard') => {
  console.log('Mode sélectionné:', mode)
  console.log('Quiz data:', quizData.value)
  selectedMode.value = mode
  isPlaying.value = true
}

// Retour à la sélection
const backToSelection = () => {
  selectedMode.value = null
  isPlaying.value = false
}

// Gérer la complétion du quiz
const handleQuizComplete = (results: {
  score: number
  total: number
  percentage: number
}) => {
  console.log('Quiz terminé:', results)

  if (typeof window === 'undefined') return

  // Sauvegarder les stats dans localStorage
  const stats = JSON.parse(localStorage.getItem('quiz-stats') || '{}')
  if (!stats['reglementation']) {
    stats['reglementation'] = {
      attempts: 0,
      totalScore: 0,
      bestScore: 0,
      lastScore: 0,
    }
  }

  stats['reglementation'].attempts++
  stats['reglementation'].totalScore += results.score
  stats['reglementation'].lastScore = results.score
  stats['reglementation'].bestScore = Math.max(
    stats['reglementation'].bestScore,
    results.score
  )

  localStorage.setItem('quiz-stats', JSON.stringify(stats))
  quizStats.value = stats
}

// Modes disponibles
const modes = [
  {
    id: 'quiz',
    title: 'Mode Quiz',
    description: 'Testez vos connaissances avec 20 questions',
    icon: '📝',
    color: 'from-blue-500 to-indigo-500',
    questionsCount: 20,
  },
  {
    id: 'flashcard',
    title: 'Mode Révision',
    description: 'Parcourez les flashcards pour mémoriser',
    icon: '🎴',
    color: 'from-green-500 to-emerald-500',
    cardsCount: 15,
  },
]
</script>

<template>
  <div class="min-h-screen p-6">
    <div class="mx-auto max-w-6xl">
      <!-- En-tête -->
      <div class="mb-8">
        <h1 class="page-title mb-2 mt-4 text-4xl font-bold text-white">
          📚 Révisions & Quiz
        </h1>
        <p class="text-white/80">
          Révisez et testez vos connaissances sur la réglementation FFESSM
        </p>
      </div>

      <!-- Chargement -->
      <div v-if="!quizData" class="flex h-64 items-center justify-center">
        <div class="text-center">
          <i class="pi pi-spin pi-spinner mb-4 text-4xl text-blue-500"></i>
          <p class="text-gray-600 dark:text-gray-400">Chargement...</p>
        </div>
      </div>

      <!-- Sélection du mode -->
      <div v-else-if="!isPlaying" class="space-y-6">
        <!-- Informations du sujet -->
        <Card
          class="border-2 border-blue-500/30 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
        >
          <template #content>
            <div class="flex items-start gap-4">
              <div class="text-5xl">⚓</div>
              <div class="flex-1">
                <h2
                  class="mb-2 text-2xl font-bold text-gray-900 dark:text-white"
                >
                  {{ quizData.title }}
                </h2>
                <p class="mb-4 text-gray-700 dark:text-gray-300">
                  {{ quizData.description }}
                </p>
                <div class="flex gap-4 text-sm">
                  <span class="flex items-center gap-2">
                    <span class="text-2xl">📝</span>
                    <span class="font-medium text-black">
                      {{ quizData.quiz.length }} questions
                    </span>
                  </span>
                  <span class="flex items-center gap-2">
                    <span class="text-2xl">🎴</span>
                    <span class="font-medium text-black">
                      {{ quizData.flashcards.length }} flashcards
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </template>
        </Card>

        <!-- Sélection du mode -->
        <div class="grid gap-6 md:grid-cols-2">
          <Card
            v-for="mode in modes"
            :key="mode.id"
            class="cursor-pointer border-2 transition-all duration-300 hover:border-blue-500 hover:shadow-xl"
            @click="selectMode(mode.id as 'quiz' | 'flashcard')"
          >
            <template #header>
              <div
                class="p-6"
                :class="`bg-gradient-to-r ${mode.color} text-white`"
              >
                <div class="mb-3 text-6xl">{{ mode.icon }}</div>
                <h3 class="text-2xl font-bold">{{ mode.title }}</h3>
              </div>
            </template>

            <template #content>
              <p class="mb-4 text-gray-700 dark:text-gray-300">
                {{ mode.description }}
              </p>

              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  {{
                    mode.id === 'quiz'
                      ? `${mode.questionsCount} questions`
                      : `${mode.cardsCount} cartes`
                  }}
                </span>
                <Button
                  label="Commencer"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  :class="
                    mode.id === 'quiz' ? 'p-button-primary' : 'p-button-success'
                  "
                />
              </div>
            </template>
          </Card>
        </div>

        <!-- Statistiques -->
        <Card>
          <template #header>
            <div class="bg-gray-50 p-4 dark:bg-gray-800">
              <h3 class="flex items-center gap-2 text-xl font-bold">
                <span>📊</span>
                <span>Vos statistiques</span>
              </h3>
            </div>
          </template>

          <template #content>
            <div class="grid gap-4 md:grid-cols-4">
              <div
                class="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-900/20"
              >
                <div class="text-3xl font-bold text-blue-500">
                  {{ quizStats['reglementation']?.attempts || 0 }}
                </div>
                <div class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Tentatives
                </div>
              </div>
              <div
                class="rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/20"
              >
                <div class="text-3xl font-bold text-green-500">
                  {{ quizStats['reglementation']?.bestScore || 0 }}
                </div>
                <div class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Meilleur score
                </div>
              </div>
              <div
                class="rounded-lg bg-yellow-50 p-4 text-center dark:bg-yellow-900/20"
              >
                <div class="text-3xl font-bold text-yellow-500">
                  {{ quizStats['reglementation']?.lastScore || 0 }}
                </div>
                <div class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Dernier score
                </div>
              </div>
              <div
                class="rounded-lg bg-purple-50 p-4 text-center dark:bg-purple-900/20"
              >
                <div class="text-3xl font-bold text-purple-500">
                  {{
                    quizStats['reglementation']?.attempts
                      ? Math.round(
                          ((quizStats['reglementation'].totalScore /
                            quizStats['reglementation'].attempts) *
                            100) /
                            20
                        )
                      : 0
                  }}%
                </div>
                <div class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Moyenne
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <!-- Mode Quiz -->
      <div v-else-if="selectedMode === 'quiz'">
        <QuizEngine
          v-if="quizData"
          :quiz-data="quizData"
          @complete="handleQuizComplete"
          @exit="backToSelection"
        />
        <div v-else class="text-center text-white">Chargement du quiz...</div>
      </div>

      <!-- Mode Flashcard -->
      <div v-else-if="selectedMode === 'flashcard'">
        <QuizFlashcardViewer
          v-if="quizData"
          :flashcard-data="quizData"
          @exit="backToSelection"
        />
        <div v-else class="text-center text-white">
          Chargement des flashcards...
        </div>
      </div>

      <!-- Debug fallback -->
      <div v-else class="text-center text-white">
        <p>État: selectedMode={{ selectedMode }}, isPlaying={{ isPlaying }}</p>
        <p>quizData présent: {{ !!quizData }}</p>
      </div>
    </div>
  </div>
</template>
