<template>
  <div class="font-grotesk text-[#e8f1f4] antialiased">
    <UiPageBackground />

    <main class="mx-auto max-w-[1280px] px-8 pb-24">
      <!-- Hero -->
      <section
        class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-12 pb-[clamp(40px,6vw,64px)] pt-[clamp(48px,8vw,72px)]"
      >
        <div class="n3-in flex flex-col gap-5">
          <div
            class="font-mono text-[13px] uppercase tracking-[0.12em] text-[#f5d547]"
          >
            Plongeur autonome · FFESSM
          </div>
          <h1
            class="m-0 text-[clamp(56px,9vw,120px)] font-bold leading-[0.92] tracking-[-0.035em] text-white"
          >
            Niveau 3
          </h1>
          <span
            class="flex items-center gap-2.5 self-start rounded-full border border-[rgba(255,122,107,0.45)] bg-[rgba(255,122,107,0.1)] px-3.5 py-2 text-sm font-semibold text-[#ff7a6b]"
          >
            <span
              class="n3-blink h-2 w-2 rounded-full bg-[#ff7a6b]"
              aria-hidden="true"
            ></span>
            En construction
          </span>
        </div>
        <dl
          class="n3-in m-0 flex flex-wrap gap-10 pb-3"
          style="animation-delay: 0.15s"
        >
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="flex flex-col gap-1.5"
          >
            <dt
              class="font-mono text-xs uppercase tracking-[0.08em] text-[#7f97a2]"
            >
              {{ stat.label }}
            </dt>
            <dd
              class="m-0 text-4xl font-semibold tracking-[-0.02em] text-[#ff7a6b]"
            >
              {{ stat.value }}
            </dd>
          </div>
        </dl>
      </section>

      <!-- Under construction -->
      <section
        class="n3-in relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-center gap-8 overflow-hidden rounded-3xl border border-[rgba(232,241,244,0.1)] bg-white/[0.03] p-[clamp(24px,4vw,40px)]"
        style="animation-delay: 0.25s"
      >
        <div
          class="n3-stripes absolute inset-x-0 top-0 h-1.5 bg-[repeating-linear-gradient(-45deg,#f5d547_0_10px,#05111a_10px_20px)]"
          aria-hidden="true"
        ></div>
        <div class="flex flex-col gap-3.5">
          <span
            class="font-mono text-[13px] uppercase tracking-[0.12em] text-[#f5d547]"
          >
            Palier en cours
          </span>
          <h2
            class="m-0 text-[clamp(28px,4vw,40px)] font-bold leading-[1.05] tracking-[-0.03em] text-white [text-wrap:balance]"
          >
            Cette partie du site est en préparation.
          </h2>
          <p
            class="m-0 max-w-[480px] text-[17px] leading-[1.6] text-[#b7c9d1] [text-wrap:pretty]"
          >
            Les modules du niveau 3 arrivent progressivement. En attendant, tu
            peux réviser les niveaux précédents.
          </p>
          <div class="mt-1.5 flex flex-wrap gap-2.5">
            <NuxtLink
              to="/niveau2"
              :class="[primaryButton, 'h-12 gap-2.5 px-5 text-[15px]']"
            >
              Revoir le niveau 2
              <span class="text-[17px]" aria-hidden="true">→</span>
            </NuxtLink>
            <NuxtLink
              to="/"
              :class="[secondaryButton, 'h-12 px-5 text-[15px] font-semibold']"
            >
              Accueil
            </NuxtLink>
          </div>
        </div>

        <!-- Animated depth gauge -->
        <div
          class="relative h-[260px] overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#0d3a50_0%,#071824_55%,#02080d_100%)]"
          aria-hidden="true"
        >
          <div
            class="absolute bottom-5 left-14 top-5 w-0.5 bg-[repeating-linear-gradient(180deg,rgba(232,241,244,0.25)_0_6px,transparent_6px_12px)]"
          ></div>
          <span
            v-for="d in [0, 20, 40, 60]"
            :key="d"
            class="absolute left-3 -translate-y-1/2 font-mono text-[11px]"
            :class="d === 60 ? 'text-[#ff7a6b]' : 'text-[#7f97a2]'"
            :style="{ top: gaugeTop(d) }"
          >
            {{ d }} m
          </span>
          <div
            class="absolute left-[57px] flex -translate-x-[11px] -translate-y-1/2 items-center gap-2.5 transition-[top] duration-[1200ms] ease-[cubic-bezier(.3,.7,.2,1)]"
            :style="{ top: gaugeTop(depth) }"
          >
            <span
              class="h-[22px] w-[22px] rounded-full border-[3px] border-[#05111a] bg-[#f5d547] shadow-[0_0_0_2px_#f5d547]"
            ></span>
            <span
              class="whitespace-nowrap rounded-lg bg-[rgba(5,17,26,0.85)] px-2.5 py-[5px] font-mono text-[13px] text-[#f5d547]"
            >
              −{{ Math.round(depth) }} m · palier
            </span>
          </div>
          <span
            v-for="i in 4"
            :key="i"
            class="n3-rise pointer-events-none absolute bottom-[30px] rounded-full border-[1.5px] border-[rgba(191,238,232,0.55)]"
            :style="{
              left: 62 + ((i - 1) % 2) * 8 + 'px',
              width: 3 + i * 2 + 'px',
              height: 3 + i * 2 + 'px',
              animationDuration: 3 + (i - 1) * 0.7 + 's',
              animationDelay: (i - 1) * 0.8 + 's',
            }"
          ></span>
          <div class="absolute left-[110px] right-3.5 top-3.5 flex flex-col gap-1.5">
            <div
              class="flex justify-between font-mono text-[11px] text-[#7f97a2]"
            >
              <span>AVANCEMENT</span><span>Patience…</span>
            </div>
            <div
              class="h-1.5 overflow-hidden rounded-[3px] bg-[rgba(232,241,244,0.1)]"
            >
              <div
                class="h-full rounded-[3px] bg-[linear-gradient(90deg,#7fe3d6,#f5d547)] transition-[width] duration-1000 ease-linear"
                :style="{ width: ((t % 60) / 60) * 100 + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Upcoming modules -->
      <section class="mt-14">
        <div class="mb-5 flex items-center gap-4">
          <h2
            class="m-0 font-mono text-sm font-medium uppercase tracking-[0.12em] text-[#b7c9d1]"
          >
            Modules à venir
          </h2>
          <div class="h-px flex-1 bg-[rgba(232,241,244,0.1)]"></div>
        </div>
        <div
          class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-3.5"
        >
          <div
            v-for="(mod, i) in modules"
            :key="mod.title"
            class="n3-in flex min-h-[180px] flex-col gap-3 rounded-[14px] border border-dashed border-[rgba(232,241,244,0.18)] bg-white/[0.02] p-6"
            :style="{ animationDelay: 0.35 + i * 0.07 + 's' }"
          >
            <div class="flex items-center justify-between gap-2.5">
              <span class="font-mono text-[13px] text-[#7f97a2]">
                {{ pad2(i + 1) }}
              </span>
              <span
                class="rounded-full bg-[rgba(232,241,244,0.06)] px-2.5 py-1 text-xs font-semibold text-[#9fb4bd]"
              >
                À venir
              </span>
            </div>
            <div class="mt-auto flex flex-col gap-2">
              <h3
                class="m-0 text-[22px] font-semibold leading-tight tracking-[-0.01em] text-[#d4e2e7]"
              >
                {{ mod.title }}
              </h3>
              <p
                class="m-0 text-[15px] leading-normal text-[#7f97a2] [text-wrap:pretty]"
              >
                {{ mod.desc }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ breadcrumb: 'Niveau 3' })

