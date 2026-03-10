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
        ctaDir: "资源导航（Directory）"
      }
    : {
        badge: "Learning hub · Directories · Tools",
        title: "Run a company — as a solo operator",
        subtitle:
          "OPC Helper helps solo operators learn essential skills with practical guides, curated directories, and lightweight tools.",
        ctaLearn: "Start learning",
        ctaDir: "Explore directory"
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
          <div class="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <dt class="text-slate-300/70">Skill</dt>
            <dd class="mt-1 font-semibold text-white">Learn</dd>
          </div>
          <div class="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <dt class="text-slate-300/70">Resource</dt>
            <dd class="mt-1 font-semibold text-white">Curate</dd>
          </div>
          <div class="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <dt class="text-slate-300/70">System</dt>
            <dd class="mt-1 font-semibold text-white">Execute</dd>
          </div>
        </dl>
      </div>

      <div class="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
        <h2 class="text-lg font-semibold text-white">What’s inside (v1)</h2>
        <ul class="mt-4 space-y-3 text-sm text-slate-200/80">
          <li class="flex gap-3">
            <span class="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/20">✓</span>
            Guides: skills & workflows for solo operators
          </li>
          <li class="flex gap-3">
            <span class="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/20">✓</span>
            Directory: LLM providers, gateways, and practical tools
          </li>
          <li class="flex gap-3">
            <span class="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/20">✓</span>
            Tools: copy-pastable templates for briefs, pricing, change requests, payment reminders
          </li>
        </ul>
        <div class="mt-6 rounded-2xl bg-slate-950/60 p-4 ring-1 ring-white/10">
          <p class="text-xs text-slate-300/70">Future-ready</p>
          <p class="mt-1 text-sm text-slate-200/80">
            v1 is static-first. Later we can add accounts (bookmarks, learning progress) with Cloudflare Pages Functions / Workers.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
