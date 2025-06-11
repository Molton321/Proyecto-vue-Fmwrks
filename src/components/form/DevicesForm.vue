<script setup lang="ts">
import { useForm, Field, ErrorMessage } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { ref, watch, toRaw } from 'vue';

const emit = defineEmits(['submit']);
const props = defineProps<{
  initialValues?: { name?: string; ip?: string; operating_system?: string };
  readOnly?: boolean;
}>();

const isSubmitting = ref(false);

const schema = toTypedSchema(
  z.object({
    name: z.string().min(1, 'Name is required'),
    ip: z.string().min(1, 'IP is required'),
    operating_system: z.string().min(1, 'Operating System is required'),
  })
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: props.initialValues ?? { name: '', ip: '', operating_system: '' },
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
      <label for="name" class="block mb-1 font-medium">Name</label>
      <Field
        name="name"
        id="name"
        :readonly="props.readOnly"
        class="w-full border rounded p-2"
        type="text"
      />
      <ErrorMessage name="name" class="text-red-500 text-sm" />
    </div>
    <div>
      <label for="ip" class="block mb-1 font-medium">IP</label>
      <Field
        name="ip"
        id="ip"
        :readonly="props.readOnly"
        class="w-full border rounded p-2"
        type="text"
      />
      <ErrorMessage name="ip" class="text-red-500 text-sm" />
    </div>
    <div>
      <label for="operating_system" class="block mb-1 font-medium">Operating System</label>
      <Field
        name="operating_system"
        id="operating_system"
        :readonly="props.readOnly"
        class="w-full border rounded p-2"
        type="text"
      />
      <ErrorMessage name="operating_system" class="text-red-500 text-sm" />
    </div>
    <button
      v-if="!props.readOnly"
      type="submit"
      :disabled="isSubmitting"
      class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
    >
      Guardar Device
    </button>
  </form>
</template>