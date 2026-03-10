# OPC Helper (Nuxt) Implementation Plan — Current

> **For Claude:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task.

**Goal:** Maintain and evolve OPC Helper into a Chinese-first bilingual (ZH/EN) static site that teaches “how to run a one-person company”, with Guides + Playbooks + Directory + Downloads + lightweight client-side Tools.

**Architecture:** Nuxt 4 (Vue 3) + SSG (`pnpm -C code generate`). Content lives in git under `code/content/**` (Nuxt Content collections). Cloudflare Pages serves static assets from `code/.output/public`. No backend in v1; later we can evolve to Pages Functions/Workers + D1/KV/R2 for CMS-like workflows.

**Tech Stack:** Nuxt 4, Vue 3, `@nuxt/content`, `@nuxtjs/i18n`, Tailwind CSS (dark mode via `class`), pnpm, Cloudflare Pages (deploy via `wrangler pages deploy` in GitHub Actions).

---

## Status (as of 2026-03-10)

This repo originally considered Astro, but the current production site is **Nuxt + Vue + SSG**. Any Astro references are intentionally removed from this plan to avoid confusing future maintainers.

If you need a task-by-task plan to add content, start here:
- `docs/plans/2026-03-10-content-fill.md`
- `docs/plans/2026-03-10-creator-monetization.md`
- `docs/plans/2026-03-10-services-cashflow.md`
- `docs/plans/2026-03-10-virtual-products.md`

---

## Task 1: Local dev sanity (fast)

**Files:**
- Verify only.

**Step 1: Install**
Run:
```bash
pnpm -C code install --frozen-lockfile
```

**Step 2: Dev server**
Run:
```bash
pnpm -C code dev
```
Expected: site is accessible locally.

**Step 3: Static build**
Run:
```bash
pnpm -C code generate
```
Expected: output exists in `code/.output/public`.

---

## Task 2: Deploy sanity (Cloudflare Pages)

**Files:**
- Verify only, unless missing settings are found.

**Step 1: Confirm GitHub Actions deploy workflow exists**
- Workflow: `.github/workflows/cloudflare-pages.yml`
- Required GitHub Secrets:
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`

**Step 2: Confirm Pages target**
- Project name: `opchelper`
- Deployment command: `wrangler pages deploy code/.output/public`

---

## Task 3: Content lanes (what to build next)

This is the recommended “content roadmap order” for v1:

1) **AI / LLM 工具导航与教程**（编辑器/CLI/代理、OpenClaw、Codex CLI、Claude Code、Cursor、opencode 等）
2) **自媒体变现**（内容 → 转化 → 产品化）
3) **服务/咨询交付与回款**（范围控制、交付节奏、回款系统）
4) **虚拟资料销售**（选题、定价、交付、复购）

Each lane should ship:
- Guides (ZH primary + EN summaries)
- Directory entries (official links)
- Downloads (templates/checklists)

