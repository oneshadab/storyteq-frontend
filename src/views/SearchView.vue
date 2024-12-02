<script lang="ts" setup>
import { useBookStore } from '@/stores/book'
import { useCityStore } from '@/stores/city'
import AutoComplete from '@/components/AutoComplete.vue'

const bookStore = useBookStore()
const cityStore = useCityStore()
</script>

<template>
  <div class="search-view-container">
    <div class="search-view">
      <div>
        <h3>Books</h3>
        <AutoComplete
          v-model="bookStore.searchTerm"
          :suggestions="bookStore.books ?? []"
          placeholder="Search books..."
          :loading="bookStore.loading"
          :auto-focus="true"
          @select="bookStore.searchTerm = $event.title"
        >
          <template v-slot="{ suggestion: book }">
            <p class="book-title">{{ book.title }}</p>
            <p class="book-author">{{ book.author }}</p>
          </template>
        </AutoComplete>
      </div>
      <div>
        <h3>Cities</h3>
        <AutoComplete
          v-model="cityStore.searchTerm"
          :suggestions="cityStore.cities ?? []"
          placeholder="Search cities..."
          :loading="cityStore.loading"
          @select="cityStore.searchTerm = $event"
        >
          <template v-slot="{ suggestion: city }">
            <p class="city-name">{{ city }}</p>
          </template>
        </AutoComplete>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-view-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.search-view {
  display: flex;
  gap: 2em;
  align-items: center;
  justify-content: center;
  padding: 8em;
  max-width: 1200px;
  min-width: 400px;
  width: 100%;
}

.search-view > div {
  flex: 1;
  width: 100%;
}

.book-title {
  font-weight: bold;
}

@media (max-width: 1024px) {
  .search-view {
    flex-direction: column;
    padding: 8em 4em;
  }
}
</style>
