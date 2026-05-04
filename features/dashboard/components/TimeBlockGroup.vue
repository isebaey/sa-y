<template>
  <div
    class="rounded-2xl border p-4 transition-all duration-200"
    :class="[
      isActive
        ? 'border-accent/50 bg-accent/5 dark:bg-accent/5'
        : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-card/50',
      isEmpty && !isActive ? 'opacity-50' : '',
    ]"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <span class="text-base">{{ blockEmoji }}</span>
        <span class="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          {{ blockLabel }}
        </span>
        <span
          v-if="isActive"
          class="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/20 text-accent font-medium"
        >
          {{ t.currentBlock }}
        </span>
      </div>
      <span class="text-xs text-zinc-400 dark:text-zinc-600 tabular-nums">
        {{ completedCount }}/{{ habits.length }}
      </span>
    </div>

    <!-- Habits: grouped by goal when a goal has 2+ habits, flat otherwise -->
    <div v-if="habits.length > 0" class="space-y-1">
      <!-- Goals with 2+ habits get their own sub-header -->
      <template v-for="group in groupedHabits" :key="group.key">
        <!-- Goal sub-header (only for groups with 2+ habits) -->
        <div
          v-if="group.isGoalGroup"
          class="flex items-center gap-1.5 pt-2 pb-1 first:pt-0"
        >
          <span class="text-[10px]">{{ group.emoji }}</span>
          <span class="text-[10px] font-medium text-zinc-400 dark:text-zinc-500">{{ group.title }}</span>
          <div class="flex-1 h-px bg-zinc-200/50 dark:bg-zinc-800/30" />
        </div>

        <HabitItem
          v-for="habit in group.habits"
          :key="habit.id"
          :habit="habit"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HabitV2 } from '~/features/shared/types'
import { useLifeStore } from '~/features/habits/stores/life'
import { useSettingsStore } from '~/features/shared/stores/settings'
import { useI18n } from '~/features/shared/composables/useI18n'
import { getTimeBlockLabel, getTimeBlockEmoji } from '~/features/shared/constants/timeBlocks'
import { ASPECT_DEFS } from '~/features/shared/constants/aspects'
import HabitItem from '~/features/habits/components/HabitItem.vue'

const props = defineProps<{
  blockId: string
  habits: HabitV2[]
  isActive: boolean
}>()

const store = useLifeStore()
const settings = useSettingsStore()
const { t } = useI18n()

const blockLabel = computed(() =>
  getTimeBlockLabel(props.blockId, settings.locale, settings.timelineMode),
)

const blockEmoji = computed(() =>
  getTimeBlockEmoji(props.blockId, settings.timelineMode),
)

const isEmpty = computed(() => props.habits.length === 0)

const completedCount = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return props.habits.filter((h) => h.completedDates.includes(today)).length
})

interface HabitGroup {
  key: string
  isGoalGroup: boolean
  title: string
  emoji: string
  habits: HabitV2[]
}

/** Group habits by goal — only create a sub-header when a goal has 2+ habits */
const groupedHabits = computed<HabitGroup[]>(() => {
  // Count habits per goalId
  const goalCounts = new Map<string, number>()
  for (const h of props.habits) {
    const gid = h.goalId || '_none_'
    goalCounts.set(gid, (goalCounts.get(gid) ?? 0) + 1)
  }

  // Separate into grouped (2+) and flat (1)
  const groups: HabitGroup[] = []
  const flatHabits: HabitV2[] = []

  const processedGoals = new Set<string>()
  for (const h of props.habits) {
    const gid = h.goalId || '_none_'

    if ((goalCounts.get(gid) ?? 0) >= 2) {
      // This goal has 2+ habits — group them
      if (!processedGoals.has(gid)) {
        processedGoals.add(gid)
        const goalHabits = props.habits.filter((hb) => (hb.goalId || '_none_') === gid)
        const goal = store.goals.find((g) => g.id === gid)
        const aspect = ASPECT_DEFS.find((a) => a.id === goal?.aspectId)

        groups.push({
          key: gid,
          isGoalGroup: true,
          title: goal?.title ?? '',
          emoji: aspect?.emoji ?? '📌',
          habits: goalHabits,
        })
      }
    } else {
      flatHabits.push(h)
    }
  }

  // Add flat (single) habits as ungrouped
  if (flatHabits.length > 0) {
    groups.push({
      key: '_flat_',
      isGoalGroup: false,
      title: '',
      emoji: '',
      habits: flatHabits,
    })
  }

  return groups
})
</script>
