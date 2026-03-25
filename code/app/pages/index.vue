<script setup lang="ts">
type PageDoc = {
  path: string;
  title?: string;
  description?: string;
  tags?: string[];
  updatedAt?: string;
};

type DownloadDoc = PageDoc & {
  downloadUrl?: string;
};

type DirectoryEntry = {
  category: "provider" | "gateway" | "tool" | "site";
};

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
        quickTitle: "快速开始（建议路径）",
        quickSteps: [
          { t: "1）先学一条闭环", d: "获客 → 交付 → 回款 → 复盘。不要一开始就追求完美。", to: "/guides/opc-operating-system" },
          { t: "2）选工具栈", d: "主力供应商 + 备份网关 + 必要工具。先能稳定输出。", to: "/directory" },
          { t: "3）拿到第一笔收入", d: "从赞助/服务/数字产品里选一个模型跑通第一单。", to: "/guides/creator-monetization-map" }
        ],
        sectionsTitle: "一人公司",
        sections: [
          { k: "学习（Guides）", d: "能力与工作流教程（中文优先）。", to: "/guides" },
          { k: "手册（Playbooks）", d: "按业务类型的可复制 SOP。", to: "/playbook" },
          { k: "导航（Directory）", d: "大模型、网关与常用工具导航。", to: "/directory" },
          { k: "下载（Downloads）", d: "模板、清单、资料包（可公开分发）。", to: "/downloads" }
        ],
        latestGuides: "最新指南",
        latestPlaybooks: "精选手册",
        latestDownloads: "最新下载",
        dirTitle: "导航概览",
        dirHint: "建议先选“主力供应商 + 备份网关”，再补齐工具栈。",
        more: "查看更多 →"
      }
    : {
        badge: "Learning hub · Directories · Tools",
        title: "Run a company — as a solo operator",
        subtitle:
          "OPC Helper helps solo operators learn essential skills with practical guides, curated directories, and lightweight tools.",
        ctaLearn: "Start learning",
        ctaDir: "Explore directory",
        quickTitle: "Quick start path",
        quickSteps: [
          { t: "1) Learn one loop", d: "Acquire → deliver → get paid → review. Don’t chase perfection early.", to: "/guides/opc-operating-system" },
          { t: "2) Pick your stack", d: "Primary provider + backup gateway + essentials. Focus on stable output.", to: "/directory" },
          { t: "3) Get first revenue", d: "Pick one model (sponsor/services/digital) and get your first sale.", to: "/guides/creator-monetization-map" }
        ],
        sectionsTitle: "One-Person Company",
        sections: [
          { k: "Guides", d: "Skills & workflows (Chinese-first, English summaries).", to: "/guides" },
          { k: "Playbooks", d: "SOPs per business type.", to: "/playbook" },
          { k: "Directory", d: "Providers, gateways, and practical tools.", to: "/directory" },
          { k: "Downloads", d: "Templates, checklists, and packs.", to: "/downloads" }
        ],
        latestGuides: "Latest guides",
        latestPlaybooks: "Featured playbooks",
        latestDownloads: "Latest downloads",
        dirTitle: "Directory overview",
        dirHint: "Pick a primary provider + backup gateway first, then fill the toolchain.",
        more: "View more →"
      }
);

const guidesCollection = computed(() => (locale.value === "zh" ? "guidesZh" : "guidesEn"));
const playbooksCollection = computed(() => (locale.value === "zh" ? "playbooksZh" : "playbooksEn"));
const downloadsCollection = computed(() => (locale.value === "zh" ? "downloadsZh" : "downloadsEn"));

const toLocaleRoute = (docPath: string): string => localePath(docPath.replace(`/${locale.value}/`, "/"));

const { data: latestGuides } = await useAsyncData(
  () => `home-guides-${locale.value}`,
  async () => {
    const docs = (await queryCollection(guidesCollection.value as "guidesZh" | "guidesEn")
      .select("path", "title", "description", "tags", "updatedAt")
      .order("updatedAt", "DESC")
      .all()) as PageDoc[];
    return docs.slice(0, 6);
  },
  { watch: [guidesCollection] }
);

const { data: latestPlaybooks } = await useAsyncData(
  () => `home-playbooks-${locale.value}`,
  async () => {
    const docs = (await queryCollection(playbooksCollection.value as "playbooksZh" | "playbooksEn")
      .select("path", "title", "description", "tags", "updatedAt")
      .order("updatedAt", "DESC")
      .all()) as PageDoc[];
    return docs.slice(0, 3);
  },
  { watch: [playbooksCollection] }
);

const { data: latestDownloads } = await useAsyncData(
  () => `home-downloads-${locale.value}`,
  async () => {
    const docs = (await queryCollection(downloadsCollection.value as "downloadsZh" | "downloadsEn")
      .select("path", "title", "description", "tags", "updatedAt", "downloadUrl")
      .order("updatedAt", "DESC")
      .all()) as DownloadDoc[];
    return docs.slice(0, 4);
  },
  { watch: [downloadsCollection] }
);

const { data: directoryCounts } = await useAsyncData(
  () => "home-directory-counts",
  async () => {
    const entries = (await queryCollection("directory").all()) as DirectoryEntry[];
    const counts = { provider: 0, gateway: 0, tool: 0, site: 0 };
    for (const e of entries) counts[e.category] = (counts[e.category] ?? 0) + 1;
    return counts;
  }
);
</script>

