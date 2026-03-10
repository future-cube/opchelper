# Services Delivery & Cashflow (服务/咨询交付与回款) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a complete, actionable “服务/咨询交付与回款” module (guides + downloads + directory items) so solo operators can execute a predictable delivery cadence and get paid on time.

**Architecture:** Nuxt 4 static-first site. Content lives in `code/content/**` (Markdown/JSON) rendered via `@nuxt/content`. Downloads live under `code/public/downloads/**`.

**Tech Stack:** Nuxt 4, Vue 3, Tailwind, `@nuxt/content`, `@nuxtjs/i18n`, pnpm.

---

### Task 1: Create research notes (sources)

**Files:**
- Create: `docs/research/2026-03-10-services-cashflow-sources.md`

**Step 1: Collect official references for tooling**
- contracts/e-sign: DocuSign, Dropbox Sign (HelloSign), PandaDoc
- scheduling: Calendly
- invoicing/accounting: FreshBooks, Xero, QuickBooks

**Step 2: Write a short summary**
- What each tool is for (1–2 lines)
- When to use / not use
- Official website + docs link

**Step 3: Commit**
```bash
git add docs/research/2026-03-10-services-cashflow-sources.md
git commit -m "docs(research): services delivery & cashflow sources"
```

---

### Task 2: Add directory entries for service-delivery stack

**Files:**
- Create: `code/content/directory/*.json`

**Step 1: Add entries**
- Calendly
- DocuSign
- Dropbox Sign
- PandaDoc
- FreshBooks
- Xero
- QuickBooks

**Step 2: Validate JSON**
Run:
```bash
node - <<'NODE'
const fs = require('fs'); const path = require('path');
const dir = path.join(process.cwd(), 'code/content/directory');
for (const f of fs.readdirSync(dir)) if (f.endsWith('.json')) JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
console.log('directory json OK');
NODE
```

**Step 3: Commit**
```bash
git add code/content/directory
git commit -m "content(directory): add service delivery tools"
```

---

### Task 3: Write guides (delivery + getting paid)

**Files:**
- Create (ZH):
  - `code/content/zh/guides/services-delivery-cadence.md`
  - `code/content/zh/guides/get-paid-on-time.md`
- Create (EN summaries):
  - `code/content/en/guides/services-delivery-cadence.md`
  - `code/content/en/guides/get-paid-on-time.md`
- (Optional) Modify:
  - `code/content/zh/playbooks/services-consulting.md`
  - `code/content/en/playbooks/services-consulting.md`

**Step 1: Ensure ZH guides are actionable**
- Goal → steps → templates/checklists → common failure modes → next steps.

**Step 2: EN guides are short but non-empty**

**Step 3: Commit**
```bash
git add code/content/zh/guides code/content/en/guides code/content/zh/playbooks code/content/en/playbooks
git commit -m "content: services delivery & cashflow guides"
```

---

### Task 4: Add downloads (templates & checklists)

**Files:**
- Create (public files):
  - `code/public/downloads/templates/sow.md`
  - `code/public/downloads/templates/status-update.md`
  - `code/public/downloads/checklists/acceptance-checklist.csv`
- Create (content pages, zh/en):
  - `code/content/zh/downloads/sow-template.md`
  - `code/content/en/downloads/sow-template.md`
  - `code/content/zh/downloads/status-update.md`
  - `code/content/en/downloads/status-update.md`
  - `code/content/zh/downloads/acceptance-checklist.md`
  - `code/content/en/downloads/acceptance-checklist.md`

**Step 1: Ensure each download page has `downloadUrl`**

**Step 2: Commit**
```bash
git add code/public/downloads code/content/zh/downloads code/content/en/downloads
git commit -m "content(downloads): templates for delivery & getting paid"
```

---

### Task 5: Verify SSG build and ship

**Step 1: Verify build**
Run:
```bash
pnpm -C code install --frozen-lockfile
pnpm -C code generate
```

**Step 2: Merge and push to `main`**

