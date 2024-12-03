import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AutoComplete from '@/components/AutoComplete.vue'

describe('AutoComplete', () => {
  it('should render suggestions and the search term', () => {
    const searchTerm = 'tes'
    const suggestions = ['test suggestion', 'other suggestion']

    const wrapper = mount(AutoComplete, {
      props: { suggestions, modelValue: searchTerm },
    })

    suggestions.forEach((suggestion) => {
      expect(wrapper.text()).toContain(suggestion)
    })
  })
})
