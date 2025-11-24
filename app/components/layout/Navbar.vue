<template>
  <nav
    ref="navRef"
    class="relative flex items-center justify-between px-4 py-3"
  >
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
          :target="item.blank ? '_blank' : '_self'"
        >
          {{ item.name }}
        </NuxtLink>
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
  { name: 'Asprenaut.fr', link: 'https://asprenaut.fr/', blank: true },
  { name: 'ffessm.fr', link: 'https://ffessm.fr/', blank: true },
])

const isOpen = ref(false)
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
