<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue';
import PermissionsForm from '@/components/form/PermissionsForm.vue';
import PermissionService from '@/service/crudServices/PermissionService';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const initialValues = ref({ url: '', method: '' });

onMounted(async () => {
  const request = await PermissionService.getPermission(Number(route.params.id));
  initialValues.value = {
    url: request.data.url ?? '',
    method: request.data.method ?? ''
  };
});

const handleSubmit = async (permission: any) => {
  try {
    await PermissionService.updatePermission(Number(route.params.id), permission);
    router.push('/permission');
  } catch (err) {
    alert('Error al actualizar permiso');
  }
};
</script>

<template>
  <PermissionsForm :initial-values="toRaw(initialValues)" @submit="handleSubmit" />
</template>