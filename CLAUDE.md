# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application (koatrip-app) bootstrapped with `create-next-app`, using:
- **Next.js 16.0.10** with App Router architecture
- **React 19.2.1** with the new react-jsx transform
- **TypeScript 5** with strict mode enabled
- **Tailwind CSS 4** with PostCSS integration
- **ESLint 9** with Next.js-specific configurations

## Common Commands

### Development
```bash
npm run dev        # Start development server on http://localhost:3000
npm run build      # Build production bundle
npm start          # Run production server
npm run lint       # Run ESLint checks
```

### TypeScript
The project uses TypeScript with:
- Target: ES2017
- Strict mode enabled
- Path alias: `@/*` maps to the root directory
- jsx: "react-jsx" (uses the modern JSX transform)

## Architecture

### App Router Structure
This project uses Next.js App Router (not Pages Router). All routes live in the `app/` directory:
- `app/layout.tsx` - Root layout with Geist fonts (sans and mono variants) configured via `next/font/google`
- `app/page.tsx` - Home page route
- `app/globals.css` - Global styles with Tailwind directives

### Styling
- **Tailwind CSS 4** is configured via `@tailwindcss/postcss`
- Uses CSS custom properties for fonts: `--font-geist-sans` and `--font-geist-mono`
- Dark mode support is built in (uses `dark:` variants)
- Global styles in `app/globals.css`

### Font Configuration
The project uses Next.js font optimization with Geist fonts:
- Geist Sans (variable font)
- Geist Mono (variable font)
- Both loaded from Google Fonts with Latin subset
- Applied via CSS variables in the root layout

### Static Assets
Static files (SVGs, images, etc.) are served from the `public/` directory and accessible at the root URL path.

## Configuration Files

- `next.config.ts` - Next.js configuration (currently minimal)
- `tsconfig.json` - TypeScript compiler options with Next.js plugin
- `eslint.config.mjs` - ESLint using flat config format with Next.js presets
- `postcss.config.mjs` - PostCSS configuration for Tailwind
