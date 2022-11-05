# Bluenex's personal website

This is my personal website forked from my template https://github.com/bluenex/nextjs-template/tree/main/with-ts-tailwind. There is also a blog which I occasionally update as a diary and personal geek note. I am not a good storyteller but sometimes the feeling is just right.

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

Currently deploy on Cloudflare Pages as a static site and can be accessed at https://bluenex.dev.

### Known issues

- Tried Next SSR build on Cloudflare Pages and it still doesn't work as expect. Root page is working properly but other pages go 404. Will try again next time.

## Add a blog post

A new post can be added in `/posts` directory with a file name format:

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

Tags and years for blog's navigation are generated on running a development server (`npm run predev`) as `/public/static-data.json`. So make sure to run either `npm run dev` or `npm run predev` when adding a new post (with new tag or year). This will be changed to use `getInitialProps` soon.

