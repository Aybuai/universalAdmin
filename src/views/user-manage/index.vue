<template>
  <div class="user-manage-container">
    <el-card class="header">
      <el-button
        type="primary"
        @click="onImportExcelClick"
        v-permission="['importUser']"
        >{{ $t('excel.importExcel') }}</el-button
      >
      <el-button type="success" @click="onExportExcelClick">{{
        $t('excel.exportExcel')
      }}</el-button>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <!-- 序号 -->
        <el-table-column :label="'#'" type="index"></el-table-column>
        <!-- 姓名 -->
        <el-table-column
          :label="$t('excel.name')"
          prop="username"
        ></el-table-column>
        <!-- 联系方式 -->
        <el-table-column
          :label="$t('excel.mobile')"
          prop="mobile"
        ></el-table-column>
        <!-- 头像 -->
        <el-table-column :label="$t('excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <!-- 角色 -->
        <el-table-column :label="$t('excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="small">{{
                item.title
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="small">{{ $t('excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 时间 -->
        <el-table-column :label="$t('excel.openTime')" prop="openTime">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column :label="$t('excel.action')" fixed="right" width="250">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="onShowClick(row._id)"
              >{{ $t('excel.show') }}</el-button
            >
            <el-button
              type="info"
              size="small"
              @click="onShowRoleClick(row)"
              v-permission="['distributeRole']"
              >{{ $t('excel.showRole') }}</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="onRemoveClick(row)"
              v-permission="['removeUser']"
              >{{ $t('excel.remove') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        :current-page="page"
        :page-size="size"
        :page-sizes="[5, 10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 导出文件 -->
    <export-to-excel v-model="exportToExcelVisible"></export-to-excel>
    <!-- 查看角色 -->
    <roles-dialog
      v-model="roleDialogVisible"
      :userId="selectUserId"
      @updateRoleSuccess="getDataList"
    ></roles-dialog>
  </div>
</template>

<script setup>
import { deleteUser, getUserManageList } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onActivated, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ExportToExcel from './components/Export2Excel.vue'
import RolesDialog from './components/RolesDialog.vue'

// 相关数据
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(5)

// 获取列表
const getDataList = async () => {
  const res = await getUserManageList({
    page: page.value,
    size: size.value
  })
  const { list = [] } = res
  tableData.value = list
  total.value = res.total
}
getDataList()
// 切换中英文重新获取接口
watchSwitchLang(getDataList)

// 处理导入用户后数据不重新加载的问题
onActivated(getDataList)

// 分页事件
const onSizeChange = (curSize) => {
  size.value = curSize
  page.value = 1
  getDataList()
}

const onCurrentChange = (curPage) => {
  page.value = curPage
  getDataList()
}

// 用户详情
const router = useRouter()
const onShowClick = (id) => {
  router.push(`/user/info/${id}`)
}

// 查看角色
const roleDialogVisible = ref(false)
const selectUserId = ref('')
const onShowRoleClick = (row) => {
  selectUserId.value = row._id
  roleDialogVisible.value = true
}

// 保证每次打开重新获取用户角色数据
watch(roleDialogVisible, (val) => {
  if (!val) selectUserId.value = ''
})

// 删除指定用户
const i18n = useI18n()
const onRemoveClick = ({ username, _id }) => {
  ElMessageBox.confirm(
    `${i18n.t('excel.dialogTitle1')} ${username} ${i18n.t(
      'excel.dialogTitle2'
    )}`,
    { type: 'warning' }
  ).then(async () => {
    await deleteUser(_id)
    ElMessage.success(i18n.t('excel.removeSuccess'))
    getDataList()
  })
}

// 文件导入
const onImportExcelClick = () => {
  router.push('/user/import')
}
// 文件导出
const exportToExcelVisible = ref(false)
const onExportExcelClick = () => {
  exportToExcelVisible.value = true
}
</script>
<style scoped lang="scss">
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
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
</style>
