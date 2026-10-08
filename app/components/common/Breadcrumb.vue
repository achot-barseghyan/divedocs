<template>
  <nav
    aria-label="Fil d'Ariane"
    class="relative z-50 mx-auto max-w-[1280px] px-8 pt-10 font-mono text-[13px] text-[#7f97a2]"
  >
    <ol class="flex flex-wrap items-center gap-2.5">
      <li>
        <NuxtLink to="/" class="hover:text-[#f5d547]">Accueil</NuxtLink>
      </li>
      <template v-for="(item, i) in breadcrumbs" :key="item.url">
        <li aria-hidden="true">/</li>
        <li>
          <span
            v-if="i === breadcrumbs.length - 1"
            class="text-[#e8f1f4]"
            aria-current="page"
          >
            {{ item.label }}
          </span>
          <NuxtLink v-else :to="item.url" class="hover:text-[#f5d547]">
            {{ item.label }}
          </NuxtLink>
        </li>
      </template>
    </ol>
  </nav>
</template>

<script setup lang="ts">
const { breadcrumbs } = useBreadcrumb()
</script>
