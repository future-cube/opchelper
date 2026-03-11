<script setup lang="ts">
type GuideDoc = { path: string; title?: string; description?: string; tags?: string[]; updatedAt?: string };
type PlaybookDoc = { path: string; title?: string; description?: string; tags?: string[]; updatedAt?: string };
type DownloadDoc = { path: string; title?: string; description?: string; tags?: string[]; updatedAt?: string; downloadUrl?: string };
type DirectoryEntry = {
  category: "provider" | "gateway" | "tool" | "site";
  name: { zh: string; en: string };
  description: { zh: string; en: string };
  website: string;
  docs?: string;
  tags?: string[];
};

const { locale } = useI18n();
const localePath = useLocalePath();

const labels = computed(() =>
  locale.value === "zh"
    ? {
        title: "内容地图",
        intro:
          "这是站点内容的“总索引”：方便你和 AI 快速知道我们现在有哪些内容、缺哪些内容。后续可以加搜索/筛选。",
        guides: "学习（Guides）",
        playbooks: "手册（Playbooks）",
        downloads: "下载（Downloads）",
        directory: "导航（Directory）",
        empty: "当前语言暂无内容。",
        updated: "更新时间"
      }
    : {
        title: "Content Map",
        intro:
          "A global index of current content. Useful for both humans and AI agents to understand what exists and what’s missing.",
        guides: "Guides",
        playbooks: "Playbooks",
        downloads: "Downloads",
        directory: "Directory",
        empty: "No content in this language yet.",
        updated: "Updated"
      }
);

const guidesCollection = computed(() => (locale.value === "zh" ? "guidesZh" : "guidesEn"));
const playbooksCollection = computed(() => (locale.value === "zh" ? "playbooksZh" : "playbooksEn"));
const downloadsCollection = computed(() => (locale.value === "zh" ? "downloadsZh" : "downloadsEn"));

const { data: guides } = await useAsyncData(
  () => `content-map-guides-${locale.value}`,
  async () =>
    (await queryCollection(guidesCollection.value as "guidesZh" | "guidesEn")
      .select("path", "title", "description", "tags", "updatedAt")
      .order("updatedAt", "DESC")
      .all()) as GuideDoc[],
  { watch: [guidesCollection] }
);

const { data: playbooks } = await useAsyncData(
  () => `content-map-playbooks-${locale.value}`,
  async () =>
    (await queryCollection(playbooksCollection.value as "playbooksZh" | "playbooksEn")
      .select("path", "title", "description", "tags", "updatedAt")
      .order("updatedAt", "DESC")
      .all()) as PlaybookDoc[],
  { watch: [playbooksCollection] }
);

const { data: downloads } = await useAsyncData(
  () => `content-map-downloads-${locale.value}`,
  async () =>
    (await queryCollection(downloadsCollection.value as "downloadsZh" | "downloadsEn")
      .select("path", "title", "description", "tags", "updatedAt", "downloadUrl")
      .order("updatedAt", "DESC")
      .all()) as DownloadDoc[],
  { watch: [downloadsCollection] }
);

const { data: directory } = await useAsyncData("content-map-directory", async () => {
  const items = (await queryCollection("directory").all()) as DirectoryEntry[];
  return items;
});

const directoryCounts = computed(() => {
  const counts: Record<DirectoryEntry["category"], number> = { provider: 0, gateway: 0, tool: 0, site: 0 };
  for (const item of directory.value ?? []) counts[item.category] += 1;
  return counts;
});

useHead(() => ({
  title: locale.value === "zh" ? "内容地图 · OPC Helper" : "Content Map · OPC Helper",
  meta: [
    {
      name: "description",
      content:
        locale.value === "zh"
          ? "OPC Helper 内容地图：当前 Guides/Playbooks/Downloads/Directory 的总索引。"
          : "OPC Helper content map: a global index of Guides/Playbooks/Downloads/Directory."
    }
  ]
}));
</script>

