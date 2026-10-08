<template>
  <!-- Cards -->
  <section
    v-if="!showResults && currentCard"
    :class="[panelClass, 'overflow-hidden']"
  >
    <div
      class="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-[rgba(232,241,244,0.08)] px-7 py-[18px] font-mono text-[13px]"
    >
      <span class="text-[#e8f1f4]">Flashcards</span>
      <span class="flex-1"></span>
      <span class="text-[#f5d547]">
        Carte {{ currentIndex + 1 }}/{{ cards.length }}
      </span>
      <span class="text-[#7fe3d6]">{{ knownCards.length }} connues</span>
      <span class="text-[#ff8f80]">{{ unknownCards.length }} à revoir</span>
      <button
        type="button"
        class="text-[#7f97a2] hover:text-white"
        @click="emit('exit')"
      >
        Quitter ✕
      </button>
    </div>
    <div
      class="-mt-px grid gap-1 px-7"
      :style="{ gridTemplateColumns: `repeat(${cards.length}, 1fr)` }"
      aria-hidden="true"
    >
      <div
        v-for="(card, i) in cards"
        :key="card.id"
        class="h-1 rounded-sm"
        :class="segmentClass(card.id, i)"
      ></div>
    </div>

    <div class="flex flex-col gap-6 px-7 pb-7 pt-8">
      <!-- The card: click (or Space) to flip -->
      <button
        type="button"
        class="flex min-h-[340px] flex-col gap-5 rounded-[14px] border p-7 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fe3d6]"
        :class="
          isFlipped
            ? 'cursor-default border-[rgba(245,213,71,0.3)] bg-[rgba(245,213,71,0.04)]'
            : 'border-[rgba(232,241,244,0.12)] bg-white/[0.03] hover:border-[rgba(245,213,71,0.45)]'
        "
        :aria-label="isFlipped ? undefined : 'Retourner la carte'"
        @click="flipCard"
      >
        <span class="flex w-full items-center justify-between gap-3">
          <span :class="tagClass(isFlipped ? 'yellow' : 'aqua')">
            {{ isFlipped ? 'Réponse' : 'Question' }}
          </span>
          <span class="font-mono text-xs text-[#7f97a2]">
            {{ currentCard.category }}
          </span>
        </span>

        <template v-if="!isFlipped">
          <span
            class="my-auto text-[clamp(26px,3.4vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em] text-white [text-wrap:balance]"
          >
            {{ cardTitle(currentCard.question) }}
          </span>
          <span class="font-mono text-xs text-[#7f97a2]">
            Cliquer ou Espace pour retourner
          </span>
        </template>

        <span v-else class="flex w-full flex-col gap-3">
          <span class="text-lg font-semibold text-white">
            {{ cardTitle(currentCard.question) }}
          </span>
          <template v-for="(block, b) in answerBlocks" :key="b">
            <span
              v-if="block.type === 'heading'"
              class="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-[#f5d547]"
            >
              {{ block.text }}
            </span>
            <span v-else-if="block.type === 'list'" class="flex flex-col gap-2">
              <span
                v-for="(item, i) in block.items"
                :key="i"
                class="grid grid-cols-[16px_1fr] gap-2.5 text-base leading-[1.55] text-[#d4e2e7]"
              >
                <span
                  class="mt-[9px] h-1.5 w-1.5 rounded-full bg-[#7fe3d6]"
                ></span>
                <span>{{ item }}</span>
              </span>
            </span>
            <span v-else class="text-base leading-[1.6] text-[#d4e2e7]">
              {{ block.text }}
            </span>
          </template>
        </span>
      </button>

      <div class="flex flex-wrap items-center justify-between gap-3">
        <template v-if="isFlipped">
          <span class="font-mono text-xs text-[#7f97a2]">
            ← à revoir · → je sais
          </span>
          <div class="flex flex-wrap gap-3">
            <button
              type="button"
              :class="[
                secondaryButton,
                'h-12 rounded-xl px-5 text-base hover:border-[rgba(255,143,128,0.5)] hover:bg-[rgba(255,143,128,0.08)]',
              ]"
              @click="markCard(false)"
            >
              À revoir
            </button>
            <button
              type="button"
              :class="[primaryButton, 'h-12 rounded-xl px-5 text-base']"
              @click="markCard(true)"
            >
              Je sais ✓
            </button>
          </div>
        </template>
        <template v-else>
          <button
            type="button"
            :class="[secondaryButton, 'h-10 px-4 text-sm']"
            :disabled="currentIndex === 0"
            @click="previousCard"
          >
            ← Précédente
          </button>
          <button
            type="button"
            :class="[secondaryButton, 'h-10 px-4 text-sm']"
            :disabled="isLastCard"
            @click="nextCard"
          >
            Suivante →
          </button>
        </template>
      </div>
    </div>
  </section>

  <!-- Results -->
  <section
    v-else-if="showResults"
    :class="[panelClass, 'flex flex-col gap-8 p-6 sm:p-10']"
  >
    <div class="flex flex-col gap-3">
      <span
        class="font-mono text-[13px] uppercase tracking-[0.12em] text-[#7f97a2]"
      >
        Révision terminée ! · {{ flashcardData.title }}
      </span>
      <div class="flex flex-wrap items-baseline gap-3">
        <span
          class="text-[clamp(64px,10vw,112px)] font-bold leading-[0.9] tracking-[-0.04em]"
          :class="percentage >= 80 ? 'text-[#7fe3d6]' : 'text-[#f5d547]'"
        >
          {{ knownCards.length }}
        </span>
        <span class="text-[32px] font-semibold text-[#7f97a2]">
          / {{ cards.length }}
        </span>
      </div>
      <p class="m-0 text-[19px] leading-normal text-[#d4e2e7]">
        {{ performanceMessage }}
      </p>
    </div>

    <div
      class="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-[rgba(232,241,244,0.1)] bg-[rgba(232,241,244,0.1)]"
    >
      <div
        v-for="cell in resultCells"
        :key="cell.label"
        class="flex flex-col gap-1 bg-[#0b2130] p-[18px]"
      >
        <span class="text-[30px] font-semibold" :class="cell.color">
          {{ cell.value }}
        </span>
        <span class="text-sm text-[#9fb4bd]">{{ cell.label }}</span>
      </div>
    </div>

    <div
      v-if="unknownCards.length"
      class="rounded-[14px] border border-[rgba(245,213,71,0.25)] bg-[rgba(245,213,71,0.05)] p-6"
    >
      <h3
        class="m-0 mb-4 font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-[#f5d547]"
      >
        Cartes à revoir
      </h3>
      <ul class="m-0 flex list-none flex-col gap-2.5 p-0">
        <li
          v-for="card in cardsToReview"
          :key="card.id"
          class="grid grid-cols-[16px_1fr] gap-2.5 text-base leading-[1.55] text-[#d4e2e7]"
        >
          <span class="mt-[9px] h-1.5 w-1.5 rounded-full bg-[#f5d547]"></span>
          <span>{{ cardTitle(card.question) }}</span>
        </li>
      </ul>
    </div>

    <div class="flex flex-wrap gap-3">
      <button
        type="button"
        :class="[secondaryButton, 'h-12 rounded-xl px-5 text-base']"
        @click="restart"
      >
        ↻ Recommencer
      </button>
      <button
        type="button"
        :class="[primaryButton, 'h-12 rounded-xl px-5 text-base']"
        @click="emit('exit')"
      >
        Retour au menu
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

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

