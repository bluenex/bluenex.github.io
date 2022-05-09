# Bluenex's personal blog

This is my personal blog forked from my template https://github.com/bluenex/frontend-collection/tree/main/nextjs-ts-tailwind. This blog has no intention to be commercial nor seeking for personal benefit. I occasionally update the blog because this blog is kind of diary and personal geek note, but I don't have that many stories in my everyday life.
That's why I choose to start blogging on Github not on mainstream blogging service site.

## Tech stack

- Next.js
- TypeScript
- Tailwind CSS

### Editor

Visual Studio Code with [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension.

## Dev

```sh
npm run dev
```

## Deployment

```sh
npm run export
```

Currently deploy on GitHub Pages, check [main.yml](.github/workflows/main.yml) for more information.

## Add a blog post

A new post can be added in `/posts` directory with a file name format:

```txt
{year}-{month}-{date}-{tile-as-kebab-case}.md
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

Tags and years for blog's navigation are generated on running a development server (`npm run predev`) as `/public/static-data.json`. So make sure to run either `npm run dev` or `npm run predev` when adding a new post (with new tag or year).

