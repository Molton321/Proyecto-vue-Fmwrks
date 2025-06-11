<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useForm, Field, ErrorMessage } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import UserService from '@/service/crudServices/UserService';

const emit = defineEmits(['submit']);
const props = defineProps<{
  roleId: number;
}>();

const users = ref<{ id: number; name: string; email: string }[]>([]);

onMounted(async () => {
  const response = await UserService.getAllUsers();
  users.value = response.data.map((u: any) => ({
    id: u.id,
    name: u.name,
    email: u.email,
  }));
});

const isSubmitting = ref(false);

const schema = toTypedSchema(
  z.object({
    user_id: z.number({ invalid_type_error: 'User is required' }),
  })
);

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: { user_id: undefined },
});

const onSubmit = handleSubmit((values) => {
isSubmitting.value = true;
  emit('submit', { ...values, role_id: props.roleId });
  isSubmitting.value = false;
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="grid gap-4 p-6 bg-white rounded shadow-md">
    <div>
      <label for="user_id" class="block mb-1 font-medium">User</label>
      <Field as="select" name="user_id" id="user_id" class="w-full border rounded p-2">
        <option value="">Select a user</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }} ({{ user.email }})
        </option>
      </Field>
      <ErrorMessage name="user_id" class="text-red-500 text-sm" />
    </div>
    <button type="submit" :disabled="isSubmitting" class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
      Agregar Usuario al Rol
    </button>
  </form>
</template>