<script lang="ts" setup>
import { ref } from 'vue'
import { useBookStore } from '@/stores/book'
import { useCityStore } from '@/stores/city'
import AutoComplete from '@/components/AutoComplete.vue'

const bookSearchTerm = ref('')
const bookStore = useBookStore()

const citySearchTerm = ref('')
const cityStore = useCityStore()

const onSelect = (suggestion: string) => {
  alert(`Selected: ${suggestion}`)
}
</script>

<template>
  <div class="search-view">
    <div>
      <h1>Search Books</h1>
      <AutoComplete
        v-model="bookSearchTerm"
        :suggestions="bookStore.bookTitles"
        placeholder="Search books..."
        @select="onSelect"
      />
    </div>
    <div>
      <h1>Search Cities</h1>
      <AutoComplete
        v-model="citySearchTerm"
        :suggestions="cityStore.cities"
        placeholder="Search cities..."
        @select="onSelect"
      />
    </div>
  </div>
</template>

<style scoped>
.search-view {
  display: flex;
  flex-direction: column;
  gap: 2em;
  align-items: center;
  margin: 8em;
  width: 50%;
  max-width: 600px;
}
</style>
