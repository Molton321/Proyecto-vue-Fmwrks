<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import ProfilesService from '@/service/crudServices/ProfileService';
import type { Profile } from '@/models/Profile';

const router = useRouter();
const Profiles = ref<Profile[]>([]);
const isLoading = ref(true);

const fetchProfiles = async () => {
  try {
    const response = await ProfilesService.getAllProfiles();
    Profiles.value = Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error('Error fetching Profiles:', error);
  } finally {
    isLoading.value = false;
  }
};

const defaultProfile: Profile = {
  id: undefined,
   phone: '',
   photo: '',
    user_id: undefined,
};


const goToCreate = () => {
  router.push('/profile/create');
};

const goToEdit = (id: number) => {
  router.push(`/profile/update/${id}`);
};

const labelMap = (key: string) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());


// Detectar columnas automáticamente
const visibleColumns = Object.keys(defaultProfile).filter(
  key => key !== 'id' // opcional: omitir campos como 'id'
);

onMounted(fetchProfiles);
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">Profiles</h1>
      <button @click="goToCreate" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Create Profile
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
      v-for="Profile in Profiles"
      :key="Profile.id"
      class="border-b hover:bg-gray-50 dark:hover:bg-[#3a3a3a]"
    >
      <td v-for="key in visibleColumns" :key="key" class="px-4 py-2">
        {{ Profile[key] }}
      </td>
      <td class="px-4 py-2 space-x-2">
        <button @click="goToEdit(Profile.id!)" class="text-blue-500 hover:underline">Edit</button>
      </td>
    </tr>
  </tbody>
</table>


  </div>
</template>
