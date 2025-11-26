<script lang="ts" setup>
const route = useRoute()
</script>

<template>
  <div class="relative">
    <!-- Global background -->
    <img
      src="/img/bg3.webp"
      class="fixed inset-0 h-full w-full object-cover object-center"
      alt="underwater background"
    />
    <div
      class="fixed inset-0 bg-gradient-to-b from-[#001a23]/60 to-[#001a23]/90"
    ></div>

    <!-- Page content -->
    <LayoutHeader />
    <div class="relative z-10" :class="route.path !== '/' ? 'pt-[100px]' : ''">
      <CommonBreadcrumb v-if="route.path !== '/'" />
      <NuxtPage />
    </div>
    <LayoutFooter />
  </div>
</template>
