<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue';
import RolesForm from '@/components/form/RolesForm.vue';
import RoleService from '@/service//crudServices/RoleService';
import { useRoute } from 'vue-router';

const route = useRoute();
const initialValues = ref({ name: '', description: '' });

onMounted(async () => {
  const user = await RoleService.getRole(Number(route.params.id));
  initialValues.value = {
    name: user.data.name ?? '',
    description: user.data.description ?? ''
  };
});
</script>

<template>
  <RolesForm :initial-values="toRaw(initialValues)" :read-only="true" />
</template>