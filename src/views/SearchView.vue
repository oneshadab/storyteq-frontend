<script lang="ts" setup>
import { useBookStore } from '@/stores/book'
import { useCityStore } from '@/stores/city'
import AutoComplete from '@/components/AutoComplete.vue'

const bookStore = useBookStore()
const cityStore = useCityStore()

const onSelect = (suggestion: string) => {
  alert(`Selected: ${suggestion}`)
}
</script>

<template>
  <div class="search-view">
    <div>
      <h3>Search Books</h3>
      <AutoComplete
        v-model="bookStore.searchTerm"
        :suggestions="bookStore.books?.map((book) => book.title) ?? []"
        placeholder="Search books..."
        :loading="bookStore.loading"
        @select="onSelect"
      />
    </div>
    <div>
      <h3>Search Cities</h3>
      <AutoComplete
        v-model="cityStore.searchTerm"
        :suggestions="cityStore.cities ?? []"
        placeholder="Search cities..."
        :loading="cityStore.loading"
        @select="onSelect"
      />
    </div>
  </div>
</template>

<style scoped>
.search-view {
  display: flex;
  gap: 2em;
  align-items: center;
  padding: 8em;
  width: 100%;
}

.search-view > div {
  flex: 1;
}
</style>
