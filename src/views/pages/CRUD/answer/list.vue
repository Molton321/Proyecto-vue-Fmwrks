<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import AnswersService from '@/service/crudServices/AnswerService';
import type { Answer } from '@/models/Answer';

const router = useRouter();
const answers = ref<Answer[]>([]);
const isLoading = ref(true);

const fetchAnswers = async () => {
  try {
    const response = await AnswersService.getAllAnswers();
    answers.value = Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error('Error fetching answers:', error);
  } finally {
    isLoading.value = false;
  }
};

const defaultAnswer: Answer = {
  id: undefined,
  content: '',
  user_id: undefined,
  question_id: undefined,
};


const goToCreate = () => {
  router.push('/answer/create');
};

const goToEdit = (id: number) => {
  router.push(`/answer/update/${id}`);
};

const labelMap = (key: string) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());


// Detectar columnas automáticamente
const visibleColumns = Object.keys(defaultAnswer).filter(
  key => key !== 'id' // opcional: omitir campos como 'id'
);

onMounted(fetchAnswers);
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">Answers</h1>
      <button @click="goToCreate" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Create Answer
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
      v-for="answer in answers"
      :key="answer.id"
      class="border-b hover:bg-gray-50 dark:hover:bg-[#3a3a3a]"
    >
      <td v-for="key in visibleColumns" :key="key" class="px-4 py-2">
        {{ answer[key] }}
      </td>
      <td class="px-4 py-2 space-x-2">
        <button @click="goToEdit(answer.id!)" class="text-blue-500 hover:underline">Edit</button>
      </td>
    </tr>
  </tbody>
</table>


  </div>
</template>
