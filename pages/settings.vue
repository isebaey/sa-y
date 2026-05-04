<template>
  <div class="px-5 py-6 max-w-lg mx-auto space-y-8">
    <header>
      <h1 class="text-2xl font-bold text-zinc-900 dark:text-white">{{ t.settings }}</h1>
    </header>

    <!-- Language -->
    <section class="space-y-3">
      <h2 class="text-sm font-medium text-zinc-500 dark:text-zinc-400">{{ t.language }}</h2>
      <div class="flex gap-2">
        <button @click="settings.setLocale('ar')" class="flex-1 py-3 rounded-xl text-sm font-medium transition-all" :class="settings.locale === 'ar' ? 'bg-accent text-white' : 'bg-zinc-100 dark:bg-card text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700'">العربية</button>
        <button @click="settings.setLocale('en')" class="flex-1 py-3 rounded-xl text-sm font-medium transition-all" :class="settings.locale === 'en' ? 'bg-accent text-white' : 'bg-zinc-100 dark:bg-card text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700'">English</button>
      </div>
    </section>

    <!-- Theme -->
    <section class="space-y-3">
      <h2 class="text-sm font-medium text-zinc-500 dark:text-zinc-400">{{ t.theme }}</h2>
      <div class="flex gap-2">
        <button @click="settings.setTheme('dark')" class="flex-1 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2" :class="settings.theme === 'dark' ? 'bg-accent text-white' : 'bg-zinc-100 dark:bg-card text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700'">🌙 {{ t.darkMode }}</button>
        <button @click="settings.setTheme('light')" class="flex-1 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2" :class="settings.theme === 'light' ? 'bg-accent text-white' : 'bg-zinc-100 dark:bg-card text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700'">☀️ {{ t.lightMode }}</button>
        <button @click="settings.setTheme('adaptive')" class="flex-1 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2" :class="settings.theme === 'adaptive' ? 'bg-accent text-white' : 'bg-zinc-100 dark:bg-card text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700'">🔄 {{ t.adaptiveMode }}</button>
      </div>
    </section>

    <!-- Timeline Mode -->
    <section class="space-y-3">
      <h2 class="text-sm font-medium text-zinc-500 dark:text-zinc-400">{{ t.timelineModeSetting }}</h2>
      <div class="flex gap-2">
        <button @click="settings.setTimelineMode('prayer')" class="flex-1 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2" :class="settings.timelineMode === 'prayer' ? 'bg-accent text-white' : 'bg-zinc-100 dark:bg-card text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700'">🕌 {{ t.prayerMode }}</button>
        <button @click="settings.setTimelineMode('daynight')" class="flex-1 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2" :class="settings.timelineMode === 'daynight' ? 'bg-accent text-white' : 'bg-zinc-100 dark:bg-card text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700'">🌅 {{ t.dayNightMode }}</button>
      </div>
    </section>

    <!-- Divider -->
    <div class="h-px bg-zinc-200 dark:bg-zinc-800" />

    <!-- Info: Stages of Change -->
    <section class="space-y-4">
      <button
        @click="showStages = !showStages"
        class="flex items-center justify-between w-full text-start"
      >
        <h2 class="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
          <span class="text-base">🔄</span>
          {{ t.stagesInfoTitle }}
        </h2>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-zinc-400 transition-transform duration-200" :class="{ 'rotate-180': showStages }">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div v-if="showStages" class="space-y-3">
          <div
            v-for="(stage, idx) in stageItems"
            :key="idx"
            class="flex gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-card/50 border border-zinc-200/50 dark:border-zinc-800/50"
          >
            <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <span class="text-xs font-bold text-accent">{{ idx + 1 }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mb-0.5">{{ stage.title }}</h3>
              <p class="text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed">{{ stage.desc }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </section>

    <!-- Info: Life Aspects -->
    <section class="space-y-4">
      <button
        @click="showAspects = !showAspects"
        class="flex items-center justify-between w-full text-start"
      >
        <h2 class="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
          <span class="text-base">🎯</span>
          {{ t.aspectsInfoTitle }}
        </h2>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-zinc-400 transition-transform duration-200" :class="{ 'rotate-180': showAspects }">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div v-if="showAspects" class="space-y-3">
          <div
            v-for="aspect in aspectItems"
            :key="aspect.id"
            class="flex gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-card/50 border border-zinc-200/50 dark:border-zinc-800/50"
          >
            <div
              class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
              :style="{ backgroundColor: aspect.color + '15' }"
            >
              <span class="text-base">{{ aspect.emoji }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mb-0.5">{{ aspect.label }}</h3>
              <p class="text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed">{{ aspect.desc }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </section>

    <!-- Footer -->
    <section class="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-1">
      <p class="text-xs text-zinc-400 dark:text-zinc-600 text-center">سَعْي — Sa'y v2.0.0</p>
      <p class="text-[10px] text-zinc-400/60 dark:text-zinc-600/60 text-center">Created by Ahmad Sebaey</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '~/features/shared/stores/settings'
import { useI18n } from '~/features/shared/composables/useI18n'
import { ASPECT_DEFS } from '~/features/shared/constants/aspects'

const settings = useSettingsStore()
const { t } = useI18n()

const showStages = ref(false)
const showAspects = ref(false)

const stageItems = computed(() => [
  { title: t.value.stage1, desc: t.value.stage1Desc },
  { title: t.value.stage2, desc: t.value.stage2Desc },
  { title: t.value.stage3, desc: t.value.stage3Desc },
  { title: t.value.stage4, desc: t.value.stage4Desc },
  { title: t.value.stage5, desc: t.value.stage5Desc },
  { title: t.value.stage6, desc: t.value.stage6Desc },
])

const aspectDescKeys: Record<string, keyof typeof t.value> = {
  spiritual: 'spiritualDesc',
  health: 'healthDesc',
  work: 'workDesc',
  family: 'familyDesc',
  social: 'socialDesc',
  financial: 'financialDesc',
  mental: 'mentalDesc',
  leisure: 'leisureDesc',
}

const aspectItems = computed(() =>
  ASPECT_DEFS.map((a) => ({
    id: a.id,
    emoji: a.emoji,
    color: a.color,
    label: settings.locale === 'ar' ? a.labelAr : a.labelEn,
    desc: t.value[aspectDescKeys[a.id]] as string,
  })),
)
</script>
