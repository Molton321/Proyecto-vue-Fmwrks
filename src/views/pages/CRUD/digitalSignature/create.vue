<script setup lang="ts">
import { ref, onMounted } from 'vue'; // Added onMounted
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import FileUpload from 'primevue/fileupload';
// import InputNumber from 'primevue/inputnumber'; // Removed InputNumber
import Dropdown from 'primevue/dropdown'; // Added Dropdown
import Button from 'primevue/button';
import Card from 'primevue/card';
import Message from 'primevue/message';
import DigitalSignatureService from '@/service/crudServices/DigitalSignatureService';
import UserService from '@/service/crudServices/UserService'; // Added UserService
import type { User } from '@/models/User'; // Added User type import

const router = useRouter();
const route = useRoute();
const toast = useToast();

const userId = ref<number | null>(null);
const photoFile = ref<File | null>(null);
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const availableUsers = ref<User[]>([]); // Added ref for available users

onMounted(async () => {
  isLoading.value = true;
  try {
    const [usersResponse, signaturesResponse] = await Promise.all([
      UserService.getAllUsers(),
      DigitalSignatureService.getAllSignatures()
    ]);

    const allUsers = usersResponse.data;
    const existingSignatureUserIds = new Set(signaturesResponse.data.map(sig => sig.user_id));

    availableUsers.value = allUsers.filter(user => !existingSignatureUserIds.has(user.id));

    if (availableUsers.value.length === 0) {
        toast.add({ severity: 'warn', summary: 'No Users Available', detail: 'All users already have a digital signature or no users found.', life: 4000 });
    }

  } catch (error: any) {
    errorMessage.value = 'Failed to load users or signatures.';
    toast.add({ severity: 'error', summary: 'Loading Error', detail: errorMessage.value, life: 5000 });
    console.error('Error loading data for dropdown:', error);
  } finally {
    isLoading.value = false;
  }
});


const onFileSelect = (event: any) => {
  if (event.files && event.files.length > 0) {
    photoFile.value = event.files[0];
  }
};

const handleSubmit = async () => {
  if (!userId.value || !photoFile.value) {
    errorMessage.value = 'User ID and Signature Photo are required.';
    toast.add({ severity: 'error', summary: 'Error', detail: errorMessage.value, life: 3000 });
    return;
  }

  isLoading.value = true;
  errorMessage.value = null;

  try {
    // Ensure userId.value is not null before calling createSignature
    if (userId.value === null) {
        errorMessage.value = 'User ID must be selected.';
        toast.add({ severity: 'error', summary: 'Error', detail: errorMessage.value, life: 3000 });
        isLoading.value = false;
        return;
    }
    await DigitalSignatureService.createSignature(userId.value, photoFile.value);

    toast.add({ severity: 'success', summary: 'Success', detail: 'Digital Signature created successfully!', life: 3000 });
    router.push(`/user/${route.params.id}/signature`); // Or the correct list view route
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || error.message || 'Failed to create digital signature.';
    toast.add({ severity: 'error', summary: 'Error', detail: errorMessage.value, life: 5000 });
    console.error('Error creating digital signature:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex justify-content-center align-items-center" style="min-height: 80vh;">
    <Card class="w-full max-w-2xl shadow-xl justify-content-center" style="border-radius: 1rem;">
      <template #title>
        <div class="text-center text-2xl font-bold mb-4">Create Digital Signature</div>
      </template>
      <template #content>
        <form @submit.prevent="handleSubmit" class="p-fluid">
          <div class="field mb-4">
            <label for="userId" class="block text-900 font-medium mb-2">User</label>
            <!-- Replaced InputNumber with Dropdown -->
            <Dropdown
              id="userId"
              v-model="userId"
              :options="availableUsers"
              optionLabel="email" 
              optionValue="id"
              placeholder="Select a User"
              class="w-full"
              :disabled="isLoading || availableUsers.length === 0"
              showClear
            />
          </div>

          <div class="field mb-4">
            <label for="signaturePhoto" class="block text-900 font-medium mb-2">Signature Photo</label>
            <FileUpload name="signaturePhoto" @select="onFileSelect" :multiple="false" accept="image/*"
              :maxFileSize="1000000" chooseLabel="Choose Photo" uploadLabel="Upload" cancelLabel="Cancel"
              :showUploadButton="false" :showCancelButton="false" class="w-full">
              <template #empty>
                <div v-if="!photoFile" class="flex align-items-center justify-content-center flex-column p-3">
                  <i class="pi pi-cloud-upload border-2 border-circle p-3 text-4xl text-400 border-400" />
                  <p class="mt-3 mb-0">Drag and drop files here to upload.</p>
                </div>
                <div v-if="photoFile" class="flex align-items-center justify-content-center flex-column p-3">
                  <i class="pi pi-file border-2 border-circle p-3 text-4xl text-400 border-400" />
                  <p class="mt-3 mb-0">{{ photoFile.name }}</p>
                </div>
              </template>
            </FileUpload>
          </div>

          <Message v-if="errorMessage" severity="error" :closable="false" class="mb-3">{{ errorMessage }}</Message>

          <div class="flex justify-content-end">
            <Button label="Cancel" icon="pi pi-times" class="p-button-text mr-2" @click="router.back()"
              :disabled="isLoading" />
            <Button type="submit" label="Create Signature" icon="pi pi-check" :loading="isLoading" />
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
.p-fileupload-content {
    padding: 0.5rem; /* Adjust padding as needed */
}
/* Add any additional custom styles here */
</style>
