<template>
  <img
    v-if="src && !failed"
    ref="imgRef"
    :src="src"
    :alt="alt || placeholder"
    class="h-full w-full"
    :class="contain ? 'object-contain p-3' : 'object-cover'"
    @error="failed = true"
  />
  <div
    v-else
    class="grid h-full min-h-full w-full place-items-center bg-[repeating-linear-gradient(135deg,rgba(232,241,244,0.03)_0_12px,transparent_12px_24px)] p-4 text-center font-mono text-xs text-[#7f97a2]"
  >
    {{ placeholder }}
  </div>
</template>

<script setup lang="ts">
// Image with a labelled placeholder until the file exists in /public
const props = defineProps<{
  src?: string
  alt?: string
  placeholder: string
  // Show the whole image (product cut-outs) instead of cropping
  contain?: boolean
}>()

const failed = ref(false)
const imgRef = ref<HTMLImageElement | null>(null)

// A server-rendered <img> can fail before hydration attaches @error
onMounted(() => {
  const img = imgRef.value
  if (img?.complete && img.naturalWidth === 0) failed.value = true
})

watch(
  () => props.src,
  () => (failed.value = false)
)
</script>
