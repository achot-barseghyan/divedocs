<template>
  <Teleport to="body">
    <div
      v-if="fiche"
      class="fiche-fade-in fixed inset-0 z-[1100] bg-[rgba(3,10,16,0.75)] font-grotesk text-[#e8f1f4] antialiased backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      :aria-label="f.title"
    >
      <div
        ref="sheetRef"
        class="fiche-sheet-in absolute inset-0 overflow-y-auto overflow-x-hidden bg-[linear-gradient(180deg,#0d3146_0%,#0a2333_30%,#071824_65%,#040d14_100%)]"
        @scroll.passive="onScroll"
      >
        <!-- Sticky depth bar -->
        <div
          class="sticky top-0 z-[5] border-b border-[rgba(232,241,244,0.08)] bg-[rgba(10,30,44,0.88)] backdrop-blur-[10px]"
        >
          <div class="mx-auto flex max-w-[1100px] items-center gap-4 px-6 py-3.5">
            <button
              type="button"
              aria-label="Fermer"
              :class="[
                secondaryButton,
                'h-11 w-11 flex-none rounded-xl text-[17px]',
              ]"
              @click="close"
            >
              ✕
            </button>
            <div class="flex min-w-0 flex-1 flex-col gap-0.5">
              <span
                class="overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold text-white"
              >
                {{ f.title }}
              </span>
              <span class="font-mono text-xs text-[#7f97a2]">
                {{ stopNames[stop] }}
              </span>
            </div>
            <div class="flex items-baseline gap-1 font-mono text-[#f5d547]">
              <span class="text-2xl font-medium">
                −{{ (prog * 20).toFixed(1) }}
              </span>
              <span class="text-[13px]">m</span>
            </div>
          </div>
          <div class="relative h-[3px] bg-[rgba(232,241,244,0.08)]">
            <div
              class="absolute inset-y-0 left-0 bg-[linear-gradient(90deg,#7fe3d6,#f5d547)] transition-[width] duration-100 ease-linear"
              :style="{ width: prog * 100 + '%' }"
            ></div>
            <button
              v-for="(p, i) in stopPos.slice(1)"
              :key="i"
              type="button"
              :aria-label="stopNames[i + 1]"
              :title="stopNames[i + 1]"
              class="absolute -top-1 h-[11px] w-[11px] cursor-pointer rounded-full border-2 p-0 transition-colors duration-300"
              :class="
                stop >= i + 1
                  ? 'border-[#f5d547] bg-[#f5d547]'
                  : 'border-[rgba(232,241,244,0.35)] bg-[#0a1e2c]'
              "
              :style="{ left: `calc((100% - 11px) * ${p})` }"
              @click="goStop(i + 1)"
            ></button>
          </div>
        </div>

        <!-- Surface: hero -->
        <section
          data-stop
          class="relative flex min-h-[min(78vh,720px)] items-end overflow-hidden"
        >
          <span
            v-for="(b, i) in bubbles"
            :key="i"
            class="fiche-rise absolute -bottom-5 rounded-full border-[1.5px] border-[rgba(191,238,232,0.5)] bg-[rgba(191,238,232,0.08)]"
            :style="b"
            aria-hidden="true"
          ></span>
          <div
            class="relative mx-auto grid w-full max-w-[1100px] grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-end gap-10 px-6 pb-14 pt-[72px]"
          >
            <div class="fiche-hero-up flex flex-col gap-5">
              <span
                class="font-mono text-[clamp(90px,16vw,180px)] font-medium leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_rgba(127,227,214,0.45)]"
                aria-hidden="true"
              >
                {{ f.n }}
              </span>
              <span
                class="font-mono text-[13px] uppercase tracking-[0.12em] text-[#f5d547]"
              >
                Fiche équipement · Niveau 2
              </span>
              <h2
                class="m-0 text-[clamp(44px,7vw,84px)] font-bold leading-[0.95] tracking-[-0.035em] text-white [text-wrap:balance]"
              >
                {{ f.title }}
              </h2>
              <p
                class="m-0 max-w-[520px] text-[19px] leading-[1.6] text-[#b7c9d1] [text-wrap:pretty]"
              >
                {{ f.intro }}
              </p>
            </div>
            <div class="fiche-hero-up" style="animation-delay: 0.35s">
              <ModalsMaterielFicheOrdiScreen
                v-if="fiche === 'ordi'"
                :selected="part"
              />
              <div
                v-else-if="f.hero"
                class="ml-auto aspect-[3/2] max-w-[560px] overflow-hidden rounded-[28px] border border-[rgba(232,241,244,0.12)] bg-[#0e2737] shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
              >
                <UiImageSlot
                  :src="f.hero.img"
                  :placeholder="f.hero.placeholder"
                />
              </div>
            </div>
          </div>
        </section>

        <div class="mx-auto max-w-[1100px] px-6">
          <!-- Key facts -->
          <div
            data-reveal
            class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] border-y border-[rgba(232,241,244,0.1)]"
          >
            <div
              v-for="k in f.facts"
              :key="k.v"
              class="flex flex-col gap-1.5 px-1 py-7"
            >
              <span
                class="font-mono text-[clamp(26px,3.4vw,36px)] text-[#f5d547]"
              >
                {{ k.v }}
              </span>
              <span class="text-[15px] leading-[1.45] text-[#9fb4bd]">
                {{ k.k }}
              </span>
            </div>
          </div>

          <!-- −5 m: purpose -->
          <section data-stop :class="[splitSection, 'pt-24']">
            <div data-reveal class="flex flex-col gap-2.5">
              <span :class="depthTag">−5 m</span>
              <h3 :class="stopTitle">À quoi ça sert</h3>
            </div>
            <div class="flex flex-col gap-5">
              <p
                v-for="(p, i) in f.about"
                :key="i"
                data-reveal
                class="m-0 text-lg leading-[1.7] text-[#d4e2e7] [text-wrap:pretty]"
              >
                {{ p }}
              </p>
            </div>
          </section>

          <div v-if="f.types" class="flex flex-col gap-5 pt-[72px]">
            <h4
              data-reveal
              class="m-0 text-2xl font-bold tracking-[-0.02em] text-white"
            >
              Les {{ f.types.length }} familles de gilets
            </h4>
            <div
              class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-3.5"
            >
              <div
                v-for="(ty, i) in f.types"
                :key="ty.t"
                data-reveal
                class="flex flex-col gap-3 rounded-[20px] border p-[26px] transition-transform duration-200 hover:-translate-y-1"
                :class="
                  i === 0
                    ? 'border-[rgba(127,227,214,0.35)] bg-[rgba(127,227,214,0.07)]'
                    : 'border-[rgba(232,241,244,0.09)] bg-white/[0.035]'
                "
              >
                <div class="flex items-center justify-between gap-2.5">
                  <span class="font-mono text-[13px]" :class="accents[i]">
                    {{ pad2(i + 1) }}
                  </span>
                  <span
                    class="rounded-full bg-[rgba(232,241,244,0.08)] px-[9px] py-1 text-xs font-semibold text-[#d4e2e7]"
                  >
                    {{ ty.tag }}
                  </span>
                </div>
                <h5
                  class="m-0 text-2xl font-bold tracking-[-0.02em] text-white"
                >
                  {{ ty.t }}
                </h5>
                <p
                  class="m-0 text-base leading-[1.65] text-[#b7c9d1] [text-wrap:pretty]"
                >
                  {{ ty.d }}
                </p>
                <span
                  class="mt-auto border-t border-[rgba(232,241,244,0.1)] pt-3 text-sm font-semibold"
                  :class="accents[i]"
                >
                  {{ ty.plus }}
                </span>
              </div>
            </div>
          </div>

          <!-- −10 m: anatomy -->
          <section data-stop class="flex flex-col gap-9 pt-[120px]">
            <div data-reveal class="flex max-w-[640px] flex-col gap-2.5">
              <span :class="depthTag">−10 m</span>
              <h3 :class="stopTitle">{{ f.anatomyTitle }}</h3>
              <p class="m-0 text-[17px] leading-[1.6] text-[#9fb4bd]">
                {{ f.anatomyHint }}
              </p>
            </div>
            <div
              data-reveal
              class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-5"
            >
              <div class="flex flex-col gap-1.5">
                <button
                  v-for="(pt, i) in f.parts"
                  :key="pt.name"
                  type="button"
                  class="grid min-h-[60px] cursor-pointer grid-cols-[44px_1fr_auto] items-center gap-3.5 rounded-[14px] border px-[18px] py-2.5 text-left transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fe3d6]"
                  :class="
                    i === part
                      ? 'translate-x-1.5 border-[#7fe3d6] bg-[#7fe3d6] text-[#05111a]'
                      : 'border-[rgba(232,241,244,0.09)] bg-white/[0.035] text-[#e8f1f4] hover:border-[rgba(127,227,214,0.45)]'
                  "
                  :aria-pressed="i === part"
                  @click="part = i"
                >
                  <span
                    class="font-mono text-sm"
                    :class="i === part ? 'text-[#05111a]' : 'text-[#7fe3d6]'"
                  >
                    {{ pad2(i + 1) }}
                  </span>
                  <span class="text-[17px] font-semibold">{{ pt.name }}</span>
                  <span
                    class="text-lg"
                    :class="
                      i === part
                        ? 'text-[#05111a]'
                        : 'text-[rgba(232,241,244,0.3)]'
                    "
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              </div>
              <div
                class="sticky top-[110px] flex min-h-[260px] flex-col gap-4 rounded-[22px] border border-[rgba(127,227,214,0.25)] bg-[linear-gradient(160deg,rgba(127,227,214,0.10),rgba(127,227,214,0.02))] p-8"
                aria-live="polite"
              >
                <span class="font-mono text-[56px] leading-none text-[#7fe3d6]">
                  {{ pad2(part + 1) }}
                </span>
                <h4
                  class="m-0 text-[26px] font-bold tracking-[-0.02em] text-white"
                >
                  {{ currentPart.name }}
                </h4>
                <p
                  class="m-0 text-[17px] leading-[1.7] text-[#d4e2e7] [text-wrap:pretty]"
                >
                  {{ currentPart.text }}
                </p>
                <p
                  v-if="currentPart.tip"
                  class="m-0 mt-1 border-t border-[rgba(232,241,244,0.1)] pt-4 text-[15px] leading-[1.6] text-[#f5d547]"
                >
                  {{ currentPart.tip }}
                </p>
              </div>
            </div>

            <ModalsMaterielFicheBuoyancySim v-if="fiche === 'gilet'" />
            <ModalsMaterielFichePressureSim v-else-if="fiche === 'det'" />
            <ModalsMaterielFicheParachuteSim v-else-if="fiche === 'para'" />
          </section>

          <!-- −15 m: choosing -->
          <section data-stop class="flex flex-col gap-9 pt-[120px]">
            <div data-reveal class="flex flex-col gap-2.5">
              <span :class="depthTag">−15 m</span>
              <h3 :class="stopTitle">Bien choisir</h3>
            </div>
            <div
              class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-px overflow-hidden rounded-[20px] border border-[rgba(232,241,244,0.1)] bg-[rgba(232,241,244,0.1)]"
            >
              <div
                v-for="(c, i) in f.choose"
                :key="c.t"
                data-reveal
                class="flex flex-col gap-3 bg-[#0a2130] p-7"
              >
                <span class="font-mono text-[13px] text-[#f5d547]">
                  {{ pad2(i + 1) }}
                </span>
                <h4
                  class="m-0 text-[21px] font-semibold tracking-[-0.01em] text-white"
                >
                  {{ c.t }}
                </h4>
                <p
                  class="m-0 text-base leading-[1.65] text-[#9fb4bd] [text-wrap:pretty]"
                >
                  {{ c.d }}
                </p>
              </div>
            </div>
          </section>

          <!-- −18 m: use & care -->
          <section data-stop :class="[splitSection, 'pt-[120px]']">
            <div data-reveal class="flex flex-col gap-2.5">
              <span :class="depthTag">−18 m</span>
              <h3 :class="stopTitle">Utilisation et entretien</h3>
            </div>
            <ol class="m-0 flex list-none flex-col p-0">
              <li
                v-for="(c, i) in f.care"
                :key="c.t"
                data-reveal
                class="grid grid-cols-[44px_1fr] gap-4 border-b border-[rgba(232,241,244,0.08)] py-5"
              >
                <span
                  class="grid h-8 w-8 place-items-center rounded-full border-[1.5px] border-[rgba(127,227,214,0.5)] font-mono text-[13px] text-[#7fe3d6]"
                >
                  {{ pad2(i + 1) }}
                </span>
                <span
                  class="text-[17px] leading-[1.65] text-[#d4e2e7] [text-wrap:pretty]"
                >
                  <strong class="font-semibold text-white">{{ c.t }}</strong>
                  {{ c.d }}
                </span>
              </li>
            </ol>
          </section>

          <!-- −20 m: products -->
          <section
            v-if="products.length"
            data-stop
            class="flex flex-col gap-9 pt-[120px]"
          >
            <div
              data-reveal
              class="flex flex-wrap items-end justify-between gap-4"
            >
              <div class="flex flex-col gap-2.5">
                <span :class="depthTag">−20 m · Fond</span>
                <h3 :class="stopTitle">
                  {{ products.length }} produits recommandés
                </h3>
              </div>
              <span class="text-sm text-[#7f97a2]">
                Prix indicatifs, à vérifier en magasin.
              </span>
            </div>
            <div
              class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,200px),1fr))] gap-3.5"
            >
              <article
                v-for="(p, i) in products"
                :key="p.name"
                data-reveal
                class="relative flex flex-col overflow-hidden rounded-[18px] border bg-white/[0.04] transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-[rgba(127,227,214,0.5)]"
                :class="
                  i === 0
                    ? 'border-[rgba(255,122,107,0.45)]'
                    : 'border-[rgba(232,241,244,0.09)]'
                "
              >
                <div class="relative aspect-square bg-[#eef3f5]">
                  <UiImageSlot
                    contain
                    :src="p.img"
                    :placeholder="`Photo : ${p.brand} ${p.name}`"
                  />
                  <span
                    class="pointer-events-none absolute left-3 top-3 rounded-md bg-[rgba(5,17,26,0.85)] px-2 py-1 font-mono text-[13px] text-[#f5d547]"
                  >
                    {{ pad2(i + 1) }}
                  </span>
                </div>
                <div class="flex flex-1 flex-col gap-2 p-[18px]">
                  <span
                    class="self-start rounded-full px-[9px] py-1 text-xs font-semibold"
                    :class="
                      i === 0
                        ? 'bg-[#ff7a6b] text-[#05111a]'
                        : 'bg-[rgba(232,241,244,0.08)] text-[#d4e2e7]'
                    "
                  >
                    {{ p.tag }}
                  </span>
                  <span
                    class="font-mono text-xs uppercase tracking-[0.08em] text-[#7f97a2]"
                  >
                    {{ p.brand }}
                  </span>
                  <h4
                    class="m-0 text-lg font-semibold leading-tight text-white"
                  >
                    {{ p.name }}
                  </h4>
                  <p
                    class="m-0 text-sm leading-[1.55] text-[#9fb4bd] [text-wrap:pretty]"
                  >
                    {{ p.why }}
                  </p>
                  <span
                    class="mt-auto pt-2.5 font-mono text-base text-[#7fe3d6]"
                  >
                    {{ p.price }}
                  </span>
                </div>
              </article>
            </div>
          </section>

          <!-- Next fiche -->
          <div class="pb-20 pt-24">
            <button
              type="button"
              class="flex w-full cursor-pointer items-center justify-between gap-4 rounded-[22px] border border-[rgba(127,227,214,0.3)] bg-[rgba(127,227,214,0.06)] p-8 text-left text-[#e8f1f4] transition-colors duration-200 hover:bg-[rgba(127,227,214,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fe3d6]"
              @click="fiche = nextKey"
            >
              <span class="flex flex-col gap-1.5">
                <span class="font-mono text-[13px] text-[#7fe3d6]">
                  Fiche suivante
                </span>
                <span
                  class="text-[clamp(24px,3.4vw,34px)] font-bold tracking-[-0.02em] text-white"
                >
                  {{ fiches[nextKey].title }}
                </span>
              </span>
              <span class="text-[32px] text-[#7fe3d6]" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {
  fiches,
  ficheOrder,
  type FicheKey,
} from '~/data/materielNiveau2'

