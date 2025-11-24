<template>
  <div class="relative h-screen w-screen overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 z-0">
      <img
        src="/img/bg3.jpg"
        alt="Diving background"
        class="h-full w-full object-cover object-center"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-[#00191f]/20 to-[#0a1e26]/40"
      ></div>
    </div>

    <!-- Bubble Container -->
    <div
      class="bubble-container pointer-events-none absolute inset-0 z-20"
    ></div>

    <!-- Title -->
    <div
      class="relative z-10 flex h-full items-center justify-center pt-[100px]"
    >
      <h1 class="text-6xl font-black tracking-wider md:text-9xl">
        <span
          v-for="(letter, i) in letters"
          :key="i"
          :ref="setLetterRef"
          class="inline-block text-teal-500/60 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
        >
          {{ letter }}
        </span>
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const letters = 'DIVEDOCS'.split('')
const letterRefs = ref<HTMLElement[]>([])

const setLetterRef = (el: HTMLElement | null) => {
  if (el) letterRefs.value.push(el)
}

onMounted(() => {
  gsap.from(letterRefs.value, {
    opacity: 0,
    y: 60,
    duration: 0.9,
    stagger: 0.08,
    ease: 'power3.out',
    onComplete: animateFloatingLetters,
  })

  generateBubbles()
})

function animateFloatingLetters() {
  letterRefs.value.forEach((el, i) => {
    gsap.to(el, {
      y: '+=10',
      x: i % 2 === 0 ? '+=4' : '-=4',
      rotation: i % 2 === 0 ? 1.5 : -1.5,
      duration: 3 + Math.random() * 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
  })
}

function generateBubbles() {
  const container = document.querySelector('.bubble-container')

  setInterval(() => {
    const bubble = document.createElement('div')
    bubble.classList.add('bubble')
    container?.appendChild(bubble)

    const size = Math.random() * 14 + 6
    bubble.style.width = `${size}px`
    bubble.style.height = `${size}px`
    bubble.style.left = `${Math.random() * 100}%`

    gsap.to(bubble, {
      y: -window.innerHeight - 100,
      x: `+=${Math.random() * 40 - 20}`,
      opacity: 0,
      duration: 4 + Math.random() * 3,
      ease: 'sine.out',
      onComplete: () => bubble.remove(),
    })
  }, 80)
}
</script>

<style>
.bubble {
  position: absolute;
  bottom: -50px;
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  filter: blur(1px);
  pointer-events: none;
}
</style>
