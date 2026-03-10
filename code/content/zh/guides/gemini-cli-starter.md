---
title: "Gemini CLI 入门：GEMINI.md 项目上下文与扩展机制"
description: "如何把 Gemini CLI 用在真实仓库：项目上下文、扩展与常见工作流（以官方文档为准）。"
tags: ["gemini", "google", "cli", "agent", "coding"]
updatedAt: "2026-03-10"
---

Gemini CLI 是一个偏终端的 AI 代理/助手。建议以官方文档为准：
- GitHub：`https://github.com/google-gemini/gemini-cli`
- 文档站：`https://google-gemini.github.io/gemini-cli/`
- 官方介绍（Blog）：`https://blog.google/technology/developers/introducing-gemini-cli-open-source-ai-agent/`

## 1）为什么它对一人公司有用？

因为它适合把“多步任务”做成流程，例如：
- 从 issue/需求 → 读仓库 → 生成改动计划 → 输出 diff → 你审核
- 从资料链接 → 提取要点 → 生成结构化文档

## 2）最重要的习惯：把项目上下文写进仓库

很多工具都支持“项目规则/上下文文件”。  
在 Gemini CLI 里，你会看到 `GEMINI.md` 的概念（以官方文档为准）。

建议你把这些写进去：
- 目录结构与关键入口
- 不可触碰路径（secrets、大文件）
- 输出语言偏好（中文站中文优先）
- 验证命令（build/test）

## 3）下一步

- AI 工具导航：`/zh/directory`

