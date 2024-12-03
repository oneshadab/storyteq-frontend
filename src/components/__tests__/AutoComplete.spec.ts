import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import AutoComplete from '@/components/AutoComplete.vue'

describe('AutoComplete', () => {
  it('should render search input', () => {
    const searchTerm = 'tes'
    const suggestions = ['test suggestion', 'other suggestion']

    const wrapper = mount(AutoComplete, {
      props: { suggestions, modelValue: searchTerm },
    })

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.html()).toContain(searchTerm)
  })

  it('should render message if input is too short', async () => {
    const searchTerm = ''

    const wrapper = mount(AutoComplete, {
      props: { suggestions: [], modelValue: searchTerm, minSearchTermSize: 3 },
    })

    const type = async (text: string) => {
      wrapper.find('input').setValue(text)
      wrapper.find('input').trigger('input')
      await nextTick()
    }

    await type('t')
    expect(wrapper.html()).toContain('Enter 2 more character(s) to search')

    await type('te')
    expect(wrapper.html()).toContain('Enter 1 more character(s) to search')
  })

  it('should render loading state', () => {
    const searchTerm = 'tes'

    const wrapper = mount(AutoComplete, {
      props: { suggestions: [], modelValue: searchTerm, loading: true },
    })

    expect(wrapper.html()).toContain('Loading...')
  })

  it('should render empty state', () => {
    const searchTerm = 'tes'

    const wrapper = mount(AutoComplete, {
      props: { suggestions: [], modelValue: searchTerm },
    })

    expect(wrapper.html()).toContain('No matches found')
  })

  it('should render suggestions', () => {
    const searchTerm = 'tes'
    const suggestions = ['test suggestion', 'other suggestion']

    const wrapper = mount(AutoComplete, {
      props: { suggestions, modelValue: searchTerm },
    })

    suggestions.forEach((suggestion) => {
      expect(wrapper.text()).toContain(suggestion)
    })
  })

  it('should emit select event', async () => {
    const searchTerm = 'tes'
    const suggestions = ['test suggestion', 'other suggestion']

    const wrapper = mount(AutoComplete, {
      props: { suggestions, modelValue: searchTerm },
    })

    wrapper.find('li').trigger('mousedown')
    await nextTick()

    expect(wrapper.emitted('select')).toBeDefined()
  })

  it('should clear search input', async () => {
    const searchTerm = 'tes'
    const suggestions = ['test suggestion', 'other suggestion']

    const wrapper = mount(AutoComplete, {
      props: { suggestions, modelValue: searchTerm },
    })

    wrapper.find('button').trigger('click')
    await nextTick()

    expect(wrapper.html()).not.toContain(searchTerm)
  })
})
