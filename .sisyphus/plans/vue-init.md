# Vue 3 Personal Website — Initialization

## TL;DR

> **Quick Summary**: Scaffold a Vue 3 + TypeScript + Tailwind CSS v4 personal website with navbar, home/bio page, and contact page. Deployable to GitHub Pages via GitHub Actions. Mobile-first with light/dark theme toggle and Vitest test coverage.
>
> **Deliverables**:
> - Vue 3 + Vite + TypeScript project scaffold
> - Vue Router with hash history (GitHub Pages compatible)
> - Responsive navbar with light/dark theme toggle
> - Home/bio page (hero, about, links, skills sections)
> - Contact page with Formspree-powered form
> - Tailwind CSS v4 `@tailwindcss/vite` setup with dark mode
> - Vitest test infrastructure with component tests
> - GitHub Actions workflow for GitHub Pages deployment
> - Updated `.gitignore` (Node/Vue template)
>
> **Estimated Effort**: Medium
> **Parallel Execution**: YES — 3 waves
> **Critical Path**: Task 1 → Task 2 → Task 5 → Task 6 → Task 8

---

## Context

### Original Request
"Initialise this web project. It should use vue. It needs to be deployable on github pages. It should be mobile first. It should feature a navbar, a home/bio page and a contact page."

### Interview Summary
**Key Discussions**:
- **Language**: TypeScript over JavaScript — better IDE support, Vue's official recommendation
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin — mobile-first breakpoints built in. No PostCSS config needed with v4.
- **Routing**: `createWebHashHistory()` — required for GitHub Pages SPA (no server-side routing)
- **Design**: Minimal/clean with BOTH light and dark theme toggle
- **Contact**: Formspree for form handling (free tier, 50 submissions/month)
- **Bio page**: Hero section, About text, Links (social), Skills section
- **Navbar**: Two items only — Home and Contact
- **Testing**: Vitest with TDD approach (RED-GREEN-REFACTOR)
- **GitHub**: Repo is `carljnicholls/cjnicholls`, base path: `/cjnicholls/`

**Research Findings**:
- **Vue scaffolding**: `npm create vue@latest` generates Vite + TS project with prompts for router, Vitest, ESLint, Prettier
- **GitHub Pages routing**: Hash mode is simplest — no 404.html fallback needed for SPA
- **Tailwind CSS v4 differences** (CRITICAL — from Metis review):
  - No `tailwind.config.js` — all config is CSS-based (`@theme`, `@variant dark`)
  - Dark mode uses `@variant dark (&:where(.dark, .dark *))` in CSS, NOT `darkMode: 'class'` in JS
  - The `@tailwindcss/vite` plugin replaces PostCSS entirely
  - Do NOT create v3-style config files — they won't work
- **Workspace**: Clean repo on branch `2026-rewrite`. Old .NET project archived. `.gitignore` is VS template — must be replaced first
- **Formspree**: Uses a form endpoint URL like `https://formspree.io/f/{form-id}` — form submits via standard POST

### Metis Review
**Identified Gaps** (addressed):
- **Tailwind v4 migration pitfalls**: Plan explicitly notes v4 conventions (no config file, CSS-based theme, `@variant dark`) to prevent v3-style mistakes
- **Accessibility**: Applied WCAG AA minimum as default — semantic HTML, aria labels, keyboard navigation, focus indicators
- **Formspree endpoint**: Use `[FORMSPREE_FORM_ID]` placeholder — user configures after plan execution
- **Content**: All bio/skills/links content starts as placeholder — user replaces post-scaffold
- **`.gitignore`**: Must be Task 1 — blocks everything else

---

## Work Objectives

### Core Objective
Initialize a production-ready Vue 3 personal website scaffold with routing, styling, theme system, contact form, and CI/CD — deployable to GitHub Pages on first push.

### Concrete Deliverables
- `package.json` with Vue 3, Vite, TypeScript, Tailwind CSS v4, Vue Router, Vitest
- `vite.config.ts` with base path `/cjnicholls/` and Tailwind plugin
- `src/main.ts` — app entry with router + theme provider
- `src/App.vue` — root layout with `<router-view>` and theme class binding
- `src/router/index.ts` — hash-mode routes for Home and Contact
- `src/views/HomeView.vue` — bio page (hero, about, links, skills)
- `src/views/ContactView.vue` — contact form with Formspree integration
- `src/components/AppNavbar.vue` — responsive navbar with theme toggle
- `src/components/ThemeToggle.vue` — light/dark toggle button
- `src/components/__tests__/` — Vitest component tests
- `src/assets/main.css` — Tailwind v4 imports + dark mode variant + custom theme
- `.github/workflows/deploy.yml` — GitHub Actions deploy to GitHub Pages
- `.gitignore` — Node/Vue template

### Definition of Done
- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts dev server on localhost
- [ ] `npm run build` produces `dist/` with correct base path
- [ ] `npm run test:unit` — all Vitest tests pass (≥ 8 tests)
- [ ] Navigate to `/` → Home page renders (hero, about, links, skills visible)
- [ ] Navigate to `/#/contact` → Contact page renders with form
- [ ] Theme toggle switches between light and dark mode
- [ ] Navbar collapses on mobile (hamburger), expands on desktop
- [ ] Contact form submits to Formspree (placeholder endpoint)
- [ ] GitHub Actions deploys `dist/` to `gh-pages` branch successfully

### Must Have
- Vue 3 + Vite + TypeScript scaffold
- Hash-mode routing for GitHub Pages
- Tailwind CSS v4 with dark mode via `@variant dark`
- Responsive navbar with mobile hamburger
- Light/dark theme toggle persisted to `localStorage`
- Home page with all 4 sections (hero, about, links, skills)
- Contact form with name, email, message fields + Formspree action
- Vitest test infrastructure with passing example test
- GitHub Actions deployment workflow
- Node/Vue `.gitignore` template

### Must NOT Have (Guardrails)
- **NO `tailwind.config.js`** — Tailwind v4 uses CSS-based config only
- **NO PostCSS config** — `@tailwindcss/vite` replaces it
- **NO Pinia/Vuex** — no state management needed for 2-page site
- **NO history-mode routing** — `createWebHistory()` breaks on GitHub Pages
- **NO external icon libraries** — use inline SVGs or Unicode for icons
- **NO server-side code** — no API routes, no backend, no SSR
- **NO `.env` files** — no secrets management needed (Formspree endpoint is public)
- **NO AI slop**: no excessive comments, no JSDoc on every function, no over-abstraction (no `useNavbar` composable for a static nav)

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO (new project)
- **Automated tests**: YES — TDD (RED-GREEN-REFACTOR)
- **Framework**: Vitest (bundled with Vue scaffold)
- **TDD workflow**: Each component task writes a failing test first (RED), implements minimally (GREEN), then refactors

### QA Policy
Every task MUST include agent-executed QA scenarios. Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright (playwright skill) — Navigate, interact, assert DOM, screenshot
- **CLI**: Use Bash — Run commands, validate output, check exit codes
- **API**: Use Bash (curl) — Send requests, assert status + response fields

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — foundation + scaffolding):
├── Task 1: Replace .gitignore [quick]
├── Task 2: Vue project scaffold [quick]
├── Task 3: Tailwind CSS v4 setup [quick]
├── Task 4: Vue Router setup [quick]
└── Task 5: Theme system (light/dark) [quick]

Wave 2 (After Wave 1 — components, MAX PARALLEL):
├── Task 6: Navbar component [visual-engineering]
├── Task 7: ThemeToggle component [visual-engineering]
├── Task 8: HomeView — hero section [visual-engineering]
├── Task 9: HomeView — about + links sections [visual-engineering]
├── Task 10: HomeView — skills section [visual-engineering]
└── Task 11: ContactView — form [visual-engineering]

Wave 3 (After Wave 2 — integration + deploy):
├── Task 12: App.vue root layout [visual-engineering]
├── Task 13: GitHub Actions deploy workflow [quick]
├── Task 14: Build verification + deploy test [quick]
└── Task 15: Mobile responsiveness audit [visual-engineering]

