<template>
  <div @click="onToggle">
    <el-tooltip :content="$t('navBar.screenfull')">
      <div>
        <svg-icon
          :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
        ></svg-icon>
      </div>
    </el-tooltip>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

// 是否全屏
const isFullscreen = ref(false)

// 切换事件
const onToggle = () => {
  screenfull.toggle()
}

// 监听 screenfull 变化
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

// on => 绑定监听
onMounted(() => {
  screenfull.on('change', change)
})

// off => 取消监听
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>
<style scoped></style>
