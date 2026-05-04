import type { Aspect } from '../types'
import type { Locale } from './translations'

export interface AspectDef {
  id: string
  labelAr: string
  labelEn: string
  emoji: string
  color: string
}

export const ASPECT_DEFS: readonly AspectDef[] = Object.freeze([
  { id: 'spiritual', labelAr: 'الروحي والديني', labelEn: 'Spiritual', emoji: '🕌', color: '#a78bfa' },
  { id: 'health', labelAr: 'الصحي', labelEn: 'Health', emoji: '💪', color: '#4ade80' },
  { id: 'work', labelAr: 'المهني', labelEn: 'Work', emoji: '💼', color: '#60a5fa' },
  { id: 'family', labelAr: 'الأسري', labelEn: 'Family', emoji: '🏠', color: '#fb923c' },
  { id: 'social', labelAr: 'الاجتماعي', labelEn: 'Social', emoji: '🤝', color: '#f472b6' },
  { id: 'financial', labelAr: 'المادي', labelEn: 'Financial', emoji: '💰', color: '#facc15' },
  { id: 'mental', labelAr: 'العقلي والشخصي', labelEn: 'Mental', emoji: '🧠', color: '#34d399' },
  { id: 'leisure', labelAr: 'الترفيهي', labelEn: 'Leisure', emoji: '🎯', color: '#f87171' },
])

/** Get aspects with label resolved for current locale */
export function getAspects(locale: Locale): Aspect[] {
  return ASPECT_DEFS.map((a) => ({
    id: a.id,
    label: locale === 'ar' ? a.labelAr : a.labelEn,
    emoji: a.emoji,
    color: a.color,
  }))
}

/** Backward-compatible: default to Arabic */
export const ASPECTS: readonly Aspect[] = getAspects('ar')
