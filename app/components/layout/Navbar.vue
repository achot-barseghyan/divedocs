<template>
  <nav ref="navRef" class="relative flex items-center justify-between px-4">
    <!-- Desktop links -->
    <div class="hidden items-center md:flex">
      <NuxtLink
        v-for="(item, index) in items"
        :key="index"
        :to="item.link"
        class="mx-4 text-lg font-extrabold text-white hover:text-yellow-500"
        :target="item.blank ? '_blank' : '_self'"
      >
        {{ item.name }}
      </NuxtLink>

      <!-- Dropdown liens externes -->
      <div
        class="relative mx-4"
        @mouseenter="isDropdownOpen = true"
        @mouseleave="isDropdownOpen = false"
      >
        <button
          type="button"
          class="flex items-center gap-1 text-lg font-extrabold text-white hover:text-yellow-500"
        >
          Liens
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 transition-transform"
            :class="isDropdownOpen ? 'rotate-180' : ''"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <transition name="fade">
          <div
            v-if="isDropdownOpen"
            class="absolute right-0 top-full z-50 mt-2 w-44 rounded-lg bg-white/95 py-2 shadow-lg backdrop-blur-sm"
          >
            <a
              v-for="(link, i) in externalLinks"
              :key="i"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 px-4 py-2 text-sm font-bold text-black hover:bg-gray-100 hover:text-yellow-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5 shrink-0 opacity-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              {{ link.name }}
            </a>
          </div>
        </transition>
      </div>
    </div>

    <!-- Mobile toggle -->
    <button
      class="rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 md:hidden"
      @click.stop="isOpen = !isOpen"
      :aria-expanded="isOpen"
      aria-controls="nav-menu"
      aria-label="Toggle navigation"
    >
      <span v-if="!isOpen" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </span>
      <span v-else aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>
    </button>

    <!-- Mobile menu (collapsible) -->
    <transition name="fade">
      <div
        v-if="isOpen"
        id="nav-menu"
        class="fixed right-[10%] top-20 z-50 w-[60%] rounded-lg bg-white/95 p-4 shadow-lg backdrop-blur-sm md:hidden"
      >
        <NuxtLink
          v-for="(item, index) in items"
          :key="'m-' + index"
          :to="item.link"
          class="block py-2 text-[1.6rem] font-extrabold text-black hover:text-darkblue-300"
          @click="isOpen = false"
        >
          {{ item.name }}
        </NuxtLink>
        <div class="my-1 border-t border-gray-200"></div>
        <a
          v-for="(link, i) in externalLinks"
          :key="'ext-' + i"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="block py-2 text-[1.4rem] font-bold text-gray-500 hover:text-yellow-600"
          @click="isOpen = false"
        >
          ↗ {{ link.name }}
        </a>
      </div>
    </transition>
  </nav>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const items = ref([
  { name: 'Accueil', link: '/' },
  { name: 'Niveau 1', link: '/niveau1' },
  { name: 'Niveau 2', link: '/niveau2' },
  { name: 'Niveau 3', link: '/niveau3' },
  { name: 'Préparation sortie', link: '/preparation-sortie' },
  { name: 'Tables MN90', link: '/tables' },
  { name: 'Graphiques', link: '/graphiques' },
])

const externalLinks = [
  { name: 'Asprenaut.fr', url: 'https://asprenaut.fr/' },
  { name: 'ffessm.fr', url: 'https://ffessm.fr/' },
]

const isOpen = ref(false)
const isDropdownOpen = ref(false)
const navRef = ref<HTMLElement | null>(null)

function onDocumentClick(e: MouseEvent) {
  const target = e.target as Node | null
  if (isOpen.value && navRef.value && target) {
    if (!navRef.value.contains(target)) {
      isOpen.value = false
    }
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
})
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
