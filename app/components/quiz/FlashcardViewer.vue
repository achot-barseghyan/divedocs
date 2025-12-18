<script setup lang="ts">
interface Flashcard {
  id: number
  question: string
  answer: string
  category: string
}

interface FlashcardData {
  title: string
  description: string
  icon: string
  flashcards: Flashcard[]
}

const props = defineProps<{
  flashcardData: FlashcardData
}>()

const emit = defineEmits<{
  exit: []
}>()

// État
const currentIndex = ref(0)
const isFlipped = ref(false)
const knownCards = ref<number[]>([])
const unknownCards = ref<number[]>([])
const showResults = ref(false)

// Carte actuelle
const currentCard = computed(
  () => props.flashcardData.flashcards[currentIndex.value]
)
const progress = computed(
  () => ((currentIndex.value + 1) / props.flashcardData.flashcards.length) * 100
)
const isLastCard = computed(
  () => currentIndex.value === props.flashcardData.flashcards.length - 1
)
const cardsReviewed = computed(
  () => knownCards.value.length + unknownCards.value.length
)

// Debug
onMounted(() => {
  console.log('FlashcardViewer monté')
  console.log('Props:', props.flashcardData)
  console.log('Nombre de flashcards:', props.flashcardData?.flashcards?.length)
  console.log('Current card:', currentCard.value)
})

// Retourner la carte
const flipCard = () => {
  isFlipped.value = !isFlipped.value
}

// Marquer comme connu/inconnu
const markCard = (known: boolean) => {
  if (!isFlipped.value || !currentCard.value) return

  if (known) {
    knownCards.value.push(currentCard.value.id)
  } else {
    unknownCards.value.push(currentCard.value.id)
  }

  if (isLastCard.value) {
    showResults.value = true
  } else {
    nextCard()
  }
}

// Carte suivante
const nextCard = () => {
  if (currentIndex.value < props.flashcardData.flashcards.length - 1) {
    currentIndex.value++
    isFlipped.value = false
  }
}

// Carte précédente
const previousCard = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    isFlipped.value = false
  }
}

// Recommencer
const restart = () => {
  currentIndex.value = 0
  isFlipped.value = false
  knownCards.value = []
  unknownCards.value = []
  showResults.value = false
}

// Message de performance
const performanceMessage = computed(() => {
  const percentage = Math.round(
    (knownCards.value.length / props.flashcardData.flashcards.length) * 100
  )

  if (percentage >= 90)
    return { text: 'Excellent !', icon: '🏆', color: 'text-green-500' }
  if (percentage >= 75)
    return { text: 'Très bien !', icon: '⭐', color: 'text-blue-500' }
  if (percentage >= 60)
    return { text: 'Bien joué !', icon: '👍', color: 'text-yellow-500' }
  if (percentage >= 50)
    return { text: 'Continuez !', icon: '📚', color: 'text-orange-500' }
  return { text: 'À revoir', icon: '💪', color: 'text-red-500' }
})

// Navigation au clavier
const handleKeyPress = (event: KeyboardEvent) => {
  if (showResults.value) return

  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault()
    if (!isFlipped.value) {
      flipCard()
    }
  } else if (event.key === 'ArrowRight' && isFlipped.value) {
    markCard(true)
  } else if (event.key === 'ArrowLeft' && isFlipped.value) {
    markCard(false)
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    previousCard()
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    nextCard()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})
</script>

