<template>
  <div
    data-reveal
    class="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-center gap-7 rounded-[22px] border border-[rgba(232,241,244,0.1)] bg-white/[0.03] p-7"
  >
    <div class="flex flex-col gap-3.5">
      <span
        class="font-mono text-[13px] uppercase tracking-[0.12em] text-[#f5d547]"
      >
        Essaie toi-même
      </span>
      <h4
        class="m-0 text-[26px] font-bold tracking-[-0.02em] text-white"
      >
        {{ title }}
      </h4>
      <slot />
    </div>
    <slot name="visual" />
  </div>
</template>

<script setup lang="ts">
// Shared frame for the interactive "Essaie toi-même" blocks
defineProps<{ title: string }>()
</script>
