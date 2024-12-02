<script lang="ts" setup>
import { useSearchStore } from '@/stores/search'

const searchStore = useSearchStore()
</script>

<template>
  <div>
    <input v-model="searchStore.searchTerm" />
  </div>
  <div>
    <h2>Books</h2>
    <ul>
      <li v-for="book in searchStore.books">{{ book.title }}</li>
    </ul>
  </div>
  <div>
    <h2>Cities</h2>
    <ul>
      <li v-for="city in searchStore.cities">{{ city }}</li>
    </ul>
  </div>
</template>
