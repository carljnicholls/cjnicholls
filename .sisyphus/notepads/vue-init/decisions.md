# Decisions - Vue Init

## Architecture
- Vue 3 + Vite + TypeScript scaffold via `npm create vue@latest`
- Tailwind CSS v4 via `@tailwindcss/vite`
- Vue Router hash mode for GitHub Pages
- No Pinia (2-page site doesn't need state management)
- No E2E testing (Playwright used for manual QA only)

## Component Tree
```
App.vue
├── <div :class="{ dark: theme === 'dark' }">
│   ├── AppNavbar.vue
│   │   ├── <router-link to="/">Home
│   │   ├── <router-link to="/contact">Contact
│   │   └── <slot name="theme-toggle"> → ThemeToggle.vue
│   ├── <main>
│   │   └── <router-view>
│   │       ├── HomeView.vue (hero + about + links + skills)
│   │       └── ContactView.vue (Formspree form)
│   └── Footer
```

## Route Design
- `/` → HomeView (hero, about, links, skills sections)
- `/contact` → ContactView (Formspree form, 4 states: idle/submitting/success/error)

## Theme Design
- `useTheme()` composable returns: `{ theme, toggleTheme }`
- Storage: `localStorage.getItem('theme')` → system preference fallback
- CSS: `.dark` class on `<html>` element → Tailwind `@variant dark` handles all styling
