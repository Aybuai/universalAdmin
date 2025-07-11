<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLabel">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :label="item.label"
            :key="index"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </el-card>

    <el-card>
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        >
          <template #default="{ row }" v-if="item.prop === 'publicDate'">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
          <template #default="{ row }" v-else-if="item.prop === 'action'">
            <el-button type="primary" size="small" @click="onShowClick(row)">{{
              $t('article.show')
            }}</el-button>
            <el-button type="danger" size="small" @click="onRemoveClick(row)">{{
              $t('article.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 50, 100, 200]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated, onMounted } from 'vue'
import { deleteArticle, getArticleList } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
import { dynamicData, selectDynamicLabel, tableColumns } from './dynamic'
import { tableRef, initSortable } from './sortable'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)

// 获取数据的方法
const getListData = async () => {
  const result = await getArticleList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
getListData()
// 监听语言切换
watchSwitchLang(getListData)
// 处理数据不重新加载的问题，由于 keepalive 缓存组件
onActivated(getListData)

// 表格拖拽相关
onMounted(() => {
  // 不传 tableData.value，不然会失去响应式数据
  initSortable(tableData, getListData)
})

/**
 * size 改变触发
 */
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  page.value = 1
  getListData()
}

/**
 * 页码改变触发
 */
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}

// 显示事件
const router = useRouter()
const onShowClick = (row) => {
  router.push(`/article/${row._id}`)
}
// 删除事件
const i18n = useI18n()
const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t('article.dialogTitle1') + row.title + i18n.t('article.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteArticle(row._id)
    ElMessage.success(i18n.t('article.removeSuccess'))
    // 重新渲染数据
    getListData()
  })
}
</script>

<style scoped lang="scss">
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  ::v-deep .el-table__row {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    ::v-deep .el-input__inner {
      box-shadow: 0 0 0 1px #dddfe5 !important;
      border-radius: 4px;
    }
  }
}

::v-deep .sortable-ghost {
  opacity: 0.6;
  color: #fff !important;
  background: #304156 !important;
}
</style>
