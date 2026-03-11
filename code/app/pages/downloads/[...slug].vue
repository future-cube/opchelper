<script setup lang="ts">
const { locale } = useI18n();
const route = useRoute();

const slug = computed(() => {
  const p = route.params.slug;
  return Array.isArray(p) ? p.join("/") : String(p ?? "");
});

const path = computed(() => `/${locale.value}/downloads/${slug.value}`);

const notFound = computed(() =>
  locale.value === "zh"
    ? { title: "未找到", desc: "当前语言还没有这份下载内容。" }
    : { title: "Not found", desc: "This download item does not exist in the current language yet." }
);

const collection = computed(() => (locale.value === "zh" ? "downloadsZh" : "downloadsEn"));
const { data: doc } = await useAsyncData(
  () => `download-doc-${locale.value}-${slug.value}`,
  async () => queryCollection(collection.value as "downloadsZh" | "downloadsEn").path(path.value).first(),
  { watch: [collection, path] }
);

useHead(() => {
  const title = doc.value?.title ? `${doc.value.title} · OPC Helper` : "OPC Helper";
  const description = doc.value?.description
    ? String(doc.value.description)
    : locale.value === "zh"
      ? "OPC Helper：一人公司可下载模板与清单。"
      : "OPC Helper: downloadable templates and checklists.";
  return {
    title,
    meta: [{ name: "description", content: description }]
  };
});
</script>

<template>
  <section class="py-6 sm:py-10">
    <article class="prose max-w-none prose-headings:scroll-mt-24 dark:prose-invert">
      <template v-if="doc">
        <ContentRenderer :value="doc" />
      </template>
      <template v-else>
        <h1>{{ notFound.title }}</h1>
        <p>{{ notFound.desc }}</p>
      </template>
    </article>
  </section>
</template>
