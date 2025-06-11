<script setup lang="ts">
import { ref, toRaw, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import SessionForm from '@/components/form/SessionForm.vue';
import SessionService from '@/service/crudServices/SessionService';


const router = useRouter();
const route = useRoute();
const userId = Number(route.params.id);
const sessionId = Number(route.params.id_session);

const initialValues = ref({
  token: '',
    expiration: '',
    FAcode: '',
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
        expiration: pwd.expiration
        ? (typeof pwd.expiration === 'string'
            ? pwd.expiration
            : pwd.expiration.toISO({ suppressMilliseconds: true }).slice(0, 16))
        : '',
        FAcode: pwd.FACode ?? '',
        state: pwd.state ?? '',
        user_id: userId,

    };

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
        FACode: values.FAcode,
        state: values.state,
      user_id: values.user_id,
    });
    router.push(`/user/${userId}/session`);
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