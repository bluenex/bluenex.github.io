import rss from "@astrojs/rss";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/consts";
import { getPostList } from "@/libs/posts";

dayjs.extend(customParseFormat);

export async function GET(context) {
  const posts = getPostList();
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.title,
      pubDate: dayjs(post.date, "DD-MM-YYYY HH:mm").toDate(),
      description: post.excerpt,
      link: `/blog/${post.id}/`,
    })),
  });
}
