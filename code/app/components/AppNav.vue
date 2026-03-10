<script setup lang="ts">
const { locale } = useI18n();

const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

type Theme = "light" | "dark";
const theme = useState<Theme>("opc_theme", () => "dark");
const toggleTheme = () => {
  theme.value = theme.value === "dark" ? "light" : "dark";
};

const mobileOpen = ref(false);
const closeMobile = () => {
  mobileOpen.value = false;
};

watch(
  () => locale.value,
  () => closeMobile()
);

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
  <header class="sticky top-0 z-40 border-b border-slate-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-slate-950/70">
    <div class="opc-container flex items-center justify-between py-3">
      <NuxtLink :to="localePath('/')" class="flex min-w-0 items-center gap-2" aria-label="OPC Helper Home" @click="closeMobile">
        <span
          class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white ring-1 ring-slate-900/10 dark:bg-white/10 dark:text-slate-100 dark:ring-white/15"
        >
          <span class="text-sm font-semibold tracking-tight">OPC</span>
        </span>
        <span class="truncate text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          <span class="hidden sm:inline">OPC Helper</span>
          <span class="sm:hidden">Helper</span>
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-5 md:flex" aria-label="Primary">
        <NuxtLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          class="text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-200/80 dark:hover:text-slate-100"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <button type="button" class="opc-btn-ghost hidden md:inline-flex" @click="toggleTheme">
          <span class="sr-only">Toggle theme</span>
          <svg v-if="theme === 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0-1.414-1.414M7.05 7.05 5.636 5.636M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
          </svg>
        </button>

        <NuxtLink :to="switchLocalePath(locale === 'zh' ? 'en' : 'zh')" class="opc-btn-ghost hidden md:inline-flex" @click="closeMobile">
          {{ locale === "zh" ? "EN" : "中" }}
        </NuxtLink>

        <NuxtLink :to="localePath('/tools/templates')" class="opc-btn-primary hidden sm:inline-flex" @click="closeMobile">
          {{ labels.start }}
        </NuxtLink>

        <button type="button" class="opc-btn-ghost md:hidden" @click="mobileOpen = true">
          <span class="sr-only">Open menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="mobileOpen" class="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
      <div class="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" @click="closeMobile" />
      <div class="absolute right-0 top-0 h-full w-[86%] max-w-sm overflow-y-auto bg-white p-4 shadow-xl shadow-slate-900/20 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-white/10">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">{{ locale === "zh" ? "菜单" : "Menu" }}</p>
          <button type="button" class="opc-btn-ghost" @click="closeMobile">
            <span class="sr-only">Close menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="mt-4 grid grid-cols-2 gap-2">
          <button type="button" class="opc-btn-ghost" @click="toggleTheme">
            {{ locale === "zh" ? (theme === 'dark' ? '切换到浅色' : '切换到深色') : (theme === 'dark' ? 'Light mode' : 'Dark mode') }}
          </button>
          <NuxtLink :to="switchLocalePath(locale === 'zh' ? 'en' : 'zh')" class="opc-btn-ghost text-center" @click="closeMobile">
            {{ locale === "zh" ? "English" : "中文" }}
          </NuxtLink>
        </div>

        <nav class="mt-5 space-y-1" aria-label="Mobile Primary">
          <NuxtLink
            v-for="item in navItems"
            :key="item.label"
            :to="item.to"
            class="block rounded-2xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200/80 dark:hover:bg-white/10"
            @click="closeMobile"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="mt-6">
          <NuxtLink :to="localePath('/tools/templates')" class="opc-btn-primary w-full" @click="closeMobile">
            {{ labels.start }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>
