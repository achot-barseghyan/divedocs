<template>
  <div
    ref="rootRef"
    class="relative bg-[#05111a] font-grotesk text-[#e8f1f4] antialiased"
  >
    <!-- Hero -->
    <section
      class="relative flex min-h-[92svh] flex-col overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,#14425c_0%,#0a2232_45%,#05111a_100%)]"
    >
      <img
        src="/img/bg3.webp"
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div
        class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,17,26,0.55)_0%,rgba(5,17,26,0.35)_40%,rgba(5,17,26,0.9)_88%,#0a2232_100%)]"
      ></div>
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

      <!-- The fixed site header sits above, 75px tall -->
      <main
        class="relative z-[2] flex flex-1 flex-col items-center justify-center gap-7 px-4 pb-10 pt-[115px] text-center"
      >
        <h1
          aria-label="DIVEDOCS"
          class="m-0 flex cursor-default select-none gap-[0.04em] text-[clamp(48px,15vw,210px)] font-bold leading-none tracking-[0.02em]"
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
            <!-- prettier-ignore -->
            <span class="dd-letter" @mouseenter="splash" @touchstart.passive="splash">{{ letter }}</span>
          </span>
        </h1>
        <p
          class="dd-in m-0 max-w-[440px] text-[clamp(17px,2.4vw,20px)] leading-normal text-[#d4e2e7]"
          style="animation-delay: 0.3s"
        >
          Cours, fiches et outils pour progresser du niveau 1 au niveau 3.
        </p>
      </main>

      <div class="relative z-[2] flex justify-center px-4 pb-7">
        <a
          href="#descente"
          class="dd-in flex min-h-11 flex-col items-center gap-2 px-4 py-2 text-[15px] font-semibold text-[#e8f1f4] transition-colors hover:text-[#f5d547]"
          style="animation-delay: 0.5s"
          @click.prevent="scrollToDescent"
        >
          Commencer la descente
          <span
            class="dd-nudge grid h-10 w-10 place-items-center rounded-full border-[1.5px] border-[rgba(127,227,214,0.6)] text-[#7fe3d6]"
            aria-hidden="true"
          >
            ↓
          </span>
        </a>
      </div>
    </section>

    <!-- Depth timeline -->
    <section
      id="descente"
      ref="descRef"
      class="relative bg-[linear-gradient(180deg,#0a2232_0%,#081b29_35%,#05111a_70%,#02080d_100%)] pb-[clamp(48px,8vw,96px)] pt-[clamp(56px,9vw,112px)]"
    >
      <div class="mx-auto max-w-[980px] px-[clamp(12px,4vw,32px)]">
        <div data-reveal :class="[railGrid, 'mb-[clamp(40px,6vw,64px)]']">
          <span></span>
          <div class="flex flex-col gap-2.5">
            <span
              class="font-mono text-[13px] uppercase tracking-[0.12em] text-[#f5d547]"
            >
              Choisis ta profondeur
            </span>
            <h2
              class="m-0 text-[clamp(34px,6vw,64px)] font-bold leading-[0.95] tracking-[-0.035em] text-white [text-wrap:balance]"
            >
              Chaque niveau, une profondeur de plus.
            </h2>
          </div>
        </div>

        <div ref="trackRef" class="relative">
          <div
            :class="railLine"
            class="bg-[repeating-linear-gradient(180deg,rgba(232,241,244,0.22)_0_6px,transparent_6px_12px)]"
            :style="{ top: line.top + 'px', height: line.h + 'px' }"
          ></div>
          <div
            :class="railLine"
            class="bg-[linear-gradient(180deg,#7fe3d6,#f5d547)]"
            :style="{ top: line.top + 'px', height: line.fill + 'px' }"
          ></div>
          <div
            class="dd-pulse absolute left-[calc(clamp(72px,13vw,150px)-20px)] z-[2] h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#05111a] bg-[#f5d547]"
            :style="{ top: line.mark + 'px' }"
            aria-hidden="true"
          ></div>

          <div
            v-for="s in stops"
            :key="s.code"
            ref="stopRefs"
            :class="[railGrid, 'relative pb-[clamp(56px,10vw,120px)]']"
          >
            <div
              class="relative flex flex-col items-end gap-0.5 pr-9 pt-[22px]"
            >
              <span
                class="absolute right-[13px] top-[26px] h-3.5 w-3.5 rounded-full border-2 bg-[#05111a]"
                :style="{ borderColor: s.accent }"
              ></span>
              <span
                class="whitespace-nowrap font-mono text-[clamp(15px,2vw,20px)]"
                :style="{ color: s.accent }"
              >
                {{ s.depth }}
              </span>
              <span class="text-right font-mono text-[11px] text-[#7f97a2]">
                {{ s.depthNote }}
              </span>
            </div>
            <article
              data-reveal
              class="relative flex flex-col gap-4 overflow-hidden rounded-[22px] border border-[rgba(232,241,244,0.1)] bg-white/[0.04] p-[clamp(22px,4vw,36px)] transition-colors duration-300 hover:border-[rgba(127,227,214,0.4)] hover:bg-[rgba(127,227,214,0.05)]"
            >
              <span
                aria-hidden="true"
                class="pointer-events-none absolute -right-1.5 -top-[18px] font-mono text-[clamp(90px,16vw,170px)] font-medium leading-none text-transparent"
                :style="{ WebkitTextStroke: `1.5px ${s.accent}40` }"
              >
                {{ s.code }}
              </span>
              <div class="relative flex flex-wrap items-center gap-2.5">
                <span
                  class="font-mono text-xs uppercase tracking-[0.1em]"
                  :style="{ color: s.accent }"
                >
                  {{ s.kicker }}
                </span>
                <span
                  v-if="s.soon"
                  class="rounded-full bg-[rgba(232,241,244,0.08)] px-2.5 py-1 text-xs font-semibold text-[#d4e2e7]"
                >
                  Bientôt
                </span>
              </div>
              <h3
                class="relative m-0 text-[clamp(30px,5vw,48px)] font-bold leading-none tracking-[-0.03em] text-white"
              >
                {{ s.title }}
              </h3>
              <p
                class="relative m-0 max-w-[520px] text-[17px] leading-[1.6] text-[#b7c9d1] [text-wrap:pretty]"
              >
                {{ s.desc }}
              </p>
              <div v-if="s.chips" class="relative flex flex-wrap gap-2">
                <NuxtLink
                  v-for="c in s.chips"
                  :key="c.to"
                  :to="c.to"
                  :class="[chip, 'gap-2 px-4 text-[15px]']"
                >
                  {{ c.label }}
                </NuxtLink>
              </div>
              <NuxtLink
                v-if="s.cta"
                :to="s.to"
                class="relative flex min-h-12 items-center gap-3 self-start rounded-xl px-5 text-[15px] font-semibold text-[#05111a] transition-[filter,transform] duration-200 hover:translate-x-1 hover:text-[#05111a] hover:brightness-110"
                :style="{ background: s.accent }"
              >
                {{ s.cta }} <span class="text-lg" aria-hidden="true">→</span>
              </NuxtLink>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Tools -->
    <section id="outils" class="bg-[#02080d] pb-[clamp(64px,10vw,120px)]">
      <div
        class="mx-auto flex max-w-[980px] flex-col gap-6 px-[clamp(12px,4vw,32px)]"
      >
        <div data-reveal class="flex items-center gap-4">
          <h2
            class="m-0 text-[clamp(26px,4vw,34px)] font-bold tracking-[-0.02em] text-white"
          >
            Outils
          </h2>
          <div class="h-px flex-1 bg-[rgba(232,241,244,0.1)]"></div>
        </div>
        <div
          class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-3"
        >
          <div
            v-for="t in tools"
            :key="t.to"
            data-reveal
            class="flex flex-col gap-3.5 rounded-[20px] border border-[rgba(232,241,244,0.09)] bg-white/[0.035] p-6"
          >
            <NuxtLink
              :to="t.to"
              class="flex min-h-11 items-center justify-between gap-3 text-white transition-colors hover:text-[#f5d547]"
            >
              <span class="flex flex-col gap-1">
                <span class="text-[22px] font-bold tracking-[-0.02em]">
                  {{ t.title }}
                </span>
                <span class="text-[15px] leading-[1.45] text-[#9fb4bd]">
                  {{ t.desc }}
                </span>
              </span>
              <span
                class="grid h-10 w-10 flex-none place-items-center rounded-full border border-[rgba(127,227,214,0.4)] text-[#7fe3d6]"
                aria-hidden="true"
              >
                →
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <footer
      class="flex justify-center border-t border-[rgba(232,241,244,0.06)] bg-[#02080d] px-6 pb-24 pt-6"
    >
      <span class="text-sm text-[#9fb4bd]">© Par Achot Barseghyan</span>
    </footer>

    <!-- Depth pill, shown while scrolling through the timeline -->
    <div
      class="fixed bottom-[max(16px,env(safe-area-inset-bottom))] left-1/2 z-40 flex items-center gap-1.5 rounded-full border border-[rgba(232,241,244,0.14)] bg-[rgba(5,17,26,0.82)] py-1.5 pl-[18px] pr-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-[opacity,transform] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]"
      :class="
        inDesc
          ? '-translate-x-1/2 opacity-100'
          : 'pointer-events-none -translate-x-1/2 translate-y-6 opacity-0'
      "
      :aria-hidden="!inDesc"
    >
      <span class="font-mono text-[11px] tracking-[0.1em] text-[#7f97a2]">
        PROF.
      </span>
      <span
        class="min-w-[76px] text-right font-mono text-xl text-[#f5d547]"
      >
        −{{ depth.toFixed(1) }}
      </span>
      <span class="mr-1.5 font-mono text-xs text-[#f5d547]">m</span>
      <button
        type="button"
        aria-label="Remonter en surface"
        :tabindex="inDesc ? 0 : -1"
        class="flex h-11 items-center gap-1.5 rounded-full bg-[#7fe3d6] px-4 text-sm font-semibold text-[#05111a] transition-colors hover:bg-[#a3efe5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fe3d6]"
        @click="toTop"
      >
        ↑ Surface
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const letters = 'DIVEDOCS'.split('')

