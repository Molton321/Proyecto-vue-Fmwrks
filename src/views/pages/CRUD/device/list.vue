<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import DeviceService from '@/service/crudServices/DeviceService';

const router = useRouter();
const route = useRoute();
const userId = Number(route.params.id);
const devices = ref<any[]>([]);
const isLoading = ref(true);

const fetchDevices = async () => {
  try {
    const response = await DeviceService.getDevicesByUserId(userId);
    devices.value = Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error('Error fetching devices:', error);
  } finally {
    isLoading.value = false;
  }
};

const goToCreate = () => {
  router.push(`/user/${userId}/devices/create`);
};

const goToUpdate = (id: number) => {
  router.push(`/user/${userId}/devices/update/${id}`);
};

const deleteDevice = async (id: number) => {
  try {
    await DeviceService.deleteDevice(id);
    await fetchDevices();
  } catch (error) {
    console.error('Error deleting device:', error);
  }
};

onMounted(fetchDevices);
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">Devices from user #{{ userId }}</h1>
      <button @click="goToCreate" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Add Device
      </button>
    </div>
    <table class="min-w-full bg-white shadow rounded">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-4 py-2">ID</th>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">IP</th>
          <th class="px-4 py-2">Operating System</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="device in devices" :key="device.id">
          <td class="px-4 py-2">{{ device.id }}</td>
          <td class="px-4 py-2">{{ device.name }}</td>
          <td class="px-4 py-2">{{ device.ip }}</td>
          <td class="px-4 py-2">{{ device.operating_system }}</td>
          <td class="px-4 py-2 space-x-2">
            <button @click="goToUpdate(device.id)" class="text-blue-500 hover:underline">Update</button>
            <button @click="deleteDevice(device.id)" class="text-red-500 hover:underline">Delete</button>
          </td>
        </tr>
        <tr v-if="!isLoading && devices.length === 0">
          <td colspan="5" class="text-center py-4 text-gray-500">No devices found for this user.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>