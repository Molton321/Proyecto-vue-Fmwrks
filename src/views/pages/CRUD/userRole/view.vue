<script setup lang="ts">
import { ref, onMounted } from 'vue';
import UserRoleService from '@/service/crudServices/UserRoleService';
import UserService from '@/service/crudServices/UserService';
import RoleService from '@/service/crudServices/RoleService';
import { useRoute, useRouter } from 'vue-router';
import type { User } from '@/models/User';

const route = useRoute();
const router = useRouter();
const users = ref<User[]>([]);
const isLoading = ref(true);
const rawRole = ref({ name: '', description: '' });

const fetchUsers = async () => {
  isLoading.value = true;
  users.value = [];
  try {
    // 1. Trae los userRoles
    const response = await UserRoleService.getUsersByRoleId(Number(route.params.id));
    const userRoles = response.data;
    const roleId = Number(route.params.id);
    const role = await RoleService.getRole(Number(route.params.id));
    rawRole.value = {
        name: role.data.name ?? '',
        description: role.data.description ?? ''
    };

    // 2. Por cada userRole, busca el usuario y agrégalo al arreglo
    const userPromises = userRoles.map(async (userRole: any) => {
      if (userRole.user_id) {
        const userResp = await UserService.getUser(userRole.user_id);
        return userResp.data;
      }
      return null;
    });

    const userList = await Promise.all(userPromises);
    users.value = userList.filter(Boolean); // Elimina nulos
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    isLoading.value = false;
  }
};

const removeUser = async (userId: number) => {
  try {
    // 1. Trae los userRoles del rol actual
    const response = await UserRoleService.getUsersByRoleId(Number(route.params.id));
    const userRoles = response.data;
    // 2. Busca el userRole que tenga el userId y el roleId
    const userRole = userRoles.find((ur: any) => ur.user_id === userId && ur.role_id === Number(route.params.id));
    if (!userRole) {
      alert('UserRole not found');
      return;
    }
    // 3. Borra usando el id del userRole
    await UserRoleService.deleteUserRole(String(userRole.id));
    await fetchUsers();
  } catch (error) {
    alert('Error removing user from role');
  }
};

const goToAddUser = () => {
  router.push(`/user-role/create/${route.params.id}`);
};

onMounted(fetchUsers);
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">Users in {{ rawRole.name ?? '' }}</h1>
      <button @click="goToAddUser" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Add User
      </button>
    </div>
    <table class="min-w-full bg-white dark:bg-boxdark shadow rounded">
      <thead>
        <tr class="text-left bg-gray-100 dark:bg-[#2c2c2c]">
          <th class="px-4 py-2">ID</th>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="border-b hover:bg-gray-50 dark:hover:bg-[#3a3a3a]">
          <td class="px-4 py-2">{{ user.id }}</td>
          <td class="px-4 py-2">{{ user.name }}</td>
          <td class="px-4 py-2">{{ user.email }}</td>
          <td class="px-4 py-2">
            <button
              @click="removeUser(user.id!)"
              class="text-red-500 hover:underline"
            >
              Remove
            </button>
          </td>
        </tr>
        <tr v-if="!isLoading && users.length === 0">
          <td colspan="4" class="text-center py-4 text-gray-500">No users found for this role.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>