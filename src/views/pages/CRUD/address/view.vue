<!-- src/views/AddressView.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AddressService from '@/service/crudServices/AddressService'
import type { Address } from '@/models/Address'
import AddressForm from '@/components/form/AddressForm.vue'

const route = useRoute()
const address = ref<Address>({
  street: '',
  number: '',
  latitude: 0,
  longitude: 0,
})

onMounted(async () => {
  try {
    const userId = Number(route.params.id)
    const res = await AddressService.getAddressByUserId(userId)
    console.log(res.data);
    
    address.value = res.data
  } catch (err) {
    console.error('Error getting address by user ID', err)
  }
})
</script>

<template>
  <AddressForm :modelValue="address" />
</template>