const modules = [
  {
    title: 'Théorie',
    desc: "Physique, physiologie et procédures de décompression jusqu'à 60 m.",
  },
  {
    title: 'Matériel',
    desc: "L'équipement adapté à la plongée profonde en autonomie.",
  },
  {
    title: 'Exercices',
    desc: 'Les compétences pratiques à valider en milieu naturel.',
  },
  {
    title: 'Réglementation',
    desc: 'Prérogatives, organisation de la palanquée et responsabilités.',
  },
  {
    title: 'Planification',
    desc: 'Préparer une plongée profonde : gaz, profil et paliers.',
  },
  { title: 'Révisions', desc: "Quiz et fiches pour préparer l'examen." },
]

const stats = [
  { label: 'Profondeur max.', value: '60 m' },
  { label: 'Modules prêts', value: `0 / ${modules.length}` },
]

// Gauge loop (24 s): descend to 60 m, hold, then slow ascent
const t = ref(0)
let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => (timer = setInterval(() => t.value++, 1000)))
onBeforeUnmount(() => clearInterval(timer))

const depth = computed(() => {
  const cyc = t.value % 24
  if (cyc < 8) return cyc * 7.5
  if (cyc < 16) return 60
  return 60 - (cyc - 16) * 3.5
})

// 20px padding top and bottom inside the 260px gauge
const gaugeTop = (d: number) => `calc(20px + (100% - 40px) * ${d / 60})`
</script>

<style>
.n3-in {
  animation: n3In 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.n3-blink {
  animation: n3Blink 1.4s ease-in-out infinite;
}
.n3-stripes {
  animation: n3Stripes 1.2s linear infinite;
}
.n3-rise {
  animation-name: n3Rise;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes n3In {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes n3Stripes {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 40px 0;
  }
}
@keyframes n3Blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}
@keyframes n3Rise {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  15% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-220px);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .n3-in,
  .n3-blink,
  .n3-stripes,
  .n3-rise {
    animation: none !important;
  }
}
</style>
