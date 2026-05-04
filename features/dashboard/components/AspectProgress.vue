<template>
  <div class="flex items-center gap-3">
    <!-- Emoji -->
    <span class="text-lg flex-shrink-0 w-7 text-center">{{ aspect.emoji }}</span>

    <!-- Bar & Info -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs text-zinc-600 dark:text-zinc-400 truncate">{{ aspect.label }}</span>
        <div class="flex items-center gap-1.5">
          <span v-if="score.score < 30 && score.total > 0" class="text-warning text-xs">⚠</span>
          <span class="text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">
            {{ score.completed }}/{{ score.total }}
          </span>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-300"
          :style="{
            width: `${score.score}%`,
            backgroundColor: aspect.color,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Aspect, AspectScore } from '~/features/shared/types'

defineProps<{
  aspect: Aspect
  score: AspectScore
}>()
</script>
