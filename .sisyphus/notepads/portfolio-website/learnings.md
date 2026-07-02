# Learnings

## Design System (Tailwind v4 + @theme)
- Tokens defined in `src/assets/main.css` via `@theme` block
- Colors: `primary` (#3b82f6), `primary-dark` (#60a5fa), `bg-light`, `bg-dark`, `text-light`, `text-dark`
- Dark mode: `@variant dark (&:where(.dark, .dark *))` — class-based, not media query
- Body text: `text-gray-700 dark:text-gray-300`
- Secondary text: `text-gray-600 dark:text-gray-300`
- Hover links: `hover:text-primary dark:hover:text-primary-dark transition-colors`
- Card bg: `bg-gray-100 dark:bg-gray-800`
- Borders: `border-gray-200 dark:border-gray-700`
- Container: `max-w-2xl mx-auto px-4 py-16` (content), `max-w-5xl` (navbar)
- Section headings: `text-2xl font-bold mb-6`
- Navbar: fixed, h-16 (64px), content needs `pt-20` to clear

## Test Patterns
- Vitest + @vue/test-utils
- `mount()` for component tests, no global stubs needed for simple views
- `vi.spyOn(globalThis, 'fetch')` for mocking fetch
- `afterEach(() => vi.restoreAllMocks())` for cleanup
