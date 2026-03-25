# Claw123 Middle Section Homepage Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restore the original OPC homepage layout and insert only the Claw123 middle navigation + card section (百虾大战→币圈生态) into the homepage content area, with all assets localized.

**Architecture:** Keep the original homepage Vue structure as the base. Create a new mid-section component that renders the extracted Claw123 middle HTML fragment (navigation + content cards) and loads a locally-prefixed CSS file. Extract/transform the HTML to use anchor links, replace remote image URLs with locally downloaded assets under `public/claw123/assets`, and ensure no header/footer/other sections are included.

**Tech Stack:** Nuxt 4 (SSG), Vue 3, @nuxt/content, @nuxtjs/i18n, Tailwind CSS.

### Task 1: Restore original homepage and create insertion point

**Files:**
- Modify: `code/app/pages/index.vue`

**Step 1: Write the failing test**
No automated test harness exists for static pages. Skip and proceed to manual verification.

**Step 2: Run test to verify it fails**
N/A

**Step 3: Write minimal implementation**
- Replace `code/app/pages/index.vue` with the original homepage content (use current `code/app/pages/legacy-home.vue` as source).
- Insert a placeholder section for the new Claw123 mid content (e.g. between existing hero and content sections).

**Step 4: Run test to verify it passes**
Manual verification later in Task 5.

**Step 5: Commit**
```bash
git add code/app/pages/index.vue
git commit -m "feat: restore homepage layout"
```

### Task 2: Extract and transform Claw123 middle HTML

**Files:**
- Create: `code/app/assets/claw123/mid.html`

**Step 1: Write the failing test**
No automated test harness exists. Skip.

**Step 2: Run test to verify it fails**
N/A

**Step 3: Write minimal implementation**
- From `code/app/assets/claw123/body.html`, extract only:
  - `<ul class="amz-peg-menu" ...>`
  - `<div class="amz-preview-content"> ... </div>`
- Wrap them inside a container `<section class="claw123-mid"> ... </section>`.
- Convert category nav items to anchor links targeting their matching section ids (e.g. `href="#tab_..."`).

**Step 4: Run test to verify it passes**
Manual verification later in Task 5.

**Step 5: Commit**
```bash
git add code/app/assets/claw123/mid.html
git commit -m "feat: add claw123 middle html"
```

### Task 3: Localize all assets referenced by mid HTML

**Files:**
- Create: `code/public/claw123/assets/*`
- Modify: `code/app/assets/claw123/mid.html`

**Step 1: Write the failing test**
No automated test harness exists. Skip.

**Step 2: Run test to verify it fails**
N/A

**Step 3: Write minimal implementation**
- Parse `mid.html` to collect all `src` and `data-raw-src` URLs.
- Download each unique asset to `code/public/claw123/assets/` using a stable filename (e.g. basename + short hash).
- Replace URLs in `mid.html` with local paths `/claw123/assets/<file>` and remove `data-raw-src` attributes by setting `src` directly.

**Step 4: Run test to verify it passes**
Manual verification later in Task 5.

**Step 5: Commit**
```bash
git add code/public/claw123/assets code/app/assets/claw123/mid.html
git commit -m "feat: localize claw123 mid assets"
```

### Task 4: Add local CSS for mid section (scoped via prefix)

**Files:**
- Create: `code/public/claw123/mid.css`

**Step 1: Write the failing test**
No automated test harness exists. Skip.

**Step 2: Run test to verify it fails**
N/A

**Step 3: Write minimal implementation**
- Download the original `claw123_index.css`.
- Prefix selectors with `.claw123-mid` (except `@keyframes` and `@font-face`).
- Save as `code/public/claw123/mid.css` and ensure only the mid-section is affected.

**Step 4: Run test to verify it passes**
Manual verification later in Task 5.

**Step 5: Commit**
```bash
git add code/public/claw123/mid.css
git commit -m "feat: add localized claw123 mid styles"
```

### Task 5: Wire mid section component into homepage

**Files:**
- Create: `code/app/components/Claw123Mid.vue`
- Modify: `code/app/pages/index.vue`

**Step 1: Write the failing test**
No automated test harness exists. Skip.

**Step 2: Run test to verify it fails**
N/A

**Step 3: Write minimal implementation**
- Create component that:
  - Uses `useHead` to include `/claw123/mid.css`.
  - Imports `mid.html` as raw and renders via `v-html` inside a wrapper.
- Insert `<Claw123Mid />` into the homepage where intended.

**Step 4: Run test to verify it passes**
Manual verification later in Task 6.

**Step 5: Commit**
```bash
git add code/app/components/Claw123Mid.vue code/app/pages/index.vue
git commit -m "feat: embed claw123 mid section on homepage"
```

### Task 6: Manual verification (SSG + visual)

**Files:**
- None

**Step 1: Write the failing test**
N/A

**Step 2: Run test to verify it fails**
N/A

**Step 3: Write minimal implementation**
- Run `pnpm -C code generate`.
- Spot check `/zh` and `/en` to verify:
  - Original homepage layout restored.
  - Mid section shows category nav + cards only (no header/footer).
  - Nav uses anchor links and scrolls to sections.
  - All images load from local `/claw123/assets/` paths.

**Step 4: Run test to verify it passes**
Confirm visuals are correct.

**Step 5: Commit**
No commit needed.
