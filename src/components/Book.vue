<script setup lang="ts">
defineProps<{
  book: {
    title: string
    author: string
  }
}>()
</script>

<template>
  <li>{{ book.title }} - {{ book.author }}</li>
</template>
