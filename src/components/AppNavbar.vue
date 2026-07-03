<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const mobileOpen = ref(false)

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
}

function closeMobile() {
  mobileOpen.value = false
}
</script>

<template>
  <nav class="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm">
    <div class="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
      <RouterLink
        to="/"
        class="text-xl font-bold text-primary hover:text-primary-dark transition-colors"
      >
        CN
      </RouterLink>

      <!-- Desktop links -->
      <div class="hidden md:flex items-center gap-6">
        <RouterLink
          :to="{ name: 'home' }"
          active-class="text-primary font-medium border-b-2 border-primary"
          class="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-dark transition-colors"
        >
          Home
        </RouterLink>
        <RouterLink
          :to="{ name: 'contact' }"
          active-class="text-primary font-medium border-b-2 border-primary"
          class="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-dark transition-colors"
        >
          Contact
        </RouterLink>
        <RouterLink
          :to="{ name: 'corgi' }"
          active-class="text-primary font-medium border-b-2 border-primary"
          class="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-dark transition-colors"
        >
          Corgi
        </RouterLink>
        <slot name="theme-toggle" />
      </div>

      <!-- Mobile hamburger -->
      <button
        class="md:hidden text-gray-700 dark:text-gray-200 text-2xl"
        aria-label="Toggle menu"
        @click="toggleMobile"
      >
        <span v-if="mobileOpen">&#x2715;</span>
        <span v-else>&#x2630;</span>
      </button>
    </div>

    <!-- Mobile menu -->
    <div v-show="mobileOpen" class="md:hidden px-4 pb-4 flex flex-col gap-4">
      <RouterLink
        :to="{ name: 'home' }"
        active-class="text-primary font-medium border-b-2 border-primary"
        class="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-dark transition-colors"
        @click="closeMobile"
      >
        Home
      </RouterLink>
      <RouterLink
        :to="{ name: 'contact' }"
        active-class="text-primary font-medium border-b-2 border-primary"
        class="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-dark transition-colors"
        @click="closeMobile"
      >
        Contact
      </RouterLink>
      <RouterLink
        :to="{ name: 'corgi' }"
        active-class="text-primary font-medium border-b-2 border-primary"
        class="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-dark transition-colors"
        @click="closeMobile"
      >
        Corgi
      </RouterLink>
      <slot name="theme-toggle" />
    </div>
  </nav>
</template>
