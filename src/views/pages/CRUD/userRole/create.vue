<script setup lang="ts">
import { ref } from 'vue';
import UniversalForm from '@/components/form/UniversalForm.vue';
import UserRoleService from '@/service/crudServices/UserRoleService';
import { UserRole } from '@/models/userRole';
import { useRouter } from 'vue-router';

import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const router = useRouter();

// Modelo inicial que coincide con la interfaz UserRole
const UserRoleModel: UserRole = {
    user_id: undefined,
    role_id: undefined,

};

// Esquema de validación
const rawSchema = z.object({
    user_id: z.number({ invalid_type_error: 'User ID must be a number' }),
    role_id: z.number({ invalid_type_error: 'Role ID must be a number' }),
});

const UserRoleSchema = toTypedSchema(rawSchema);

// Enviar
const handleSubmit = async (values: UserRole) => {
  try {
    await UserRoleService.createUserRole(values);
    router.push('/UserRole');
  } catch (err) {
    alert('Failed to create UserRole.');
  }
};
</script>

<template>
  <UniversalForm
    :model="UserRoleModel"
    :validationSchema="UserRoleSchema"
    :onSubmit="handleSubmit"
    submitLabel="Create UserRole"
    formTitle="Create UserRole"
  />
</template>
