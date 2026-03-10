<script setup lang="ts">
type PlaybookDoc = {
  path: string;
  title?: string;
  description?: string;
  tags?: string[];
  updatedAt?: string;
};

const { locale } = useI18n();
const localePath = useLocalePath();

const copy = computed(() =>
  locale.value === "zh"
    ? {
        title: "手册（Playbooks）",
        intro:
          "按业务类型给你一套可复制的 SOP：从定位、获客，到交付、回款，再到复盘与增长。建议先选 1 个最适合你的赛道照着执行。",
        empty: "当前语言还没有手册内容。你可以先从「学习（Guides）」开始。"
      }
    : {
        title: "Playbooks",
        intro:
          "Structured SOPs per business type: positioning → acquisition → delivery → getting paid → review. Pick one track and execute it.",
        empty: "No playbooks in this language yet. Start with Guides."
      }
);

const collection = computed(() => (locale.value === "zh" ? "playbooksZh" : "playbooksEn"));
const { data: docs } = await useAsyncData(
  () => `playbooks-index-${locale.value}`,
  async () =>
    (await queryCollection(collection.value as "playbooksZh" | "playbooksEn")
      .select("path", "title", "description", "tags", "updatedAt")
      .order("updatedAt", "DESC")
      .all()) as PlaybookDoc[],
  { watch: [collection] }
);

const toPlaybookRoute = (docPath: string): string => {
  const prefix = `/${locale.value}/playbooks/`;
  const slug = docPath.startsWith(prefix) ? docPath.slice(prefix.length) : docPath;
  return localePath(`/playbook/${slug}`);
};
</script>

<template>
  <section class="py-6 sm:py-10">
    <h1 class="text-3xl font-semibold tracking-tight text-white">{{ copy.title }}</h1>
    <p class="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200/80 sm:text-base">
      {{ copy.intro }}
    </p>

    <div class="mt-8">
      <div v-if="!(docs || []).length" class="rounded-3xl bg-white/5 p-6 text-sm text-slate-200/80 ring-1 ring-white/10">
          {{ copy.empty }}
          <div class="mt-4">
            <NuxtLink class="text-indigo-200/90 hover:text-indigo-100" :to="localePath('/guides')">
              {{ locale === 'zh' ? '去学习 →' : 'Go to Guides →' }}
            </NuxtLink>
          </div>
      </div>

      <div v-else class="grid gap-4 sm:grid-cols-2">
        <NuxtLink
          v-for="doc in (docs || [])"
          :key="doc.path"
          :to="toPlaybookRoute(doc.path)"
          class="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/10"
        >
          <h2 class="text-lg font-semibold text-white">{{ doc.title }}</h2>
          <p v-if="doc.description" class="mt-2 text-sm text-slate-200/75">
            {{ doc.description }}
          </p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="tag in (doc.tags || []).slice(0, 8)"
              :key="tag"
              class="rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-200/70 ring-1 ring-white/10"
            >
              {{ tag }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
