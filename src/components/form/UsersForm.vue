<script setup lang="ts">
import { useForm, Field, ErrorMessage } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const emit = defineEmits(['submit']);
const props = defineProps({
  initialValues: {
    type: Object,
    default: () => ({ name: '', email: '' })
  },
  readOnly: {
    type: Boolean,
    default: false
  }
});

const schema = toTypedSchema(
  z.object({
    name: z.string().min(1, 'Name is required'),
    email: z
      .string()
      .min(1, 'Email is required')
      .regex(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        'Email must be a valid email address'
      ),
  })
);

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: props.initialValues,
});

const onSubmit = handleSubmit((values) => {
  emit('submit', values);
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="grid gap-4 p-6 bg-white rounded shadow-md">
    <div>
      <label for="name" class="block mb-1 font-medium">Name</label>
      <Field
        name="name"
        id="name"
        :model-value="props.initialValues.name"
        :readonly="props.readOnly"
        class="w-full border rounded p-2"
      />
      <ErrorMessage name="name" class="text-red-500 text-sm" />
    </div>
    <div>
      <label for="email" class="block mb-1 font-medium">Email</label>
      <Field
        name="email"
        id="email"
        :model-value="props.initialValues.email"
        :readonly="props.readOnly"
        class="w-full border rounded p-2"
      />
      <ErrorMessage name="email" class="text-red-500 text-sm" />
    </div>
    <button
      v-if="!props.readOnly"
      type="submit"
      class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Guardar Usuario
    </button>
  </form>
</template>