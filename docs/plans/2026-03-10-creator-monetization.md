# Creator Monetization (自媒体变现) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship a complete “自媒体变现” content bundle (guides + downloads + directory entries) and fix any missing UI components so the site no longer shows empty pages.

**Architecture:** Nuxt 4 (Vue) static-first. Content lives in git (`code/content/**`) and is rendered via `@nuxt/content` routes (`/zh/*`, `/en/*`). Tools remain client-side only.

**Tech Stack:** Nuxt 4, Vue 3, `@nuxt/content`, `@nuxtjs/i18n`, Tailwind, pnpm.

---

### Task 1: Fix accidental patch-marker content

**Files:**
- Modify: `code/content/zh/guides/github-copilot-starter.md`
- Create: `code/content/en/guides/github-copilot-starter.md`

**Step 1: Remove any `*** Add File` / patch markers from the Chinese guide**

Run:
```bash
rg -n "\\*\\*\\* Add File|\\*\\*\\* End Patch" code/content/zh/guides
```
Expected: no matches.

**Step 2: Ensure English guide exists as a standalone file**

Run:
```bash
test -f code/content/en/guides/github-copilot-starter.md && echo OK
```
Expected: prints `OK`.

**Step 3: Quick content sanity**
- `/zh/guides/github-copilot-starter` should be fully Chinese.
- `/en/guides/github-copilot-starter` should be fully English.

**Step 4: Commit**
```bash
git add code/content/zh/guides/github-copilot-starter.md code/content/en/guides/github-copilot-starter.md
git commit -m "fix(content): split copilot guide (zh/en)"
```

---

### Task 2: Implement missing “模板生成器（v1）” component

**Files:**
- Create: `code/app/components/ToolsTemplateTool.vue`
- (Optional) Modify: `code/app/pages/tools/templates.vue`

**Step 1: Create a minimal, usable client-side generator**
- Provide 3–6 templates: media kit, sponsorship outreach, welcome sequence, payment reminder, weekly review.
- Output Markdown in a textarea with “Copy” button.
- No secrets, no external APIs.

**Step 2: Run generate to ensure no missing components**
Run:
```bash
pnpm -C code install --frozen-lockfile
pnpm -C code generate
```
Expected: success; output in `code/.output/public`.

**Step 3: Commit**
```bash
git add code/app/components/ToolsTemplateTool.vue code/app/pages/tools/templates.vue
git commit -m "feat(tools): add template generator component"
```

---

### Task 3: Finish “自媒体变现” content bundle

**Files:**
- Create/Verify guides:
  - `code/content/zh/guides/creator-monetization-map.md`
  - `code/content/zh/guides/newsletter-funnel.md`
  - `code/content/zh/guides/sponsorship-media-kit.md`
  - `code/content/en/guides/*` (English summaries)
- Create/Verify downloads pages:
  - `code/content/zh/downloads/*.md`, `code/content/en/downloads/*.md`
  - `code/public/downloads/**` (actual downloadable files)
- Create/Verify directory entries:
  - `code/content/directory/*.json`
- Update sources:
  - `docs/research/2026-03-10-creator-monetization-sources.md`

**Step 1: Validate directory JSON**
Run:
```bash
node - <<'NODE'
const fs = require('fs'); const path = require('path');
const dir = path.join(process.cwd(), 'code/content/directory');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
for (const f of files) JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
console.log('OK:', files.length);
NODE
```
Expected: prints `OK: <N>`.

**Step 2: Ensure each Chinese guide is “actionable”**
- Goal → steps → templates/checklists → next steps.
- Prefer Chinese for `/zh/*`.
- Keep English guides as short but non-empty.

**Step 3: Ensure downloads are actually downloadable**
- `downloadUrl` points into `/downloads/...` under `code/public/`.

**Step 4: Commit**
```bash
git add code/content docs/research code/public
git commit -m "content: creator monetization (guides + downloads + directory)"
```

---

### Task 4: Verify production build + ship to main

**Step 1: Full static build**
Run:
```bash
pnpm -C code generate
```
Expected: success.

**Step 2: Merge and push**
Preferred: merge locally into `main` and push.

