<template>
  <UiSideDrawer
    ref="drawer"
    v-model:open="visible"
    :label="moduleData?.title ?? 'Module'"
    :escape-enabled="!visibleLighboxRef"
  >
    <template #eyebrow>
      Module {{ pad2(currentIndex + 1) }} / {{ pad2(courses.length) }}
    </template>
    <template #actions>
      <button
        type="button"
        :class="drawerButton"
        :disabled="isExporting"
        @click="onExportModule"
      >
        {{ isExporting ? 'Export…' : 'Exporter' }}
      </button>
    </template>

    <template v-if="moduleData">
      <h2
        class="m-0 mb-2 text-[clamp(32px,4vw,44px)] font-bold leading-[1.05] tracking-[-0.025em] text-white [text-wrap:balance]"
      >
        {{ moduleData.title }}
      </h2>
      <p
        v-if="moduleData.description"
        class="m-0 mb-7 text-lg leading-[1.6] text-[#d4e2e7] [text-wrap:pretty]"
      >
        {{ moduleData.description }}
      </p>

      <section
        v-for="(value, sectionIndex) in moduleData.sections"
        :key="sectionIndex"
        :class="[cardBase, 'px-6 py-[22px]']"
      >
        <h3 v-if="value.heading" class="mb-3 text-lg font-semibold text-white">
          {{ value.heading }}
        </h3>
        <p v-if="value.content" :class="bodyText">{{ value.content }}</p>

        <div
          v-if="value.formula"
          class="my-4 rounded-[10px] border border-[rgba(127,227,214,0.3)] bg-[rgba(127,227,214,0.06)] p-4 text-center"
        >
          <p class="font-mono text-lg text-[#7fe3d6]">{{ value.formula }}</p>
          <p
            v-if="value.formulaDescription"
            class="mt-2 text-sm text-[#9fb4bd]"
          >
            {{ value.formulaDescription }}
          </p>
        </div>

        <p v-if="value.detail" :class="[bodyText, 'mt-2 italic']">
          {{ value.detail }}
        </p>
        <p v-if="value.principle" :class="[bodyText, 'mt-2']">
          {{ value.principle }}
        </p>
        <p
          v-if="value.law"
          class="mt-2 text-base font-semibold leading-[1.65] text-[#7fe3d6]"
        >
          {{ value.law }}
        </p>

        <ul v-if="value.list" :class="dotList">
          <li v-for="item in value.list" :key="item" :class="dotItem">
            <span :class="[dot, 'bg-[#7fe3d6]']"></span>
            <span>{{ item }}</span>
          </li>
        </ul>

        <ul v-if="value.consequences" :class="[dotList, 'mt-3']">
          <li v-for="item in value.consequences" :key="item" :class="dotItem">
            <span :class="[dot, 'bg-[#f5d547]']"></span>
            <span>{{ item }}</span>
          </li>
        </ul>

        <div v-if="value.examples" class="mt-4">
          <p
            class="mb-2.5 font-mono text-xs uppercase tracking-[0.08em] text-[#7f97a2]"
          >
            Exemples
          </p>
          <ul :class="dotList">
            <li
              v-for="example in value.examples"
              :key="example"
              :class="dotItem"
            >
              <span :class="[dot, 'bg-[#7fe3d6]']"></span>
              <span>{{ example }}</span>
            </li>
          </ul>
        </div>

        <div v-if="value.subsections" class="mt-4 flex flex-col gap-3">
          <div
            v-for="subsection in value.subsections"
            :key="subsection.title"
            class="rounded-[10px] border border-[rgba(232,241,244,0.07)] bg-white/[0.03] p-4"
          >
            <p class="mb-1.5 font-semibold text-[#7fe3d6]">
              {{ subsection.title }}
            </p>
            <p :class="bodyText">{{ subsection.content }}</p>
            <ul v-if="subsection.examples" :class="[dotList, 'mt-2']">
              <li
                v-for="example in subsection.examples"
                :key="example"
                :class="dotItem"
              >
                <span :class="[dot, 'bg-[#7fe3d6]']"></span>
                <span>{{ example }}</span>
              </li>
            </ul>
            <div v-if="subsection.images" class="mt-4 flex flex-wrap gap-3">
              <button
                v-for="(item, imageIndex) in subsection.images"
                :key="item.id ?? imageIndex"
                type="button"
                @click="showImg(subsection.images, imageIndex)"
              >
                <img
                  :src="item.src"
                  :alt="item.alt"
                  class="max-h-[40vh] rounded-[10px] border border-[rgba(232,241,244,0.14)]"
                />
              </button>
            </div>
          </div>
        </div>

        <div
          v-if="value.emphasis"
          class="mt-4 rounded-[10px] border-l-2 border-[#f5d547] bg-[rgba(245,213,71,0.08)] px-4 py-3 text-base font-semibold text-[#f5d547]"
        >
          {{ value.emphasis }}
        </div>

        <div v-if="value.images" class="mt-4 flex flex-col gap-3">
          <button
            v-for="(item, imageIndex) in value.images"
            :key="item.id ?? imageIndex"
            type="button"
            @click="showImg(value.images, imageIndex)"
          >
            <img
              :src="item.src"
              :alt="item.alt"
              class="max-h-[60vh] rounded-[10px] border border-[rgba(232,241,244,0.14)]"
            />
          </button>
        </div>
      </section>

      <section
        v-if="moduleData.keyPoints?.length"
        class="mt-3 rounded-[14px] border border-[rgba(127,227,214,0.4)] bg-[rgba(127,227,214,0.07)] px-6 py-[22px]"
      >
        <div class="mb-4 flex items-center gap-3">
          <span
            class="grid h-7 w-7 place-items-center rounded-full bg-[#7fe3d6] text-[15px] font-bold text-[#05111a]"
            aria-hidden="true"
          >
            !
          </span>
          <h3 class="m-0 text-lg font-semibold text-white">Points clés</h3>
        </div>
        <ul :class="dotList">
          <li
            v-for="point in moduleData.keyPoints"
            :key="point"
            :class="[dotItem, 'text-[#e8f1f4]']"
          >
            <span :class="[dot, 'bg-[#f5d547]']"></span>
            <span>{{ point }}</span>
          </li>
        </ul>
      </section>

      <!-- Prev / next -->
      <nav
        v-if="courses.length > 1"
        class="mt-8 grid grid-cols-2 gap-3"
        aria-label="Navigation entre modules"
      >
        <button
          type="button"
          class="flex flex-col items-start gap-1 rounded-xl border border-[rgba(232,241,244,0.12)] bg-transparent px-4 py-3.5 text-left text-[#e8f1f4] transition-colors hover:border-[rgba(127,227,214,0.45)] hover:bg-[rgba(127,227,214,0.08)]"
          @click="goTo(currentIndex - 1)"
        >
          <span class="font-mono text-xs text-[#7f97a2]">← Précédent</span>
          <span class="text-[15px] font-semibold">{{ prevCourse?.title }}</span>
        </button>
        <button
          type="button"
          class="flex flex-col items-end gap-1 rounded-xl border border-[#7fe3d6] bg-[#7fe3d6] px-4 py-3.5 text-right text-[#05111a] transition-colors hover:bg-[#a3efe5]"
          @click="goTo(currentIndex + 1)"
        >
          <span class="font-mono text-xs text-[#0c2a3d]">Suivant →</span>
          <span class="text-[15px] font-semibold">{{ nextCourse?.title }}</span>
        </button>
      </nav>
    </template>
  </UiSideDrawer>

  <Teleport to="body">
    <VueEasyLightbox
      :visible="visibleLighboxRef"
      :imgs="currentImages"
      :index="indexLightboxRef"
      @hide="onHide"
    />
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useTheorieCourses } from '~/composables/useTheorieCourses'
import { useExportPDF } from '~/composables/useExportPDF'

