<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // Added useRouter
import DigitalSignatureService from '@/service/crudServices/DigitalSignatureService'; 
import UserService from '@/service/crudServices/UserService'; 
import Button from 'primevue/button'; // Added Button
import { useToast } from 'primevue/usetoast'; // Added useToast
import ProgressSpinner from 'primevue/progressspinner'; // Ensure ProgressSpinner is imported if used directly
import Message from 'primevue/message'; // Ensure Message is imported if used directly
import Image from 'primevue/image'; // Ensure Image is imported if used directly

const digitalSignature = ref(null);
const isLoading = ref(true);
const error = ref(null);
const route = useRoute();
const router = useRouter(); // Initialized router
const toast = useToast(); // Initialized toast
const fetchedUserName = ref('');
const fetchedUserEmail = ref('');

const fullSignatureImageUrl = computed(() => {
  // Adjust 'signature_image_field' to the actual field name in your DigitalSignature model if it has an image.
  // If digital signatures don't have images, you can remove this computed property and the <Image> component.
  if (digitalSignature.value && digitalSignature.value.photo) {
    const baseUrl = String(import.meta.env.VITE_API_URL || '').replace(/\/$/, ''); 
    const imagePath = String(digitalSignature.value.photo).replace(/^\//, ''); 
    
    if (!imagePath.trim()) return null;
    console.log('Full signature image URL:', `${baseUrl}/${imagePath}`); // Debugging log
    return `${baseUrl}/${imagePath}`;
  }
  return null;
});

onMounted(async () => {
  const signatureId = route.params.id;
  if (signatureId) {
    try {
      isLoading.value = true;
      const response = await DigitalSignatureService.getSignatureByUserId(signatureId); 
      console.log('Digital signature response:', signatureId); // Debugging log
      digitalSignature.value = response.data; 
      console.log('Digital signature data fetched:', digitalSignature.value);

      if (digitalSignature.value && digitalSignature.value.user_id) {
        try {
          // Ensure UserService has a method like getUser
          const userResponse = await UserService.getUser(digitalSignature.value.user_id);
          if (userResponse && userResponse.data) {
            fetchedUserName.value = userResponse.data.name;
            fetchedUserEmail.value = userResponse.data.email;
          }
        } catch (userErr) {
          console.error('Failed to fetch user details for digital signature:', userErr);
        }
      }
      error.value = null;
    } catch (err) {
      console.error('Failed to fetch digital signature:', err);
      // Redirect if 404, as per previous implementation
      if (err.response && err.response.status === 404) {
        router.push(`/user/${route.params.id}/signature/create`);
        return; // Stop further processing
      }
      error.value = 'Failed to load digital signature data. ' + (err.message || '');
      digitalSignature.value = null;
    } finally {
      isLoading.value = false;
    }
  } else {
    error.value = 'No digital signature ID provided in the route.';
    isLoading.value = false;
  }
});

const handleUpdate = () => {
  if (digitalSignature.value && digitalSignature.value.id) {
    router.push(`/user/${route.params.id}/signature/update/${digitalSignature.value.id}`);
  }
};

const handleDeleteSignature = async () => {
  if (!digitalSignature.value || !digitalSignature.value.id) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Signature ID not found.', life: 3000 });
    return;
  }
  try {
    isLoading.value = true; // Indicate loading state for delete operation
    await DigitalSignatureService.deleteSignature(digitalSignature.value.id);
    toast.add({ severity: 'success', summary: 'Success', detail: 'Digital Signature deleted successfully', life: 3000 });
    router.push(`/user/${route.params.id}/signature`); // Adjust to your digital signatures list route
  } catch (err) {
    console.error('Failed to delete digital signature:', err);
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete digital signature. ' + (err.message || ''), life: 3000 });
  } finally {
    isLoading.value = false;
  }
};

</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <div v-if="isLoading" class="flex justify-content-center">
          <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
        </div>
        <div v-else-if="error">
          <Message severity="error">{{ error }}</Message>
        </div>
        <div v-else-if="digitalSignature">
          <h5>Digital Signature - {{ fetchedUserName || 'Details' }}</h5>
          <div class="p-fluid formgrid grid">
            <div class="field col-12 md:col-3 flex align-items-center justify-content-center">
              <Image v-if="fullSignatureImageUrl" :src="fullSignatureImageUrl" alt="Signature Visual" width="150" preview />
              <div v-else class="flex align-items-center justify-content-center border-1 surface-border" style="height: 150px; width: 150px;">
                <i class="pi pi-shield" style="font-size: 4rem"></i> 
              </div>
            </div>
            <div class="field col-12 md:col-9">
              <div class="grid mt-3 md:mt-0">
                <div v-if="fetchedUserName" class="col-12 mb-3">
                  <span class="text-lg">User Name:</span>
                  <span class="text-lg ml-2">{{ fetchedUserName }}</span>
                </div>
                <div v-if="fetchedUserEmail" class="col-12 mb-3">
                  <span class="text-lg">User Email:</span>
                  <span class="text-lg ml-2">{{ fetchedUserEmail }}</span>
                </div>
                <div class="col-12 mb-3">
                  <span class="text-lg">Signature ID:</span>
                  <span class="text-lg ml-2">{{ digitalSignature.id || 'N/A' }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Action Buttons -->
          <div class="mt-4 flex justify-content-end">
            <Button 
              label="Update"
              icon="pi pi-pencil" 
              class="p-button-info mr-2"
              @click="handleUpdate" 
            />
            <Button 
              label="Delete"
              icon="pi pi-trash" 
              class="p-button-danger"
              @click="handleDeleteSignature"
              :loading="isLoading" 
            />
          </div>
        </div>
        <div v-else>
           <Message severity="warn">No digital signature data to display.</Message>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any component-specific styles here if needed */
.p-image-preview-indicator, .p-image-preview-icon {
    font-size: 1.5rem;
}
.border-1 {
    border-width: 1px !important;
    border-style: solid !important;
}
</style>
