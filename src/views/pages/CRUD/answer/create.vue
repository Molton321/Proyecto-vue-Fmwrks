<script setup lang="ts">
import { ref } from 'vue';
import UniversalForm from '@/components/form/UniversalForm.vue';
import AnswerService from '@/service/crudServices/AnswerService';
import { Answer } from '@/models/Answer';
import { useRouter } from 'vue-router';

import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const router = useRouter();

// Modelo inicial que coincide con la interfaz Answer
const AnswerModel: Answer = {
  content: '',
  user_id: undefined,
  question_id: undefined,
};

// Esquema de validación
const rawSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  user_id: z.number({ invalid_type_error: 'User id must be a number' }),
  question_id: z.number().min(1, 'User ID is required'),
});

const AnswerSchema = toTypedSchema(rawSchema);

// Enviar
const handleSubmit = async (values: Answer) => {
  try {
    await AnswerService.createAnswer(values);
    router.push('/answer');
  } catch (err) {
    alert('Failed to create Answer.');
  }
};
</script>

<template>
  <UniversalForm
    :model="AnswerModel"
    :validationSchema="AnswerSchema"
    :onSubmit="handleSubmit"
    submitLabel="Create Answer"
    formTitle="Create Answer"
  />
</template>
