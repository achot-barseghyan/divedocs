<template>
  <ConfirmDialog
    :pt="{
      root: {
        class:
          '!m-4 !w-[min(440px,calc(100vw-32px))] !rounded-[18px] !border !border-[rgba(232,241,244,0.1)] !bg-[#0b1d27] !text-[#e8f1f4] !shadow-[0_24px_64px_rgba(0,0,0,0.55)]',
      },
      mask: { class: '!bg-[#000c0f]/70 backdrop-blur-[3px]' },
    }"
  >
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="font-grotesk p-6 antialiased">
        <div class="flex items-start gap-4">
          <span
            class="grid h-11 w-11 shrink-0 place-items-center rounded-xl border"
            :class="
              isDanger(message)
                ? 'border-[rgba(255,143,128,0.35)] bg-[rgba(255,143,128,0.1)] text-[#ff8f80]'
                : 'border-[rgba(127,227,214,0.3)] bg-[rgba(127,227,214,0.1)] text-[#7fe3d6]'
            "
            aria-hidden="true"
          >
            <i :class="message.icon || 'pi pi-question-circle'"></i>
          </span>
          <div class="min-w-0 flex-1 pt-0.5">
            <h2
              class="m-0 text-lg font-semibold leading-snug tracking-[-0.01em] text-white"
            >
              {{ message.header }}
            </h2>
            <p class="m-0 mt-1.5 text-[15px] leading-relaxed text-[#b7c9d1]">
              {{ message.message }}
            </p>
          </div>
          <button
            type="button"
            class="-mr-2 -mt-2 grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[#7f97a2] transition-colors hover:bg-white/[0.06] hover:text-white"
            aria-label="Fermer"
            @click="rejectCallback"
          >
            <i class="pi pi-times text-xs" aria-hidden="true"></i>
          </button>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-2 sm:flex sm:justify-end">
          <button
            type="button"
            :class="[secondaryButton, 'h-11 px-5 text-sm']"
            @click="rejectCallback"
          >
            {{ message.rejectLabel || 'Annuler' }}
          </button>
          <button
            type="button"
            :class="[
              isDanger(message)
                ? `${primaryButton} !bg-[#ff8f80] hover:!bg-[#ffaa9e]`
                : primaryButton,
              'h-11 px-5 text-sm',
            ]"
            @click="acceptCallback"
          >
            {{ message.acceptLabel || 'Confirmer' }}
          </button>
        </div>
      </div>
    </template>
  </ConfirmDialog>
</template>

<script lang="ts" setup>
// Les confirmations « destructives » sont signalées via acceptClass: 'p-button-danger'
const isDanger = (message: { acceptClass?: string }) =>
  !!message.acceptClass?.includes('danger')
</script>
