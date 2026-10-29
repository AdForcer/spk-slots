export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  ssr: false,
  devServer: {
    host: "127.0.0.1",
    port: 3000
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  
  // Add this block to disable the deprecated nesting injection
  tailwindcss: {
    nesting: false
  } as any,

  runtimeConfig: {
    public: {
      // NUXT_PUBLIC_API_BASE=http://IP_БЭКЕНДА:8000/api
      apiBase: '/api'
    }
  }
})
