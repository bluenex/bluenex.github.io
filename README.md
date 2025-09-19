# Bluenex's personal website

This is my personal website ported from Next.js to Astro recently (1 Dec 2024). There is also a blog which I occasionally update as a diary and personal geek note. I am not a good storyteller but sometimes the feeling is just right.

## Tech stack

- Astro
- TypeScript
- Tailwind CSS

### Editor

Visual Studio Code with [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension.

## Dev

```sh
pnpm run dev
```

## Deployment

Currently deploy on Cloudflare Pages and can be accessed at https://bluenex.dev.

## Add a blog post

A new post can be added in `/content/posts` directory with a file name format:

```txt
{year}-{month}-{date}-{title-as-kebab-case}.md
```

 > *[kebab-case](https://en.wiktionary.org/wiki/kebab_case)

Support frontmatter:

```ts
{
  title: string;
  date: string;
  modified?: string;
  tags?: string[];
}
```

## Note

I don't use Astro Content API as described in the [official documentation](https://docs.astro.build/en/guides/content/). Instead, I ported working code from Next.js to Astro and keep using parser like `gray-matter` and `remark` for markdown processing.
