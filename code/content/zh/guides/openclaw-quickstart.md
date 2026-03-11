---
title: "OpenClaw 教程（1）：10 分钟上手一个可复用的工作流"
description: "从 Quickstart 开始：安装、基本概念、最小可行工作流（内容/资料收集/批处理）。"
tags: ["openclaw", "automation", "workflow", "agent"]
updatedAt: "2026-03-10"
---

> 说明：OpenClaw 这类“能在本地执行动作”的代理工具，强大但也更需要安全边界。本文以官方 Quickstart 为准，并给出更稳妥的一人公司上手方式。

## 1）官方入口（建议收藏）

- 官网：`https://openclaw.ai/`
- Quickstart：`https://docs.openclaw.ai/quickstart/`

## 2）先做安全准备（强烈建议）

在你第一次跑任何“可执行代理”之前，建议先做 3 件事：

1) **新建专用工作目录**（不要在主仓库/主目录直接跑）  
2) **确认不会读取到密钥**（`.env`、SSH key、浏览器 cookie 等）  
3) **先从只读任务开始**（先收集/总结，再执行修改/删除）

## 3）最小可行工作流（MVP）：资料收集 → 总结 → 输出

一人公司最常见的重复任务是“信息收集与整理”。推荐从这个 MVP 开始：

1) 定义问题：我现在要解决什么？（一句话）  
2) 收集来源：优先官方文档/产品页/定价页/FAQ  
3) 结构化输出：写成一篇 Guide 或一条 SOP  

你可以把输出写进本项目结构：
- Directory：`code/content/directory/*.json`
- Guides：`code/content/zh/guides/*.md`

## 4）下一步

- 安全与边界：[`/zh/guides/openclaw-safety`](/zh/guides/openclaw-safety)
- AI 工具导航：[`/zh/directory`](/zh/directory)

