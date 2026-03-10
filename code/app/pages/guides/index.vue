<script setup lang="ts">
const { locale } = useI18n();
const localePath = useLocalePath();
const basePath = computed(() => `/${locale.value}/guides`);
</script>

<template>
  <section class="py-6 sm:py-10">
    <h1 class="text-3xl font-semibold tracking-tight text-white">Guides</h1>
    <p class="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200/80 sm:text-base">
      Practical learning paths for one-person companies. Start with one loop: acquire → deliver → get paid → review.
    </p>

    <div class="mt-8">
      <ContentList :path="basePath" v-slot="slotProps">
        <div class="grid gap-4 sm:grid-cols-2">
          <NuxtLink
            v-for="doc in (slotProps?.list || [])"
            :key="doc._path"
            :to="localePath(doc._path?.replace(`/${locale}/`, '/') || '/')"
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
      </ContentList>
    </div>
  </section>
</template>
