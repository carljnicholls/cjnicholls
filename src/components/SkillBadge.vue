<script setup lang="ts">
defineProps<{ skill: string }>()
</script>

<template>
  <span
    class="group relative inline-flex items-center overflow-hidden rounded-full border border-gray-200 px-3 py-1 text-sm dark:border-gray-700">
    <span class="gradient-overlay" />
    <span class="relative z-10">{{ skill }}</span>
  </span>
</template>

<style scoped>
.gradient-overlay {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(135deg,
      var(--color-primary-dark, #60a5fa) 0%,
      var(--color-primary, #3b82f6) 12%,
      rgba(255, 255, 255, 0.35) 25%,
      var(--color-primary, #3b82f6) 30%,
      var(--color-primary-dark, #60a5fa) 50%,
      var(--color-primary, #3b82f6) 65%,
      rgba(255, 255, 255, 0.35) 75%,
      var(--color-primary, #3b82f6) 85%,
      var(--color-primary-dark, #60a5fa) 100%);
  background-size: 300% 300%;
  opacity: 0;
  transition: opacity 300ms;
}

.group:hover .gradient-overlay {
  opacity: 1;
  animation: gradient-flow 1s linear infinite;
}

.group:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

@keyframes gradient-flow {
  0% {
    background-position: 0% 0%;
  }

  100% {
    background-position: 300% 300%;
  }
}
</style>
