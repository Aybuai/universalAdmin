<template>
  <el-dropdown
    class="international"
    trigger="click"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip :effect="effect" content="国际化" placement="bottom">
        <div>
          <svg-icon icon="language"></svg-icon>
        </div>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"
          >中文</el-dropdown-item
        >
        <el-dropdown-item :disabled="language === 'en'" command="en"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

// 切换语言 navbar 和 登录页 都需要调用，且背景色不同
defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value) {
      // 这个值必须匹配下列字符串中的一个
      return ['dark', 'light'].includes(value)
    }
  }
})

const store = useStore()
const language = computed(() => store.getters.language)

// 切换语言的方法
const i18n = useI18n()
const handleSetLanguage = (lang) => {
  // i18n 中 变量要切换
  i18n.locale.value = lang
  store.commit('app/setLanguage', lang)
  ElMessage.success(i18n.t('toast.switchLangSuccess'))
}
</script>
<style scoped lang="scss"></style>
