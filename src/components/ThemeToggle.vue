<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <button
    class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition-colors flex items-center gap-1"
    aria-label="Toggle theme"
    @click="toggleTheme"
  >
    <span v-if="theme === 'light'">&#x2600;</span>
    <span v-else>&#x1F319;</span>
    <span class="hidden sm:inline">{{ theme === 'light' ? 'Light' : 'Dark' }}</span>
  </button>
</template>
