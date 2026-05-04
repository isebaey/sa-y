import { useSettingsStore } from '~/features/shared/stores/settings'

export type CircadianPeriod = 'morning' | 'afternoon' | 'night'

/**
 * Composable for time-of-day UI adaptation.
 * Only affects dark mode — light mode stays static.
 */
export function useCircadianTheme() {
  const settings = useSettingsStore()

  const period = computed<CircadianPeriod>(() => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return 'morning'
    if (hour >= 12 && hour < 20) return 'afternoon'
    return 'night'
  })

  /** Background class — only changes in dark mode */
  const bgClass = computed(() => {
    if (settings.theme !== 'dark') return 'bg-white'
    return {
      morning: 'bg-slate-950',    // #0f172a — crisp, energetic
      afternoon: 'bg-background', // #09090b — standard dark
      night: 'bg-black',          // #000000 — pure black, subdued
    }[period.value]
  })

  /** Text dim class — more subdued at night */
  const textDimClass = computed(() => {
    if (settings.theme !== 'dark') return 'text-zinc-500'
    return period.value === 'night' ? 'text-zinc-700' : 'text-zinc-400'
  })

  /** Accent dim — softer accents at night */
  const accentClass = computed(() => {
    if (settings.theme !== 'dark') return 'text-violet-600'
    return period.value === 'night' ? 'text-violet-400/70' : 'text-accent'
  })

  return { period, bgClass, textDimClass, accentClass }
}
