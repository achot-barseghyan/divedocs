<template>
  <div>
    <header
      class="fixed left-0 top-0 z-[1000] w-full font-grotesk transition-transform duration-300"
      :class="[
        { '-translate-y-full': hideHeader },
        isHome ? 'bg-transparent' : 'bg-[#07141f]/70 backdrop-blur-md',
      ]"
    >
      <div
        class="mx-auto flex max-w-[1280px] items-center gap-8 border-b px-8 py-5"
        :class="
          isHome ? 'border-transparent' : 'border-[rgba(232,241,244,0.08)]'
        "
      >
        <NuxtLink
          to="/"
          class="flex shrink-0 items-center gap-2.5 text-lg font-bold tracking-[-0.01em] text-[#e8f1f4] hover:text-[#f5d547]"
        >
          <img src="/scuba-diving-icon.svg" alt="" class="h-[34px] w-[34px]" />
          Plongée
        </NuxtLink>
        <LayoutNavbar class="flex-1" />
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Transparent over the home page photo
const route = useRoute()
const isHome = computed(() => route.path === '/')

const hideHeader = ref(false)
let lastScrollY = 0

const handleScroll = () => {
  const currentScrollY = window.scrollY

  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    hideHeader.value = true
  } else if (currentScrollY < lastScrollY) {
    hideHeader.value = false
  }

  lastScrollY = currentScrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
