import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import dataset from '@/data/dataset'

export const useBookStore = defineStore('book', () => {
  const books = ref(dataset.books)
  const bookTitles = computed(() => books.value.map((book) => book.title))
  return { books, bookTitles }
})
