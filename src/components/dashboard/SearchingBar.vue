<template>
  <div class="relative text-white w-full max-w-md">
    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
      <i class="pi pi-search text-gray-400" />
    </span>
    <input
      type="text"
      v-model="query"
      placeholder="Search..."
      class="bg-white w-full pl-10 pr-4 py-2 rounded-full var(--primary-color) text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:var(--primary-color) transition-all dark:bg-gray-600 dark:text-white"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const query = ref('');
</script>
