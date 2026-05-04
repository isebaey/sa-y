// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/icon',
    '@vite-pwa/nuxt',
  ],

  dir: {
    app: '.',
  },

  app: {
    head: {
      htmlAttrs: {
        dir: 'rtl',
        lang: 'ar',
        class: 'dark',
      },
      title: 'سَعْي — Sa\'y',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1, user-scalable=no' },
        { name: 'description', content: 'سَعْي — نظام حياتك الذكي لإدارة العادات والأهداف' },
        { name: 'theme-color', content: '#09090b' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/icon-512.png' },
        { rel: 'apple-touch-icon', href: '/icon-512.png' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  tailwindcss: {
    configPath: 'tailwind.config.ts',
  },

  googleFonts: {
    families: {
      Tajawal: [300, 400, 500, 700],
      Inter: [300, 400, 500, 600, 700],
    },
    display: 'swap',
    preload: true,
  },

  pinia: {
    storesDirs: ['features/habits/stores', 'features/shared/stores'],
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'سَعْي — Sa\'y',
      short_name: 'سَعْي',
      description: 'نظام حياتك الذكي لإدارة العادات والأهداف',
      theme_color: '#09090b',
      background_color: '#09090b',
      display: 'standalone',
      orientation: 'portrait',
      lang: 'ar',
      dir: 'rtl',
      icons: [
        {
          src: '/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: '/icon.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'any',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: false,
    },
  },

  vite: {
    optimizeDeps: {
      include: ['chart.js', 'vue-chartjs'],
    },
  },
})
