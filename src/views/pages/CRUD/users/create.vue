<script setup lang="ts">
import UsersForm from '@/components/form/UsersForm.vue';
import UserService from '@/service/UserService';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleSubmit = async (user: any) => {
  try {
    await UserService.createUser(user);
    router.push('/user');
  } catch (err) {
    alert('Error al crear usuario');
  }
};
</script>

<template>
  <UsersForm @submit="handleSubmit" />
</template>