const panelClass =
  'rounded-[18px] border border-[rgba(232,241,244,0.1)] bg-white/[0.035]'

const cards = computed(() => props.flashcardData.flashcards)
const currentIndex = ref(0)
const isFlipped = ref(false)
const knownCards = ref<number[]>([])
const unknownCards = ref<number[]>([])
const showResults = ref(false)

const currentCard = computed(() => cards.value[currentIndex.value])
const isLastCard = computed(() => currentIndex.value === cards.value.length - 1)
const percentage = computed(() =>
  Math.round((knownCards.value.length / cards.value.length) * 100)
)
const cardsToReview = computed(() =>
  cards.value.filter((c) => unknownCards.value.includes(c.id))
)

// Questions are stored as "Slide 3 : Title": the counter already gives the number
const cardTitle = (question: string) =>
  question.replace(/^Slide \d+\s*:\s*/, '')

type Block =
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'text'; text: string }

// "TITRE :" lines become headings, "• " lines become list items
const answerBlocks = computed<Block[]>(() => {
  const blocks: Block[] = []
  for (const raw of (currentCard.value?.answer ?? '').split('\n')) {
    const line = raw.trim()
    if (!line) continue
    const last = blocks[blocks.length - 1]
    if (line.startsWith('•')) {
      const item = line.replace(/^•\s*/, '')
      if (last?.type === 'list') last.items.push(item)
      else blocks.push({ type: 'list', items: [item] })
    } else if (line === line.toUpperCase() && /[A-Z]/.test(line)) {
      blocks.push({ type: 'heading', text: line.replace(/\s*:$/, '') })
    } else {
      blocks.push({ type: 'text', text: line })
    }
  }
  return blocks
})

