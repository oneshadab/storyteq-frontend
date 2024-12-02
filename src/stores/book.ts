import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { searchBooks, type Book } from '@/api/book'
import { useQuery } from '@/helpers/useQuery'

export const useBookStore = defineStore('book', () => {
  const searchTerm = ref('')
  const booksQuery = useQuery(searchTerm, () => searchBooks(searchTerm.value))

  return {
    searchTerm,
    books: booksQuery.data,
    loading: booksQuery.loading,
    error: booksQuery.error,
  }
})
