import { Dive } from './app/theme/preset'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['primeicons/primeicons.css', '~/assets/css/main.scss'],

  components: [
    {
      path: '~/components',
      pathPrefix: true,
    },
  ],

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@primevue/nuxt-module',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-easy-lightbox',
  ],
  primevue: {
    options: {
      theme: {
        preset: Dive,
        options: {
          cssLayer: false,
        },
      },
    },
  },
})