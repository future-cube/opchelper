<script setup lang="ts">
type LocaleCode = "zh" | "en";

type TeaserDoc = {
  path: string;
  title?: string;
  description?: string;
  tags?: string[];
  updatedAt?: string;
};

const props = defineProps<{
  locale: LocaleCode;
  currentPath: string;
  collection: "guidesZh" | "guidesEn" | "playbooksZh" | "playbooksEn" | "downloadsZh" | "downloadsEn";
  tocLinks?: { id: string; text: string; depth: number }[];
}>();

const localePath = useLocalePath();

const labels = computed(() =>
  props.locale === "zh"
    ? {
        toc: "目录",
        latest: "最新内容",
        explore: "继续探索",
        map: "内容地图",
        directory: "资源导航",
        downloads: "模板下载"
      }
    : {
        toc: "On this page",
        latest: "Latest",
        explore: "Explore",
        map: "Content map",
        directory: "Directory",
        downloads: "Downloads"
      }
);

const { data: latest } = await useAsyncData(
  () => `sidebar-latest-${props.collection}-${props.locale}`,
  async () =>
    (await queryCollection(props.collection)
      .select("path", "title", "description", "tags", "updatedAt")
      .where("path", "!=", props.currentPath)
      .order("updatedAt", "DESC")
      .limit(6)
      .all()) as TeaserDoc[],
  { watch: () => [props.collection, props.currentPath] }
);

const toc = computed(() => (props.tocLinks || []).filter((l) => l.depth <= 3));

const anchorHref = (id: string) => `#${id}`;
</script>

<template>
  <aside class="space-y-4">
    <section v-if="toc.length" class="opc-toc">
      <h3 class="text-sm font-semibold text-slate-900 dark:text-white">{{ labels.toc }}</h3>
      <nav class="mt-3 space-y-2 text-sm">
        <a
          v-for="link in toc"
          :key="link.id"
          :href="anchorHref(link.id)"
          class="block leading-snug"
          :class="link.depth === 3 ? 'pl-3 text-[13px]' : ''"
        >
          {{ link.text }}
        </a>
      </nav>
    </section>

    <section class="opc-card">
      <h3 class="text-sm font-semibold text-slate-900 dark:text-white">{{ labels.explore }}</h3>
      <div class="mt-3 flex flex-wrap gap-2">
        <NuxtLink :to="localePath('/content-map')" class="opc-btn-ghost">{{ labels.map }}</NuxtLink>
        <NuxtLink :to="localePath('/directory')" class="opc-btn-ghost">{{ labels.directory }}</NuxtLink>
        <NuxtLink :to="localePath('/downloads')" class="opc-btn-ghost">{{ labels.downloads }}</NuxtLink>
      </div>
    </section>

    <section class="opc-card">
      <div class="flex items-center justify-between gap-3">
        <h3 class="text-sm font-semibold text-slate-900 dark:text-white">{{ labels.latest }}</h3>
      </div>
      <ul class="mt-3 space-y-2">
        <li v-for="doc in (latest || [])" :key="doc.path">
          <NuxtLink
            :to="localePath(doc.path.replace(`/${props.locale}/`, '/').replace('/playbooks/', '/playbook/'))"
            class="block rounded-2xl px-3 py-2 hover:bg-slate-50 dark:hover:bg-white/10"
          >
            <p class="text-sm font-medium text-slate-900 dark:text-slate-100">
              {{ doc.title || doc.path }}
            </p>
            <p v-if="doc.description" class="mt-1 text-xs text-slate-600 dark:text-slate-200/70">
              {{ doc.description }}
            </p>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </aside>
</template>

