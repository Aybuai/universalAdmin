<template>
  <div class="editor-container">
    <div id="editor-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import E from 'wangeditor'
import { onMounted, defineProps, defineEmits, watch } from 'vue'
import i18next from 'i18next'
import { useStore } from 'vuex'
import { watchSwitchLang } from '@/utils/i18n'
import { commitArticle, editArticle } from './commit'

const props = defineProps({
  title: {
    required: true,
    type: String
  },
  detail: {
    type: Object
  }
})

const emits = defineEmits(['onSuccess'])

const store = useStore()

// Editor实例
let editor
// 处理离开页面切换语言导致 dom 无法被获取
let el
onMounted(() => {
  el = document.querySelector('#editor-box')
  initEditor()
})

const initEditor = () => {
  editor = new E(el)
  editor.config.zIndex = 1
  // 菜单栏提示
  editor.config.showMenuTooltips = true
  editor.config.menuTooltipPosition = 'down'

  // 国际化相关处理
  editor.config.lang = store.getters.language === 'zh' ? 'zh-CN' : 'en'
  editor.i18next = i18next

  editor.create()
}

// 在语言改变时，重置 editor
watchSwitchLang(() => {
  if (!el) return
  const htmlStr = editor.txt.html()
  editor.destroy()
  initEditor()
  editor.txt.html(htmlStr)
})

// 提交逻辑
const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    // 编辑文章
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: editor.txt.html()
    })
  } else {
    // 创建文章
    await commitArticle({
      title: props.title,
      content: editor.txt.html()
    })
  }

  editor.txt.html('')
  emits('onSuccess')
}

// 编辑相关
watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      editor.txt.html(val.content)
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
