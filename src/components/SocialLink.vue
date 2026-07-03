<script setup lang="ts">
defineProps<{
  href: string
  icon: string
  label: string
}>()
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition-colors"
  >
    <span>{{ icon }}</span> {{ label }}
  </a>
</template>
