<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useLifeStore } from '~/features/habits/stores/life'
import { useSettingsStore } from '~/features/shared/stores/settings'

const lifeStore = useLifeStore()
const settingsStore = useSettingsStore()
const router = useRouter()

onMounted(() => {
  // Apply theme & locale
  settingsStore.applyAll()

  // Redirect to onboarding if not complete
  if (!settingsStore.onboardingComplete) {
    router.replace('/welcome')
    return
  }

  // V1 → V2 migration (safe — checks dataVersion internally)
  lifeStore.migrateV1toV2()

  // Daily reset & zero-day tracking
  lifeStore.checkDailyReset()
})

// Watch for settings changes
watch(() => settingsStore.theme, () => settingsStore.applyTheme())
watch(() => settingsStore.locale, () => settingsStore.applyLocale())
</script>
