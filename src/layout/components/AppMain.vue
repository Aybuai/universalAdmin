<template>
  <div class="app-main">
    <!-- 带有切换动画，并且具备组件缓存 -->
    <router-view v-slot="{ Component, route }">
      <!-- <transition> 只能用于单元素/组件之上，所以 component 动态组件外嵌套一个 div 根标签 -->
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <div :key="route.path">
            <component :is="Component" />
          </div>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { isTags, getTitle } from '@/utils/tags'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

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
  // 浏览器可视高度为 100vh 减去 navbar 和 tagView 的高度
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
