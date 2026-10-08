<template>
  <!-- Fills its positioned parent: thumbnail + centred aqua play button -->
  <button
    type="button"
    class="group absolute inset-0 h-full w-full overflow-hidden bg-[#0e2737] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#7fe3d6]"
    :aria-label="label"
    @click="emit('play')"
  >
    <img
      :src="currentSrc"
      alt=""
      loading="lazy"
      class="absolute inset-0 h-full w-full object-cover"
      @error="onError"
    />
    <span
      class="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#7fe3d6] text-[#05111a] transition-transform group-hover:scale-105"
      :style="{ width: `${size}px`, height: `${size}px` }"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" class="ml-1 h-5 w-5" fill="currentColor">
        <path d="M7 4.5v15l13-7.5z" />
      </svg>
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    src: string
    label: string
    size?: number
  }>(),
  { size: 64 }
)

const emit = defineEmits<{ play: [] }>()

const currentSrc = ref(props.src)
watch(
  () => props.src,
  (src) => (currentSrc.value = src)
)

// YouTube has no maxresdefault for some videos: fall back to hqdefault
const onError = () => {
  if (currentSrc.value.includes('/maxresdefault.')) {
    currentSrc.value = currentSrc.value.replace(
      '/maxresdefault.',
      '/hqdefault.'
    )
  }
}
</script>
