<template>
  <Dialog
    v-model:visible="visible"
    modal
    blockScroll
    class="mobile-full-dialog"
    content-class="mobile-full-dialog__content"
    :closable="true"
  >
    <div class="aspect-video h-full w-full bg-black">
      <iframe
        v-if="urlVideo"
        :src="urlVideo"
        class="h-full w-full"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
const visible = ref(false)
const urlVideo = ref('')

const open = async (url: string, startTime?: number) => {
  let finalUrl = url

  // Ajouter autoplay
  finalUrl = finalUrl.includes('?')
    ? `${finalUrl}&autoplay=1`
    : `${finalUrl}?autoplay=1`

  // Ajouter timestamp si fourni (en secondes)
  if (startTime !== undefined && startTime > 0) {
    finalUrl += `&start=${startTime}`
  }

  urlVideo.value = finalUrl
  visible.value = true
}

watch(visible, (newValue) => {
  if (!newValue) {
    setTimeout(() => {
      urlVideo.value = ''
    }, 300)
  }
})

defineExpose({
  visible,
  open,
})
</script>

<style lang="scss">
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
    padding: 0.5rem !important; /* adjust if you want spacing */
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
