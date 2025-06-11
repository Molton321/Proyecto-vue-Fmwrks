<script setup lang="ts">
import { ref } from 'vue';
import { useForm, Field, ErrorMessage } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const emit = defineEmits(['submit']);
const props = defineProps({
  initialValues: {
    type: Object,
    default: () => ({ url: '', method: '' })
  },
  readOnly: {
    type: Boolean,
    default: false
  }
});

const isSubmitting = ref(false);

const schema = toTypedSchema(
  z.object({
    url: z.string().min(1, 'URL is required'),
    method: z.string().min(1, 'Method is required'),
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
      <label for="url" class="block mb-1 font-medium">URL</label>
      <Field
        name="url"
        id="url"
        :model-value="props.initialValues.url"
        :readonly="props.readOnly"
        class="w-full border rounded p-2"
      />
      <ErrorMessage name="url" class="text-red-500 text-sm" />
    </div>
    <div>
      <label for="method" class="block mb-1 font-medium">Method</label>
      <Field
  name="method"
  as="select"
  id="method"
  :disabled="props.readOnly"
  class="w-full border rounded p-2"
>
  <option value="">-- Select Method --</option>
  <option value="GET">GET</option>
  <option value="POST">POST</option>
  <option value="PUT">PUT</option>
  <option value="DELETE">DELETE</option>
</Field>

      <ErrorMessage name="method" class="text-red-500 text-sm" />
    </div>
    <button
      v-if="!props.readOnly"
      type="submit"
      :disabled="isSubmitting"
      class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Guardar Permiso
    </button>
  </form>
</template>