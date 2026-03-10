# AI / LLM 工具导航与教程 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship a complete “大模型/AI 工具导航与教程”模块（中文优先 + 英文摘要），重点补齐 OpenClaw + 各类 AI 编程编辑器/CLI（Codex CLI、Claude Code、Cursor、opencode、Gemini CLI 等）以及主流模型服务提供商/中转平台导航。

**Architecture:** Nuxt 4 static-first. Content lives in `code/content/**` (Nuxt Content collections) and is generated with `pnpm -C code generate` into `code/.output/public` for Cloudflare Pages. No backend in v1.

**Tech Stack:** Nuxt 4, Vue 3, `@nuxt/content`, `@nuxtjs/i18n`, Tailwind, pnpm.

---

### Task 1: 建立研究笔记（只记链接 + 变化点）

**Files:**
- Create: `docs/research/2026-03-10-ai-tools-sources.md`

**Step 1: 收集官方链接（重点）**
- OpenClaw：官网/文档/安装/示例
- OpenAI Codex / Codex CLI：官方文档、安装方式、示例
- Anthropic Claude Code：官方文档、安装方式、项目工作流
- Cursor：官方文档（Rules、Projects、Context）
- opencode：项目主页/文档
- 其他：Gemini CLI、GitHub Copilot、Continue、Aider、Cline、Roo Code 等

**Step 2: 用“变化点”写法记录**
- 只记录：产品定位、关键能力、安装入口、官方文档入口、常见坑
- 对于会变的内容（价格、配额、模型列表）只给“如何验证”的链接

**Step 3: Commit**
```bash
git add docs/research/2026-03-10-ai-tools-sources.md
git commit -m "docs(research): ai tools sources"
```

---

### Task 2: 扩充 Directory（优先官方入口）

**Files:**
- Create/Modify: `code/content/directory/*.json`

**Step 1: Provider（模型供应商）补齐**
- OpenAI、Anthropic、Google AI (Gemini)、Mistral、Cohere、xAI、DeepSeek、Qwen/通义、智谱等

**Step 2: Gateway（中转/聚合）补齐**
- 选择 5–10 个典型：强调“计费/地区/稳定性/合规/风控”维度（描述用自己的话）

**Step 3: Tool（客户端/IDE/CLI）补齐**
- Codex CLI、Claude Code、Cursor、GitHub Copilot、Continue、Aider、Cline、Roo Code、OpenClaw、n8n 等

**Step 4: Validate JSON**
Run:
```bash
node - <<'NODE'
const fs = require('fs'); const path = require('path');
const dir = path.join(process.cwd(), 'code/content/directory');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
for (const f of files) JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
console.log('OK:', files.length);
NODE
```

**Step 5: Commit**
```bash
git add code/content/directory
git commit -m "content(directory): expand ai tools + providers + gateways"
```

---

### Task 3: 写 OpenClaw 教程（中文主文 + 英文摘要）

**Files:**
- Create (ZH):
  - `code/content/zh/guides/openclaw-install.md`
  - `code/content/zh/guides/openclaw-workflows.md`
  - `code/content/zh/guides/openclaw-troubleshooting.md`
- Create (EN summaries):
  - `code/content/en/guides/openclaw-install.md`
  - `code/content/en/guides/openclaw-workflows.md`
  - `code/content/en/guides/openclaw-troubleshooting.md`

**Step 1: ZH 文章必须可执行**
- 目标 → 前置准备 → 安装/配置 → 典型工作流 → 常见坑
- 每篇末尾加“下一步”（链接到 Directory / Downloads / 相关 Guides）

**Step 2: EN 写摘要**
- 允许短，但不能空；保留命令、文件名等关键细节

**Step 3: Commit**
```bash
git add code/content/zh/guides code/content/en/guides
git commit -m "content(guides): openclaw tutorials (zh/en)"
```

---

### Task 4: 写 AI 编程编辑器/CLI 教程（Codex / Claude Code / Cursor / opencode）

**Files:**
- Create/Expand (ZH):
  - `code/content/zh/guides/codex-cli-advanced.md`
  - `code/content/zh/guides/claude-code-workflow.md`
  - `code/content/zh/guides/cursor-project-setup.md`
  - `code/content/zh/guides/opencode-cli-workflow.md`
- Create EN summaries with same slugs under `code/content/en/guides/`

**Step 1: 每篇至少包含**
- 适合谁/不适合谁
- 安装入口（官方）+ 最小可用示例
- “一人公司”场景：写内容、写代码、做交付、做自动化
- 规则文件/项目约束（例如：`AGENTS.md`、`CONTRIBUTING.md`、提示词结构）

**Step 2: Commit**
```bash
git add code/content/zh/guides code/content/en/guides
git commit -m "content(guides): ai coding editors + cli workflows"
```

---

### Task 5: 增加可下载资源（cheatsheet / 模板）

**Files:**
- Create public downloads:
  - `code/public/downloads/cheatsheets/ai-coding-checklist.md`
  - `code/public/downloads/cheatsheets/cli-shortcuts.md`
- Create content pages (ZH/EN) under `code/content/{zh,en}/downloads/` with `downloadUrl`

**Step 1: Commit**
```bash
git add code/public/downloads code/content/zh/downloads code/content/en/downloads
git commit -m "content(downloads): ai tools cheatsheets"
```

---

### Task 6: 构建验证并发布

**Step 1: Static build**
Run:
```bash
pnpm -C code generate
```
Expected: success; output under `code/.output/public`.

**Step 2: Push**
Run:
```bash
git push origin main
```

