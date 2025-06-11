<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import FileUpload from 'primevue/fileupload';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Message from 'primevue/message';
import Image from 'primevue/image';
import Divider from 'primevue/divider'; // Added Divider
import ProgressSpinner from 'primevue/progressspinner'; // Added ProgressSpinner
import ProfileService from '@/service/crudServices/ProfileService';
import UserService from '@/service/crudServices/UserService';
import type { Profile } from '@/models/Profile';
import type { User } from '@/models/User';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const profile = ref<Profile | null>(null);
const fetchedUser = ref<User | null>(null);
const phone = ref<string>('');
const photoFile = ref<File | null>(null);
const currentPhotoUrl = ref<string | null>(null);
const isLoading = ref(false); // Changed to false initially
const errorMessage = ref<string | null>(null);
const profileId = ref<number | null>(null);

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
    profileId.value = parseInt(id, 10);
  } else if (typeof id === 'number') {
    profileId.value = id;
  } else {
    errorMessage.value = "Profile ID is missing or invalid.";
    toast.add({ severity: 'error', summary: 'Error', detail: errorMessage.value, life: 3000 });
    router.push('/profiles'); // Or some other appropriate fallback
    return;
  }

  if (profileId.value) {
    isLoading.value = true;
    try {
      const profileResponse = await ProfileService.getProfile(profileId.value);
      profile.value = profileResponse.data;
      phone.value = profile.value.phone || '';
      currentPhotoUrl.value = profile.value.photo || null;

      if (profile.value.user_id) {
        const userResponse = await UserService.getUser(profile.value.user_id);
        fetchedUser.value = userResponse.data;
      }

    } catch (err: any) {
      errorMessage.value = 'Failed to load profile data. ' + (err.response?.data?.message || err.message || '');
      toast.add({ severity: 'error', summary: 'Loading Error', detail: errorMessage.value, life: 5000 });
      console.error('Error loading profile:', err);
       if (err.response && err.response.status === 404) {
         router.push('/notfound'); // Or a specific 404 page for profiles
       }
    } finally {
      isLoading.value = false;
    }
  }
});

const onFileSelect = (event: any) => {
  if (event.files && event.files.length > 0) {
    photoFile.value = event.files[0];
  } else {
    photoFile.value = null;
  }
};

const handleSubmit = async () => {
  if (!profileId.value) {
    errorMessage.value = 'Profile ID is missing.';
    toast.add({ severity: 'error', summary: 'Error', detail: errorMessage.value, life: 3000 });
    return;
  }

  isLoading.value = true;
  errorMessage.value = null;

  try {
    const profileData: Partial<Profile> = {
      phone: phone.value || undefined,
    };

    await ProfileService.updateProfile(profileId.value, profileData, photoFile.value || undefined);

    toast.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully!', life: 3000 });
    if (photoFile.value) { // If a new photo was uploaded, the URL might change
        const updatedProfileResponse = await ProfileService.getProfile(profileId.value);
        currentPhotoUrl.value = updatedProfileResponse.data.photo || null;
        photoFile.value = null; // Clear the selected file
    }
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || error.message || 'Failed to update profile.';
    toast.add({ severity: 'error', summary: 'Update Error', detail: errorMessage.value, life: 5000 });
    console.error('Error updating profile:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex justify-content-center align-items-center" style="min-height: 80vh;">
    <div v-if="isLoading" class="flex justify-content-center">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" />
    </div>
    <Message v-else-if="errorMessage && !profile" severity="error">{{ errorMessage }}</Message>
    
    <Card class="w-full max-w-2xl shadow-xl" style="border-radius: 1rem;" v-else-if="profile">
      <template #title>
        <div class="text-center text-xl font-bold mb-0">{{ fetchedUser?.name || 'User' }} - Profile</div>
      </template>
      <template #content>
        <form @submit.prevent="handleSubmit" class="p-fluid">
          <div v-if="fetchedUser" class="mb-3">
            <div class="field">
                <label class="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                <p class="text-lg text-gray-900">{{ fetchedUser.name }}</p>
            </div>
            <div class="field mt-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                <p class="text-lg text-gray-900">{{ fetchedUser.email }}</p>
            </div>
          </div>
          
          <Divider v-if="fetchedUser" />

          <div class="field mb-4 mt-3">
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone:</label>
            <InputText id="phone" v-model="phone" placeholder="Enter phone number" class="w-full" />
          </div>

          <div class="field mb-4">
            <label for="profilePhoto" class="block text-sm font-medium text-gray-700 mb-1">Photo:</label>
            <div v-if="fullCurrentImageUrl && !photoFile" class="mb-2 text-left">
                <Image :src="fullCurrentImageUrl" alt="Current Profile Photo" width="100" preview class="shadow-md rounded"/>
            </div>
            <FileUpload
              name="profilePhoto"
              @select="onFileSelect"
              :multiple="false"
              accept="image/*"
              :maxFileSize="1000000"
              chooseLabel="Browse..."
              :showUploadButton="false"
              :showCancelButton="true"
              @remove="photoFile = null"
              @clear="photoFile = null"
              class="w-full p-button-outlined p-button-sm"
              style="height: auto;"
            >
              <template #empty>
                <div v-if="!photoFile && !fullCurrentImageUrl" class="flex align-items-center justify-content-center flex-column py-3 border-2 border-dashed surface-border border-round">
                  <i class="pi pi-image text-4xl text-400" />
                  <p class="mt-2 mb-0 text-sm text-600">Drag and drop or browse to upload new photo.</p>
                </div>
                 <div v-if="photoFile" class="flex align-items-center justify-content-center flex-column py-3">
                    <i class="pi pi-file text-4xl text-400" />
                    <p class="mt-2 mb-0 text-sm text-600">{{ photoFile.name }} (New)</p>
                </div>
              </template>
            </FileUpload>
          </div>

          <Message v-if="errorMessage" severity="error" :closable="true" @close="errorMessage=null" class="mb-3">{{ errorMessage }}</Message>

          <div class="flex justify-content-end mt-5">
            <Button label="Cancel" icon="pi pi-times" class="p-button-text mr-2" @click="router.back()" :disabled="isLoading" />
            <Button type="submit" label="Update" icon="pi pi-check" :loading="isLoading" />
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
    padding: 0.3rem 0;
    }

.p-fileupload-choose:not(.p-disabled):hover {
    background-color: var(--primary-color-lighter); /* Example hover color */
}

:deep(.p-button.p-fileupload-choose) {
    color: var(--primary-color-text); /* Or your desired text color */
}

:deep(.p-fileupload .p-button) {
    height: auto; /* Adjust height if needed */
    padding: 0.5rem 1rem; /* Adjust padding */
}

:deep(.p-fileupload-empty) {
    padding: 1rem;
}

</style>