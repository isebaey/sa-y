<template>
  <div class="flex items-center gap-3 group py-1">
    <input
      type="checkbox"
      :id="`habit-${habit.id}`"
      :checked="isCompleted"
      @change="handleToggle"
    />

    <label
      :for="`habit-${habit.id}`"
      class="flex-1 text-sm cursor-pointer transition-all duration-150 select-none"
      :class="isCompleted ? 'line-through text-zinc-400 dark:text-zinc-600' : 'text-zinc-800 dark:text-zinc-200'"
    >
      {{ habit.title }}
    </label>

    <!-- Time Block Badge -->
    <span
      v-if="habit.timeBlock && habit.timeBlock !== 'anytime'"
      class="text-[10px] px-1.5 py-0.5 rounded bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-500 flex-shrink-0"
    >
      {{ blockEmoji }}
    </span>

    <!-- Minimum Viable Badge -->
    <span
      v-if="habit.isMinimumViable"
      class="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent flex-shrink-0"
    >
      {{ t.minBadge }}
    </span>

    <!-- Delete -->
    <div class="flex items-center gap-1 flex-shrink-0">
      <template v-if="confirmingDelete">
        <button
          @click="confirmDelete"
          class="text-xs text-warning px-2 py-1.5 rounded hover:bg-warning/10 transition-colors"
        >
          {{ t.confirm }}
        </button>
        <button
          @click="confirmingDelete = false"
          class="text-xs text-zinc-500 px-2 py-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
        >
          {{ t.cancel }}
        </button>
      </template>
      <button
        v-else
        @click="confirmingDelete = true"
        class="p-2 text-zinc-400 dark:text-zinc-600 hover:text-warning transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        :aria-label="`${t.deleteLabel} ${habit.title}`"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HabitV2 } from '~/features/shared/types'
import { useLifeStore } from '~/features/habits/stores/life'
import { useSettingsStore } from '~/features/shared/stores/settings'
import { useI18n } from '~/features/shared/composables/useI18n'
import { getTimeBlockEmoji } from '~/features/shared/constants/timeBlocks'
import { useCompletionSound } from '~/features/shared/composables/useCompletionSound'

const props = defineProps<{ habit: HabitV2 }>()

const store = useLifeStore()
const settings = useSettingsStore()
const { t } = useI18n()
const { playDone } = useCompletionSound()

const confirmingDelete = ref(false)

const isCompleted = computed(() => store.isCompletedToday(props.habit.id))

const blockEmoji = computed(() =>
  getTimeBlockEmoji(props.habit.timeBlock, settings.timelineMode),
)

function handleToggle() {
  store.toggleHabit(props.habit.id)
  if (isCompleted.value) {
    playDone()
  }
}

function confirmDelete() {
  store.removeHabit(props.habit.id)
  confirmingDelete.value = false
}
</script>
