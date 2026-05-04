<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90"
    >
      <div class="w-full max-w-md text-center space-y-6 bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
        <!-- Icon -->
        <p class="text-4xl">🌿</p>

        <!-- Title -->
        <h2 class="text-lg font-bold text-white">{{ t.winterTitle }}</h2>

        <!-- Message -->
        <p class="text-sm text-zinc-400 leading-relaxed">
          {{ t.winterMessage }}
        </p>

        <!-- Actions -->
        <div class="space-y-3 pt-2">
          <button
            @click="accept"
            class="w-full py-3.5 bg-accent text-white font-bold text-sm rounded-xl hover:bg-accent/90 transition-colors"
          >
            {{ t.winterAccept }}
          </button>
          <button
            @click="dismiss"
            class="w-full py-3 text-zinc-500 text-sm hover:text-zinc-300 transition-colors"
          >
            {{ t.winterDismiss }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useLifeStore } from '~/features/habits/stores/life'
import { useI18n } from '~/features/shared/composables/useI18n'

const store = useLifeStore()
const { t } = useI18n()

const show = ref(false)

onMounted(() => {
  if (store.shouldShowWinterMode) {
    show.value = true
  }
})

function accept() {
  store.acceptWinterMode()
  show.value = false
}

function dismiss() {
  store.dismissWinterMode()
  show.value = false
}
</script>