// Full-screen "dive" through one equipment sheet; scroll depth = page progress
const fiche = defineModel<FicheKey | null>('fiche', { default: null })

const stopNames = [
  'Surface',
  'À quoi ça sert',
  'Anatomie',
  'Bien choisir',
  'Utilisation et entretien',
  'Produits recommandés',
]

const depthTag = 'font-mono text-[13px] text-[#7fe3d6]'
const stopTitle =
  'm-0 text-[clamp(32px,4.4vw,48px)] font-bold leading-none tracking-[-0.03em] text-white'
const splitSection =
  'grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-16 gap-y-8'
const accents = ['text-[#7fe3d6]', 'text-[#f5d547]', 'text-[#ff7a6b]']

const sheetRef = ref<HTMLElement | null>(null)
const part = ref(0)
const prog = ref(0)
const stop = ref(0)
const stopPos = ref<number[]>([])

const f = computed(() => fiches[fiche.value ?? 'ordi'])
const currentPart = computed(() => f.value.parts[part.value]!)
const nextKey = computed(() => {
  const i = ficheOrder.indexOf(fiche.value ?? 'ordi')
  return ficheOrder[(i + 1) % ficheOrder.length]!
})

// Cheapest first; the first one is highlighted
const priceOf = (s: string) => parseInt(s.replace(/\D/g, ''), 10) || 0
const products = computed(() =>
  f.value.products
    .map((p, i) => ({
      ...p,
      img: p.img ?? `/img/materiel/niveau2/${fiche.value}-produit-${i + 1}.png`,
    }))
    .sort((a, b) => priceOf(a.price) - priceOf(b.price))
)

