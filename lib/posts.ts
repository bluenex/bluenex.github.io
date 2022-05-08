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

export interface PostData extends MatterResultData {
  id: string;
  content: string;
  contentHtml: string;
}

const postsDirectory = path.join(process.cwd(), "posts");

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

export function getPostList() {
  const fileNames = glob.sync(`${postsDirectory}/**/*.md`);

  const postList = fileNames.map((fileName) => {
    const [id] = fileName.split("/").slice(-1);
    const filePath = path.join(postsDirectory, id);
    const fileContents = readFileSync(filePath, "utf8");

    const firstParagraphAsExcept = (f: {
      content: string;
      excerpt: string;
    }) => {
      // excerpt may have link inside, we need to replace with normal text
      f.excerpt = f.content.split("\n")[1];

      const links = Array.from(
        f.excerpt?.matchAll(
          /(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g
        ) || []
      );

      if (links.length > 0) {
        links.forEach((link) => {
          f.excerpt = f.excerpt.replace(link[0], link[2]);
        });
      }
    };

    const matterResult = matter(fileContents, {
      /** they have incorrect type here */
      // @ts-ignore
      excerpt: firstParagraphAsExcept,
    });

    return {
      id: id.replace(/\.md$/, ""),
      ...(matterResult.data as MatterResultData),
      excerpt: matterResult.excerpt,
    };
  });

  return postList.reverse();
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = readFileSync(fullPath, "utf8");

  // use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // combine the data with the id
  return {
    id,
    content: matterResult.content,
    contentHtml,
    ...(matterResult.data as MatterResultData),
  };
}
