import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import ContactView from '../ContactView.vue'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ContactView', () => {
  it('renders name, email, and message fields', () => {
    const wrapper = mount(ContactView)

    const nameInput = wrapper.find('input[name="name"]')
    const emailInput = wrapper.find('input[name="email"]')
    const messageTextarea = wrapper.find('textarea[name="message"]')

    expect(nameInput.exists()).toBe(true)
    expect(emailInput.exists()).toBe(true)
    expect(messageTextarea.exists()).toBe(true)
  })

  it('form has Formspree action URL', () => {
    const wrapper = mount(ContactView)
    const form = wrapper.find('form')

    expect(form.attributes('action')).toBe('https://formspree.io/f/[FORMSPREE_FORM_ID]')
  })

  it('submit button disabled and shows "Sending..." during submission', async () => {
    // Mock fetch that never resolves (keeps state in 'submitting')
    vi.spyOn(globalThis, 'fetch').mockReturnValue(new Promise(() => {}))

    const wrapper = mount(ContactView)
    const form = wrapper.find('form')

    await form.trigger('submit')
    await flushPromises()

    const button = wrapper.find('button[type="submit"]')
    expect(button.attributes('disabled')).toBeDefined()
    expect(button.text()).toBe('Sending...')
  })

  it('success message renders after simulated successful response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true } as Response)

    const wrapper = mount(ContactView)
    const form = wrapper.find('form')

    await form.trigger('submit')
    await flushPromises()

    expect(wrapper.text()).toContain("Thanks! I'll get back to you.")
    expect(wrapper.find('form').exists()).toBe(false)
  })

  it('error message renders after simulated error response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false } as Response)

    const wrapper = mount(ContactView)
    const form = wrapper.find('form')

    await form.trigger('submit')
    await flushPromises()

    expect(wrapper.text()).toContain('Something went wrong. Please try again')
    expect(wrapper.find('form').exists()).toBe(false)
  })
})
