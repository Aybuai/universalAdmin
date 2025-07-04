import { MAIN_COLOR } from '@/constant'
import { getItem } from '@/utils/storage'
import { generateColors } from '@/utils/theme'

/**
 * 快捷访问
 */
// getters 里的属性是一个计算属性，所依赖的数据不发生变化就不会变更
const getters = {
  token: (state) => state.user.token,
  /**
   * @returns true 表示用户信息已存在
   */
  hashUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: (state) => state.user.userInfo,
  // 相当于计算属性，当state中的依赖属性发生变化才会重新触发响应式
  cssVar: (state) => ({
    ...state.theme.variables,
    ...generateColors(getItem(MAIN_COLOR))
  }),
  sidebarOpened: (state) => state.app.sidebarOpened,
  language: (state) => state.app.language,
  mainColor: (state) => state.theme.mainColor,
  tagsViewList: (state) => state.app.tagsViewList
}

export default getters
