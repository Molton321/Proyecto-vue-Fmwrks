<script setup lang="ts">
import { ref, toRaw } from 'vue';
import RolesForm from '@/components/form/RolesForm.vue';
import RoleService from '@/service/crudServices/RoleService';
import { useRouter } from 'vue-router';

const router = useRouter();
const initialValues = ref({ name: '', description: '' });

const handleSubmit = async (role: any) => {
  try {
    await RoleService.createRole(role);
    router.push('/role');
  } catch (err) {
    alert('Failed to create Role.');
  }
};
</script>

<template>
  <RolesForm :initial-values="toRaw(initialValues)" @submit="handleSubmit" />
</template>