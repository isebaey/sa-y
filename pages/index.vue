<template>
  <div class="px-5 py-6 max-w-lg mx-auto space-y-6">
    <!-- Daily Anchor Overlay -->
    <DailyAnchor />

    <!-- Winter Mode Overlay -->
    <WinterModeOverlay />

    <!-- Header: Grace Mode + One Thing (no app name) -->
    <header class="flex items-center gap-3">
      <GraceModeToggle
        :model-value="store.graceModeEnabled"
        @toggle="store.toggleGraceMode()"
      />

      <!-- Inline One Thing Badge -->
      <div
        v-if="store.todayAnchor"
        class="flex-1 min-w-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-400/10 dark:bg-amber-400/10 border border-amber-400/20"
      >
        <span class="text-sm flex-shrink-0">🕯️</span>
        <div class="flex-1 min-w-0">
          <span class="text-[9px] text-amber-600 dark:text-amber-500/80 uppercase tracking-wider font-medium">{{ t.anchorBadgeLabel }}</span>
          <p class="text-xs text-amber-900 dark:text-amber-200 truncate">{{ store.todayAnchor.text }}</p>
        </div>
      </div>

      <!-- Spacer when no anchor -->
      <div v-else class="flex-1" />
    </header>

    <!-- Radar Chart -->
    <section v-if="!store.graceModeEnabled" :aria-label="t.progress">
      <RadarChart :scores="store.aspectScores" :has-habits="store.totalHabits > 0" />
    </section>

    <!-- Today's Habits by Time Block (grouped by goal when 2+) -->
    <section :aria-label="t.todayHabits">
      <h2 class="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-4">
        {{ store.graceModeEnabled ? t.graceModeToday : t.todayHabits }}
      </h2>

      <!-- Empty State -->
      <div
        v-if="store.habitsForToday.length === 0"
        class="text-center py-12 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl"
      >
        <p class="text-zinc-400 dark:text-zinc-600 text-2xl mb-2">✨</p>
        <p class="text-zinc-500 text-sm">
          {{ store.graceModeEnabled ? t.noGraceHabits : t.noHabitsYet }}
        </p>
        <NuxtLink
          to="/add"
          class="inline-block mt-4 text-sm text-accent hover:text-accent/80 transition-colors"
        >
          {{ t.addFirstHabit }}
        </NuxtLink>
      </div>

      <!-- Grouped by Time Block -->
      <div v-else class="space-y-3">
        <TimeBlockGroup
          v-for="blockId in orderedBlocks"
          :key="blockId"
          :block-id="blockId"
          :habits="getHabitsForBlock(blockId)"
          :is-active="currentBlock === blockId"
        />
      </div>
    </section>

    <!-- Correlation Insights -->
    <CorrelationInsight />

    <!-- Reflection Prompt (after Isha) -->
    <NuxtLink
      v-if="isReflectionTime && !store.todayJournal"
      to="/reflect"
      class="block text-center py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-sm hover:text-zinc-800 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
    >
      {{ t.reflectionPrompt }}
    </NuxtLink>
    <div
      v-else-if="store.todayJournal"
      class="text-center py-2 text-xs text-zinc-500 dark:text-zinc-600"
    >
      {{ t.reflectionAlreadySaved }}
    </div>

    <!-- Aspect Progress Bars (moved to bottom) -->
    <section
      v-if="!store.graceModeEnabled && store.totalHabits > 0"
      class="space-y-3"
    >
      <h2 class="text-sm font-medium text-zinc-500 dark:text-zinc-400">{{ t.progress }}</h2>
      <AspectProgress
        v-for="aspect in aspects"
        :key="aspect.id"
        :aspect="aspect"
        :score="store.aspectScore(aspect.id)"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useLifeStore } from '~/features/habits/stores/life'
import { useSettingsStore } from '~/features/shared/stores/settings'
import { getAspects } from '~/features/shared/constants/aspects'
import { useI18n } from '~/features/shared/composables/useI18n'
import { usePrayerTimes } from '~/features/shared/composables/usePrayerTimes'
import GraceModeToggle from '~/features/dashboard/components/GraceModeToggle.vue'
import RadarChart from '~/features/dashboard/components/RadarChart.vue'
import AspectProgress from '~/features/dashboard/components/AspectProgress.vue'
import TimeBlockGroup from '~/features/dashboard/components/TimeBlockGroup.vue'
import CorrelationInsight from '~/features/dashboard/components/CorrelationInsight.vue'
import DailyAnchor from '~/features/dashboard/components/DailyAnchor.vue'
import WinterModeOverlay from '~/features/dashboard/components/WinterModeOverlay.vue'

const store = useLifeStore()
const settings = useSettingsStore()
const { t } = useI18n()
const { currentBlock, orderedBlocks, isReflectionTime } = usePrayerTimes()

const aspects = computed(() => getAspects(settings.locale))

function getHabitsForBlock(blockId: string) {
  return store.habitsForToday.filter((h) => h.timeBlock === blockId)
}
</script>
