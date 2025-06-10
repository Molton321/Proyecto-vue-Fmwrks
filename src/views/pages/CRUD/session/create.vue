<script setup lang="ts">
import { ref } from 'vue';
import UniversalForm from '@/components/form/UniversalForm.vue';
import SessionService from '@/service/crudServices/SessionService';
import { Session } from '@/models/Session';
import { useRouter } from 'vue-router';

import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const router = useRouter();

// Modelo inicial que coincide con la interfaz Session
const SessionModel: Session = {
    token: '',
    //expiration: '',
    FACode: '',
    state: '',
    user_id: undefined,
};

// Esquema de validación
const rawSchema = z.object({
    token: z.string().min(1, 'Token is required'),
    //expiration: z.string().optional(),
    FACode: z.string().min(1, 'FACode is required'),
    state: z.string().min(1, 'State is required'),
    user_id: z.number({ invalid_type_error: 'User ID must be a number' }).optional(),
});

const SessionSchema = toTypedSchema(rawSchema);

// Enviar
const handleSubmit = async (values: Session) => {
  try {
    await SessionService.createSession(values);
    router.push('/Session');
  } catch (err) {
    alert('Failed to create Session.');
  }
};
</script>

<template>
  <UniversalForm
    :model="SessionModel"
    :validationSchema="SessionSchema"
    :onSubmit="handleSubmit"
    submitLabel="Create Session"
    formTitle="Create Session"
  />
</template>
