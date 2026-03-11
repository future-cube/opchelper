<script setup lang="ts">
const { locale } = useI18n();
const route = useRoute();

const slug = computed(() => {
  const p = route.params.slug;
  return Array.isArray(p) ? p.join("/") : String(p ?? "");
});

const path = computed(() => `/${locale.value}/playbooks/${slug.value}`);

const notFound = computed(() =>
  locale.value === "zh"
    ? {
        title: "未找到",
        desc: "当前语言还没有这篇手册。你可以切换语言或先看其他手册。"
      }
    : {
        title: "Not found",
        desc: "This playbook does not exist in the current language yet."
      }
);

const collection = computed(() => (locale.value === "zh" ? "playbooksZh" : "playbooksEn"));
const { data: doc } = await useAsyncData(
  () => `playbook-doc-${locale.value}-${slug.value}`,
  async () => queryCollection(collection.value as "playbooksZh" | "playbooksEn").path(path.value).first(),
  { watch: [collection, path] }
);

useHead(() => {
  const title = doc.value?.title ? `${doc.value.title} · OPC Helper` : "OPC Helper";
  const description = doc.value?.description
    ? String(doc.value.description)
    : locale.value === "zh"
      ? "OPC Helper：一人公司能力学校与可执行手册。"
      : "OPC Helper: playbooks and SOPs for one-person companies.";
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
