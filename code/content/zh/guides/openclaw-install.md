---
title: "OpenClaw 安装与初始化：从零到可运行（含安全检查）"
description: "基于官方文档：如何安装 OpenClaw、验证安装是否成功，以及一人公司如何用“隔离目录 + 最小权限”安全开始。"
tags: ["openclaw", "installation", "security", "workflow"]
updatedAt: "2026-03-10"
---

> 本文以 OpenClaw 官方文档为准：`https://docs.openclaw.ai/`  
> 由于安装方式与脚本可能随版本变化，请把“本文当成流程”，把“命令以官方为准”。

## 目标

读完你可以：
- 安装并验证 OpenClaw 是否可运行
- 用更安全的一人公司方式初始化（隔离目录、避免读到密钥）
- 知道遇到问题该从哪里排查

## 1）先做安全准备（强烈建议）

OpenClaw 属于“可执行动作的代理/工作流工具”。一人公司建议先做这 3 件事：

1. **用专用目录**：不要在你的主项目目录、客户项目目录直接跑  
2. **避免读取密钥**：不要让它能看到 `.env`、SSH key、浏览器 Cookie  
3. **从只读任务开始**：先做“收集/总结”，再做“写入/执行”

一个最简单的做法：

```bash
mkdir -p ~/opc/openclaw-lab
cd ~/opc/openclaw-lab
```

## 2）官方安装方式（推荐从官方入口进入）

- 官网：`https://openclaw.ai/`
- 安装页：`https://docs.openclaw.ai/install/`
- Quickstart：`https://docs.openclaw.ai/quickstart/`

官方安装页提供了脚本安装方式（例如通过 `curl ... | sh` 形式）。  
**建议你在执行前先打开脚本 URL 看一眼内容**，确认没有可疑行为（例如写入未知路径、下载未知二进制来源等）。

## 3）验证安装成功（最小检查清单）

安装后，做 3 个检查：

1) **命令是否存在**
```bash
# 官方文档中 CLI 二进制名通常是 `claw`（以安装页为准）
command -v claw && claw --help
```

2) **版本/帮助信息能否输出**
```bash
claw --version || true
claw --help
```

3) **在空目录跑一个只读任务**
- 先尝试“读取一个本地 Markdown 文件 → 总结”
- 再尝试“抓取一个公开网页 → 输出摘要到本地文件”

> 重要：第一次跑“会写入/会删除”的任务之前，先确认你理解它会改哪里（输出目录/日志/缓存）。

## 4）一人公司推荐的目录与数据隔离方式

你可以用“输入/输出分离”避免混乱：

```text
~/opc/openclaw-lab/
  inputs/      # 你手工放进去的资料
  outputs/     # OpenClaw 的产出（文章/清单/总结）
  logs/        # 日志（如果有）
  scratch/     # 临时文件
```

同时，把你的真实项目仓库（例如客户项目）和实验目录分开：
- 实验目录只做“验证工作流”
- 验证通过后，再把输出（例如 Markdown）拷贝回真实仓库

## 5）下一步（建议顺序）

- 10 分钟上手一个最短闭环：`/zh/guides/openclaw-quickstart`
- 建立安全边界：`/zh/guides/openclaw-safety`
- 直接抄作业：3 条一人公司工作流模板：`/zh/guides/openclaw-workflows`
