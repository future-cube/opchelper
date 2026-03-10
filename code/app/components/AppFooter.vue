<script setup lang="ts">
const { locale } = useI18n();
const tagline = computed(() =>
  locale.value === "zh"
    ? "静态优先 · Cloudflare Pages · 后续可演进管理功能"
    : "Static-first · Cloudflare Pages · Future-ready for management features"
);
</script>

<template>
  <footer class="border-t border-white/10 bg-slate-950/70">
    <div class="mx-auto w-full max-w-6xl px-4 py-10 text-sm text-slate-300/70 sm:px-6">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ new Date().getFullYear() }} OPC Helper</p>
        <p class="text-slate-300/60">
          {{ tagline }}
        </p>
      </div>
    </div>
  </footer>
</template>
