<template>
  <router-view />
</template>

<script setup>
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { useStore } from 'vuex'
import { watchSwitchLang } from './utils/i18n'

const store = useStore()
// 防止在刷新页面后，新主题会失效
generateNewStyle(store.getters.mainColor).then((newStyleText) => {
  writeNewStyle(newStyleText)
})

// 切换中英文，重新请求用户信息
watchSwitchLang(() => {
  if (store.getters.token) {
    store.dispatch('user/getUserInfo')
  }
})
</script>

<style></style>
