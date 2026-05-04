<template>
  <div class="px-5 py-6 max-w-lg mx-auto">
    <header class="mb-8">
      <h1 class="text-2xl font-bold text-zinc-900 dark:text-white">{{ t.addHabitTitle }}</h1>
      <p class="text-xs text-zinc-400 dark:text-zinc-600 mt-1">{{ t.addHabitSubtitle }}</p>
    </header>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <!-- Habit Name -->
      <div class="space-y-2">
        <label for="habit-title" class="block text-sm text-zinc-600 dark:text-zinc-400">{{ t.habitName }}</label>
        <input
          id="habit-title"
          v-model.trim="title"
          type="text"
          :placeholder="t.habitNamePlaceholder"
          class="w-full px-4 py-3.5 bg-zinc-50 dark:bg-card border rounded-xl text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 outline-none transition-colors"
          :class="errors.title ? 'border-warning' : 'border-zinc-200 dark:border-zinc-700 focus:border-accent'"
          autocomplete="off"
        />
        <p v-if="errors.title" class="text-xs text-warning">{{ errors.title }}</p>
      </div>

      <!-- Aspect (optional) -->
      <div class="space-y-2">
        <label class="block text-sm text-zinc-600 dark:text-zinc-400">
          {{ t.aspectLabel }}
          <span class="text-[10px] text-zinc-400 dark:text-zinc-600">({{ t.optional }})</span>
        </label>
        <AspectDropdown v-model="aspectId" :has-error="false" />
      </div>

      <!-- Goal (shown when aspect is selected and has goals) -->
      <div v-if="aspectId && goalsForAspect.length > 0" class="space-y-2">
        <label class="block text-sm text-zinc-600 dark:text-zinc-400">{{ t.goalLabel }}</label>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="goal in goalsForAspect"
            :key="goal.id"
            type="button"
            @click="goalId = goal.id"
            class="py-2.5 px-3 rounded-xl text-xs font-medium transition-all text-start truncate"
            :class="goalId === goal.id
              ? 'bg-accent text-white'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700'
            "
          >
            {{ goal.title }}
          </button>
        </div>
      </div>

      <!-- Time Block -->
      <div class="space-y-2">
        <label class="block text-sm text-zinc-600 dark:text-zinc-400">{{ t.timeBlockLabel }}</label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="block in timeBlockOptions"
            :key="block.id"
            type="button"
            @click="timeBlock = block.id"
            class="py-2 px-3 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5"
            :class="timeBlock === block.id
              ? 'bg-accent text-white'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700'
            "
          >
            <span>{{ block.emoji }}</span>
            <span>{{ block.label }}</span>
          </button>
        </div>
      </div>

      <!-- Minimum Viable -->
      <div class="flex items-center gap-3">
        <input id="is-minimum-viable" v-model="isMinimumViable" type="checkbox" />
        <label for="is-minimum-viable" class="text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
          {{ t.setMinimumDaily }}
        </label>
        <span class="text-[10px] text-zinc-400 dark:text-zinc-600">{{ t.graceTag }}</span>
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="w-full py-3.5 bg-accent text-white font-bold text-sm rounded-xl hover:bg-accent/90 active:bg-accent/80 transition-colors"
      >
        {{ t.saveHabit }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useLifeStore } from '~/features/habits/stores/life'
import { useSettingsStore } from '~/features/shared/stores/settings'
import { useI18n } from '~/features/shared/composables/useI18n'
import { PRAYER_TIME_BLOCKS, DAY_NIGHT_BLOCKS } from '~/features/shared/constants/timeBlocks'
import AspectDropdown from '~/features/habits/components/AspectDropdown.vue'

const store = useLifeStore()
const settings = useSettingsStore()
const router = useRouter()
const { t } = useI18n()

const title = ref('')
const aspectId = ref('')
const goalId = ref('')
const timeBlock = ref('anytime')
const isMinimumViable = ref(false)

const errors = reactive({ title: '' })

const goalsForAspect = computed(() =>
  aspectId.value ? store.goalsForAspect(aspectId.value) : [],
)

// Auto-select first goal when aspect changes
watch(aspectId, () => {
  const goals = goalsForAspect.value
  goalId.value = goals.length > 0 ? goals[0].id : ''
})

const timeBlockOptions = computed(() => {
  const blocks = settings.timelineMode === 'prayer' ? PRAYER_TIME_BLOCKS : DAY_NIGHT_BLOCKS
  return blocks.map((b) => ({
    id: b.id,
    emoji: b.emoji,
    label: settings.locale === 'ar' ? b.labelAr : b.labelEn,
  }))
})

function handleSubmit() {
  errors.title = ''

  if (!title.value) {
    errors.title = t.value.habitNameRequired
    return
  }

  store.addHabit(title.value, aspectId.value, isMinimumViable.value, goalId.value, timeBlock.value)
  router.push('/')
}
</script>
