import { ref } from 'vue'
import { defineStore } from 'pinia'
import dataset from '@/data/dataset'

export const useCitiesStore = defineStore('cities', () => {
  const cities = ref(dataset.cities)
  return { cities }
})
