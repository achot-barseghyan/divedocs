<template>
  <div class="font-grotesk text-[#e8f1f4] antialiased">
    <UiPageBackground />

    <main class="mx-auto max-w-[1280px] px-8 pb-24">
      <div v-if="loading" class="flex justify-center py-24">
        <ProgressSpinner />
      </div>

      <div
        v-else-if="error"
        class="mt-12 rounded-[14px] border border-[rgba(255,143,128,0.35)] bg-[rgba(255,143,128,0.08)] p-6 text-[#ff8f80]"
      >
        {{ error }}
      </div>

      <div
        v-else-if="currentPageData"
        class="mt-12 flex flex-wrap items-start gap-14"
      >
        <!-- Sidebar -->
        <aside
          class="flex max-w-[300px] flex-[1_1_240px] flex-col gap-7 md:sticky md:top-24"
        >
          <div class="flex flex-col gap-2">
            <span
              class="font-mono text-xs uppercase tracking-[0.12em] text-[#f5d547]"
            >
              Manuel de formation
            </span>
            <span class="text-xl font-semibold leading-[1.25] text-white">
              Manuel de Formation Technique Niveau 1
            </span>
          </div>

          <div class="flex flex-col gap-3">
            <div
              class="flex items-baseline justify-between font-mono text-[13px]"
            >
              <span class="text-[#7f97a2]">Page</span>
              <span class="text-[#7fe3d6]">
                {{ currentPage }} / {{ totalPages }}
              </span>
            </div>
            <div
              class="grid gap-1"
              :style="{ gridTemplateColumns: `repeat(${totalPages}, 1fr)` }"
              role="group"
              aria-label="Pages du manuel"
            >
              <button
                v-for="n in totalPages"
                :key="n"
                type="button"
                class="h-1.5 rounded-[3px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fe3d6]"
                :class="
                  n === currentPage
                    ? 'bg-[#7fe3d6]'
                    : n < currentPage
                      ? 'bg-[rgba(127,227,214,0.4)]'
                      : 'bg-[rgba(232,241,244,0.12)]'
                "
                :title="pages[n - 1]?.title"
                :aria-label="`Page ${n} : ${pages[n - 1]?.title}`"
                :aria-current="n === currentPage ? 'page' : undefined"
                @click="goToPage(n)"
              ></button>
            </div>
          </div>

          <div
            class="flex flex-col gap-2.5 border-t border-[rgba(232,241,244,0.1)] pt-5"
          >
            <a
              href="/data/manuel.pdf"
              target="_blank"
              rel="noopener"
              class="flex items-center justify-between rounded-[10px] border border-[rgba(232,241,244,0.12)] px-3.5 py-3 text-[15px] font-medium text-[#e8f1f4] transition-colors hover:border-[rgba(127,227,214,0.45)] hover:bg-[rgba(127,227,214,0.08)]"
            >
              Voir le PDF officiel
              <span class="font-mono text-xs text-[#7fe3d6]">PDF ↗</span>
            </a>
            <span class="text-[13px] text-[#7f97a2]">
              FFESSM officiel - Version Mai 2024
            </span>
          </div>
        </aside>

        <!-- Page content -->
        <article class="min-w-0 max-w-[760px] flex-[999_1_480px]">
          <div class="mb-4 font-mono text-[13px] text-[#7fe3d6]">
            {{ pad2(currentPage) }} — {{ pad2(totalPages) }}
          </div>
          <h1
            class="m-0 mb-8 text-[clamp(40px,5.5vw,64px)] font-bold leading-none tracking-[-0.03em] text-white [text-wrap:balance]"
          >
            {{ currentPageData.title }}
          </h1>

          <p
            v-if="currentPageData.content"
            class="mb-10 text-[19px] leading-[1.65] text-[#d4e2e7] [text-wrap:pretty]"
          >
            {{ currentPageData.content }}
          </p>

          <div class="flex flex-col gap-3">
            <section
              v-for="(section, index) in currentPageData.sections"
              :key="index"
              class="rounded-[14px] border border-[rgba(232,241,244,0.09)] bg-white/[0.035] px-7 py-6"
            >
              <h2
                v-if="section.heading"
                class="mb-3 font-semibold text-white"
                :class="
                  isCaps(section.heading)
                    ? 'font-mono text-sm uppercase tracking-[0.12em]'
                    : 'text-[19px] tracking-[-0.01em]'
                "
              >
                {{ section.heading }}
              </h2>
              <div class="flex flex-col gap-3">
                <template v-for="(block, b) in toBlocks(section.text)" :key="b">
                  <ul
                    v-if="block.type === 'list'"
                    class="m-0 flex list-none flex-col gap-3 p-0"
                  >
                    <li
                      v-for="(item, i) in block.items"
                      :key="i"
                      class="grid grid-cols-[20px_1fr] gap-2.5 text-base leading-[1.6] text-[#b7c9d1]"
                    >
                      <span
                        class="mt-2.5 h-1.5 w-1.5 rounded-full bg-[#7fe3d6]"
                      ></span>
                      <span class="[text-wrap:pretty]">{{ item }}</span>
                    </li>
                  </ul>
                  <p
                    v-else
                    class="m-0 text-base leading-[1.65] text-[#b7c9d1] [text-wrap:pretty]"
                  >
                    {{ block.text }}
                  </p>
                </template>
              </div>
            </section>

            <section
              v-if="currentPageData.evaluation"
              class="mt-3 grid grid-cols-[32px_1fr] gap-4 rounded-[14px] border border-[rgba(127,227,214,0.4)] bg-[rgba(127,227,214,0.07)] px-7 py-6"
            >
              <span
                class="grid h-8 w-8 place-items-center rounded-full bg-[#7fe3d6] text-base font-bold text-[#05111a]"
                aria-hidden="true"
              >
                ✓
              </span>
              <div>
                <h2 class="mb-2.5 mt-1 text-lg font-semibold text-white">
                  {{ currentPageData.evaluation.heading }}
                </h2>
                <p
                  class="m-0 text-base leading-[1.65] text-[#d4e2e7] [text-wrap:pretty]"
                >
                  {{ currentPageData.evaluation.text }}
                </p>
              </div>
            </section>
          </div>

          <!-- Prev / next -->
          <nav
            class="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-3 border-t border-[rgba(232,241,244,0.1)] pt-8"
            aria-label="Navigation du manuel"
          >
            <button
              type="button"
              class="flex flex-col items-start gap-1.5 rounded-xl border border-[rgba(232,241,244,0.12)] bg-transparent px-5 py-[18px] text-left text-[#e8f1f4] transition-colors hover:border-[rgba(127,227,214,0.45)] hover:bg-[rgba(127,227,214,0.08)]"
              @click="step(-1)"
            >
              <span class="font-mono text-xs text-[#7f97a2]">← Précédent</span>
              <span class="text-[17px] font-semibold">
                {{ pages[wrap(currentPage - 1) - 1]?.title }}
              </span>
            </button>
            <button
              type="button"
              class="flex flex-col items-end gap-1.5 rounded-xl border border-[#7fe3d6] bg-[#7fe3d6] px-5 py-[18px] text-right text-[#05111a] transition-colors hover:bg-[#a3efe5]"
              @click="step(1)"
            >
              <span class="font-mono text-xs text-[#0c2a3d]">Suivant →</span>
              <span class="text-[17px] font-semibold">
                {{ pages[wrap(currentPage + 1) - 1]?.title }}
              </span>
            </button>
          </nav>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useManuelPages } from '~/composables/useManuelPages'

