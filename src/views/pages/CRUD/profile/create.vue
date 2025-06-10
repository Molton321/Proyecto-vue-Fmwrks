<script setup lang="ts">
import { ref } from 'vue';
import UniversalForm from '@/components/form/UniversalForm.vue';
import ProfileService from '@/service/crudServices/ProfileService';
import { Profile } from '@/models/Profile';
import { useRouter } from 'vue-router';

import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const router = useRouter();

// Modelo inicial que coincide con la interfaz Profile
const ProfileModel: Profile = {
    phone: '',
    photo: '',
    user_id: undefined,
};

// Esquema de validación
const rawSchema = z.object({
    phone: z.string().min(1, 'Phone is required'),
    photo: z.string().min(1, 'Photo is required'),
    user_id: z.number({ invalid_type_error: 'User ID must be a number' }),
});

const ProfileSchema = toTypedSchema(rawSchema);

// Enviar
const handleSubmit = async (values: Profile) => {
  try {
    await ProfileService.createProfile(values);
    router.push('/Profile');
  } catch (err) {
    alert('Failed to create Profile.');
  }
};
</script>

<template>
  <UniversalForm
    :model="ProfileModel"
    :validationSchema="ProfileSchema"
    :onSubmit="handleSubmit"
    submitLabel="Create Profile"
    formTitle="Create Profile"
  />
</template>