// Rail column width shared by the heading row and every stop
const railGrid = 'grid grid-cols-[clamp(72px,13vw,150px)_minmax(0,1fr)]'
const railLine =
  'absolute left-[calc(clamp(72px,13vw,150px)-20px)] w-0.5 -translate-x-1/2'
const chip =
  'flex min-h-11 items-center rounded-full border border-[rgba(232,241,244,0.14)] bg-[rgba(232,241,244,0.06)] font-medium text-[#e8f1f4] transition-colors duration-200 hover:border-[#7fe3d6] hover:bg-[#7fe3d6] hover:text-[#05111a]'

interface Stop {
  d: number
  depth: string
  depthNote: string
  code: string
  kicker: string
  title: string
  desc: string
  accent: string
  to?: string
  cta?: string
  soon?: boolean
  chips?: { label: string; to: string }[]
}

const stops: Stop[] = [
  {
    d: 0,
    depth: '0 m',
    depthNote: 'Surface',
    code: '00',
    kicker: 'Avant de plonger',
    title: 'Préparer sa sortie',
    desc: "Météo, matériel, check-list et planification avant de te mettre à l'eau.",
    accent: '#7fe3d6',
    to: '/preparation-sortie',
    cta: 'Ouvrir la préparation',
  },
  {
    d: 20,
    depth: '−20 m',
    depthNote: 'Encadré',
    code: 'N1',
    kicker: 'Plongeur encadré',
    title: 'Niveau 1',
    desc: "Les bases pour plonger accompagné d'un guide : théorie, matériel, signes et exercices.",
    accent: '#7fe3d6',
    to: '/niveau1',
    cta: 'Ouvrir le niveau 1',
    chips: [
      { label: 'Théorie', to: '/niveau1/theorie' },
      { label: 'Matériel', to: '/niveau1/materiel' },
      { label: 'Exercices', to: '/niveau1/exercices' },
      { label: 'Signes', to: '/niveau1/signes' },
      { label: 'Simulateur', to: '/niveau1/simulateur' },
      { label: 'Révisions', to: '/niveau1/revisions' },
      { label: 'Manuel', to: '/niveau1/manuel' },
    ],
  },
  {
    d: 40,
    depth: '−40 m',
    depthNote: '20 m autonome',
    code: 'N2',
    kicker: 'Plongeur autonome',
    title: 'Niveau 2',
    desc: "Plonger en autonomie avec ton binôme jusqu'à 20 m, et encadré jusqu'à 40 m.",
    accent: '#f5d547',
    to: '/niveau2',
    cta: 'Ouvrir le niveau 2',
    chips: [
      { label: 'Théorie', to: '/niveau2/theorie' },
      { label: 'Matériel', to: '/niveau2/materiel' },
    ],
  },
  {
    d: 60,
    depth: '−60 m',
    depthNote: 'Autonome',
    code: 'N3',
    kicker: 'Plongeur confirmé',
    title: 'Niveau 3',
    desc: "L'autonomie complète jusqu'à 60 m.",
    accent: '#ff7a6b',
    soon: true,
  },
]

