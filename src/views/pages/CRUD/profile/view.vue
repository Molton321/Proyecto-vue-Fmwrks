<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // Added useRouter
import ProfileService from '@/service/crudServices/ProfileService';
import UserService from '@/service/crudServices/UserService';
import { useToast } from 'primevue/usetoast'; // Added useToast
import Button from 'primevue/button'; // Added Button for template
import ProgressSpinner from 'primevue/progressspinner'; // Added ProgressSpinner for template
import Message from 'primevue/message'; // Added Message for template
import Image from 'primevue/image'; // Added Image for template

const profile = ref(null); 
const isLoading = ref(true);
const error = ref(null);
const route = useRoute();
const router = useRouter(); // Added for navigation
const toast = useToast(); // Added for notifications
const fetchedUserName = ref('');
const fetchedUserEmail = ref('');

const fullImageUrl = computed(() => {
  if (profile.value && profile.value.photo) {
    const baseUrl = String(import.meta.env.VITE_API_URL || '').replace(/\/$/, ''); // Remove trailing slash
    const imagePath = String(profile.value.photo).replace(/^\//, ''); // Remove leading slash
    
    if (!imagePath.trim()) return null; // If imagePath is empty after processing, no valid image
    return `${baseUrl}/${imagePath}`;
  }
  return null;
});

onMounted(async () => {
  const profileId = route.params.id;
  if (profileId) {
    try {
      isLoading.value = true;
      const response = await ProfileService.getProfile(Number(profileId)); 
      profile.value = response.data; 

      if (profile.value && profile.value.user_id) {
        try {
          const userResponse = await UserService.getUser(profile.value.user_id);
          if (userResponse && userResponse.data) {
            fetchedUserName.value = userResponse.data.name;
            fetchedUserEmail.value = userResponse.data.email;
          }
        } catch (userErr) {
          console.error('Failed to fetch user details:', userErr);
          // Optionally set a user-specific error message or handle as needed
        }
      }
      error.value = null;
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      router.push(`/user/${route.params.id}/profiles/create`);
    } finally {
      isLoading.value = false;
    }
  } else {
    router.push(`/user/${route.params.id}/profile/create`); // Redirect if no profile ID is provided
    isLoading.value = false;
  }
});

const handleUpdate = () => {
  if (profile.value && profile.value.id) {
    router.push(`/user/${route.params.id}/profile/update/${profile.value.id}`);
  }
};

const handleDeleteProfile = async () => {
  if (profile.value && profile.value.id) {
    isLoading.value = true;
    try {
      await ProfileService.deleteProfile(profile.value.id);
      toast.add({ severity: 'success', summary: 'Deleted', detail: 'Profile deleted successfully', life: 3000 });
      router.push(`/user/${route.params.id}/profile/create`); // Navigate to a relevant page, e.g., profiles list
    } catch (err) {
      console.error('Failed to delete profile:', err);
      toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete profile. ' + (err.response?.data?.message || err.message || ''), life: 5000 });
      isLoading.value = false;
    }
  }
};

</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <div v-if="isLoading && !profile" class="flex justify-content-center"> {/* Adjusted v-if for loading state */}
          <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
        </div>
        <div v-else-if="error">
          <Message severity="error">{{ error }}</Message>
        </div>
        <div v-else-if="profile">
          <h5>{{ fetchedUserName || 'User' }} - Profile</h5>
          <div class="p-fluid formgrid grid">
            <div class="field col-12 md:col-3 flex align-items-center justify-content-center">
              <Image    v-if="fullImageUrl" :src="fullImageUrl" alt="Profile Image" width="150" preview />
              <div v-else class="flex align-items-center justify-content-center border-1 surface-border" style="height: 150px; width: 150px;">
                <i class="pi pi-image" style="font-size: 4rem"></i>
              </div>
            </div>
            <div class="field col-12 md:col-9">
              <div class="grid mt-3 md:mt-0">
                <div class="col-12 mb-3">
                  <span class="text-lg">Profile Name:</span>
                  <span class="text-lg ml-2">{{ fetchedUserName }}</span>
                </div>
                <div class="col-12 mb-3">
                  <span class="text-lg">Profile Email:</span>
                  <span class="text-lg ml-2">{{ fetchedUserEmail}}</span>
                </div>
                <div class="col-12 mb-3">
                  <span class="text-lg">Phone:</span>
                  <span class="text-lg ml-2">{{ profile.phone }}</span>
                </div>
              </div>
            </div>
            <div class="mt-4 flex justify-content-end col-12"> 
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
              @click="handleDeleteProfile"
              :loading="isLoading" 
            />
          </div>
          </div>
        </div>
        <div v-else>
           <Message severity="warn">No profile data to display.</Message>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.p-image-preview-indicator, .p-image-preview-icon {
    font-size: 1.5rem;
}
.border-1 {
    border-width: 1px !important;
    border-style: solid !important;
}
</style>