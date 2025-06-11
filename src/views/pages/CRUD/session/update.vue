<script setup lang="ts">
import { ref, toRaw, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import SessionForm from '@/components/form/SessionForm.vue';
import SessionService from '@/service/crudServices/SessionService';
import { DateTime } from 'luxon';

const router = useRouter();
const route = useRoute();
const userId = Number(route.params.id);
const sessionIdParam = route.params.id_session;
const sessionId = Array.isArray(sessionIdParam) ? sessionIdParam[0] : sessionIdParam;

const initialValues = ref({
  token: '',
    expiration: '',
    FACode: '',
    state: '',
    user_id: userId,
});

onMounted(async () => {
  try {
    console.log('Loading session with ID:', sessionId);
    const response = await SessionService.getSession(sessionId);
    const pwd = response.data;
    console.log('Loaded session:', pwd);
    initialValues.value = {
      token: pwd.token ?? '',
        expiration: pwd.expiration ? (typeof pwd.expiration === 'string' ? DateTime.fromHTTP(pwd.expiration).toFormat("yyyy-MM-dd'T'HH:mm") : pwd.expiration.toFormat("yyyy-MM-dd'T'HH:mm")) : '',
        FACode: pwd.FACode ?? '',
        state: pwd.state ?? '',
        user_id: userId,

    };

    console.log('Session data:', initialValues.value);

    console.log('Initial values set:', initialValues.value);
  } catch (err) {
    alert('Error loading session');
  }
});

const handleSubmit = async (values: any) => {
  try {
    await SessionService.updateSession(sessionId, {
      // No se actualiza content
      token: values.token,
      expiration: values.expiration,
        FACode: values.FACode,
        state: values.state,
      user_id: values.user_id,
    });
    router.push(`/user/${userId}/sessions`);
  } catch (err) {
    alert('Failed to update session.');
  }
};
</script>

<template>
  <SessionForm
    :initial-values="toRaw(initialValues)"
    @submit="handleSubmit"
    :read-only="false"
  />
</template>