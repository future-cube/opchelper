<script setup lang="ts">
const { locale } = useI18n();

const copy = computed(() =>
  locale.value === "zh"
    ? {
        title: "模板生成器（v1）",
        intro: "选择一个模板，填写关键字段，复制生成的 Markdown。全部在浏览器本地运行，不需要账号与密钥。"
      }
    : {
        title: "Template Generator (v1)",
        intro: "Pick a template, fill key fields, copy the generated Markdown. Everything runs locally in your browser."
      }
);
</script>

<template>
  <section class="py-6 sm:py-10">
    <h1 class="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{{ copy.title }}</h1>
    <p class="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-200/80 sm:text-base">
      {{ copy.intro }}
    </p>

    <div class="mt-8">
      <ToolsTemplateTool />
    </div>
  </section>
</template>
