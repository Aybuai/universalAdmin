import { LANG, TAGS_VIEW } from '@/constant'
import { getItem, setItem } from '@/utils/storage'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    // 设置国际化
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    },
    // 添加 tags
    addTagsViewList(state, tag) {
      const isFind = state.tagsViewList.find((item) => item.path === tag.path)
      // 不重复添加
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },
    // 修改指定 tags 中英文切换 title 展示
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },
    /**
     * 删除 tag
     * @param {type: 'other'||'right'||'index', index: index} payload
     */
    removeTagsView(state, payload) {
      const { type, index } = payload
      const removeRightTags = () => {
        state.tagsViewList.splice(
          index + 1,
          state.tagsViewList.length - index + 1
        )
      }
      if (type === 'index') {
        state.tagsViewList.splice(index, 1)
      } else if (type === 'other') {
        // 删除选中 tag 右侧所有 tag
        removeRightTags()
        // 删除选中 tag 左侧所有 tag
        state.tagsViewList.splice(0, index)
      } else if (type === 'right') {
        removeRightTags()
      }
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  }
}
