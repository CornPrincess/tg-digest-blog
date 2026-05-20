import { defineConfig } from "astro/config";

// Cloudflare Pages 部署时会自动检测此配置并跑 `pnpm build`。
// site 字段用于生成 sitemap / canonical / RSS 的绝对 URL；先设占位，等绑定域名后再改。
export default defineConfig({
  site: "https://bivwregb.online",
  trailingSlash: "never",
  build: {
    format: "directory",
  },
  markdown: {
    shikiConfig: {
      theme: "github-light",
      wrap: true,
    },
  },
});
