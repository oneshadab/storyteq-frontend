<script lang="ts" setup>
import Book from '@/components/Book.vue';
import City from '@/components/City.vue';
import { useSearchStore } from '@/stores/search'

const searchStore = useSearchStore()
</script>

<template>
  <div>
    <input v-model="searchStore.searchTerm" />
  </div>
  <div>
    <h2>Books</h2>
    <ul v-if="searchStore.books.length > 0">
      <Book v-for="book in searchStore.books" :book="book" />
    </ul>
    <p v-else>No books found</p>
  </div>
  <div>
    <h2>Cities</h2>
    <ul v-if="searchStore.cities.length > 0">
      <City v-for="city in searchStore.cities" :city="city" />
    </ul>
    <p v-else>No cities found</p>
  </div>
</template>
