<script lang="ts" setup>
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    suggestions: string[]
    autoFocus?: boolean
    loading?: boolean
    placeholder?: string
    minSearchTermSize?: number
    maxSuggestions?: number
  }>(),
  {
    loading: false,
    autoFocus: false,
    minSearchTermSize: 3,
    maxSuggestions: 50,
    placeholder: 'Search...',
  },
)

const emit = defineEmits<{
  select: [suggestion: string]
}>()

const searchTerm = defineModel<string>({ required: true })

const showSuggestions = ref(false)
const visibleSuggestions = computed(() => props.suggestions.slice(0, props.maxSuggestions))
</script>

<template>
  <div class="autocomplete-container">
    <input
      class="search-input"
      v-model="searchTerm"
      :placeholder="placeholder"
      :autofocus="autoFocus"
      @focus="showSuggestions = true"
      @blur="showSuggestions = false"
    />
    <div v-if="searchTerm && showSuggestions" class="suggestions-container">
      <p v-if="searchTerm.length < props.minSearchTermSize" class="suggestions-hint">
        Enter {{ props.minSearchTermSize - searchTerm.length }} more character(s) to search
      </p>
      <p v-else-if="loading" class="suggestions-loading">Loading...</p>
      <p v-else-if="visibleSuggestions.length === 0" class="suggestions-empty">No matches found</p>
      <ul v-else>
        <li
          v-for="suggestion in visibleSuggestions"
          class="suggestion-item"
          @click="emit('select', suggestion)"
        >
          <p>
            {{ suggestion }}
          </p>
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
  padding: 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
}

.search-input:focus {
  border: 1px solid var(--color-border-focus);
  outline: none;
}

.suggestions-container {
  position: absolute;
  top: 100%;
  margin-top: 2px;
  left: 0;
  right: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  background-color: white;
  z-index: 1000;
  max-height: 15em;
  overflow-y: auto;
  transform-origin: top;
  animation: slide-down 0.2s ease-out;
  transition: all 0.5s ease-out;
  background-color: var(--color-background);
}

.suggestions-container ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.suggestions-container p {
  font-size: 0.8rem;
  padding: 0.8rem;
  color: var(--color-text-muted);
}

.suggestion-item {
  cursor: pointer;
}

.suggestion-item p {
  color: var(--color-text);
}

.suggestion-item:hover {
  background-color: var(--color-background-mute);
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: scaleY(0);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
}
</style>
