<template>
  <div class="px-5 py-6 max-w-lg mx-auto space-y-6">
    <header class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-zinc-900 dark:text-white">{{ t.statsTitle }}</h1>
        <p class="text-xs text-zinc-400 dark:text-zinc-600 mt-0.5">{{ t.statsSubtitle }}</p>
      </div>
      <button
        @click="exportCSV"
        class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        :disabled="isExporting"
      >
        <span v-if="isExporting" class="animate-spin">⏳</span>
        <span v-else>📊</span>
        {{ isExporting ? t.exporting : (exportSuccess ? t.exported : t.exportCSV) }}
      </button>
    </header>

    <!-- Stats Table -->
    <div class="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-start text-sm">
          <thead class="bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400">
            <tr>
              <th class="px-4 py-3 font-medium text-start whitespace-nowrap">{{ t.habitName }}</th>
              <th class="px-4 py-3 font-medium text-center whitespace-nowrap">{{ t.statCompletions }}</th>
              <th class="px-4 py-3 font-medium text-center whitespace-nowrap">{{ t.statStreak }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800">
            <tr v-if="habitStats.length === 0">
              <td colspan="3" class="px-4 py-8 text-center text-zinc-400 dark:text-zinc-600">
                {{ t.noHabitsYet }}
              </td>
            </tr>
            <tr
              v-for="stat in habitStats"
              :key="stat.id"
              class="hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30 transition-colors"
            >
              <td class="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                {{ stat.title }}
              </td>
              <td class="px-4 py-3 text-center text-accent font-semibold">
                {{ stat.completions }}
              </td>
              <td class="px-4 py-3 text-center text-amber-500 font-semibold flex items-center justify-center gap-1">
                <span v-if="stat.streak > 0">🔥</span>
                {{ stat.streak }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLifeStore } from '~/features/habits/stores/life'
import { useI18n } from '~/features/shared/composables/useI18n'

const store = useLifeStore()
const { t } = useI18n()

const isExporting = ref(false)
const exportSuccess = ref(false)

const habitStats = computed(() => {
  return store.habits.map((habit) => {
    const dates = [...habit.completedDates].sort()
    
    // Calculate current streak
    let streak = 0
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
    
    // Check backwards from today or yesterday
    let checkDate = new Date(currentDate)
    const todayStr = checkDate.toISOString().split('T')[0]
    
    // If not completed today, maybe streak is still alive from yesterday
    if (!dates.includes(todayStr)) {
      checkDate.setDate(checkDate.getDate() - 1)
    }

    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0]
      if (dates.includes(dateStr)) {
        streak++
        checkDate.setDate(checkDate.getDate() - 1)
      } else {
        break
      }
    }

    return {
      id: habit.id,
      title: habit.title,
      completions: habit.completedDates.length,
      streak: streak,
    }
  }).sort((a, b) => b.completions - a.completions) // sort by most completed
})

async function exportCSV() {
  if (isExporting.value || habitStats.value.length === 0) return
  isExporting.value = true
  
  try {
    // Generate CSV content
    const headers = ['Habit Name', 'Total Completions', 'Current Streak']
    const rows = habitStats.value.map(s => `"${s.title.replace(/"/g, '""')}",${s.completions},${s.streak}`)
    const csvContent = [headers.join(','), ...rows].join('\n')
    
    // Add BOM for Excel UTF-8 compatibility
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    
    // Create hidden link and trigger download
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `say_habits_export_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    exportSuccess.value = true
    setTimeout(() => {
      exportSuccess.value = false
    }, 3000)
  } catch (error) {
    console.error('Export failed:', error)
  } finally {
    isExporting.value = false
  }
}
</script>