const props = withDefaults(
  defineProps<{
    dataPath?: string
  }>(),
  {
    dataPath: '/data/theorie-courses.json',
  }
)

const bodyText =
  'm-0 text-base leading-[1.65] text-[#b7c9d1] [text-wrap:pretty]'
const dotList = 'm-0 flex list-none flex-col gap-2.5 p-0'
const dotItem =
  'grid grid-cols-[16px_1fr] gap-2.5 text-base leading-[1.55] text-[#b7c9d1]'
const dot = 'mt-[9px] h-1.5 w-1.5 rounded-full'

const { courses, fetchCourses } = useTheorieCourses(props.dataPath)

const visible = ref(false)
const currentIndex = ref(0)
const isExporting = ref(false)
const drawer = ref<{ scrollToTop: () => void } | null>(null)

const moduleData = computed<any>(
  () => courses.value[currentIndex.value] ?? null
)
const wrap = (i: number) => (i + courses.value.length) % courses.value.length
const prevCourse = computed(() => courses.value[wrap(currentIndex.value - 1)])
const nextCourse = computed(() => courses.value[wrap(currentIndex.value + 1)])

const visibleLighboxRef = ref(false)
const indexLightboxRef = ref(0)
const currentImages = ref<any[]>([])

function showImg(images: any[], imageIndex: number) {
  currentImages.value = images
  indexLightboxRef.value = imageIndex
  visibleLighboxRef.value = true
}
const onHide = () => (visibleLighboxRef.value = false)

const open = async (idModule: number) => {
  if (!courses.value.length) {
    await fetchCourses()
  }
  const index = courses.value.findIndex((c) => c.id === idModule)
  if (index === -1) return
  currentIndex.value = index
  visible.value = true
}

const goTo = (index: number) => {
  currentIndex.value = wrap(index)
  drawer.value?.scrollToTop()
}

// ← and → move between modules while the panel is open
useEventListener('keydown', (e: KeyboardEvent) => {
  if (!visible.value || visibleLighboxRef.value) return
  if (e.key === 'ArrowRight') goTo(currentIndex.value + 1)
  if (e.key === 'ArrowLeft') goTo(currentIndex.value - 1)
})

defineExpose({
  visible,
  open,
})

const { exportModuleToPDF } = useExportPDF(props.dataPath)

const onExportModule = async () => {
  if (!moduleData.value?.id) return
  try {
    isExporting.value = true
    await exportModuleToPDF(moduleData.value.id)
  } catch (e) {
    console.error('Export PDF module échoué', e)
  } finally {
    isExporting.value = false
  }
}
</script>
