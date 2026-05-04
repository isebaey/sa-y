import type { TimeBlock, DayNightBlock } from '~/features/shared/types'
import { useSettingsStore } from '~/features/shared/stores/settings'

/** Determine current prayer-based time block from system clock */
function getCurrentPrayerBlock(): TimeBlock {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12)  return 'fajr_zuhr'
  if (hour >= 12 && hour < 15) return 'zuhr_asr'
  if (hour >= 15 && hour < 18) return 'asr_maghrib'
  if (hour >= 18 && hour < 20) return 'maghrib_isha'
  return 'isha_fajr' // 20:00 - 04:59
}

/** Determine current day/night block from system clock */
function getCurrentDayNightBlock(): DayNightBlock {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12)  return 'morning'
  if (hour >= 12 && hour < 17) return 'afternoon'
  if (hour >= 17 && hour < 21) return 'evening'
  return 'night' // 21:00 - 04:59
}

/**
 * Composable for prayer/time-based scheduling.
 * Respects the user's timeline mode setting (prayer vs daynight).
 */
export function usePrayerTimes() {
  const settings = useSettingsStore()

  /** Current active time block (reactive to settings) */
  const currentBlock = computed<string>(() => {
    if (settings.timelineMode === 'prayer') {
      return getCurrentPrayerBlock()
    }
    return getCurrentDayNightBlock()
  })

  /** Whether it's after Isha / evening (for reflection prompt) */
  const isReflectionTime = computed(() => {
    const hour = new Date().getHours()
    return hour >= 20 || hour < 5
  })

  /** Whether prayer-based timeline is active */
  const isPrayerMode = computed(() => settings.timelineMode === 'prayer')

  /** Get ordered block IDs for the current mode */
  const orderedBlocks = computed<string[]>(() => {
    if (settings.timelineMode === 'prayer') {
      return ['fajr_zuhr', 'zuhr_asr', 'asr_maghrib', 'maghrib_isha', 'isha_fajr', 'anytime']
    }
    return ['morning', 'afternoon', 'evening', 'night', 'anytime']
  })

  return {
    currentBlock,
    isReflectionTime,
    isPrayerMode,
    orderedBlocks,
  }
}
