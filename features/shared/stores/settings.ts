import { defineStore } from 'pinia'
import type { Locale } from '~/features/shared/constants/translations'

export type Theme = 'dark' | 'light' | 'adaptive'
export type TimelineMode = 'prayer' | 'daynight'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    locale: 'ar' as Locale,
    theme: 'dark' as Theme,
    timelineMode: 'prayer' as TimelineMode,
    onboardingComplete: false,
  }),

  actions: {
    setLocale(locale: Locale) {
      this.locale = locale
    },

    toggleLocale() {
      this.locale = this.locale === 'ar' ? 'en' : 'ar'
    },

    setTheme(theme: Theme) {
      this.theme = theme
      this.applyTheme()
    },

    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      this.applyTheme()
    },

    setTimelineMode(mode: TimelineMode) {
      this.timelineMode = mode
    },

    completeOnboarding() {
      this.onboardingComplete = true
    },

    applyTheme() {
      if (!import.meta.client) return

      const html = document.documentElement

      if (this.theme === 'adaptive') {
        // Follow system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        if (prefersDark) {
          html.classList.add('dark')
        } else {
          html.classList.remove('dark')
        }
      } else if (this.theme === 'dark') {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    },

    /** Listen for system theme changes (call once on mount) */
    watchSystemTheme() {
      if (!import.meta.client) return

      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      mq.addEventListener('change', () => {
        if (this.theme === 'adaptive') {
          this.applyTheme()
        }
      })
    },

    applyLocale() {
      if (import.meta.client) {
        const html = document.documentElement
        html.setAttribute('lang', this.locale === 'ar' ? 'ar' : 'en')
        html.setAttribute('dir', this.locale === 'ar' ? 'rtl' : 'ltr')
      }
    },

    applyAll() {
      this.applyTheme()
      this.applyLocale()
      this.watchSystemTheme()
    },
  },

  persist: {
    storage: import.meta.client ? localStorage : undefined,
  },
})
