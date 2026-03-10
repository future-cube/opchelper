<script setup lang="ts">
type GuideDoc = {
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
        title: "学习（Guides）",
        intro:
          "面向一人公司的实战教程与路线图。建议先跑通一个最短闭环：获客 → 交付 → 回款 → 复盘，再逐步扩展。"
      }
    : {
        title: "Guides",
        intro:
          "Practical learning paths for one-person companies. Start with one loop: acquire → deliver → get paid → review."
      }
);

const collection = computed(() => (locale.value === "zh" ? "guidesZh" : "guidesEn"));
const { data: docs } = await useAsyncData(
  () => `guides-index-${locale.value}`,
  async () =>
    (await queryCollection(collection.value as "guidesZh" | "guidesEn")
      .select("path", "title", "description", "tags", "updatedAt")
      .order("updatedAt", "DESC")
      .all()) as GuideDoc[],
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
      <div class="grid gap-4 sm:grid-cols-2">
        <NuxtLink
          v-for="doc in (docs || [])"
          :key="doc.path"
          :to="localePath(doc.path.replace(`/${locale}/`, '/'))"
          class="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/10"
        >
          <h2 class="text-lg font-semibold text-white">
            {{ doc.title }}
          </h2>
          <p v-if="doc.description" class="mt-2 text-sm text-slate-200/75">
            {{ doc.description }}
          </p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="tag in (doc.tags || []).slice(0, 6)"
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
