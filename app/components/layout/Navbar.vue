<template>
  <nav
    ref="navRef"
    class="relative flex items-center justify-end text-[15px] font-medium xl:justify-start"
  >
    <!-- Desktop links -->
    <div class="hidden flex-wrap items-center gap-1 xl:flex">
      <NuxtLink
        :to="home.link"
        :class="[
          linkClass,
          isActive(home.link) && '!bg-white/[0.08] !text-white',
        ]"
        :aria-current="isActive(home.link) ? 'page' : undefined"
      >
        {{ home.name }}
      </NuxtLink>

      <!-- Level switcher -->
      <div
        class="mx-1.5 flex gap-0.5 rounded-[10px] border border-white/[0.08] bg-white/5 p-[3px]"
      >
        <NuxtLink
          v-for="level in levels"
          :key="level.link"
          :to="level.link"
          class="rounded-[7px] px-3 py-[5px] transition-colors"
          :class="
            isActive(level.link)
              ? 'bg-[#7fe3d6] font-semibold text-[#05111a]'
              : isHome
                ? 'text-[#d4e2e7] hover:bg-[#7fe3d6] hover:text-[#05111a]'
                : 'text-[#b7c9d1] hover:bg-white/[0.06] hover:text-white'
          "
          :aria-current="isActive(level.link) ? 'page' : undefined"
        >
          {{ level.name }}
        </NuxtLink>
      </div>

      <NuxtLink
        v-for="item in items"
        :key="item.link"
        :to="item.link"
        :class="linkClass"
      >
        {{ item.name }}
      </NuxtLink>

      <!-- Dropdown liens externes -->
      <div
        class="relative"
        @mouseenter="isDropdownOpen = true"
        @mouseleave="isDropdownOpen = false"
      >
        <button
          type="button"
          class="flex items-center gap-1.5"
          :class="linkClass"
          :aria-expanded="isDropdownOpen"
          @click="isDropdownOpen = !isDropdownOpen"
        >
          Liens
          <span
            class="text-[10px] opacity-70 transition-transform"
            :class="isDropdownOpen ? 'rotate-180' : ''"
            aria-hidden="true"
          >
            ▾
          </span>
        </button>
        <transition name="fade">
          <div
            v-if="isDropdownOpen"
            class="absolute right-0 top-full z-50 w-48 pt-2"
          >
            <div
              class="rounded-[10px] border border-white/[0.08] bg-[#0c2a3d]/95 p-1 backdrop-blur-md"
            >
              <a
                v-for="(link, i) in externalLinks"
                :key="i"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between rounded-[7px] px-3 py-2 text-[#b7c9d1] hover:bg-white/[0.06] hover:text-white"
              >
                {{ link.name }}
                <span class="text-[#7f97a2]" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Mobile toggle -->
    <button
      class="rounded-lg p-2 text-[#e8f1f4] hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7fe3d6] xl:hidden"
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
        class="absolute right-0 top-full z-50 mt-3 w-[min(320px,calc(100vw-32px))] rounded-[14px] border border-white/[0.08] bg-[#0c2a3d]/95 p-2 text-base backdrop-blur-md xl:hidden"
      >
        <NuxtLink
          v-for="item in allItems"
          :key="'m-' + item.link"
          :to="item.link"
          class="block rounded-lg px-3 py-2.5"
          :class="
            isActive(item.link)
              ? 'bg-[#7fe3d6] font-semibold text-[#05111a]'
              : 'text-[#b7c9d1] hover:bg-white/[0.06] hover:text-white'
          "
          @click="isOpen = false"
        >
          {{ item.name }}
        </NuxtLink>
        <div class="my-2 border-t border-white/[0.08]"></div>
        <a
          v-for="(link, i) in externalLinks"
          :key="'ext-' + i"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-between rounded-lg px-3 py-2.5 text-[#7f97a2] hover:bg-white/[0.06] hover:text-white"
          @click="isOpen = false"
        >
          {{ link.name }}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </transition>
  </nav>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const route = useRoute()

const isHome = computed(() => route.path === '/')

// Links are a touch brighter over the home page photo
const linkClass = computed(
  () =>
    `rounded-lg px-3 py-2 transition-colors hover:bg-white/[0.06] hover:text-white ${
      isHome.value ? 'text-[#d4e2e7]' : 'text-[#b7c9d1]'
    }`
)

const home = { name: 'Accueil', link: '/' }

const levels = [
  { name: 'Niveau 1', link: '/niveau1' },
  { name: 'Niveau 2', link: '/niveau2' },
  { name: 'Niveau 3', link: '/niveau3' },
]

const items = [
  { name: 'Biologie Marine', link: '/biologie-marine' },
  { name: 'Préparation sortie', link: '/preparation-sortie' },
  { name: 'Tables MN90', link: '/tables' },
  { name: 'Graphiques', link: '/graphiques' },
]

const allItems = [home, ...levels, ...items]

const externalLinks = [
  { name: 'Asprenaut.fr', url: 'https://asprenaut.fr/' },
  { name: 'ffessm.fr', url: 'https://ffessm.fr/' },
]

const isOpen = ref(false)
const isDropdownOpen = ref(false)
const navRef = ref<HTMLElement | null>(null)

const currentPath = computed(() => route.path)

function isActive(link: string) {
  if (link === '/') return currentPath.value === '/'
  return currentPath.value === link || currentPath.value.startsWith(link + '/')
}

function onDocumentClick(e: MouseEvent) {
  const target = e.target as Node | null
  if (navRef.value && target && !navRef.value.contains(target)) {
    isOpen.value = false
    isDropdownOpen.value = false
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
