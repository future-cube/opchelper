# OPC Helper Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task.

**Goal:** Build and deploy a Cloudflare Pages website for “OPC Helper（一人公司助手）” with a modern landing page + several in-browser template generators (no backend required).

**Architecture:** Static-first Astro site. Most pages are pre-rendered. “Tools” are client-side islands that run template-generation logic in the browser and let users copy results (Markdown).

**Tech Stack:** Astro + Tailwind CSS + TypeScript + Vitest, deployed via Cloudflare Pages Git integration (or manual build settings).

---

## Task 1: Scaffold Astro project

**Files:**

- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/pages/index.astro`
- Create: `src/layouts/BaseLayout.astro`

**Step 1: Create Astro app**

Run:

```bash
pnpm create astro@latest .
```

Choose:

- TypeScript: yes (strict)
- Install dependencies: yes
- Template: minimal (we’ll add pages ourselves)

Expected: `pnpm dev` starts a local server and shows Astro starter.

**Step 2: Verify baseline**

Run:

```bash
pnpm dev
```

Expected: Site loads with no console errors.

---

## Task 2: Add Tailwind + base design system

**Files:**

- Modify: `package.json`
- Create/Modify: `tailwind.config.mjs`
- Create/Modify: `src/styles/global.css`
- Modify: `src/layouts/BaseLayout.astro`

**Step 1: Install Tailwind**

Run:

```bash
pnpm add -D tailwindcss postcss autoprefixer
pnpm dlx tailwindcss init -p
```

**Step 2: Configure Tailwind content paths**

Ensure Tailwind scans:

- `./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}`

**Step 3: Global CSS**

Add Tailwind directives + basic typography defaults in `src/styles/global.css`.

**Step 4: Layout**

Add header/footer shell and include global CSS in `BaseLayout.astro`.

---

## Task 3: Create core pages and navigation

**Files:**

- Create: `src/pages/tools/index.astro`
- Create: `src/pages/playbook/index.astro`
- Create: `src/pages/about/index.astro`
- Modify: `src/pages/index.astro`
- Create: `src/components/Nav.astro`
- Create: `src/components/Footer.astro`

**Step 1: Landing page**

Sections:

- Hero (value proposition + CTA to Tools)
- “What you get” (SOP + templates + checklists)
- Featured tools (3 cards)
- FAQ

**Step 2: Playbook page**

Convert key parts of `docs/ops/operations-plan.zh-CN.md` into a readable “Operating System” outline with internal links to Tools.

---

## Task 4: Implement template generator tools (client-side)

**Files:**

- Create: `src/pages/tools/templates.astro`
- Create: `src/components/tools/TemplateTool.tsx`
- Create: `src/lib/templates.ts`

Tools (v1):

1. **项目简报生成器**：行业/目标/范围/时间/交付物/不做什么
2. **报价说明生成器**：计费方式/范围边界/验收/付款条款
3. **需求变更说明生成器**：变更内容/影响/加价/新排期
4. **催款邮件生成器**：发票/金额/到期日/语气选项
5. **周复盘生成器**：本周产出/指标/问题/下周重点

**Step 1: Add unit-testable template functions**

In `src/lib/templates.ts`, implement pure functions like:

- `buildProjectBrief(input) -> string`
- `buildPricingNote(input) -> string`

**Step 2: Build UI component**

`TemplateTool.tsx`:

- Form fields with labels
- Live preview of Markdown output
- Copy-to-clipboard button (with success state)

---

## Task 5: Add tests (Vitest)

**Files:**

- Create: `vitest.config.ts`
- Modify: `package.json`
- Create: `src/lib/templates.test.ts`

**Step 1: Add Vitest**

Run:

```bash
pnpm add -D vitest
```

**Step 2: Write tests**

Example:

```ts
import { buildProjectBrief } from "./templates";

test("project brief includes scope", () => {
  const md = buildProjectBrief({ scope: "Landing page", goal: "More leads" });
  expect(md).toContain("Landing page");
});
```

**Step 3: Verify**

Run:

```bash
pnpm test
```

Expected: all tests PASS.

---

## Task 6: Cloudflare Pages deployment readiness

**Files:**

- Modify: `README.md`
- Modify: `package.json`
- (Optional) Create: `.nvmrc`

**Step 1: Ensure build output**

Astro default output is `dist/`. Confirm:

```bash
pnpm build
```

Expected: `dist/` exists.

**Step 2: Document Cloudflare settings**

In `README.md`, add:

- Framework preset: Astro (or “None” with build command)
- Build command: `pnpm build`
- Build output directory: `dist`
- Node version recommendation

---

## Task 7: Push to GitHub and verify deploy

**Step 1: Commit**

```bash
git add .
git commit -m "feat: initialize OPC Helper site"
```

**Step 2: Push**

```bash
git push origin main
```

**Step 3: Cloudflare**

- If Pages is already connected, push should trigger a deploy.
- If not, create a Pages project in Cloudflare Dashboard and connect the GitHub repo, then deploy.
