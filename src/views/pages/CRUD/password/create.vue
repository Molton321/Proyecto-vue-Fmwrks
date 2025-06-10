<script setup lang="ts">
import { ref } from 'vue';
import UniversalForm from '@/components/form/UniversalForm.vue';
import PasswordService from '@/service/crudServices/PasswordService';
import { Password } from '@/models/Password';
import { useRouter } from 'vue-router';

import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const router = useRouter();

// Modelo inicial que coincide con la interfaz Password
const PasswordModel: Password = {
    user_id: undefined,
    content: '',
};

// Esquema de validación
const rawSchema = z.object({
    content: z.string().min(1, 'Content is required'),
    user_id: z.number({ invalid_type_error: 'User ID must be a number' }),
});

const PasswordSchema = toTypedSchema(rawSchema);

// Enviar
const handleSubmit = async (values: Password) => {
  try {
    await PasswordService.createPassword(values);
    router.push('/Password');
  } catch (err) {
    alert('Failed to create Password.');
  }
};
</script>

<template>
  <UniversalForm
    :model="PasswordModel"
    :validationSchema="PasswordSchema"
    :onSubmit="handleSubmit"
    submitLabel="Create Password"
    formTitle="Create Password"
  />
</template>
