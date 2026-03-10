import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./app/**/*.{vue,ts}", "./content/**/*.{md,json}", "./nuxt.config.ts"],
  theme: {
    extend: {
      maxWidth: {
        content: "76rem"
      }
    }
  },
  plugins: []
} satisfies Config;

