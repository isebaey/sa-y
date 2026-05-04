import type { TimeBlock, DayNightBlock } from '../types'
import type { Locale } from './translations'

export interface TimeBlockDef {
  id: TimeBlock
  labelAr: string
  labelEn: string
  emoji: string
  startHour: number
  endHour: number
}

export interface DayNightBlockDef {
  id: DayNightBlock
  labelAr: string
  labelEn: string
  emoji: string
  startHour: number
  endHour: number
}

/** Prayer-anchored time blocks */
export const PRAYER_TIME_BLOCKS: readonly TimeBlockDef[] = Object.freeze([
  { id: 'fajr_zuhr',    labelAr: 'ما بعد الفجر',   labelEn: 'After Fajr',    emoji: '🌅', startHour: 5,  endHour: 12 },
  { id: 'zuhr_asr',     labelAr: 'ما بعد الظهر',    labelEn: 'After Dhuhr',   emoji: '☀️',  startHour: 12, endHour: 15 },
  { id: 'asr_maghrib',  labelAr: 'ما بعد العصر',    labelEn: 'After Asr',     emoji: '🌤️', startHour: 15, endHour: 18 },
  { id: 'maghrib_isha', labelAr: 'ما بعد المغرب',   labelEn: 'After Maghrib', emoji: '🌇', startHour: 18, endHour: 20 },
  { id: 'isha_fajr',    labelAr: 'ما بعد العشاء',   labelEn: 'After Isha',    emoji: '🌙', startHour: 20, endHour: 5  },
  { id: 'anytime',      labelAr: 'أي وقت',          labelEn: 'Anytime',       emoji: '⏰', startHour: 0,  endHour: 24 },
])

/** Simple day/night blocks for non-prayer timeline */
export const DAY_NIGHT_BLOCKS: readonly DayNightBlockDef[] = Object.freeze([
  { id: 'morning',   labelAr: 'الصباح',     labelEn: 'Morning',   emoji: '🌅', startHour: 5,  endHour: 12 },
  { id: 'afternoon', labelAr: 'بعد الظهر',   labelEn: 'Afternoon', emoji: '☀️',  startHour: 12, endHour: 17 },
  { id: 'evening',   labelAr: 'المساء',      labelEn: 'Evening',   emoji: '🌇', startHour: 17, endHour: 21 },
  { id: 'night',     labelAr: 'الليل',       labelEn: 'Night',     emoji: '🌙', startHour: 21, endHour: 5  },
  { id: 'anytime',   labelAr: 'أي وقت',     labelEn: 'Anytime',   emoji: '⏰', startHour: 0,  endHour: 24 },
])

/** Get label for a time block based on locale and timeline mode */
export function getTimeBlockLabel(blockId: string, locale: Locale, mode: 'prayer' | 'daynight'): string {
  if (mode === 'prayer') {
    const block = PRAYER_TIME_BLOCKS.find((b) => b.id === blockId)
    return block ? (locale === 'ar' ? block.labelAr : block.labelEn) : blockId
  }
  const block = DAY_NIGHT_BLOCKS.find((b) => b.id === blockId)
  return block ? (locale === 'ar' ? block.labelAr : block.labelEn) : blockId
}

/** Get emoji for a time block */
export function getTimeBlockEmoji(blockId: string, mode: 'prayer' | 'daynight'): string {
  if (mode === 'prayer') {
    return PRAYER_TIME_BLOCKS.find((b) => b.id === blockId)?.emoji ?? '⏰'
  }
  return DAY_NIGHT_BLOCKS.find((b) => b.id === blockId)?.emoji ?? '⏰'
}
