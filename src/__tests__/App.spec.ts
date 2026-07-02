import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { ref, type Ref } from 'vue'

const mockTheme: Ref<'light' | 'dark'> = ref('light')

vi.mock('@/composables/useTheme', () => ({
  useTheme: () => ({
    theme: mockTheme,
    toggleTheme: vi.fn(),
  }),
}))

import App from '../App.vue'

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
      { path: '/contact', name: 'contact', component: { template: '<div>Contact</div>' } },
    ],
  })
}

describe('App', () => {
  beforeEach(() => {
    mockTheme.value = 'light'
  })

  it('renders AppNavbar', () => {
    const router = createTestRouter()
    const wrapper = mount(App, {
      global: { plugins: [router] },
    })

    expect(wrapper.findComponent({ name: 'AppNavbar' }).exists()).toBe(true)
  })

  it('renders RouterView', () => {
    const router = createTestRouter()
    const wrapper = mount(App, {
      global: { plugins: [router] },
    })

    expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(true)
  })

  it('renders footer with copyright', () => {
    const router = createTestRouter()
    const wrapper = mount(App, {
      global: { plugins: [router] },
    })

    const footer = wrapper.find('footer')
    expect(footer.exists()).toBe(true)
    expect(footer.text()).toContain('\u00A9')
    expect(footer.text()).toContain('2026')
  })

  it('applies dark class when theme is dark', () => {
    mockTheme.value = 'dark'
    const router = createTestRouter()
    const wrapper = mount(App, {
      global: { plugins: [router] },
    })

    expect(wrapper.find('div').classes()).toContain('dark')
  })
})
