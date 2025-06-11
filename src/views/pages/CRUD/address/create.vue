<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">Create Address</h1>
    <AlternativeAddressForm @submit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import AlternativeAddressForm from '@/components/form/AlternativeAddressForm.vue';
import AddressService from '@/service/crudServices/AddressService';

const router = useRouter();
const route = useRoute();
const userId = Number(route.params.id);

const handleSubmit = async (address: any) => {
  try {
    await AddressService.createAddress(userId, { ...address  });
    router.push(`/user/${userId}/address`);
  } catch (err) {
    alert('Failed to create address.');
  }
};
</script>