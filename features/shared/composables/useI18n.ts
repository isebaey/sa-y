import { useSettingsStore } from '~/features/shared/stores/settings'
import { translations } from '~/features/shared/constants/translations'
import type { TranslationKeys } from '~/features/shared/constants/translations'

export function useI18n() {
  const settings = useSettingsStore()

  const t = computed<TranslationKeys>(() => translations[settings.locale])

  const isRtl = computed(() => settings.locale === 'ar')

  return { t, isRtl }
}
