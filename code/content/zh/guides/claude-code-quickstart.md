---
title: "Claude Code 入门：终端里的代码助手（先配权限与忽略规则）"
description: "如何把 Claude Code 用在真实项目：官方入口、使用习惯、边界与对话模板。"
tags: ["claude-code", "anthropic", "coding", "cli", "agent"]
updatedAt: "2026-03-10"
---

Claude Code 适合做“仓库级协作”：理解代码、提出修改、辅助完成重复任务。  
但前提是：**先设边界，再谈效率**。

## 1）官方入口（以官方文档为准）

- 产品页：`https://www.anthropic.com/claude-code`
- 文档：`https://docs.anthropic.com/en/docs/claude-code/overview`

## 2）先做两件事：忽略规则 + 权限模式

### A. 忽略规则（不要让它读到密钥/大文件）

常见需要忽略：
- `.env`、密钥、证书
- 数据导出文件、日志、下载目录
- 构建产物与缓存目录

### B. 权限模式（第一次建议最小权限）

第一次建议：
- 先读 → 总结 → 给计划
- 你确认后再写入或执行命令

## 3）建议的“对话模板”（复制即用）

```text
目标：……
现象/报错：……
约束：不要改动 xxx；不要触碰 secrets；只做最小修改
交付物：分步骤计划 + 最小 diff + 验证命令
```

## 4）下一步

- 去 Directory 对比更多 AI 编码工具：[`/zh/directory`](/zh/directory)

