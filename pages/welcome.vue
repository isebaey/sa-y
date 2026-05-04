<template>
  <div class="fixed inset-0 z-[200] flex flex-col items-center justify-center p-8 bg-background text-white">
    <!-- Step indicator -->
    <div class="flex gap-2 mb-12">
      <span
        v-for="s in 3"
        :key="s"
        class="w-2 h-2 rounded-full transition-all duration-300"
        :class="s === step ? 'bg-accent w-6' : s < step ? 'bg-accent/40' : 'bg-zinc-700'"
      />
    </div>

    <!-- Step 1: Language -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
      mode="out-in"
    >
      <div v-if="step === 1" key="lang" class="w-full max-w-sm text-center space-y-8">
        <p class="text-4xl">🌍</p>
        <h2 class="text-xl font-bold">Choose your language</h2>
        <p class="text-sm text-zinc-500">اختر لغتك المفضلة</p>
        <div class="flex gap-3">
          <button
            @click="selectLocale('ar')"
            class="flex-1 py-4 rounded-2xl text-base font-semibold transition-all border-2"
            :class="selectedLocale === 'ar' ? 'bg-accent border-accent text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'"
          >
            العربية
          </button>
          <button
            @click="selectLocale('en')"
            class="flex-1 py-4 rounded-2xl text-base font-semibold transition-all border-2"
            :class="selectedLocale === 'en' ? 'bg-accent border-accent text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'"
          >
            English
          </button>
        </div>
        <button @click="step = 2" class="text-sm text-accent hover:text-accent/80 transition-colors">
          {{ selectedLocale === 'ar' ? 'التالي →' : 'Next →' }}
        </button>
      </div>

      <!-- Step 2: Theme -->
      <div v-else-if="step === 2" key="theme" class="w-full max-w-sm text-center space-y-8">
        <p class="text-4xl">🎨</p>
        <h2 class="text-xl font-bold">{{ selectedLocale === 'ar' ? 'اختر المظهر' : 'Choose theme' }}</h2>
        <div class="flex gap-3">
          <button
            @click="selectedTheme = 'dark'"
            class="flex-1 py-4 rounded-2xl text-sm font-semibold transition-all border-2 flex flex-col items-center gap-1"
            :class="selectedTheme === 'dark' ? 'bg-accent border-accent text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'"
          >
            <span class="text-lg">🌙</span>
            {{ selectedLocale === 'ar' ? 'داكن' : 'Dark' }}
          </button>
          <button
            @click="selectedTheme = 'light'"
            class="flex-1 py-4 rounded-2xl text-sm font-semibold transition-all border-2 flex flex-col items-center gap-1"
            :class="selectedTheme === 'light' ? 'bg-accent border-accent text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'"
          >
            <span class="text-lg">☀️</span>
            {{ selectedLocale === 'ar' ? 'فاتح' : 'Light' }}
          </button>
          <button
            @click="selectedTheme = 'adaptive'"
            class="flex-1 py-4 rounded-2xl text-sm font-semibold transition-all border-2 flex flex-col items-center gap-1"
            :class="selectedTheme === 'adaptive' ? 'bg-accent border-accent text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'"
          >
            <span class="text-lg">🔄</span>
            {{ selectedLocale === 'ar' ? 'تلقائي' : 'Adaptive' }}
          </button>
        </div>
        <div class="flex justify-between">
          <button @click="step = 1" class="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
            {{ selectedLocale === 'ar' ? '← رجوع' : '← Back' }}
          </button>
          <button @click="step = 3" class="text-sm text-accent hover:text-accent/80 transition-colors">
            {{ selectedLocale === 'ar' ? 'التالي →' : 'Next →' }}
          </button>
        </div>
      </div>

      <!-- Step 3: Timeline -->
      <div v-else-if="step === 3" key="timeline" class="w-full max-w-sm text-center space-y-8">
        <p class="text-4xl">🕌</p>
        <h2 class="text-xl font-bold">{{ selectedLocale === 'ar' ? 'نظام الجدول' : 'Timeline System' }}</h2>
        <p class="text-sm text-zinc-500">
          {{ selectedLocale === 'ar' ? 'كيف تريد ترتيب يومك؟' : 'How do you want to organize your day?' }}
        </p>
        <div class="flex gap-3">
          <button
            @click="selectedTimeline = 'prayer'"
            class="flex-1 py-4 rounded-2xl text-sm font-semibold transition-all border-2 flex flex-col items-center gap-1"
            :class="selectedTimeline === 'prayer' ? 'bg-accent border-accent text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'"
          >
            <span class="text-lg">🕌</span>
            {{ selectedLocale === 'ar' ? 'مرتبط بالصلاة' : 'Prayer-based' }}
          </button>
          <button
            @click="selectedTimeline = 'daynight'"
            class="flex-1 py-4 rounded-2xl text-sm font-semibold transition-all border-2 flex flex-col items-center gap-1"
            :class="selectedTimeline === 'daynight' ? 'bg-accent border-accent text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'"
          >
            <span class="text-lg">🌅</span>
            {{ selectedLocale === 'ar' ? 'صباح / مساء' : 'Morning / Night' }}
          </button>
        </div>
        <div class="flex justify-between">
          <button @click="step = 2" class="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
            {{ selectedLocale === 'ar' ? '← رجوع' : '← Back' }}
          </button>
          <button
            @click="finish"
            class="px-6 py-2.5 bg-accent text-white font-bold text-sm rounded-xl hover:bg-accent/90 transition-colors"
          >
            {{ selectedLocale === 'ar' ? 'ابدأ سَعْيك' : "Start Sa'y" }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '~/features/shared/stores/settings'
import { useLifeStore } from '~/features/habits/stores/life'
import type { Locale } from '~/features/shared/constants/translations'
import type { Theme, TimelineMode } from '~/features/shared/stores/settings'

definePageMeta({ layout: false })

const settings = useSettingsStore()
const lifeStore = useLifeStore()
const router = useRouter()

const step = ref(1)
const selectedLocale = ref<Locale>('ar')
const selectedTheme = ref<Theme>('dark')
const selectedTimeline = ref<TimelineMode>('prayer')

function selectLocale(locale: Locale) {
  selectedLocale.value = locale
}

function finish() {
  settings.setLocale(selectedLocale.value)
  settings.setTheme(selectedTheme.value)
  settings.setTimelineMode(selectedTimeline.value)
  settings.completeOnboarding()
  settings.applyAll()

  // Run migration & daily reset
  lifeStore.migrateV1toV2()
  lifeStore.checkDailyReset()

  router.replace('/')
}
</script>
