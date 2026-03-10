<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        class="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl"
      />
      <div class="absolute -bottom-48 right-1/3 h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-3xl" />
    </div>

    <AppNav />
    <main class="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

