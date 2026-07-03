import { ref, computed, watch, type Ref, type ComputedRef } from 'vue'

const STORAGE_KEY = 'corgi-seen'

function loadSeen(images: readonly string[]): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    // Prune entries for images that no longer exist in the list
    const names = new Set(parsed.filter((s): s is string => typeof s === 'string'))
    return new Set([...names].filter((n) => images.includes(n)))
  } catch {
    return new Set()
  }
}

function persistSeen(seen: Set<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...seen]))
  } catch {
    // localStorage unavailable (private browsing, quota exceeded) — degrade silently
  }
}

function pickUnseen(images: readonly string[], seen: Set<string>): string {
  const unseen = images.filter((img) => !seen.has(img))
  const pool = unseen.length > 0 ? unseen : images
  return pool[Math.floor(Math.random() * pool.length)]!
}

export function useCorgiRotation(images: readonly string[]): {
  current: Ref<string>
  hasSeenAll: ComputedRef<boolean>
  shuffle: () => void
} {
  const seen = ref(loadSeen(images))
  const current = ref(pickUnseen(images, seen.value)) as Ref<string>

  seen.value.add(current.value)
  persistSeen(seen.value)

  const hasSeenAll = computed(() => seen.value.size >= images.length)

  function shuffle(): void {
    let next = pickUnseen(images, seen.value)

    // If all seen, reset tracking — but exclude current to avoid immediate repeat
    if (seen.value.size >= images.length) {
      seen.value = new Set([current.value])
      next = pickUnseen(images, seen.value)
    }

    seen.value.add(next)
    persistSeen(seen.value)
    current.value = next
  }

  watch(seen, (val) => persistSeen(val), { deep: true })

  return { current, hasSeenAll, shuffle }
}
