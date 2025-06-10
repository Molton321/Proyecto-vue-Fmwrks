<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import DevicesService from '@/service/crudServices/DeviceService';
import type { Device } from '@/models/Device';

const router = useRouter();
const Devices = ref<Device[]>([]);
const isLoading = ref(true);

const fetchDevices = async () => {
  try {
    const response = await DevicesService.getAllDevices();
    Devices.value = Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error('Error fetching Devices:', error);
  } finally {
    isLoading.value = false;
  }
};

const defaultDevice: Device = {
  id: undefined,
    name: '',
    ip: '',
    operating_system: '',
};


const goToCreate = () => {
  router.push('/Device/create');
};

const goToEdit = (id: number) => {
  router.push(`/Device/update/${id}`);
};

const labelMap = (key: string) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());


// Detectar columnas automáticamente
const visibleColumns = Object.keys(defaultDevice).filter(
  key => key !== 'id' // opcional: omitir campos como 'id'
);

onMounted(fetchDevices);
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">Devices</h1>
      <button @click="goToCreate" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Create Device
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
      v-for="Device in Devices"
      :key="Device.id"
      class="border-b hover:bg-gray-50 dark:hover:bg-[#3a3a3a]"
    >
      <td v-for="key in visibleColumns" :key="key" class="px-4 py-2">
        {{ Device[key] }}
      </td>
      <td class="px-4 py-2 space-x-2">
        <button @click="goToEdit(Device.id!)" class="text-blue-500 hover:underline">Edit</button>
      </td>
    </tr>
  </tbody>
</table>


  </div>
</template>
