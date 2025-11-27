<template>
  <div>
    <header
      class="fixed left-0 top-0 z-[1000] mb-[120px] h-[70px] w-full bg-gradient-to-b from-transparent backdrop-blur-sm transition-transform duration-300 md:h-[100px]"
      :class="{ '-translate-y-full': hideHeader }"
    >
      <div
        class="mx-auto flex h-full max-w-[1400px] flex-col justify-center gap-3 px-8"
      >
        <div class="flex items-center justify-between">
          <NuxtLink to="/">
            <img src="/scuba-diving-icon.svg" class="w-10" />
          </NuxtLink>
          <LayoutNavbar />
        </div>
      </div>
    </header>
  </div>
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
