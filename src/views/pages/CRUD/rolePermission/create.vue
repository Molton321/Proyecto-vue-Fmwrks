<script setup lang="ts">
import { ref } from 'vue';
import UniversalForm from '@/components/form/UniversalForm.vue';
import RolePermissionService from '@/service/crudServices/RolePermission';
import { rolePermission } from '@/models/rolePermission';
import { useRouter } from 'vue-router';

import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const router = useRouter();

// Modelo inicial que coincide con la interfaz RolePermission
const RolePermissionModel: rolePermission = {
    role_id: undefined,
    permission_id: undefined,

};

// Esquema de validación
const rawSchema = z.object({
    role_id: z.number({ invalid_type_error: 'Role ID must be a number' }),
    permission_id: z.number({ invalid_type_error: 'Permission ID must be a number' }),
});

const RolePermissionSchema = toTypedSchema(rawSchema);

// Enviar
const handleSubmit = async (values: rolePermission) => {
  try {
    await RolePermissionService.createRolePermission(values);
    router.push('/role-permission');
  } catch (err) {
    alert('Failed to create RolePermission.');
  }
};
</script>

<template>
  <UniversalForm
    :model="RolePermissionModel"
    :validationSchema="RolePermissionSchema"
    :onSubmit="handleSubmit"
    submitLabel="Create Role Permission"
    formTitle="Create Role Permission"
  />
</template>
