<script setup lang="ts">
import { ref } from 'vue'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const state = ref<FormState>('idle')

const FORMSPREE_URL = import.meta.env.VITE_FORMSPREE_URL
const EMAIL_ADDRESS = import.meta.env.VITE_EMAIL_ADDRESS

async function submitForm(event: Event) {
  const form = event.target as HTMLFormElement
  state.value = 'submitting'

  try {
    const response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    })

    if (response.ok) {
      state.value = 'success'
    } else {
      state.value = 'error'
    }
  } catch {
    state.value = 'error'
  }

  setTimeout(() => {
    state.value = 'idle'
  }, 3000)
}
</script>

<template>
  <section class="max-w-lg mx-auto px-4 py-16 pt-24">
    <h1 class="text-3xl font-bold mb-8">Contact</h1>

    <!-- Success state -->
    <div v-if="state === 'success'"
      class="p-4 rounded-lg bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
      Thanks! I'll get back to you.
    </div>

    <!-- Error state -->
    <div v-else-if="state === 'error'" class="p-4 rounded-lg bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
      Something went wrong. Please try again or Email me at <a :href="`mailto:${EMAIL_ADDRESS}`">{EMAIL_ADDRESS}</a>.
    </div>

    <!-- Form (idle + submitting) -->
    <form v-else :action="FORMSPREE_URL" method="POST" @submit.prevent="submitForm">
      <!-- Name -->
      <label for="name" class="block text-sm font-medium mb-1">Name</label>
      <input id="name" name="name" type="text" required
        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 mb-4" />

      <!-- Email -->
      <label for="email" class="block text-sm font-medium mb-1">Email</label>
      <input id="email" name="email" type="email" required
        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 mb-4" />

      <!-- Message -->
      <label for="message" class="block text-sm font-medium mb-1">Message</label>
      <textarea id="message" name="message" required rows="5"
        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 mb-4"></textarea>

      <!-- Submit -->
      <button type="submit" :disabled="state === 'submitting'"
        class="bg-primary text-white px-6 py-4 min-h-[44px] rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity">
        {{ state === 'submitting' ? 'Sending...' : 'Send' }}
      </button>
    </form>
  </section>
</template>
