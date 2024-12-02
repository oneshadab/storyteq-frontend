import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useBooksStore } from '@/stores/books'
import { useCitiesStore } from '@/stores/cities'

export const useSearchStore = defineStore('search', () => {
  const booksStore = useBooksStore()
  const citiesStore = useCitiesStore()

  const searchTerm = ref('')

  const isSearchTermShort = computed(() => searchTerm.value.length < 3)

  function matchesSearchTerm(value: string) {
    return isSearchTermShort.value || value.toLowerCase().includes(searchTerm.value.toLowerCase())
  }

  const books = computed(() => booksStore.books.filter((book) => matchesSearchTerm(book.title)))
  const cities = computed(() => citiesStore.cities.filter((city) => matchesSearchTerm(city)))

  return { searchTerm, isSearchTermShort, books, cities }
})
