# Bluenex's personal website

This is my personal website forked from my template https://github.com/bluenex/frontend-collection/tree/main/nextjs-ts-tailwind. There is also a blog which I occasionally update as a diary and personal geek note. I am not a good storyteller but sometimes the feeling is just right.

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

