<script setup lang="ts">
import { ref, toRaw } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import SessionForm from '@/components/form/SessionForm.vue';
import SessionService from '@/service/crudServices/SessionService';

const router = useRouter();
const route = useRoute();
const userId = Number(route.params.id);

const initialValues = ref({
  token: '',
    expiration: '',
    FAcode: '',
    state: '',
    user_id: userId,
});

const handleSubmit = async (values: any) => {
  try {
    await SessionService.createSession(userId, { ...values  });
    router.push(`/user/${userId}/sessions`);
  } catch (err) {
    alert('Failed to create session.');
  }
};
</script>

<template>
  <SessionForm :initial-values="toRaw(initialValues)" @submit="handleSubmit" />
</template>