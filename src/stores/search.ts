import { ref, computed   } from 'vue'
import { defineStore } from 'pinia'
import { useBooksStore } from '@/stores/books'  
import { useCitiesStore } from '@/stores/cities'

export const useSearchStore = defineStore('search', () => {
  const booksStore = useBooksStore()
  const citiesStore = useCitiesStore()

  const searchTerm = ref('')

  const books = computed(() => {
    return booksStore.books.filter((book) => book.title.toLowerCase().includes(searchTerm.value.toLowerCase()))
  })

  const cities = computed(() => {
    return citiesStore.cities.filter((city) => city.toLowerCase().includes(searchTerm.value.toLowerCase()))
  })

  return { searchTerm, books, cities }
})
