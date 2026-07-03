import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'

vi.mock('@/composables/useTheme', () => ({
  useTheme: () => ({
    theme: { value: 'light' },
    toggleTheme: vi.fn<() => void>(),
  }),
}))

import App from '../App.vue'

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
      { path: '/contact', name: 'contact', component: { template: '<div>Contact</div>' } },
      { path: '/corgi', name: 'corgi', component: { template: '<div>Corgi</div>' } },
    ],
  })
}

describe('App', () => {
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
})
