// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  devtools: { enabled: true },

  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxtjs/i18n",
  ],

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

  i18n: {
    locales: [
      {
        code: "fa",
        language: "fa-IR",
      },
      {
        code: "en",
        language: "en-US",
      },
    ],
    defaultLocale: "fa",
    vueI18n: "./i18n.config.ts",
  },
});
