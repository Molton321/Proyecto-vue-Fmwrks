<script setup lang="ts">
import { ref } from 'vue';
import UniversalForm from '@/components/form/UniversalForm.vue';
import PermissionService from '@/service/crudServices/PermissionService';
import { Permission } from '@/models/Permission';
import { useRouter } from 'vue-router';

import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const router = useRouter();

// Modelo inicial que coincide con la interfaz Permission
const PermissionModel: Permission = {
    url: '',
    method: '',
};

// Esquema de validación
const rawSchema = z.object({
    url: z.string().min(1, 'URL is required'),
    method: z.string().min(1, 'Method is required'),
});

const PermissionSchema = toTypedSchema(rawSchema);

// Enviar
const handleSubmit = async (values: Permission) => {
  try {
    await PermissionService.createPermission(values);
    router.push('/Permission');
  } catch (err) {
    alert('Failed to create Permission.');
  }
};
</script>

<template>
  <UniversalForm
    :model="PermissionModel"
    :validationSchema="PermissionSchema"
    :onSubmit="handleSubmit"
    submitLabel="Create Permission"
    formTitle="Create Permission"
  />
</template>
