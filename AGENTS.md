# Agent Instructions (opchelper)

This repository is a Cloudflare Pages site for **OPC Helper（One Person Company Helper）**.

> For a deeper handbook (positioning, architecture, content workflows), read:
> - `docs/handbook.zh-CN.md`
> - `docs/handbook.en.md`

## Goals

- Keep the site fast (static-first), simple, and easy to deploy on Cloudflare Pages.
- Prefer **static + content-driven pages** for SEO and performance.
- Prefer **client-side tools** (template generators) that do not require secrets.
- Keep changes small and readable; avoid introducing heavy dependencies without clear value.

## Tech Decisions (default)

- Package manager: **pnpm**
- Runtime: **Node.js LTS** (recommend 20+)
- Framework: **Nuxt (Vue)** using **SSG** (`nuxt generate`)
- Content: **@nuxt/content** (Markdown/JSON stored in git)
- i18n: **@nuxtjs/i18n** (prefix strategy: `/zh/*`, `/en/*`)
- Styling: **Tailwind CSS**

## Repository Layout

- `code/`: Nuxt application (the website)
- `docs/`: project docs (ops, deployment, research notes, plans)
- Root files (`README.md`, `.gitignore`, `AGENTS.md`): repo-level conventions

## Development Commands

- Install: `pnpm -C code install`
- Dev server: `pnpm -C code dev`
- Generate (SSG): `pnpm -C code generate`
- Preview build: `pnpm -C code preview`

## Content Update Workflow (most common task)

### Where content lives

- Guides (Chinese): `code/content/zh/guides/*.md`
- Guides (English): `code/content/en/guides/*.md`
- Directory entries (JSON): `code/content/directory/*.json`

### Writing rules (Chinese-first)

- In `/zh/*` pages and all Chinese content, **prefer Chinese UI and copy** (except code blocks / product names).
- Each article should be actionable: include a clear goal, steps, templates/checklists, and a “下一步/Next” section.
- Avoid copying long passages from sources; write original content and link to official docs as references.

### Minimum frontmatter for Markdown articles

Guides currently validate these fields via `code/content.config.ts`:
- `title` (required)
- `description` (optional)
- `tags` (optional)
- `updatedAt` (optional, `YYYY-MM-DD`)

### Directory JSON schema (must match)

Directory files must follow the schema in `code/content.config.ts`:
- `category`: `"provider" | "gateway" | "tool" | "site"`
- `name`: `{ "zh": "...", "en": "..." }`
- `description`: `{ "zh": "...", "en": "..." }`
- `website`: URL
- `docs`: URL (optional)
- `tags`: string[] (optional)

### Quality bar for directory items

- Prefer **official** websites/docs/pricing pages.
- Keep descriptions short (1–2 sentences) and practical (“适合谁/不适合谁”).
- Tags should help filtering (e.g. `api`, `embedding`, `image`, `gateway`, `pricing`, `privacy`, `china`, `billing`).

## Coding Conventions

- Use TypeScript; avoid `any` unless unavoidable.
- App code lives in `code/`.
- Keep UI components small; prefer `code/components/*`.
- Put reusable logic in `code/utils/*` so it can later move to server-side if needed.
- No inline secrets. Anything that needs credentials must use Cloudflare env vars and be optional.
- Accessibility: forms must have labels; buttons must be reachable via keyboard.

## Cloudflare Pages Conventions

- Monorepo root: `code/`
- Build output directory: `code/.output/public`
- Static-first for v1. Do not rely on server-only APIs unless explicitly adding Pages Functions/Workers.
- If adding analytics, keep it privacy-friendly and lightweight.

## Git Hygiene

- Keep commits focused (1 feature or fix per commit).
- Update `README.md` when adding new setup/deploy steps.
