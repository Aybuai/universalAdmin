<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { isTags } from '@/utils/tags'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'

/**
 * 生成 title
 */
const getTitle = (route) => {
  let title = ''
  if (!route.meta) {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}

const store = useStore()
const route = useRoute()
watch(
  route,
  (to, from) => {
    // 不展示的路由无需保存
    if (!isTags(to.path)) return
    const { fullPath, meta, name, params, query, path } = to
    store.commit('app/addTagsViewList', {
      fullPath,
      meta,
      name,
      params,
      query,
      path,
      title: getTitle(to)
    })
  },
  {
    immediate: true
  }
)
</script>
<style scoped lang="scss">
.app-main {
  // 浏览器可视高度为 100vh
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
