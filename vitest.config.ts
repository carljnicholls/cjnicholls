import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      env: {
        VITE_FORMSPREE_URL: 'https://formspree.io/f/[FORMSPREE_FORM_ID]',
        VITE_EMAIL_ADDRESS: 'test@example.com',
        VITE_GITHUB: 'https://github.com/test',
        VITE_LINKEDIN: 'https://www.linkedin.com/in/test/',
        VITE_SKILLS: 'TypeScript, Vue 3, Tailwind CSS, Git, GitHub Actions, REST APIs',
      },
    },
  }),
)
