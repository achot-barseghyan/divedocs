<template>
  <div
    class="card relative z-50 my-2 max-w-[250px] bg-gradient-to-b from-transparent backdrop-blur-sm md:ml-[5rem]"
  >
    <Breadcrumb
      :home="home"
      :model="breadcrumbs"
      class="bg-transparent text-white"
    >
      <template #item="{ item }">
        <NuxtLink :to="item.url" class="flex items-center gap-2">
          <span v-if="item.icon" :class="item.icon" class="text-white"></span>
          <span class="font-semibold text-white">{{ item.label }}</span>
        </NuxtLink>
      </template>
    </Breadcrumb>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'

const { breadcrumbs } = useBreadcrumb()

const home = ref<MenuItem>({
  icon: 'pi pi-home',
  url: '/',
})
</script>
