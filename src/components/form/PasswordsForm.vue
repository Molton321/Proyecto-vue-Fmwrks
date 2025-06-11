<script setup lang="ts">
import { ref } from 'vue';
import { useForm, Field, ErrorMessage } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const emit = defineEmits(['submit']);
const props = defineProps<{
  initialValues?: { content?: string; startAt?: string; endAt?: string };
  readOnly?: boolean;
}>();

const isSubmitting = ref(false);

const schema = toTypedSchema(
  z.object({
    content: z.string().min(1, 'Password is required'),
    startAt: z.string().optional(),
    endAt: z.string().min(1, 'End At is required'),
  })
);

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: props.initialValues ?? { content: '', startAt: '', endAt: '' },
});

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  await emit('submit', values);
  isSubmitting.value = false;
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="grid gap-4 p-6 bg-white rounded shadow-md">
    <div>
      <label for="content" class="block mb-1 font-medium">Password</label>
      <Field
        name="content"
        id="content"
        :readonly="props.readOnly"
        class="w-full border rounded p-2"
        type="text"
      />
      <ErrorMessage name="content" class="text-red-500 text-sm" />
    </div>
    <div>
      <label for="startAt" class="block mb-1 font-medium">Start At</label>
      <Field
        name="startAt"
        id="startAt"
        :readonly="props.readOnly"
        class="w-full border rounded p-2"
        type="datetime-local"
      />
      <ErrorMessage name="startAt" class="text-red-500 text-sm" />
    </div>
    <div>
      <label for="endAt" class="block mb-1 font-medium">End At <span class="text-red-500">*</span></label>
      <Field
        name="endAt"
        id="endAt"
        :readonly="props.readOnly"
        class="w-full border rounded p-2"
        type="datetime-local"
      />
      <ErrorMessage name="endAt" class="text-red-500 text-sm" />
    </div>
    <button
      v-if="!props.readOnly"
      type="submit"
      :disabled="isSubmitting"
      class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
    >
      Guardar Contraseña
    </button>
  </form>
</template>