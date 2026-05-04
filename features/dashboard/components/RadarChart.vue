<template>
  <div v-if="hasHabits" class="w-full max-w-md mx-auto">
    <Radar :data="chartData" :options="chartOptions" />
  </div>
  <div v-else class="text-center py-12">
    <p class="text-zinc-400 dark:text-zinc-600 text-lg">🕊️</p>
    <p class="text-zinc-500 text-sm mt-2">
      {{ t.noHabitsChart }}
    </p>
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'
import { Radar } from 'vue-chartjs'
import { getAspects } from '~/features/shared/constants/aspects'
import { useSettingsStore } from '~/features/shared/stores/settings'
import { useI18n } from '~/features/shared/composables/useI18n'
import type { AspectScore } from '~/features/shared/types'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip)

const props = defineProps<{
  scores: AspectScore[]
  hasHabits: boolean
}>()

const settings = useSettingsStore()
const { t } = useI18n()

const isDark = computed(() => settings.theme === 'dark')
const aspects = computed(() => getAspects(settings.locale))

const chartData = computed(() => ({
  labels: aspects.value.map((a) => `${a.emoji} ${a.label}`),
  datasets: [
    {
      label: t.value.progress,
      data: props.scores.map((s) => s.score),
      backgroundColor: 'rgba(167, 139, 250, 0.15)',
      borderColor: '#a78bfa',
      borderWidth: 2,
      pointBackgroundColor: '#a78bfa',
      pointBorderColor: '#a78bfa',
      pointRadius: 3,
      pointHoverRadius: 5,
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: isDark.value ? '#18181b' : '#ffffff',
      borderColor: isDark.value ? '#27272a' : '#e4e4e7',
      borderWidth: 1,
      titleColor: '#a78bfa',
      bodyColor: isDark.value ? '#e4e4e7' : '#27272a',
      titleFont: { family: 'Tajawal' },
      bodyFont: { family: 'Tajawal' },
      rtl: settings.locale === 'ar',
      textDirection: settings.locale === 'ar' ? 'rtl' : 'ltr',
      callbacks: {
        label: (context: any) => `${context.parsed.r}%`,
      },
    },
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 25,
        color: isDark.value ? '#52525b' : '#a1a1aa',
        backdropColor: 'transparent',
        font: { size: 10 },
      },
      grid: {
        color: isDark.value ? '#27272a' : '#e4e4e7',
      },
      angleLines: {
        color: isDark.value ? '#27272a' : '#e4e4e7',
      },
      pointLabels: {
        color: isDark.value ? '#a1a1aa' : '#52525b',
        font: {
          family: 'Tajawal',
          size: 11,
        },
      },
    },
  },
}))
</script>
