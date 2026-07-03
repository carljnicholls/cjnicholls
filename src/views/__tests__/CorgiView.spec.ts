import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, computed, type Ref, type ComputedRef } from 'vue'

const mockCurrent = ref('corgi_judge')
const mockHasSeenAll = ref(false)
const mockShuffle = vi.fn<() => void>()

vi.mock('@/composables/useCorgiRotation', () => ({
  useCorgiRotation: () => ({
    current: mockCurrent as Ref<string>,
    hasSeenAll: computed(() => mockHasSeenAll.value) as ComputedRef<boolean>,
    shuffle: mockShuffle,
  }),
}))

import CorgiView from '../CorgiView.vue'

describe('CorgiView', () => {
  beforeEach(() => {
    mockCurrent.value = 'corgi_judge'
    mockHasSeenAll.value = false
    mockShuffle.mockReset()
  })

  describe('rendering', () => {
    it('renders the heading', () => {
      const wrapper = mount(CorgiView)
      expect(wrapper.find('h1').text()).toBe('Random Corgi')
    })

    it('shows not-seen-all subtitle when images remain unseen', () => {
      const wrapper = mount(CorgiView)
      expect(wrapper.text()).toContain("You won't see repeats until you've met them all.")
    })

    it('shows met-them-all subtitle when all images seen', () => {
      mockHasSeenAll.value = true
      const wrapper = mount(CorgiView)
      expect(wrapper.text()).toContain("You've met them all — starting fresh!")
    })

    it('renders a Show me another button', () => {
      const wrapper = mount(CorgiView)
      const btn = wrapper.find('button')
      expect(btn.exists()).toBe(true)
      expect(btn.text()).toBe('Show me another!')
    })

    it('renders an img element with corgi source', () => {
      const wrapper = mount(CorgiView)
      const img = wrapper.find('img')
      expect(img.exists()).toBe(true)
      expect(img.attributes('src')).toBe('/cjnicholls/corgi/corgi_judge-1200w.webp')
    })

    it('renders picture element with webp source', () => {
      const wrapper = mount(CorgiView)
      const source = wrapper.find('source')
      expect(source.exists()).toBe(true)
      expect(source.attributes('type')).toBe('image/webp')
      expect(source.attributes('srcset')).toContain('corgi_judge')
      expect(source.attributes('srcset')).toContain('400w')
      expect(source.attributes('srcset')).toContain('800w')
      expect(source.attributes('srcset')).toContain('1200w')
    })

    it('image has lazy loading', () => {
      const wrapper = mount(CorgiView)
      expect(wrapper.find('img').attributes('loading')).toBe('lazy')
    })

    it('image has alt text based on current corgi', () => {
      const wrapper = mount(CorgiView)
      expect(wrapper.find('img').attributes('alt')).toBe('Corgi: corgi judge')
    })

    it('updates image src when current changes', async () => {
      const wrapper = mount(CorgiView)
      mockCurrent.value = 'corgi_seal'
      await wrapper.vm.$nextTick()

      const img = wrapper.find('img')
      expect(img.attributes('src')).toBe('/cjnicholls/corgi/corgi_seal-1200w.webp')
      expect(img.attributes('alt')).toBe('Corgi: corgi seal')
    })
  })

  describe('interaction', () => {
    it('calls shuffle when button is clicked', async () => {
      const wrapper = mount(CorgiView)
      await wrapper.find('button').trigger('click')
      expect(mockShuffle).toHaveBeenCalledOnce()
    })
  })
})
