<script lang="ts" setup>
import { useCityStore } from '@/stores/city'
import { useBookStore } from '@/stores/book'
import AutoComplete from '@/components/AutoComplete.vue'

const cityStore = useCityStore()
const bookStore = useBookStore()
</script>

<template>
  <div class="search-view-container">
    <div class="search-view-header">
      <img class="search-view-logo" src="@/assets/logo.svg" alt="Vue" />
      <h1 class="search-view-title">AutoComplete</h1>
    </div>
    <div class="search-view">
      <div class="search-cities">
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
      <div class="search-books">
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
  align-items: center;
  flex-direction: column;
  padding-top: 4em;
  width: 100%;
  height: 50%;
}

.search-view-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .5em;
  margin: 2em 0;
}

.search-view-title {
  font-weight: bold;
}

.search-view-logo {
  width: 64px;
  height: 64px;
}

.search-view {
  display: flex;
  gap: 2em;
  align-items: center;
  justify-content: center;
  padding: 0 8em;
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
    padding: 0 4em;
  }
}
</style>
