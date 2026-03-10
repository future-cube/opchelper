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
    <h1 class="text-3xl font-semibold tracking-tight text-white">Directory</h1>
    <p class="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200/80 sm:text-base">
      Curated navigation for solo operators: model providers, gateways, and practical tools.
    </p>

    <div class="mt-8 space-y-10">
      <section v-for="cat in (['provider', 'gateway', 'tool'] as const)" :key="cat">
        <h2 class="text-xl font-semibold text-white">{{ titleFor(cat) }}</h2>
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div v-for="entry in byCategory[cat]" :key="entry.website" class="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-base font-semibold text-white">
                  {{ entry.name[lang] }}
                </h3>
                <p class="mt-2 text-sm text-slate-200/75">
                  {{ entry.description[lang] }}
                </p>
              </div>
              <a
                class="shrink-0 rounded-xl bg-white/5 px-3 py-2 text-sm text-slate-100 ring-1 ring-white/10 transition hover:bg-white/10"
                :href="entry.website"
                target="_blank"
                rel="noreferrer"
              >
                {{ lang === 'zh' ? '官网' : 'Website' }}
              </a>
            </div>
            <p v-if="entry.docs" class="mt-3 text-sm text-slate-200/70">
              {{ lang === 'zh' ? '文档' : 'Docs' }}:
              <a class="text-indigo-200/90 hover:text-indigo-100" :href="entry.docs" target="_blank" rel="noreferrer">
                {{ entry.docs }}
              </a>
            </p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="tag in (entry.tags || []).slice(0, 8)"
                :key="tag"
                class="rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-200/70 ring-1 ring-white/10"
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
