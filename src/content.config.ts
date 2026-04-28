import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

// Define the posts collection so Astro does not auto-generate it.
// Note: posts are read via src/libs/posts.ts (gray-matter + remark),
// not through the Astro Content Collections API.
const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
});

export const collections = { posts };
