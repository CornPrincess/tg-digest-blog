import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("posts");
  return rss({
    title: "TG Digest",
    description: "Telegram 群组每日 AI 摘要",
    site: context.site!,
    items: posts
      .sort((a, b) => Date.parse(b.data.date) - Date.parse(a.data.date))
      .map((post) => ({
        title: post.data.title,
        pubDate: new Date(post.data.date),
        description: post.data.summary,
        link: `/posts/${post.slug}/`,
        categories: [post.data.chat, ...post.data.tags],
      })),
  });
}
