<script setup lang="ts">
import { ref } from 'vue';
import UniversalForm from '@/components/form/UniversalForm.vue';
import RoleService from '@/service/crudServices/RoleService';
import { Role } from '@/models/Role';
import { useRouter } from 'vue-router';

import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const router = useRouter();

// Modelo inicial que coincide con la interfaz Role
const RoleModel: Role = {
    name: '',
    description: '',
};

// Esquema de validación
const rawSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
});

const RoleSchema = toTypedSchema(rawSchema);

// Enviar
const handleSubmit = async (values: Role) => {
  try {
    await RoleService.createRole(values);
    router.push('/role');
  } catch (err) {
    alert('Failed to create Role.');
  }
};
</script>

<template>
  <UniversalForm
    :model="RoleModel"
    :validationSchema="RoleSchema"
    :onSubmit="handleSubmit"
    submitLabel="Create Role"
    formTitle="Create Role"
  />
</template>
