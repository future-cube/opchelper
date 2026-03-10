---
title: "GitHub Copilot / VS Code Copilot Chat 入门：把“聊天”变成可交付流程"
description: "从一人公司视角：先做上下文与边界，再做可重复的工作流（读代码、写文档、修 bug、改配置）。"
tags: ["copilot", "github", "vscode", "coding", "workflow"]
updatedAt: "2026-03-10"
---

Copilot 最容易“看起来很强但落地很乱”。  
你需要把它变成 SOP：**输入清晰、边界明确、输出可验证**。

## 1）官方入口（建议收藏）

- Copilot 文档：`https://docs.github.com/en/copilot`
- VS Code Copilot Chat（Ask mode）：`https://code.visualstudio.com/docs/copilot/chat/chat-ask-mode`

## 2）一人公司三条关键边界

1) 不把密钥/客户资料带进上下文  
2) 不让它一次改太多（小步 diff）  
3) 每次输出必须可验证（build/test 命令）

## 3）建议的工作方式（复制即用）

### A. 读代码

提示词模板：
```text
请先解释这个项目的目录结构、入口文件与关键数据流。
只读，不要修改任何文件。
输出：1）关键入口 2）调用链 3）我应该从哪里开始阅读
```

### B. 修 bug

提示词模板：
```text
报错如下：……
请先定位 root cause，再给最小修复。
要求：给出 diff + 验证命令（以及预期结果）。
```

### C. 写文档（强烈推荐）

让它把你做过一次的操作沉淀成 SOP，例如部署、发布、回滚。

## 4）下一步

- AI 编程工具地图：`/zh/guides/ai-coding-tools-map`
- AI 工具导航：`/zh/directory`
