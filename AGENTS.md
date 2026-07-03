# AGENTS.md — cjnicholls

Personal portfolio site. Vue 3 + Vite + TypeScript + Tailwind CSS v4. Deployed to GitHub Pages.

## Quick commands

```sh
npm run dev           # dev server (hot reload)
npm run build         # type-check + prod build (parallel)
npm run test:unit     # vitest
npm run lint          # oxlint then eslint (sequential)
npm run format        # prettier on src/
npm run type-check    # vue-tsc --build only
npm run build-only    # vite build only (skip types)
```

## Architecture

```
src/
├── main.ts              # app entry — createApp, mount #app
├── App.vue              # root layout: navbar, router-view, footer
├── router/index.ts      # Vue Router v5 — hash history (required for GitHub Pages)
├── composables/         # shared state (no Pinia)
│   └── useTheme.ts      # light/dark toggle — localStorage + matchMedia
├── components/          # reusable .vue components
│   ├── AppNavbar.vue    # fixed nav with desktop/mobile variants
│   ├── ThemeToggle.vue  # sun/moon button — uses useTheme
│   └── icons/           # SVG icon components (scaffold artifacts, may be unused)
├── views/               # route-level pages
│   ├── HomeView.vue     # "/" — placeholder content
│   └── ContactView.vue  # "/contact" — Formspree form
├── assets/
│   └── main.css         # Tailwind v4 import + custom @theme tokens + dark variant
└── __tests__/           # co-located: components/__tests__/, views/__tests__/
```

**Routes**: 2 lazy-loaded routes — `/` (home) and `/contact` (contact). Both use named routes.

**No Pinia**. State lives in composables (currently only `useTheme`). Add composables to `src/composables/` for new shared state.

## Critical: Vite base path & routing

- **`base: '/cjnicholls/'`** in `vite.config.ts`. All asset paths are relative to this. Dev server serves at `/cjnicholls/`.
- **Hash-based router** (`createWebHashHistory`). This is intentional — GitHub Pages doesn't support history mode without a 404 fallback. Do NOT switch to history mode without also adding a 404.html hack.
- The deploy workflow pushes `dist/` to `gh-pages` branch via `peaceiris/actions-gh-pages`.

## Tailwind v4 specifics

- Dark mode: `@variant dark (&:where(.dark, .dark *))` — toggles via class on root `<div>`, NOT on `<html>`.
- Custom theme tokens defined in `src/assets/main.css` under `@theme {}` (primary, primary-dark, bg-light, bg-dark, text-light, text-dark).
- Tailwind v4 uses the Vite plugin (`@tailwindcss/vite`), no `tailwind.config.js` file exists.

## Testing

- **Vitest v4** with **jsdom** environment.
- Test files live in `__tests__/` directories co-located with source.
- Use `@vue/test-utils` `mount()` for component tests.
- **Test router uses `createMemoryHistory`**, not hash history — the app's production router is not tested directly.
- `useTheme` composable must be mocked via `vi.mock('@/composables/useTheme', ...)` in component tests — see `src/__tests__/App.spec.ts` for the pattern.
- Vitest config extends Vite config via `mergeConfig`, inheriting the `@` path alias.
- Test env var: `VITE_FORMSPREE_URL` is set in `vitest.config.ts` to avoid missing env errors in ContactView tests.
- Run a single test file: `npx vitest run src/__tests__/App.spec.ts`

## Linting & formatting

- **ESLint** (flat config, v10) + **oxlint** run sequentially via `npm run lint`.
- Prettier settings: no semicolons, single quotes, 100 print width. These differ from defaults — match them.
- EditorConfig enforces: 2-space indent, LF, UTF-8, trailing whitespace trimmed, final newline.
- oxlint only checks `correctness` category (error level). Ignores `archive/`.
- ESLint ignores: `dist/`, `dist-ssr/`, `coverage/`, `archive/`.

## CI/CD

- **Single workflow**: `.github/workflows/deploy.yml`
- **Triggers on push to `2026-rewrite`** branch (NOT main/master).
- Builds with Node 22, `npm ci`, `npm run build`.
- Deploys `dist/` to `gh-pages` branch.

## Environment

- Formspree URL: `VITE_FORMSPREE_URL` in `.env` (not committed). Example in `.env.example`.
- Node: `^22.18.0 || >=24.12.0`
- TypeScript ~6.0 (very recent — some tooling may need updating to support this version).

## Archive

`archive/` contains the old .NET project (ASP.NET, `cjnicholls.sln`). Ignored by linter, excluded from app build. Do not modify.

## Tech stack pins

| Layer | Choice |
|-------|--------|
| Frameworks | Vue 3.5, Vite 8 |
| Language | TypeScript ~6.0 |
| CSS | Tailwind CSS v4 (Vite plugin) |
| Routing | Vue Router v5 (hash mode) |
| Testing | Vitest 4 + jsdom + @vue/test-utils |
| Linting | ESLint 10 (flat) + oxlint 1.69 |
| Formatting | Prettier 3.8 |
| State | Composables (no Pinia) |
| Forms | Formspree |
| Hosting | GitHub Pages (`/cjnicholls/` subpath) |
