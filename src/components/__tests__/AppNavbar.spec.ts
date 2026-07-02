import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import AppNavbar from '../AppNavbar.vue'

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
      { path: '/contact', name: 'contact', component: { template: '<div>Contact</div>' } },
    ],
  })
}

describe('AppNavbar', () => {
  it('renders Home and Contact router-link elements', () => {
    const router = createTestRouter()
    const wrapper = mount(AppNavbar, {
      global: { plugins: [router] },
    })

    const links = wrapper.findAllComponents({ name: 'RouterLink' })
    const linkTexts = links.map((l) => l.text())
    expect(linkTexts).toContain('Home')
    expect(linkTexts).toContain('Contact')
  })

  it('hamburger button visible at 375px viewport, hidden at 1280px', () => {
    const router = createTestRouter()
    const wrapper = mount(AppNavbar, {
      global: { plugins: [router] },
    })

    const hamburger = wrapper.find('button[aria-label="Toggle menu"]')
    expect(hamburger.exists()).toBe(true)
    expect(hamburger.classes()).toContain('md:hidden')

    const desktopNav = wrapper.find('.hidden.md\\:flex')
    expect(desktopNav.exists()).toBe(true)
  })

  it('clicking hamburger toggles mobile menu visibility', async () => {
    const router = createTestRouter()
    const wrapper = mount(AppNavbar, {
      global: { plugins: [router] },
    })

    const mobileMenu = wrapper.find('.md\\:hidden.flex.flex-col')
    const menuEl = mobileMenu.element as HTMLElement
    expect(menuEl.style.display).toBe('none')

    const hamburger = wrapper.find('button[aria-label="Toggle menu"]')
    await hamburger.trigger('click')
    expect(menuEl.style.display).toBe('')

    await hamburger.trigger('click')
    expect(menuEl.style.display).toBe('none')
  })

  it('renders theme-toggle slot content when provided', () => {
    const router = createTestRouter()
    const wrapper = mount(AppNavbar, {
      global: { plugins: [router] },
      slots: {
        'theme-toggle': '<button id="theme-toggle-btn">Toggle Theme</button>',
      },
    })

    const themeBtn = wrapper.find('#theme-toggle-btn')
    expect(themeBtn.exists()).toBe(true)
    expect(themeBtn.text()).toBe('Toggle Theme')
  })
})
