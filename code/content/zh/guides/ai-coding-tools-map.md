---
title: "AI 编程工具地图：编辑器内 vs CLI vs 网关/观测（怎么选）"
description: "从一人公司角度选 AI 编程与 LLM 工具：先把交付做稳，再谈花活。"
tags: ["ai-tools", "coding", "llm", "gateway", "observability"]
updatedAt: "2026-03-10"
---

你会看到越来越多的 AI 编程工具：Cursor、Codex、Claude Code、OpenCode、Gemini CLI……  
一人公司选工具最容易犯的错是：**追新工具，而不是补齐交付能力**。

这篇给你一张“工具地图”，帮助你按优先级选。

---

## 1）先分清三层：写代码、连模型、把系统跑稳

### 第 1 层：写代码（IDE/CLI）

目标：让你更快写出正确的代码与文档。

典型工具：
- IDE：Cursor、Windsurf、VS Code + Copilot（`/zh/directory`）
- CLI：Codex、Claude Code、OpenCode、Gemini CLI、Aider（`/zh/directory`）

补充：如果你偏 VS Code 生态，也可以关注“VS Code 代理型扩展”：
- Cline、Roo Code（`/zh/directory`）

### 第 2 层：连模型（供应商/聚合/网关）

目标：让你的“模型调用”可控（成本、可用性、回退）。

典型工具：
- 直连供应商：OpenAI / Anthropic / Google / DeepSeek / 等（`/zh/directory`）
- 聚合/中转：OpenRouter（`/zh/directory`）
- 网关/代理：Cloudflare AI Gateway、LiteLLM（`/zh/directory`）

### 第 3 层：跑稳（观测/评测/回归）

目标：你要能回答“为什么慢/为什么贵/为什么错/哪里坏了”。

典型工具：
- 观测：Langfuse / Helicone
- 评测：promptfoo

---

## 2）一人公司推荐的选型顺序（最小可行）

1) 先选 1 个 IDE/CLI 工具（你每天都用的那个）  
2) 再选 1 个主力模型供应商跑通场景  
3) 再加 1 个网关/聚合作为备份（回退/比价/路由）  
4) 最后补观测与评测（规模上来必须做）

> 经验：一人公司最先要跑稳的是“交付闭环”。  
> 你可以先用一个成熟工具（例如 Codex/Claude Code/Cursor）把“读仓库 → 小步改动 → 验证 → 提交”练熟，再去追新工具。

---

## 3）你可以这样开始（复制即用）

### A. 写一个“项目规则文件”

无论你用哪个工具，先写清楚：
- 不可触碰路径（secrets、大文件）
- 输出语言偏好（中文站中文优先）
- 验证命令（build/test）

本项目示例：
- `/AGENTS.md`

如果你需要一个可下载的执行清单：
- `/zh/downloads/ai-coding-checklist`

### B. 从一个最短闭环开始

例如：
issue → 修复 → 测试 → 发布

把它写成 SOP（以后每次都照做）：
- 先读：让工具总结现状与关键入口
- 再计划：3–6 步最小计划（你确认）
- 再改：一次只改一个点（最小 diff）
- 再验：给出命令 + 预期结果

---

## 4）下一步

- AI 工具导航：`/zh/directory`
- LLM 能力栈（交付级）：`/zh/guides/llm-stack-for-opc`
- Codex 进阶：`/zh/guides/codex-cli-advanced`
- Claude Code 工作流：`/zh/guides/claude-code-workflow`
- Cursor 项目落地：`/zh/guides/cursor-project-setup`
- OpenClaw 工作流：`/zh/guides/openclaw-workflows`
