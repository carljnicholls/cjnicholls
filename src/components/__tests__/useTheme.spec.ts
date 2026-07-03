import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

async function mountUseTheme() {
  const { useTheme } = await import('../../composables/useTheme')
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
    getItem: vi.fn<(key: string) => string | null>((key: string) => store[key] ?? null),
    setItem: vi.fn<(key: string, value: string) => void>((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn<(key: string) => void>((key: string) => {
      delete store[key]
    }),
    clear: vi.fn<() => void>(() => {
      for (const key of Object.keys(store)) {
        delete store[key]
      }
    }),
    key: vi.fn<(index: number) => string | null>((index: number) => Object.keys(store)[index] ?? null),
    get length() {
      return Object.keys(store).length
    },
  }
}

describe('useTheme', () => {
  beforeEach(() => {
    vi.resetModules()
    document.documentElement.classList.remove('dark')
    vi.stubGlobal(
      'matchMedia',
      vi.fn<(query: string) => MediaQueryList>().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn<(callback: ((this: MediaQueryList, ev: MediaQueryListEvent) => void) | null) => void>(),
        removeListener: vi.fn<(callback: ((this: MediaQueryList, ev: MediaQueryListEvent) => void) | null) => void>(),
        addEventListener: vi.fn<(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions) => void>(),
        removeEventListener: vi.fn<(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | EventListenerOptions) => void>(),
        dispatchEvent: vi.fn<(event: Event) => boolean>(),
      })) as unknown as (query: string) => MediaQueryList,
    )
    vi.stubGlobal('localStorage', createLocalStorageMock())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns light as default when no localStorage and system prefers light', async () => {
    const { theme } = await mountUseTheme()
    expect(theme.value).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('reads from localStorage if set', async () => {
    localStorage.setItem('theme', 'dark')
    const { theme } = await mountUseTheme()
    expect(theme.value).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('toggleTheme switches from light to dark', async () => {
    const { theme, toggleTheme } = await mountUseTheme()
    expect(theme.value).toBe('light')
    toggleTheme()
    expect(theme.value).toBe('dark')
    toggleTheme()
    expect(theme.value).toBe('light')
  })

  it('toggleTheme persists to localStorage', async () => {
    const { theme, toggleTheme } = await mountUseTheme()
    expect(theme.value).toBe('light')
    toggleTheme()
    await nextTick()
    expect(localStorage.getItem('theme')).toBe('dark')
    toggleTheme()
    await nextTick()
    expect(localStorage.getItem('theme')).toBe('light')
  })
})
