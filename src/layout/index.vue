<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  >
    <!-- 左侧 menu -->
    <sidebar
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
    ></sidebar>
    <div class="main-container">
      <!-- 顶部的 navbar -->
      <div class="fixed-header">
        <navbar />
        <!-- tags -->
        <tags-view></tags-view>
      </div>
      <!-- 内容区 -->
      <app-main />
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'
import TagsView from '@/components/TagsView'
// 因为 vue-cli 大于版本5，默认没有开启 css-module，所以 scss 文件必须命名 xxx.module.scss 以达到效果
// import variables from '@/styles/variables.module.scss'
</script>
<style scoped lang="scss">
@import '~@/styles/mixin.module.scss';
@import '~@/styles/variables.module.scss';

.app-wrapper {
  // 使用 @mixin 混入通用样式， @include 导入通用样式
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  // 动态计算宽度 => 总的宽度减去 sideBar 的宽度
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}
.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
