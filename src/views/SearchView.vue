<script lang="ts" setup>
import { useCityStore } from '@/stores/city'
import { useBookStore } from '@/stores/book'
import AutoComplete from '@/components/AutoComplete.vue'

const cityStore = useCityStore()
const bookStore = useBookStore()
</script>

<template>
  <div class="search-view-container">
    <div class="search-view">
      <div>
        <h3>Cities</h3>
        <AutoComplete
          v-model="cityStore.searchTerm"
          :suggestions="cityStore.cities ?? []"
          :loading="cityStore.loading"
          :auto-focus="true"
          @select="cityStore.searchTerm = $event"
          placeholder="Search cities..."
        />
      </div>
      <div>
        <h3>Books</h3>
        <AutoComplete
          v-model="bookStore.searchTerm"
          :suggestions="bookStore.books ?? []"
          :loading="bookStore.loading"
          @select="bookStore.searchTerm = $event.title"
          placeholder="Search books..."
        >
          <template v-slot="{ suggestion: book }">
            <p class="book-title">{{ book.title }}</p>
            <p class="book-author">{{ book.author }}</p>
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
