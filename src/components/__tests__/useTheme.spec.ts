import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { useTheme } from '../../composables/useTheme'

function mountUseTheme() {
  let result: ReturnType<typeof useTheme> | undefined
  mount({
    template: '<div></div>',
    setup() {
      result = useTheme()
      return {}
    },
  })
  return result!
}

function createLocalStorageMock() {
  const store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      for (const key of Object.keys(store)) {
        delete store[key]
      }
    }),
    key: vi.fn((index: number) => Object.keys(store)[index] ?? null),
    get length() {
      return Object.keys(store).length
    },
  }
}

describe('useTheme', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark')
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    )
    vi.stubGlobal('localStorage', createLocalStorageMock())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns light as default when no localStorage and system prefers light', () => {
    const { theme } = mountUseTheme()
    expect(theme.value).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('reads from localStorage if set', () => {
    localStorage.setItem('theme', 'dark')
    const { theme } = mountUseTheme()
    expect(theme.value).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('toggleTheme switches from light to dark', () => {
    const { theme, toggleTheme } = mountUseTheme()
    expect(theme.value).toBe('light')
    toggleTheme()
    expect(theme.value).toBe('dark')
    toggleTheme()
    expect(theme.value).toBe('light')
  })

  it('toggleTheme persists to localStorage', async () => {
    const { theme, toggleTheme } = mountUseTheme()
    expect(theme.value).toBe('light')
    toggleTheme()
    await nextTick()
    expect(localStorage.getItem('theme')).toBe('dark')
    toggleTheme()
    await nextTick()
    expect(localStorage.getItem('theme')).toBe('light')
  })
})
