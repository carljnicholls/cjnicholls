<script setup lang="ts">
defineProps<{
  name: string
  tagline: string
}>()
</script>

<template>
  <section class="min-h-[60vh] flex items-center justify-center px-4">
    <div class="text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-4">{{ name }}</h1>
      <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
        {{ tagline }}
      </p>
      <div class="w-16 h-1 bg-primary mx-auto rounded-full" />
    </div>
  </section>
</template>
