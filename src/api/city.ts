import dataset from '@/data/dataset'

export type City = string

// To simulate API calls
export async function searchCities(searchTerm: string): Promise<City[]> {
  return dataset.cities.filter((city) => city.toLowerCase().includes(searchTerm.toLowerCase()))
}
