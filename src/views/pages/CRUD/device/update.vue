<script setup lang="ts">
import { ref, toRaw, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import DevicesForm from '@/components/form/DevicesForm.vue';
import DeviceService from '@/service/crudServices/DeviceService';

const router = useRouter();
const route = useRoute();
const userId = Number(route.params.id);
const deviceId = Number(route.params.id_device);

const initialValues = ref({
  name: '',
  ip: '',
  operating_system: ''
});

onMounted(async () => {
  try {
    const response = await DeviceService.getDevice(deviceId);
    const device = response.data;
    initialValues.value = {
      name: device.name ?? '',
      ip: device.ip ?? '',
      operating_system: device.operating_system ?? ''
    };

    console.log('Device loaded:', initialValues.value);
  } catch (err) {
    alert('Error loading device');
  }
});

const handleSubmit = async (values: any) => {
  try {
    await DeviceService.updateDevice(deviceId, values);
    router.push(`/user/${userId}/devices`);
  } catch (err) {
    alert('Failed to update device.');
  }
};
</script>

<template>
  <DevicesForm :initial-values="toRaw(initialValues)" @submit="handleSubmit" />
</template>