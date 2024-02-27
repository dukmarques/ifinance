// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
      httpOnly: true,
      secure: true,
    },
    storage: 'cookies',
  },
  ssr: true,
})