<template>
  <section class="py-10 sm:py-14">
    <div class="grid gap-8 xl:grid-cols-2 xl:items-center">
      <div>
        <p class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 ring-1 ring-slate-200 dark:bg-white/5 dark:text-slate-200/80 dark:ring-white/10">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {{ copy.badge }}
        </p>
        <h1 class="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
          {{ copy.title }}
        </h1>
        <p class="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-200/80">
          {{ copy.subtitle }}
        </p>

        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <NuxtLink :to="localePath('/guides')" class="opc-btn-primary px-4 py-3">
            {{ copy.ctaLearn }}
          </NuxtLink>
          <NuxtLink :to="localePath('/directory')" class="opc-btn-ghost px-4 py-3">
            {{ copy.ctaDir }}
          </NuxtLink>
        </div>
      </div>

      <div class="opc-card">
        <h2 class="text-lg font-semibold text-slate-900 dark:text-white">{{ copy.quickTitle }}</h2>
        <ol class="mt-4 space-y-3 text-sm">
          <li v-for="s in copy.quickSteps" :key="s.t" class="flex gap-3">
            <span class="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600/10 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-600/20 dark:bg-indigo-400/15 dark:text-indigo-200 dark:ring-indigo-300/20">
              ✓
            </span>
            <div class="min-w-0">
              <p class="font-medium text-slate-900 dark:text-slate-100">{{ s.t }}</p>
              <p class="mt-1 text-slate-600 dark:text-slate-200/75">
                {{ s.d }}
              </p>
              <NuxtLink :to="localePath(s.to)" class="mt-2 inline-block text-indigo-600 hover:text-indigo-500 dark:text-indigo-200/90 dark:hover:text-indigo-100">
                {{ copy.more }}
              </NuxtLink>
            </div>
          </li>
        </ol>
      </div>
    </div>

    <div class="mt-10">
      <Claw123Mid />
    </div>

    <div class="mt-10">
      <h2 class="text-lg font-semibold text-slate-900 dark:text-white">{{ copy.sectionsTitle }}</h2>
      <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <NuxtLink
          v-for="s in copy.sections"
          :key="s.k"
          :to="localePath(s.to)"
          class="opc-card opc-card-hover"
        >
          <p class="text-base font-semibold text-slate-900 dark:text-white">{{ s.k }}</p>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-200/75">{{ s.d }}</p>
          <p class="mt-4 text-sm text-indigo-600 dark:text-indigo-200/80">{{ copy.more }}</p>
        </NuxtLink>
      </div>
    </div>

    <div class="mt-12 grid gap-6 lg:grid-cols-3">
      <div class="opc-card">
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-base font-semibold text-slate-900 dark:text-white">{{ copy.latestGuides }}</h2>
          <NuxtLink :to="localePath('/guides')" class="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-200/90 dark:hover:text-indigo-100">
            {{ copy.more }}
          </NuxtLink>
        </div>
        <ul class="mt-4 space-y-3">
          <li v-for="g in (latestGuides || [])" :key="g.path">
            <NuxtLink :to="toLocaleRoute(g.path)" class="block rounded-2xl px-3 py-2 hover:bg-slate-50 dark:hover:bg-white/10">
              <p class="text-sm font-medium text-slate-900 dark:text-slate-100">{{ g.title }}</p>
              <p v-if="g.description" class="mt-1 text-xs text-slate-600 dark:text-slate-200/70">
                {{ g.description }}
              </p>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="opc-card">
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-base font-semibold text-slate-900 dark:text-white">{{ copy.latestPlaybooks }}</h2>
          <NuxtLink :to="localePath('/playbook')" class="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-200/90 dark:hover:text-indigo-100">
            {{ copy.more }}
          </NuxtLink>
        </div>
        <ul class="mt-4 space-y-3">
          <li v-for="p in (latestPlaybooks || [])" :key="p.path">
            <NuxtLink :to="localePath(`/playbook/${p.path.split('/playbooks/')[1] || ''}`)" class="block rounded-2xl px-3 py-2 hover:bg-slate-50 dark:hover:bg-white/10">
              <p class="text-sm font-medium text-slate-900 dark:text-slate-100">{{ p.title }}</p>
              <p v-if="p.description" class="mt-1 text-xs text-slate-600 dark:text-slate-200/70">
                {{ p.description }}
              </p>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="opc-card">
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-base font-semibold text-slate-900 dark:text-white">{{ copy.latestDownloads }}</h2>
          <NuxtLink :to="localePath('/downloads')" class="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-200/90 dark:hover:text-indigo-100">
            {{ copy.more }}
          </NuxtLink>
        </div>
        <ul class="mt-4 space-y-3">
          <li v-for="d in (latestDownloads || [])" :key="d.path">
            <NuxtLink :to="toLocaleRoute(d.path)" class="block rounded-2xl px-3 py-2 hover:bg-slate-50 dark:hover:bg-white/10">
              <p class="text-sm font-medium text-slate-900 dark:text-slate-100">{{ d.title }}</p>
              <p v-if="d.description" class="mt-1 text-xs text-slate-600 dark:text-slate-200/70">
                {{ d.description }}
              </p>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-8 opc-card">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 class="text-base font-semibold text-slate-900 dark:text-white">{{ copy.dirTitle }}</h2>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-200/75">{{ copy.dirHint }}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span class="opc-chip">{{ locale === 'zh' ? '供应商' : 'Providers' }}: {{ directoryCounts?.provider ?? 0 }}</span>
            <span class="opc-chip">{{ locale === 'zh' ? '网关' : 'Gateways' }}: {{ directoryCounts?.gateway ?? 0 }}</span>
            <span class="opc-chip">{{ locale === 'zh' ? '工具' : 'Tools' }}: {{ directoryCounts?.tool ?? 0 }}</span>
            <span class="opc-chip">{{ locale === 'zh' ? '网站' : 'Sites' }}: {{ directoryCounts?.site ?? 0 }}</span>
          </div>
        </div>
        <div class="flex gap-2">
          <NuxtLink :to="localePath('/directory')" class="opc-btn-primary">
            {{ copy.ctaDir }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
