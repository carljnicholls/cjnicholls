<script setup lang="ts">
defineProps<{ heading: string }>()
</script>

<template>
  <hr class="border-gray-200 dark:border-gray-700" />
  <section class="max-w-2xl mx-auto px-4 py-16">
    <h2 class="text-2xl font-bold mb-6">{{ heading }}</h2>
    <slot />
  </section>
</template>
