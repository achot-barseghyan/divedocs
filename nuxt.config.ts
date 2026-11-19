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
  // Password of the hidden page /admin/stats: set NUXT_STATS_PASSWORD
  runtimeConfig: {
    statsPassword: '',
  },

  // Anonymous usage stats (server/utils/stats.ts). The "fs" driver writes
  // JSON files to .data/stats: fine on a server with a persistent disk. On a
  // serverless host, switch to its storage (Vercel KV, Netlify Blobs,
  // Cloudflare KV...): https://nitro.build/guide/storage
  nitro: {
    storage: {
      stats: { driver: 'fs', base: './.data/stats' },
    },
  },

  routeRules: {
    '/admin/**': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
  },

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
