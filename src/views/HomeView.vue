<script setup lang="ts">

const EMAIL_ADDRESS = import.meta.env.VITE_EMAIL_ADDRESS
const GITHUB = import.meta.env.VITE_GITHUB
const LINKEDIN = import.meta.env.VITE_LINKEDIN

const skills = ['TypeScript', 'Vue 3', 'Tailwind CSS', 'Git', 'GitHub Actions', 'REST APIs']
</script>

<template>
    <main class="pt-20">
        <!-- Hero -->
        <section class="min-h-[60vh] flex items-center justify-center px-4">
            <div class="text-center">
                <h1 class="text-4xl md:text-6xl font-bold mb-4">[Your Name]</h1>
                <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                    [Your Tagline]
                </p>
                <div class="w-16 h-1 bg-primary mx-auto rounded-full" />
            </div>
        </section>

        <hr class="border-gray-200 dark:border-gray-700" />

        <!-- About -->
        <section class="max-w-2xl mx-auto px-4 py-16">
            <h2 class="text-2xl font-bold mb-6">About</h2>
            <p class="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                [Your bio — a few sentences about yourself]
            </p>
        </section>

        <hr class="border-gray-200 dark:border-gray-700" />

        <!-- Links -->
        <section class="max-w-2xl mx-auto px-4 py-16">
            <h2 class="text-2xl font-bold mb-6">Links</h2>
            <div class="flex flex-wrap gap-4">
                <a target="_blank" rel="noopener noreferrer" :href="`${GITHUB}`"
                    class="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition-colors">
                    <span>💻</span> GitHub
                </a>
                <a target="_blank" rel="noopener noreferrer" :href="`${LINKEDIN}`"
                    class="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition-colors">
                    <span>💼</span> LinkedIn
                </a>
                <a :href="`mailto:${EMAIL_ADDRESS}`"
                    class="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition-colors">
                    <span>✉️</span> Email
                </a>
            </div>
        </section>

        <hr class="border-gray-200 dark:border-gray-700" />

        <!-- Skills -->
        <section class="max-w-2xl mx-auto px-4 py-16">
            <h2 class="text-2xl font-bold mb-6">Skills</h2>
            <div class="flex flex-wrap gap-2">
                <span v-for="skill in skills" :key="skill"
                    class="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    {{ skill }}
                </span>
            </div>
        </section>
    </main>
</template>
