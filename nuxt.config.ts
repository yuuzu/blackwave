// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/image',
  ],
  fonts: {
    google: {
      families: {
        Montserrat: [400, 600, 700, 900], // os pesos que você quer
        Satoshi: [400, 500, 600, 700], // os pesos que você quer
      }
    }
  }
})