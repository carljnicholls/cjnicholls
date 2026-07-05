import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, type Ref } from 'vue'

const themeRef: Ref<'light' | 'dark'> = ref('light')
const toggleThemeMock = vi.fn<() => void>()

vi.mock('@/composables/useTheme', () => ({
  useTheme: () => ({
    theme: themeRef,
    toggleTheme: toggleThemeMock,
  }),
}))

import ThemeToggle from '../ThemeToggle.vue'

describe('ThemeToggle', () => {
  beforeEach(() => {
    themeRef.value = 'light'
    toggleThemeMock.mockClear()
  })

  it('shows sun icon when theme is light', () => {
    themeRef.value = 'light'
    const wrapper = mount(ThemeToggle)
    expect(wrapper.text()).toContain('\u2600')
    expect(wrapper.text()).toContain('Light')
  })

  it('shows moon icon when theme is dark', () => {
    themeRef.value = 'dark'
    const wrapper = mount(ThemeToggle)
    expect(wrapper.text()).toContain('\uD83C\uDF19')
    expect(wrapper.text()).toContain('Dark')
  })

  it('calls toggleTheme when clicked', async () => {
    const wrapper = mount(ThemeToggle)
    await wrapper.find('button').trigger('click')
    expect(toggleThemeMock).toHaveBeenCalledOnce()
  })

  it('has aria-label "Toggle theme"', () => {
    const wrapper = mount(ThemeToggle)
    const button = wrapper.find('button')
    expect(button.attributes('aria-label')).toBe('Toggle theme')
  })
})
