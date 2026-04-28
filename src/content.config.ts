import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "zod";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    thumbnail: z.string().optional(),
    modified: z.coerce.date().optional(),
  }),
});

export const collections = { posts };
