<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon id="guide-hamburger" class="hamburger" :icon="icon"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const toggleClick = () => {
  store.commit('app/triggerSidebarOpened')
}

const icon = computed(() => {
  return store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
})
</script>
<style scoped lang="scss">
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    line-height: 20px;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
