<script setup lang="ts">
type DirectoryCategory = "provider" | "gateway" | "tool" | "site";

type DirectoryEntry = {
  category: DirectoryCategory;
  name: { zh: string; en: string };
  description: { zh: string; en: string };
  website: string;
  docs?: string;
  tags?: string[];
};

const { locale } = useI18n();
const lang = computed(() => (locale.value === "zh" ? "zh" : "en") as "zh" | "en");

const { data: entries } = await useAsyncData("directoryEntries", () =>
  queryCollection("directory").all() as Promise<DirectoryEntry[]>
);

const byCategory = computed(() => {
  const groups: Record<DirectoryCategory, DirectoryEntry[]> = {
    provider: [],
    gateway: [],
    tool: [],
    site: []
  };
  for (const e of entries.value ?? []) groups[e.category]?.push(e);
  return groups;
});

const titleFor = (cat: DirectoryCategory): string => {
  const zh: Record<DirectoryCategory, string> = {
    provider: "大模型服务提供商",
    gateway: "聚合/中转平台",
    tool: "一人公司常用工具",
    site: "相关网站"
  };
  const en: Record<DirectoryCategory, string> = {
    provider: "LLM Providers",
    gateway: "Gateways / Aggregators",
    tool: "Tools for Solo Operators",
    site: "Related Sites"
  };
  return lang.value === "zh" ? zh[cat] : en[cat];
};
</script>

<template>
  <section class="py-6 sm:py-10">
    <h1 class="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
      {{ lang === 'zh' ? '导航（Directory）' : 'Directory' }}
    </h1>
    <p class="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-200/80 sm:text-base">
      {{
        lang === 'zh'
          ? '为一人公司精选的资源导航：大模型供应商、聚合/中转平台、常用工具与相关网站。建议先选“主力供应商 + 备份网关”，再补齐工具栈。'
          : 'Curated navigation for solo operators: model providers, gateways/aggregators, and practical tools.'
      }}
    </p>

    <div class="mt-8 space-y-10">
      <section v-for="cat in (['provider', 'gateway', 'tool', 'site'] as const)" :key="cat">
        <h2 class="text-xl font-semibold text-slate-900 dark:text-white">{{ titleFor(cat) }}</h2>
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div v-for="entry in byCategory[cat]" :key="entry.website" class="opc-card">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-base font-semibold text-slate-900 dark:text-white">
                  {{ entry.name[lang] }}
                </h3>
                <p class="mt-2 text-sm text-slate-600 dark:text-slate-200/75">
                  {{ entry.description[lang] }}
                </p>
              </div>
              <a
                class="opc-btn-ghost shrink-0"
                :href="entry.website"
                target="_blank"
                rel="noreferrer"
              >
                {{ lang === 'zh' ? '官网' : 'Website' }}
              </a>
            </div>
            <p v-if="entry.docs" class="mt-3 break-words text-sm text-slate-600/90 dark:text-slate-200/70">
              {{ lang === 'zh' ? '文档' : 'Docs' }}:
              <a class="text-indigo-600 hover:text-indigo-500 dark:text-indigo-200/90 dark:hover:text-indigo-100" :href="entry.docs" target="_blank" rel="noreferrer">
                {{ entry.docs }}
              </a>
            </p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="tag in (entry.tags || []).slice(0, 8)"
                :key="tag"
                class="opc-chip"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
