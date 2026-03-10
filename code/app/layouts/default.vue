<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        class="absolute inset-0 opacity-[0.55] [background-image:radial-gradient(circle_at_25%_10%,rgba(99,102,241,0.18),transparent_40%),radial-gradient(circle_at_70%_30%,rgba(34,211,238,0.16),transparent_35%),radial-gradient(circle_at_50%_85%,rgba(16,185,129,0.10),transparent_35%)] dark:opacity-100"
      />
      <div
        class="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl dark:bg-indigo-500/20"
      />
      <div class="absolute -bottom-48 right-1/3 h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-400/10" />
    </div>

    <AppNav />
    <main class="opc-container pb-16 pt-8 sm:pt-10">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
