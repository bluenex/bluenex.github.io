import type { CollectionEntry } from "astro:content";

export interface PostListItem {
  id: string;
  year: string;
  title: string;
  date: Date;
  modified?: Date;
  tags?: string[];
  thumbnail?: string;
  excerpt: string | undefined;
}

// Converts a collection entry to the shape used by UI components.
export function entryToPostListItem(
  entry: CollectionEntry<"posts">,
): PostListItem {
  return {
    id: entry.id,
    year: entry.id.split("-")[0],
    title: entry.data.title,
    date: entry.data.date,
    modified: entry.data.modified,
    tags: entry.data.tags,
    thumbnail: entry.data.thumbnail,
    excerpt: getExcerpt(entry.body),
  };
}

// Thin excerpt utility: grabs the second line of the markdown body and strips
// markdown links (same behaviour as the old gray-matter custom excerpt parser).
export function getExcerpt(body: string | undefined): string | undefined {
  if (!body) return undefined;
  const secondLine = body.split("\n")[1];
  if (!secondLine?.trim()) return undefined;

  const links = Array.from(
    secondLine.matchAll(
      /(\[((?:\[[^\]]*\]|[^[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,
    ),
  );

  if (links.length === 0) return secondLine;

  let result = secondLine;
  links.forEach((link) => {
    result = result.replace(link[0], link[2]);
  });
  return result;
}
