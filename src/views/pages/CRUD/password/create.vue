<script setup lang="ts">
import { ref, toRaw } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import PasswordsForm from '@/components/form/PasswordsForm.vue';
import PasswordService from '@/service/crudServices/PasswordService';

const router = useRouter();
const route = useRoute();
const userId = Number(route.params.id);

const initialValues = ref({
  content: '',
  startAt: '',
  endAt: ''
});

const handleSubmit = async (values: any) => {
  try {
    await PasswordService.createPassword(userId, { ...values  });
    router.push(`/user/${userId}/passwords`);
  } catch (err) {
    alert('Failed to create password.');
  }
};
</script>

<template>
  <PasswordsForm :initial-values="toRaw(initialValues)" @submit="handleSubmit" />
</template>