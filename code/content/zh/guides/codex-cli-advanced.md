---
title: "Codex CLI 进阶：一人公司如何把“终端同事”用得稳定可控"
description: "基于官方安装方式与真实仓库工作流：权限边界、忽略规则、任务拆解、验证与提交节奏。"
tags: ["codex", "openai", "cli", "agent", "workflow"]
updatedAt: "2026-03-10"
---

> 官方参考（建议收藏）：
> - Codex CLI 安装：`https://help.openai.com/en/articles/11096431-installing-codex-cli`
> - Codex CLI 快速开始：`https://help.openai.com/en/articles/11096445-getting-started-with-codex-cli`
> - Codex CLI 鉴权：`https://help.openai.com/en/articles/11096450-authenticating-codex-cli`

## 1）先澄清：一人公司用 Codex 的正确目标

目标不是“让它替你写完所有代码”，而是让它成为：
- 能读懂仓库并总结关键入口的同事
- 能按你的规则改一小段并提供验证步骤的同事
- 能把重复任务（文档整理、目录梳理、脚手架）变成流程的同事

## 2）安装与更新（以官方为准）

官方推荐用 npm 全局安装（命令可能随版本变化，请以官方文档为准）：

```bash
npm i -g @openai/codex
codex --help
```

更新：
```bash
npm i -g @openai/codex@latest
```

## 3）“可控”三件套：规则文件 + 忽略规则 + 验证命令

### A. 规则文件（建议用通用的 `AGENTS.md`）

你希望它每次都遵守什么？
- 输出语言（中文站中文优先）
- 不允许触碰的路径（密钥/大文件/产物）
- 改动范围（一次一个点、小步提交）
- 验证命令（build/test/lint）

本仓库示例：
- `/AGENTS.md`

### B. 忽略规则（避免泄露与噪音）

无论你用哪种工具，都建议忽略：

```text
.env
**/*.pem
**/*.key
node_modules/
.nuxt/
.output/
dist/
```

### C. 验证命令（每次任务必须带）

对 Nuxt SSG 项目，最基础的验证是：
```bash
pnpm -C code generate
```

## 4）最稳的工作流：先读 → 再计划 → 再小步改动

你可以把对话固定成四段：

1) **读懂现状**：让它总结目录结构与关键入口  
2) **给计划**：列出 3–6 步最小计划（你确认）  
3) **做最小改动**：一次只改 1 个点  
4) **验证并解释**：输出验证命令与预期结果

可复制的提示词（适合开工）：

```text
目标：……
约束：只做最小改动；不要触碰 secrets；不要引入新依赖（除非必要）。
交付物：计划（分步骤）+ 最小 diff + 验证命令（含预期结果）。
```

## 5）下一步

- 快速上手：`/zh/guides/codex-cli-quickstart`
- AI 工具地图（怎么选）：`/zh/guides/ai-coding-tools-map`
- 模型/网关导航：`/zh/directory`

