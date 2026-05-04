<template>
  <div class="relative" ref="dropdownRef">
    <!-- Trigger Button -->
    <button
      type="button"
      @click="isOpen = !isOpen"
      class="w-full flex items-center justify-between px-4 py-3.5 border rounded-xl transition-colors duration-150 text-right"
      :class="[
        hasError
          ? 'border-warning'
          : 'border-zinc-200 dark:border-zinc-700 focus:border-accent',
        'bg-zinc-50 dark:bg-card',
      ]"
    >
      <span v-if="selectedAspect" class="flex items-center gap-2">
        <span class="text-lg">{{ selectedAspect.emoji }}</span>
        <span class="text-zinc-900 dark:text-white">{{ selectedAspect.label }}</span>
      </span>
      <span v-else class="text-zinc-400 dark:text-zinc-500">{{ t.selectAspect }}</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4 text-zinc-400 dark:text-zinc-500 transition-transform duration-150"
        :class="{ 'rotate-180': isOpen }"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>

    <!-- Dropdown List -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <ul
        v-if="isOpen"
        class="absolute z-40 top-full mt-1 inset-x-0 bg-white dark:bg-card border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden max-h-64 overflow-y-auto shadow-lg dark:shadow-none"
      >
        <li
          v-for="aspect in aspects"
          :key="aspect.id"
          @click="selectAspect(aspect.id)"
          class="flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-colors duration-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          :class="{
            'bg-zinc-100 dark:bg-zinc-800/50': modelValue === aspect.id,
          }"
        >
          <span
            class="w-2.5 h-2.5 rounded-full flex-shrink-0"
            :style="{ backgroundColor: aspect.color }"
          />
          <span class="text-lg">{{ aspect.emoji }}</span>
          <span class="text-sm text-zinc-800 dark:text-white">{{ aspect.label }}</span>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { getAspects } from '~/features/shared/constants/aspects'
import { useSettingsStore } from '~/features/shared/stores/settings'
import { useI18n } from '~/features/shared/composables/useI18n'

const props = defineProps<{
  modelValue: string
  hasError?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const settings = useSettingsStore()
const { t } = useI18n()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const aspects = computed(() => getAspects(settings.locale))

const selectedAspect = computed(() =>
  aspects.value.find((a) => a.id === props.modelValue),
)

function selectAspect(id: string) {
  emit('update:modelValue', id)
  isOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
