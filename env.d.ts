/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_URL: string
  readonly VITE_EMAIL_ADDRESS: string
  readonly VITE_GITHUB: string
  readonly VITE_LINKEDIN: string
  readonly VITE_SKILLS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
