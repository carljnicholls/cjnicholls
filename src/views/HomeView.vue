<script setup lang="ts">
import { ref, computed } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import PageSection from '@/components/PageSection.vue'
import SocialLink from '@/components/SocialLink.vue'
import SkillBadge from '@/components/SkillBadge.vue'

const EMAIL_ADDRESS = import.meta.env.VITE_EMAIL_ADDRESS
const GITHUB = import.meta.env.VITE_GITHUB
const LINKEDIN = import.meta.env.VITE_LINKEDIN

const skills = ref(
    (import.meta.env.VITE_SKILLS || '').split(',').map((s: string) => s.trim()).filter(Boolean),
)

/** Maximum visible rows when skills are collapsed. Increase to show more rows by default. */
const MAX_VISIBLE_ROWS = 2

const collapsedMaxHeight = computed(() => {
    // Row: badge height (~1.875rem) + border buffer. Gap: 0.5rem (gap-2).
    const rowHeight = 2.25 // rem
    const gap = 0.5 // rem
    return `${MAX_VISIBLE_ROWS * rowHeight + (MAX_VISIBLE_ROWS - 1) * gap}rem`
})

const isSkillsExpanded = ref(false)

// Only show toggle when there are enough skills to potentially overflow
const showSkillsToggle = computed(() => skills.value.length > 6)

function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j]!, array[i]!]
    }
    return array
}

const skillShuffle = () => {
    shuffleArray(skills.value)
}
</script>

<template>
    <main class="pt-20">
        <HeroSection name="Carl J Nicholls" tagline="[Your Tagline]" />

        <PageSection heading="About">
            <p class="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                [Your bio — a few sentences about yourself]
            </p>
        </PageSection>

        <PageSection heading="Links">
            <div class="flex flex-wrap gap-4">
                <SocialLink :href="GITHUB" icon="💻" label="GitHub" />
                <SocialLink :href="LINKEDIN" icon="💼" label="LinkedIn" />
                <SocialLink :href="`mailto:${EMAIL_ADDRESS}`" icon="✉️" label="Email" />
            </div>
        </PageSection>

        <PageSection heading="Skills">
            <div class="relative" @click="skillShuffle">
                <div class="flex flex-wrap gap-2 pb-px transition-[max-height] duration-500 ease-in-out"
                    :class="{ 'overflow-hidden': !isSkillsExpanded && showSkillsToggle }"
                    :style="!isSkillsExpanded && showSkillsToggle ? { maxHeight: collapsedMaxHeight } : {}">
                    <SkillBadge v-for="skill in skills" :key="skill" :skill="skill" />
                </div>
                <div v-if="!isSkillsExpanded && showSkillsToggle"
                    class="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent dark:from-gray-900" />
            </div>
            <button v-if="showSkillsToggle"
                class="mt-3 cursor-pointer text-sm text-primary transition-colors hover:underline dark:text-primary-dark"
                @click="isSkillsExpanded = !isSkillsExpanded">
                {{ isSkillsExpanded ? 'Show less' : 'Show all' }}
            </button>
        </PageSection>
    </main>
</template>
