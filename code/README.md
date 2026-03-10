# OPC Helper Web (Nuxt + Vue + SSG)

This directory contains the Nuxt application for **OPC Helper**.

- App source code: `code/`
- Project docs: `docs/` (in repo root)
- Static output: `code/.output/public` (generated, do not commit)

## Setup

Requirements: Node.js 20+ and pnpm.

Install dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Static build (Cloudflare Pages)

Generate the static site (SSG):

```bash
pnpm generate
```

Preview the generated output:

```bash
pnpm preview
```

## Notes

- Deployment is automated via GitHub Actions + Cloudflare Pages (`wrangler pages deploy`).
- Maintainer handbook: `docs/handbook.zh-CN.md` / `docs/handbook.en.md`.
