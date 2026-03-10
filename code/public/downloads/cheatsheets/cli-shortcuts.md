# AI 编程 CLI 速查表（最小命令集）

> 注意：各工具命令/参数会随版本变化。以官方文档为准，这里只保留“最小可用”。

## OpenAI Codex CLI

- 安装（官方）：`npm i -g @openai/codex`
- 启动：`codex`
- 帮助：`codex --help`

参考：
- https://help.openai.com/en/articles/11096431-installing-codex-cli

## Claude Code

- 启动：`claude`
- 帮助：`claude --help`

参考：
- https://docs.anthropic.com/en/docs/claude-code/quickstart

## OpenCode（opencode）

- 启动：`opencode`
- 跑一次任务：`opencode run "你的任务描述"`
- 登录：`opencode auth login`
- 查看模型：`opencode models`

参考：
- https://opencode.ai/docs/cli/

## OpenClaw

- 启动（以安装结果为准）：`claw --help`

参考：
- https://docs.openclaw.ai/

## 通用建议（所有 CLI 都适用）

- 先读/总结再执行
- 一次只改一个点，小步提交
- 每次都给验证命令（build/test/lint）
