<template>
  <header
    class="fixed left-0 top-0 z-[1000] h-[100px] w-full bg-gradient-to-b from-transparent backdrop-blur-sm transition-transform duration-300"
    :class="{ '-translate-y-full': hideHeader }"
  >
    <div
      class="mx-auto flex h-full max-w-[1400px] items-center justify-between px-8"
    >
      <NuxtLink to="/">
        <img src="/scuba-diving-icon.svg" class="w-12" />
      </NuxtLink>

      <LayoutNavbar />
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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
