<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">Update Address</h1>
    <AlternativeAddressForm :model-value="address" @submit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AlternativeAddressForm from '@/components/form/AlternativeAddressForm.vue';
import AddressService from '@/service/crudServices/AddressService';

const router = useRouter();
const route = useRoute();
const userId = Number(route.params.id);
const addressId = Number(route.params.id_address);

const address = ref({
  street: '',
  number: '',
  latitude: 5.06889,
  longitude: -75.51738,
});

onMounted(async () => {
  try {
    const response = await AddressService.getAddress(addressId);
    address.value = {
      street: response.data.street ?? '',
      number: response.data.number ?? '',
      latitude: response.data.latitude ?? 5.06889,
      longitude: response.data.longitude ?? -75.51738,
    };
  } catch (err) {
    alert('Error loading address');
  }
});

const handleSubmit = async (values: any) => {
  try {
    await AddressService.updateAddress(addressId, { ...values, user_id: userId });
    router.push(`/user/${userId}/address`);
  } catch (err) {
    alert('Failed to update address.');
  }
};
</script>