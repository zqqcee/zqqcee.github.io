# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog built with Astro, featuring a Chinese-language blog with posts, thoughts, bookmarks, and friends sections. The site is deployed at https://luckycc.cc/.

## Development Commands

### Core Commands
- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Type-check with `astro check` then build for production
- `pnpm preview` - Preview production build locally

### Package Management
- Uses `pnpm@8.7.0` as the package manager (specified in package.json)
- Run `pnpm install` to install dependencies

### Code Quality
- Prettier is configured for formatting (use `prettier-plugin-astro`)
- Biome is available for linting (@biomejs/biome)
- Husky is set up for pre-commit hooks

## Architecture

### Framework & Core Technologies
- **Astro 4.15+**: Static site generator with React integration
- **React 18**: Used for interactive components via `@astrojs/react`
- **TailwindCSS**: Styling with custom typography plugin and animations
- **TypeScript**: Type-safe development with path aliases

### Directory Structure

**src/pages/**: Route definitions following Astro's file-based routing
- Dynamic routes use bracket notation (e.g., `[page].astro`)
- Markdown files (`.md`) in page directories become individual blog posts
- Pagination implemented via `getStaticPaths` (e.g., `/posts/[page].astro`)
- RSS feed generated at `/rss.xml.js`

**src/layouts/**: Page layout templates
- `HomeLayout.astro` - Base layout for all pages
- `PostLayout.astro` - Layout for blog post content with TOC and comments

**src/components/**: UI components organized by feature
- `ui/` - shadcn/ui components (React) for reusable primitives
- Feature directories: `Article/`, `Nav/`, `Toc/`, `Friends/`, `Comments/`, etc.
- Components use PascalCase naming (enforced by project rules)

**src/types/**: TypeScript type definitions
- `comments.ts` - Comment system types
- `friend.ts` - Friend link types

**src/helper/**: Utility functions
- `comment.ts` - Comment-related helpers
- `link.ts` - Link processing utilities

**src/styles/**: Global styles
- `global.css` - Base Tailwind imports and custom styles

### Content Organization
- Blog posts live in `src/pages/posts/*.md` with frontmatter (title, date, description, hidden)
- Thoughts live in `src/pages/thoughts/*.md`
- Interview content in `src/pages/interview/`
- Posts are sorted by date (newest first) and support pagination (5 posts per page)
- RSS excludes algorithm and febasic directories

### Styling System
- TailwindCSS with custom breakpoint: `lg: 900px`
- Custom typography plugin configured for prose content (code blocks, blockquotes, links)
- Animations via `tailwindcss-animate` and custom keyframes (signature effects)
- Framer Motion for advanced animations
- shadcn/ui components for consistent UI primitives

### Path Aliases
TypeScript paths configured in tsconfig.json:
- `@/*` maps to `src/*`
- Used throughout codebase (e.g., `@/components/ui/button`)

### UI Component Libraries
- **shadcn/ui**: React components in `src/components/ui/` (configured via components.json)
- **Radix UI**: Primitive components for accessible UI
- **Framer Motion**: Animation library
- **Vaul**: Drawer component
- **Lottie**: Animation player support

### Markdown Processing
- `remark-toc` generates table of contents (heading: 'toc', maxDepth: 3)
- Shiki syntax highlighting with Dracula theme
- `sanitize-html` used for RSS feed content sanitization

### React Integration
- Astro components can include React components via `client:load` directive
- JSX/TSX configured with React JSX runtime
- React Hook Form with Zod validation available for forms

## Project-Specific Rules

From `.cursor/rules/luckycc-fe-rule.mdc`:

- Components use PascalCase naming convention
- TailwindCSS config: `tailwind.config.mjs`
- Follow shadcn/ui integration guide for new components
- Pages directory: `src/pages`
- Styles directory: `src/styles`
- Ensure alt text for all images (accessibility requirement)

## Build & Deployment

- Site URL: `https://luckycc.cc`
- Redirects configured: `/posts` → `/posts/1`, `/thoughts` → `/thoughts/1`
- Server configured with `host: true` for network access during development
- Docker support via `dockerfile` and `CaddyFile` for reverse proxy
- Production build outputs to `dist/`

## Important Notes

- Environment variables loaded from `.env` file
- Blog content primarily in Chinese
- RSS feed includes custom `follow_challenge` data for specific platform integration
- Some interview pages may be hidden (check `frontmatter.hidden` flag)

## Claude Code Preferences

- **Always use the context7 MCP tool** when asked about external libraries or frameworks (like Next.js, Tailwind, Astro, React, etc.) to ensure the APIs are up-to-date and not hallucinated
