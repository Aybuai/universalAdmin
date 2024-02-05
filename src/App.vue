<template>
  <router-view />
</template>

<script setup>
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { useStore } from 'vuex'

const store = useStore()
// 防止在刷新页面后，新主题会失效
generateNewStyle(store.getters.mainColor).then((newStyleText) => {
  writeNewStyle(newStyleText)
})
</script>

<style></style>
