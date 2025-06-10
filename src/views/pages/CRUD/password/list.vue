<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import PasswordsService from '@/service/crudServices/PasswordService';
import type { Password } from '@/models/Password';
import { DateTime } from 'luxon';

const router = useRouter();
const Passwords = ref<Password[]>([]);
const isLoading = ref(true);

const fetchPasswords = async () => {
  try {
    const response = await PasswordsService.getAllPasswords();
    Passwords.value = Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error('Error fetching Passwords:', error);
  } finally {
    isLoading.value = false;
  }
};

const defaultPassword: Password = {
  id: undefined,
   user_id: undefined,
   content: '',
};


const goToCreate = () => {
  router.push('/Password/create');
};

const goToEdit = (id: number) => {
  router.push(`/Password/update/${id}`);
};

const labelMap = (key: string) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());


// Detectar columnas automáticamente
const visibleColumns = Object.keys(defaultPassword).filter(
  key => key !== 'id' // opcional: omitir campos como 'id'
);

onMounted(fetchPasswords);
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">Passwords</h1>
      <button @click="goToCreate" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Create Password
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
      v-for="Password in Passwords"
      :key="Password.id"
      class="border-b hover:bg-gray-50 dark:hover:bg-[#3a3a3a]"
    >
      <td v-for="key in visibleColumns" :key="key" class="px-4 py-2">
        {{ Password[key] }}
      </td>
      <td class="px-4 py-2 space-x-2">
        <button @click="goToEdit(Password.id!)" class="text-blue-500 hover:underline">Edit</button>
      </td>
    </tr>
  </tbody>
</table>


  </div>
</template>