const segmentClass = (id: number, i: number) => {
  if (knownCards.value.includes(id)) return 'bg-[#7fe3d6]'
  if (unknownCards.value.includes(id)) return 'bg-[#ff8f80]'
  if (i === currentIndex.value) return 'bg-[rgba(245,213,71,0.6)]'
  return 'bg-[rgba(232,241,244,0.12)]'
}

const flipCard = () => {
  isFlipped.value = true
}

const markCard = (known: boolean) => {
  const card = currentCard.value
  if (!isFlipped.value || !card) return
  // Re-marking a card (after going back) replaces the previous mark
  knownCards.value = knownCards.value.filter((id) => id !== card.id)
  unknownCards.value = unknownCards.value.filter((id) => id !== card.id)
  ;(known ? knownCards : unknownCards).value.push(card.id)

  if (isLastCard.value) showResults.value = true
  else nextCard()
}

const nextCard = () => {
  if (currentIndex.value < cards.value.length - 1) {
    currentIndex.value++
    isFlipped.value = false
  }
}

const previousCard = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    isFlipped.value = false
  }
}

const restart = () => {
  currentIndex.value = 0
  isFlipped.value = false
  knownCards.value = []
  unknownCards.value = []
  showResults.value = false
}

const resultCells = computed(() => [
  { label: 'Connues', value: knownCards.value.length, color: 'text-[#7fe3d6]' },
  {
    label: 'À revoir',
    value: unknownCards.value.length,
    color: 'text-[#ff8f80]',
  },
  { label: 'Maîtrise', value: `${percentage.value}%`, color: 'text-white' },
])

const performanceMessage = computed(() => {
  if (percentage.value >= 90) return 'Excellent ! Ces notions sont acquises.'
  if (percentage.value >= 75)
    return 'Très bien ! Repasse sur les cartes manquées.'
  if (percentage.value >= 50) return 'Continue ! Revois les cartes ci-dessous.'
  return 'À revoir. Reprends les cartes tranquillement avant le quiz.'
})

// Space/Enter: flip · ←/→: à revoir / je sais · ↑/↓: previous / next card
useEventListener('keydown', (event: KeyboardEvent) => {
  if (showResults.value) return
  const target = event.target as HTMLElement | null
  if (target?.closest('input, textarea, select')) return
  // Let focused buttons handle their own Space/Enter activation
  const onButton = !!target?.closest('button')

  if ((event.key === ' ' || event.key === 'Enter') && !onButton) {
    event.preventDefault()
    flipCard()
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
})
</script>
