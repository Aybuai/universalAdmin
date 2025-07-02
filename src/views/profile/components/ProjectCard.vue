<template>
  <div>
    <pan-thumb
      :image="$store.getters.userInfo.avatar"
      width="100px"
      height="100px"
    >
      <div>Hello</div>
      {{ $store.getters.userInfo.title }}
    </pan-thumb>
  </div>
</template>

<script setup>
import PanThumb from '@/components/PanThumb'
</script>
<style scoped lang="scss"></style>
