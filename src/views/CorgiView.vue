<script setup lang="ts">
import { computed } from 'vue'
import { useCorgiRotation } from '@/composables/useCorgiRotation'

const IMAGES = [
  'corgi_judge',
  'corgi_round',
  'corgi_seal',
  'corgi_upside_down',
] as const

const BREAKPOINTS = [400, 800, 1200] as const

const { current, hasSeenAll, shuffle } = useCorgiRotation(IMAGES)

const srcsetWebp = computed(() =>
  BREAKPOINTS.map((w) => `/cjnicholls/corgi/${current.value}-${w}w.webp ${w}w`).join(', '),
)

const fallbackSrc = computed(() => `/cjnicholls/corgi/${current.value}-1200w.webp`)

const subtitle = computed(() =>
  hasSeenAll.value
    ? "You've met them all — starting fresh!"
    : "You won't see repeats until you've met them all.",
)
</script>

<template>
  <section class="max-w-2xl mx-auto px-4 py-16 pt-24 text-center">
    <h1 class="text-3xl font-bold mb-2">Random Corgi</h1>
    <p class="text-gray-500 dark:text-gray-400 mb-8">{{ subtitle }}</p>

    <picture class="block mb-8">
      <source :srcset="srcsetWebp" sizes="(max-width: 800px) 100vw, 800px" type="image/webp" />
      <img
        :src="fallbackSrc"
        :alt="`Corgi: ${current.replace(/_/g, ' ')}`"
        class="mx-auto rounded-xl shadow-lg max-w-full h-auto"
        loading="lazy"
      />
    </picture>

    <button
      class="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors cursor-pointer"
      @click="shuffle"
    >
      Show me another!
    </button>
  </section>
</template>
