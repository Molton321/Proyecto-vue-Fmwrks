<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import AddressService from '@/service/crudServices/AddressService';
import type { Address } from '@/models/Address';

const router = useRouter();
const Address = ref<Address[]>([]);
const isLoading = ref(true);

const fetchAddress = async () => {
  try {
    const response = await AddressService.getAllAddress();
    Address.value = Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error('Error fetching Addresss:', error);
  } finally {
    isLoading.value = false;
  }
};

const defaultAddress: Address = {
  id: undefined,
    street: '',
    number: '',
    latitude: undefined,
    longitude: undefined,
    user_id: undefined,
};


const goToCreate = () => {
  router.push('/Address/create');
};

const goToEdit = (id: number) => {
  router.push(`/Address/update/${id}`);
};

const labelMap = (key: string) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());


// Detectar columnas automáticamente
const visibleColumns = Object.keys(defaultAddress).filter(
  key => key !== 'id' // opcional: omitir campos como 'id'
);

onMounted(fetchAddress);
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">Address</h1>
      <button @click="goToCreate" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Create Address
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
      v-for="Address in Address"
      :key="Address.id"
      class="border-b hover:bg-gray-50 dark:hover:bg-[#3a3a3a]"
    >
      <td v-for="key in visibleColumns" :key="key" class="px-4 py-2">
        {{ Address[key] }}
      </td>
      <td class="px-4 py-2 space-x-2">
        <button @click="goToEdit(Address.id!)" class="text-blue-500 hover:underline">Edit</button>
      </td>
    </tr>
  </tbody>
</table>


  </div>
</template>
