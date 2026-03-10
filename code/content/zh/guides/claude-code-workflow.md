---
title: "Claude Code 工作流：从“读仓库”到“可合并改动”（含提示词模板）"
description: "基于官方入口与真实项目经验：忽略规则、权限边界、任务拆解、验证与提交节奏。"
tags: ["claude-code", "anthropic", "cli", "agent", "workflow"]
updatedAt: "2026-03-10"
---

> 官方入口（建议收藏）：
> - 产品页：`https://www.anthropic.com/claude-code`
> - 文档：`https://docs.anthropic.com/en/docs/claude-code/overview`
> - Quickstart：`https://docs.anthropic.com/en/docs/claude-code/quickstart`

## 1）安装与启动（以官方为准）

官方 Quickstart 提供了安装方式（可能随版本变化）。  
如果它是脚本安装形式（例如 `curl ... | bash`），建议你先打开脚本链接看一眼内容，再执行。

安装后，一般可以直接运行：
```bash
claude --help
claude
```

## 2）忽略规则：先把“不能读”的写清楚

一人公司最常见事故不是“它写错了代码”，而是“它看到了不该看的”。

建议你为每个项目维护：
- secrets：`.env`、证书、密钥
- 大文件：数据导出、日志、视频/音频
- 产物：`dist/`、`.output/`、`.nuxt/`

同时，在项目根目录放一份规则文件（例如 `AGENTS.md`），把边界写死。

## 3）权限策略：从最小权限开始

推荐你按阶段放开：

1) 只读：读仓库、总结结构、提出计划  
2) 只写：允许改动少量文件，但不运行危险命令  
3) 可执行：允许运行构建/测试等命令  

## 4）提示词模板（复制即用）

### 模板 A：读仓库 + 给计划

```text
请先阅读仓库结构并总结关键入口（不做修改）。
然后给出一个最小可行计划（3–6 步），每一步说明：
- 要改哪些文件
- 为什么
- 怎么验证
约束：不要触碰 secrets；不要大重构；默认中文输出。
```

### 模板 B：做最小改动 + 可回滚

```text
按你刚才的计划执行第 1 步，要求：
- 只改动一个点
- 输出最小 diff
- 给出验证命令与预期结果
```

## 5）下一步

- 入门快速上手：`/zh/guides/claude-code-quickstart`
- 通用安全边界（所有代理工具适用）：`/zh/guides/openclaw-safety`
- AI 工具导航：`/zh/directory`

