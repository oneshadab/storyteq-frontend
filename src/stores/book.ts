import { ref } from 'vue'
import { defineStore } from 'pinia'
import dataset from '@/data/dataset'

export const useBookStore = defineStore('book', () => {
  const books = ref(dataset.books)
  return { books }
})
