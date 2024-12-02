import { ref } from 'vue'
import { defineStore } from 'pinia'
import dataset from '@/data/dataset'

export const useCityStore = defineStore('city', () => {
  const cities = ref(dataset.cities)
  return { cities }
})
