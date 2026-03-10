# OPC Helper

OPC Helper（One Person Company Helper）是一个面向“希望一人就能运营一家公司”的学习与资源网站：
- **学习（Guides）**：教程/路线图/能力地图（自媒体、虚拟资料、服务交付、AI 等）
- **导航（Directory）**：大模型供应商、聚合/中转平台、工具导航
- **工具（Tools）**：把方法落地成可复制的文档模板（v1 先做本地生成）

本仓库采用“源码与文档分离”的结构，便于理解和后续演进：
- `code/`：网站源码（Nuxt + Vue + SSG）
- `docs/`：运营策略、计划、研究资料

## 本地开发

要求：Node.js 20+，pnpm。

```bash
pnpm -C code install
pnpm -C code dev
```

## 测试与构建

```bash
pnpm -C code generate
pnpm -C code preview
```

## Cloudflare Pages 发布

推荐方式：使用 GitHub Actions 自动部署到 Cloudflare Pages（每次 push 到 `main` 自动部署），配置说明见：
- `docs/deploy/cloudflare-pages.zh-CN.md`

本仓库默认使用 workflow：`.github/workflows/cloudflare-pages.yml`，用 `wrangler pages deploy` 直接上传静态产物（`code/.output/public`）。

你需要在 GitHub 仓库里配置 Secrets：
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

如果你改用 Cloudflare Pages 的 “Git 集成构建”（而不是 GitHub Actions），建议设置：
- **Root directory**：`code`
- **Build command**：`pnpm install --frozen-lockfile && pnpm generate`
- **Build output directory**：`.output/public`
- **Node version**：20+

如果需要更详细的运营方案，请看：
- `docs/ops/operations-plan.zh-CN.md`
