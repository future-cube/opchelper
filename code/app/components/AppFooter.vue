<script setup lang="ts">
const { locale } = useI18n();
const config = useRuntimeConfig();

const tagline = computed(() =>
  locale.value === "zh"
    ? "静态优先 · Cloudflare Pages · 后续可演进管理功能"
    : "Static-first · Cloudflare Pages · Future-ready for management features"
);

const buildSha = computed(() => String(config.public.buildSha || "").trim());
const buildStamp = computed(() => String(config.public.buildStamp || "").trim());
const buildSource = computed(() => String(config.public.buildSource || "").trim());

const shortSha = computed(() => (buildSha.value ? buildSha.value.slice(0, 7) : ""));
const showBuild = computed(() => shortSha.value.length > 0);

const buildLabel = computed(() =>
  locale.value === "zh"
    ? {
        build: "构建",
        source: "来源",
        stamp: "标识"
      }
    : {
        build: "Build",
        source: "Source",
        stamp: "Stamp"
      }
);
</script>

<template>
  <footer class="border-t border-white/10 bg-slate-950/70">
    <div class="mx-auto w-full max-w-6xl px-4 py-10 text-sm text-slate-300/70 sm:px-6">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ new Date().getFullYear() }} OPC Helper</p>
        <div class="text-right text-slate-300/60">
          <p>{{ tagline }}</p>
          <p v-if="showBuild" class="mt-1 text-xs text-slate-400/70">
            {{ buildLabel.build }}: {{ shortSha }}
            <span v-if="buildSource">· {{ buildLabel.source }}: {{ buildSource }}</span>
            <span v-if="buildStamp">· {{ buildLabel.stamp }}: {{ buildStamp }}</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
