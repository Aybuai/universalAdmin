<template>
  <div class="markdown-container">
    <!-- 渲染区 -->
    <div id="markdown-box"></div>
    <!-- 提交按钮 -->
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import MkEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { onMounted, defineProps, defineEmits, watch } from 'vue'
import { useStore } from 'vuex'
import { watchSwitchLang } from '@/utils/i18n'
import { commitArticle, editArticle } from './commit'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: Object
  }
})
const emits = defineEmits(['onSuccess'])

// Editor 实例
let mkEditor
// 处理离开页面切换语言导致 dom 无法被获取
let el
onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
})

const store = useStore()
const initEditor = () => {
  mkEditor = new MkEditor({
    // 元素
    el,
    // 高度
    height: '500px',
    // 展示样式
    previewStyle: 'vertical',
    // 国际话
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })

  mkEditor.getMarkdown()
}

// 在语言改变时，重置 editor
watchSwitchLang(() => {
  if (!el) return
  const htmlStr = mkEditor.getHTML()
  mkEditor.destroy()
  initEditor()
  mkEditor.setHTML(htmlStr)
})

// 提交
const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    // 编辑文章
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: mkEditor.getHTML()
    })
  } else {
    // 创建文章
    await commitArticle({
      title: props.title,
      content: mkEditor.getHTML()
    })
  }

  // 清空 markdown
  mkEditor.reset()
  // 重置标题
  emits('onSuccess')
}

// 编辑相关
watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      mkEditor.setHTML(val.content)
    }
  },
  {
    immediate: true
  }
)
</script>
<style scoped lang="scss">
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
