<script setup lang="ts">
const localePath = useLocalePath();
const { locale } = useI18n();

const copy = computed(() =>
  locale.value === "zh"
    ? {
        title: "工具（Tools）",
        intro: "工具是加速器，不是核心。核心是「学习 + 手册 + 导航」，工具用来让执行更快、更标准。",
        cardTitle: "模板生成器（v1）",
        cardDesc: "项目简报、报价说明、需求变更、催款邮件、每周复盘——生成可复制的 Markdown。",
        open: "打开 →"
      }
    : {
        title: "Tools",
        intro: "Tools are optional helpers. The core is Guides + Playbooks + Directory — then tools to execute faster.",
        cardTitle: "Template Generator (v1)",
        cardDesc: "Briefs, pricing notes, change requests, payment reminders, weekly reviews — generate copy-pastable Markdown.",
        open: "Open →"
      }
);
</script>

<template>
  <section class="py-6 sm:py-10">
    <h1 class="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{{ copy.title }}</h1>
    <p class="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-200/80 sm:text-base">
      {{ copy.intro }}
    </p>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <NuxtLink
        :to="localePath('/tools/templates')"
        class="opc-card opc-card-hover"
      >
        <h2 class="text-lg font-semibold text-slate-900 dark:text-white">{{ copy.cardTitle }}</h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-200/75">
          {{ copy.cardDesc }}
        </p>
        <p class="mt-4 text-sm text-indigo-600 dark:text-indigo-200/80">{{ copy.open }}</p>
      </NuxtLink>
    </div>
  </section>
</template>
