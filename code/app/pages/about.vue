<script setup lang="ts">
const { locale } = useI18n();

const copy = computed(() =>
  locale.value === "zh"
    ? {
        title: "关于",
        p1:
          "OPC Helper 是“一人公司能力学校 + 资源导航 + 模板下载”。我们关注的是：如何获客、如何交付、如何回款、如何复盘、如何增长——把经营变成可复制的系统。",
        p2:
          "v1 采用静态优先（Cloudflare Pages + Nuxt SSG），内容用 Markdown/JSON 存在仓库里，方便 SEO 与快速迭代。后续需要管理功能时，可逐步引入 Pages Functions / Workers（账号、收藏、学习进度、下载权限等）。"
      }
    : {
        title: "About",
        p1:
          "OPC Helper is a learning hub + directory + downloads for one-person companies: acquire customers, deliver reliably, get paid on time, and build sustainable growth loops.",
        p2:
          "v1 is static-first on Cloudflare Pages (Nuxt SSG). Later we can add management features like accounts, bookmarks, learning progress, and gated downloads via Pages Functions / Workers."
      }
);
</script>

<template>
  <section class="py-6 sm:py-10">
    <h1 class="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{{ copy.title }}</h1>
    <div class="mt-4 max-w-2xl space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-200/80 sm:text-base">
      <p>{{ copy.p1 }}</p>
      <p>{{ copy.p2 }}</p>
    </div>
  </section>
</template>
