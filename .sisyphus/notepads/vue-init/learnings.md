# Learnings - Vue Init

## Conventions
- Vue 3 with `<script setup lang="ts">` Composition API
- Tailwind CSS v4 (NOT v3): `@tailwindcss/vite` plugin, NO `tailwind.config.js`, CSS-based config via `@theme`, dark mode via `@variant dark`
- Vue Router with `createWebHashHistory()` for GitHub Pages
- TDD: write failing test FIRST, then implement, then refactor
- Component tests in `src/components/__tests__/` and `src/views/__tests__/`
- All content starts as placeholders (`[Your Name]`, `[FORMSPREE_FORM_ID]`)
- Unicodes over icon libraries for simplicity
- Mobile-first responsive design: start at 375px, then `md:` and `lg:` breakpoints

## Key Decisions
- Base path: `/cjnicholls/` in vite.config.ts
- Theme: localStorage persistence + system preference detection
- Navbar slot: `<slot name="theme-toggle">` for ThemeToggle
- Form: AJAX POST to Formspree with JSON acceptance header

## Gotchas
- `createWebHistory()` breaks on GitHub Pages — must use `createWebHashHistory()`
- Tailwind v4 DOES NOT use `tailwind.config.js` or `postcss.config.js`
- Formspree redirects by default — must use `fetch()` with `{headers: {Accept: 'application/json'}}` to stay on page

## Task 1 — .gitignore Replacement
- Existing `.gitignore` was 262-line Visual Studio/C# template — replaced with 44-line Node/Vue/Vite patterns
- Key patterns: `node_modules/`, `dist/`, `.env*`, `*.local`, `.vite/`, `*.ts-timestamp-*`, `.vscode/`, `.idea/`, `.DS_Store`, `Thumbs.db`
- All .NET/C# patterns (`*.sln`, `[Bb]in/`, `[Oo]bj/`, `*.suo`, `*.csproj`) successfully removed
- New file is clean and concise — no legacy baggage

## Task 2 — Vue 3 + Vite + TypeScript Scaffold
- `npm create vue@latest` with flags: `--typescript --router --vitest --eslint --prettier`
- `--no-jsx`, `--no-pinia`, `--no-e2e` are NOT valid flags (the flags are boolean-only; absence = no)
- Must answer "Yes" to overwrite non-empty directory prompt — pipe `y\n` via `printf`
- Must answer package name prompt — pipe `cjnicholls\n` via `printf`
- Alternative approach that works reliably: scaffold to `/tmp/` then copy files to project root
- `npm install` installed 410 packages, 0 vulnerabilities
- Verified: `npm run build` → exits 0, produces `dist/index.html` + `dist/assets/`
- Verified: `npm run test:unit` → 1 test passes (HelloWorld default test)
- Verified: `npm run dev` → serves on localhost:5173 with `<div id="app"></div>`
- Dev server is Vite 8.1.3 with Vue DevTools auto-integrated
- Dependencies installed: vue ^3.5.38, vue-router ^5.1.0, vite ^8.0.16, typescript ~6.0.0, vitest ^4.1.9
