<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import DigitalSignaturesService from '@/service/crudServices/DigitalSignatureService';
import type { digitalSignature } from '@/models/digitalSignature';

const router = useRouter();
const DigitalSignatures = ref<digitalSignature[]>([]);
const isLoading = ref(true);

const fetchDigitalSignatures = async () => {
  try {
    const response = await DigitalSignaturesService.getAllDigitalSignatures();
    DigitalSignatures.value = Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error('Error fetching DigitalSignatures:', error);
  } finally {
    isLoading.value = false;
  }
};

const defaultDigitalSignature: digitalSignature = {
  id: undefined,
  user_id: undefined,
photo: '',


};


const goToCreate = () => {
  router.push('/digital-signature/create');
};

const goToEdit = (id: number) => {
  router.push(`/digital-signature/update/${id}`);
};

const labelMap = (key: string) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());


// Detectar columnas automáticamente
const visibleColumns = Object.keys(defaultDigitalSignature).filter(
  key => key !== 'id' // opcional: omitir campos como 'id'
);

onMounted(fetchDigitalSignatures);
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">Digital Signatures</h1>
      <button @click="goToCreate" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Create digital signature
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
      v-for="DigitalSignature in DigitalSignatures"
      :key="DigitalSignature.id"
      class="border-b hover:bg-gray-50 dark:hover:bg-[#3a3a3a]"
    >
      <td v-for="key in visibleColumns" :key="key" class="px-4 py-2">
        {{ DigitalSignature[key] }}
      </td>
      <td class="px-4 py-2 space-x-2">
        <button @click="goToEdit(DigitalSignature.id!)" class="text-blue-500 hover:underline">Edit</button>
      </td>
    </tr>
  </tbody>
</table>


  </div>
</template>
