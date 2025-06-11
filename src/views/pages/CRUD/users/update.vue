<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue';
import UsersForm from '@/components/form/UsersForm.vue';
import UserService from '@/service/UserService';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const initialValues = ref({ name: '', email: '' });

onMounted(async () => {
  const request = await UserService.getUser(Number(route.params.id));
  initialValues.value = {
    name: request.data.name ?? '',
    email: request.data.email ?? ''
  };

  console.log('User fetched:', initialValues.value);
});

const handleSubmit = async (user: any) => {
  try {
    await UserService.updateUser(Number(route.params.id), user);
    router.push('/user');
  } catch (err) {
    alert('Error al actualizar usuario');
  }
};
</script>

<template>
  <UsersForm :initial-values="toRaw(initialValues)" @submit="handleSubmit" />
</template>