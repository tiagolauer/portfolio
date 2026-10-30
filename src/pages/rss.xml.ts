import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { SITE } from "../config/site";
import { getVisiblePosts, postPath } from "../lib/posts";

export async function GET(context: APIContext): Promise<Response> {
  if (!context.site) {
    throw new Error("The RSS feed needs `site` set in astro.config.mjs");
  }

  const posts = await getVisiblePosts();

  return rss({
    title: `${SITE.name}'s blog`,
    description: `Writing by ${SITE.name}.`,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postPath(post),
      categories: post.data.tags,
    })),
  });
}
