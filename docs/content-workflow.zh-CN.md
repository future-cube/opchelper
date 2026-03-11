# 内容工作流（本地写作 + AI 友好）

> 目标：在不引入 CMS/数据库的前提下，让内容更新 **低门槛、可审计、可自动发布**，并且让 AI/Agent 能快速知道“我们有什么/缺什么”。

## 1）我们为什么先用 Markdown/JSON

当前阶段的核心约束：
- 单人运营，允许构建后上线
- 部署在 Cloudflare Pages（静态托管）
- 希望 AI 能读懂我们已有内容

因此最合适的是“内容即代码（Content as Code）”：
- 内容在仓库里（可搜索、可 diff、可回滚）
- 构建生成静态 HTML（SEO 友好、成本低、稳定）

## 2）目录约定（内容在哪里）

- Guides（中文）：`code/content/zh/guides/*.md`
- Guides（英文摘要）：`code/content/en/guides/*.md`
- Playbooks（中文）：`code/content/zh/playbooks/*.md`
- Playbooks（英文摘要）：`code/content/en/playbooks/*.md`
- Downloads（中文）：`code/content/zh/downloads/*.md`
- Downloads（英文摘要）：`code/content/en/downloads/*.md`
- Directory（JSON 条目）：`code/content/directory/*.json`

模板（复制即用）：
- `code/content/_templates/guide.zh-CN.md`
- `code/content/_templates/guide.en.md`
- `code/content/_templates/download.zh-CN.md`
- `code/content/_templates/download.en.md`
- `code/content/_templates/directory-item.json`

## 3）写作规则（必须）

- 中文优先：`/zh/*` 尽可能中文（代码块/专有名词除外）
- 英文不可空：可以短，但不能空白
- 每篇必须“可执行”：目标 → SOP → 模板/清单 → 下一步
- 避免大段复制外部内容：用自己的话总结，并附官方链接

## 4）新增内容的最短流程（推荐）

1. 选题（一个明确问题）
2. 复制模板，写中文主文（SOP + 模板）
3. 写英文摘要（最少 8–15 行，保留命令/链接）
4. 在文末加 2 个站内链接（增强内链）
5. 本地验证：`pnpm -C code generate`
6. push 到 `main`（GitHub Actions 自动发布）

## 5）内容地图（给人类与 AI）

站点提供一个全局索引页：
- `/zh/content-map`
- `/en/content-map`

用途：
- 快速知道当前有哪些 Guides/Playbooks/Downloads/Directory
- 快速发现“哪个频道缺内容”

