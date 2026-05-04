<template>
  <div
    class="rounded-2xl border p-4 transition-colors duration-200"
    :class="[
      'bg-zinc-50 dark:bg-card border-zinc-200 dark:border-zinc-800',
    ]"
  >
    <!-- Click to expand -->
    <div
      class="cursor-pointer"
      @click="expanded = !expanded"
    >
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1 min-w-0">
          <!-- Header -->
          <div class="flex items-center gap-2 mb-1">
            <span class="text-base">{{ aspectEmoji }}</span>
            <h3 class="text-sm font-semibold text-zinc-900 dark:text-white truncate">
              {{ goal.title }}
            </h3>
            <!-- Expand indicator -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ms-auto flex-shrink-0" :class="{ 'rotate-180': expanded }">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          <!-- Intention -->
          <p
            v-if="goal.intention && !expanded"
            class="text-xs text-zinc-500 dark:text-zinc-500 line-clamp-2 mb-2"
          >
            {{ goal.intention }}
          </p>

          <!-- Footer -->
          <div class="flex items-center gap-3">
            <!-- Psych Stage dots -->
            <div class="flex items-center gap-1">
              <span
                v-for="s in 6"
                :key="s"
                class="w-1.5 h-1.5 rounded-full transition-colors"
                :class="s <= goal.psychStage
                  ? 'bg-accent'
                  : 'bg-zinc-300 dark:bg-zinc-700'
                "
              />
            </div>
            <span class="text-[10px] text-zinc-400 dark:text-zinc-600">
              {{ stageLabel }}
            </span>

            <!-- Habits count -->
            <span class="text-[10px] text-zinc-400 dark:text-zinc-600 ms-auto">
              {{ habitsCount }} {{ t.habitsCount }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Expanded: Habit list + Delete goal -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div v-if="expanded" class="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
        <!-- Intention (full, when expanded) -->
        <p v-if="goal.intention" class="text-xs text-zinc-500 leading-relaxed mb-2">
          {{ goal.intention }}
        </p>

        <!-- Habits under this goal -->
        <div v-if="goalHabits.length > 0" class="space-y-1">
          <div
            v-for="habit in goalHabits"
            :key="habit.id"
            class="flex items-center justify-between gap-2 py-1.5 px-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors group"
          >
            <span class="text-xs text-zinc-700 dark:text-zinc-300 flex-1 min-w-0 truncate">
              {{ habit.title }}
            </span>
            <span v-if="habit.isMinimumViable" class="text-[9px] px-1 py-0.5 rounded bg-accent/10 text-accent flex-shrink-0">
              {{ t.minBadge }}
            </span>
            <!-- Delete habit -->
            <template v-if="confirmingHabitId === habit.id">
              <button
                @click.stop="deleteHabit(habit.id)"
                class="text-[10px] text-warning px-1.5 py-0.5 rounded hover:bg-warning/10"
              >
                {{ t.confirm }}
              </button>
              <button
                @click.stop="confirmingHabitId = ''"
                class="text-[10px] text-zinc-500 px-1.5 py-0.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800"
              >
                {{ t.cancel }}
              </button>
            </template>
            <button
              v-else
              @click.stop="confirmingHabitId = habit.id"
              class="p-1 text-zinc-400 dark:text-zinc-600 hover:text-warning transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
        <p v-else class="text-xs text-zinc-400 dark:text-zinc-600 text-center py-2">
          {{ t.noHabitsYet }}
        </p>

        <!-- Delete Goal -->
        <div class="pt-2 border-t border-zinc-100 dark:border-zinc-800/50 flex justify-end">
          <template v-if="confirmingGoalDelete">
            <button
              @click="handleDeleteGoal"
              class="text-xs text-warning px-2 py-1 rounded hover:bg-warning/10"
            >
              {{ t.confirm }}
            </button>
            <button
              @click="confirmingGoalDelete = false"
              class="text-xs text-zinc-500 px-2 py-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800"
            >
              {{ t.cancel }}
            </button>
          </template>
          <button
            v-else
            @click="confirmingGoalDelete = true"
            class="text-xs text-zinc-400 dark:text-zinc-600 hover:text-warning transition-colors flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            {{ t.deleteLabel }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { Goal } from '~/features/shared/types'
import { useLifeStore } from '~/features/habits/stores/life'
import { useSettingsStore } from '~/features/shared/stores/settings'
import { useI18n } from '~/features/shared/composables/useI18n'
import { ASPECT_DEFS } from '~/features/shared/constants/aspects'

const props = defineProps<{ goal: Goal }>()

const store = useLifeStore()
const settings = useSettingsStore()
const { t } = useI18n()

const expanded = ref(false)
const confirmingGoalDelete = ref(false)
const confirmingHabitId = ref('')

const aspectEmoji = computed(() =>
  ASPECT_DEFS.find((a) => a.id === props.goal.aspectId)?.emoji ?? '📌',
)

const stageLabel = computed(() => {
  const stages = [t.value.stage1, t.value.stage2, t.value.stage3, t.value.stage4, t.value.stage5, t.value.stage6]
  return stages[props.goal.psychStage - 1] ?? ''
})

const goalHabits = computed(() => store.habitsForGoal(props.goal.id))
const habitsCount = computed(() => goalHabits.value.length)

function deleteHabit(habitId: string) {
  store.removeHabit(habitId)
  confirmingHabitId.value = ''
}

function handleDeleteGoal() {
  store.removeGoal(props.goal.id)
  confirmingGoalDelete.value = false
}
</script>
