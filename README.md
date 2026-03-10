# OPC Helper

OPC Helper（One Person Company Helper）是一个面向“一人公司/自由职业者/独立开发者”的助手网站：
- **静态优先**：Cloudflare Pages 友好、访问快、成本低
- **工具导向**：在浏览器内生成可复制的 Markdown 模板（项目简报、报价、变更、催款、周复盘）
- **运营手册**：把获客/交付/回款/复盘沉淀成 SOP

## 本地开发

要求：Node.js 20+，pnpm。

```bash
pnpm install
pnpm dev
```

## 测试与构建

```bash
pnpm test
pnpm build
pnpm preview
```

## Cloudflare Pages 发布

推荐方式：把 GitHub 仓库连接到 Cloudflare Pages（每次 push 自动部署）。

在 Cloudflare Pages 创建项目时，设置如下：
- **Framework preset**：Astro（或选择 None）
- **Build command**：`pnpm build`
- **Build output directory**：`dist`
- **Node version**：建议 20+

如果需要更详细的运营方案，请看：
- `docs/ops/operations-plan.zh-CN.md`
