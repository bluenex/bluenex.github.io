# Agent Instructions for bluenex.github.io

You are an agent assisting with the development and maintenance of this Astro-based personal website and blog.

## Core Mandates

- **Framework:** Astro 6.x.
- **UI & Interaction:** React 19. Use `.tsx` for interactive components and `.astro` for layouts/static components.
- **Styling:** Tailwind CSS. Use utility classes. Global styles are in `src/styles/global.css`.
- **Package Manager:** `pnpm`.

## Project Conventions

- **Path Aliases:** Use `@/` to refer to the `src/` directory (e.g., `import { ... } from "@/libs/posts"`).
- **Components:**
  - React components reside in `src/components/react`.
  - SVGs are handled as React components in `src/components/react/svgs`.
  - Astro-specific components/layouts are in `src/components`.
- **Markdown Handling:**
  - Posts are loaded via **Astro Content Collections** (`src/content.config.ts`).
  - Data helpers live in `src/libs/posts.ts` (`entryToPostListItem`, `getExcerpt`).
  - Post pages use `render(entry)` from `astro:content` and Astro's `<Content />` component for rendering.

## Blog Post Workflow

- **Location:** `src/content/posts/`
- **Filename Format:** `{YYYY}-{MM}-{DD}-{kebab-case-title}.md`
- **Frontmatter Requirements:**
  ```yaml
  title: string
  date: "YYYY-MM-DDTHH:mm"
  modified: "YYYY-MM-DDTHH:mm" (optional)
  tags: ["tag1", "tag2"] (optional)
  ```

## Verification Commands

- **Build & Type Check:** `pnpm run build` (runs `astro check && astro build`)
- **Type Check only:** `pnpm run checktype`
- **Lint:** `pnpm run lint`
- **Format:** `pnpm run format`
- **Format check:** `pnpm run format:check`
- **Format + lint fix:** `pnpm run format:lintfix`
