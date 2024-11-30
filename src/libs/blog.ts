import { readFileSync } from "fs";
import { glob } from "glob";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "src", "content", "posts");

export function getAllTagsAndYears() {
  const fileNames = glob.sync(`${postsDirectory}/**/*.md`);
  const yearsSet = new Set<string>();
  const tagsSet = new Set<string>();

  fileNames.forEach((fileName) => {
    const [id] = fileName.split("/").slice(-1);
    const [year] = id.split("-");

    // add year
    yearsSet.add(year);

    const filePath = path.join(postsDirectory, id);
    const fileContents = readFileSync(filePath, "utf8");

    const matterResult = matter(fileContents);

    matterResult.data.tags.forEach((tag: string) => {
      // add tag
      tagsSet.add(tag);
    });
  });

  return {
    years: Array.from(yearsSet).sort((a, b) => Number(b) - Number(a)),
    tags: Array.from(tagsSet).sort(),
  };
}
