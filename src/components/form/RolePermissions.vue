<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import RolePermissionService from '@/service/crudServices/RolePermissionService'
import PermissionService from '@/service/crudServices/PermissionService'
import type { Permission } from '@/models/Permission'
import type { rolePermission } from '@/models/rolePermission'

const route = useRoute()
const roleId = Number(route.params.id)

const allPermissions = ref<Permission[]>([])
const rolePermissions = ref<Record<number, number>>({}) // permissionId -> rolePermission.id

const methods = ['GET', 'POST', 'PUT', 'DELETE']

onMounted(async () => {
  const permRes = await PermissionService.getAllPermissions()
  allPermissions.value = permRes.data

  const rolePermRes = await RolePermissionService.getAllRolePermissions()
  rolePermRes.data.forEach((rp: rolePermission) => {
    if (rp.role_id === roleId && rp.permission_id && rp.id) {
      rolePermissions.value[rp.permission_id] = rp.id
    }
  })
})

const groupedPermissions = computed(() => {
  const map = new Map<string, Record<string, Permission>>()

  for (const perm of allPermissions.value) {
    if (!methods.includes(perm.method)) continue
    const key = perm.url
    if (!map.has(key)) map.set(key, {})
    map.get(key)![perm.method] = perm
  }

  return Array.from(map.entries())
})

const togglePermission = async (permissionId: number, checked: boolean) => {
  if (checked) {
    const res = await RolePermissionService.createRolePermission(roleId, permissionId )
    rolePermissions.value[permissionId] = res.data.id!
  } else {
    const rpId = rolePermissions.value[permissionId]
    if (rpId) {
      await RolePermissionService.deleteRolePermissionById(String(rpId))
      delete rolePermissions.value[permissionId]
    }
  }
}
</script>

<template>
  <div class="p-6 bg-white shadow rounded">
    <h2 class="text-2xl font-bold mb-4">Administrador - Permisos (Rol ID: {{ roleId }})</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse border">
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2">Recurso</th>
            <th
              v-for="method in methods"
              :key="method"
              class="border px-4 py-2 text-center"
            >
              {{ method }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="[url, permMap] in groupedPermissions"
            :key="url"
            class="odd:bg-gray-50"
          >
            <td class="border px-4 py-2 font-mono">{{ url }}</td>
            <td
              v-for="method in methods"
              :key="`${url}_${method}`"
              class="border px-4 py-2 text-center"
            >
              <input
                type="checkbox"
                :disabled="!permMap[method]"
                :checked="permMap[method] ? !!rolePermissions[permMap[method].id!] : false"
                @change="
                  permMap[method]
                    ? togglePermission(
                        permMap[method].id!,
                        ($event.target as HTMLInputElement).checked
                      )
                    : null
                "
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
