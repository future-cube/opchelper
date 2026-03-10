# Content Fill Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Populate OPC Helper with high-quality Chinese-first bilingual content (Guides/Playbooks/Directory/Downloads), and make the UI Chinese-friendly under `/zh`.

**Architecture:** Keep v1 static-first via Nuxt SSG + Nuxt Content. Store content in git under `code/content/` and render lists/details with Nuxt Content components. Use i18n route prefixes (`/zh`, `/en`) and ensure Chinese UI copy is actually Chinese in the zh locale.

**Tech Stack:** Nuxt 4 (Vue), `@nuxt/content`, `@nuxtjs/i18n`, Tailwind, Cloudflare Pages deploy via `wrangler pages deploy`.

---

### Task 1: Write maintainer docs and update AGENTS rules

**Files:**
- Create: `docs/handbook.zh-CN.md`
- Create: `docs/handbook.en.md`
- Modify: `AGENTS.md`

**Step 1:** Write handbook with positioning, IA, content workflow, deploy model.  
**Step 2:** Update `AGENTS.md` with “how to add content” rules and schema reminders.  
**Step 3:** Run `pnpm -C code generate` to ensure docs changes don’t break build.  
**Step 4:** Commit.

### Task 2: Expand content collections for Playbooks and Downloads

**Files:**
- Modify: `code/content.config.ts`
- Create: `code/content/zh/playbooks/` (seed 3–5)
- Create: `code/content/en/playbooks/` (seed 3–5 summaries)
- Create: `code/content/zh/downloads/` (seed 5–10)
- Create: `code/content/en/downloads/` (seed 5–10 summaries)

**Step 1:** Add new collections with minimal schema (title/description/tags/updatedAt + optional downloadUrl).  
**Step 2:** Seed content with “one-person company loops” (creator/services/digital products).  
**Step 3:** Run `pnpm -C code generate` and fix schema issues.  
**Step 4:** Commit.

### Task 3: Improve zh UI copy (Chinese-first)

**Files:**
- Modify: `code/app/pages/index.vue`
- Modify: `code/app/pages/playbook.vue`
- Modify: `code/app/pages/downloads.vue`
- Modify: `code/app/pages/about.vue`
- Modify: `code/app/pages/tools/index.vue`
- Modify: `code/app/pages/directory.vue` (intro copy)

**Step 1:** Make headings/descriptions fully localized based on `locale`.  
**Step 2:** Ensure “not found” message on guides is Chinese in zh locale.  
**Step 3:** Run `pnpm -C code generate`.  
**Step 4:** Commit.

### Task 4: Populate Directory with useful entries

**Files:**
- Create/Modify: `code/content/directory/*.json`
- Create: `docs/research/2026-03-10-directory-sources.md`

**Step 1:** Collect official links for providers, gateways, and tools; record in research notes.  
**Step 2:** Add directory entries with zh/en names/descriptions and tags.  
**Step 3:** Run `pnpm -C code generate`.  
**Step 4:** Commit.

### Task 5: Populate Guides with Chinese-first content (and EN summaries)

**Files:**
- Create: `code/content/zh/guides/*.md` (10–20)
- Create: `code/content/en/guides/*.md` (at least 5–10)
- Create: `docs/research/2026-03-10-guides-sources.md`

**Step 1:** Research: solo business operations, creator monetization, digital downloads, pricing/contract/payment workflows, and AI tooling.  
**Step 2:** Write original guides with templates/checklists and internal links.  
**Step 3:** Write English versions as shorter summaries where needed.  
**Step 4:** Run `pnpm -C code generate`.  
**Step 5:** Commit.

### Task 6: Push branch and merge

**Files:**
- (Git operations)

**Step 1:** Push `codex/content-fill` branch.  
**Step 2:** Open PR or merge to `main` (based on your preference).  
**Step 3:** Verify Cloudflare Pages deployment updates.

