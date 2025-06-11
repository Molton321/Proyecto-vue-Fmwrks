<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue';
import UsersForm from '@/components/form/UsersForm.vue';
import UserService from '@/service/UserService';
import { useRoute } from 'vue-router';

const route = useRoute();
const initialValues = ref({ name: '', email: '' });

onMounted(async () => {
  const user = await UserService.getUser(Number(route.params.id));
  initialValues.value = {
    name: user.data.name ?? '',
    email: user.data.email ?? ''
  };
});
</script>

<template>
  <UsersForm :initial-values="toRaw(initialValues)" :read-only="true" />
</template>