<template>
  <section class="py-6 sm:py-10">
    <h1 class="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{{ labels.title }}</h1>
    <p class="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-200/80 sm:text-base">
      {{ labels.intro }}
    </p>

    <div class="mt-8 grid gap-6 lg:grid-cols-3">
      <section class="opc-card lg:col-span-2">
        <h2 class="text-base font-semibold text-slate-900 dark:text-white">{{ labels.guides }}</h2>
        <div v-if="(guides || []).length" class="mt-4 grid gap-3 sm:grid-cols-2">
          <NuxtLink
            v-for="doc in (guides || [])"
            :key="doc.path"
            :to="localePath(doc.path.replace(`/${locale}/`, '/'))"
            class="rounded-2xl px-3 py-2 hover:bg-slate-50 dark:hover:bg-white/10"
          >
            <p class="text-sm font-medium text-slate-900 dark:text-slate-100">{{ doc.title }}</p>
            <p v-if="doc.description" class="mt-1 text-xs text-slate-600 dark:text-slate-200/70">{{ doc.description }}</p>
          </NuxtLink>
        </div>
        <p v-else class="mt-3 text-sm text-slate-600 dark:text-slate-200/70">{{ labels.empty }}</p>
      </section>

      <section class="opc-card">
        <h2 class="text-base font-semibold text-slate-900 dark:text-white">{{ labels.directory }}</h2>
        <p class="mt-3 text-sm text-slate-600 dark:text-slate-200/75">
          Providers: {{ directoryCounts.provider }} · Gateways: {{ directoryCounts.gateway }} · Tools: {{ directoryCounts.tool }} · Sites: {{ directoryCounts.site }}
        </p>
        <div class="mt-4 flex flex-wrap gap-2">
          <NuxtLink :to="localePath('/directory')" class="opc-btn-primary">{{ locale === 'zh' ? '打开导航' : 'Open directory' }}</NuxtLink>
        </div>
      </section>

      <section class="opc-card">
        <h2 class="text-base font-semibold text-slate-900 dark:text-white">{{ labels.playbooks }}</h2>
        <div v-if="(playbooks || []).length" class="mt-4 space-y-2">
          <NuxtLink
            v-for="doc in (playbooks || [])"
            :key="doc.path"
            :to="localePath(doc.path.replace(`/${locale}/`, '/').replace('/playbooks/', '/playbook/'))"
            class="block rounded-2xl px-3 py-2 hover:bg-slate-50 dark:hover:bg-white/10"
          >
            <p class="text-sm font-medium text-slate-900 dark:text-slate-100">{{ doc.title }}</p>
            <p v-if="doc.description" class="mt-1 text-xs text-slate-600 dark:text-slate-200/70">{{ doc.description }}</p>
          </NuxtLink>
        </div>
        <p v-else class="mt-3 text-sm text-slate-600 dark:text-slate-200/70">{{ labels.empty }}</p>
      </section>

      <section class="opc-card lg:col-span-2">
        <h2 class="text-base font-semibold text-slate-900 dark:text-white">{{ labels.downloads }}</h2>
        <div v-if="(downloads || []).length" class="mt-4 grid gap-3 sm:grid-cols-2">
          <NuxtLink
            v-for="doc in (downloads || [])"
            :key="doc.path"
            :to="localePath(doc.path.replace(`/${locale}/`, '/'))"
            class="rounded-2xl px-3 py-2 hover:bg-slate-50 dark:hover:bg-white/10"
          >
            <p class="text-sm font-medium text-slate-900 dark:text-slate-100">{{ doc.title }}</p>
            <p v-if="doc.description" class="mt-1 text-xs text-slate-600 dark:text-slate-200/70">{{ doc.description }}</p>
            <p v-if="doc.downloadUrl" class="mt-2 text-xs text-indigo-600 dark:text-indigo-200/80">{{ doc.downloadUrl }}</p>
          </NuxtLink>
        </div>
        <p v-else class="mt-3 text-sm text-slate-600 dark:text-slate-200/70">{{ labels.empty }}</p>
      </section>
    </div>
  </section>
</template>

