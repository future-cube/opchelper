<script setup lang="ts">
const { locale } = useI18n();

const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const labels = computed(() =>
  locale.value === "zh"
    ? {
        home: "首页",
        guides: "学习",
        playbook: "手册",
        directory: "导航",
        tools: "工具",
        downloads: "下载",
        about: "关于",
        start: "开始使用"
      }
    : {
        home: "Home",
        guides: "Learn",
        playbook: "Playbooks",
        directory: "Directory",
        tools: "Tools",
        downloads: "Downloads",
        about: "About",
        start: "Get Started"
      }
);

const navItems = computed(() => [
  { to: localePath("/"), label: labels.value.home },
  { to: localePath("/guides"), label: labels.value.guides },
  { to: localePath("/playbook"), label: labels.value.playbook },
  { to: localePath("/directory"), label: labels.value.directory },
  { to: localePath("/tools"), label: labels.value.tools },
  { to: localePath("/downloads"), label: labels.value.downloads },
  { to: localePath("/about"), label: labels.value.about }
]);
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur">
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2">
        <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
          <span class="text-sm font-semibold tracking-tight">OPC</span>
        </span>
        <span class="text-sm font-semibold tracking-tight text-slate-100">OPC Helper</span>
      </NuxtLink>

      <nav class="hidden items-center gap-5 sm:flex" aria-label="Primary">
        <NuxtLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          class="text-sm text-slate-200/80 transition hover:text-slate-100"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <NuxtLink
          :to="switchLocalePath(locale === 'zh' ? 'en' : 'zh')"
          class="hidden rounded-xl bg-white/5 px-3 py-2 text-sm font-medium text-slate-100 ring-1 ring-white/10 transition hover:bg-white/10 sm:inline-flex"
        >
          {{ locale === "zh" ? "English" : "中文" }}
        </NuxtLink>

        <NuxtLink
          :to="localePath('/tools/templates')"
          class="rounded-xl bg-indigo-500 px-3 py-2 text-sm font-medium text-white shadow-sm shadow-indigo-500/20 transition hover:bg-indigo-400"
        >
          {{ labels.start }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
