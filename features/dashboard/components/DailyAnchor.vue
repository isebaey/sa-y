<template>
  <!-- Full-screen overlay -->
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95"
    >
      <div class="w-full max-w-md text-center space-y-8">
        <!-- Icon -->
        <p class="text-4xl">🕯️</p>

        <!-- Question -->
        <p class="text-lg font-medium text-zinc-200 leading-relaxed">
          {{ t.anchorPrompt }}
        </p>

        <!-- Input -->
        <input
          v-model.trim="anchorText"
          type="text"
          :placeholder="t.anchorPlaceholder"
          class="w-full px-4 py-4 bg-transparent border-b-2 border-zinc-700 text-white text-center text-lg placeholder-zinc-600 outline-none focus:border-amber-400 transition-colors"
          autocomplete="off"
          @keyup.enter="save"
        />

        <!-- Save Button -->
        <button
          @click="save"
          :disabled="!anchorText"
          class="px-8 py-3 bg-amber-400/90 text-black font-bold text-sm rounded-xl hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          {{ t.anchorSave }}
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useLifeStore } from '~/features/habits/stores/life'
import { useI18n } from '~/features/shared/composables/useI18n'

const store = useLifeStore()
const { t } = useI18n()

const show = ref(false)
const anchorText = ref('')

onMounted(() => {
  // Show only on first open of the day and if there are habits
  if (store.needsAnchorToday && store.totalHabits > 0) {
    show.value = true
  }
})

function save() {
  if (!anchorText.value) return
  store.saveDailyAnchor(anchorText.value)
  show.value = false
}
</script>
