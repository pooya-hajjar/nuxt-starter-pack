// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', "@nuxtjs/tailwindcss", "@nuxt/image"],
  image: {
    providers: {
      imgProvider: {
        name: "imageProvider",
        provider: "~/config/img/imgProvider.ts",
        options: {
          baseURL: "/image",
        },
      },
      svgProvider: {
        name: "svgProvider",
        provider: "~/config/img/imgProvider.ts",
        options: {
          baseURL: "/svg",
        },
      },
    },
  },

  
})