# Virtual Products / Digital Downloads (虚拟资料销售) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship a practical “虚拟资料销售” module: pick a niche, validate demand, package a download, set up payment + delivery, and build a repeatable marketing loop — in both Chinese (primary) and English (summary).

**Architecture:** Static-first Nuxt Content site. Guides live in `code/content/{zh,en}/guides/`. Downloads pages in `code/content/{zh,en}/downloads/` and actual files in `code/public/downloads/**`. Directory items in `code/content/directory/*.json`.

**Tech Stack:** Nuxt 4, `@nuxt/content`, `@nuxtjs/i18n`, Tailwind, pnpm.

---

### Task 1: Research sources + update Directory

**Files:**
- Create: `docs/research/2026-03-10-virtual-products-sources.md`
- Create: `code/content/directory/*.json`

**Step 1: Collect official references**
- Gumroad, Lemon Squeezy, Paddle, Stripe (digital products)
- Shopify Digital Downloads app (optional), SellNow / Payhip (if needed)
- Delivery: GitBook / Notion / Google Drive (as delivery surface) + caveats

**Step 2: Add directory entries (official site + docs)**

**Step 3: Commit**
```bash
git add docs/research/2026-03-10-virtual-products-sources.md code/content/directory
git commit -m "content(directory): virtual product platforms + sources"
```

---

### Task 2: Write guides (ZH primary + EN summary)

**Files:**
- Create (ZH):
  - `code/content/zh/guides/virtual-products-0to1.md`
  - `code/content/zh/guides/virtual-products-pricing.md`
  - `code/content/zh/guides/virtual-products-delivery.md`
- Create (EN summaries):
  - `code/content/en/guides/virtual-products-0to1.md`
  - `code/content/en/guides/virtual-products-pricing.md`
  - `code/content/en/guides/virtual-products-delivery.md`
- (Optional) Modify:
  - `code/content/zh/playbooks/digital-downloads.md`
  - `code/content/en/playbooks/digital-downloads.md`

**Step 1: ZH guides must be executable**
- niche selection → problem proof → offer ladder → landing page → payment → delivery → support → updates
- include checklists and copy templates

**Step 2: Commit**
```bash
git add code/content/zh/guides code/content/en/guides code/content/zh/playbooks code/content/en/playbooks
git commit -m "content: virtual products guides"
```

---

### Task 3: Add downloads (templates)

**Files:**
- Create public templates:
  - `code/public/downloads/templates/product-page.md`
  - `code/public/downloads/templates/refund-policy.md`
  - `code/public/downloads/templates/update-changelog.md`
  - `code/public/downloads/checklists/prelaunch-checklist.csv`
- Create content pages (zh/en) with `downloadUrl`

**Step 1: Commit**
```bash
git add code/public/downloads code/content/zh/downloads code/content/en/downloads
git commit -m "content(downloads): virtual product templates"
```

---

### Task 4: Verify build + ship

Run:
```bash
pnpm -C code install --frozen-lockfile
pnpm -C code generate
```

Merge to `main` and push.

