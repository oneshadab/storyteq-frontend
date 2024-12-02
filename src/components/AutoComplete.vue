<script lang="ts" setup>
import { computed, ref } from 'vue'

interface Props {
  // TODO: Write proper type definition
  suggestions: any[]
  loading?: boolean
  autoFocus?: boolean
  minSearchTermSize?: number
  maxSuggestions?: number
  placeholder?: string
}

interface Emits {
  (e: 'select', suggestion: any): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  autoFocus: false,
  minSearchTermSize: 3,
  maxSuggestions: 50,
  placeholder: 'Search...',
})

const emit = defineEmits<Emits>()

const searchTerm = defineModel<string>({ required: true })

const isFocused = ref(false)
const visibleSuggestions = computed(() => props.suggestions.slice(0, props.maxSuggestions))

const showSuggestions = computed(() => searchTerm.value && isFocused.value)
const emptyResult = computed(() => visibleSuggestions.value.length === 0)
const searchTermTooShort = computed(() => searchTerm.value.length < props.minSearchTermSize)
</script>

<template>
  <div class="autocomplete-container">
    <div class="search-input-container">
      <input
        class="search-input"
        v-model="searchTerm"
        :placeholder="placeholder"
        :autofocus="autoFocus"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <button v-if="searchTerm" class="clear-button" @click="searchTerm = ''" type="button">
        ✕
      </button>
    </div>
    <div v-if="showSuggestions" class="suggestions-container">
      <p v-if="searchTermTooShort" class="suggestions-hint">
        Enter {{ minSearchTermSize - searchTerm.length }} more character(s) to search
      </p>
      <p v-else-if="loading" class="suggestions-loading">Loading...</p>
      <p v-else-if="emptyResult" class="suggestions-empty">No matches found</p>
      <ul v-else>
        <li
          v-for="suggestion in visibleSuggestions"
          class="suggestion-item"
          @mousedown="emit('select', suggestion)"
        >
          <p>
            <slot :suggestion="suggestion"></slot>
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

.search-input-wrapper {
  position: relative;
  width: 100%;
}

.clear-button {
  position: absolute;
  right: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.2rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.clear-button:hover {
  color: var(--color-text);
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
