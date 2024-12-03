import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AutoComplete from '../AutoComplete.vue'

describe('AutoComplete', () => {
  it('renders suggestions from search term', () => {
    const searchTerm = 'tes'
    const suggestions = ['test suggestion']

    const wrapper = mount(AutoComplete, {
      props: { suggestions, modelValue: searchTerm },
    })

    expect(wrapper.text()).toContain(suggestions[0])
  })
})
