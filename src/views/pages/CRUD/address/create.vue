<script setup lang="ts">
import { ref } from 'vue';
import UniversalForm from '@/components/form/UniversalForm.vue';
import AddressService from '@/service/crudServices/AddressService';
import { Address } from '@/models/Address';
import { useRouter } from 'vue-router';

import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const router = useRouter();

// Modelo inicial que coincide con la interfaz Address
const addressModel: Address = {
  street: '',
  number: '',
  latitude: undefined,
  longitude: undefined,
  user_id: undefined,
};

// Esquema de validación
const rawSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  number: z.string().min(1, 'Number is required'),
  latitude: z.number({ invalid_type_error: 'Latitude must be a number' }).optional(),
  longitude: z.number({ invalid_type_error: 'Longitude must be a number' }).optional(),
  user_id: z.number().min(1, 'User ID is required'),
});

const addressSchema = toTypedSchema(rawSchema);

// Enviar
const handleSubmit = async (values: Address) => {
  try {
    await AddressService.createAddress(values);
    router.push('/addresses');
  } catch (err) {
    alert('Failed to create address.');
  }
};
</script>

<template>
  <UniversalForm
    :model="addressModel"
    :validationSchema="addressSchema"
    :onSubmit="handleSubmit"
    submitLabel="Create Address"
    formTitle="Create Address"
  />
</template>
