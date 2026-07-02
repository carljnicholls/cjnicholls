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
- Vite `base` path MUST be set in `vite.config.ts` (not in router config) — `base: '/cjnicholls/'`
- Hash history doesn't need `import.meta.env.BASE_URL` parameter — just `createWebHashHistory()` with no args
- When adding a new route referencing a view that doesn't exist yet, the build fails with `UNLOADABLE_DEPENDENCY` — you need at least a minimal stub file
- `vue-tsc` type-checks before build; if the view file is missing, both type-check and build fail
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

## Task 6 — Vue Router + Vite Base Path for GitHub Pages
- Changed `createWebHistory()` → `createWebHashHistory()` in `src/router/index.ts`
- Removed `import.meta.env.BASE_URL` parameter from `createWebHistory()` — hash mode doesn't need it
- Changed HomeView from eager import to lazy `() => import(...)`
- Removed `/about` route and AboutView import; added `/contact` route with lazy ContactView
- Added `base: '/cjnicholls/'` to `vite.config.ts` — places all built assets under `/cjnicholls/` prefix
- Deleted `src/views/AboutView.vue` (replaced by ContactView)
- Created minimal `src/views/ContactView.vue` stub so build succeeds (real implementation in Task 9)
- Build output verified: `dist/index.html` contains `src="/cjnicholls/assets/index-XXXX.js"`
- `npm run build` succeeds with 42 modules transformed, all chunks generated correctly
- Note: the stub view was needed even though task says "don't create actual views yet" — router import requires the file to exist

## Task 3 — Tailwind CSS v4 with Dark Mode
- Installed: `tailwindcss` + `@tailwindcss/vite` (8 new packages, 0 vulnerabilities)
- Added `import tailwindcss from '@tailwindcss/vite'` and `tailwindcss()` plugin first in plugins array
- Replaced `src/assets/main.css` with Tailwind v4: `@import "tailwindcss"`, `@variant dark (...)`, `@theme { --color-*: }`
- Deleted `src/assets/base.css` (old Vue scaffold CSS, replaced by Tailwind)
- Verified no `tailwind.config.js` or `postcss.config.js` exist — v4 uses Vite plugin only
- `npm run build` → exits 0, produces CSS (15.42 kB gzip: 3.95 kB) with Tailwind v4.3.2
- Custom theme tokens (`--color-primary`, `--color-primary-dark`, `--color-bg-light`, `--color-bg-dark`, `--color-text-light`, `--color-text-dark`) present in compiled output
- Dark mode works via `@variant dark (&:where(.dark, .dark *))` — class-based toggle on `<html>` element

## Task 4 — useTheme Composable with Tests
- Created `src/composables/useTheme.ts` with `theme` ref, `toggleTheme()`, localStorage persistence, system preference detection
- Used `readonly()` on returned `theme` ref to prevent external mutation
- Used `watch()` to sync class + persist on every theme change
- Initialization happens in `onMounted`: localStorage > system preference > default `'light'`
- Tests use `mount()` from `@vue/test-utils` with a wrapper component to trigger lifecycle hooks
- `localStorage` is NOT available in jsdom/vitest by default — must mock with `vi.stubGlobal('localStorage', ...)`
- `window.matchMedia` is NOT available in jsdom — must mock with `vi.stubGlobal('matchMedia', ...)`
- `Watch` callbacks fire asynchronously (next tick) — persistence assertions need `await nextTick()`
- `vi.unstubAllGlobals()` in `afterEach` for proper cleanup
- Deleted scaffold `HelloWorld.spec.ts` (replaced with useTheme tests)
- 4 tests: default light, localStorage read, toggle, persist — all passing
