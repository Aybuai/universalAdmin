<template>
  <el-dialog
    :title="$t('excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      :data="allPermission"
      show-checkbox
      check-strictly
      node-key="id"
      default-expand-all
      :props="defaultProps"
    />

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { permissionList } from '@/api/permission'
import { distributePermission, rolePermission } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage } from 'element-plus'
import { defineProps, defineEmits, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

// 所有权限
const allPermission = ref([])
const getPermissionList = async () => {
  allPermission.value = await permissionList()
}
getPermissionList()
watchSwitchLang(getPermissionList)
// 属性结构配置
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

// tree 节点
const treeRef = ref(null)
// 获取当前用户角色的权限
const getRolePermission = async () => {
  const checkedKeys = await rolePermission(props.roleId)
  treeRef.value.setCheckedKeys(checkedKeys)
}
watch(
  () => props.roleId,
  (val) => {
    if (val) getRolePermission()
  }
)

/**
  确定按钮点击事件
 */
const i18n = useI18n()
const onConfirm = async () => {
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success(i18n.t('role.updateRoleSuccess'))
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  treeRef.value.setCheckedKeys([])
  emits('update:modelValue', false)
}
</script>
