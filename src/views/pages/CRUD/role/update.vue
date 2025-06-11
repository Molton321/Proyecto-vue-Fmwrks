<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue';
import RolesForm from '@/components/form/RolesForm.vue';
import RoleService from '@/service/crudServices/RoleService';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const initialValues = ref({ name: '', description: '' });

onMounted(async () => {
  const request = await RoleService.getRole(Number(route.params.id));
  initialValues.value = {
    name: request.data.name ?? '',
    description: request.data.description ?? ''
  };
});

const handleSubmit = async (role: any) => {
  try {
    await RoleService.updateRole(Number(route.params.id), role);
    router.push('/role');
  } catch (err) {
    alert('Error al actualizar rol');
  }
};
</script>

<template>
  <RolesForm :initial-values="toRaw(initialValues)" @submit="handleSubmit" />
</template>