const bubbles = Array.from({ length: 12 }, (_, i) => {
  const s = 4 + ((i * 7) % 11)
  return {
    left: ((i * 37) % 97) + '%',
    width: s + 'px',
    height: s + 'px',
    animationDuration: 7 + (i % 5) * 1.6 + 's',
    animationDelay: i * 0.9 + 's',
  }
})

let io: IntersectionObserver | undefined

const setupSheet = () => {
  const root = sheetRef.value
  if (!root) return
  root.scrollTop = 0
  io?.disconnect()
  io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return
        const el = en.target as HTMLElement
        el.style.opacity = '1'
        el.style.transform = 'none'
        io?.unobserve(el)
      }),
    { root, threshold: 0.12 }
  )
  root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => {
    el.style.transition = 'none'
    el.style.opacity = '0'
    el.style.transform = 'translateY(28px)'
    void el.offsetHeight
    el.style.transition =
      'opacity .7s cubic-bezier(.2,.8,.2,1), transform .7s cubic-bezier(.2,.8,.2,1)'
    el.style.transitionDelay = (i % 4) * 0.07 + 's'
    io!.observe(el)
  })
  const max = Math.max(1, root.scrollHeight - root.clientHeight)
  stopPos.value = [...root.querySelectorAll<HTMLElement>('[data-stop]')].map(
    (el) => Math.min(1, Math.max(0, (el.offsetTop - 80) / max))
  )
}

