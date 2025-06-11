<script setup lang="ts">
import { ref } from 'vue';
import { useForm, Field, ErrorMessage } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const emit = defineEmits(['submit']);
const props = defineProps<{
  initialValues?: { token?: string; expiration?: string; FAcode?: string; state?: string; user_id?: number };
  readOnly?: boolean;
}>();

const isSubmitting = ref(false);

const schema = toTypedSchema(
  z.object({
    token: z.string().min(1, 'token is required'),
    expiration: z.string().min(1, 'expiration is required'),
    FAcode: z.string(),
    state: z.string().optional(),
    user_id: z.number(),
  })
);

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: props.initialValues ?? { token: '', expiration: '', FAcode: '', state: '', user_id: undefined },
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
      <label for="content" class="block mb-1 font-medium">Token</label>
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
      <label for="expiration" class="block mb-1 font-medium">Expiration</label>
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
      <label for="FAcode" class="block mb-1 font-medium">FA Code</label>
      <Field
        name="FAcode"
        id="FAcode"
        :readonly="props.readOnly"
        class="w-full border rounded p-2"
        type="text"
      />
      <ErrorMessage name="FAcode" class="text-red-500 text-sm" />
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
    <div>
      <label for="user_id" class="block mb-1 font-medium">User ID</label>
      <Field
        name="user_id"
        id="user_id"
        :readonly="props.readOnly"
        class="w-full border rounded p-2"
        type="text"
      />
      <ErrorMessage name="user_id" class="text-red-500 text-sm" />
    </div>
    <button
      v-if="!props.readOnly"
      type="submit"
      :disabled="isSubmitting"
      class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
    >
      Guardar Session
    </button>
  </form>
</template>