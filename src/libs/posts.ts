import dayjs from "dayjs";
import { readFileSync } from "fs";
import { glob } from "glob";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

interface MatterResultData {
  title: string;
  date: string;
  modified?: string;
  tags?: string[];
  thumbnail?: string;
}

export interface PostListItem extends MatterResultData {
  id: string;
  year: string;
  excerpt: string | undefined;
}

export interface PostData extends PostListItem {
  contentHtml: string;
}

const postsDirectory = path.join(process.cwd(), "src", "content", "posts");

const firstParagraphAsExcerpt = (f: { content: string; excerpt: string }) => {
  // excerpt may have link inside, we need to replace with normal text
  f.excerpt = f.content.split("\n")[1];

  const links = Array.from(
    f.excerpt?.matchAll(
      /(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,
    ) || [],
  );

  if (links.length > 0) {
    links.forEach((link) => {
      f.excerpt = f.excerpt.replace(link[0], link[2]);
    });
  }
};

export function getAllPostIds() {
  const fileNames = glob.sync(`${postsDirectory}/**/*.md`);

  // returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: '2015-12-24-new-blog'
  //     },
  //     ...
  //   },
  // ]
  return fileNames.map((fileName) => {
    const [id] = fileName.split("/").slice(-1);

    return {
      params: {
        id: id.replace(/\.md$/, ""),
      },
    };
  });
}

export function getPostList(): PostListItem[] {
  const fileNames = glob.sync(`${postsDirectory}/**/*.md`);

  const postList: PostListItem[] = fileNames.map((fileName) => {
    const [id] = fileName.split("/").slice(-1);
    const [year] = id.split("-");
    const filePath = path.join(postsDirectory, id);
    const fileContents = readFileSync(filePath, "utf8");

    const matterResult = matter(fileContents, {
      /** they have incorrect type here */
      // @ts-ignore
      excerpt: firstParagraphAsExcerpt,
    });

    return {
      id: id.replace(/\.md$/, ""),
      year,
      ...(matterResult.data as MatterResultData),
      excerpt: matterResult.excerpt,
    };
  });

  return postList.sort((a, b) => {
    return (
      dayjs(b.date, "DD-MM-YYYY HH:mm").unix() -
      dayjs(a.date, "DD-MM-YYYY HH:mm").unix()
    );
  });
}

export async function getPostData(id: string): Promise<PostData> {
  const [year] = id.split("-");
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = readFileSync(fullPath, "utf8");

  // use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents, {
    /** they have incorrect type here */
    // @ts-ignore
    excerpt: firstParagraphAsExcerpt,
  });

  // use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // combine the data with the id
  return {
    id,
    year,
    ...(matterResult.data as MatterResultData),
    excerpt: matterResult.excerpt,
    contentHtml,
  };
}
