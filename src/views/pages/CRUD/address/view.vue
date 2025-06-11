<!-- src/views/AddressView.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AddressService from '@/service/crudServices/AddressService'
import type { Address } from '@/models/Address'
import AddressForm from '@/components/form/AddressForm.vue'

const route = useRoute()
const router = useRouter()
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

const handleDelete = async () => {
  try {
    await AddressService.deleteAddress(address.value.id)
    console.log('Address' + address.value.id + ' deleted successfully')
    router.push(`/user`)
  } catch (err) {
    alert('Error deleting address')
  }
}
</script>

<template>
  <div>
    <AddressForm :modelValue="address" />
    <button
      @click="handleDelete"
      class="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
    >
      Delete Address
    </button>
  </div>
</template>