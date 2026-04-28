import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/consts";
import { entryToPostListItem } from "@/libs/posts";

export async function GET(context) {
  const entries = await getCollection("posts");
  const posts = entries
    .map(entryToPostListItem)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.date,
      description: post.excerpt,
      link: `/blog/${post.id}/`,
    })),
  });
}
