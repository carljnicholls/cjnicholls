
## App.vue Root Layout (2026-07-02)
- App.vue uses `useTheme()` composable to get reactive `theme` ref
- Root div has `:class="{ dark: theme === 'dark' }"` for scoped dark mode (in addition to useTheme's html class toggle)
- AppNavbar has `<slot name="theme-toggle">` for injecting ThemeToggle component
- Test pattern: use `vi.mock` at module level with shared `ref` for theme state, reset in `beforeEach`
- Test router must include ALL named routes referenced by child components (home, contact) or vue-router throws "No match" errors
- `.vue` module type errors in LSP are pre-existing across project - not actionable
