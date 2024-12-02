import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { searchCities, type City } from '@/api/city'
import { useQuery } from '@/helpers/useQuery'

export const useCityStore = defineStore('city', () => {
  const searchTerm = ref('')
  const citiesQuery = useQuery(searchTerm, () => searchCities(searchTerm.value))

  return {
    searchTerm,
    cities: citiesQuery.data,
    loading: citiesQuery.loading,
    error: citiesQuery.error,
  }
})
