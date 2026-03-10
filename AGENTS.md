# Agent Instructions (opchelper)

This repository is a Cloudflare Pages site for **OPC Helper（One Person Company Helper）**.

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

## Development Commands

- Install: `pnpm -C code install`
- Dev server: `pnpm -C code dev`
- Generate (SSG): `pnpm -C code generate`
- Preview build: `pnpm -C code preview`

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
