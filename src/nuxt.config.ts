// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: Boolean(process.env.SSR),

  compatibilityDate: "2024-04-03",

  runtimeConfig: {
    public: {
      VERSION: process.env.VERSION,
    },
  },

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

  hooks: {
    "tailwindcss:loadConfig"() {
      const fs = require("fs");

      const resFilePath = "dynamic-classes.txt";
      const colorsFilePath = "colors.txt";

      const prefixes = [
        "bg",
        "ring",
        "text",
        "caret",
        "after:bg-",
        "before:bg-",
      ];
      const staticClasses =
        "rounded-xs rounded-sm rounded-md rounded-base rounded-lg rounded-xl rounded-2xl rounded-3xl rounded-full rounded-none text-xs text-sm text-md text-base text-lg text-xl text-2xl text-3xl";

      let content = "";

      try {
        const data = fs.readFileSync(colorsFilePath, "utf8");

        const colorsArray: string[] = data
          .split("\n")
          .map((line: string) => line.trim())
          .filter((line: string) => line.length > 0);

        content += staticClasses;

        prefixes.forEach((p) => {
          colorsArray.forEach((c) => {
            content += `${p}-${c} `;
          });
          content += "\n";
        });
      } catch (err) {
        console.error("Error reading the file:", err);
      }

      try {
        fs.writeFileSync(resFilePath, content);
        console.log(
          "The dynamic-classes.txt file has been written successfully."
        );
      } catch (err) {
        console.error("Error writing to file:", err);
      }
    },
  },
});
