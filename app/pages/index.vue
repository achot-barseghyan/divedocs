<template>
  <div
    class="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,#14425c_0%,#0a2232_45%,#05111a_100%)] font-grotesk text-[#e8f1f4] antialiased"
  >
    <!-- 1. Background photo -->
    <img
      src="/img/bg3.webp"
      alt=""
      class="absolute inset-0 h-full w-full object-cover"
    />
    <!-- 2. Scrim -->
    <div
      class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,17,26,0.55)_0%,rgba(5,17,26,0.35)_40%,rgba(5,17,26,0.85)_100%)]"
    ></div>
    <!-- 3. Rising bubbles -->
    <div
      class="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <span
        v-for="(bubble, i) in bubbles"
        :key="i"
        class="dd-bubble"
        :style="{
          left: `${bubble.left}%`,
          width: `${bubble.size}px`,
          height: `${bubble.size}px`,
          '--sway': `${bubble.sway}px`,
          '--o': bubble.o,
          animation: `ddRise ${bubble.dur}s linear ${bubble.delay}s infinite`,
        }"
      ></span>
    </div>

    <!-- 4. Content (the fixed site header sits above, 75px tall) -->
    <main
      class="relative z-[2] flex flex-1 flex-col items-center justify-center gap-7 px-6 pb-10 pt-[115px]"
    >
      <h1
        aria-label="DIVEDOCS"
        class="m-0 flex cursor-default select-none gap-[0.04em] text-[clamp(64px,14vw,210px)] font-bold leading-none tracking-[0.02em]"
      >
        <span
          v-for="(letter, i) in letters"
          :key="i"
          aria-hidden="true"
          class="dd-float inline-block"
          :style="{
            animation: `ddFloat ${5 + (i % 3)}s ease-in-out ${-i * 0.6}s infinite`,
          }"
        >
          <span class="dd-letter" @mouseenter="splash">{{ letter }}</span>
        </span>
      </h1>
    </main>

    <footer class="relative z-[2] flex justify-center px-8 py-6">
      <span class="text-sm text-[#9fb4bd]">© Par Achot Barseghyan</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
const letters = 'DIVEDOCS'.split('')

// Replay the splash on every hover: drop the class, force a reflow, add it back.
// (Remounting the span instead would fire mouseenter again on the new node and loop.)
const splash = (event: MouseEvent) => {
  const el = event.currentTarget as HTMLElement
  el.classList.remove('dd-splash')
  void el.offsetWidth
  el.classList.add('dd-splash')
}

// Seeded RNG: same bubbles on the server and in the browser (no hydration mismatch)
let seed = 7
const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647

const bubbles = Array.from({ length: 46 }, () => {
  const size = 3 + Math.pow(rand(), 2.2) * 14
  const dur = 9 + rand() * 14
  return {
    left: rand() * 100,
    size,
    dur,
    delay: -rand() * dur,
    sway: (rand() * 2 - 1) * 40,
    o: 0.25 + rand() * 0.5,
  }
})
</script>

<style>
/* Not scoped: the bubble and float animations are set inline, so keyframe names must stay global (all prefixed dd) */
.dd-bubble {
  position: absolute;
  bottom: -24px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 32% 30%,
    rgba(255, 255, 255, 0.95) 0 18%,
    rgba(200, 240, 245, 0.35) 30%,
    rgba(127, 227, 214, 0.08) 70%
  );
  border: 1px solid rgba(220, 245, 250, 0.45);
  will-change: transform, opacity;
}

.dd-letter {
  display: inline-block;
  transform-origin: 50% 100%;
  color: transparent;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  background-image:
    linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 35%,
      rgba(230, 255, 252, 0.85) 50%,
      rgba(255, 255, 255, 0) 65%
    ),
    linear-gradient(180deg, #a8f0e6 0%, #7fe3d6 45%, #2fb3a6 100%);
  background-size:
    200% 100%,
    100% 100%;
  background-repeat: repeat-x, no-repeat;
  background-position:
    -100% 0,
    0 0;
  filter: drop-shadow(0 6px 24px rgba(127, 227, 214, 0.25));
}

.dd-splash {
  animation:
    ddSplash 0.9s cubic-bezier(0.3, 0.7, 0.3, 1) both,
    ddWave 0.9s ease-out both;
}

@keyframes ddRise {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  8% {
    opacity: var(--o);
  }
  50% {
    transform: translate3d(var(--sway), -55vh, 0);
  }
  92% {
    opacity: var(--o);
  }
  100% {
    transform: translate3d(0, -115vh, 0);
    opacity: 0;
  }
}

@keyframes ddFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

@keyframes ddSplash {
  0% {
    transform: translateY(0) scale(1, 1);
  }
  18% {
    transform: translateY(-14px) scale(0.94, 1.08) skewX(-4deg);
  }
  38% {
    transform: translateY(4px) scale(1.06, 0.94) skewX(3deg);
  }
  58% {
    transform: translateY(-5px) scale(0.98, 1.03) skewX(-1.5deg);
  }
  78% {
    transform: translateY(1px) scale(1.01, 0.99);
  }
  100% {
    transform: translateY(0) scale(1, 1);
  }
}

@keyframes ddWave {
  0% {
    background-position:
      0% 100%,
      0 0;
  }
  100% {
    background-position:
      200% 0%,
      0 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dd-bubble,
  .dd-letter,
  .dd-splash,
  .dd-float {
    animation: none !important;
  }
}
</style>
