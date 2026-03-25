export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/content", "@nuxtjs/i18n"],

  css: ["~/assets/css/tailwind.css"],

  runtimeConfig: {
    public: {
      buildSha:
        process.env.CF_PAGES_COMMIT_SHA ||
        process.env.GITHUB_SHA ||
        process.env.NUXT_PUBLIC_BUILD_SHA ||
        "",
      buildStamp:
        process.env.CF_PAGES_DEPLOYMENT_ID ||
        process.env.NUXT_PUBLIC_BUILD_TIME ||
        "",
      buildSource: process.env.CF_PAGES_COMMIT_SHA
        ? "cloudflare-pages"
        : process.env.GITHUB_SHA
          ? "github-actions"
          : "local"
    }
  },

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
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      script: [
        {
          // Prevent theme flash before hydration.
          // eslint-disable-next-line no-multi-str
          children:
            "(function(){try{var k='opc_theme';var t=localStorage.getItem(k);if(t!=='light'&&t!=='dark'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.classList.toggle('dark',t==='dark');}catch(e){}})();"
        }
      ]
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
  routeRules: {
    "/kx": { redirect: "https://www.claw123.com/kx", statusCode: 302 },
    "/zh/kx": { redirect: "https://www.claw123.com/kx", statusCode: 302 },
    "/en/kx": { redirect: "https://www.claw123.com/kx", statusCode: 302 }
  },

  content: {
    experimental: {
      search: false
    }
  }
});
