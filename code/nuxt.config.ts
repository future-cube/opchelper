export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/content", "@nuxtjs/i18n"],

  css: ["~/assets/css/tailwind.css"],

  app: {
    head: {
      title: "OPC Helper",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "OPC Helper: learn and run a one-person company. Guides, directories, tools, and playbooks for solo operators."
        }
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
    }
  },

  i18n: {
    strategy: "prefix",
    defaultLocale: "zh",
    locales: [
      { code: "zh", name: "中文" },
      { code: "en", name: "English" }
    ],
    vueI18n: "./i18n/messages.ts"
  },

  content: {
    experimental: {
      search: false
    }
  }
});