<template>
  <div class="flashcard-viewer">
    <!-- Vue normale : Flashcards -->
    <div v-if="!showResults && currentCard" class="space-y-6">
      <!-- Barre de progression -->
      <div class="space-y-2">
        <div class="flex items-center justify-between text-sm">
          <span class="font-medium">
            Carte {{ currentIndex + 1 }} / {{ flashcardData.flashcards.length }}
          </span>
          <div class="flex gap-4 text-white">
            <span class="flex items-center gap-1">
              <span class="text-green-500">✓</span>
              {{ knownCards.length }}
            </span>
            <span class="flex items-center gap-1">
              <span class="text-red-500">✗</span>
              {{ unknownCards.length }}
            </span>
          </div>
        </div>
        <div class="h-2 w-full rounded-full bg-gray-200">
          <div
            class="h-2 rounded-full bg-blue-500 transition-all duration-300"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>

      <!-- Carte -->
      <div class="perspective-1000">
        <div
          class="relative w-full cursor-pointer"
          style="min-height: 500px"
          @click="flipCard"
        >
          <div
            class="preserve-3d absolute h-full w-full transition-transform duration-500"
            :style="{
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }"
          >
            <!-- Face avant (Question) -->
            <Card
              class="backface-hidden absolute h-full w-full border-2 border-blue-500/30"
            >
              <template #header>
                <div
                  class="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-6"
                >
                  <div class="text-3xl">❓</div>
                  <div class="flex-1">
                    <Tag
                      :value="currentCard.category"
                      severity="info"
                      class="mb-2"
                    />
                    <div class="d text-sm text-gray-600">
                      Cliquez pour révéler la réponse
                    </div>
                  </div>
                </div>
              </template>

              <template #content>
                <div
                  class="flex h-48 items-center justify-center overflow-y-auto"
                >
                  <p
                    class="whitespace-pre-line px-8 text-center text-xl font-bold text-white"
                  >
                    {{ currentCard.question }}
                  </p>
                </div>
              </template>
            </Card>

            <!-- Face arrière (Réponse) -->
            <Card
              class="backface-hidden absolute h-full w-full border-2 border-green-500/30"
              style="transform: rotateY(180deg)"
            >
              <template #header>
                <div
                  class="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 p-6 dark:from-green-900/20 dark:to-emerald-900/20"
                >
                  <div class="text-3xl">💡</div>
                  <div class="flex-1">
                    <Tag
                      :value="currentCard.category"
                      severity="success"
                      class="mb-2"
                    />
                    <div class="text-sm text-gray-600">Réponse</div>
                  </div>
                </div>
              </template>

              <template #content>
                <div
                  class="flex h-96 items-start justify-center overflow-y-auto p-4"
                >
                  <p
                    class="whitespace-pre-line px-8 text-left text-base leading-relaxed text-white"
                  >
                    {{ currentCard.answer }}
                  </p>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>

      <!-- Instructions et contrôles -->
      <div class="mb-4 text-center text-sm text-white">
        <p v-if="!isFlipped">
          Cliquez sur la carte ou appuyez sur
          <kbd class="rounded bg-gray-700 p-2">Espace</kbd>
          pour voir la réponse
        </p>
        <p v-else>Connaissez-vous cette réponse ?</p>
      </div>

      <!-- Boutons d'action -->
      <div class="flex gap-3">
        <Button
          label="Quitter"
          severity="primary"
          text
          @click="emit('exit')"
          class="flex-shrink-0"
        />

        <div class="flex flex-1 gap-3">
          <Button
            v-if="isFlipped"
            label="Non, à revoir"
            severity="danger"
            @click="markCard(false)"
            icon="pi pi-times"
            class="flex-1"
          />
          <Button
            v-if="isFlipped"
            label="Oui, je savais"
            severity="success"
            @click="markCard(true)"
            icon="pi pi-check"
            class="flex-1"
          />

          <Button
            v-if="!isFlipped && currentIndex > 0"
            icon="pi pi-arrow-left"
            @click="previousCard"
            text
            class="flex-shrink-0"
          />
          <Button
            v-if="!isFlipped && !isLastCard"
            icon="pi pi-arrow-right"
            @click="nextCard"
            text
            class="flex-shrink-0"
          />
        </div>
      </div>

      <!-- Raccourcis clavier -->
      <div
        class="border-t pt-4 text-center text-xs text-gray-500 dark:text-gray-500"
      >
        <p>
          Raccourcis :
          <kbd>Espace</kbd>
          Retourner ·
          <kbd>←</kbd>
          Non ·
          <kbd>→</kbd>
          Oui ·
          <kbd>↑</kbd>
          Précédent ·
          <kbd>↓</kbd>
          Suivant
        </p>
      </div>
    </div>

    <!-- Vue Résultats -->
    <div v-else class="space-y-6">
      <Card class="text-center">
        <template #header>
          <div class="p-8">
            <div class="mb-4 text-8xl">{{ performanceMessage.icon }}</div>
            <h2
              class="mb-2 text-3xl font-bold"
              :class="performanceMessage.color"
            >
              {{ performanceMessage.text }}
            </h2>
          </div>
        </template>

        <template #content>
          <div class="space-y-6">
            <!-- Statistiques -->
            <div class="grid grid-cols-3 gap-4">
              <div class="rounded-lg bg-green-50 p-4">
                <div class="text-3xl font-bold text-green-500">
                  {{ knownCards.length }}
                </div>
                <div class="text-sm text-gray-600">Cartes connues</div>
              </div>
              <div class="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                <div class="text-3xl font-bold text-red-500">
                  {{ unknownCards.length }}
                </div>
                <div class="text-sm text-gray-600">À revoir</div>
              </div>
              <div class="rounded-lg bg-gray-50 p-4">
                <div
                  class="text-3xl font-bold"
                  :class="performanceMessage.color"
                >
                  {{
                    Math.round(
                      (knownCards.length / flashcardData.flashcards.length) *
                        100
                    )
                  }}%
                </div>
                <div class="text-sm text-gray-600">Réussite</div>
              </div>
            </div>

            <!-- Liste des cartes à revoir -->
            <div v-if="unknownCards.length > 0" class="border-t pt-6">
              <h3 class="mb-4 text-left text-lg font-bold">
                Cartes à revoir ({{ unknownCards.length }})
              </h3>
              <div class="space-y-2 text-left">
                <div
                  v-for="cardId in unknownCards"
                  :key="cardId"
                  class="rounded-lg bg-red-50 p-3"
                >
                  <p class="font-medium">
                    {{
                      flashcardData.flashcards.find((c) => c.id === cardId)
                        ?.question
                    }}
                  </p>
                  <p class="mt-1 text-sm text-gray-600">
                    {{
                      flashcardData.flashcards.find((c) => c.id === cardId)
                        ?.answer
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template #footer>
          <div class="flex gap-3">
            <Button
              v-if="unknownCards.length > 0"
              label="Revoir les cartes manquées"
              severity="warning"
              icon="pi pi-refresh"
              @click="restart"
              class="flex-1"
            />
            <Button
              v-else
              label="Recommencer"
              severity="secondary"
              icon="pi pi-refresh"
              @click="restart"
              class="flex-1"
            />
            <Button
              label="Terminer"
              @click="emit('exit')"
              icon="pi pi-check"
              class="flex-1"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

kbd {
  font-family: monospace;
  font-size: 0.9em;
}
</style>
