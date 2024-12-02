import { ref } from 'vue'
import { defineStore } from 'pinia'
import dataset from '@/data/dataset'

export const useBooksStore = defineStore('books', () => {
  const books = ref(dataset.books)
  return { books }
})
