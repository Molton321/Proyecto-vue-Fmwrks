<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import PermissionsService from '@/service/crudServices/PermissionService';
import type { Permission } from '@/models/Permission';
import { DateTime } from 'luxon';

const router = useRouter();
const Permissions = ref<Permission[]>([]);
const isLoading = ref(true);

const fetchPermissions = async () => {
  try {
    const response = await PermissionsService.getAllPermissions();
    Permissions.value = Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error('Error fetching Permissions:', error);
  } finally {
    isLoading.value = false;
  }
};

const defaultPermission: Permission = {
  id: undefined,
   url: '',
    method: '',
};


const goToCreate = () => {
  router.push('/permission/create');
};

const goTo = (id: number, where: string) => {
  console.log(`/permission/${where}/${id}`);
  router.push(`/permission/${where}/${id}`);
};

const deletePermission = async (id: number) => {
  try {
    await PermissionsService.deletePermission(id);
    // Refresh the list after deletion
    await fetchPermissions();
  } catch (error) {
    console.error('Error deleting User:', error);
  }
};

const labelMap = (key: string) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());


// Detectar columnas automáticamente
const visibleColumns = Object.keys(defaultPermission).filter(
  key => key !== 'id' // opcional: omitir campos como 'id'
);

onMounted(fetchPermissions);
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">Permissions</h1>
      <button @click="goToCreate" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Create Permission
      </button>
    </div>

    <table class="min-w-full bg-white dark:bg-boxdark shadow rounded">
  <thead>
    <tr class="text-left bg-gray-100 dark:bg-[#2c2c2c]">
      <th v-for="key in visibleColumns" :key="key" class="px-4 py-2">
        {{ labelMap(key) }}
      </th>
      <th class="px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr
      v-for="Permission in Permissions"
      :key="Permission.id"
      class="border-b hover:bg-gray-50 dark:hover:bg-[#3a3a3a]"
    >
      <td v-for="key in visibleColumns" :key="key" class="px-4 py-2">
        {{ Permission[key] }}
      </td>
      <td class="px-4 py-2 space-x-2">
        <button @click="goTo(Permission.id!, 'view')" class="text-green-500 hover:underline">View</button>
        <button @click="goTo(Permission.id!, 'update')" class="text-blue-500 hover:underline">Update</button>
        <button @click="goTo(Permission.id!, '')" class="text-red-500 hover:underline">Delete</button>
      </td>
    </tr>
  </tbody>
</table>


  </div>
</template>
