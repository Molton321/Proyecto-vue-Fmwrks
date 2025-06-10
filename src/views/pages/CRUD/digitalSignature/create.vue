<script setup lang="ts">
import { ref } from 'vue';
import UniversalForm from '@/components/form/UniversalForm.vue';
import DigitalSignatureService from '@/service/crudServices/DigitalSignatureService';
import { digitalSignature } from '@/models/digitalSignature';
import { useRouter } from 'vue-router';

import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const router = useRouter();

// Modelo inicial que coincide con la interfaz DigitalSignature
const DigitalSignatureModel: digitalSignature = {
  user_id: undefined,
  photo: '',
};

// Esquema de validación
const rawSchema = z.object({
  photo: z.string().min(1, 'Photo is required'),
  user_id: z.number({ invalid_type_error: 'User ID must be a number' }),
});

const DigitalSignatureSchema = toTypedSchema(rawSchema);

// Enviar
const handleSubmit = async (values: digitalSignature) => {
  try {
    await DigitalSignatureService.createDigitalSignature(values);
    router.push('/digital-signature');
  } catch (err) {
    alert('Failed to create DigitalSignature.');
  }
};
</script>

<template>
  <UniversalForm
    :model="DigitalSignatureModel"
    :validationSchema="DigitalSignatureSchema"
    :onSubmit="handleSubmit"
    submitLabel="Create DigitalSignature"
    formTitle="Create DigitalSignature"
  />
</template>
