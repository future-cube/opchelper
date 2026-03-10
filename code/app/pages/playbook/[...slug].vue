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
</script>

<template>
  <section class="py-6 sm:py-10">
    <article class="prose max-w-none prose-headings:scroll-mt-24 dark:prose-invert">
      <ContentDoc :path="path">
        <template #not-found>
          <h1>{{ notFound.title }}</h1>
          <p>{{ notFound.desc }}</p>
        </template>
      </ContentDoc>
    </article>
  </section>
</template>
