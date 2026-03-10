# OPC Helper 项目手册（面向维护者/Agent）

> 目标：让任何新加入的维护者/Agent 在 **30 分钟内**理解：
> - 这个站点“是什么/给谁用/为什么存在”
> - 信息架构（IA）与内容分类
> - 如何新增/更新内容（中英双语、中文优先）
> - Cloudflare Pages 的部署方式与常见问题

## 0. 一句话定位

**OPC Helper = 一人公司能力学校 + 资源导航 + 可下载模板与工具。**

它服务的不是“想找某个工具的人”，而是“想用 1 个人把公司跑起来”的人：能获客、能交付、能回款、能复盘、能增长。

## 1. 目标用户（Who）

典型用户（1 人或 1–3 人小团队）：
- 个人自媒体/内容创作者（内容 → 转化 → 产品化）
- 咨询/服务/外包（线索 → 沟通 → 交付 → 回款）
- 虚拟资料/课程/会员（选题 → 制作 → 上架 → 复购）
- 微产品/独立开发（定位 → 发布 → 增长 → 支持）
- AI 自动化/工作流实践者（把工作变成可重复的 SOP）

## 2. 产品形态（What）

站点以 **“可执行”** 为第一原则：
- **Guides（学习）**：能力教程/方法论/清单/模板（SEO 主力）
- **Playbooks（手册）**：按行业/业务类型的“从 0 到 1 SOP”（系统化）
- **Directory（导航）**：大模型供应商、聚合/中转平台、工具与网站（可筛选）
- **Tools（工具）**：轻量的浏览器内工具（不需要密钥）
- **Downloads（下载）**：可直接下载的模板包/清单包（自制、可公开分发）

## 3. 信息架构（IA）与 URL 约定（How）

### 3.1 多语言路由

- 中文：`/zh/*`
- English：`/en/*`

原则：
- 中文站（`/zh`）尽可能使用中文 UI 文案（除代码块、专有名词）。
- 英文站（`/en`）保持可读性：允许是“简化版/摘要版”，但不能空白。

### 3.2 内容驱动（Nuxt Content）

内容存储在 git 里，站点用 Nuxt SSG 生成静态 HTML（SEO 友好）。

内容位置（当前）：
- 中文 Guides：`code/content/zh/guides/*.md`
- 英文 Guides：`code/content/en/guides/*.md`
- Directory：`code/content/directory/*.json`

集合定义：`code/content.config.ts`

## 4. 内容编辑规范（最重要）

### 4.1 Guides 写作模板（推荐）

每篇 Guide 建议包含：
1) **目标**：读完能做什么
2) **适用/不适用**：避免误导
3) **步骤**：可复制的 SOP（最好编号）
4) **模板/清单**：复制即用（Markdown）
5) **常见坑**：避免返工
6) **下一步**：链接到本网站其他页面（Directory/Tools/Downloads）

### 4.2 Frontmatter（Markdown 头部元信息）

Guides 的最小字段（受 `code/content.config.ts` 校验）：
```yaml
---
title: "标题（必填）"
description: "一句话说明（选填）"
tags: ["tag1", "tag2"]
updatedAt: "2026-03-10"
---
```

注意：
- `updatedAt` 用 `YYYY-MM-DD`
- 标签要稳定、可复用，避免同义词泛滥（例如统一用 `pricing` 而不是 `price`/`pricing-model` 混用）

### 4.3 目录（Directory）条目规范

Directory 是 JSON 数据集合（受 schema 校验），每个条目一份文件：
- 文件：`code/content/directory/<slug>.json`
- 推荐 slug：小写 + `-`，例如 `openai.json`、`aws-bedrock.json`

字段约定（必须符合 `code/content.config.ts`）：
```json
{
  "category": "provider",
  "name": { "zh": "OpenAI", "en": "OpenAI" },
  "description": { "zh": "一句话说明", "en": "One-line description" },
  "website": "https://...",
  "docs": "https://...",
  "tags": ["api", "llm"]
}
```

质量标准：
- 优先使用官方链接（官网/文档/定价页）。
- 描述控制在 1–2 句，强调“适合谁/能解决什么问题”。
- Tags 用于后续筛选/搜索（宁少勿乱）。

### 4.4 研究笔记（强烈建议）

当你需要“搜索网络补内容”时：
- 把关键链接与要点先记到 `docs/research/YYYY-MM-DD-<topic>.md`
- 内容写进 Guides/Playbooks 时用自己的话重写，避免大段搬运
- 对“会频繁变化”的信息（价格、额度、最新政策）只给出 **如何验证** 的入口链接，而不是写死数字

## 5. 技术架构与原理（给开发者）

### 5.1 为什么选 Nuxt（Vue）+ SSG

- Vue 生态（符合团队技能）
- SSG 生成静态 HTML：SEO、速度、部署成本最佳
- 后续可演进：需要管理/账号时，再引入 Pages Functions/Workers + D1/KV/R2

### 5.2 构建与产物目录

- 源码：`code/`
- 生成命令：`pnpm -C code generate`
- 静态产物：`code/.output/public`

## 6. 部署（Cloudflare Pages）

当前推荐的发布方式：**GitHub Actions → `wrangler pages deploy` → Cloudflare Pages**。

关键点：
- Worker（`wrangler deploy`）与 Pages（`wrangler pages deploy`）是两个不同目标，不要混用。
- 如果你在 Cloudflare Dashboard 上还连接了 Git 集成构建，建议断开或确保其构建命令正确，避免“看似成功但实际访问旧站点”。

部署细节见：`docs/deploy/cloudflare-pages.zh-CN.md`

## 7. 常见问题排查（FAQ）

### 7.1 “GitHub Actions 成功但线上没变化”

优先检查：
- 访问的是不是 Pages 的域名/绑定的自定义域名（而不是 Workers route）
- Pages 项目里 Production branch 是否是 `main`
- 是否存在 Worker route 截获了域名（`example.com/*`）

### 7.2 “中文站出现大量英文”

优先检查：
- 页面组件是否根据 `locale` 输出不同文案
- 是否写了英文-only 的 placeholder（建议补齐中文版本）

