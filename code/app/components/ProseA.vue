<script setup lang="ts">
const props = defineProps<{
  href?: string;
  target?: string;
}>();

const href = computed(() => String(props.href || ""));

const localePath = useLocalePath();

const isHashLink = computed(() => href.value.startsWith("#"));
const isMailOrTel = computed(() => href.value.startsWith("mailto:") || href.value.startsWith("tel:"));
const isExternal = computed(() => /^https?:\/\//i.test(href.value));

const isNuxtAsset = computed(
  () => href.value.startsWith("/_nuxt/") || href.value.startsWith("/__nuxt_content/") || href.value.startsWith("/cdn-cgi/")
);

const isStaticDownloadAsset = computed(() => href.value.startsWith("/downloads/"));

const isAlreadyLocalized = computed(() => /^\/(zh|en)(\/|$)/.test(href.value));
const isAbsolutePath = computed(() => href.value.startsWith("/"));

const isInternalRoute = computed(() => {
  if (!isAbsolutePath.value) return false;
  if (isNuxtAsset.value) return false;
  if (isStaticDownloadAsset.value) return false;
  return true;
});

const to = computed(() => {
  if (!isInternalRoute.value) return "";
  if (isAlreadyLocalized.value) return href.value;
  return String(localePath(href.value));
});

const rel = computed(() => {
  if (props.target === "_blank") return "noreferrer noopener";
  return undefined;
});
</script>

<template>
  <a v-if="isHashLink" :href="href" :target="target" :rel="rel"><slot /></a>
  <a v-else-if="isExternal || isMailOrTel || isNuxtAsset || isStaticDownloadAsset" :href="href" :target="target" :rel="rel"><slot /></a>
  <NuxtLink v-else :to="to" :target="target"><slot /></NuxtLink>
</template>