const onScroll = () => {
  const el = sheetRef.value
  if (!el) return
  const max = Math.max(1, el.scrollHeight - el.clientHeight)
  prog.value = el.scrollTop / max
  let s = 0
  stopPos.value.forEach((p, i) => {
    if (prog.value + 0.001 >= p) s = i
  })
  stop.value = s
}

const goStop = (i: number) => {
  const el = sheetRef.value?.querySelectorAll<HTMLElement>('[data-stop]')[i]
  if (el) sheetRef.value!.scrollTo({ top: Math.max(0, el.offsetTop - 70), behavior: 'smooth' })
}

const close = () => (fiche.value = null)

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && fiche.value) close()
}

watch(fiche, async (key) => {
  part.value = 0
  prog.value = 0
  stop.value = 0
  if (!key) {
    io?.disconnect()
    document.body.style.overflow = ''
    return
  }
  document.body.style.overflow = 'hidden'
  await nextTick()
  setupSheet()
})

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  io?.disconnect()
  document.body.style.overflow = ''
})
</script>

<style>
/* Global: also used by the fiche/* simulation components */
.fiche-fade-in {
  animation: ficheFadeIn 0.3s ease-out both;
}
.fiche-sheet-in {
  animation: ficheSheetIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.fiche-hero-up {
  animation: ficheHeroUp 0.7s 0.15s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.fiche-rise {
  animation-name: ficheRise;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.fiche-glow {
  animation: ficheGlow 1.6s ease-in-out infinite;
}
.fiche-blink {
  animation: ficheBlink 0.8s ease-in-out infinite;
}
.fiche-sway {
  animation: ficheSway 3s ease-in-out infinite;
}

@keyframes ficheSheetIn {
  from {
    opacity: 0;
    transform: translateY(48px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes ficheFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes ficheHeroUp {
  from {
    opacity: 0;
    transform: translateY(32px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes ficheRise {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  50% {
    transform: translateY(-45vh) translateX(10px);
  }
  100% {
    transform: translateY(-90vh) translateX(-6px);
    opacity: 0;
  }
}
@keyframes ficheGlow {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(245, 213, 71, 0);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(245, 213, 71, 0.18);
  }
}
@keyframes ficheBlink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.25;
  }
}
@keyframes ficheSway {
  0%,
  100% {
    transform: translateX(-50%) rotate(-3deg);
  }
  50% {
    transform: translateX(-50%) rotate(3deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .fiche-fade-in,
  .fiche-sheet-in,
  .fiche-hero-up,
  .fiche-rise,
  .fiche-glow,
  .fiche-blink,
  .fiche-sway {
    animation: none !important;
  }
  .fiche-sway {
    transform: translateX(-50%);
  }
}
</style>
