<script setup lang="ts">
import { ref, watch, toRaw } from 'vue';
import { useForm, Field, ErrorMessage } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const emit = defineEmits(['submit']);
const props = defineProps<{
  initialValues?: { token?: string; expiration?: string; FACode?: string; state?: string };
  readOnly?: boolean;
}>();

const isSubmitting = ref(false);

const schema = toTypedSchema(
  z.object({
    token: z.string().min(1, 'Token is required'),
    expiration: z.string().min(1, 'Expiration is required'),
    FACode: z.string().optional(),
    state: z.string().optional(),
  })
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: props.initialValues ?? { token: '', expiration: '', FACode: '', state: '' },
});

watch(
  () => props.initialValues,
  (newValues) => {
    if (newValues) {
      resetForm({ values: toRaw(newValues) });
    }
  },
  { immediate: true, deep: true }
);

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  await emit('submit', values);
  isSubmitting.value = false;
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="grid gap-4 p-6 bg-white rounded shadow-md">
    <div>
      <label for="token" class="block mb-1 font-medium">Token</label>
      <Field
        name="token"
        id="token"
        :readonly="props.readOnly"
        class="w-full border rounded p-2"
        type="text"
      />
      <ErrorMessage name="token" class="text-red-500 text-sm" />
    </div>
    <div>
      <label for="expiration" class="block mb-1 font-medium">Expiration <span class="text-red-500">*</span></label>
      <Field
        name="expiration"
        id="expiration"
        :readonly="props.readOnly"
        class="w-full border rounded p-2"
        type="datetime-local"
      />
      <ErrorMessage name="expiration" class="text-red-500 text-sm" />
    </div>
    <div>
      <label for="FACode" class="block mb-1 font-medium">FA Code</label>
      <Field
        name="FACode"
        id="FACode"
        :readonly="props.readOnly"
        class="w-full border rounded p-2"
        type="text"
      />
      <ErrorMessage name="FACode" class="text-red-500 text-sm" />
    </div>
    <div>
      <label for="state" class="block mb-1 font-medium">State</label>
      <Field
        name="state"
        id="state"
        :readonly="props.readOnly"
        class="w-full border rounded p-2"
        type="text"
      />
      <ErrorMessage name="state" class="text-red-500 text-sm" />
    </div>
    <button
      v-if="!props.readOnly"
      type="submit"
      :disabled="isSubmitting"
      class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
    >
      Guardar Sesión
    </button>
  </form>
</template>