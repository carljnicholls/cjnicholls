import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../HomeView.vue'

describe('HomeView', () => {
  it('renders hero with name heading', () => {
    const wrapper = mount(HomeView)
    const h1 = wrapper.find('h1')

    expect(h1.exists()).toBe(true)
    expect(h1.text()).toBe('Carl J Nicholls')
  })

  it('renders subtitle/tagline text', () => {
    const wrapper = mount(HomeView)

    expect(wrapper.text()).toContain('[Your Tagline]')
  })

  it('hero has pt-20 padding to clear fixed navbar', () => {
    const wrapper = mount(HomeView)
    const main = wrapper.find('main')

    expect(main.classes()).toContain('pt-20')
  })

  it('renders about section heading', () => {
    const wrapper = mount(HomeView)
    const headings = wrapper.findAll('h2')
    const aboutHeading = headings.find((h) => h.text() === 'About')

    expect(aboutHeading).toBeDefined()
  })

  it('renders links section with at least one link', () => {
    const wrapper = mount(HomeView)
    const linksHeading = wrapper.findAll('h2').find((h) => h.text() === 'Links')

    expect(linksHeading).toBeDefined()

    const links = wrapper.findAll('a')
    expect(links.length).toBeGreaterThanOrEqual(1)
  })

  it('renders skills section heading', () => {
    const wrapper = mount(HomeView)
    const headings = wrapper.findAll('h2')
    const skillsHeading = headings.find((h) => h.text() === 'Skills')

    expect(skillsHeading).toBeDefined()
  })

  it('renders skill tags', () => {
    const wrapper = mount(HomeView)
    const skillTags = wrapper.findAll('span').filter((s) => s.text() === 'TypeScript')

    expect(skillTags.length).toBeGreaterThanOrEqual(1)
  })

  it('at least 4 skill tags visible', () => {
    const wrapper = mount(HomeView)
    const skillTags = wrapper
      .findAll('span')
      .filter((s) => ['TypeScript', 'Vue 3', 'Tailwind CSS', 'Git', 'GitHub Actions', 'REST APIs'].includes(s.text()))

    expect(skillTags.length).toBeGreaterThanOrEqual(4)
  })
})
