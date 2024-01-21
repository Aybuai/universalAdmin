<template>
  <div class="app-wrapper">
    <!-- 左侧 menu -->
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <!-- 顶部的 navbar -->
      <div class="fixed-header">
        <navbar />
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
</script>
<style scoped lang="scss">
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

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
}
</style>
