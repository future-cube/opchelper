<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <section class="py-6 sm:py-10">
    <h1 class="text-3xl font-semibold tracking-tight text-white">Tools</h1>
    <p class="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200/80 sm:text-base">
      Tools are optional helpers. The core of the site is Guides + Directory — then tools to make execution faster.
    </p>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <NuxtLink
        :to="localePath('/tools/templates')"
        class="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/10"
      >
        <h2 class="text-lg font-semibold text-white">Template Generator (v1)</h2>
        <p class="mt-2 text-sm text-slate-200/75">
          Briefs, pricing notes, change requests, payment reminders, weekly reviews — generate copy-pastable Markdown.
        </p>
        <p class="mt-4 text-sm text-indigo-200/80">Open →</p>
      </NuxtLink>
    </div>
  </section>
</template>
