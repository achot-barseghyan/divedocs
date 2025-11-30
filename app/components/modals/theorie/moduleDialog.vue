<template>
  <Dialog
    v-model:visible="visible"
    modal
    blockScroll
    class="mobile-full-dialog"
    content-class="mobile-full-dialog__content"
    :closable="true"
  >
    <template #header>
      <div class="flex w-full flex-col gap-1 md:gap-6">
        <h1 class="text-lg font-extrabold text-yellow-500 md:text-2xl">
          {{ moduleData?.title }}
        </h1>
        <div class="flex items-start justify-between gap-4">
          <p class="block flex-1 text-base text-white/90">
            {{ moduleData?.description }}
          </p>
          <Button
            v-if="moduleData?.id"
            :loading="isExporting"
            :disabled="isExporting"
            icon="pi pi-file-pdf"
            label="Exporter"
            class="whitespace-nowrap rounded-xl border border-teal-500/30 bg-slate-800/50 px-4 py-2 text-white hover:border-teal-400/50 hover:bg-slate-800/60"
            @click.stop.prevent="onExportModule"
          />
        </div>
      </div>
    </template>

    <div
      v-for="(value, sectionIndex) in moduleData?.sections"
      :key="sectionIndex"
      class="mb-8 rounded-lg bg-darkblue-900 p-4"
    >
      <p class="mb-2 text-lg font-bold text-white">
        {{ value.heading }}
      </p>
      <p class="mb-2">{{ value.content }}</p>

      <div
        v-if="value.formula"
        class="my-4 rounded-lg border border-teal-500/30 bg-teal-900/30 p-4"
      >
        <p class="text-center font-mono text-xl text-teal-300">
          {{ value.formula }}
        </p>
        <p
          v-if="value.formulaDescription"
          class="mt-2 text-center text-sm text-gray-300"
        >
          {{ value.formulaDescription }}
        </p>
      </div>

      <p v-if="value.detail" class="mt-2 italic text-gray-300">
        {{ value.detail }}
      </p>

      <p v-if="value.principle" class="mt-2 text-gray-200">
        {{ value.principle }}
      </p>

      <p v-if="value.law" class="mt-2 font-semibold text-teal-300">
        {{ value.law }}
      </p>

      <ul v-if="value.list" class="mt-2 list-inside list-disc">
        <li v-for="item in value.list" :key="item" class="mb-4">{{ item }}</li>
      </ul>

      <ul
        v-if="value.consequences"
        class="mt-2 list-inside list-disc text-yellow-300"
      >
        <li v-for="item in value.consequences" :key="item" class="mb-2">
          {{ item }}
        </li>
      </ul>

      <div v-if="value.examples" class="mt-4 space-y-2">
        <p class="font-semibold text-turquoise-400">Exemples :</p>
        <ul class="ml-4 list-inside list-disc">
          <li v-for="example in value.examples" :key="example" class="mb-2">
            {{ example }}
          </li>
        </ul>
      </div>

      <div v-if="value.subsections" class="mt-4 space-y-4">
        <div
          v-for="subsection in value.subsections"
          :key="subsection.title"
          class="ml-4 rounded-lg bg-darkblue-800 p-3"
        >
          <p class="mb-2 font-bold text-turquoise-400">
            {{ subsection.title }}
          </p>
          <p class="text-gray-200">{{ subsection.content }}</p>

          <ul
            v-if="subsection.examples"
            class="ml-4 mt-2 list-inside list-disc"
          >
            <li
              v-for="example in subsection.examples"
              :key="example"
              class="mb-1"
            >
              {{ example }}
            </li>
          </ul>

          <div v-if="subsection.images" class="mt-4 flex flex-wrap gap-4">
            <div v-for="(item, imageIndex) in subsection.images" :key="item.id">
              <img
                :src="item.src"
                :alt="item.alt"
                class="max-h-[40vh] cursor-pointer rounded-lg border-2 border-teal-400"
                @click="() => showImg(sectionIndex, imageIndex)"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="value.emphasis"
        class="mt-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-900/30 p-4"
      >
        <p class="font-bold text-yellow-300">⚠️ {{ value.emphasis }}</p>
      </div>

      <div
        class="mt-8"
        v-for="(item, imageIndex) in value.images"
        :key="item.id"
      >
        <img
          :src="item.src"
          :alt="item.alt"
          class="mt-4 max-h-[60vh] cursor-pointer rounded-lg border-2 border-teal-400"
          @click="() => showImg(sectionIndex, imageIndex)"
        />
      </div>
    </div>

    <VueEasyLightbox
      :visible="visibleLighboxRef"
      :imgs="currentImages"
      :index="indexLightboxRef"
      @hide="onHide"
    />

    <div
      v-if="moduleData?.keyPoints?.length > 0"
      class="mb-8 rounded-lg border-2 border-teal-400 bg-darkblue-900 p-4"
    >
      <h2
        class="mb-4 flex items-center gap-2 text-xl font-bold text-turquoise-500"
      >
        <Icon name="iconoir:warning-circle-solid" size="2rem" />
        Points clés
      </h2>
      <ul class="list-inside list-disc">
        <li v-for="point in moduleData.keyPoints" :key="point" class="mb-3">
          {{ point }}
        </li>
      </ul>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useTheorieCourses } from '~/composables/useTheorieCourses'
