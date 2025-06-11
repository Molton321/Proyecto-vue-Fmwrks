<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import FileUpload from 'primevue/fileupload';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Message from 'primevue/message';
import ProfileService from '@/service/crudServices/ProfileService';
import UserService from '@/service/crudServices/UserService';
import type { User } from '@/models/User';
import type { Profile } from '@/models/Profile';

const router = useRouter();
const toast = useToast();

const userId = ref<number | null>(null);
const phone = ref<string>('');
const photoFile = ref<File | null>(null);
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const availableUsers = ref<User[]>([]);

onMounted(async () => {
  isLoading.value = true;
  try {
    const [usersResponse, profilesResponse] = await Promise.all([
      UserService.getAllUsers(),
      ProfileService.getAllProfiles()
    ]);

    const allUsers = usersResponse.data;
    const existingProfileUserIds = new Set(profilesResponse.data.map(profile => profile.user_id));

    availableUsers.value = allUsers.filter(user => user.id !== undefined && !existingProfileUserIds.has(user.id));

    if (availableUsers.value.length === 0) {
        toast.add({ severity: 'warn', summary: 'No Users Available', detail: 'All users already have a profile or no users found.', life: 4000 });
    }

  } catch (error: any) {
    errorMessage.value = 'Failed to load users or profiles.';
    toast.add({ severity: 'error', summary: 'Loading Error', detail: errorMessage.value, life: 5000 });
    console.error('Error loading data for profile creation:', error);
  } finally {
    isLoading.value = false;
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
  if (!userId.value) {
    errorMessage.value = 'User selection is required.';
    toast.add({ severity: 'error', summary: 'Validation Error', detail: errorMessage.value, life: 3000 });
    return;
  }
   // Phone is optional based on model, photo is optional in service
  // if (!phone.value) {
  //   errorMessage.value = 'Phone number is required.';
  //   toast.add({ severity: 'error', summary: 'Validation Error', detail: errorMessage.value, life: 3000 });
  //   return;
  // }

  isLoading.value = true;
  errorMessage.value = null;

  try {
    const profileData: Omit<Profile, 'id' | 'user_id' | 'photo'> = {
      phone: phone.value || undefined, // Send undefined if empty, or handle as per backend expectation
    };

    await ProfileService.createProfile(userId.value, profileData, photoFile.value || undefined);

    toast.add({ severity: 'success', summary: 'Success', detail: 'Profile created successfully!', life: 3000 });
    router.push('/profiles'); // Adjust as needed, e.g., to the new profile's view page
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || error.message || 'Failed to create profile.';
    toast.add({ severity: 'error', summary: 'Creation Error', detail: errorMessage.value, life: 5000 });
    console.error('Error creating profile:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex justify-content-center align-items-center" style="min-height: 80vh;">
    <Card class="w-full max-w-2xl shadow-xl" style="border-radius: 1rem;">
      <template #title>
        <div class="text-center text-2xl font-bold mb-4">Create Profile</div>
      </template>
      <template #content>
        <form @submit.prevent="handleSubmit" class="p-fluid">
          <div class="field mb-4">
            <label for="user" class="block text-900 font-medium mb-2">User</label>
            <Dropdown
              id="user"
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
            <label for="phone" class="block text-900 font-medium mb-2">Phone</label>
            <InputText id="phone" v-model="phone" placeholder="Enter phone number" class="w-full" />
          </div>

          <div class="field mb-4">
            <label for="profilePhoto" class="block text-900 font-medium mb-2">Profile Photo</label>
            <FileUpload
              name="profilePhoto"
              @select="onFileSelect"
              :multiple="false"
              accept="image/*"
              :maxFileSize="1000000" 
              chooseLabel="Choose Photo"
              :showUploadButton="false"
              :showCancelButton="true"
              @remove="photoFile = null"
              @clear="photoFile = null"
              class="w-full"
            >
              <template #empty>
                <div v-if="!photoFile" class="flex align-items-center justify-content-center flex-column p-3">
                  <i class="pi pi-cloud-upload border-2 border-circle p-3 text-4xl text-400 border-400" />
                  <p class="mt-3 mb-0">Drag and drop photo here.</p>
                </div>
                <div v-if="photoFile" class="flex align-items-center justify-content-center flex-column p-3">
                    <i class="pi pi-file border-2 border-circle p-3 text-4xl text-400 border-400" />
                    <p class="mt-3 mb-0">{{ photoFile.name }}</p>
                </div>
              </template>
            </FileUpload>
          </div>

          <Message v-if="errorMessage" severity="error" :closable="false" class="mb-3">{{ errorMessage }}</Message>

          <div class="flex justify-content-end mt-4">
            <Button label="Cancel" icon="pi pi-times" class="p-button-text mr-2" @click="router.back()" :disabled="isLoading" />
            <Button type="submit" label="Create Profile" icon="pi pi-check" :loading="isLoading" />
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
    padding: 0.5rem; 
}
</style>