<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SessionService from '@/service/crudServices/SessionService';

const route = useRoute();
const router = useRouter();
const userId = Number(route.params.id);
const sessions = ref<any[]>([]);
const isLoading = ref(true);

const goToCreate = () => {
  router.push(`/user/${userId}/sessions/create`);
};

const goToUpdate = (id: number) => {
  router.push(`/user/${userId}/session/update/${id}`);
};

const deleteSession = async (id: string) => {
  try {
    await SessionService.deleteSession(id);
    await fetchSessions();
  } catch (error) {
    console.error('Error deleting session:', error);
  }
};

const fetchSessions = async () => {
  try {
    const response = await SessionService.getSessionsByUserId(userId);
    sessions.value = Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error('Error fetching sessions:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchSessions);
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">Sessions from user #{{ userId }}</h1>
      <button @click="goToCreate" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Add Session
      </button>
    </div>
    <table class="min-w-full bg-white shadow rounded">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-4 py-2">ID</th>
          <th class="px-4 py-2">Token</th>
          <th class="px-4 py-2">Expiration</th>
          <th class="px-4 py-2">FACode</th>
          <th class="px-4 py-2">State</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="session in sessions" :key="session.id">
          <td class="px-4 py-2">{{ session.id }}</td>
          <td class="px-4 py-2">{{ session.token }}</td>
          <td class="px-4 py-2">{{ session.expiration }}</td>
          <td class="px-4 py-2">{{ session.FACode }}</td>
          <td class="px-4 py-2">{{ session.state }}</td>
          <td class="px-4 py-2 space-x-2">
            <button @click="goToUpdate(session.id)" class="text-blue-500 hover:underline">Update</button>
            <button @click="deleteSession(session.id)" class="text-red-500 hover:underline">Delete</button>
          </td>
        </tr>
        <tr v-if="!isLoading && sessions.length === 0">
          <td colspan="5" class="text-center py-4 text-gray-500">No sessions found for this user.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>