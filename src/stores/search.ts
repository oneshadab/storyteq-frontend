import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import dataset from '@/data/dataset'

export const useSearchStore = defineStore('search', () => {
  // TODO: Move to query params
  const searchTerm = ref('')

  const books = computed(() => {
    return dataset.books.filter((book) => book.title.toLowerCase().includes(searchTerm.value.toLowerCase()))
  })

  const cities = computed(() => {
    return dataset.cities.filter((city) => city.toLowerCase().includes(searchTerm.value.toLowerCase()))
  })

  return { searchTerm, books, cities }
})
