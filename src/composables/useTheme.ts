import { ref, readonly, onMounted, watch, type Ref } from 'vue'

export function useTheme() {
  const theme: Ref<'light' | 'dark'> = ref('light')

  function applyClass() {
    document.documentElement.classList.toggle('dark', theme.value === 'dark')
  }

  function persist() {
    localStorage.setItem('theme', theme.value)
  }

  onMounted(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') {
      theme.value = stored
    } else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      theme.value = 'dark'
    }
    applyClass()
  })

  watch(theme, () => {
    applyClass()
    persist()
  })

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return { theme: readonly(theme), toggleTheme }
}
