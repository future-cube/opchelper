---
title: "Cursor 使用教程（入门版）：.cursorignore、项目规则与“可控索引”"
description: "让 Cursor 更像“懂你项目的同事”：该读什么、不读什么、如何避免泄露与误改。"
tags: ["cursor", "editor", "ide", "rules", "security"]
updatedAt: "2026-03-10"
---

Cursor 的强项是“在 IDE 里结合项目上下文做协作”。  
它的关键配置是：**你要明确告诉它哪些文件不要读**。

## 1）官方文档入口

- Cursor Docs：`https://docs.cursor.com/`
- `.cursorignore`：`https://docs.cursor.com/context/ignore-files`

## 2）第一件事：写好 `.cursorignore`

你可以把它当成“AI 的 .gitignore”。建议至少包含：

```text
.env
**/*.pem
**/*.key
node_modules/
.output/
.nuxt/
dist/
```

原则：
- 先保守：宁可不读，也不要误读
- 再逐步放开：确认安全后再放开特定目录

## 3）第二件事：建立“项目规则”

目标：让它每次都按同一套标准做事，例如：
- 默认中文输出（中文项目）
- 先给计划，再改动
- 不做大范围重构（除非明确要求）
- 所有改动必须可回滚（小步 commit）

## 4）下一步

- AI 工具导航：`/zh/directory`
- 本项目规则：`/AGENTS.md`

