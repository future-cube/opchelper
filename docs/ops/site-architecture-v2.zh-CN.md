# OPC Helper（v2）网站架构方案与运营策略（Nuxt + Cloudflare Pages）

> 本文目标：把站点从“工具站”升级为“**一人公司能力学校 + 资源导航 + 工具与下载**”。
> v1 先不引入后台管理系统，全部本地开发、Git 管理内容；但技术选型必须为未来的“管理功能/CMS”留好演进路径。

## 1. 站点定位与信息架构（IA）

### 1.1 面向人群（Who）
- 想用 1 人（或 1–3 人）运营公司的人：自媒体、虚拟资料、咨询、外包、微产品/工具、AI 工作流等。

### 1.2 他们需要什么（What）
按“能力学校”的方式组织内容，而不是按“工具集合”组织：
- **能力**：定位、获客、内容、转化、交付、回款、复盘、增长
- **行业打法**：自媒体、虚拟资料、服务/咨询、外包、微产品、AI 自动化
- **资源导航**：大模型供应商、中转/聚合平台、工具与教程网站
- **下载**：模板包、清单包、工具安装包（逐步补齐）

### 1.3 站点模块（How）
建议 v2 的核心导航就是 4 栏：
1. **学习 Guides**（最重要）：教程、路线图、能力地图、案例拆解
2. **手册 Playbooks**：按行业/业务类型输出“从 0 到 1 的 SOP”
3. **导航 Directory**：带标签、筛选、说明的资源导航
4. **工具 Tools + 下载 Downloads**：把方法落地成可复制模板 + 资料包

## 2. 技术选型：为什么选 Nuxt（Vue）而不是 ThinkPHP + Vue

你擅长：PHP > Python > Node.js，前端：Vue/Angular。你提出 ThinkPHP + Vue 很合理，但在 Cloudflare Pages 的约束下需要权衡。

### 2.1 本阶段（v1/v2）最优解：Nuxt SSG（静态生成）

**选择：Nuxt（Vue）+ SSG（`nuxt generate`）部署到 Cloudflare Pages。**

理由：
- **SEO 友好**：SSG 构建时生成完整 HTML，天然适合教程/导航站。
- **低成本部署**：Cloudflare Pages 托管静态文件最稳，发布快、成本低。
- **后续可演进**：将来要管理功能，可逐步引入 Pages Functions/Workers 或 Headless CMS，而不需要推倒重来。

### 2.2 你担心的点逐条回答

#### Q1：Vue 也能做 SEO 吗？
可以，但要用 **Nuxt（SSG/SSR）**，而不是纯 SPA（Vue + Vite）。

#### Q2：先只做前端，后端不开发可以吗？
可以。v2 先做内容系统 + 导航 + 工具（前端本地生成），不需要任何后端与密钥。

#### Q3：未来要“管理系统/CMS”怎么办？
预留三条演进路线（从轻到重）：
1. **Git 内容驱动（现在）**：Markdown/JSON 写在仓库里，最省事。
2. **Headless CMS（中期）**：内容放到 CMS，Nuxt 通过 API 拉取（仍可 SSG 或增量更新）。
3. **自建管理（后期）**：Cloudflare Workers/Pages Functions + D1/KV/R2 实现账号、收藏、学习进度、下载权限等。

ThinkPHP 的位置：如果未来你非常确定要“传统后台管理 + 数据库 + 审核流”，可以把 ThinkPHP 作为独立后台服务部署到其他平台（或 Cloudflare 的容器/Workers 方向），前端仍由 Nuxt 负责渲染与 SEO。

## 3. 仓库结构约定（你要求的 code/ + docs/）

根目录只保留仓库级文件与文档：
- `code/`：Nuxt 源码（站点本体）
- `docs/`：运营策略、研究资料、开发计划
- `README.md`、`.gitignore`、`AGENTS.md`：仓库级说明与规则

## 4. Cloudflare Pages 部署配置（GitHub → Pages）

由于源码在 `code/`，需要 Cloudflare Pages 做一次 monorepo 配置：
- **Root directory**：`code`
- **Build command**：`pnpm generate`
- **Build output directory**：`.output/public`
- **Node version**：建议 20+

说明：
- `pnpm install` 会在构建环境自动执行（Cloudflare 会根据 `package.json`/lockfile 安装依赖）。
- 静态产物输出到 `.output/public`，Pages 直接托管该目录即可。

## 5. SEO 设计要点（要做“学校”必须重视）

v2 最小 SEO 要素清单：
- 每篇 Guide/Playbook 都有唯一 URL、标题、描述（frontmatter）
- 目录页（Directory）可被索引（不要纯客户端渲染）
- 内链体系：Guide → Directory → Tools（互相引用）
- 未来补齐：`sitemap.xml`、`robots.txt`、结构化数据（文章/目录）

## 6. 内容策略（与运营结合）

### 6.1 内容节奏（可执行）
- 每周 2 篇短 Guide（问题/清单/模板）
- 每两周 1 篇长 Guide（方法 + 案例 + SOP）
- 每周维护一次 Directory（新增 3–10 个条目，带标签/说明）

### 6.2 “赚钱方案/能力/资讯”怎么承载
建议以三层结构承载：
1. **能力（Skills）**：通用能力教程（定位、获客、交付等）
2. **行业（Tracks）**：不同行业的一人公司打法（自媒体/虚拟资料/服务/外包/工具）
3. **方案（Plans）**：可复制的“30 天行动计划/90 天路线图”（强转化内容）

## 7. 现阶段落地范围（已实现的 v2 雏形）

目前代码已搭好：
- `/zh/*` 与 `/en/*` 双语路由（前缀策略）
- Guides：从 `code/content/*` 读取 Markdown 并生成列表与详情页
- Directory：从 `code/content/directory/*.json` 读取条目，按分类展示
- Tools：保留模板生成器（Vue 版本），作为“落地工具”
- Downloads：先提供结构页，后续逐步补齐可下载内容

下一步就是：继续补齐内容与导航条目（尤其是你列举的各行业玩法、工具教程、LLM 供应商/中转平台全量导航）。

