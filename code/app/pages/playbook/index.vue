<script setup lang="ts">
const { locale } = useI18n();
const localePath = useLocalePath();
const basePath = computed(() => `/${locale.value}/playbooks`);

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
</script>

<template>
  <section class="py-6 sm:py-10">
    <h1 class="text-3xl font-semibold tracking-tight text-white">{{ copy.title }}</h1>
    <p class="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200/80 sm:text-base">
      {{ copy.intro }}
    </p>

    <div class="mt-8">
      <ContentList :path="basePath" v-slot="slotProps">
        <div v-if="!(slotProps?.list || []).length" class="rounded-3xl bg-white/5 p-6 text-sm text-slate-200/80 ring-1 ring-white/10">
          {{ copy.empty }}
          <div class="mt-4">
            <NuxtLink class="text-indigo-200/90 hover:text-indigo-100" :to="localePath('/guides')">
              {{ locale === 'zh' ? '去学习 →' : 'Go to Guides →' }}
            </NuxtLink>
          </div>
        </div>

        <div v-else class="grid gap-4 sm:grid-cols-2">
          <NuxtLink
            v-for="doc in (slotProps?.list || [])"
            :key="doc._path"
            :to="localePath(doc._path?.replace(`/${locale}/`, '/') || '/')"
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
      </ContentList>
    </div>
  </section>
</template>

