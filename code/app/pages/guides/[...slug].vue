<script setup lang="ts">
const { locale } = useI18n();
const route = useRoute();

const slug = computed(() => {
  const p = route.params.slug;
  return Array.isArray(p) ? p.join("/") : String(p ?? "");
});

const path = computed(() => `/${locale.value}/guides/${slug.value}`);

const notFound = computed(() =>
  locale.value === "zh"
    ? { title: "未找到", desc: "当前语言还没有这篇文章。你可以切换语言或先看其他文章。" }
    : { title: "Not found", desc: "This guide does not exist in the current language yet." }
);

const collection = computed(() => (locale.value === "zh" ? "guidesZh" : "guidesEn"));
const { data: doc } = await useAsyncData(
  () => `guide-doc-${locale.value}-${slug.value}`,
  async () => queryCollection(collection.value as "guidesZh" | "guidesEn").path(path.value).first(),
  { watch: [collection, path] }
);

useHead(() => {
  const title = doc.value?.title ? `${doc.value.title} · OPC Helper` : "OPC Helper";
  const description = doc.value?.description
    ? String(doc.value.description)
    : "OPC Helper: learn and run a one-person company.";
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
