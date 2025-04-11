import i18n from '@/i18n'
import store from '@/store'
import { watch } from 'vue'

export const generateTitle = (title) => {
  return i18n.global.t(`route.${title}`)
}

/**
 * @param {...any} cbs - 所有的回调
 */
export const watchSwitchLang = (...cbs) => {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach((cb) => cb(store.getters.language))
    }
  )
}
