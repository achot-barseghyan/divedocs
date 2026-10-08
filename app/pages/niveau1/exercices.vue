<template>
  <div class="font-grotesk text-[#e8f1f4] antialiased">
    <UiPageBackground />

    <main class="mx-auto max-w-[1280px] px-8 pb-24">
      <UiPageHero title="Exercices pratiques" size="md" />

      <div
        class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-6"
      >
        <button
          v-for="(exercise, i) in exercises"
          :key="exercise.videoId"
          type="button"
          :class="[
            cardHover,
            'flex flex-col overflow-hidden rounded-2xl border border-[rgba(232,241,244,0.09)] bg-white/[0.035] text-left text-[#e8f1f4]',
          ]"
          :aria-label="`Voir en vidéo : ${exercise.title}`"
          @click="play(exercise)"
        >
          <div class="relative aspect-video w-full bg-[#0e2737]">
            <img
              :src="`https://i.ytimg.com/vi/${exercise.videoId}/maxresdefault.jpg`"
              alt=""
              loading="lazy"
              class="absolute inset-0 h-full w-full object-cover"
            />
            <span
              class="absolute left-1/2 top-1/2 grid h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#7fe3d6] text-[#05111a]"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" class="ml-1 h-6 w-6" fill="currentColor">
                <path d="M7 4.5v15l13-7.5z" />
              </svg>
            </span>
          </div>

          <div
            class="flex w-full flex-wrap items-end justify-between gap-5 px-7 pb-7 pt-6"
          >
            <div class="flex flex-col gap-2">
              <span class="font-mono text-[13px] text-[#7fe3d6]">
                {{ pad2(i + 1) }}
              </span>
              <h2
                class="m-0 text-[26px] font-semibold leading-[1.15] tracking-[-0.015em] text-white"
              >
                {{ exercise.title }}
              </h2>
              <p class="m-0 text-base text-[#9fb4bd]">{{ exercise.desc }}</p>
            </div>
            <span
              :class="[primaryButton, 'h-[42px] px-4 text-[15px]']"
              aria-hidden="true"
            >
              Voir en vidéo ▶
            </span>
          </div>
        </button>
      </div>
    </main>

    <CommonVideoDialog ref="VideoDialog" />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ breadcrumb: 'Exercices' })

const VideoDialog = ref()

const exercises = [
  {
    title: 'Vidage de masque',
    desc: 'Voir les deux techniques',
    videoId: 'rf-w0LmaDyk',
  },
  {
    title: "Lâcher et reprise d'embout",
    desc: 'Voir les deux techniques',
    videoId: 'MJ3-_PwSyIQ',
  },
]

const play = (exercise: { videoId: string }) => {
  VideoDialog.value.open(`https://www.youtube.com/embed/${exercise.videoId}`)
}
</script>
