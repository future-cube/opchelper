---
title: "Cursor 项目落地指南：如何让它“懂你项目”但不越界"
description: "从一人公司安全与效率出发：控制索引范围、写清项目规则、建立验证与小步提交习惯。"
tags: ["cursor", "editor", "ide", "rules", "security"]
updatedAt: "2026-03-10"
---

> 官方文档入口：`https://docs.cursor.com/`

Cursor 的体验很容易“越用越强，也越用越乱”。  
原因通常不是模型，而是：**上下文边界与规则没有固化**。

## 1）第一优先级：控制上下文（不要乱读）

Cursor 官方提供了忽略文件能力（类似 `.gitignore` 思路）：
- Ignore files 文档：`https://docs.cursor.com/context/ignore-files`

建议一开始保守一点，至少忽略：

```text
.env
**/*.pem
**/*.key
node_modules/
dist/
.nuxt/
.output/
coverage/
```

原则：
- 宁可不读，也不要误读
- 需要读某个目录时，再小步放开

## 2）第二优先级：把“项目规则”写成文件（所有工具通用）

别把规则写在脑子里。建议在仓库根目录固定一份：
- `AGENTS.md`（本仓库已有示例）

规则至少包含：
- 输出语言偏好（中文站中文优先）
- 不可触碰路径
- 改动范围：一次一个点、小步提交
- 必须提供验证命令与预期结果

## 3）第三优先级：强制“可验证”

一人公司最怕的是“改了一堆，结果线上出问题”。  
所以每次改动都要求它给出验证命令。

对 Nuxt SSG 项目：
```bash
pnpm -C code generate
```

## 4）下一步

- Cursor 入门（忽略规则）：[`/zh/guides/cursor-rules-starter`](/zh/guides/cursor-rules-starter)
- AI 工具地图：[`/zh/guides/ai-coding-tools-map`](/zh/guides/ai-coding-tools-map)
- 资源导航：[`/zh/directory`](/zh/directory)

