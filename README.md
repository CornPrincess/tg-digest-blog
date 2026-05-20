# tg-digest-blog

[tg_chat_tool](https://github.com/CornPrincess/tg_chat_tool) 每日生成的 Telegram 群组摘要的展示前端。

- **构建**：[Astro](https://astro.build) 4.x，content collections
- **部署**：[Cloudflare Pages](https://pages.cloudflare.com)，静态托管，免费层
- **内容来源**：tg_chat_tool 的 `staticPublisher` 模块以 `git push` 写入 `src/content/posts/`，CF Pages 监听 push 自动重建
- **域名**：[bivwregb.online](https://bivwregb.online)（待 DNS 切到 Cloudflare 后生效）

## 目录结构

```
src/
├── content/
│   ├── config.ts                # 文章 frontmatter schema
│   └── posts/                   # 文章存放目录（每日 push）
│       └── YYYY-MM-DD-<chat>.md
├── layouts/Layout.astro         # 基础布局 + 中文样式
├── pages/
│   ├── index.astro              # 文章列表
│   ├── posts/[...slug].astro    # 详情页
│   └── rss.xml.ts               # RSS 订阅源
└── styles/global.css
```

## 本地开发

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # 构建到 dist/
pnpm preview  # 本地预览构建产物
```

## 部署到 Cloudflare Pages

一次性设置：

1. 登录 Cloudflare → Workers & Pages → Create application → Pages → Connect to Git → 选择 `CornPrincess/tg-digest-blog`
2. **Build configuration**：
   - Framework preset：`Astro`
   - Build command：`pnpm build`
   - Build output directory：`dist`
   - Root directory：`/`（默认）
3. **Environment variables**：留空（本站不需要 secret）
4. Deploy。第一次会构建约 1-2 分钟。

DNS 接管：

1. Cloudflare → Websites → Add a site → `bivwregb.online`
2. 把域名注册商的 NS 改成 Cloudflare 给出的两个
3. CF 接管后，进入 tg-digest-blog 项目 → Custom domains → Set up a custom domain → `bivwregb.online`
4. CF 自动签发证书 + 路由到 Pages

之后每次 tg_chat_tool push 新摘要，CF Pages 自动重建（通常 < 1 分钟），无需任何手动操作。

## frontmatter schema

由 [src/content/config.ts](src/content/config.ts) 强校验。`tg_chat_tool` 的 `staticPublisher` 严格按此格式写入：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | ✓ | 文章标题 |
| `date` | `YYYY-MM-DD` | ✓ | 摘要对应的日期 |
| `chat` | string | ✓ | 群 slug |
| `tags` | string[] | | 默认 `[]` |
| `summary` | string | | 列表页 excerpt |
| `source` | string | | 默认 `tg-digest` |

修改 schema 必须同步更新 [tg_chat_tool/src/publisher/staticBlog.ts](https://github.com/CornPrincess/tg_chat_tool/blob/main/src/publisher/staticBlog.ts) 的 frontmatter 生成器，否则 CF Pages 构建会失败。