definePageMeta({ breadcrumb: 'Manuel' })

const route = useRoute()
const router = useRouter()

const {
  pages,
  currentPage,
  totalPages,
  loading,
  error,
  getCurrentPageData,
  goToPage,
} = useManuelPages()

const currentPageData = computed(() => getCurrentPageData())

// Prev/next wrap around, as in the design
const wrap = (n: number) =>
  ((((n - 1) % totalPages.value) + totalPages.value) % totalPages.value) + 1
const step = (delta: number) => goToPage(wrap(currentPage.value + delta))

// Sync the current page with ?page= so it can be bookmarked and the back button works
const queryPage = computed(() => Number(route.query.page) || 1)
watch([queryPage, totalPages], () => goToPage(queryPage.value), {
  immediate: true,
})
watch(currentPage, (page, previous) => {
  if (page !== queryPage.value) router.push({ query: { ...route.query, page } })
  if (previous !== undefined) window.scrollTo({ top: 0, behavior: 'smooth' })
})

useEventListener('keydown', (e: KeyboardEvent) => {
  const target = e.target as HTMLElement | null
  if (target?.closest('input, textarea, select, [contenteditable]')) return
  if (e.key === 'ArrowRight') step(1)
  if (e.key === 'ArrowLeft') step(-1)
})

const isCaps = (heading: string) =>
  heading === heading.toUpperCase() && /[A-Z]/.test(heading)

type Block = { type: 'list'; items: string[] } | { type: 'text'; text: string }

// "• " lines become list items; a line right after a bullet (no blank line) continues it
const toBlocks = (text = ''): Block[] => {
  const blocks: Block[] = []
  let previousBlank = true
  for (const raw of text.split('\n')) {
    const line = raw.trim()
    const last = blocks[blocks.length - 1]
    if (!line) {
      previousBlank = true
      continue
    }
    if (line.startsWith('•')) {
      const item = line.replace(/^•\s*/, '')
      if (last?.type === 'list') last.items.push(item)
      else blocks.push({ type: 'list', items: [item] })
    } else if (last?.type === 'list' && !previousBlank) {
      last.items[last.items.length - 1] += ` ${line}`
    } else if (last?.type === 'text' && !previousBlank) {
      last.text += ` ${line}`
    } else {
      blocks.push({ type: 'text', text: line })
    }
    previousBlank = false
  }
  return blocks
}
</script>
