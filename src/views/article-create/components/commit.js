import { articleEdit, createArticle } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
const t = i18n.global.t

export const commitArticle = async (data) => {
  const res = await createArticle(data)
  ElMessage.success(t('article.createSuccess'))
  return res
}

export const editArticle = async (data) => {
  const res = await articleEdit(data)
  ElMessage.success(t('article.editorSuccess'))
  return res
}
