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
        <el-table-column :label="$t('role.action')" prop="action" width="260">
          <el-button type="primary" size="mini">
            {{ $t('role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { ref } from 'vue'

const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
}
getRoleList()
watchSwitchLang(getRoleList)
</script>
<style scoped lang="scss"></style>
