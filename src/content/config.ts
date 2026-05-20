import { defineCollection, z } from "astro:content";

// frontmatter 由 tg_chat_tool 的 staticPublisher 写入，schema 保持稳定。
// 任何变更需要同步更新发布器以避免破坏建构。
const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    /** ISO 日期串 YYYY-MM-DD */
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    /** 群 slug，例如 market_talk */
    chat: z.string(),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
    /** 来源标记，预留给未来多源场景 */
    source: z.string().default("tg-digest"),
  }),
});

export const collections = { posts };
