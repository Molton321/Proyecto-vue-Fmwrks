<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Message from 'primevue/message';
import Image from 'primevue/image';
import Divider from 'primevue/divider';
import ProgressSpinner from 'primevue/progressspinner';
import DigitalSignatureService from '@/service/crudServices/DigitalSignatureService';
import UserService from '@/service/crudServices/UserService';
import type { digitalSignature } from '@/models/digitalSignature'; // Corrected type casing
import type { User } from '@/models/User';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const signature = ref<digitalSignature | null>(null); // Corrected type casing
const fetchedUser = ref<User | null>(null);
const photoFile = ref<File | null>(null);
const currentPhotoUrl = ref<string | null>(null);
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const signatureId = ref<number | null>(null);

const fullCurrentImageUrl = computed(() => {
  if (currentPhotoUrl.value) {
    const baseUrl = String(import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
    const imagePath = String(currentPhotoUrl.value).replace(/^\//, '');
    if (!imagePath.trim()) return null;
    return `${baseUrl}/${imagePath}`;
  }
  return null;
});

onMounted(async () => {
  const id = route.params.id;
  if (typeof id === 'string') {
    signatureId.value = parseInt(id, 10);
  } else if (typeof id === 'number') {
    signatureId.value = id;
  } else {
    errorMessage.value = "Digital Signature ID is missing or invalid.";
    toast.add({ severity: 'error', summary: 'Error', detail: errorMessage.value, life: 3000 });
    router.push('/digital-signatures'); 
    return;
  }

  if (signatureId.value) {
    isLoading.value = true;
    try {
      const signatureResponse = await DigitalSignatureService.getSignature(signatureId.value);
      signature.value = signatureResponse.data;
      currentPhotoUrl.value = signature.value.photo || null;

      if (signature.value.user_id) {
        const userResponse = await UserService.getUser(signature.value.user_id);
        fetchedUser.value = userResponse.data;
      }

    } catch (err: any) {
      errorMessage.value = 'Failed to load digital signature data. ' + (err.response?.data?.message || err.message || '');
      toast.add({ severity: 'error', summary: 'Loading Error', detail: errorMessage.value, life: 5000 });
      console.error('Error loading digital signature:', err);
       if (err.response && err.response.status === 404) {
         router.push('/notfound'); 
       }
    } finally {
      isLoading.value = false;
    }
  }
});

const onFileSelect = (event: any) => {
  if (event.files && event.files.length > 0) {
    photoFile.value = event.files[0];
    // Display a preview of the selected image (optional)
    const reader = new FileReader();
    reader.onload = (e) => {
      // currentPhotoUrl.value = e.target?.result as string; // This would replace the current image preview immediately
    };
    reader.readAsDataURL(event.files[0]);
  } else {
    photoFile.value = null;
  }
};

const handleSubmit = async () => {
  if (!signatureId.value) {
    errorMessage.value = 'Digital Signature ID is missing.';
    toast.add({ severity: 'error', summary: 'Error', detail: errorMessage.value, life: 3000 });
    return;
  }

  isLoading.value = true;
  errorMessage.value = null;

  try {
    await DigitalSignatureService.updateSignature(signatureId.value, {}, photoFile.value || undefined);

    toast.add({ severity: 'success', summary: 'Success', detail: 'Digital Signature updated successfully!', life: 3000 });
    if (photoFile.value) { 
        const updatedSignatureResponse = await DigitalSignatureService.getSignature(signatureId.value);
        currentPhotoUrl.value = updatedSignatureResponse.data.photo || null;
        photoFile.value = null; 
        // Find the FileUpload component instance and clear its display if possible
        // This might require a ref to the FileUpload component and calling a method like .clear()
    }
    // router.push(`/digital-signatures/view/${signatureId.value}`); // Optional: navigate to view page
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || error.message || 'Failed to update digital signature.';
    toast.add({ severity: 'error', summary: 'Update Error', detail: errorMessage.value, life: 5000 });
    console.error('Error updating digital signature:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex justify-content-center align-items-center" style="min-height: 80vh;">
    <div v-if="isLoading && !signature" class="flex justify-content-center">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" />
    </div>
    <Message v-else-if="errorMessage && !signature" severity="error" class="w-full max-w-xl">{{ errorMessage }}</Message>
    
    <Card class="w-full max-w-xl shadow-xl" style="border-radius: 1rem;" v-else-if="signature">
      <template #title>
        <div class="text-center text-xl font-bold">Update Digital Signature</div>
      </template>
      <template #subtitle>
         <div v-if="fetchedUser" class="text-center text-md text-600">For: {{ fetchedUser?.name }} ({{ fetchedUser?.email }})</div>
      </template>
      <template #content>
        <form @submit.prevent="handleSubmit" class="p-fluid">
          <div v-if="fetchedUser" class="mb-4 surface-100 p-3 border-round-md">
            <div class="field">
                <label class="block text-sm font-medium text-700 mb-1">User ID:</label>
                <p class="text-lg font-semibold text-900">{{ signature.user_id }}</p>
            </div>
            <div class="field mt-2">
                <label class="block text-sm font-medium text-700 mb-1">User Name:</label>
                <p class="text-lg font-semibold text-900">{{ fetchedUser.name }}</p>
            </div>
            <div class="field mt-2">
                <label class="block text-sm font-medium text-700 mb-1">User Email:</label>
                <p class="text-lg font-semibold text-900">{{ fetchedUser.email }}</p>
            </div>
          </div>
          
          <Divider v-if="fetchedUser" />

          <div class="field mb-4 mt-3">
            <label for="signaturePhoto" class="block text-sm font-medium text-700 mb-1">Signature Photo:</label>
            <div v-if="fullCurrentImageUrl && !photoFile" class="mb-3 text-center">
                <Image :src="fullCurrentImageUrl" alt="Current Signature Photo" width="200" preview class="shadow-2 border-round"/>
            </div>
            <FileUpload
              name="signaturePhoto"
              @select="onFileSelect"
              :multiple="false"
              accept="image/*"
              :maxFileSize="1000000" 
              chooseLabel="Browse New Photo..."
              :showUploadButton="false"
              :showCancelButton="true"
              @remove="photoFile = null; /* Optionally re-fetch original image if needed */"
              @clear="photoFile = null; /* Optionally re-fetch original image if needed */"
              class="w-full"
            >
              <template #empty>
                <div v-if="!photoFile && !fullCurrentImageUrl" class="flex align-items-center justify-content-center flex-column p-4 border-2 border-dashed surface-border border-round-md">
                  <i class="pi pi-image mt-1 mb-2 text-5xl text-400" />
                  <p class="mt-2 mb-0 text-md text-600">Drag and drop or browse to upload a new photo.</p>
                </div>
                 <div v-if="photoFile" class="flex align-items-center justify-content-center flex-column p-4">
                    <i class="pi pi-file-image mt-1 mb-2 text-5xl text-primary-500" />
                    <p class="mt-2 mb-0 text-md text-600">{{ photoFile.name }} (New)</p>
                    <small class="text-sm text-500">{{ (photoFile.size / 1024).toFixed(2) }} KB</small>
                </div>
              </template>
            </FileUpload>
          </div>

          <Message v-if="errorMessage && signature" severity="error" :closable="true" @close="errorMessage=null" class="my-3">{{ errorMessage }}</Message>

          <div class="flex justify-content-end gap-2 mt-5">
            <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="router.back()" :disabled="isLoading" />
            <Button type="submit" label="Update Signature" icon="pi pi-check" :loading="isLoading" />
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.p-card {
  border-radius: 1rem;
}

.field label {
    color: var(--text-color-secondary);
}

.field p {
    margin: 0;
    padding: 0.25rem 0;
}

/* Enhance FileUpload appearance */
:deep(.p-fileupload-buttonbar) {
    padding: 0.5rem;
}

:deep(.p-button.p-fileupload-choose) {
    background-color: var(--primary-color);
    color: var(--primary-color-text);
    border: none;
}
:deep(.p-button.p-fileupload-choose:hover) {
    background-color: var(--primary-600); /* Darken on hover */
}

:deep(.p-fileupload-content) {
    padding: 0.5rem;
}

:deep(.p-fileupload-empty) {
    padding: 1rem;
    text-align: center;
}

.surface-100 {
    background-color: var(--surface-100) !important;
}

.border-round-md {
    border-radius: var(--border-radius-md, 6px);
}

.shadow-2 {
 box-shadow: var(--shadow-2, 0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12)) !important;
}

.text-700 {
    color: var(--text-color-secondary) !important; /* PrimeVue text color variable */
}
.text-900 {
    color: var(--text-color) !important; /* PrimeVue text color variable */
}

</style>
