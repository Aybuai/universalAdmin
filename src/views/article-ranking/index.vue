<template>
  <div class="article-ranking-container">
    <el-card>
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column
          :label="$t('article.ranking')"
          prop="ranking"
        ></el-table-column>
        <el-table-column
          :label="$t('article.title')"
          prop="title"
        ></el-table-column>
        <el-table-column
          :label="$t('article.author')"
          prop="author"
        ></el-table-column>
        <el-table-column :label="$t('article.publicDate')">
          <template #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('article.desc')"
          prop="desc"
        ></el-table-column>
        <el-table-column :label="$t('article.action')" #default="{ row }">
          <el-button type="primary" size="mini" @click="onShowClick(row)">{{
            $t('article.show')
          }}</el-button>
          <el-button type="danger" size="mini" @click="onRemoveClick(row)">{{
            $t('article.remove')
          }}</el-button>
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
import { ref, onActivated } from 'vue'
import { getArticleList } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'

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
const onShowClick = (row) => {
  console.log(row, 'show')
}
// 删除事件
const onRemoveClick = (row) => {
  console.log(row, 'delete')
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
    text-align: right;
  }
}
</style>
