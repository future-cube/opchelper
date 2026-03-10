<script setup lang="ts">
const { locale } = useI18n();
const route = useRoute();
const slug = computed(() => {
  const p = route.params.slug;
  return Array.isArray(p) ? p.join("/") : String(p ?? "");
});
const path = computed(() => `/${locale.value}/guides/${slug.value}`);
</script>

<template>
  <section class="py-6 sm:py-10">
    <article class="prose prose-invert max-w-none prose-headings:scroll-mt-24">
      <ContentDoc :path="path">
        <template #not-found>
          <h1>Not found</h1>
          <p>This guide does not exist in the current language yet.</p>
        </template>
      </ContentDoc>
    </article>
  </section>
</template>

