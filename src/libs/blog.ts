import { getCollection } from "astro:content";

export async function getAllTagsAndYears() {
  const posts = await getCollection("posts");
  const yearsSet = new Set<string>();
  const tagsSet = new Set<string>();

  posts.forEach((entry) => {
    const year = entry.id.split("-")[0];
    yearsSet.add(year);
    entry.data.tags?.forEach((tag) => tagsSet.add(tag));
  });

  return {
    years: Array.from(yearsSet).sort((a, b) => Number(b) - Number(a)),
    tags: Array.from(tagsSet).sort(),
  };
}
