<template>
  <div>
    <el-tooltip :content="$t('navBar.guide')">
      <svg-icon id="guide-start" icon="guide" @click="onClick" />
    </el-tooltip>
  </div>
</template>

<script setup>
import { watchSwitchLang } from '@/utils/i18n'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import steps from './steps'

let driver = null
const i18n = useI18n()
let driverMounted
onMounted(() => {
  driverMounted = () => {
    driver = new Driver({
      // 禁止点击蒙版关闭
      allowClose: false,
      closeBtnText: i18n.t('guide.close'),
      nextBtnText: i18n.t('guide.next'),
      prevBtnText: i18n.t('guide.prev')
    })
  }
  driverMounted()
})

// driver 按钮中英文转换
watchSwitchLang(() => {
  driverMounted()
})

const onClick = () => {
  driver.defineSteps(steps(i18n))
  driver.start()
}
</script>
<style scoped lang="scss"></style>
