<template>
  <div>
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column :label="$t('role.index')" type="index" width="120">
        </el-table-column>
        <el-table-column :label="$t('role.name')" prop="title">
        </el-table-column>
        <el-table-column :label="$t('role.desc')" prop="describe">
        </el-table-column>
        <el-table-column
          :label="$t('role.action')"
          prop="action"
          width="260"
          #default="{ row }"
        >
          <el-button
            type="primary"
            size="mini"
            @click="onDistributePermissionClick(row)"
            v-permission="['distributePermission']"
          >
            {{ $t('role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限 -->
    <distribute-permission
      v-model="distributePermissionVisible"
      :roleId="selectRoleId"
    />
  </div>
</template>

<script setup>
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { ref, watch } from 'vue'
import DistributePermission from './components/DistributePermission.vue'

const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
}
getRoleList()
watchSwitchLang(getRoleList)

/**
 * 分配权限
 */
const selectRoleId = ref('')
const distributePermissionVisible = ref(false)
const onDistributePermissionClick = (row) => {
  selectRoleId.value = row.id
  distributePermissionVisible.value = true
}

// 保证每次打开重新获取角色权限数据
watch(distributePermissionVisible, (val) => {
  if (!val) selectRoleId.value = ''
})
</script>
<style scoped lang="scss"></style>
