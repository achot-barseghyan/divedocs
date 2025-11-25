<template>
  <div class="relative min-h-screen w-full pt-[5rem]">
    <img
      src="/img/bg.jpg"
      class="absolute inset-0 h-full w-full object-cover object-center"
      alt="underwater background"
    />
    <div
      class="absolute inset-0 bg-gradient-to-b from-[#001a23]/60 to-[#001a23]/90"
    ></div>

    <div
      class="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8"
    >
      <div class="mb-10 mr-auto">
        <CommonGoBack useRouter />
      </div>
      <ProgressSpinner v-if="loading" class="mb-8" />

      <Message
        v-else-if="error"
        severity="error"
        :text="error"
        class="mb-8 w-full max-w-3xl"
      />

      <div v-else-if="currentPageData" class="w-full max-w-4xl">
        <div class="mb-8 text-center">
          <h1 class="mb-4 text-4xl font-extrabold text-white">
            {{ currentPageData.title }}
          </h1>
          <Tag
            :value="`Page ${currentPage} / ${totalPages}`"
            severity="warning"
            class="text-center"
          />
        </div>

        <Card class="mb-8 !bg-white px-4">
          <template #content>
            <div class="max-h-[60vh] min-h-[360px] w-full overflow-auto">
              <p class="mb-6 text-lg leading-relaxed text-black">
                {{ currentPageData.content }}
              </p>

              <div class="mx-2 space-y-4">
                <div
                  v-for="(section, index) in currentPageData.sections"
                  :key="index"
                  class="mb-3 rounded-md bg-gray-200 p-4 shadow-sm"
                >
                  <h3 class="mb-2 text-lg font-semibold text-black">
                    {{ section.heading }}
                  </h3>
                  <p class="leading-relaxed text-black">
                    {{ section.text }}
                  </p>
                </div>
              </div>

              <div
                v-if="currentPageData.evaluation"
                class="relative mx-4 my-10 overflow-visible rounded-3xl border-2 border-darkblue-500 bg-transparent bg-white p-4 shadow-sm"
              >
                <div
                  class="absolute left-[-15px] top-[-20px] rounded-[500px] border-2 border-darkblue-500 bg-white px-4 py-3"
                >
                  <i class="pi pi-check" style="color: #007d9b"></i>
                </div>
                <h3 class="mb-2 ml-6 text-lg font-semibold text-gray-800">
                  {{ currentPageData.evaluation.heading }}
                </h3>
                <p class="ml-6 leading-relaxed text-gray-700">
                  {{ currentPageData.evaluation.text }}
                </p>
              </div>
            </div>
            <div class="text-center">
              <span class="text-sm italic text-gray-500">
                FFESSM officiel - Version Mai 2024
              </span>
            </div>
          </template>
        </Card>

        <div class="mb-8 flex justify-center">
          <Paginator
            :rows="1"
            :totalRecords="totalPages"
            @page="onPageChange"
            :currentPageReportTemplate="'Page {currentPage} / {totalPages}'"
            showCurrentPageReport
            class="w-full"
          />
        </div>

        <div class="mb-4 flex justify-start">
          <Button
            label="Voir le PDF officiel"
            icon="pi pi-file-pdf"
            variant="text"
            severity="danger"
            class="text-red-500"
            @click="showPdfModal = true"
          />
        </div>

        <!-- PDF Modal Dialog -->
        <Dialog
          v-model:visible="showPdfModal"
          modal
          :style="{ width: '90%' }"
          :closable="true"
          header="Manuel Officiel FFESSM - Niveau 1 (PDF)"
          blockScroll
        >
          <div class="w-full">
            <iframe
              src="/data/manuel.pdf"
              class="h-[75vh] w-full border"
              frameborder="0"
            ></iframe>
          </div>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useManuelPages } from '~/composables/useManuelPages'

const {
  currentPage,
  totalPages,
  loading,
  error,
  getCurrentPageData,
  goToPage,
} = useManuelPages()

const currentPageData = computed(() => getCurrentPageData())

const showPdfModal = ref(false)

const onPageChange = (event: any) => {
  goToPage(event.page + 1)
}
</script>

<style scoped></style>
