<template>
  <!-- 主题图标 -->
  <!-- v-bind="$attrs" 代表的意思是 调用该子组件的父组件中可以写入一些属性值，然后会直接作用到该子组件中，例如样式等 -->
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
  >
    <div>
      <el-tooltip :content="$t('navBar.themeChange')">
        <div>
          <svg-icon icon="change-theme"></svg-icon>
        </div>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 弹出展示层 -->
  <div>
    <select-color v-model:dialogVisible="selectColorVisible" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SelectColor from './components/SelectColor.vue'

const selectColorVisible = ref(false)

const handleSetTheme = (command) => {
  selectColorVisible.value = true
}
</script>
<style scoped lang="scss"></style>
