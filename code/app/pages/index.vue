<script setup lang="ts">
const { locale } = useI18n();
const localePath = useLocalePath();

const copy = computed(() =>
  locale.value === "zh"
    ? {
        badge: "学习中心 · 资源导航 · 工具与模板",
        title: "一个人，也能运营一家公司",
        subtitle: "OPC Helper 是“一人公司能力学校”：用可执行的教程、路线图和资源导航，帮你把经营变成可复制的系统。",
        ctaLearn: "开始学习（Guides）",
        ctaDir: "资源导航（Directory）",
        stats: [
          { k: "能力", v: "学习" },
          { k: "资源", v: "导航" },
          { k: "系统", v: "执行" }
        ],
        insideTitle: "站点包含什么（v1）",
        insideItems: [
          "学习（Guides）：一人公司的能力与工作流教程",
          "手册（Playbooks）：按行业/业务类型的可复制 SOP",
          "导航（Directory）：大模型供应商、中转平台与常用工具"
        ],
        futureTitle: "可演进",
        futureText: "v1 静态优先。后续可逐步加入账号（收藏、学习进度）与下载权限，基于 Cloudflare Pages Functions / Workers。"
      }
    : {
        badge: "Learning hub · Directories · Tools",
        title: "Run a company — as a solo operator",
        subtitle:
          "OPC Helper helps solo operators learn essential skills with practical guides, curated directories, and lightweight tools.",
        ctaLearn: "Start learning",
        ctaDir: "Explore directory",
        stats: [
          { k: "Skill", v: "Learn" },
          { k: "Resource", v: "Curate" },
          { k: "System", v: "Execute" }
        ],
        insideTitle: "What’s inside (v1)",
        insideItems: [
          "Guides: skills & workflows for solo operators",
          "Playbooks: SOPs per business type",
          "Directory: providers, gateways, and practical tools"
        ],
        futureTitle: "Future-ready",
        futureText: "v1 is static-first. Later we can add accounts (bookmarks, learning progress) with Cloudflare Pages Functions / Workers."
      }
);
</script>

<template>
  <section class="py-10 sm:py-16">
    <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div>
        <p class="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200/80 ring-1 ring-white/10">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {{ copy.badge }}
        </p>
        <h1 class="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {{ copy.title }}
        </h1>
        <p class="mt-4 text-base leading-relaxed text-slate-200/80 sm:text-lg">
          {{ copy.subtitle }}
        </p>

        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <NuxtLink
            :to="localePath('/guides')"
            class="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-4 py-3 text-sm font-medium text-white shadow-sm shadow-indigo-500/25 transition hover:bg-indigo-400"
          >
            {{ copy.ctaLearn }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/directory')"
            class="inline-flex items-center justify-center rounded-xl bg-white/5 px-4 py-3 text-sm font-medium text-slate-100 ring-1 ring-white/10 transition hover:bg-white/10"
          >
            {{ copy.ctaDir }}
          </NuxtLink>
        </div>

        <dl class="mt-8 grid grid-cols-3 gap-4 text-sm">
          <div v-for="s in copy.stats" :key="s.k" class="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <dt class="text-slate-300/70">{{ s.k }}</dt>
            <dd class="mt-1 font-semibold text-white">{{ s.v }}</dd>
          </div>
        </dl>
      </div>

      <div class="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
        <h2 class="text-lg font-semibold text-white">{{ copy.insideTitle }}</h2>
        <ul class="mt-4 space-y-3 text-sm text-slate-200/80">
          <li v-for="item in copy.insideItems" :key="item" class="flex gap-3">
            <span class="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/20">✓</span>
            {{ item }}
          </li>
        </ul>
        <div class="mt-6 rounded-2xl bg-slate-950/60 p-4 ring-1 ring-white/10">
          <p class="text-xs text-slate-300/70">{{ copy.futureTitle }}</p>
          <p class="mt-1 text-sm text-slate-200/80">
            {{ copy.futureText }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
