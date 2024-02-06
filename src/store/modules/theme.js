import { getItem, setItem } from '@/utils/storage'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
import variables from '@/styles/variables.module.scss'

export default {
  namespaced: true,
  state: () => ({
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variables: variables
  }),
  mutations: {
    // 设置主题色
    setMainColor(state, newColor) {
      setItem(MAIN_COLOR, newColor)
      // 为了使自定义主题及时变更
      state.variables.menuBg = newColor
      state.mainColor = newColor
    }
  }
}
