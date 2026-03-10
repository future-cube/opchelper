# OPC Helper Maintainer Handbook (for Agents)

This handbook explains the product positioning, repository layout, content workflow, and deployment model so new maintainers can contribute safely and fast.

## 0. One-liner

**OPC Helper = a learning hub + curated directory + downloadable templates for one-person companies.**

It’s not “a toolbox website”. The core value is actionable execution: acquire customers, deliver reliably, get paid on time, and build sustainable loops — as a solo operator.

## 1. Target users

Typical users (solo or 1–3 people):
- Creators / solo media operators
- Freelancers (services/consulting/dev/design)
- Digital product sellers (templates, files, memberships)
- Indie makers / micro-SaaS
- AI automation / workflow builders

## 2. Product modules

- **Guides**: skill-based tutorials, checklists, templates (SEO backbone)
- **Playbooks**: structured SOPs per business model/industry track
- **Directory**: LLM providers, gateways/aggregators, tools, relevant sites
- **Tools**: lightweight client-side helpers (no secrets)
- **Downloads**: self-produced packs (templates/checklists) safe to distribute

## 3. IA and URL rules

### 3.1 i18n routing

- Chinese: `/zh/*`
- English: `/en/*`

Rules:
- Chinese UI/copy should be Chinese-first (except code blocks and proper nouns).
- English should be usable. It can be shorter, but should not be empty.

### 3.2 Content-driven site (Nuxt Content)

Content is stored in git and generated as a static site (SSG) for SEO and speed.

Current content locations:
- Guides (ZH): `code/content/zh/guides/*.md`
- Guides (EN): `code/content/en/guides/*.md`
- Directory entries: `code/content/directory/*.json`

Collections are defined in `code/content.config.ts`.

## 4. Content conventions

### 4.1 Guide structure (recommended)

Each guide should include:
1) Goal (what the reader can do)
2) Who it’s for / not for
3) Steps (numbered, copyable SOP)
4) Templates/checklists (Markdown)
5) Common pitfalls
6) Next steps (internal links to Directory/Tools/Downloads)

### 4.2 Markdown frontmatter

Minimum fields (validated by `code/content.config.ts`):
```yaml
---
title: "Title (required)"
description: "One-line summary (optional)"
tags: ["tag1", "tag2"]
updatedAt: "2026-03-10"
---
```

### 4.3 Directory entry schema

Each entry is a JSON file under `code/content/directory/` and must match `code/content.config.ts`:
```json
{
  "category": "provider",
  "name": { "zh": "OpenAI", "en": "OpenAI" },
  "description": { "zh": "…", "en": "…" },
  "website": "https://…",
  "docs": "https://…",
  "tags": ["api", "llm"]
}
```

Quality bar:
- Prefer official links (website/docs/pricing).
- Keep descriptions short and practical.
- Use stable tags (for future filters/search).

### 4.4 Web research notes

When you “search the web and enrich content”:
- Save key links + notes to `docs/research/YYYY-MM-DD-<topic>.md`
- Write the guide in your own words (avoid copying long passages)
- For fast-changing info (pricing/limits/policies), link to the official page rather than hardcoding numbers

## 5. Build and deploy

- Install: `pnpm -C code install`
- Generate static site: `pnpm -C code generate`
- Output: `code/.output/public`

Deployment is via GitHub Actions using `wrangler pages deploy` (Cloudflare Pages).

Important: **Workers (`wrangler deploy`) and Pages (`wrangler pages deploy`) are different products/targets.**

See `docs/deploy/cloudflare-pages.zh-CN.md` for details and troubleshooting.