import { useExportPDF } from '~/composables/useExportPDF'

const { courses, fetchCourses, getCourseById } = useTheorieCourses()

const visibleLighboxRef = ref(false)
const indexLightboxRef = ref(0)
const currentImages = ref([])

function showImg(sectionIndex: number, imageIndex: number) {
  currentImages.value = moduleData.value.sections[sectionIndex].images
  indexLightboxRef.value = imageIndex
  visibleLighboxRef.value = true
}
const onHide = () => (visibleLighboxRef.value = false)

const visible = ref(false)
const moduleData: any = ref(null)
const isExporting = ref(false)
const { exportModuleToPDF } = useExportPDF()

const open = async (idModule: number) => {
  if (!courses.value.length) {
    await fetchCourses()
  }
  moduleData.value = getCourseById(idModule).value
  visible.value = true
}

defineExpose({
  visible,
  open,
})

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

<style lang="scss">
/* mobile-full-dialog overrides - mobile only */
@media (max-width: 767px) {
  /* Make dialog root full-screen and remove fancy radius */
  .mobile-full-dialog.p-dialog {
    position: fixed !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100vh !important;
    max-height: 100vh !important;
    margin: 0 !important;
    border-radius: 0 !important;
    display: flex !important;
    align-items: stretch !important;
    justify-content: center !important;
  }

  /* Ensure the content area becomes a flex column that fills the dialog */
  .mobile-full-dialog__content {
    display: flex !important;
    flex-direction: column !important;
    height: 100vh !important;
    max-height: 100vh !important;
    padding: 1rem !important; /* adjust if you want spacing */
  }

  /* Header/footer keep intrinsic size */
  .mobile-full-dialog__content .p-dialog-header,
  .mobile-full-dialog__content .p-dialog-footer {
    flex: 0 0 auto !important;
    z-index: 2;
  }

  /* Body takes remaining space and scrolls */
  .mobile-full-dialog__content .p-dialog-content,
  .mobile-full-dialog__content .p-dialog-body {
    flex: 1 1 auto !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
    padding: 1rem !important; /* adjust spacing */
  }

  /* Optional: keep overlay visible below dialog */
  .p-dialog-mask {
    align-items: stretch !important;
  }
}

@media (min-width: 768px) {
  .mobile-full-dialog.p-dialog {
    width: 70% !important;
    max-width: 70% !important;
    height: auto !important;
    max-height: 90vh !important;
    margin: auto !important;
    border-radius: 12px !important;
  }

  .mobile-full-dialog__content {
    max-height: 90vh !important;
    display: flex !important;
    flex-direction: column;
  }

  .mobile-full-dialog__content .p-dialog-content,
  .mobile-full-dialog__content .p-dialog-body {
    overflow-y: auto !important;
  }
}
</style>
