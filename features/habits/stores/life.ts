import { defineStore } from 'pinia'
import type { HabitV2, Goal, DailyAnchor, JournalEntry, AspectScore } from '~/features/shared/types'
import { ASPECT_DEFS } from '~/features/shared/constants/aspects'

function getTodayDate(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const useLifeStore = defineStore('life', {
  state: () => ({
    // V2 data
    habits: [] as HabitV2[],
    goals: [] as Goal[],
    dailyAnchors: [] as DailyAnchor[],
    journalEntries: [] as JournalEntry[],

    // App state
    graceModeEnabled: false,
    lastOpenedDate: getTodayDate(),
    lastAnchorDate: '',
    consecutiveZeroDays: 0,
    winterModeShownDate: '',
    dataVersion: 1, // 1 = V1 (pre-migration), 2 = V2
  }),

  getters: {
    // ─── Habit Getters ────────────────────────────────────────
    totalHabits: (state): number => state.habits.length,

    habitsForToday(state): HabitV2[] {
      if (state.graceModeEnabled) {
        return state.habits.filter((h) => h.isMinimumViable)
      }
      return state.habits
    },

    habitsByAspect() {
      return (aspectId: string): HabitV2[] => {
        return this.habitsForToday.filter((h: HabitV2) => h.aspectId === aspectId)
      }
    },

    habitsByTimeBlock() {
      return (blockId: string): HabitV2[] => {
        return this.habitsForToday.filter((h: HabitV2) => h.timeBlock === blockId)
      }
    },

    habitsForGoal() {
      return (goalId: string): HabitV2[] => {
        return this.habits.filter((h: HabitV2) => h.goalId === goalId)
      }
    },

    isCompletedToday() {
      const today = getTodayDate()
      return (habitId: string): boolean => {
        const habit = this.habits.find((h: HabitV2) => h.id === habitId)
        return habit ? habit.completedDates.includes(today) : false
      }
    },

    // ─── Aspect Scoring ───────────────────────────────────────
    aspectScore() {
      const today = getTodayDate()
      return (aspectId: string): AspectScore => {
        const aspectHabits = this.habits.filter(
          (h: HabitV2) => h.aspectId === aspectId,
        )
        const total = aspectHabits.length
        const completed = aspectHabits.filter((h: HabitV2) =>
          h.completedDates.includes(today),
        ).length
        return {
          aspectId,
          completed,
          total,
          score: total > 0 ? Math.round((completed / total) * 100) : 0,
        }
      }
    },

    aspectScores(): AspectScore[] {
      return ASPECT_DEFS.map((a) => this.aspectScore(a.id))
    },

    // ─── Goal Getters ─────────────────────────────────────────
    goalsForAspect() {
      return (aspectId: string): Goal[] => {
        return this.goals.filter((g: Goal) => g.aspectId === aspectId)
      }
    },

    // ─── Daily Anchor ─────────────────────────────────────────
    todayAnchor(state): DailyAnchor | null {
      const today = getTodayDate()
      return state.dailyAnchors.find((a) => a.date === today) ?? null
    },

    needsAnchorToday(state): boolean {
      return state.lastAnchorDate !== getTodayDate()
    },

    // ─── Journal ──────────────────────────────────────────────
    todayJournal(state): JournalEntry | null {
      const today = getTodayDate()
      return state.journalEntries.find((j) => j.date === today) ?? null
    },

    // ─── Auto-Winter Detection ────────────────────────────────
    shouldShowWinterMode(state): boolean {
      const today = getTodayDate()
      return (
        state.consecutiveZeroDays >= 2 &&
        !state.graceModeEnabled &&
        state.winterModeShownDate !== today
      )
    },

    // ─── Correlation Insights ─────────────────────────────────
    /** Simple correlation: find aspect pairs that co-score > 70% on same days */
    correlationInsights(state) {
      // Need at least 7 days of data
      const allDates = new Set<string>()
      for (const h of state.habits) {
        for (const d of h.completedDates) {
          allDates.add(d)
        }
      }
      if (allDates.size < 7) return []

      const aspectIds = ASPECT_DEFS.map((a) => a.id)
      const insights: Array<{ aspect1Id: string; aspect2Id: string }> = []

      // For each pair of aspects, count days where both had > 70% completion
      for (let i = 0; i < aspectIds.length; i++) {
        for (let j = i + 1; j < aspectIds.length; j++) {
          const a1 = aspectIds[i]
          const a2 = aspectIds[j]
          const a1Habits = state.habits.filter((h) => h.aspectId === a1)
          const a2Habits = state.habits.filter((h) => h.aspectId === a2)

          if (a1Habits.length === 0 || a2Habits.length === 0) continue

          let coHighDays = 0
          let totalDays = 0

          for (const date of allDates) {
            const a1Done = a1Habits.filter((h) => h.completedDates.includes(date)).length
            const a2Done = a2Habits.filter((h) => h.completedDates.includes(date)).length
            const a1Score = a1Done / a1Habits.length
            const a2Score = a2Done / a2Habits.length

            if (a1Score > 0 || a2Score > 0) totalDays++
            if (a1Score >= 0.7 && a2Score >= 0.7) coHighDays++
          }

          if (totalDays >= 5 && coHighDays / totalDays >= 0.5) {
            insights.push({ aspect1Id: a1, aspect2Id: a2 })
          }
        }
      }

      return insights.slice(0, 3) // Max 3 insights
    },
  },

  actions: {
    // ─── V1 → V2 Migration ───────────────────────────────────
    migrateV1toV2() {
      if (this.dataVersion >= 2) return // Already migrated

      // Auto-create a "General" goal for each aspect that has habits
      const aspectsWithHabits = new Set(this.habits.map((h) => h.aspectId))

      for (const aspectId of aspectsWithHabits) {
        const aspectDef = ASPECT_DEFS.find((a) => a.id === aspectId)
        if (!aspectDef) continue

        const goalId = crypto.randomUUID()
        const goal: Goal = {
          id: goalId,
          title: aspectDef.labelAr, // Default goal name = aspect name
          aspectId,
          intention: '',
          psychStage: 4, // "Action" — they're already tracking
          createdAt: new Date().toISOString(),
        }
        this.goals.push(goal)

        // Assign all existing habits in this aspect to this goal
        for (const habit of this.habits) {
          if (habit.aspectId === aspectId && !(habit as HabitV2).goalId) {
            ;(habit as HabitV2).goalId = goalId
            ;(habit as HabitV2).timeBlock = 'anytime'
          }
        }
      }

      this.dataVersion = 2
    },

    // ─── Daily Reset (Enhanced) ──────────────────────────────
    checkDailyReset() {
      const today = getTodayDate()
      if (this.lastOpenedDate !== today) {
        // Check if yesterday had zero completions
        const yesterday = this.lastOpenedDate
        const anyCompleted = this.habits.some((h) =>
          h.completedDates.includes(yesterday),
        )

        if (!anyCompleted && this.habits.length > 0) {
          this.consecutiveZeroDays++
        } else {
          this.consecutiveZeroDays = 0
        }

        this.lastOpenedDate = today
      }
    },

    // ─── Goal CRUD ───────────────────────────────────────────
    addGoal(title: string, aspectId: string, intention: string, psychStage: number) {
      const goal: Goal = {
        id: crypto.randomUUID(),
        title,
        aspectId,
        intention,
        psychStage: (psychStage as 1 | 2 | 3 | 4 | 5 | 6) || 1,
        createdAt: new Date().toISOString(),
      }
      this.goals.push(goal)
      return goal.id
    },

    removeGoal(goalId: string) {
      // Find a fallback goal in the same aspect, or create one
      const goal = this.goals.find((g) => g.id === goalId)
      if (!goal) return

      const orphanedHabits = this.habits.filter((h) => h.goalId === goalId)

      if (orphanedHabits.length > 0) {
        // Find another goal in same aspect
        const fallback = this.goals.find(
          (g) => g.id !== goalId && g.aspectId === goal.aspectId,
        )

        if (fallback) {
          for (const h of orphanedHabits) {
            h.goalId = fallback.id
          }
        } else {
          // Create a general goal
          const newGoalId = this.addGoal(
            goal.aspectId,
            goal.aspectId,
            '',
            4,
          )
          for (const h of orphanedHabits) {
            h.goalId = newGoalId
          }
        }
      }

      this.goals = this.goals.filter((g) => g.id !== goalId)
    },

    updateGoalStage(goalId: string, stage: number) {
      const goal = this.goals.find((g) => g.id === goalId)
      if (goal) {
        goal.psychStage = (stage as 1 | 2 | 3 | 4 | 5 | 6) || 1
      }
    },

    // ─── Habit CRUD (V2) ─────────────────────────────────────
    addHabit(
      title: string,
      aspectId: string,
      isMinimumViable: boolean,
      goalId: string = '',
      timeBlock: string = 'anytime',
      habitStackedAfter?: string,
    ) {
      // If no goalId and an aspect is selected, find or create a general goal
      let resolvedGoalId = goalId
      if (!resolvedGoalId && aspectId) {
        const existing = this.goals.find((g) => g.aspectId === aspectId)
        if (existing) {
          resolvedGoalId = existing.id
        } else {
          resolvedGoalId = this.addGoal(aspectId, aspectId, '', 1)
        }
      }

      const habit: HabitV2 = {
        id: crypto.randomUUID(),
        title,
        aspectId: aspectId || '',
        goalId: resolvedGoalId,
        isMinimumViable,
        timeBlock: timeBlock as HabitV2['timeBlock'],
        habitStackedAfter,
        createdAt: new Date().toISOString(),
        completedDates: [],
      }
      this.habits.push(habit)
    },

    toggleHabit(habitId: string) {
      const habit = this.habits.find((h) => h.id === habitId)
      if (!habit) return

      const today = getTodayDate()
      const index = habit.completedDates.indexOf(today)

      if (index > -1) {
        habit.completedDates.splice(index, 1)
      } else {
        habit.completedDates.push(today)
      }
    },

    removeHabit(habitId: string) {
      // Also clear stacking references
      for (const h of this.habits) {
        if (h.habitStackedAfter === habitId) {
          h.habitStackedAfter = undefined
        }
      }
      this.habits = this.habits.filter((h) => h.id !== habitId)
    },

    toggleGraceMode() {
      this.graceModeEnabled = !this.graceModeEnabled
    },

    // ─── Daily Anchor ────────────────────────────────────────
    saveDailyAnchor(text: string) {
      const today = getTodayDate()
      const existing = this.dailyAnchors.find((a) => a.date === today)
      if (existing) {
        existing.text = text
      } else {
        this.dailyAnchors.push({ date: today, text })
      }
      this.lastAnchorDate = today
    },

    // ─── Journal ─────────────────────────────────────────────
    saveJournalEntry(accomplished: string, canImprove: string, hurtAnyone: string) {
      const today = getTodayDate()
      const existing = this.journalEntries.find((j) => j.date === today)
      if (existing) {
        existing.accomplished = accomplished
        existing.canImprove = canImprove
        existing.hurtAnyone = hurtAnyone
      } else {
        this.journalEntries.push({
          id: crypto.randomUUID(),
          date: today,
          accomplished,
          canImprove,
          hurtAnyone,
          createdAt: new Date().toISOString(),
        })
      }
    },

    // ─── Winter Mode ─────────────────────────────────────────
    dismissWinterMode() {
      this.winterModeShownDate = getTodayDate()
    },

    acceptWinterMode() {
      this.graceModeEnabled = true
      this.consecutiveZeroDays = 0
      this.winterModeShownDate = getTodayDate()
    },
  },

  persist: {
    storage: import.meta.client ? localStorage : undefined,
  },
})
