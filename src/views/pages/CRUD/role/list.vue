<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import RolesService from '@/service/crudServices/RoleService';
import type { Role } from '@/models/Role';

const router = useRouter();
const Roles = ref<Role[]>([]);
const isLoading = ref(true);

const fetchRoles = async () => {
  try {
    const response = await RolesService.getAllRoles();
    Roles.value = Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error('Error fetching Roles:', error);
  } finally {
    isLoading.value = false;
  }
};

const defaultRole: Role = {
  id: undefined,
   name: '',
   description: '',
};


const goToCreate = () => {
  router.push('/role/create');
};

const goTo = (id: number, where: string) => {
  console.log(`/role/${where}/${id}`);
  router.push(`/role/${where}/${id}`);
};

const goToView = (id: number) => {
  router.push(`/user-role/view/${id}`);
};

const deleteRole = async (id: number) => {
  try {
    await RolesService.deleteRole(id);
    // Refresh the list after deletion
    await fetchRoles();
  } catch (error) {
    console.error('Error deleting User:', error);
  }
};

const labelMap = (key: string) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());


// Detectar columnas automáticamente
const visibleColumns = Object.keys(defaultRole).filter(
  key => key !== 'id' // opcional: omitir campos como 'id'
);

onMounted(fetchRoles);
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">Roles</h1>
      <button @click="goToCreate" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Create Role
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
      v-for="Role in Roles"
      :key="Role.id"
      class="border-b hover:bg-gray-50 dark:hover:bg-[#3a3a3a]"
    >
      <td v-for="key in visibleColumns" :key="key" class="px-4 py-2">
        {{ Role[key] }}
      </td>
      <td class="px-4 py-2 space-x-2">
        <button @click="goToView(Role.id!)" class="text-green-500 hover:underline">View</button>
        <button @click="goTo(Role.id!, 'update')" class="text-blue-500 hover:underline">Update</button>
        <button @click="deleteRole(Role.id!)" class="text-red-500 hover:underline">Delete</button>
      </td>
    </tr>
  </tbody>
</table>


  </div>
</template>
