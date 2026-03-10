# Agent Instructions (opchelper)

This repository is a Cloudflare Pages site for **OPC Helper（One Person Company Helper）**.

## Goals

- Keep the site fast (static-first), simple, and easy to deploy on Cloudflare Pages.
- Prefer **client-side tools** (template generators) that do not require secrets.
- Keep changes small and readable; avoid introducing heavy dependencies without clear value.

## Tech Decisions (default)

- Package manager: **pnpm**
- Runtime: **Node.js LTS** (recommend 20+)
- Framework: **Astro** (static site with islands where needed)
- Styling: **Tailwind CSS**
- Tests: **Vitest** for pure TS logic

## Development Commands

- Install: `pnpm install`
- Dev server: `pnpm dev`
- Build: `pnpm build`
- Preview build: `pnpm preview`
- Tests: `pnpm test`
- Format: `pnpm format`
- Lint (if present): `pnpm lint`

## Coding Conventions

- Use TypeScript; avoid `any` unless unavoidable.
- Keep UI components small; prefer `src/components/*`.
- Put reusable generator logic in `src/lib/*` with unit tests in `src/lib/*.test.ts`.
- No inline secrets. Anything that needs credentials must use Cloudflare env vars and be optional.
- Accessibility: forms must have labels; buttons must be reachable via keyboard.

## Cloudflare Pages Conventions

- Build output directory: `dist/`
- Do not rely on server-only APIs unless explicitly adding Pages Functions.
- If adding analytics, keep it privacy-friendly and lightweight.

## Git Hygiene

- Keep commits focused (1 feature or fix per commit).
- Update `README.md` when adding new setup/deploy steps.
