<script setup lang="ts">
import { ref, toRaw } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import DevicesForm from '@/components/form/DevicesForm.vue';
import DeviceService from '@/service/crudServices/DeviceService';

const router = useRouter();
const route = useRoute();
const userId = Number(route.params.id);

const initialValues = ref({
  name: '',
  ip: '',
  operating_system: ''
});

const handleSubmit = async (values: any) => {
  try {
    await DeviceService.createDevice(userId, { ...values  });
    router.push(`/user/${userId}/devices`);
  } catch (err) {
    alert('Failed to create device.');
  }
};
</script>

<template>
  <DevicesForm :initial-values="toRaw(initialValues)" @submit="handleSubmit" />
</template>