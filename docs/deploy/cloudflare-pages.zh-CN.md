# Cloudflare Pages 部署配置（opchelper）

本项目源码在 `code/`，使用 Nuxt SSG：`pnpm -C code generate`，静态产物位于 `code/.output/public`。

你有两种部署方式：

## 方式 A（推荐）：GitHub Actions 自动部署到 Cloudflare Pages

优点：不需要在 Cloudflare Dashboard 里配置构建；你只要把密钥放到 GitHub Secrets，之后每次 `push main` 自动发布。

### 1）在 Cloudflare 创建 API Token（最小权限）

建议创建 **专用 Token**（不要用 Global API Key）：
- 权限：Pages（Edit）相关权限
- 作用域：只选你的账号/项目需要的范围

创建好后，你会得到一个 Token（只显示一次，请保存好）。

### 2）获取 Cloudflare Account ID

常见获取方式：
- Cloudflare Dashboard → 右侧栏/账户信息里能看到 Account ID
- 或者本地安装/使用 Wrangler 后运行 `npx wrangler whoami`

### 3）在 GitHub 仓库里添加 Secrets

进入 GitHub 仓库：
`Settings` → `Secrets and variables` → `Actions` → `New repository secret`

添加：
- `CLOUDFLARE_API_TOKEN`：你刚创建的 API Token
- `CLOUDFLARE_ACCOUNT_ID`：你的 Account ID

### 4）触发部署

把这两个 secret 配好后，推送一次代码到 `main` 即会触发 Actions：
- workflow 文件：`.github/workflows/cloudflare-pages.yml`

部署成功后，Cloudflare Pages 会给你一个 `*.pages.dev` 域名。

> 注意：首次部署时如果 Cloudflare Pages 项目不存在，Wrangler 通常会自动创建；若失败，可在 Cloudflare Pages 里手工创建一个名为 `opchelper` 的项目后再重试。

## 方式 B：Cloudflare Dashboard 连接 GitHub（手工配置一次，之后自动构建）

如果你更希望完全由 Cloudflare 来构建：
- Root directory：`code`
- Build command：`pnpm generate`
- Build output directory：`.output/public`
- Node version：20+

这个方式同样可以做到 push 自动部署，但需要你在 Cloudflare Dashboard 里完成一次 Git 集成授权与项目创建。

