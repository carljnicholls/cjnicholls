import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { useCorgiRotation } from '@/composables/useCorgiRotation'

const IMAGES = ['corgi_judge', 'corgi_round', 'corgi_seal', 'corgi_upside_down'] as const

function mountUseCorgiRotation(images: readonly string[] = IMAGES) {
  let result: ReturnType<typeof useCorgiRotation> | undefined
  mount({
    template: '<div></div>',
    setup() {
      result = useCorgiRotation(images)
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

describe('useCorgiRotation', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createLocalStorageMock())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('initial state', () => {
    it('picks an image from the list', () => {
      const { current } = mountUseCorgiRotation()
      expect(IMAGES).toContain(current.value)
    })

    it('tracks the initial image as seen', () => {
      const { current } = mountUseCorgiRotation()
      const stored = JSON.parse(localStorage.getItem('corgi-seen')!)
      expect(stored).toContain(current.value)
    })

    it('hasSeenAll is false with one image shown', () => {
      const { hasSeenAll } = mountUseCorgiRotation()
      expect(hasSeenAll.value).toBe(false)
    })

    it('picks deterministically when Math.random returns 0', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0)
      const { current } = mountUseCorgiRotation()
      expect(current.value).toBe(IMAGES[0])
    })
  })

  describe('shuffle', () => {
    it('picks an unseen image on first shuffle', () => {
      const { current, shuffle } = mountUseCorgiRotation()
      const first = current.value
      shuffle()
      expect(current.value).not.toBe(first)
      expect(IMAGES).toContain(current.value)
    })

    it('tracks newly seen images in localStorage', () => {
      const { shuffle } = mountUseCorgiRotation()
      shuffle()
      const stored = JSON.parse(localStorage.getItem('corgi-seen')!)
      expect(stored.length).toBe(2)
    })

    it('resets tracking and picks new image when all seen', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0)
      const { shuffle, current } = mountUseCorgiRotation()

      // See images 1-3 (random=0 picks first unseen each time)
      shuffle()
      shuffle()
      shuffle()
      // All 4 seen now. Next shuffle triggers reset (seen → {current} only)
      shuffle()

      const stored = JSON.parse(localStorage.getItem('corgi-seen')!)
      // Reset keeps previous image (to avoid immediate repeat) + new pick = 2
      expect(stored.length).toBe(2)
      expect(IMAGES).toContain(current.value)
    })

    it('never repeats the current image after reset', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0)
      const { shuffle, current } = mountUseCorgiRotation()

      // Exhaust all images
      shuffle()
      shuffle()
      const beforeReset = current.value
      shuffle() // triggers reset
      const afterReset = current.value

      expect(afterReset).not.toBe(beforeReset)
    })
  })

  describe('single image', () => {
    it('always shows the same image', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5)
      const { current, shuffle } = mountUseCorgiRotation(['only_corgi'])
      expect(current.value).toBe('only_corgi')
      shuffle()
      expect(current.value).toBe('only_corgi')
    })

    it('hasSeenAll is true immediately', () => {
      const { hasSeenAll } = mountUseCorgiRotation(['only_corgi'])
      expect(hasSeenAll.value).toBe(true)
    })
  })

  describe('localStorage persistence', () => {
    it('restores seen set from localStorage on init', () => {
      localStorage.setItem('corgi-seen', JSON.stringify(['corgi_judge', 'corgi_round', 'corgi_seal']))
      vi.spyOn(Math, 'random').mockReturnValue(0)
      const { current, hasSeenAll } = mountUseCorgiRotation()

      // Only corgi_upside_down is unseen — random=0 should pick it
      expect(current.value).toBe('corgi_upside_down')
      expect(hasSeenAll.value).toBe(true)
    })

    it('prunes stale entries from localStorage', () => {
      localStorage.setItem(
        'corgi-seen',
        JSON.stringify(['corgi_judge', 'deleted_corgi', 'corgi_round']),
      )
      vi.spyOn(Math, 'random').mockReturnValue(0)

      const { current } = mountUseCorgiRotation()
      // 'deleted_corgi' is not in IMAGES, so it should be pruned.
      // Seen = {corgi_judge, corgi_round}, unseen = {corgi_seal, corgi_upside_down}
      // random=0 picks first unseen = corgi_seal
      expect(current.value).toBe('corgi_seal')

      // Confirm stale entry was removed from persisted storage
      const stored = JSON.parse(localStorage.getItem('corgi-seen')!)
      expect(stored).not.toContain('deleted_corgi')
    })
  })

  describe('error handling', () => {
    it('works when localStorage is unavailable', () => {
      vi.stubGlobal('localStorage', undefined)

      // Should not throw
      expect(() => mountUseCorgiRotation()).not.toThrow()

      const { current } = mountUseCorgiRotation()
      expect(IMAGES).toContain(current.value)
    })

    it('works when localStorage throws on read', () => {
      vi.stubGlobal('localStorage', {
        getItem: () => {
          throw new Error('quota exceeded')
        },
        setItem: vi.fn(),
        removeItem: vi.fn(),
      })

      expect(() => mountUseCorgiRotation()).not.toThrow()

      const { current } = mountUseCorgiRotation()
      expect(IMAGES).toContain(current.value)
    })
  })
})
