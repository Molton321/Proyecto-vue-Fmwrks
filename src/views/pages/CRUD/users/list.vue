<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import UsersService from '@/service/crudServices/UserService';
import type { User } from '@/models/User';

const router = useRouter();
const Users = ref<User[]>([]);
const isLoading = ref(true);

const fetchUsers = async () => {
  try {
    const response = await UsersService.getAllUsers();
    Users.value = Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error('Error fetching Users:', error);
  } finally {
    isLoading.value = false;
  }
};

const defaultUser: User = {
  id: undefined,
    name: '',
    email: '',
};

const goToCreate = () => {
  router.push('/user/create');
};

const goTo = (id: number, where: string) => {
  console.log(`/user/${where}/${id}`);
  router.push(`/user/${where}/${id}`);
};

const deleteUser = async (id: number) => {
  try {
    await UsersService.deleteUser(id);
    // Refresh the list after deletion
    await fetchUsers();
  } catch (error) {
    console.error('Error deleting User:', error);
  }
};

const labelMap = (key: string) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());


// Detectar columnas automáticamente
const visibleColumns = Object.keys(defaultUser).filter(
  key => key !== 'id' // opcional: omitir campos como 'id'
);

onMounted(fetchUsers);
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">Users</h1>
      <button @click="goToCreate" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Create User
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
      v-for="User in Users"
      :key="User.id"
      class="border-b hover:bg-gray-50 dark:hover:bg-[#3a3a3a]"
    >
      <td v-for="key in visibleColumns" :key="key" class="px-4 py-2">
        {{ User[key] }}
      </td>
      <td class="px-4 py-2 space-x-2">
        <button @click="goTo(User.id!, 'view')" class="text-green-500 hover:underline">View</button>
        <button @click="goTo(User.id!, 'update')" class="text-blue-500 hover:underline">Update</button>
        <button @click="goTo(User.id!, 'profile')" class="text-purple-500 hover:underline">Profile</button>
        <button @click="goTo(User.id!, 'address')" class="text-yellow-600 hover:underline">Address</button>
        <button @click="goTo(User.id!, 'signature')" class="text-pink-500 hover:underline">Digital Signature</button>
        <button @click="goTo(User.id!, 'devices')" class="text-indigo-500 hover:underline">Devices</button>
        <button @click="goTo(User.id!, 'passwords')" class="text-orange-500 hover:underline">Passwords</button>
        <button @click="goTo(User.id!, 'sessions')" class="text-teal-500 hover:underline">Sessions</button>
        <button @click="deleteUser(User.id!)" class="text-red-500 hover:underline">Delete</button>
      </td>
    </tr>
  </tbody>
</table>


  </div>
</template>
