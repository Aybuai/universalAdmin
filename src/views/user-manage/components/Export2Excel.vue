<template>
  <el-dialog
    :title="$t('excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('excel.placeholder')"
    ></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">{{
          $t('excel.confirm')
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { getUserManageAllList } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { defineProps, defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { USER_RELATIONS } from '@/constant'
import { dateFilter } from '@/filters'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

// 导出文件名
const i18n = useI18n()
const excelName = ref('')
let exportDefaultName = i18n.t('excel.defaultName')
const assignmentExcelName = () => {
  exportDefaultName = i18n.t('excel.defaultName')
  excelName.value = exportDefaultName
}
assignmentExcelName()
// 切换语言实时替换
watchSwitchLang(assignmentExcelName)

// 导出excel
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  // 数据
  const { list } = await getUserManageAllList()
  // 导入工具包
  const excel = await import('@/utils/export2Excel')
  const data = formatJson(USER_RELATIONS, list)
  excel.export_json_to_excel({
    // excel 表头
    header: Object.keys(USER_RELATIONS),
    // excel 数据（二维数组结构）
    data,
    // 文件名称
    filename: excelName.value || exportDefaultName,
    // 是否自动列宽
    autoWidth: true,
    // 文件类型
    bookType: 'xlsx'
  })

  loading.value = false
  closed()
}

// 该方法负责将数组转化成二维数组
const formatJson = (headers, rows) => {
  // 首先遍历数组
  // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      // 角色特殊处理
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map((role) => role.title))
      }
      // 时间特殊处理
      if (headers[key] === 'openTime') {
        return dateFilter(item[headers[key]])
      }
      return item[headers[key]]
    })
  })
}

// 关闭
const closed = () => {
  emits('update:modelValue', false)
}
</script>
<style scoped lang="scss"></style>
