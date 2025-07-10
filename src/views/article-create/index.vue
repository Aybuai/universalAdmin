<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        :placeholder="$t('article.titlePlaceholder')"
        v-model="title"
        maxlength="20"
        clearable
      >
      </el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('article.markdown')" name="markdown">
          <markdown :title="title" :detail="detail" @on-success="onSuccess" />
        </el-tab-pane>
        <el-tab-pane :label="$t('article.richText')" name="editor">
          <editor :title="title" :detail="detail" @on-success="onSuccess" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { articleDetail } from '@/api/article'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Editor from './components/EditorText.vue'
import Markdown from './components/MarkdownText.vue'

const title = ref('')
const activeName = ref('markdown')

const onSuccess = () => {
  title.value = ''
}

// 处理编辑相关
const route = useRoute()
const articleId = route.params.id
const detail = ref({})
const getArticleDetail = async () => {
  detail.value = await articleDetail(articleId)
  // 标题赋值
  title.value = detail.value.title
}
if (articleId) {
  getArticleDetail()
}
</script>
<style scoped lang="scss">
.title-input {
  margin-bottom: 20px;
  box-shadow: 0 0 0 1px #dddfe5;
  border-radius: 4px;
  padding: 5px;
}
</style>
