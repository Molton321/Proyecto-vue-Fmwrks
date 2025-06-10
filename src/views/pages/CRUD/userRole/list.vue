<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import UserRolesService from '@/service/crudServices/UserRoleService';
import type { UserRole } from '@/models/userRole';

const router = useRouter();
const UserRoles = ref<UserRole[]>([]);
const isLoading = ref(true);

const fetchUserRoles = async () => {
  try {
    const response = await UserRolesService.getAllUserRoles();
    UserRoles.value = Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error('Error fetching UserRoles:', error);
  } finally {
    isLoading.value = false;
  }
};

const defaultUserRole: UserRole = {
  id: undefined,
    user_id: undefined,
    role_id: undefined,
    
};


const goToCreate = () => {
  router.push('/user-role/create');
};

const goToEdit = (id: number) => {
  router.push(`/user-role/update/${id}`);
};

const labelMap = (key: string) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());


// Detectar columnas automáticamente
const visibleColumns = Object.keys(defaultUserRole).filter(
  key => key !== 'id' // opcional: omitir campos como 'id'
);

onMounted(fetchUserRoles);
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">User Roles</h1>
      <button @click="goToCreate" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Create User Role
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
      v-for="UserRole in UserRoles"
      :key="UserRole.id"
      class="border-b hover:bg-gray-50 dark:hover:bg-[#3a3a3a]"
    >
      <td v-for="key in visibleColumns" :key="key" class="px-4 py-2">
        {{ UserRole[key] }}
      </td>
      <td class="px-4 py-2 space-x-2">
        <button @click="goToEdit(UserRole.id!)" class="text-blue-500 hover:underline">Edit</button>
      </td>
    </tr>
  </tbody>
</table>


  </div>
</template>
