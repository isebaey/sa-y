<template>
  <div class="px-5 py-6 max-w-lg mx-auto space-y-6">
    <header>
      <h1 class="text-2xl font-bold text-white">{{ t.reflectionTitle }}</h1>
      <p class="text-xs text-zinc-600 mt-1">{{ t.reflectionSubtitle }}</p>
    </header>

    <!-- Already Saved -->
    <div
      v-if="store.todayJournal && !editing"
      class="space-y-4"
    >
      <div class="rounded-2xl border border-zinc-800 bg-black p-5 space-y-4">
        <div class="space-y-1">
          <span class="text-[10px] text-zinc-600 uppercase tracking-wider">{{ t.reflectionAccomplished }}</span>
          <p class="text-sm text-zinc-300">{{ store.todayJournal.accomplished }}</p>
        </div>
        <div class="space-y-1">
          <span class="text-[10px] text-zinc-600 uppercase tracking-wider">{{ t.reflectionImprove }}</span>
          <p class="text-sm text-zinc-300">{{ store.todayJournal.canImprove }}</p>
        </div>
        <div class="space-y-1">
          <span class="text-[10px] text-zinc-600 uppercase tracking-wider">{{ t.reflectionHurt }}</span>
          <p class="text-sm text-zinc-300">{{ store.todayJournal.hurtAnyone }}</p>
        </div>
      </div>
      <p class="text-center text-xs text-zinc-600">{{ t.reflectionAlreadySaved }}</p>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="handleSubmit" class="space-y-5">
      <div class="space-y-2">
        <label class="block text-sm text-zinc-500">{{ t.reflectionAccomplished }}</label>
        <textarea
          v-model.trim="accomplished"
          :placeholder="t.reflectionAccomplishedPlaceholder"
          rows="3"
          class="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-white placeholder-zinc-700 outline-none focus:border-zinc-600 transition-colors resize-none"
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm text-zinc-500">{{ t.reflectionImprove }}</label>
        <textarea
          v-model.trim="canImprove"
          :placeholder="t.reflectionImprovePlaceholder"
          rows="3"
          class="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-white placeholder-zinc-700 outline-none focus:border-zinc-600 transition-colors resize-none"
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm text-zinc-500">{{ t.reflectionHurt }}</label>
        <textarea
          v-model.trim="hurtAnyone"
          :placeholder="t.reflectionHurtPlaceholder"
          rows="2"
          class="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-white placeholder-zinc-700 outline-none focus:border-zinc-600 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        class="w-full py-3.5 bg-zinc-800 text-white font-bold text-sm rounded-xl hover:bg-zinc-700 transition-colors"
      >
        {{ t.reflectionSave }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useLifeStore } from '~/features/habits/stores/life'
import { useI18n } from '~/features/shared/composables/useI18n'

const store = useLifeStore()
const { t } = useI18n()

const editing = ref(false)
const accomplished = ref('')
const canImprove = ref('')
const hurtAnyone = ref('')

function handleSubmit() {
  store.saveJournalEntry(accomplished.value, canImprove.value, hurtAnyone.value)
  accomplished.value = ''
  canImprove.value = ''
  hurtAnyone.value = ''
}
</script>

<style scoped>
/* Deep dark mode for reflection — pure black bg */
:deep(html.dark) {
  --reflection-bg: #000000;
}
</style>
