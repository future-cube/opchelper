# OPC Helper Operations Plan (v1)

> Audience: solo operators (or 1–3 person studios) who want a **repeatable system** to acquire customers, deliver reliably, get paid on time, and keep shipping — with minimal overhead.

## 1) Positioning (one-liner)

**OPC Helper = an operating system + “skill school” for one-person companies.**

It’s not just a toolbox. The site helps people execute with:
- actionable Guides (SEO backbone)
- structured Playbooks (SOPs per business model)
- a curated Directory (providers/gateways/tools)
- Downloads (templates/checklists)
- lightweight in-browser Tools (no secrets)

## 2) Core users and pain points

Typical users:
- creators (content → conversion → productization)
- consultants/freelancers (lead → scope → delivery → cashflow)
- digital product sellers (niche → packaging → delivery → repeat purchases)
- indie makers (launch → growth → support)
- AI workflow builders (repeatable SOPs)

Top pain points:
1. inconsistent lead generation
2. scope creep and delivery chaos
3. slow / unpredictable payments
4. scattered energy and no cadence

## 3) Content pillars (ship these first)

Operate the site as 4 lanes. Each lane should ship **Guides + Directory items + Downloads**:

1) **AI / LLM tools navigation & tutorials** (OpenClaw, Codex CLI, Claude Code, Cursor, opencode, providers & gateways)
2) **Creator monetization** (newsletter, sponsorship, digital products)
3) **Services delivery & cashflow** (contracts, change requests, acceptance, payment reminders)
4) **Digital downloads** (niche validation, pricing, delivery, retention)

## 4) Publishing cadence (minimum viable)

- 2 short posts/week (checklists, templates, problem/solution)
- 1 long post / 2 weeks (method + SOP + examples)
- weekly Directory maintenance (add 3–10 items, clean tags, verify official links)
- monthly Tools/Downloads refresh (2–4 additions)

## 5) Editorial workflow (static-first)

No CMS in v1. Use a consistent “git content” workflow:
1. Save official sources + change notes in `docs/research/YYYY-MM-DD-<topic>.md`
2. Write the Chinese guide in `code/content/zh/**` (actionable SOP)
3. Add a non-empty English summary in `code/content/en/**`
4. Add internal links (at least 2) to reinforce IA
5. Validate build: `pnpm -C code generate`, then push to `main`

## 6) Metrics (early stage)

North star (v1):
- weekly active usage (downloads + tools usage proxies)

Core funnel:
- visit → read/click directory → download/use tools → return → subscribe → pay (later)

