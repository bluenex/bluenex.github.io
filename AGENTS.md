# Agent Instructions for bluenex.github.io

You are an agent assisting with the development and maintenance of this Astro-based personal website and blog.

## Core Mandates

- **Framework:** Astro 5.x.
- **UI & Interaction:** React 18. Use `.tsx` for interactive components and `.astro` for layouts/static components.
- **Styling:** Tailwind CSS. Use utility classes. Global styles are in `src/styles/global.css`.
- **Package Manager:** `pnpm`.

## Project Conventions

- **Path Aliases:** Use `@/` to refer to the `src/` directory (e.g., `import { ... } from "@/libs/posts"`).
- **Components:**
  - React components reside in `src/components/react`.
  - SVGs are handled as React components in `src/components/react/svgs`.
  - Astro-specific components/layouts are in `src/components`.
- **Markdown Handling:**
  - **CRITICAL:** Do NOT use Astro Content Collections API.
  - The project uses custom parsing logic located in `src/libs/posts.ts` using `gray-matter` and `remark`.

## Blog Post Workflow

- **Location:** `src/content/posts/`
- **Filename Format:** `{YYYY}-{MM}-{DD}-{kebab-case-title}.md`
- **Frontmatter Requirements:**
  ```yaml
  title: string
  date: "YYYY-MM-DD"
  modified: "YYYY-MM-DD" (optional)
  tags: ["tag1", "tag2"] (optional)
  ```

## Verification Commands

- **Build & Type Check:** `pnpm run build` (runs `astro check && astro build`)
- **Type Check only:** `pnpm run checktype`
- **Lint:** `pnpm run lint`
- **Format:** `pnpm run format`
- **Format check:** `pnpm run format:check`
- **Format + lint fix:** `pnpm run format:lintfix`
