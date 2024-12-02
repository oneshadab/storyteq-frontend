<script lang="ts" setup>
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    suggestions: string[]
    placeholder?: string
    minLength?: number
  }>(),
  {
    minLength: 3,
    placeholder: 'Search...',
  },
)

const emit = defineEmits<{
  (e: 'select', suggestion: string): void
}>()

const searchTerm = defineModel<string>({ required: true })
const showSuggestions = ref(false)
const filteredSuggestions = computed(() =>
  props.suggestions.filter((item) => item.toLowerCase().includes(searchTerm.value.toLowerCase())),
)
</script>

<template>
  <div class="autocomplete-container">
    <input
      class="search-input"
      v-model="searchTerm"
      :placeholder="placeholder"
      @focus="showSuggestions = true"
      @blur="showSuggestions = false"
    />
    <div v-if="showSuggestions" class="suggestions-container">
      <p v-if="searchTerm.length < props.minLength" class="no-suggestions">
        Enter {{ props.minLength - searchTerm.length }} more character(s) for suggestions
      </p>
      <p v-else-if="filteredSuggestions.length === 0" class="no-suggestions">No matches found</p>
      <ul v-else>
        <li v-for="suggestion in filteredSuggestions" class="suggestion-item" @click="emit('select', suggestion)">
          {{ suggestion }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.autocomplete-container {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.suggestions-container {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 4px 4px;
  background-color: white;
  z-index: 1000;
}

.suggestions-container ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.no-suggestions {
  font-size: 0.8em;
}

.suggestion-item {
  padding: 8px;
  cursor: pointer;
}

.suggestion-item:hover {
  background-color: #f5f5f5;
}
</style>
