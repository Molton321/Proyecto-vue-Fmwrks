<script setup lang="ts">
import { ref } from 'vue';
import UniversalForm from '@/components/form/UniversalForm.vue';
import DeviceService from '@/service/crudServices/DeviceService';
import { Device } from '@/models/Device';
import { useRouter } from 'vue-router';

import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const router = useRouter();

// Modelo inicial que coincide con la interfaz Device
const DeviceModel: Device = {
  name: '',
  ip: '',
  operating_system: '',
    user_id: undefined,
};

// Esquema de validación
const rawSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  ip: z.string().min(1, 'IP is required'),
  operating_system: z.string().min(1, 'Operating System is required'),
  user_id: z.number({ invalid_type_error: 'User ID must be a number' }).optional(),
});

const DeviceSchema = toTypedSchema(rawSchema);

// Enviar
const handleSubmit = async (values: Device) => {
  try {
    await DeviceService.createDevice(values);
    router.push('/Device');
  } catch (err) {
    alert('Failed to create Device.');
  }
};
</script>

<template>
  <UniversalForm
    :model="DeviceModel"
    :validationSchema="DeviceSchema"
    :onSubmit="handleSubmit"
    submitLabel="Create Device"
    formTitle="Create Device"
  />
</template>
