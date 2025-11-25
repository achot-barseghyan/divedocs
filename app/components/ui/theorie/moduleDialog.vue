<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Edit Profile"
    class="w-full bg-darkblue-800 md:w-[70%]"
  >
    <template #header>
      <div class="flex flex-col gap-6">
        <h1 class="text-2xl font-extrabold text-yellow-500">
          {{ moduleData?.title }}
        </h1>
        <span class="block text-white/90">
          {{ moduleData?.description }}
        </span>
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
      <p>{{ value.content }}</p>

      <ul v-if="value.list" class="mt-2 list-inside list-disc">
        <li v-for="item in value.list" :key="item" class="mb-4">{{ item }}</li>
      </ul>

      <div
        class="mt-8"
        v-for="(item, imageIndex) in value.images"
        :key="item.id"
      >
        <img
          :src="item.src"
          :alt="item.alt"
          class="mt-4 max-h-[60vh] rounded-lg border-2 border-teal-400"
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
      v-if="moduleData.keyPoints?.length > 0"
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

    <template #footer>
      <Button
        label="Fermer"
        text
        severity="success"
        @click="visible = false"
        autofocus
      />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useTheorieCourses } from '~/composables/useTheorieCourses'

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
</script>

<style></style>
