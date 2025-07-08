<template>
  <upload-excel :onSuccess="onSuccess"></upload-excel>
</template>

<script setup>
import { userBatchImport } from '@/api/user-manage'
import UploadExcel from '@/components/UploadExcel'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { formatDate } from './utils'
import { USER_RELATIONS } from '@/constant'

const i18n = useI18n()
const router = useRouter()
const onSuccess = async ({ header, results }) => {
  const updateData = generateData(results)
  await userBatchImport(updateData)
  ElMessage.success(`${results.length}${i18n.t('excel.importSuccess')}`)
  router.push('/user/manage')
}

/**
 * 筛选数据
 */
const generateData = (results) => {
  const arr = []
  results.forEach((item) => {
    const userInfo = {}
    Object.keys(item).forEach((key) => {
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
        return
      }
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}
</script>
<style scoped lang="scss"></style>
