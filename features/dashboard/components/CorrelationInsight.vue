<template>
  <div
    v-if="insights.length > 0"
    class="rounded-2xl border border-amber-400/20 bg-amber-400/5 dark:bg-amber-400/5 p-4 space-y-2"
  >
    <div class="flex items-center gap-2 mb-1">
      <span class="text-base">💡</span>
      <span class="text-xs font-semibold text-amber-600 dark:text-amber-400">
        {{ t.insightTitle }}
      </span>
    </div>
    <p
      v-for="(insight, idx) in insights"
      :key="idx"
      class="text-sm text-zinc-600 dark:text-zinc-400"
    >
      {{ formatInsight(insight) }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useLifeStore } from '~/features/habits/stores/life'
import { useSettingsStore } from '~/features/shared/stores/settings'
import { useI18n } from '~/features/shared/composables/useI18n'
import { getAspects } from '~/features/shared/constants/aspects'

const store = useLifeStore()
const settings = useSettingsStore()
const { t } = useI18n()

const insights = computed(() => store.correlationInsights)

function formatInsight(insight: { aspect1Id: string; aspect2Id: string }) {
  const aspects = getAspects(settings.locale)
  const a1 = aspects.find((a) => a.id === insight.aspect1Id)
  const a2 = aspects.find((a) => a.id === insight.aspect2Id)

  return t.value.insightTemplate
    .replace('{aspect1}', `${a1?.emoji ?? ''} ${a1?.label ?? ''}`)
    .replace('{aspect2}', `${a2?.emoji ?? ''} ${a2?.label ?? ''}`)
}
</script>
