<template>
  <div class="px-5 py-6 max-w-lg mx-auto space-y-6">
    <header class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-zinc-900 dark:text-white">{{ t.goalsTitle }}</h1>
        <p class="text-xs text-zinc-400 dark:text-zinc-600 mt-0.5">{{ t.goalsSubtitle }}</p>
      </div>
      <button
        @click="showForm = !showForm"
        class="text-sm text-accent hover:text-accent/80 transition-colors"
      >
        {{ showForm ? t.cancel : t.addGoal }}
      </button>
    </header>

    <!-- Add Goal Form -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="showForm" class="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 bg-zinc-50 dark:bg-card">
        <GoalForm @saved="onGoalSaved" />
      </div>
    </Transition>

    <!-- Empty State -->
    <div
      v-if="store.goals.length === 0 && !showForm && unassignedHabits.length === 0"
      class="text-center py-12 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl"
    >
      <p class="text-zinc-400 dark:text-zinc-600 text-2xl mb-2">🎯</p>
      <p class="text-zinc-500 text-sm">{{ t.noGoalsYet }}</p>
      <button
        @click="showForm = true"
        class="inline-block mt-4 text-sm text-accent hover:text-accent/80 transition-colors"
      >
        {{ t.addFirstGoal }}
      </button>
    </div>

    <!-- Goals grouped by Aspect -->
    <div v-else class="space-y-6">
      <div v-for="aspect in aspectsWithGoals" :key="aspect.id" class="space-y-2">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-base">{{ aspect.emoji }}</span>
          <span class="text-xs font-medium text-zinc-500">{{ aspect.label }}</span>
          <div class="flex-1 h-px bg-zinc-200 dark:bg-zinc-800/50" />
        </div>

        <div class="space-y-2">
          <GoalCard
            v-for="goal in store.goalsForAspect(aspect.id)"
            :key="goal.id"
            :goal="goal"
          />
        </div>
      </div>

      <!-- Unassigned Habits (no goal or no aspect) -->
      <div v-if="unassignedHabits.length > 0" class="space-y-2">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-base">📋</span>
          <span class="text-xs font-medium text-zinc-500">{{ t.unassignedHabits }}</span>
          <div class="flex-1 h-px bg-zinc-200 dark:bg-zinc-800/50" />
        </div>

        <div class="space-y-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-card p-4">
          <div
            v-for="habit in unassignedHabits"
            :key="habit.id"
            class="flex items-center justify-between gap-2 py-1.5 px-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors group"
          >
            <span class="text-xs text-zinc-700 dark:text-zinc-300 flex-1 min-w-0 truncate">
              {{ habit.title }}
            </span>
            <template v-if="confirmingHabitId === habit.id">
              <button
                @click="deleteHabit(habit.id)"
                class="text-[10px] text-warning px-1.5 py-0.5 rounded hover:bg-warning/10"
              >
                {{ t.confirm }}
              </button>
              <button
                @click="confirmingHabitId = ''"
                class="text-[10px] text-zinc-500 px-1.5 py-0.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800"
              >
                {{ t.cancel }}
              </button>
            </template>
            <button
              v-else
              @click="confirmingHabitId = habit.id"
              class="p-1 text-zinc-400 dark:text-zinc-600 hover:text-warning transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLifeStore } from '~/features/habits/stores/life'
import { useSettingsStore } from '~/features/shared/stores/settings'
import { getAspects } from '~/features/shared/constants/aspects'
import { useI18n } from '~/features/shared/composables/useI18n'
import GoalCard from '~/features/goals/components/GoalCard.vue'
import GoalForm from '~/features/goals/components/GoalForm.vue'

const store = useLifeStore()
const settings = useSettingsStore()
const { t } = useI18n()

const showForm = ref(false)
const confirmingHabitId = ref('')

const aspects = computed(() => getAspects(settings.locale))
const aspectsWithGoals = computed(() =>
  aspects.value.filter((a) => store.goalsForAspect(a.id).length > 0),
)

/** Habits that have no goalId or whose goalId doesn't exist */
const unassignedHabits = computed(() =>
  store.habits.filter((h) => {
    if (!h.goalId) return true
    return !store.goals.some((g) => g.id === h.goalId)
  }),
)

function onGoalSaved() {
  showForm.value = false
}

function deleteHabit(habitId: string) {
  store.removeHabit(habitId)
  confirmingHabitId.value = ''
}
</script>
