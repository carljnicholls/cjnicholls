<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { RouterView } from 'vue-router'

</script>

<template>
  <div
    class="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
    <AppNavbar>
      <template #theme-toggle>
        <ThemeToggle />
      </template>
    </AppNavbar>

    <main>
      <RouterView />
    </main>

    <footer
      class="text-center text-sm text-gray-500 dark:text-gray-400 py-8 border-t border-gray-200 dark:border-gray-700">
      &copy; 2026 Carl J Nicholls
    </footer>
  </div>
</template>
