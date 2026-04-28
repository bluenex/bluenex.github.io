# Bluenex's personal website

This is my personal website ported from Next.js to Astro recently (1 Dec 2024). There is also a blog which I occasionally update as a diary and personal geek note. I am not a good storyteller but sometimes the feeling is just right.

## Tech stack

- Astro 6
- React 19
- TypeScript
- Tailwind CSS 4

### Editor

Visual Studio Code with [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension.

## Dev

```sh
pnpm run dev
```

## Verification

```sh
pnpm run build           # astro check + build
pnpm run checktype       # type check only
pnpm run lint            # lint with ESLint
pnpm run format          # format with Prettier
pnpm run format:check    # check formatting without writing
pnpm run format:lintfix  # format + lint fix
```

## Deployment

Currently deploy on Cloudflare Pages and can be accessed at https://bluenex.dev.

## Add a blog post

A new post can be added in `src/content/posts/` directory with a file name format:

```txt
{year}-{month}-{date}-{title-as-kebab-case}.md
```

> \*[kebab-case](https://en.wiktionary.org/wiki/kebab_case)

Supported frontmatter:

```yaml
title: string          # required
date: YYYY-MM-DDTHH:mm # required
modified: YYYY-MM-DDTHH:mm # optional
tags: [tag1, tag2]     # optional
thumbnail: string      # optional
```

Posts are loaded via Astro Content Collections (`src/content.config.ts`) with a Zod schema. Markdown is rendered at build time using Astro's built-in pipeline with shiki for syntax highlighting (`github-dark-dimmed` theme).
