<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import UserRolesForm from '@/components/form/UserRolesForm.vue';
import UserRoleService from '@/service/crudServices/UserRoleService';

const route = useRoute();
const router = useRouter();
const roleId = Number(route.params.id);

const handleSubmit = async (values: { user_id: number; role_id: number }) => {
  try {
    await UserRoleService.createUserRole(values.user_id, values.role_id);
    router.push('/user-role/view/' + roleId);
  } catch (err) {
    alert('Failed to create UserRole.');
  }
};
</script>

<template>
  <UserRolesForm :role-id="roleId" @submit="handleSubmit" />
</template>