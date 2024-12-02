<script setup lang="ts">
defineProps<{
  city: string
}>()
</script>

<template>
  <li>{{ city }}</li>
</template>
