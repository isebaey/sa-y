<template>
  <div class="flex items-center gap-3">
    <button
      @click="emit('toggle')"
      class="relative w-12 h-7 rounded-full transition-colors duration-200 flex-shrink-0"
      :class="modelValue ? 'bg-accent' : 'bg-zinc-300 dark:bg-zinc-700'"
      role="switch"
      :aria-checked="modelValue"
      :aria-label="t.graceMode"
    >
      <span
        class="absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 shadow-sm"
        :class="modelValue ? 'start-1' : 'start-[24px]'"
      />
    </button>
    <span class="text-sm text-zinc-600 dark:text-zinc-400">{{ t.graceMode }}</span>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '~/features/shared/composables/useI18n'

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  toggle: []
}>()

const { t } = useI18n()
</script>
