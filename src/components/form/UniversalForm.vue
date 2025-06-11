<script setup lang="ts">
import { computed, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { useForm, ErrorMessage } from 'vee-validate';
import type { TypedSchema } from 'vee-validate';

interface Props {
  model: Record<string, any>;
  validationSchema: TypedSchema;
  onSubmit: (values: Record<string, any>) => void;
  submitLabel?: string;
  readOnly?: boolean;
  statusOptions?: string[];
  issuesOptions?: string[];
  hideItems?: boolean;
  formTitle?: string;
  motorcyclesOptions?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  submitLabel: 'Submit',
  readOnly: false,
  hideItems: true,
  formTitle: '',
  statusOptions: () => [],
  issuesOptions: () => [],
  motorcyclesOptions: () => [],
});

const { handleSubmit, values } = useForm({
  validationSchema: props.validationSchema,
  initialValues: JSON.parse(JSON.stringify(props.model)),
});

const router = useRouter();

const hiddenKeys = ['id', 'created_at', 'createdAt', 'motorcycle', 'restaurant', 'product', 'customer', 'menu', 'driver', 'photos'];

const visibleFields = computed(() =>
  Object.entries(structuredClone(toRaw(values))).filter(([key]) => !props.hideItems || !hiddenKeys.includes(key))
);

const getInputType = (key: string, value: any): string => {
  if (['start_time', 'end_time', 'infraction_date'].includes(key)) return 'datetime-local';
  if (typeof value === 'boolean') return 'checkbox';
  if (typeof value === 'number') return 'number';
  return 'text';
};

const getOptions = (key: string): string[] | undefined => {
  if (key === 'status') return props.statusOptions;
  if (key === 'issue_type') return props.issuesOptions;
  if (key === 'motorcycle_id') return props.motorcyclesOptions;
  return undefined;
};

const handleLocalSubmit = handleSubmit((formValues) => {
  props.onSubmit(formValues);
});
</script>

<template>
  <form @submit.prevent="handleLocalSubmit" class="grid grid-cols-1 gap-4 p-6 bg-white dark:bg-boxdark rounded-md shadow-md">
    <div class="flex items-center justify-between">
      <h3 class="font-medium text-black dark:text-white text-xl">{{ formTitle }}</h3>
      <button type="button" @click="router.back()" class="text-gray-500 dark:text-white">Back</button>
    </div>

    <div v-for="([key, value], index) in visibleFields" :key="`${key}-${index}`">
      <label :for="key" class="block text-lg font-medium text-gray-700 dark:text-white mb-1">
        <template v-if="key.endsWith('_id')">
          <span class="font-semibold text-primary dark:text-primary">ID</span> /
          {{ key.replace(/_id$/, '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
        </template>
        <template v-else>
          {{ key.charAt(0).toUpperCase() + key.slice(1) }}
        </template>
      </label>

      <select
        v-if="getOptions(key)"
        v-model="values[key]"
        :name="key"
        :disabled="readOnly"
        class="w-full border rounded-md p-2 bg-white dark:bg-form-input dark:border-form-strokedark dark:text-white"
      >
        <option disabled value="">Select...</option>
        <option v-for="option in getOptions(key)" :key="option" :value="option">{{ option }}</option>
      </select>

      <input
        v-else
        v-model="values[key]"
        :type="getInputType(key, value)"
        :name="key"
        :disabled="readOnly"
        class="w-full border rounded-md p-2 bg-white dark:bg-form-input dark:border-form-strokedark dark:text-white"
      />

      <ErrorMessage :name="key" class="text-red-500 text-sm mt-1" />
    </div>

    <div v-if="!readOnly">
      <button type="submit" class="w-full bg-[#29D884] hover:bg-[#27b16e] text-white py-2 px-4 rounded-md">
        {{ submitLabel }}
      </button>
    </div>
  </form>
</template>