Wave FINAL (After ALL — 4 parallel reviews, then user okay):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high + playwright)
└── Task F4: Scope fidelity check (deep)
→ Present results → Get explicit user okay

Critical Path: Task 1 → Task 2 → Task 5 → Task 6 → Task 12 → Task 14 → F1-F4
Parallel Speedup: ~60% faster than sequential
Max Concurrent: 6 (Wave 2)
```

### Dependency Matrix

- **1**: — — 2-5, 1
- **2**: 1 — 3-5, 2
- **3**: 2 — 6-11, 2
- **4**: 2 — 6, 12, 2
- **5**: 2 — 6, 7, 12, 2
- **6**: 4, 5 — 12, 3
- **7**: 5 — 12, 3
- **8**: 3, 4 — 12, 3
- **9**: 3, 4 — 12, 3
- **10**: 3 — 12, 3
- **11**: 3, 4 — 12, 3
- **12**: 6, 7, 8, 9, 10, 11 — 13, 14, 15, 3
- **13**: 12 — 14, 3
- **14**: 13 — F1-F4, 3
- **15**: 12 — F1-F4, 3

### Agent Dispatch Summary

- **Wave 1**: **5** — T1-T5 → `quick`
- **Wave 2**: **6** — T6-T11 → `visual-engineering`
- **Wave 3**: **4** — T12 → `visual-engineering`, T13 → `quick`, T14 → `quick`, T15 → `visual-engineering`
- **FINAL**: **4** — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

> Implementation + Test = ONE Task. Never separate.
> EVERY task MUST have: Recommended Agent Profile + Parallelization info + QA Scenarios.

- [x] 1. Replace `.gitignore` with Node/Vue template

  **What to do**:
  - Delete existing `.gitignore` (Visual Studio/C# template, 262 lines of irrelevant patterns)
  - Write new `.gitignore` with Node/Vue patterns: `node_modules/`, `dist/`, `.env*`, `*.local`, `vite.config.ts.timestamp-*`, `.vite/`, IDE files (`.vscode/`, `.idea/`), OS files (`.DS_Store`, `Thumbs.db`)
  - Verify: `git status` shows `.gitignore` as modified, no `node_modules/` tracked

  **Must NOT do**:
  - Do NOT modify `archive/` directory contents
  - Do NOT touch `.git/config` or branch configuration

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single file replacement, well-known template, zero complexity
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A — trivial task

  **Parallelization**:
  - **Can Run In Parallel**: YES — with nothing (first task, unblocks everything)
  - **Parallel Group**: Wave 1 (sole prerequisite)
  - **Blocks**: Tasks 2-15
  - **Blocked By**: None (can start immediately)

  **References**:
  - Official GitHub Node `.gitignore` template: `https://raw.githubusercontent.com/github/gitignore/main/Node.gitignore` — Canonical Node.js ignore patterns
  - Existing `.gitignore` at repo root: know what to replace
  - README.md: confirms Vue3 personal website — context for why the VS template is wrong

  **Acceptance Criteria**:
  - [ ] `git status` shows `.gitignore` as modified
  - [ ] `node_modules/` pattern present in `.gitignore`
  - [ ] `dist/` pattern present in `.gitignore`
  - [ ] No .NET/C# patterns remain (e.g., `*.sln`, `[Bb]in/`, `[Oo]bj/`)

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Happy path — .gitignore contains correct patterns
    Tool: Bash
    Preconditions: Old .gitignore exists at repo root
    Steps:
      1. Run: grep "node_modules" .gitignore
      2. Run: grep "dist" .gitignore
      3. Run: grep "*.sln" .gitignore
    Expected Result: Steps 1-2 match, Step 3 returns no match (exit code 1)
    Failure Indicators: Step 1 or 2 returns no match; Step 3 returns a match
    Evidence: .sisyphus/evidence/task-1-gitignore-verify.txt

  Scenario: Failure — .gitignore must not be empty
    Tool: Bash
    Preconditions: New .gitignore written
    Steps:
      1. Run: wc -l .gitignore
    Expected Result: Line count > 5 (not empty)
    Evidence: .sisyphus/evidence/task-1-gitignore-count.txt
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-1-gitignore-verify.txt` — grep output
  - [ ] `.sisyphus/evidence/task-1-gitignore-count.txt` — line count

  **Commit**: YES
  - Message: `chore: replace .gitignore with Node/Vue template`
  - Files: `.gitignore`

- [x] 2. Scaffold Vue 3 + Vite + TypeScript project

  **What to do**:
  - Run `npm create vue@latest .` in project root with these flags/answers:
    - Project name: `cjnicholls` (or accept current directory)
    - TypeScript: YES
    - JSX: NO
    - Vue Router: YES
    - Pinia: NO
    - Vitest: YES
    - E2E Testing: NO (Playwright will be used for manual QA only)
    - ESLint: YES
    - Prettier: YES
  - Run `npm install` after scaffold
  - Verify: `npm run dev` starts, `npm run build` produces `dist/`
  - Verify: `npm run test:unit` runs and passes the default example test

  **Must NOT do**:
  - Do NOT add Pinia or Vuex
  - Do NOT add E2E testing (Cypress/Playwright as dependency)
  - Do NOT modify scaffolded configs yet (that's Tasks 3-5)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Running a scaffolding CLI with known flags — zero creativity needed
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A — trivial task

  **Parallelization**:
  - **Can Run In Parallel**: NO (sole scaffold task)
  - **Parallel Group**: Wave 1
  - **Blocks**: Tasks 3-15
  - **Blocked By**: Task 1

  **References**:
  - `npm create vue@latest` CLI prompts: know exact flags to pass
  - README.md: confirms Vue3 — validates framework choice
  - Official Vue scaffold docs: `https://vuejs.org/guide/quick-start.html` — expected output structure

  **Acceptance Criteria**:
  - [ ] `package.json` exists with `vue`, `vue-router`, `vite`, `typescript`, `vitest` dependencies
  - [ ] `vite.config.ts` exists
  - [ ] `src/router/index.ts` exists
  - [ ] `npm run dev` starts without errors
  - [ ] `npm run build` completes — `dist/` directory created
  - [ ] `npm run test:unit` — at least 1 test passes

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Happy path — scaffold produces working project
    Tool: Bash
    Preconditions: Task 1 complete (.gitignore replaced)
    Steps:
      1. Run: npm create vue@latest . -- --typescript --router --vitest --eslint --prettier (with no on Pinia, JSX, E2E)
      2. Run: npm install
      3. Run: npm run build
      4. Run: ls dist/
    Expected Result: Step 3 exits 0, Step 4 shows dist/ with index.html and assets/
    Failure Indicators: Any command exits non-zero
    Evidence: .sisyphus/evidence/task-2-scaffold-build.txt

  Scenario: Dev server starts and serves content
    Tool: Bash
    Preconditions: Scaffold complete, npm install done
    Steps:
      1. Run: npx vite --host 0.0.0.0 --port 5173 &
      2. Sleep 3
      3. Run: curl -s http://localhost:5173 | head -20
      4. Kill vite process
    Expected Result: curl returns HTML with <div id="app"> or Vue app mount point
    Failure Indicators: Connection refused, empty response, non-HTML response
    Evidence: .sisyphus/evidence/task-2-dev-server.txt
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-2-scaffold-build.txt` — build output
  - [ ] `.sisyphus/evidence/task-2-dev-server.txt` — curl response

  **Commit**: YES
  - Message: `feat: scaffold Vue 3 + Vite + TypeScript project with router and Vitest`
  - Files: All scaffolded files
  - Pre-commit: `npm run test:unit`

- [x] 3. Set up Tailwind CSS v4 with dark mode

  **What to do**:
  - Install: `npm install tailwindcss @tailwindcss/vite`
  - In `vite.config.ts`: add `import tailwindcss from '@tailwindcss/vite'` and include `tailwindcss()` in plugins array
  - In `src/assets/main.css`: replace existing content with:
    ```css
    @import "tailwindcss";

    @variant dark (&:where(.dark, .dark *));

    @theme {
      --color-primary: #3b82f6;
      --color-primary-dark: #60a5fa;
      --color-bg-light: #ffffff;
      --color-bg-dark: #0f172a;
      --color-text-light: #1e293b;
      --color-text-dark: #e2e8f0;
    }
    ```
  - In `src/main.ts`: verify `import './assets/main.css'` exists (should be there from scaffold)
  - Verify: `npm run dev` starts, Tailwind classes work in App.vue
  - **CRITICAL — Tailwind v4 conventions**:
    - Do NOT create `tailwind.config.js` or `postcss.config.js` (v4 doesn't use them)
    - Dark mode uses `@variant dark` in CSS, NOT `darkMode: 'class'`
    - Theme customization is in CSS via `@theme {}`, not in JS config

  **Must NOT do**:
  - Do NOT create `tailwind.config.js` — v4 doesn't use it
  - Do NOT create `postcss.config.js` — `@tailwindcss/vite` replaces PostCSS
  - Do NOT install `autoprefixer` or `postcss` — not needed with v4

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Package install + config file edits — straightforward plumbing
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: YES — with Task 4 (router config doesn't depend on Tailwind)
  - **Parallel Group**: Wave 1 (with Task 4, Task 5 after Task 2)
  - **Blocks**: Tasks 6-12, 15
  - **Blocked By**: Task 2

  **References**:
  - Tailwind CSS v4 installation: `https://tailwindcss.com/docs/installation/vite` — `@tailwindcss/vite` plugin setup
  - Tailwind CSS v4 dark mode: `https://tailwindcss.com/docs/dark-mode` — `@variant dark` syntax
  - `vite.config.ts`: edit to add the plugin
  - `src/assets/main.css`: overwrite with v4 imports

  **Acceptance Criteria**:
  - [ ] `tailwindcss` and `@tailwindcss/vite` in `package.json` dependencies
  - [ ] `vite.config.ts` has `tailwindcss()` in plugins array
  - [ ] `src/assets/main.css` contains `@import "tailwindcss"` and `@variant dark`
  - [ ] No `tailwind.config.js` exists (verify negative)
  - [ ] No `postcss.config.js` exists (verify negative)
  - [ ] `npm run dev` starts — Tailwind utility classes render correctly

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Tailwind v4 compiles without errors
    Tool: Bash
    Preconditions: Task 2 complete, npm install done for Tailwind
    Steps:
      1. Run: npm run build
      2. Run: ls dist/assets/*.css
    Expected Result: Build exits 0, CSS file exists in dist/assets/
    Failure Indicators: Build fails with CSS error, no CSS output, error about tailwind.config.js
    Evidence: .sisyphus/evidence/task-3-build-css.txt

  Scenario: NO legacy v3 config files exist
    Tool: Bash
    Preconditions: Tailwind setup complete
    Steps:
      1. Run: test -f tailwind.config.js && echo "FAIL" || echo "OK"
      2. Run: test -f postcss.config.js && echo "FAIL" || echo "OK"
    Expected Result: Both print "OK" (files do not exist)
    Failure Indicators: Either file exists — means v3 convention was incorrectly applied
    Evidence: .sisyphus/evidence/task-3-no-legacy-config.txt
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-3-build-css.txt` — build output
  - [ ] `.sisyphus/evidence/task-3-no-legacy-config.txt` — legacy file check

  **Commit**: YES
  - Message: `feat: add Tailwind CSS v4 with dark mode support`
  - Files: `vite.config.ts`, `src/assets/main.css`, `package.json`
  - Pre-commit: `npm run build`

- [x] 4. Configure Vue Router with hash history

  **What to do**:
  - In `src/router/index.ts`: change `createWebHistory()` to `createWebHashHistory()`
  - Ensure `base` is NOT set in router (hash mode doesn't need it — the Vite `base` handles asset paths)
  - Add two routes:
    - `{ path: '/', name: 'home', component: () => import('@/views/HomeView.vue') }`
    - `{ path: '/contact', name: 'contact', component: () => import('@/views/ContactView.vue') }`
  - Remove any example routes/views from the scaffold
  - In `vite.config.ts`: set `base: '/cjnicholls/'` (critical for GitHub Pages)
  - Verify: `npm run dev` → `http://localhost:5173/#/` shows Home, `/#/contact` shows Contact

  **Must NOT do**:
  - Do NOT use `createWebHistory()` — breaks on GitHub Pages
  - Do NOT set `base` in router config — only in `vite.config.ts`

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Small config change, two route definitions — trivial
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: YES — with Task 3
  - **Parallel Group**: Wave 1 (with Task 3)
  - **Blocks**: Tasks 6, 8-12
  - **Blocked By**: Task 2

  **References**:
  - Vue Router hash mode: `https://router.vuejs.org/guide/essentials/history-mode.html#hash-mode` — `createWebHashHistory` API
  - Vite base config: `https://vitejs.dev/config/shared-options.html#base` — GitHub Pages base path
  - `src/router/index.ts`: edit existing router setup
  - `vite.config.ts`: add base path

  **Acceptance Criteria**:
  - [ ] `src/router/index.ts` uses `createWebHashHistory()` (not `createWebHistory`)
  - [ ] Routes defined for `/` (home) and `/contact`
  - [ ] `vite.config.ts` has `base: '/cjnicholls/'`
  - [ ] `npm run dev` → hash routes work (URL shows `/#/` pattern)

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Hash routing works in dev mode
    Tool: Bash
    Preconditions: Task 2 complete, router configured
    Steps:
      1. Start: npx vite --port 5174 &
      2. Sleep 3
      3. Run: curl -s http://localhost:5174/ | grep -o 'app'
      4. Kill vite
    Expected Result: curl returns HTML with Vue app mount point
    Failure Indicators: 404, empty response
    Evidence: .sisyphus/evidence/task-4-hash-routing.txt
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-4-hash-routing.txt` — curl output

  **Commit**: YES
  - Message: `feat: configure Vue Router with hash history and GitHub Pages base path`
  - Files: `src/router/index.ts`, `vite.config.ts`

- [x] 5. Implement light/dark theme system

  **What to do**:
  - Create `src/composables/useTheme.ts`:
    - Reactive `theme` ref (`'light' | 'dark'`)
    - Initialize from `localStorage.getItem('theme')` or system preference (`window.matchMedia('(prefers-color-scheme: dark)')`)
    - `toggleTheme()` function: swap light ↔ dark, persist to `localStorage`
    - Apply `document.documentElement.classList` with `.dark` class
  - Create `src/components/__tests__/useTheme.spec.ts` (TDD — write BEFORE implementing):
    ```ts
    // Test 1: defaults to system preference when no localStorage
    // Test 2: reads from localStorage if set
    // Test 3: toggleTheme switches light ↔ dark
    // Test 4: toggleTheme persists to localStorage
    ```
  - Verify: `npm run test:unit` — 4 theme tests pass

  **Must NOT do**:
  - Do NOT use a Pinia store — composable is sufficient
  - Do NOT hardcode default theme — respect system preference

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single composable + tests — well-scoped, clear requirements
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: YES — with nothing else needed from Wave 1 (after Task 2, 3, 4 complete)
  - **Parallel Group**: Wave 1
  - **Blocks**: Tasks 6, 7, 12
  - **Blocked By**: Task 2

  **References**:
  - Vue composables pattern: `https://vuejs.org/guide/reusability/composables.html` — composable conventions
  - Tailwind v4 dark mode: `@variant dark (&:where(.dark, .dark *))` (already set up in Task 3)
  - `window.matchMedia` API: `https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia` — system preference detection
  - `localStorage` API: persistence pattern

  **Acceptance Criteria**:
  - [ ] `src/composables/useTheme.ts` exists
  - [ ] `src/components/__tests__/useTheme.spec.ts` exists
  - [ ] `npm run test:unit` — theme tests pass (4 tests minimum)
  - [ ] `toggleTheme()` adds/removes `.dark` class on `document.documentElement`
  - [ ] Theme preference persists across page reloads (localStorage)

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: TDD — tests pass after implementation
    Tool: Bash
    Preconditions: Composable and test file exist
    Steps:
      1. Run: npm run test:unit -- src/components/__tests__/useTheme.spec.ts
    Expected Result: All 4 tests pass, exit code 0
    Failure Indicators: Any test failure, exit code non-zero
    Evidence: .sisyphus/evidence/task-5-theme-tests.txt

  Scenario: Toggle switches theme class on document
    Tool: Playwright
    Preconditions: App running with theme composable wired to App.vue
    Steps:
      1. Navigate to http://localhost:5173
      2. Assert: document.documentElement does not have .dark class initially (or does, depending on system pref)
      3. Click theme toggle button
      4. Assert: document.documentElement.classList contains 'dark' (or doesn't, if toggled back)
    Expected Result: Class toggles on click
    Failure Indicators: Class doesn't change, localStorage not updated
    Evidence: .sisyphus/evidence/task-5-theme-toggle.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-5-theme-tests.txt` — Vitest output
  - [ ] `.sisyphus/evidence/task-5-theme-toggle.png` — Playwright screenshot

  **Commit**: YES
  - Message: `feat: add light/dark theme composable with tests`
  - Files: `src/composables/useTheme.ts`, `src/components/__tests__/useTheme.spec.ts`
  - Pre-commit: `npm run test:unit`

- [x] 6. Build AppNavbar component (responsive, with theme toggle slot)

  **What to do**:
  - Write test FIRST (`src/components/__tests__/AppNavbar.spec.ts`):
    - Test 1: renders Home and Contact links
    - Test 2: applies active class to current route link
    - Test 3: renders hamburger button on mobile (jsdom with mobile viewport)
    - Test 4: clicking hamburger toggles mobile menu visibility
  - Create `src/components/AppNavbar.vue`:
    - Desktop: horizontal nav with Home | Contact links, `<slot name="theme-toggle" />` on the right
    - Mobile (< `md` breakpoint): hamburger icon (☰), slide-down menu with links + theme toggle
    - Use `<router-link>` with `active-class` for current page highlighting
    - Apply Tailwind classes: `fixed top-0 w-full`, `bg-white dark:bg-slate-900`, `shadow-sm`, `z-50`
    - Links: `px-4 py-2`, `hover:text-primary`, active state with `border-b-2 border-primary`
    - Mobile menu: hidden by default, shown with `v-show` toggle, transitions with Tailwind
  - Verify: `npm run test:unit` — 4 navbar tests pass

  **Must NOT do**:
  - Do NOT use an external icon library — use Unicode `☰` (U+2630) for hamburger, `✕` (U+2715) for close
  - Do NOT create a `useNavbar` composable — over-abstraction for a static nav

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Responsive UI component with mobile/desktop states, Tailwind styling, accessibility requirements
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: YES — with Tasks 7-11
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 4, 5

  **References**:
  - Vue Router `<router-link>`: `https://router.vuejs.org/api/#router-link` — `active-class`, `to` props
  - Tailwind responsive: `https://tailwindcss.com/docs/responsive-design` — `md:` breakpoint for mobile/desktop split
  - Vue `<slot>`: `https://vuejs.org/guide/components/slots.html` — named slot for theme toggle
  - `src/router/index.ts`: route names for link targets
  - `src/composables/useTheme.ts`: theme context (used by ThemeToggle slotted in)

  **Acceptance Criteria**:
  - [ ] Test file: `src/components/__tests__/AppNavbar.spec.ts` — 4 tests pass
  - [ ] Navbar renders Home and Contact as `<router-link>` elements
  - [ ] Active link visually distinct (border or color change)
  - [ ] On mobile viewport (< 768px): hamburger visible, nav links hidden until toggle
  - [ ] `<slot name="theme-toggle">` renders ThemeToggle when provided
  - [ ] Navbar is fixed at top, doesn't scroll with page content
  - [ ] Respects dark mode: `dark:bg-slate-900 dark:text-white`

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Desktop — navbar renders horizontally
    Tool: Playwright
    Preconditions: App running, viewport width 1280px
    Steps:
      1. Navigate to http://localhost:5173
      2. Wait for .app-navbar selector
      3. Assert: "Home" link is visible
      4. Assert: "Contact" link is visible
      5. Assert: hamburger button is NOT visible (display: none or not rendered)
      6. Screenshot
    Expected Result: Two nav links visible inline, no hamburger
    Failure Indicators: Hamburger visible on desktop, links missing, layout broken
    Evidence: .sisyphus/evidence/task-6-navbar-desktop.png

  Scenario: Mobile — hamburger menu works
    Tool: Playwright
    Preconditions: App running, viewport width 375px (iPhone SE)
    Steps:
      1. Navigate to http://localhost:5173
      2. Assert: hamburger button (☰) is visible
      3. Assert: nav links are hidden
      4. Click hamburger button
      5. Assert: nav links slide down and are visible
      6. Assert: close icon (✕) replaces hamburger
      7. Click close icon
      8. Assert: nav links hidden again
      9. Screenshot (menu open and closed)
    Expected Result: Toggle works, links accessible on mobile
    Failure Indicators: Menu doesn't open, links not clickable, layout overflow
    Evidence: .sisyphus/evidence/task-6-navbar-mobile-open.png, task-6-navbar-mobile-closed.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-6-navbar-desktop.png`
  - [ ] `.sisyphus/evidence/task-6-navbar-mobile-open.png`
  - [ ] `.sisyphus/evidence/task-6-navbar-mobile-closed.png`

  **Commit**: YES
  - Message: `feat: add responsive AppNavbar with mobile hamburger menu`
  - Files: `src/components/AppNavbar.vue`, `src/components/__tests__/AppNavbar.spec.ts`
  - Pre-commit: `npm run test:unit`

- [ ] 7. Build ThemeToggle component

  **What to do**:
  - Write test FIRST (`src/components/__tests__/ThemeToggle.spec.ts`):
    - Test 1: renders sun icon when theme is 'light'
    - Test 2: renders moon icon when theme is 'dark'
    - Test 3: clicking button calls toggleTheme
    - Test 4: button has accessible aria-label
  - Create `src/components/ThemeToggle.vue`:
    - Uses `useTheme()` composable
    - Light mode: ☀️ sun icon (Unicode U+2600) + "Light" label
    - Dark mode: 🌙 moon icon (Unicode U+1F319) + "Dark" label
    - Accessible: `aria-label="Toggle theme"`, `role="button"`, `tabindex="0"`
    - Tailwind: `p-2 rounded-full`, `hover:bg-gray-200 dark:hover:bg-gray-700`, `focus:outline-none focus:ring-2`
  - Verify: `npm run test:unit` — 4 toggle tests pass

  **Must NOT do**:
  - Do NOT import icon libraries — use Unicode emoji
  - Do NOT use a third-party toggle component

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI component with accessibility, state management integration, Tailwind styling
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: YES — with Tasks 6, 8-11
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12
  - **Blocked By**: Task 5

  **References**:
  - `src/composables/useTheme.ts`: `theme` ref and `toggleTheme()` function
  - Vue composables usage: `useTheme()` return type
  - WCAG button guidelines: aria-label, role, tabindex for accessible controls

  **Acceptance Criteria**:
  - [ ] Test file: `src/components/__tests__/ThemeToggle.spec.ts` — 4 tests pass
  - [ ] Shows ☀️ when theme is 'light', 🌙 when theme is 'dark'
  - [ ] Clicking toggles theme and updates localStorage
  - [ ] `aria-label="Toggle theme"` present
  - [ ] Visible focus ring for keyboard navigation

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Toggle switches icon and theme
    Tool: Playwright
    Preconditions: App running at http://localhost:5173, theme is 'light'
    Steps:
      1. Navigate to http://localhost:5173
      2. Assert: sun icon (☀️) is visible in toggle button
      3. Assert: .dark class is NOT on document.documentElement
      4. Click theme toggle button
      5. Assert: moon icon (🌙) is visible
      6. Assert: .dark class IS on document.documentElement
      7. Screenshot (dark mode)
    Expected Result: Icon swaps, dark class applied/removed
    Failure Indicators: Icon doesn't change, theme doesn't toggle, localStorage unchanged
    Evidence: .sisyphus/evidence/task-7-theme-toggle-dark.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-7-theme-toggle-dark.png`

  **Commit**: YES
  - Message: `feat: add ThemeToggle component with accessibility support`
  - Files: `src/components/ThemeToggle.vue`, `src/components/__tests__/ThemeToggle.spec.ts`
  - Pre-commit: `npm run test:unit`

- [ ] 8. Build HomeView — hero section

  **What to do**:
  - Write test FIRST (`src/views/__tests__/HomeView.spec.ts`):
    - Test 1: renders hero section with name heading
    - Test 2: renders subtitle/tagline text
    - Test 3: hero section has `pt-20` or equivalent top padding (to clear fixed navbar)
  - Create `src/views/HomeView.vue` with hero section:
    - Full-width hero with `min-h-[60vh]`, `flex items-center justify-center`
    - Name: `<h1>` with `text-4xl md:text-6xl font-bold`
    - Tagline: `<p>` with `text-lg md:text-xl text-gray-600 dark:text-gray-300`
    - Subtle gradient or border-bottom separator
    - Placeholder content: `[Your Name]` and `[Your Tagline]`
    - Mobile: stack vertically, reduce font sizes
  - Verify: `npm run test:unit` — hero tests pass

  **Must NOT do**:
  - Do NOT use real personal data — use `[Your Name]` / `[Your Tagline]` placeholders
  - Do NOT add animations yet — static content first

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Visual hero section with responsive typography, Tailwind layout
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: YES — with Tasks 6, 7, 9-11
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 3, 4

  **References**:
  - Tailwind typography: `https://tailwindcss.com/docs/font-size` — responsive text sizes
  - Tailwind min-height: `https://tailwindcss.com/docs/min-height` — `min-h-screen`, `min-h-[60vh]`
  - `src/components/AppNavbar.vue`: navbar height for padding calculation
  - `src/assets/main.css`: custom theme colors for headings

  **Acceptance Criteria**:
  - [ ] Test file: `src/views/__tests__/HomeView.spec.ts` — hero tests pass
  - [ ] Hero section visible with `<h1>` name and `<p>` tagline
  - [ ] Hero has sufficient top padding (not hidden behind fixed navbar)
  - [ ] Responsive: font sizes reduce on mobile
  - [ ] Placeholder content clearly marked as `[Your Name]` / `[Your Tagline]`

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Hero renders on desktop
    Tool: Playwright
    Preconditions: App running, viewport 1280px
    Steps:
      1. Navigate to http://localhost:5173
      2. Wait for h1 selector
      3. Assert: h1 text contains "[Your Name]"
      4. Assert: p tagline contains "[Your Tagline]"
      5. Assert: hero section is at least 60% of viewport height
      6. Screenshot
    Expected Result: Full hero visible with placeholder content
    Failure Indicators: Hero hidden behind navbar, text too small/big, layout broken
    Evidence: .sisyphus/evidence/task-8-hero-desktop.png

  Scenario: Hero renders on mobile
    Tool: Playwright
    Preconditions: App running, viewport 375px
    Steps:
      1. Navigate to http://localhost:5173
      2. Assert: h1 text is readable (no horizontal scroll)
      3. Assert: no content is cut off
      4. Screenshot
    Expected Result: Hero fits mobile screen, text readable
    Failure Indicators: Horizontal overflow, text too large for screen
    Evidence: .sisyphus/evidence/task-8-hero-mobile.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-8-hero-desktop.png`
  - [ ] `.sisyphus/evidence/task-8-hero-mobile.png`

  **Commit**: YES
  - Message: `feat: add HomeView hero section with responsive typography`
  - Files: `src/views/HomeView.vue`, `src/views/__tests__/HomeView.spec.ts`

- [ ] 9. Build HomeView — about + links sections

  **What to do**:
  - Add tests to `src/views/__tests__/HomeView.spec.ts`:
    - Test 4: renders about section with bio text
    - Test 5: renders links section with at least one social link
  - Add about section to `HomeView.vue`:
    - Section with `max-w-2xl mx-auto px-4 py-16`
    - `<h2>` heading: "About"
    - `<p>` with placeholder bio text: `[Your bio — a few sentences about yourself]`
    - Clean typography: `text-base md:text-lg leading-relaxed`
  - Add links section to `HomeView.vue`:
    - Section with same max-width container
    - `<h2>` heading: "Links"
    - List of placeholder links: GitHub, LinkedIn, Email (using `<a>` with `href="#"`)
    - Each link: icon (Unicode) + label, `hover:text-primary dark:hover:text-primary-dark`, `transition-colors`
    - Layout: `flex flex-wrap gap-4` for link items

  **Must NOT do**:
  - Do NOT use real URLs — use `href="#"` placeholders
  - Do NOT use icon libraries — use Unicode: `🐙` GitHub, `💼` LinkedIn, `✉️` Email

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Content sections with layout, typography, and link styling
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: YES — with Tasks 6-8, 10-11
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 3, 4

  **References**:
  - Task 8: `HomeView.vue` structure to extend (same file)
  - Tailwind max-width: `https://tailwindcss.com/docs/max-width` — `max-w-2xl` for readable text width
  - `src/assets/main.css`: custom theme colors for link hover states

  **Acceptance Criteria**:
  - [ ] About section with `<h2>About</h2>` and bio placeholder text
  - [ ] Links section with `<h2>Links</h2>` and 3 placeholder links
  - [ ] Links use accessible `<a>` tags (not `<div>` or `<span>`)
  - [ ] Content container respects `max-w-2xl` for readability
  - [ ] Responsive: sections stack cleanly on mobile

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: About and links sections visible
    Tool: Playwright
    Preconditions: App running, viewport 375px (mobile)
    Steps:
      1. Navigate to http://localhost:5173
      2. Scroll below hero
      3. Assert: "About" heading is visible
      4. Assert: bio placeholder text is visible
      5. Assert: "Links" heading is visible
      6. Assert: at least 3 link elements (GitHub, LinkedIn, Email) visible
      7. Screenshot
    Expected Result: All sections render with placeholder content
    Failure Indicators: Sections missing, links not clickable, text overflow
    Evidence: .sisyphus/evidence/task-9-about-links.png

  Scenario: Links have hover states (desktop)
    Tool: Playwright
    Preconditions: App running, viewport 1280px
    Steps:
      1. Navigate to http://localhost:5173
      2. Scroll to links section
      3. Hover over GitHub link
      4. Assert: link color changes (hover state applied)
      5. Screenshot before and after hover
    Expected Result: Hover triggers color transition
    Failure Indicators: No visual change on hover, link not interactive
    Evidence: .sisyphus/evidence/task-9-links-hover.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-9-about-links.png`
  - [ ] `.sisyphus/evidence/task-9-links-hover.png`

  **Commit**: YES
  - Message: `feat: add about and social links sections to HomeView`
  - Files: `src/views/HomeView.vue`, `src/views/__tests__/HomeView.spec.ts`

- [ ] 10. Build HomeView — skills section

  **What to do**:
  - Add tests to `src/views/__tests__/HomeView.spec.ts`:
    - Test 6: renders skills section heading
    - Test 7: renders skill tags/badges
  - Add skills section to `HomeView.vue`:
    - Section with `max-w-2xl mx-auto px-4 py-16`
    - `<h2>` heading: "Skills"
    - Grid of skill tags: `flex flex-wrap gap-2`
    - Each tag: `<span>` with `px-3 py-1 rounded-full text-sm`, `bg-gray-100 dark:bg-gray-800`, `border border-gray-200 dark:border-gray-700`
    - Placeholder skills: `["TypeScript", "Vue 3", "Tailwind CSS", "Git", "GitHub Actions", "REST APIs"]`
    - Mobile: tags wrap naturally in flex container

  **Must NOT do**:
  - Do NOT use a progress bar or percentage — just simple tag/badge style
  - Do NOT hardcode skills — use a reactive array (easily editable later)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Visual tag grid with responsive layout
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: YES — with Tasks 6-9, 11
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12
  - **Blocked By**: Task 3

  **References**:
  - Task 8-9: `HomeView.vue` — extend existing structure
  - Tailwind flexbox: `https://tailwindcss.com/docs/flex-wrap` — tag wrapping

  **Acceptance Criteria**:
  - [ ] Skills section with `<h2>Skills</h2>` heading
  - [ ] At least 4 skill tags rendered
  - [ ] Tags wrap naturally on narrow screens
  - [ ] Tags use rounded pill/badge style
  - [ ] Tags respect dark mode

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Skills section renders tags
    Tool: Playwright
    Preconditions: App running, viewport 1280px
    Steps:
      1. Navigate to http://localhost:5173
      2. Scroll to skills section
      3. Assert: "Skills" heading visible
      4. Assert: at least 6 skill tags visible
      5. Assert: "TypeScript" tag is present
      6. Assert: "Vue 3" tag is present
      7. Screenshot
    Expected Result: All 6 placeholder skills visible as styled tags
    Failure Indicators: Tags missing, tags not styled, layout broken
    Evidence: .sisyphus/evidence/task-10-skills-desktop.png

  Scenario: Tags wrap on mobile
    Tool: Playwright
    Preconditions: App running, viewport 375px
    Steps:
      1. Navigate to http://localhost:5173
      2. Scroll to skills section
      3. Assert: all tags fit within viewport (no horizontal scroll)
      4. Assert: tags wrap to multiple rows
      5. Screenshot
    Expected Result: Tags wrap cleanly, no overflow
    Failure Indicators: Horizontal scrollbar, tags cut off
    Evidence: .sisyphus/evidence/task-10-skills-mobile.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-10-skills-desktop.png`
  - [ ] `.sisyphus/evidence/task-10-skills-mobile.png`

  **Commit**: YES
  - Message: `feat: add skills section with tag grid to HomeView`
  - Files: `src/views/HomeView.vue`, `src/views/__tests__/HomeView.spec.ts`

- [ ] 11. Build ContactView with Formspree form

  **What to do**:
  - Write test FIRST (`src/views/__tests__/ContactView.spec.ts`):
    - Test 1: renders contact form with name, email, message fields
    - Test 2: form has `method="POST"` and Formspree action URL
    - Test 3: submit button is disabled when required fields are empty
    - Test 4: renders success message placeholder state
    - Test 5: renders error message placeholder state
  - Create `src/views/ContactView.vue`:
    - Section with `max-w-lg mx-auto px-4 py-16`
    - `<h1>` heading: "Contact"
    - `<form>` with `action="https://formspree.io/f/[FORMSPREE_FORM_ID]" method="POST"`
    - Fields:
      - Name: `<input type="text" name="name" required>` with label
      - Email: `<input type="email" name="email" required>` with label
      - Message: `<textarea name="message" required rows="5">` with label
    - Submit button: `<button type="submit">` with `bg-primary text-white px-6 py-3 rounded-lg`
    - Form states: idle, submitting (disabled button + "Sending..." text), success ("Thanks! I'll get back to you."), error ("Something went wrong. Please try again.")
    - Handle form submission: prevent default, fetch POST to Formspree, handle response
    - Formspree redirect avoidance: use AJAX submission with `accept: application/json` header
    - Form validation: `required` attributes on all fields, basic HTML5 validation
    - Placeholder note above form: `<!-- Replace [FORMSPREE_FORM_ID] with your Formspree form ID -->`
  - Verify: `npm run test:unit` — contact form tests pass

  **Must NOT do**:
  - Do NOT use a real Formspree ID — use `[FORMSPREE_FORM_ID]` placeholder
  - Do NOT add CAPTCHA or complex validation — HTML5 `required` + `type="email"` is sufficient
  - Do NOT redirect to Formspree's thank-you page — use AJAX submission for SPA experience

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Form UI with multiple states (idle/submitting/success/error), accessibility, AJAX submission
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: YES — with Tasks 6-10
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 3, 4

  **References**:
  - Formspree AJAX docs: `https://help.formspree.io/hc/en-us/articles/360056076594` — AJAX submission with `accept: application/json`
  - Vue form handling: `https://vuejs.org/guide/essentials/forms.html` — v-model, form submission
  - `src/composables/useTheme.ts`: dark mode awareness for form styling
  - `src/assets/main.css`: theme colors for button and input styles

  **Acceptance Criteria**:
  - [ ] Test file: `src/views/__tests__/ContactView.spec.ts` — 5 tests pass
  - [ ] Form has name, email, message fields with labels
  - [ ] All fields have `required` attribute
  - [ ] Email field has `type="email"`
  - [ ] Form action points to `https://formspree.io/f/[FORMSPREE_FORM_ID]`
  - [ ] Submit button disabled while submitting
  - [ ] Success state renders after simulated successful submission
  - [ ] Error state renders after simulated failed submission

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Happy path — form renders with all fields
    Tool: Playwright
    Preconditions: App running, viewport 1280px
    Steps:
      1. Navigate to http://localhost:5173/#/contact
      2. Assert: "Contact" heading visible
      3. Assert: "Name" input field visible (selector: input[name="name"])
      4. Assert: "Email" input field visible (selector: input[name="email"])
      5. Assert: "Message" textarea visible (selector: textarea[name="message"])
      6. Assert: submit button visible with text "Send" or "Submit"
      7. Screenshot
    Expected Result: Complete form visible with all fields and labels
    Failure Indicators: Missing fields, broken layout, fields not labeled
    Evidence: .sisyphus/evidence/task-11-contact-form.png

  Scenario: Validation — empty fields block submission
    Tool: Playwright
    Preconditions: App running, viewport 1280px
    Steps:
      1. Navigate to http://localhost:5173/#/contact
      2. Leave all fields empty
      3. Click submit button
      4. Assert: form is NOT submitted (browser validation prevents it)
      5. Assert: required field indicators are visible (browser native)
    Expected Result: Browser shows native validation errors
    Failure Indicators: Form submits with empty fields, no validation feedback
    Evidence: .sisyphus/evidence/task-11-contact-validation.png

  Scenario: Mobile — form fits screen
    Tool: Playwright
    Preconditions: App running, viewport 375px
    Steps:
      1. Navigate to http://localhost:5173/#/contact
      2. Assert: no horizontal scrollbar
      3. Assert: all fields are visible and tappable (minimum 44px touch target)
      4. Fill name: "Test User"
      5. Fill email: "test@example.com"
      6. Fill message: "Hello, this is a test message."
      7. Screenshot with filled form
    Expected Result: Form usable on mobile, fields accept input
    Failure Indicators: Horizontal overflow, fields too small to tap, keyboard covers fields
    Evidence: .sisyphus/evidence/task-11-contact-mobile.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-11-contact-form.png`
  - [ ] `.sisyphus/evidence/task-11-contact-validation.png`
  - [ ] `.sisyphus/evidence/task-11-contact-mobile.png`

  **Commit**: YES
  - Message: `feat: add ContactView with Formspree-powered contact form`
  - Files: `src/views/ContactView.vue`, `src/views/__tests__/ContactView.spec.ts`

- [ ] 12. Wire up App.vue root layout

  **What to do**:
  - Edit `src/App.vue`:
    - Import and use `useTheme()` composable
    - Bind theme class: `<div :class="{ dark: theme === 'dark' }">` wrapping the app
    - Include `<AppNavbar>` at top with `<template #theme-toggle>` slot containing `<ThemeToggle />`
    - `<main>` with `<router-view />` and `pt-16` (or appropriate padding for fixed navbar height)
    - Footer: minimal `<footer>` with `© [Year] [Your Name]` and `text-center text-sm text-gray-500 py-8`
    - Apply base styles: `min-h-screen`, `bg-white dark:bg-slate-900`, `text-gray-900 dark:text-gray-100`, `transition-colors duration-200`
  - Write test: `src/__tests__/App.spec.ts`:
    - Test 1: renders navbar
    - Test 2: renders router-view
    - Test 3: renders footer
    - Test 4: applies dark class when theme is dark
  - Verify: `npm run test:unit` — all App tests pass
  - Verify: `npm run dev` — full app renders with navbar, routed content, footer, theme toggle

  **Must NOT do**:
  - Do NOT import components that use `<script setup>` without proper mount setup in tests
  - Do NOT skip the footer — even minimal is fine

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Root layout assembly, theme class binding, slot wiring
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: NO — depends on ALL Wave 2 components
  - **Parallel Group**: Wave 3
  - **Blocks**: Tasks 13-15
  - **Blocked By**: Tasks 6-11

  **References**:
  - `src/components/AppNavbar.vue`: component and slot name
  - `src/components/ThemeToggle.vue`: component to slot in
  - `src/composables/useTheme.ts`: `theme` ref for class binding
  - `src/router/index.ts`: route structure for `<router-view>`

  **Acceptance Criteria**:
  - [ ] App.vue renders navbar with theme toggle slotted in
  - [ ] `<router-view>` renders current route content
  - [ ] Footer visible at bottom
  - [ ] Dark class toggles on root element when theme changes
  - [ ] `npm run dev` — full app functional with all pages navigable

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Full app renders with all parts
    Tool: Playwright
    Preconditions: App running, viewport 1280px
    Steps:
      1. Navigate to http://localhost:5173
      2. Assert: AppNavbar visible (Home and Contact links)
      3. Assert: ThemeToggle visible in navbar
      4. Assert: Home page content visible (hero, about, links, skills)
      5. Assert: Footer visible at bottom
      6. Screenshot (full page)
    Expected Result: Complete page layout with all components
    Failure Indicators: Missing navbar/footer, router-view empty, components overlapping
    Evidence: .sisyphus/evidence/task-12-app-full-desktop.png

  Scenario: Navigation works between pages
    Tool: Playwright
    Preconditions: App running, viewport 1280px
    Steps:
      1. Navigate to http://localhost:5173
      2. Click "Contact" link in navbar
      3. Wait for URL to contain /#/contact
      4. Assert: contact form is visible
      5. Click "Home" link
      6. Wait for URL to contain /#/ (home)
      7. Assert: hero section is visible
    Expected Result: Smooth navigation between pages, correct content renders
    Failure Indicators: 404-like blank page, wrong content for route, URL doesn't change
    Evidence: .sisyphus/evidence/task-12-navigation.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-12-app-full-desktop.png`
  - [ ] `.sisyphus/evidence/task-12-navigation.png`

  **Commit**: YES
  - Message: `feat: wire up App.vue root layout with navbar, router, theme, and footer`
  - Files: `src/App.vue`, `src/__tests__/App.spec.ts`
  - Pre-commit: `npm run test:unit`

- [ ] 13. Set up GitHub Actions deployment workflow

  **What to do**:
  - Create `.github/workflows/deploy.yml`:
    - Trigger: push to `2026-rewrite` branch
    - Jobs: `build-and-deploy`
    - Steps:
      1. Checkout repo
      2. Setup Node.js (v20 or v22)
      3. `npm ci`
      4. `npm run build`
      5. Deploy `dist/` to GitHub Pages using `peaceiris/actions-gh-pages@v4`
    - Config for `peaceiris/actions-gh-pages`:
      - `publish_dir: ./dist`
      - `publish_branch: gh-pages`
      - `github_token: ${{ secrets.GITHUB_TOKEN }}`
  - Verify workflow syntax: valid YAML, no typos in action versions
  - After merge/push, GitHub Pages will serve from `gh-pages` branch

  **Must NOT do**:
  - Do NOT configure a custom domain unless explicitly requested
  - Do NOT use `actions/upload-pages-artifact` v1 (deprecated) — use `peaceiris/actions-gh-pages`
  - Do NOT hardcode any secrets

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single YAML file with well-known GitHub Actions pattern
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: NO — after Task 12
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 14
  - **Blocked By**: Task 12

  **References**:
  - `peaceiris/actions-gh-pages`: `https://github.com/peaceiris/actions-gh-pages` — v4 usage
  - Vite static deploy guide: `https://vitejs.dev/guide/static-deploy.html#github-pages` — GitHub Pages configuration
  - `vite.config.ts`: base path `/cjnicholls/` for correct asset URLs

  **Acceptance Criteria**:
  - [ ] `.github/workflows/deploy.yml` exists with valid YAML
  - [ ] Workflow triggers on push to `2026-rewrite`
  - [ ] Build step runs `npm ci && npm run build`
  - [ ] Deploy step uses `peaceiris/actions-gh-pages@v4` with `publish_dir: ./dist`

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Workflow file is valid YAML
    Tool: Bash
    Preconditions: deploy.yml written
    Steps:
      1. Run: python3 -c "import yaml; yaml.safe_load(open('.github/workflows/deploy.yml'))" 2>&1
    Expected Result: No errors — YAML is valid
    Failure Indicators: YAML parse error
    Evidence: .sisyphus/evidence/task-13-yaml-valid.txt

  Scenario: Build produces deployable output
    Tool: Bash
    Preconditions: All previous tasks complete
    Steps:
      1. Run: npm run build
      2. Run: ls dist/index.html && echo "OK"
      3. Run: grep -c '/cjnicholls/' dist/index.html
    Expected Result: Build succeeds, index.html exists, base path `/cjnicholls/` present in output
    Failure Indicators: Build failure, no index.html, wrong base path
    Evidence: .sisyphus/evidence/task-13-build-verify.txt
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-13-yaml-valid.txt`
  - [ ] `.sisyphus/evidence/task-13-build-verify.txt`

  **Commit**: YES
  - Message: `ci: add GitHub Actions workflow for GitHub Pages deployment`
  - Files: `.github/workflows/deploy.yml`

- [ ] 14. Build verification and local deploy test

  **What to do**:
  - Run final production build: `npm run build`
  - Verify `dist/` structure:
    - `dist/index.html` — entry point
    - `dist/assets/` — has JS and CSS bundles
    - Asset paths in `index.html` use `/cjnicholls/` prefix
  - Run full test suite: `npm run test:unit` — all tests pass
  - Serve `dist/` locally and verify:
    - All routes work (`/`, `/#/contact`)
    - Tailwind styles load correctly
    - No 404 errors on asset requests
  - Run linter: `npm run lint` — no errors

  **Must NOT do**:
  - Do NOT push to `gh-pages` manually — only through GitHub Actions
  - Do NOT skip linting

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Running build + test commands, verifying output structure
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: YES — with Task 15 (mobile audit uses dev server, build test is independent)
  - **Parallel Group**: Wave 3 (with Task 15)
  - **Blocks**: F1-F4
  - **Blocked By**: Tasks 12, 13

  **References**:
  - `vite.config.ts`: base path for asset verification
  - All test files: `npm run test:unit` runs everything
  - `package.json`: lint script

  **Acceptance Criteria**:
  - [ ] `npm run build` exits 0
  - [ ] `dist/index.html` exists
  - [ ] Asset paths in `dist/index.html` use `/cjnicholls/` prefix
  - [ ] `npm run test:unit` — all tests pass (0 failures)
  - [ ] `npm run lint` — no errors

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Production build is complete and correct
    Tool: Bash
    Preconditions: All implementation tasks complete
    Steps:
      1. Run: npm run build 2>&1
      2. Run: npm run test:unit 2>&1
      3. Run: npm run lint 2>&1
      4. Run: ls -la dist/
    Expected Result: All three commands exit 0, dist/ populated with index.html and assets/
    Failure Indicators: Build/test/lint failure, empty dist/
    Evidence: .sisyphus/evidence/task-14-full-build.txt

  Scenario: Served dist/ loads correctly
    Tool: Bash
    Preconditions: Build complete
    Steps:
      1. Run: npx serve dist -p 4173 &
      2. Sleep 3
      3. Run: curl -s http://localhost:4173/cjnicholls/ | grep -c 'app'
      4. Kill serve process
    Expected Result: curl returns HTML with Vue app, exit code 0
    Failure Indicators: 404, empty response, MIME type errors
    Evidence: .sisyphus/evidence/task-14-serve-dist.txt
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-14-full-build.txt`
  - [ ] `.sisyphus/evidence/task-14-serve-dist.txt`

  **Commit**: NO — verification only, no code changes

- [ ] 15. Mobile responsiveness audit

  **What to do**:
  - Test on 3 breakpoints using Playwright:
    - Mobile: 375px (iPhone SE)
    - Tablet: 768px (iPad Mini)
    - Desktop: 1280px (standard laptop)
  - Check:
    - Navbar: hamburger on mobile, horizontal on tablet+
    - Home page: no horizontal overflow, text readable, images (if any) scale correctly
    - Contact page: form fields full-width, touch targets ≥44px
    - Theme toggle: visible and clickable at all sizes
    - Footer: centered, doesn't overlap content
  - Check dark mode at each breakpoint
  - Document any issues in `.sisyphus/evidence/task-15-audit.md`

  **Must NOT do**:
  - Do NOT fix issues in this task — document only (separate follow-up if needed)
  - Do NOT skip dark mode testing

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Cross-viewport visual QA with Playwright, systematic audit
  - **Skills**: [`playwright`]
    - `playwright`: Browser automation for viewport testing and screenshots

  **Parallelization**:
  - **Can Run In Parallel**: YES — with Task 14
  - **Parallel Group**: Wave 3 (with Task 14)
  - **Blocks**: F1-F4
  - **Blocked By**: Task 12

  **References**:
  - Tailwind breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
  - `src/components/AppNavbar.vue`: mobile/desktop breakpoint at `md`
  - All views and components: audit targets

  **Acceptance Criteria**:
  - [ ] Screenshots captured for 3 breakpoints × 2 pages × 2 themes = 12 screenshots minimum
  - [ ] Audit document written with findings
  - [ ] No horizontal overflow at any breakpoint
  - [ ] All interactive elements accessible (≥44px touch targets on mobile)

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Mobile — home page no overflow
    Tool: Playwright
    Preconditions: App running, viewport 375px
    Steps:
      1. Navigate to http://localhost:5173
      2. Check: document.documentElement.scrollWidth <= 375
      3. Take full-page screenshot
    Expected Result: No horizontal scrollbar, all content visible
    Failure Indicators: Horizontal overflow, content cut off
    Evidence: .sisyphus/evidence/task-15-mobile-home-light.png

  Scenario: Mobile — contact page dark mode
    Tool: Playwright
    Preconditions: App running, viewport 375px, theme toggled to dark
    Steps:
      1. Navigate to http://localhost:5173/#/contact
      2. Assert: background is dark (rgb values match dark theme)
      3. Assert: text is light/white
      4. Fill form fields to verify input styling in dark mode
      5. Take full-page screenshot
    Expected Result: Form usable in dark mode, good contrast
    Failure Indicators: White-on-white text, invisible inputs, poor contrast
    Evidence: .sisyphus/evidence/task-15-mobile-contact-dark.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-15-mobile-home-light.png`
  - [ ] `.sisyphus/evidence/task-15-mobile-contact-dark.png`
  - [ ] `.sisyphus/evidence/task-15-audit.md` — audit document

  **Commit**: NO — audit only, no code changes

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in `.sisyphus/evidence/`. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `npm run lint` + `npm run test:unit` + `npx tsc --noEmit`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, `console.log` in components, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names, Tailwind v3 config artifacts.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start from clean state (`npm run dev`). Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration: navigation flow, theme persistence across pages, form→submit→success flow. Test edge cases: rapid theme toggling, browser back/forward, resize during navigation. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (`git diff`). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N touching Task M's files. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

| Task | Message | Files | Pre-commit |
|------|---------|-------|------------|
| 1 | `chore: replace .gitignore with Node/Vue template` | `.gitignore` | — |
| 2 | `feat: scaffold Vue 3 + Vite + TypeScript project with router and Vitest` | All scaffolded files | `npm run test:unit` |
| 3 | `feat: add Tailwind CSS v4 with dark mode support` | `vite.config.ts`, `src/assets/main.css`, `package.json` | `npm run build` |
| 4 | `feat: configure Vue Router with hash history and GitHub Pages base path` | `src/router/index.ts`, `vite.config.ts` | — |
| 5 | `feat: add light/dark theme composable with tests` | `src/composables/useTheme.ts`, `src/components/__tests__/useTheme.spec.ts` | `npm run test:unit` |
| 6 | `feat: add responsive AppNavbar with mobile hamburger menu` | `src/components/AppNavbar.vue`, `src/components/__tests__/AppNavbar.spec.ts` | `npm run test:unit` |
| 7 | `feat: add ThemeToggle component with accessibility support` | `src/components/ThemeToggle.vue`, `src/components/__tests__/ThemeToggle.spec.ts` | `npm run test:unit` |
| 8 | `feat: add HomeView hero section with responsive typography` | `src/views/HomeView.vue`, `src/views/__tests__/HomeView.spec.ts` | — |
| 9 | `feat: add about and social links sections to HomeView` | `src/views/HomeView.vue`, `src/views/__tests__/HomeView.spec.ts` | — |
| 10 | `feat: add skills section with tag grid to HomeView` | `src/views/HomeView.vue`, `src/views/__tests__/HomeView.spec.ts` | — |
| 11 | `feat: add ContactView with Formspree-powered contact form` | `src/views/ContactView.vue`, `src/views/__tests__/ContactView.spec.ts` | — |
| 12 | `feat: wire up App.vue root layout with navbar, router, theme, and footer` | `src/App.vue`, `src/__tests__/App.spec.ts` | `npm run test:unit` |
| 13 | `ci: add GitHub Actions workflow for GitHub Pages deployment` | `.github/workflows/deploy.yml` | — |
| 14 | (no commit — verification only) | — | — |
| 15 | (no commit — audit only) | — | — |

---

## Success Criteria

### Verification Commands
```bash
# 1. Scaffold is valid
npm run build          # Expected: exits 0, dist/ created

# 2. All tests pass
npm run test:unit      # Expected: all tests pass (≥20 tests across all spec files)

# 3. Linter clean
npm run lint           # Expected: exits 0, no errors

# 4. TypeScript compiles
npx tsc --noEmit       # Expected: exits 0, no type errors

# 5. Dev server serves correctly
npm run dev            # Expected: starts on localhost, all routes accessible

# 6. Production build serves correctly
npx serve dist -p 4173 # Expected: serves on localhost:4173/cjnicholls/, all routes work
```

### Final Checklist
- [ ] All 19 "Must Have" items present (see Work Objectives section)
- [ ] All 8 "Must NOT Have" items absent (verified via grep)
- [ ] All 15 tasks completed
- [ ] ≥ 20 unit tests passing
- [ ] 12+ mobile responsiveness screenshots captured
- [ ] GitHub Actions workflow ready to deploy on push
- [ ] Light/dark theme toggle functional with localStorage persistence
- [ ] Contact form renders with Formspree endpoint (placeholder ID)
- [ ] No horizontal overflow at 375px viewport
- [ ] All interactive elements have accessible labels and keyboard support