const tools = [
  {
    title: 'Tables MN90',
    desc: 'Paliers, majorations et plongées successives.',
    to: '/tables',
  },
  {
    title: 'Graphiques',
    desc: 'Les schémas pour comprendre la physique.',
    to: '/graphiques',
  },
  {
    title: 'Biologie marine',
    desc: 'Reconnaître la faune et la flore.',
    to: '/biologie-marine',
  },
]

// Replay the splash on every hover: drop the class, force a reflow, add it back.
// (Remounting the span instead would fire mouseenter again on the new node and loop.)
const splash = (event: Event) => {
  const el = event.currentTarget as HTMLElement
  el.classList.remove('dd-splash')
  void el.offsetWidth
  el.classList.add('dd-splash')
}

// Seeded RNG: same bubbles on the server and in the browser (no hydration mismatch)
let seed = 7
const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647

const bubbles = Array.from({ length: 40 }, () => {
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

// Depth rail: the marker follows the viewport centre between the first and
// last stop, and the depth is interpolated between the stops' depths
const rootRef = ref<HTMLElement | null>(null)
const descRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)
const stopRefs = ref<HTMLElement[]>([])

const line = reactive({ top: 0, h: 0, fill: 0, mark: 0 })
const depth = ref(0)
const inDesc = ref(false)

const measure = () => {
  const root = descRef.value
  const track = trackRef.value
  if (!root || !track || !stopRefs.value.length) return
  const wrapTop = track.getBoundingClientRect().top
  // 33px: centre of the stop's depth dot
  const ys = stopRefs.value.map((el) => el.getBoundingClientRect().top - wrapTop + 33)
  const first = ys[0]!
  const last = ys[ys.length - 1]!
  const mark = Math.min(last, Math.max(first, window.innerHeight * 0.5 - wrapTop))
  let d = 0
  for (let i = 0; i < ys.length - 1; i++) {
    const y0 = ys[i]!
    const y1 = ys[i + 1]!
    if (mark >= y0) {
      const d0 = stops[i]!.d
      d = d0 + (stops[i + 1]!.d - d0) * Math.min(1, (mark - y0) / (y1 - y0))
    }
  }
  const rect = root.getBoundingClientRect()
  inDesc.value =
    rect.top < window.innerHeight * 0.55 && rect.bottom > window.innerHeight * 0.45
  line.top = first
  line.h = last - first
  line.mark = mark
  line.fill = Math.max(0, mark - first)
  depth.value = d
}

let raf = 0
const onScroll = () => {
  if (raf) return
  raf = requestAnimationFrame(() => {
    raf = 0
    measure()
  })
}

let io: IntersectionObserver | undefined
const setupReveal = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        const el = e.target as HTMLElement
        el.style.opacity = '1'
        el.style.transform = 'none'
        io?.unobserve(el)
      }),
    { threshold: 0.15 }
  )
  rootRef.value
    ?.querySelectorAll<HTMLElement>('[data-reveal]')
    .forEach((el, i) => {
      // Leave anything already on screen alone
      if (el.getBoundingClientRect().top < window.innerHeight) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(32px)'
      el.style.transition =
        'opacity .8s cubic-bezier(.2,.8,.2,1), transform .8s cubic-bezier(.2,.8,.2,1)'
      el.style.transitionDelay = (i % 3) * 0.08 + 's'
      io!.observe(el)
    })
}

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const scrollToDescent = () =>
  descRef.value?.scrollIntoView({
    behavior: reducedMotion() ? 'auto' : 'smooth',
  })

const toTop = () =>
  window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' })

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  setupReveal()
  measure()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  cancelAnimationFrame(raf)
  io?.disconnect()
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

.dd-in {
  animation: ddIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.dd-nudge {
  animation: ddNudge 1.8s ease-in-out infinite;
}

.dd-pulse {
  animation: ddPulse 2s ease-in-out infinite;
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

@keyframes ddIn {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes ddNudge {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(6px);
  }
}

@keyframes ddPulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(245, 213, 71, 0.5);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(245, 213, 71, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .dd-bubble,
  .dd-letter,
  .dd-splash,
  .dd-float,
  .dd-in,
  .dd-nudge,
  .dd-pulse {
    animation: none !important;
  }
}
</style>
