<template>
  <div :class="['flex flex-col min-h-screen transition-colors duration-500', bgClass]">
    <main class="flex-1 overflow-y-auto pb-20">
      <slot />
    </main>
    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import BottomNav from '~/features/shared/components/BottomNav.vue'
import { useCircadianTheme } from '~/features/shared/composables/useCircadianTheme'

const { bgClass } = useCircadianTheme()
</script>
