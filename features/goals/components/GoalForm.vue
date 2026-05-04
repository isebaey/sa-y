<template>
  <form @submit.prevent="handleSubmit" class="space-y-5">
    <!-- Goal Name -->
    <div class="space-y-2">
      <label class="block text-sm text-zinc-600 dark:text-zinc-400">{{ t.goalName }}</label>
      <input
        v-model.trim="title"
        type="text"
        :placeholder="t.goalNamePlaceholder"
        class="w-full px-4 py-3.5 bg-zinc-50 dark:bg-card border rounded-xl text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 outline-none transition-colors"
        :class="errors.title ? 'border-warning' : 'border-zinc-200 dark:border-zinc-700 focus:border-accent'"
        autocomplete="off"
      />
      <p v-if="errors.title" class="text-xs text-warning">{{ errors.title }}</p>
    </div>

    <!-- Aspect -->
    <div class="space-y-2">
      <label class="block text-sm text-zinc-600 dark:text-zinc-400">{{ t.aspectLabel }}</label>
      <AspectDropdown v-model="aspectId" :has-error="!!errors.aspect" />
      <p v-if="errors.aspect" class="text-xs text-warning">{{ errors.aspect }}</p>
    </div>

    <!-- Intention -->
    <div class="space-y-2">
      <label class="block text-sm text-zinc-600 dark:text-zinc-400">{{ t.goalIntention }}</label>
      <textarea
        v-model.trim="intention"
        :placeholder="t.goalIntentionPlaceholder"
        rows="3"
        class="w-full px-4 py-3 bg-zinc-50 dark:bg-card border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-accent transition-colors resize-none"
      />
    </div>

    <!-- Psych Stage -->
    <div class="space-y-2">
      <label class="block text-sm text-zinc-600 dark:text-zinc-400">{{ t.goalStage }}</label>
      <div class="grid grid-cols-3 gap-2">
        <button
          v-for="s in 6"
          :key="s"
          type="button"
          @click="psychStage = s"
          class="py-2.5 rounded-xl text-xs font-medium transition-all duration-150"
          :class="psychStage === s
            ? 'bg-accent text-white'
            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700'
          "
        >
          {{ stageLabels[s - 1] }}
        </button>
      </div>
    </div>

    <!-- Submit -->
    <button
      type="submit"
      class="w-full py-3.5 bg-accent text-white font-bold text-sm rounded-xl hover:bg-accent/90 active:bg-accent/80 transition-colors"
    >
      {{ t.saveGoal }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { useLifeStore } from '~/features/habits/stores/life'
import { useI18n } from '~/features/shared/composables/useI18n'
import AspectDropdown from '~/features/habits/components/AspectDropdown.vue'

const emit = defineEmits<{ saved: [goalId: string] }>()

const store = useLifeStore()
const { t } = useI18n()

const title = ref('')
const aspectId = ref('')
const intention = ref('')
const psychStage = ref(1)

const stageLabels = computed(() => [
  t.value.stage1, t.value.stage2, t.value.stage3,
  t.value.stage4, t.value.stage5, t.value.stage6,
])

const errors = reactive({ title: '', aspect: '' })

function handleSubmit() {
  errors.title = ''
  errors.aspect = ''

  if (!title.value) errors.title = t.value.goalNameRequired
  if (!aspectId.value) errors.aspect = t.value.aspectRequired

  if (errors.title || errors.aspect) return

  const goalId = store.addGoal(title.value, aspectId.value, intention.value, psychStage.value)
  emit('saved', goalId)

  // Reset
  title.value = ''
  aspectId.value = ''
  intention.value = ''
  psychStage.value = 1
}
</script>
