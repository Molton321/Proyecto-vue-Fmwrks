<script setup lang="ts">
import { ref, toRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RolePermissionForm from '@/components/form/RolePermissions.vue'
import RolePermissionService from '@/service/crudServices/RolePermissionService'

const route = useRoute()
const router = useRouter()

const roleId = Number(route.params.roleId)
const permissionId = Number(route.params.permissionId)

const initialValues = ref({
  startAt: '',
  endAt: ''
})

const handleSubmit = async (values: any) => {
  try {
    await RolePermissionService.createRolePermission(roleId, permissionId)
    router.push('/role-permissions') // o a donde necesites redirigir
  } catch (err) {
    alert('Failed to create role-permission.')
    console.error(err)
  }
}
</script>

<template>
  <RolePermissionForm
    :initial-values="toRaw(initialValues)"
    :role-id="roleId"
    :permission-id="permissionId"
    @submit="handleSubmit"
  />
</template>
