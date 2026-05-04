import { Capacitor } from '@capacitor/core'
import { Preferences } from '@capacitor/preferences'

const PINIA_KEYS = ['life', 'settings']

export default defineNuxtPlugin({
  name: 'capacitor-persistence',
  enforce: 'pre',

  async setup() {
    if (!import.meta.client) return
    if (!Capacitor.isNativePlatform()) return

    for (const key of PINIA_KEYS) {
      try {
        const { value } = await Preferences.get({ key })
        if (value) {
          localStorage.setItem(key, value)
        }
      } catch (e) {
        console.warn(`[cap-persist] Failed to restore key "${key}":`, e)
      }
    }
  },

  hooks: {
    'app:mounted'() {
      if (!import.meta.client) return
      if (!Capacitor.isNativePlatform()) return

      const originalSetItem = localStorage.setItem.bind(localStorage)

      localStorage.setItem = (key: string, value: string) => {
        originalSetItem(key, value)

        if (PINIA_KEYS.includes(key)) {
          Preferences.set({ key, value }).catch((e) => {
            console.warn(`[cap-persist] Failed to sync key "${key}":`, e)
          })
        }
      }
    },
  },
})
