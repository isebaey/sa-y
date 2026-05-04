// ============================================================
// V1 Types (preserved for backward compatibility)
// ============================================================

export interface Aspect {
  id: string
  label: string
  emoji: string
  color: string
}

export interface AspectScore {
  aspectId: string
  completed: number
  total: number
  score: number
}

// ============================================================
// V2 Types — Hierarchical Life Engine
// ============================================================

/** Prayer-anchored time blocks */
export type TimeBlock =
  | 'fajr_zuhr'      // ما بعد الفجر → الظهر
  | 'zuhr_asr'        // ما بعد الظهر → العصر
  | 'asr_maghrib'     // ما بعد العصر → المغرب
  | 'maghrib_isha'    // ما بعد المغرب → العشاء
  | 'isha_fajr'       // ما بعد العشاء → الفجر
  | 'anytime'         // أي وقت

/** Simple day/night blocks for non-prayer timeline mode */
export type DayNightBlock =
  | 'morning'         // الصباح (05:00 - 12:00)
  | 'afternoon'       // بعد الظهر (12:00 - 17:00)
  | 'evening'         // المساء (17:00 - 21:00)
  | 'night'           // الليل (21:00 - 05:00)
  | 'anytime'         // أي وقت

/** Transtheoretical Model of Change (Prochaska & DiClemente) */
export type PsychStage = 1 | 2 | 3 | 4 | 5 | 6
// 1=تأمل (Pre-contemplation)  2=تحضير (Contemplation)
// 3=بدء (Preparation)         4=عمل (Action)
// 5=ثبات (Maintenance)        6=تمكين (Termination/Mastery)

/** Goal — parent entity for habits */
export interface Goal {
  id: string
  title: string
  aspectId: string
  intention: string       // "Why" — spiritual/psychological meaning
  psychStage: PsychStage
  createdAt: string       // ISO
}

/** V1 Habit — kept for migration detection */
export interface Habit {
  id: string
  title: string
  aspectId: string
  isMinimumViable: boolean
  createdAt: string
  completedDates: string[]
}

/** V2 Habit — extended with goal, time block, stacking */
export interface HabitV2 {
  id: string
  title: string
  aspectId: string
  goalId: string               // FK → Goal
  isMinimumViable: boolean
  timeBlock: TimeBlock
  habitStackedAfter?: string   // Optional FK → another Habit
  createdAt: string            // ISO
  completedDates: string[]     // Array of 'YYYY-MM-DD'
}

/** Daily Anchor — "The One Thing" intention */
export interface DailyAnchor {
  date: string     // YYYY-MM-DD
  text: string
}

/** Journal Entry — Nightly Reflection */
export interface JournalEntry {
  id: string
  date: string              // YYYY-MM-DD
  accomplished: string      // ماذا أنجزت؟
  canImprove: string        // ما الذي يمكن تحسينه؟
  hurtAnyone: string        // هل أذيت أحداً اليوم؟
  createdAt: string         // ISO
}

/** Correlation Insight (computed, not persisted) */
export interface CorrelationInsight {
  aspect1Id: string
  aspect2Id: string
  direction: 'positive' | 'negative'
}
