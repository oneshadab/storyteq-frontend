import { ref, watch } from 'vue'

export function useQuery<T extends object, Result>(key: T, query: () => Promise<Result>) {
  const data = ref<Result | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)

  watch(key, async () => {
    loading.value = true
    try {
      data.value = await query()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  })

  return { data, error, loading }
}
