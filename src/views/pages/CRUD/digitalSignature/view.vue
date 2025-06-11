<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import DigitalSignatureService from '@/service/crudServices/DigitalSignatureService'; // Adjust path if necessary
import UserService from '@/service/crudServices/UserService'; // Adjust path if necessary

const digitalSignature = ref(null);
const isLoading = ref(true);
const error = ref(null);
const route = useRoute();
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
      // Ensure DigitalSignatureService has a method like getDigitalSignature
      const response = await DigitalSignatureService.getSignature(signatureId); 
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
