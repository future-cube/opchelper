<script setup lang="ts">
type DownloadDoc = {
  path: string;
  title?: string;
  description?: string;
  tags?: string[];
  downloadUrl?: string;
  updatedAt?: string;
};

const { locale } = useI18n();
const localePath = useLocalePath();

const copy = computed(() =>
  locale.value === "zh"
    ? {
        title: "下载（Downloads）",
        intro:
          "这里提供一人公司常用的清单、模板与资料包（自制、可公开分发）。你可以直接下载使用，也可以配合「工具」页面生成定制版本。",
        download: "下载",
        details: "详情",
        empty: "当前语言还没有下载内容。"
      }
    : {
        title: "Downloads",
        intro:
          "Downloadable packs for solo operators (templates, checklists). These are self-produced and safe to redistribute.",
        download: "Download",
        details: "Details",
        empty: "No downloads in this language yet."
      }
);

const collection = computed(() => (locale.value === "zh" ? "downloadsZh" : "downloadsEn"));
const { data: docs } = await useAsyncData(
  () => `downloads-index-${locale.value}`,
  async () =>
    (await queryCollection(collection.value as "downloadsZh" | "downloadsEn")
      .select("path", "title", "description", "tags", "downloadUrl", "updatedAt")
      .order("updatedAt", "DESC")
      .all()) as DownloadDoc[],
  { watch: [collection] }
);
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
      </div>

      <div v-else class="grid gap-4 sm:grid-cols-2">
        <div v-for="doc in (docs || [])" :key="doc.path" class="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
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

          <div class="mt-5 flex flex-wrap items-center gap-2">
            <a
              v-if="doc.downloadUrl"
              :href="doc.downloadUrl"
              class="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-3 py-2 text-sm font-medium text-white shadow-sm shadow-indigo-500/20 transition hover:bg-indigo-400"
            >
              {{ copy.download }}
            </a>
            <NuxtLink
              :to="localePath(doc.path.replace(`/${locale}/`, '/'))"
              class="inline-flex items-center justify-center rounded-xl bg-white/5 px-3 py-2 text-sm font-medium text-slate-100 ring-1 ring-white/10 transition hover:bg-white/10"
            >
              {{ copy.details }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
