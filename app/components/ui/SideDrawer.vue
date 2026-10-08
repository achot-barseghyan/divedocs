<template>
  <Teleport to="body">
    <Transition name="drawer-fade">
      <div
        v-if="open"
        class="fixed inset-0 z-[1100] bg-[rgba(3,10,16,0.7)] backdrop-blur-[4px]"
        aria-hidden="true"
        @click="close"
      ></div>
    </Transition>

    <Transition name="drawer-slide">
      <aside
        v-if="open"
        ref="panel"
        role="dialog"
        aria-modal="true"
        :aria-label="label"
        class="fixed inset-y-0 right-0 z-[1101] w-full overflow-y-auto border-l border-[rgba(232,241,244,0.1)] bg-[#0a1c29] font-grotesk text-[#e8f1f4] antialiased"
        :style="{ maxWidth: `${width}px` }"
      >
        <!-- Sticky top bar -->
        <div
          class="sticky top-0 z-[2] flex flex-col gap-3.5 border-b border-[rgba(232,241,244,0.08)] bg-[rgba(10,28,41,0.92)] px-6 py-4 backdrop-blur-[8px] md:px-8"
        >
          <div class="flex items-center gap-3">
            <span class="flex-1 font-mono text-[13px] text-[#7fe3d6]">
              <slot name="eyebrow" />
            </span>
            <slot name="actions" />
            <button
              ref="closeButton"
              type="button"
              :class="[drawerButton, 'w-[38px] justify-center px-0']"
              aria-label="Fermer"
              @click="close"
            >
              ✕
            </button>
          </div>
          <slot name="bar" />
        </div>

        <div class="flex flex-col gap-3 px-6 pb-12 pt-10 md:px-8">
          <slot />
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    width?: number
    // Lets the parent keep Escape for a nested overlay (e.g. a lightbox)
    escapeEnabled?: boolean
  }>(),
  { width: 720, escapeEnabled: true }
)

const open = defineModel<boolean>('open', { default: false })

const panel = ref<HTMLElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)
const bodyLock = useScrollLock(import.meta.client ? document.body : null)

const close = () => {
  open.value = false
}

watch(open, async (isOpen) => {
  bodyLock.value = isOpen
  if (isOpen) {
    await nextTick()
    closeButton.value?.focus()
  }
})

useEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape' && open.value && props.escapeEnabled) close()
})

const scrollToTop = () => panel.value?.scrollTo({ top: 0 })

defineExpose({ scrollToTop })
</script>

<style scoped>
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 200ms ease;
}
.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 250ms ease;
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
}
</style>
