<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue';
import PermissionsForm from '@/components/form/PermissionsForm.vue';
import PermissionService from '@/service/crudServices/PermissionService';
import { useRoute } from 'vue-router';

const route = useRoute();
const initialValues = ref({ url: '', method: '' });

onMounted(async () => {
  const permission = await PermissionService.getPermission(Number(route.params.id));
  initialValues.value = {
    url: permission.data.url ?? '',
    method: permission.data.method ?? ''
  };
});
</script>

<template>
  <PermissionsForm :initial-values="toRaw(initialValues)" :read-only="true" />
</template>