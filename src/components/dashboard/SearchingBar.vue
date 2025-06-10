<template>
  <div class="relative text-white w-full max-w-md">
    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
      <i class="pi pi-search text-gray-400" />
    </span>
    <input
      type="text"
      v-model="query"
      placeholder="Search..."
      class="w-full pl-10 pr-4 py-2 rounded-full bg-[#1e1e1e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const query = ref('');
</script>
