<script setup lang="ts">
import { ref } from 'vue';
import UniversalForm from '@/components/form/UniversalForm.vue';
import SecurityQuestionService from '@/service/crudServices/SecurityQuestionService';
import { SecurityQuestion } from '@/models/securityQuestion';
import { useRouter } from 'vue-router';

import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const router = useRouter();

// Modelo inicial que coincide con la interfaz SecurityQuestion
const SecurityQuestionModel: SecurityQuestion = {
    name: '',
    description: '',
};

// Esquema de validación
const rawSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
});

const SecurityQuestionSchema = toTypedSchema(rawSchema);

// Enviar
const handleSubmit = async (values: SecurityQuestion) => {
  try {
    await SecurityQuestionService.createSecurityQuestion(values);
    router.push('/security-question');
  } catch (err) {
    alert('Failed to create SecurityQuestion.');
  }
};
</script>

<template>
  <UniversalForm
    :model="SecurityQuestionModel"
    :validationSchema="SecurityQuestionSchema"
    :onSubmit="handleSubmit"
    submitLabel="Create Security Question"
    formTitle="Create Security Question"
  />
</template>
