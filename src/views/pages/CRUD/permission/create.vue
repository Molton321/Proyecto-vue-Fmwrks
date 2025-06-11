<script setup lang="ts">
import { ref, toRaw } from 'vue';
import PermissionsForm from '@/components/form/PermissionsForm.vue';
import PermissionService from '@/service/crudServices/PermissionService';
import { useRouter } from 'vue-router';

const router = useRouter();
const initialValues = ref({ url: '', method: '' });

const handleSubmit = async (permission: any) => {
  try {
    await PermissionService.createPermission(permission);
    router.push('/permission');
  } catch (err) {
    alert('Failed to create Permission.');
  }
};
</script>

<template>
  <PermissionsForm :initial-values="toRaw(initialValues)" @submit="handleSubmit" />
</template>