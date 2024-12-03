import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { nextTick } from 'vue'
import AutoComplete from '@/components/AutoComplete.vue'
import SearchView from '@/views/SearchView.vue'
import * as cityApi from '@/api/city'
import * as bookApi from '@/api/book'
describe('SearchView', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(SearchView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render the search view', () => {
    expect(wrapper.html()).toContain('Cities')
    expect(wrapper.html()).toContain('Books')
  })

  it('should search for cities', async () => {
    const city = 'amsterdam'
    vi.spyOn(cityApi, 'searchCities').mockResolvedValue([city])

    const searchInput = wrapper.find('.search-cities').find('input')
    searchInput.setValue(city)
    searchInput.trigger('input')
    await nextTick()

    expect(wrapper.find('.search-cities').findComponent(AutoComplete).props('loading')).toBe(true)
    expect(cityApi.searchCities).toHaveBeenCalledWith(city)
    await nextTick()

    expect(wrapper.find('.search-cities').findComponent(AutoComplete).props('loading')).toBe(false)
    expect(wrapper.html()).toContain(city)
  })

  it('should search for books', async () => {
    const book = { title: 'book-title', author: 'book-author' }

    vi.spyOn(bookApi, 'searchBooks').mockResolvedValue([book])

    const searchInput = wrapper.find('.search-books').find('input')
    searchInput.setValue(book.title)
    searchInput.trigger('input')
    await nextTick()

    expect(wrapper.find('.search-books').findComponent(AutoComplete).props('loading')).toBe(true)
    expect(bookApi.searchBooks).toHaveBeenCalledWith(book.title)
    await nextTick()

    expect(wrapper.find('.search-books').findComponent(AutoComplete).props('loading')).toBe(false)
    expect(wrapper.html()).toContain(book.title)
    expect(wrapper.html()).toContain(book.author)
  })
})
