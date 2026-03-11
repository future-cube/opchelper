---
title: "OpenCode（opencode）工作流：把 CLI 里的多步任务变成可复用 SOP"
description: "基于官方 CLI 文档：如何在仓库里稳定使用 OpenCode，包含规则文件、任务拆解、验证与提交节奏。"
tags: ["opencode", "cli", "agent", "workflow", "coding"]
updatedAt: "2026-03-10"
---

> 官方文档入口：`https://opencode.ai/docs/cli/`

OpenCode 的价值不在“写一段代码”，而在“把重复工作变成流程”。  
一人公司用它最容易踩的坑是：没有规则、没有验收、一次改太多。

## 1）先建立仓库规则（通用做法）

建议你在项目根目录写清楚：
- 不可触碰路径（secrets、大文件、产物）
- 输出语言偏好
- 验证命令
- 改动范围与提交策略

本仓库参考：
- `/AGENTS.md`

## 2）推荐的三段式任务拆解

把任何任务拆成三段，稳定性会高很多：

1) **读懂与确认**：总结现状、指出风险点  
2) **计划**：3–6 步最小计划（你确认）  
3) **执行**：一次只做 1 步 + 给出验证命令  

可复制提示词：
```text
先总结现状，然后给最小计划（3–6 步）。我确认后你再执行第 1 步。
每一步都要：最小 diff + 验证命令 + 预期结果。
```

## 3）把结果沉淀为“可复用资产”

一人公司越做越轻松，靠的是沉淀：
- 把 SOP 写进 Guides（教程）
- 把可复用文本写进 Downloads（模板/清单）
- 把工具入口写进 Directory（官方链接 + 适合谁）

对应本项目目录：
- Guides：`code/content/zh/guides/*.md`
- Downloads：`code/public/downloads/**`
- Directory：`code/content/directory/*.json`

## 4）下一步

- OpenCode 入门：[`/zh/guides/opencode-cli-starter`](/zh/guides/opencode-cli-starter)
- AI 工具地图：[`/zh/guides/ai-coding-tools-map`](/zh/guides/ai-coding-tools-map)
- 资源导航：[`/zh/directory`](/zh/directory)

